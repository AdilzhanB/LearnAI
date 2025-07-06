import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Configure environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
const db = new sqlite3.Database(join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      display_name TEXT,
      photo_url TEXT,
      level INTEGER DEFAULT 1,
      experience_points INTEGER DEFAULT 0,
      global_rank INTEGER DEFAULT 0,
      total_time_spent INTEGER DEFAULT 0,
      algorithms_completed INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      preferred_language TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_active DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      algorithm_id TEXT NOT NULL,
      status TEXT DEFAULT 'not_started',
      completed_sections TEXT DEFAULT '[]',
      time_spent INTEGER DEFAULT 0,
      accuracy REAL DEFAULT 0,
      attempts INTEGER DEFAULT 0,
      last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP,
      started_at DATETIME,
      completed_at DATETIME,
      bookmarked BOOLEAN DEFAULT FALSE,
      rating INTEGER,
      notes TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id),
      UNIQUE(user_id, algorithm_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      achievement_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      category TEXT NOT NULL,
      points INTEGER NOT NULL,
      rarity TEXT NOT NULL,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      UNIQUE(user_id, achievement_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      response TEXT,
      context_algorithm_id TEXT,
      context_section_id TEXT,
      context_topic TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS learning_analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT UNIQUE NOT NULL,
      total_time_spent INTEGER DEFAULT 0,
      algorithms_completed INTEGER DEFAULT 0,
      average_accuracy REAL DEFAULT 0,
      categories_progress TEXT DEFAULT '{}',
      difficulty_progress TEXT DEFAULT '{}',
      learning_streak INTEGER DEFAULT 0,
      weekly_stats TEXT DEFAULT '[]',
      monthly_stats TEXT DEFAULT '[]',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`
  ];
  
  tables.forEach((table, index) => {
    db.run(table, (err) => {
      if (err) {
        console.error(`Error creating table ${index}:`, err.message);
      }
    });
  });
}

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// User routes
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json({ success: true, data: row });
  });
});

app.post('/api/users', (req, res) => {
  const { id, email, display_name, photo_url } = req.body;
  
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO users (id, email, display_name, photo_url, last_active)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  
  stmt.run([id, email, display_name, photo_url], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({ 
      success: true, 
      message: 'User created/updated successfully',
      data: { id, email, display_name, photo_url }
    });
  });
  
  stmt.finalize();
});

// Progress routes
app.get('/api/progress/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.all('SELECT * FROM user_progress WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({ success: true, data: rows });
  });
});

app.post('/api/progress', (req, res) => {
  const { 
    user_id, 
    algorithm_id, 
    status, 
    completed_sections, 
    time_spent, 
    accuracy, 
    attempts,
    bookmarked,
    rating,
    notes 
  } = req.body;
  
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO user_progress 
    (user_id, algorithm_id, status, completed_sections, time_spent, accuracy, attempts, 
     last_accessed, started_at, bookmarked, rating, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 
            COALESCE((SELECT started_at FROM user_progress WHERE user_id = ? AND algorithm_id = ?), CURRENT_TIMESTAMP),
            ?, ?, ?)
  `);
  
  stmt.run([
    user_id, algorithm_id, status, 
    JSON.stringify(completed_sections || []), 
    time_spent || 0, accuracy || 0, attempts || 1,
    user_id, algorithm_id,
    bookmarked || false, rating, notes
  ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({ 
      success: true, 
      message: 'Progress updated successfully',
      data: { user_id, algorithm_id, status }
    });
  });
  
  stmt.finalize();
});

// Achievements routes
app.get('/api/achievements/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.all('SELECT * FROM achievements WHERE user_id = ? ORDER BY unlocked_at DESC', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({ success: true, data: rows });
  });
});

app.post('/api/achievements', (req, res) => {
  const { 
    user_id, 
    achievement_id, 
    name, 
    description, 
    icon, 
    category, 
    points, 
    rarity 
  } = req.body;
  
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO achievements 
    (user_id, achievement_id, name, description, icon, category, points, rarity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run([
    user_id, achievement_id, name, description, icon, category, points, rarity
  ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.json({ 
        success: true, 
        message: 'Achievement already exists'
      });
    } else {
      res.json({ 
        success: true, 
        message: 'Achievement unlocked successfully',
        data: { user_id, achievement_id, name }
      });
    }
  });
  
  stmt.finalize();
});

// Chat routes (for future Gemini integration)
app.post('/api/chat', async (req, res) => {
  const { user_id, message, context } = req.body;
  
  try {
    // Store user message
    const stmt = db.prepare(`
      INSERT INTO chat_messages 
      (user_id, content, context_algorithm_id, context_section_id, context_topic)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    stmt.run([
      user_id, 
      message, 
      context?.algorithmId, 
      context?.sectionId, 
      context?.topic
    ]);
    
    stmt.finalize();
    
    // TODO: Integrate with Gemini API
    const aiResponse = "This is a placeholder response. Gemini integration will be added here.";
    
    res.json({ 
      success: true, 
      data: { 
        message: aiResponse,
        context: context
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics routes
app.get('/api/analytics/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.get('SELECT * FROM learning_analytics WHERE user_id = ?', [userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      // Create default analytics record
      const defaultAnalytics = {
        user_id: userId,
        total_time_spent: 0,
        algorithms_completed: 0,
        average_accuracy: 0,
        categories_progress: '{}',
        difficulty_progress: '{}',
        learning_streak: 0,
        weekly_stats: '[]',
        monthly_stats: '[]'
      };
      
      const stmt = db.prepare(`
        INSERT INTO learning_analytics 
        (user_id, total_time_spent, algorithms_completed, average_accuracy, 
         categories_progress, difficulty_progress, learning_streak, weekly_stats, monthly_stats)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        userId, 0, 0, 0, '{}', '{}', 0, '[]', '[]'
      ], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        res.json({ success: true, data: defaultAnalytics });
      });
      
      stmt.finalize();
    } else {
      // Parse JSON fields
      const analytics = {
        ...row,
        categories_progress: JSON.parse(row.categories_progress),
        difficulty_progress: JSON.parse(row.difficulty_progress),
        weekly_stats: JSON.parse(row.weekly_stats),
        monthly_stats: JSON.parse(row.monthly_stats)
      };
      
      res.json({ success: true, data: analytics });
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

export default app;
