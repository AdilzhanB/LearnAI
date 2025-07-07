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

// Comprehensive algorithm data
const ALGORITHM_DATA = {
  'linear-regression': {
    id: 'linear-regression',
    name: 'Linear Regression',
    category: 'Machine Learning',
    subcategory: 'Supervised Learning',
    difficulty: 'Beginner',
    description: 'A fundamental algorithm for predicting continuous values',
    longDescription: 'Linear regression is a statistical method that models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data. It is one of the most important algorithms in machine learning for prediction and understanding relationships between variables.',
    timeToComplete: 120,
    estimatedTime: '2-3 hours',
    prerequisites: ['Basic Statistics', 'Linear Algebra', 'Calculus'],
    learningObjectives: [
      'Understand the mathematical foundation of linear regression',
      'Learn how to implement linear regression from scratch',
      'Apply linear regression to real-world datasets',
      'Evaluate model performance using various metrics',
      'Understand overfitting and regularization techniques'
    ],
    applications: [
      'Predicting house prices based on features',
      'Stock market analysis and forecasting',
      'Medical diagnosis and treatment planning',
      'Marketing campaign effectiveness analysis',
      'Weather prediction and climate modeling'
    ],
    visualization: {
      type: 'Interactive Graph',
      config: {
        type: 'scatter',
        showLine: true,
        showResiduals: true,
        showCostFunction: true
      },
      steps: [
        { id: 1, description: 'Initialize random weights and bias', animation: 'fadeIn' },
        { id: 2, description: 'Plot data points on coordinate system', animation: 'scatter' },
        { id: 3, description: 'Draw initial regression line', animation: 'drawLine' },
        { id: 4, description: 'Calculate cost function (MSE)', animation: 'showCost' },
        { id: 5, description: 'Apply gradient descent to optimize weights', animation: 'updateWeights' },
        { id: 6, description: 'Update regression line position', animation: 'updateLine' },
        { id: 7, description: 'Repeat until convergence', animation: 'loop' }
      ]
    },
    codeExamples: [
      {
        language: 'Python',
        code: 'import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.linear_model import LinearRegression\n\nclass LinearRegressionFromScratch:\n    def __init__(self, learning_rate=0.01, n_iterations=1000):\n        self.learning_rate = learning_rate\n        self.n_iterations = n_iterations\n        self.weights = None\n        self.bias = None\n        self.cost_history = []\n    \n    def fit(self, X, y):\n        # Initialize parameters\n        n_samples, n_features = X.shape\n        self.weights = np.zeros(n_features)\n        self.bias = 0\n        \n        # Gradient descent\n        for i in range(self.n_iterations):\n            # Forward propagation\n            y_pred = np.dot(X, self.weights) + self.bias\n            \n            # Calculate cost\n            cost = np.mean((y - y_pred) ** 2)\n            self.cost_history.append(cost)\n            \n            # Calculate gradients\n            dw = (1/n_samples) * np.dot(X.T, (y_pred - y))\n            db = (1/n_samples) * np.sum(y_pred - y)\n            \n            # Update parameters\n            self.weights -= self.learning_rate * dw\n            self.bias -= self.learning_rate * db\n    \n    def predict(self, X):\n        return np.dot(X, self.weights) + self.bias',
        explanation: 'This implementation shows how to build linear regression from scratch using gradient descent. The code includes initialization, training loop, prediction, and visualization of results and cost function.'
      },
      {
        language: 'JavaScript',
        code: 'class LinearRegression {\n    constructor(learningRate = 0.01, iterations = 1000) {\n        this.learningRate = learningRate;\n        this.iterations = iterations;\n        this.weights = null;\n        this.bias = 0;\n        this.costHistory = [];\n    }\n    \n    fit(X, y) {\n        const m = X.length;\n        const n = X[0].length;\n        \n        // Initialize weights\n        this.weights = new Array(n).fill(0);\n        this.bias = 0;\n        \n        // Gradient descent\n        for (let i = 0; i < this.iterations; i++) {\n            // Forward propagation\n            const predictions = this.predict(X);\n            \n            // Calculate cost\n            const cost = this.calculateCost(y, predictions);\n            this.costHistory.push(cost);\n            \n            // Calculate gradients\n            const dWeights = this.calculateWeightGradients(X, y, predictions);\n            const dBias = this.calculateBiasGradient(y, predictions);\n            \n            // Update parameters\n            this.updateWeights(dWeights);\n            this.updateBias(dBias);\n        }\n    }\n    \n    predict(X) {\n        return X.map(row => \n            row.reduce((sum, val, idx) => sum + val * this.weights[idx], 0) + this.bias\n        );\n    }\n}',
        explanation: 'JavaScript implementation of linear regression with gradient descent. This version includes all the key components: cost calculation, gradient computation, and parameter updates.'
      }
    ],
    mathematics: {
      formulas: [
        'y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε',
        'Cost Function: J(θ) = 1/(2m) * Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)²',
        'Gradient: ∂J/∂θⱼ = 1/m * Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾) * x⁽ⁱ⁾',
        'Update Rule: θⱼ := θⱼ - α * ∂J/∂θⱼ'
      ],
      concepts: [
        'Linear relationship between input and output variables',
        'Least squares method for finding optimal parameters',
        'Gradient descent optimization algorithm',
        'Cost function minimization (Mean Squared Error)',
        'Overfitting and regularization (Ridge, Lasso)',
        'Feature scaling and normalization',
        'Bias-variance tradeoff'
      ],
      proofs: [
        'Derivation of normal equation for optimal weights',
        'Proof of gradient descent convergence',
        'Mathematical foundation of regularization techniques'
      ]
    },
    relatedAlgorithms: [
      { id: 'logistic-regression', name: 'Logistic Regression', similarity: 85 },
      { id: 'polynomial-regression', name: 'Polynomial Regression', similarity: 90 },
      { id: 'ridge-regression', name: 'Ridge Regression', similarity: 92 },
      { id: 'lasso-regression', name: 'Lasso Regression', similarity: 88 }
    ],
    exercises: [
      {
        id: 'ex1',
        title: 'House Price Prediction',
        difficulty: 'Easy',
        description: 'Build a linear regression model to predict house prices based on size, location, and age.'
      },
      {
        id: 'ex2',
        title: 'Stock Price Analysis',
        difficulty: 'Medium',
        description: 'Create a multiple linear regression model to analyze stock price movements using various market indicators.'
      },
      {
        id: 'ex3',
        title: 'Regularization Comparison',
        difficulty: 'Hard',
        description: 'Compare different regularization techniques (Ridge, Lasso, Elastic Net) on a high-dimensional dataset.'
      }
    ],
    resources: [
      {
        type: 'Research Paper',
        title: 'The Elements of Statistical Learning',
        url: 'https://web.stanford.edu/~hastie/ElemStatLearn/'
      },
      {
        type: 'Video Tutorial',
        title: 'Linear Regression - Andrew Ng',
        url: 'https://www.coursera.org/learn/machine-learning'
      },
      {
        type: 'Interactive Demo',
        title: 'Linear Regression Visualization',
        url: 'https://seeing-theory.brown.edu/regression-analysis/'
      }
    ],
    rating: 4.8,
    reviewCount: 1247,
    lastUpdated: '2024-12-15',
    tags: ['supervised-learning', 'regression', 'statistics', 'fundamental'],
    level: 'Beginner',
    popularity: 9,
    completionRate: 87
  },
  
  'neural-networks': {
    id: 'neural-networks',
    name: 'Neural Networks',
    category: 'Deep Learning',
    subcategory: 'Artificial Neural Networks',
    difficulty: 'Intermediate',
    description: 'Learn the fundamentals of artificial neural networks and deep learning',
    longDescription: 'Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information using a connectionist approach. This foundational deep learning algorithm is capable of learning complex patterns and representations from data.',
    timeToComplete: 300,
    estimatedTime: '5-6 hours',
    prerequisites: ['Linear Algebra', 'Calculus', 'Statistics', 'Python Programming'],
    learningObjectives: [
      'Understand the structure and components of neural networks',
      'Learn forward and backward propagation algorithms',
      'Implement neural networks from scratch',
      'Apply activation functions and their derivatives',
      'Understand gradient descent and optimization techniques',
      'Recognize common neural network architectures'
    ],
    applications: [
      'Image recognition and computer vision',
      'Natural language processing and translation',
      'Speech recognition and synthesis',
      'Medical diagnosis and drug discovery',
      'Autonomous vehicle navigation',
      'Financial market prediction'
    ],
    visualization: {
      type: 'Interactive Network',
      config: {
        type: 'network',
        showWeights: true,
        showActivations: true,
        showBackprop: true
      },
      steps: [
        { id: 1, description: 'Initialize network with random weights', animation: 'networkInit' },
        { id: 2, description: 'Input data flows through network layers', animation: 'forwardPass' },
        { id: 3, description: 'Apply activation functions at each layer', animation: 'activation' },
        { id: 4, description: 'Calculate output and compare with target', animation: 'outputCalc' },
        { id: 5, description: 'Compute loss and gradients', animation: 'lossCalc' },
        { id: 6, description: 'Backpropagate error through network', animation: 'backprop' },
        { id: 7, description: 'Update weights using gradient descent', animation: 'weightUpdate' },
        { id: 8, description: 'Repeat process for multiple epochs', animation: 'epochLoop' }
      ]
    },
    codeExamples: [
      {
        language: 'Python',
        code: 'import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import make_classification\n\nclass NeuralNetwork:\n    def __init__(self, layers, learning_rate=0.01):\n        self.layers = layers\n        self.learning_rate = learning_rate\n        self.weights = []\n        self.biases = []\n        \n        # Initialize weights and biases\n        for i in range(len(layers) - 1):\n            w = np.random.randn(layers[i], layers[i+1]) * np.sqrt(2.0 / layers[i])\n            b = np.zeros((1, layers[i+1]))\n            self.weights.append(w)\n            self.biases.append(b)\n    \n    def sigmoid(self, x):\n        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))\n    \n    def forward_propagation(self, X):\n        self.activations = [X]\n        \n        for i in range(len(self.weights)):\n            z = np.dot(self.activations[i], self.weights[i]) + self.biases[i]\n            a = self.sigmoid(z)\n            self.activations.append(a)\n        \n        return self.activations[-1]\n    \n    def backward_propagation(self, X, y):\n        m = X.shape[0]\n        \n        # Calculate output layer error\n        output_error = self.activations[-1] - y\n        deltas = [output_error * self.sigmoid_derivative(self.activations[-1])]\n        \n        # Calculate hidden layer errors\n        for i in range(len(self.weights) - 2, -1, -1):\n            error = deltas[-1].dot(self.weights[i + 1].T)\n            delta = error * self.sigmoid_derivative(self.activations[i + 1])\n            deltas.append(delta)\n        \n        deltas.reverse()\n        \n        # Update weights and biases\n        for i in range(len(self.weights)):\n            self.weights[i] -= self.learning_rate * self.activations[i].T.dot(deltas[i]) / m\n            self.biases[i] -= self.learning_rate * np.sum(deltas[i], axis=0, keepdims=True) / m',
        explanation: 'Complete implementation of a neural network with forward propagation, backpropagation, and training loop. Includes proper weight initialization and performance evaluation.'
      }
    ],
    mathematics: {
      formulas: [
        'Forward Pass: a^(l) = σ(W^(l) * a^(l-1) + b^(l))',
        'Cost Function: J = 1/m * Σ(y - ŷ)²',
        'Backpropagation: δ^(l) = (W^(l+1))^T * δ^(l+1) ⊙ σ\'(z^(l))',
        'Weight Update: W^(l) := W^(l) - α * δ^(l) * (a^(l-1))^T',
        'Bias Update: b^(l) := b^(l) - α * δ^(l)'
      ],
      concepts: [
        'Universal approximation theorem',
        'Gradient descent and backpropagation',
        'Activation functions (ReLU, Sigmoid, Tanh)',
        'Weight initialization strategies',
        'Regularization techniques (Dropout, L1/L2)',
        'Batch normalization',
        'Vanishing and exploding gradients'
      ],
      proofs: [
        'Derivation of backpropagation algorithm',
        'Universal approximation theorem proof',
        'Gradient descent convergence analysis'
      ]
    },
    relatedAlgorithms: [
      { id: 'cnn', name: 'Convolutional Neural Networks', similarity: 85 },
      { id: 'rnn', name: 'Recurrent Neural Networks', similarity: 82 },
      { id: 'lstm', name: 'Long Short-Term Memory', similarity: 78 },
      { id: 'transformer', name: 'Transformer Architecture', similarity: 75 }
    ],
    exercises: [
      {
        id: 'ex1',
        title: 'XOR Problem',
        difficulty: 'Easy',
        description: 'Implement a neural network to solve the classic XOR problem that cannot be solved by a single perceptron.'
      },
      {
        id: 'ex2',
        title: 'MNIST Digit Recognition',
        difficulty: 'Medium',
        description: 'Build a neural network to classify handwritten digits using the MNIST dataset.'
      },
      {
        id: 'ex3',
        title: 'Custom Architecture Design',
        difficulty: 'Hard',
        description: 'Design and implement a custom neural network architecture for a specific problem domain.'
      }
    ],
    resources: [
      {
        type: 'Book',
        title: 'Deep Learning by Ian Goodfellow',
        url: 'https://www.deeplearningbook.org/'
      },
      {
        type: 'Course',
        title: 'Neural Networks and Deep Learning',
        url: 'https://www.coursera.org/learn/neural-networks-deep-learning'
      },
      {
        type: 'Interactive Demo',
        title: 'TensorFlow Playground',
        url: 'https://playground.tensorflow.org/'
      }
    ],
    rating: 4.7,
    reviewCount: 892,
    lastUpdated: '2024-12-20',
    tags: ['deep-learning', 'neural-networks', 'backpropagation', 'classification'],
    level: 'Intermediate',
    popularity: 8,
    completionRate: 73
  },
  
  'k-means': {
    id: 'k-means',
    name: 'K-Means Clustering',
    category: 'Machine Learning',
    subcategory: 'Unsupervised Learning',
    difficulty: 'Beginner',
    description: 'Learn the popular K-means clustering algorithm for data partitioning',
    longDescription: 'K-means clustering is an unsupervised learning algorithm that partitions data into k clusters. It works by iteratively assigning data points to the nearest cluster centroid and updating centroids based on the mean of assigned points. This algorithm is widely used for customer segmentation, image segmentation, and data compression.',
    timeToComplete: 150,
    estimatedTime: '2-3 hours',
    prerequisites: ['Linear Algebra', 'Statistics', 'Distance Metrics'],
    learningObjectives: [
      'Understand the K-means algorithm and its applications',
      'Learn how to choose the optimal number of clusters',
      'Implement K-means from scratch',
      'Apply K-means to real-world clustering problems',
      'Understand limitations and alternatives to K-means'
    ],
    applications: [
      'Customer segmentation for marketing',
      'Image segmentation and compression',
      'Market research and consumer behavior analysis',
      'Gene sequencing and bioinformatics',
      'Data compression and dimensionality reduction',
      'Recommendation systems'
    ],
    visualization: {
      type: 'Interactive Scatter Plot',
      config: {
        type: 'scatter',
        showCentroids: true,
        showClusters: true,
        animateUpdates: true
      },
      steps: [
        { id: 1, description: 'Initialize k random centroids', animation: 'initCentroids' },
        { id: 2, description: 'Assign each point to nearest centroid', animation: 'assignPoints' },
        { id: 3, description: 'Color points based on cluster assignment', animation: 'colorClusters' },
        { id: 4, description: 'Calculate new centroid positions', animation: 'updateCentroids' },
        { id: 5, description: 'Move centroids to new positions', animation: 'moveCentroids' },
        { id: 6, description: 'Repeat until convergence', animation: 'converge' }
      ]
    },
    codeExamples: [
      {
        language: 'Python',
        code: 'import numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import make_blobs\n\nclass KMeans:\n    def __init__(self, k=3, max_iters=100, tol=1e-4):\n        self.k = k\n        self.max_iters = max_iters\n        self.tol = tol\n        self.centroids = None\n        self.labels = None\n        self.inertia_ = None\n    \n    def fit(self, X):\n        # Initialize centroids\n        self.centroids = self.initialize_centroids(X)\n        \n        for iteration in range(self.max_iters):\n            # Store previous centroids\n            old_centroids = self.centroids.copy()\n            \n            # Assign points to clusters\n            self.labels = self.assign_clusters(X, self.centroids)\n            \n            # Update centroids\n            self.centroids = self.update_centroids(X, self.labels)\n            \n            # Check for convergence\n            if np.all(np.abs(self.centroids - old_centroids) < self.tol):\n                break\n        \n        return self\n    \n    def predict(self, X):\n        return self.assign_clusters(X, self.centroids)',
        explanation: 'Complete K-means implementation with visualization, convergence checking, and evaluation metrics. Includes elbow method for finding optimal k and silhouette analysis for cluster quality assessment.'
      }
    ],
    mathematics: {
      formulas: [
        'Distance: d(p, c) = √(Σ(p_i - c_i)²)',
        'Centroid Update: c_k = (1/|S_k|) * Σ(x_i ∈ S_k)',
        'Objective Function: J = Σ(k=1 to K) Σ(x_i ∈ C_k) ||x_i - μ_k||²',
        'Silhouette Score: s(i) = (b(i) - a(i)) / max(a(i), b(i))'
      ],
      concepts: [
        'Euclidean distance and similarity metrics',
        'Centroid-based clustering',
        'Lloyd\'s algorithm convergence',
        'Cluster validation metrics',
        'Elbow method for optimal k selection',
        'Silhouette analysis',
        'Initialization strategies (K-means++)'
      ],
      proofs: [
        'Convergence proof of Lloyd\'s algorithm',
        'Time complexity analysis O(nkdi)',
        'Local optimality guarantees'
      ]
    },
    relatedAlgorithms: [
      { id: 'hierarchical-clustering', name: 'Hierarchical Clustering', similarity: 75 },
      { id: 'dbscan', name: 'DBSCAN', similarity: 70 },
      { id: 'gaussian-mixture', name: 'Gaussian Mixture Models', similarity: 80 },
      { id: 'spectral-clustering', name: 'Spectral Clustering', similarity: 65 }
    ],
    exercises: [
      {
        id: 'ex1',
        title: 'Customer Segmentation',
        difficulty: 'Easy',
        description: 'Apply K-means to segment customers based on purchasing behavior and demographic data.'
      },
      {
        id: 'ex2',
        title: 'Image Color Quantization',
        difficulty: 'Medium',
        description: 'Use K-means to reduce the number of colors in an image for compression purposes.'
      },
      {
        id: 'ex3',
        title: 'Advanced Clustering Analysis',
        difficulty: 'Hard',
        description: 'Compare K-means with other clustering algorithms and analyze their performance on different datasets.'
      }
    ],
    resources: [
      {
        type: 'Tutorial',
        title: 'K-Means Clustering in Python',
        url: 'https://scikit-learn.org/stable/modules/clustering.html#k-means'
      },
      {
        type: 'Research Paper',
        title: 'K-means++: The Advantages of Careful Seeding',
        url: 'https://theory.stanford.edu/~sergei/papers/kMeansPP-soda.pdf'
      },
      {
        type: 'Interactive Demo',
        title: 'K-Means Clustering Visualization',
        url: 'https://www.naftaliharris.com/blog/visualizing-k-means-clustering/'
      }
    ],
    rating: 4.6,
    reviewCount: 756,
    lastUpdated: '2024-12-18',
    tags: ['unsupervised-learning', 'clustering', 'partitioning', 'centroid-based'],
    level: 'Beginner',
    popularity: 8,
    completionRate: 82
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Fallback endpoint for Firebase connection issues
app.get('/api/connection-status', (req, res) => {
  res.json({
    status: 'OK',
    online: true,
    timestamp: new Date().toISOString(),
    message: 'Server is online and ready to serve requests'
  });
});

// Enhanced API endpoint for detailed algorithm data
app.get('/api/algorithms/detailed/:id', (req, res) => {
  const algorithmId = req.params.id;
  
  if (ALGORITHM_DATA[algorithmId]) {
    res.json({
      success: true,
      data: ALGORITHM_DATA[algorithmId]
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Algorithm not found',
      message: `Algorithm with ID '${algorithmId}' does not exist`
    });
  }
});

// Get all algorithms with basic info
app.get('/api/algorithms', (req, res) => {
  const algorithms = Object.values(ALGORITHM_DATA).map(algo => ({
    id: algo.id,
    name: algo.name,
    category: algo.category,
    difficulty: algo.difficulty,
    description: algo.description,
    estimatedTime: algo.estimatedTime,
    rating: algo.rating,
    reviewCount: algo.reviewCount,
    tags: algo.tags,
    popularity: algo.popularity,
    completionRate: algo.completionRate
  }));
  
  res.json({
    success: true,
    data: algorithms,
    count: algorithms.length
  });
});

// Get algorithms by category
app.get('/api/algorithms/category/:category', (req, res) => {
  const category = req.params.category;
  const algorithms = Object.values(ALGORITHM_DATA)
    .filter(algo => algo.category.toLowerCase() === category.toLowerCase())
    .map(algo => ({
      id: algo.id,
      name: algo.name,
      category: algo.category,
      difficulty: algo.difficulty,
      description: algo.description,
      estimatedTime: algo.estimatedTime,
      rating: algo.rating,
      reviewCount: algo.reviewCount,
      tags: algo.tags,
      popularity: algo.popularity,
      completionRate: algo.completionRate
    }));
  
  res.json({
    success: true,
    data: algorithms,
    count: algorithms.length
  });
});

// Get algorithm statistics
app.get('/api/algorithms/stats', (req, res) => {
  const algorithms = Object.values(ALGORITHM_DATA);
  
  const stats = {
    totalAlgorithms: algorithms.length,
    categories: [...new Set(algorithms.map(algo => algo.category))],
    difficultyDistribution: {
      beginner: algorithms.filter(algo => algo.difficulty === 'Beginner').length,
      intermediate: algorithms.filter(algo => algo.difficulty === 'Intermediate').length,
      advanced: algorithms.filter(algo => algo.difficulty === 'Advanced').length,
      expert: algorithms.filter(algo => algo.difficulty === 'Expert').length
    },
    averageRating: algorithms.reduce((sum, algo) => sum + algo.rating, 0) / algorithms.length,
    averageCompletionRate: algorithms.reduce((sum, algo) => sum + algo.completionRate, 0) / algorithms.length,
    mostPopular: algorithms.sort((a, b) => b.popularity - a.popularity).slice(0, 5),
    recentlyUpdated: algorithms.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).slice(0, 5)
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// Dashboard endpoints
app.get('/api/dashboard/stats', (req, res) => {
  const stats = {
    totalAlgorithms: Object.keys(ALGORITHM_DATA).length,
    completedAlgorithms: 0,
    currentStreak: 0,
    weeklyGoal: 5,
    weeklyProgress: 2,
    totalHours: 0,
    avgSessionTime: 0,
    completionRate: 0,
    globalRank: 1000,
    experiencePoints: 0
  };
  
  res.json({
    success: true,
    data: stats
  });
});

app.get('/api/dashboard/activity', (req, res) => {
  const activities = [
    {
      id: 1,
      type: 'completed',
      algorithm: 'Linear Regression',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      duration: 120,
      accuracy: 95
    },
    {
      id: 2,
      type: 'started',
      algorithm: 'Neural Networks',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      duration: 45,
      accuracy: null
    },
    {
      id: 3,
      type: 'achievement',
      algorithm: 'K-Means Clustering',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      achievement: 'First Algorithm Completed',
      points: 100
    }
  ];
  
  res.json({
    success: true,
    data: activities
  });
});

app.get('/api/dashboard/recommended', (req, res) => {
  const recommended = [
    {
      id: 'linear-regression',
      name: 'Linear Regression',
      category: 'Machine Learning',
      difficulty: 'Beginner',
      estimatedTime: '2-3 hours',
      rating: 4.8,
      reason: 'Perfect for beginners in machine learning'
    },
    {
      id: 'k-means',
      name: 'K-Means Clustering',
      category: 'Machine Learning',
      difficulty: 'Beginner',
      estimatedTime: '2-3 hours',
      rating: 4.6,
      reason: 'Builds on your statistics knowledge'
    },
    {
      id: 'neural-networks',
      name: 'Neural Networks',
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      estimatedTime: '5-6 hours',
      rating: 4.7,
      reason: 'Next step in your learning journey'
    }
  ];
  
  res.json({
    success: true,
    data: recommended
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

// Chat endpoint (simple mock)
app.post('/api/chat', (req, res) => {
  const { message, userId, context } = req.body;
  
  // Simple mock response
  const responses = [
    "That's a great question about machine learning! Let me explain...",
    "I'd be happy to help you understand this concept better.",
    "This is a fundamental topic in AI. Here's what you need to know...",
    "Let me break this down into simpler terms for you.",
    "That's an advanced topic! Let's start with the basics..."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  res.json({
    success: true,
    data: {
      response: randomResponse,
      timestamp: new Date().toISOString(),
      context: context || null
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    offline: false  // Indicate whether this is an offline-related error
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${join(__dirname, 'database.sqlite')}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
