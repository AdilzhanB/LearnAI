import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Pages (lazy loaded for better performance)
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Algorithms = React.lazy(() => import('./pages/Algorithms'));
const AlgorithmDetail = React.lazy(() => import('./pages/AlgorithmDetail'));
const Roadmap = React.lazy(() => import('./pages/Roadmap'));
const Progress = React.lazy(() => import('./pages/Progress'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Auth = React.lazy(() => import('./pages/Auth'));

// Context Providers
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const { i18n } = useTranslation();
  const location = useLocation();

  console.log('AppContent: user =', user, 'loading =', loading);

  if (loading) {
    console.log('AppContent: Showing loading spinner');
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    console.log('AppContent: No user, showing Auth page');
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <Suspense fallback={<LoadingSpinner size="large" />}>
          <Auth />
        </Suspense>
      </div>
    );
  }

  console.log('AppContent: User authenticated, showing main app');
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16 md:ml-64 p-6 mt-16 transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<LoadingSpinner size="large" />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/algorithms" element={<Algorithms />} />
                  <Route path="/algorithms/:id" element={<AlgorithmDetail />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  console.log('App: Starting application');
  
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
            <Router>
              <AppContent />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </Router>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
