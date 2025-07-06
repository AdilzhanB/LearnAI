import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../contexts/ProgressContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Trophy, 
  Clock, 
  Target, 
  Zap,
  Star,
  Award
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const { getCompletionRate, getTimeSpent } = useProgress();
  const { t } = useTranslation();

  const stats = [
    {
      title: t('dashboard.totalAlgorithms'),
      value: '100+',
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+5 this week'
    },
    {
      title: t('dashboard.completedLessons'),
      value: userProfile?.algorithmsCompleted || 0,
      icon: Trophy,
      color: 'bg-green-500',
      change: '+2 this week'
    },
    {
      title: t('dashboard.currentStreak'),
      value: `${userProfile?.currentStreak || 0} days`,
      icon: Zap,
      color: 'bg-yellow-500',
      change: 'Keep it up!'
    },
    {
      title: t('dashboard.weeklyGoal'),
      value: `${Math.round(getCompletionRate())}%`,
      icon: Target,
      color: 'bg-purple-500',
      change: '3 more to go'
    }
  ];

  const featuredAlgorithms = [
    {
      id: 'neural-network-backpropagation',
      name: 'Neural Network Backpropagation',
      description: 'Learn the fundamental algorithm for training neural networks',
      difficulty: 'Intermediate',
      estimatedTime: '45 min',
      rating: 4.8,
      thumbnail: '/images/algorithms/backpropagation.jpg'
    },
    {
      id: 'convolutional-neural-network',
      name: 'Convolutional Neural Network',
      description: 'Deep learning for computer vision applications',
      difficulty: 'Intermediate',
      estimatedTime: '60 min',
      rating: 4.7,
      thumbnail: '/images/algorithms/cnn.jpg'
    },
    {
      id: 'transformer-architecture',
      name: 'Transformer Architecture',
      description: 'The revolutionary attention-based neural network',
      difficulty: 'Advanced',
      estimatedTime: '90 min',
      rating: 4.9,
      thumbnail: '/images/algorithms/transformer.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.welcome')}, {userProfile?.displayName || 'Learner'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400">
                {stat.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Featured Algorithms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('dashboard.featuredAlgorithms')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-4xl">🧠</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {algorithm.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {algorithm.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {algorithm.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {algorithm.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {algorithm.estimatedTime}
                      </span>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium text-sm">
                      Start Learning →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('dashboard.recentProgress')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Completed Linear Regression
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Started SVM Algorithm
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('dashboard.achievements')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    First Steps
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Complete your first algorithm
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Week Warrior
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    7-day learning streak
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
