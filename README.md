# AI Algorithms Academy 🚀

A comprehensive, interactive educational platform for learning Deep Learning and Machine Learning algorithms through visualizations, code examples, and AI-powered tutoring.

## 🌟 Features

### 🎯 Core Learning Features
- **100+ Algorithm Implementations** - Complete coverage of ML/DL algorithms
- **Interactive Visualizations** - Dynamic charts, graphs, and animations
- **Multi-language Code Examples** - Python, PyTorch, TensorFlow, and more
- **Mathematical Background** - LaTeX-rendered formulas and explanations
- **Step-by-step Tutorials** - Guided learning paths for all skill levels

### 🤖 AI-Powered Learning
- **Gemini 1.5 Flash Integration** - AI chatbot for personalized explanations
- **Adaptive Learning Paths** - Personalized roadmaps based on progress
- **Smart Recommendations** - Algorithm suggestions based on interests
- **Progress Tracking** - Detailed analytics and achievement system

### 🎨 Modern User Experience
- **Responsive Design** - Works perfectly on desktop and mobile
- **Dark/Light Theme** - Customizable interface preferences
- **Multilingual Support** - English, Russian, and Kazakh languages
- **Real-time Collaboration** - Discussion forums and code sharing

### 🔧 Technical Features
- **Firebase Authentication** - Google OAuth and email/password login
- **Real-time Database** - Progress synchronization across devices
- **Code Playground** - Interactive coding environment
- **Performance Analytics** - Learning metrics and insights

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Recharts** - Interactive data visualizations
- **Three.js** - 3D visualizations for neural networks
- **D3.js** - Advanced data visualization
- **Plotly.js** - Scientific plotting
- **KaTeX** - Mathematical formula rendering

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite** - Lightweight database
- **Firebase** - Authentication and real-time database
- **Gemini API** - AI-powered chat and explanations

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS preprocessing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-algorithms-academy.git
   cd ai-algorithms-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Firebase and Gemini API credentials in `.env`:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server** (in another terminal)
   ```bash
   npm run server
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📚 Project Structure

```
ai-algorithms-academy/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Common/         # Generic components
│   │   ├── Layout/         # Layout components
│   │   └── Visualization/  # Algorithm visualizations
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Algorithm data and utilities
│   ├── i18n/               # Internationalization
│   ├── config/             # Configuration files
│   └── utils/              # Utility functions
├── backend/                # Backend server
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Express middleware
│   └── utils/             # Backend utilities
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server
npm run server

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>🎓 Happy Learning! 🚀</strong>
  <br>
  <em>Master AI algorithms through interactive learning</em>
</div>
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
