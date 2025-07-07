import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  Brain,
  ChevronRight,
  Play,
  Star,
  Users,
  Zap,
  BarChart3,
  Calendar,
  Trophy,
  TrendingDown,
  Activity,
  Flame,
  Crown,
  Database,
  Eye,
  Layers,
  GitBranch,
  Cpu,
  Network,
  BarChart,
  PieChart,
  LineChart,
  Bell,
  ArrowUp,
  ArrowDown,
  Rocket,
  Timer,
  CheckCircle,
  AlertCircle,
  Map,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

interface DashboardStats {
  totalAlgorithms: number;
  completedAlgorithms: number;
  currentStreak: number;
  weeklyGoal: number;
  totalLearningTime: number;
  rank: number;
  totalUsers: number;
  weeklyProgress: number;
  points: number;
  completionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'completed' | 'started' | 'reviewed' | 'achievement';
  algorithmName: string;
  timestamp: string;
  score?: number;
  icon?: React.ReactNode;
}

interface RecommendedAlgorithm {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  progress: number;
  description: string;
  concepts: string[];
}

interface LearningPathStep {
  id: string;
  title: string;
  completed: number;
  total: number;
  color: string;
  icon: React.ReactNode;
  description: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { state } = useProgress();
  const [stats, setStats] = useState<DashboardStats>({
    totalAlgorithms: 0,
    completedAlgorithms: 0,
    currentStreak: 0,
    weeklyGoal: 0,
    totalLearningTime: 0,
    rank: 0,
    totalUsers: 0,
    weeklyProgress: 0,
    points: 0,
    completionRate: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [recommendedAlgorithms, setRecommendedAlgorithms] = useState<RecommendedAlgorithm[]>([]);
  const [learningPath, setLearningPath] = useState<LearningPathStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Define a helper function to set fallback data when API calls fail
    const setFallbackData = () => {
      // Set stats with fallback data
      setStats({
        totalAlgorithms: 127,
        completedAlgorithms: 23,
        currentStreak: 12,
        weeklyGoal: 15,
        totalLearningTime: 2847,
        rank: 156,
        totalUsers: 8429,
        weeklyProgress: 8,
        points: 4750,
        completionRate: 18.1
      });
      
      // Set recent activity with enriched data
      setRecentActivity([
        {
          id: '1',
          type: 'completed',
          algorithmName: 'Transformer Architecture',
          timestamp: '2 hours ago',
          score: 95,
          icon: <Trophy className="w-4 h-4 text-green-600" />
        },
        {
          id: '2',
          type: 'achievement',
          algorithmName: 'Deep Learning Fundamentals',
          timestamp: '5 hours ago',
          icon: <Crown className="w-4 h-4 text-yellow-600" />
        },
        {
          id: '3',
          type: 'started',
          algorithmName: 'Convolutional Neural Networks',
          timestamp: '1 day ago',
          icon: <Play className="w-4 h-4 text-blue-600" />
        },
        {
          id: '4',
          type: 'reviewed',
          algorithmName: 'Neural Networks Basics',
          timestamp: '2 days ago',
          score: 89,
          icon: <Star className="w-4 h-4 text-purple-600" />
        }
      ]);
      
      // Set recommended algorithms with detailed content
      setRecommendedAlgorithms([
        {
          id: 'attention-mechanisms',
          name: 'Attention Mechanisms',
          category: 'Deep Learning',
          difficulty: 'Advanced',
          estimatedTime: '5 hours',
          progress: 0,
          description: 'Master the attention mechanism that powers modern AI systems like GPT and BERT',
          concepts: ['Self-Attention', 'Multi-Head Attention', 'Positional Encoding', 'Transformer Architecture']
        },
        {
          id: 'gan-networks',
          name: 'Generative Adversarial Networks',
          category: 'Deep Learning',
          difficulty: 'Advanced',
          estimatedTime: '6 hours',
          progress: 0,
          description: 'Learn how GANs generate realistic images and data through adversarial training',
          concepts: ['Generator Networks', 'Discriminator Networks', 'Adversarial Loss', 'Training Stability']
        },
        {
          id: 'reinforcement-learning',
          name: 'Reinforcement Learning',
          category: 'Machine Learning',
          difficulty: 'Intermediate',
          estimatedTime: '4 hours',
          progress: 0,
          description: 'Explore how AI can learn through interaction with environments',
          concepts: ['Q-Learning', 'Policy Gradients', 'Reward Functions', 'Markov Decision Processes']
        }
      ]);
      
      // Set learning path
      setLearningPath([
        {
          id: '1',
          title: 'AI/ML Foundations',
          completed: 0,
          total: 0,
          color: 'green',
          icon: <BookOpen className="w-6 h-6" />,
          description: 'Mathematical foundations and basic concepts'
        },
        {
          id: '2',
          title: 'Neural Networks & Deep Learning',
          completed: 100,
          total: 0,
          color: 'blue',
          icon: <Brain className="w-6 h-6" />,
          description: 'Deep learning architectures and neural networks'
        },
        {
          id: '3',
          title: 'Advanced Models & Architectures',
          completed: 0,
          total: 0,
          color: 'purple',
          icon: <Rocket className="w-6 h-6" />,
          description: 'Advanced models and architectures'
        },
        {
          id: '4',
          title: 'Specialized Applications',
          completed: 0,
          total: 0,
          color: 'yellow',
          icon: <Trophy className="w-6 h-6" />,
          description: 'Specialized AI/ML applications'
        }
      ]);
    };

    try {
      // Check if server is accessible first
      const healthCheck = await fetch('http://localhost:3001/api/health')
        .then(res => res.json())
        .catch(() => ({ status: 'ERROR' }));
      
      if (healthCheck.status !== 'OK') {
        console.warn('Backend server is not available, using fallback data');
        setFallbackData();
        setLoading(false);
        return;
      }
      
      // Fetch multiple endpoints in parallel with timeouts
      const fetchWithTimeout = (url: string, timeout = 5000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        return fetch(url, { signal: controller.signal })
          .then(response => {
            clearTimeout(id);
            return response;
          })
          .catch(error => {
            clearTimeout(id);
            console.error(`Fetch error for ${url}:`, error);
            return new Response(JSON.stringify({ success: false }));
          });
      };
      
      const [statsResponse, activityResponse, recommendedResponse] = await Promise.all([
        fetchWithTimeout('http://localhost:3001/api/dashboard/stats'),
        fetchWithTimeout('http://localhost:3001/api/dashboard/activity'),
        fetchWithTimeout('http://localhost:3001/api/dashboard/recommended')
      ]);

      const statsData = await statsResponse.json().catch(() => ({ success: false }));
      const activityData = await activityResponse.json().catch(() => ({ success: false }));
      const recommendedData = await recommendedResponse.json().catch(() => ({ success: false }));
      
      // Set stats with fallback data
      setStats(statsData.success ? statsData.data : {
        totalAlgorithms: 127,
        completedAlgorithms: 23,
        currentStreak: 12,
        weeklyGoal: 15,
        totalLearningTime: 2847,
        rank: 156,
        totalUsers: 8429,
        weeklyProgress: 8,
        points: 4750,
        completionRate: 18.1
      });
      
      // Set recent activity with enriched data
      setRecentActivity(activityData.success ? activityData.data : [
        {
          id: '1',
          type: 'completed',
          algorithmName: 'Transformer Architecture',
          timestamp: '2 hours ago',
          score: 95,
          icon: <Trophy className="w-4 h-4 text-green-600" />
        },
        {
          id: '2',
          type: 'achievement',
          algorithmName: 'Deep Learning Fundamentals',
          timestamp: '5 hours ago',
          icon: <Crown className="w-4 h-4 text-yellow-600" />
        },
        {
          id: '3',
          type: 'started',
          algorithmName: 'Convolutional Neural Networks',
          timestamp: '1 day ago',
          icon: <Play className="w-4 h-4 text-blue-600" />
        },
        {
          id: '4',
          type: 'reviewed',
          algorithmName: 'Neural Networks Basics',
          timestamp: '2 days ago',
          score: 89,
          icon: <Star className="w-4 h-4 text-purple-600" />
        }
      ]);
      
      // Set recommended algorithms with detailed content
      setRecommendedAlgorithms(recommendedData.success ? recommendedData.data : [
        {
          id: 'attention-mechanisms',
          name: 'Attention Mechanisms',
          category: 'Deep Learning',
          difficulty: 'Advanced',
          estimatedTime: '5 hours',
          progress: 0,
          description: 'Master the attention mechanism that powers modern AI systems like GPT and BERT',
          concepts: ['Self-Attention', 'Multi-Head Attention', 'Positional Encoding', 'Transformer Architecture']
        },
        {
          id: 'gan-networks',
          name: 'Generative Adversarial Networks',
          category: 'Deep Learning',
          difficulty: 'Advanced',
          estimatedTime: '6 hours',
          progress: 0,
          description: 'Learn how GANs generate realistic images and data through adversarial training',
          concepts: ['Generator Networks', 'Discriminator Networks', 'Adversarial Loss', 'Training Stability']
        },
        {
          id: 'reinforcement-learning',
          name: 'Reinforcement Learning',
          category: 'Machine Learning',
          difficulty: 'Intermediate',
          estimatedTime: '4 hours',
          progress: 0,
          description: 'Explore how AI can learn through interaction with environments',
          concepts: ['Q-Learning', 'Policy Gradients', 'Reward Functions', 'Markov Decision Processes']
        }
      ]);

      // Set learning path with detailed progression
      setLearningPath([
        {
          id: 'foundations',
          title: 'AI/ML Foundations',
          completed: 12,
          total: 15,
          color: 'green',
          icon: <BookOpen className="w-6 h-6" />,
          description: 'Mathematical foundations and basic concepts'
        },
        {
          id: 'supervised',
          title: 'Supervised Learning',
          completed: 8,
          total: 18,
          color: 'blue',
          icon: <Target className="w-6 h-6" />,
          description: 'Classification and regression algorithms'
        },
        {
          id: 'unsupervised',
          title: 'Unsupervised Learning',
          completed: 3,
          total: 12,
          color: 'purple',
          icon: <Eye className="w-6 h-6" />,
          description: 'Clustering, dimensionality reduction, and pattern discovery'
        },
        {
          id: 'deep-learning',
          title: 'Deep Learning',
          completed: 7,
          total: 25,
          color: 'red',
          icon: <Brain className="w-6 h-6" />,
          description: 'Neural networks and deep learning architectures'
        },
        {
          id: 'advanced',
          title: 'Advanced Topics',
          completed: 2,
          total: 20,
          color: 'yellow',
          icon: <Rocket className="w-6 h-6" />,
          description: 'Cutting-edge techniques and research topics'
        }
      ]);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use our fallback data in case of any error
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPathColor = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getProgressColor = (color: string) => {
    const colors = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="space-y-6">
        {/* Hero Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 rounded-2xl p-8 text-white relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}
          ></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {t('dashboard.welcome')}, {user?.displayName || 'AI Explorer'}! 🚀
                </h1>
                <p className="text-primary-100 text-lg">
                  {t('dashboard.subtitle')}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stats.currentStreak}</div>
                  <div className="text-sm text-primary-200">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">#{stats.rank}</div>
                  <div className="text-sm text-primary-200">Global Rank</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                    <Star className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stats.points}</div>
                  <div className="text-sm text-primary-200">Points</div>
                </div>
              </div>
            </div>

            {/* Quick Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-200">Weekly Goal Progress</span>
                <span className="text-sm font-semibold">{stats.weeklyProgress}/{stats.weeklyGoal}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: t('dashboard.totalAlgorithms'),
            value: stats.totalAlgorithms,
            icon: <Database className="w-6 h-6" />,
            color: 'blue',
            trend: '+12%',
            trendUp: true
          },
          {
            title: t('dashboard.completedLessons'),
            value: stats.completedAlgorithms,
            icon: <CheckCircle className="w-6 h-6" />,
            color: 'green',
            trend: '+8%',
            trendUp: true
          },
          {
            title: 'Learning Time',
            value: `${Math.floor(stats.totalLearningTime / 60)}h`,
            icon: <Timer className="w-6 h-6" />,
            color: 'purple',
            trend: '+2h',
            trendUp: true
          },
          {
            title: 'Completion Rate',
            value: `${stats.completionRate}%`,
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'orange',
            trend: '+2.3%',
            trendUp: true
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'purple' ? 'bg-purple-100' :
                'bg-orange-100'
              }`}>
                <div className={`${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`flex items-center text-sm ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trendUp ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Recommended Algorithms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-primary-600" />
              {t('dashboard.recommendedForYou')}
            </h2>
            <Link 
              to="/algorithms" 
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recommendedAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {algorithm.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getDifficultyColor(algorithm.difficulty)}`}>
                        {algorithm.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{algorithm.description}</p>
                    
                    {/* Concepts Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {algorithm.concepts && algorithm.concepts.slice(0, 3).map((concept, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                        >
                          {concept}
                        </span>
                      ))}
                      {algorithm.concepts && algorithm.concepts.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
                          +{algorithm.concepts.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {algorithm.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {algorithm.category}
                      </span>
                    </div>
                    
                    {algorithm.progress > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900 font-medium">{algorithm.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${algorithm.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <Link 
                    to={`/algorithms/${algorithm.id}`}
                    className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors group-hover:shadow-md"
                  >
                    {algorithm.progress > 0 ? 'Continue' : 'Start Learning'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-primary-600" />
            {t('dashboard.recentActivity')}
          </h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.type === 'achievement' ? 'Achievement Unlocked!' : activity.algorithmName}
                  </p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
                {activity.score && (
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-green-600">{activity.score}%</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <Link 
            to="/progress"
            className="w-full mt-4 px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-center block"
          >
            {t('dashboard.viewAllActivity')}
          </Link>
        </motion.div>
      </div>

      {/* Enhanced Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Map className="w-6 h-6 mr-2 text-primary-600" />
            {t('dashboard.learningPath')}
          </h2>
          <Link 
            to="/roadmap" 
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            View Roadmap <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {learningPath.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${getPathColor(step.color)}`}>
                <div className={`${
                  step.color === 'green' ? 'text-green-600' :
                  step.color === 'blue' ? 'text-blue-600' :
                  step.color === 'purple' ? 'text-purple-600' :
                  step.color === 'red' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {step.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{step.description}</p>
              <p className="text-sm text-gray-700 font-medium mb-2">
                {step.completed}/{step.total} completed
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(step.color)}`}
                  style={{ width: `${(step.completed / step.total) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </React.Fragment>
  );
}
export default Dashboard;