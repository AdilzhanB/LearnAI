import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  Star, 
  BookOpen, 
  Play, 
  CheckCircle, 
  Timer,
  Brain,
  Target,
  Eye,
  Rocket,
  Zap,
  Code,
  BarChart3,
  TrendingUp,
  Award,
  Users,
  ChevronRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

// Custom local interface for algorithms that matches the API response
interface AlgorithmData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  estimatedTime: string;
  prerequisites: string[];
  concepts: string[];
}

// Fallback algorithm data for when the API is unavailable
const fallbackAlgorithms: AlgorithmData[] = [
  {
    id: "linear-regression",
    name: "Linear Regression",
    category: "Supervised Learning",
    subcategory: "Regression",
    difficulty: "Beginner",
    description: "A basic algorithm for predicting continuous values using linear relationships between variables.",
    estimatedTime: "30 min",
    prerequisites: ["Basic Statistics", "Calculus"],
    concepts: ["Linear Algebra", "Gradient Descent", "Cost Function"],
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    category: "Supervised Learning",
    subcategory: "Classification",
    difficulty: "Beginner",
    description: "A classification algorithm that predicts the probability of an instance belonging to a given class.",
    estimatedTime: "45 min",
    prerequisites: ["Linear Regression", "Probability"],
    concepts: ["Sigmoid Function", "Binary Classification", "Maximum Likelihood"],
  },
  {
    id: "decision-trees",
    name: "Decision Trees",
    category: "Supervised Learning",
    subcategory: "Classification",
    difficulty: "Intermediate",
    description: "A tree-like model of decisions that predicts the value of a target variable by learning decision rules.",
    estimatedTime: "60 min",
    prerequisites: ["Basic Probability", "Information Theory"],
    concepts: ["Entropy", "Information Gain", "Pruning"],
  }
];

const Algorithms: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [algorithms, setAlgorithms] = useState<AlgorithmData[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadAlgorithms();
    loadCategories();
  }, []);

  const loadAlgorithms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from the API with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/algorithms`, 
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && Array.isArray(data.data)) {
            setAlgorithms(data.data);
            return;
          }
        } else {
          throw new Error(`API returned status ${response.status}`);
        }
      } catch (err) {
        console.warn('Failed to fetch algorithms from API, using fallback data', err);
        if (err instanceof Error) {
          setError(`Could not load algorithms from server: ${err.message}. Using offline data instead.`);
        }
      }
      
      // Use fallback data
      setAlgorithms(fallbackAlgorithms);
    } catch (error) {
      console.error('Error loading algorithms:', error);
      if (error instanceof Error) {
        setError(`Failed to load algorithms: ${error.message}`);
      } else {
        setError('Failed to load algorithms due to an unknown error');
      }
      setAlgorithms([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      // Try to fetch from the API with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/algorithms/categories`, 
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setCategories(data.data || []);
          return;
        }
      } catch (err) {
        console.warn('Failed to fetch categories from API, using fallback data');
      }
      
      // Fallback categories
      const fallbackCategories = [
        { name: 'Supervised Learning', count: 5, difficulties: ['Beginner', 'Intermediate'] },
        { name: 'Unsupervised Learning', count: 3, difficulties: ['Beginner', 'Intermediate', 'Advanced'] },
        { name: 'Deep Learning', count: 4, difficulties: ['Intermediate', 'Advanced'] },
        { name: 'Reinforcement Learning', count: 2, difficulties: ['Advanced'] }
      ];
      
      setCategories(fallbackCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  };

  const filteredAlgorithms = algorithms.filter(algorithm => {
    const matchesSearch = algorithm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         algorithm.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || algorithm.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || algorithm.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedAlgorithms = [...filteredAlgorithms].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-500 bg-green-50 border-green-200';
      case 'Intermediate': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'Advanced': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Supervised Learning': return Target;
      case 'Unsupervised Learning': return Eye;
      case 'Deep Learning': return Brain;
      case 'Reinforcement Learning': return Rocket;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Supervised Learning': return 'bg-blue-500';
      case 'Unsupervised Learning': return 'bg-purple-500';
      case 'Deep Learning': return 'bg-green-500';
      case 'Reinforcement Learning': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading ML algorithms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-lg">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              loadAlgorithms();
              loadCategories();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-slate-800">AI/ML Algorithms</h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Master the fundamental algorithms that power artificial intelligence and machine learning.
            From linear regression to transformers, build your expertise step by step.
          </p>
        </motion.div>

        {/* Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Algorithm Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = getCategoryIcon(category.name);
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${getCategoryColor(category.name)}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800">{category.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{category.count} algorithms</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {category.difficulties.map((difficulty: string) => (
                      <span
                        key={difficulty}
                        className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(difficulty)}`}
                      >
                        {difficulty}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search algorithms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="difficulty">Sort by Difficulty</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Algorithm Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedAlgorithms.map((algorithm, index) => {
            const Icon = getCategoryIcon(algorithm.category);
            return (
              <motion.div
                key={algorithm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(algorithm.category)}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {algorithm.name}
                        </h3>
                        <p className="text-sm text-slate-500">{algorithm.category}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getDifficultyColor(algorithm.difficulty)}`}>
                      {algorithm.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {algorithm.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{algorithm.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-slate-600">4.8</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {algorithm.concepts && algorithm.concepts.length > 0 ? (
                        <>
                          {algorithm.concepts.slice(0, 3).map((concept, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {concept}
                            </span>
                          ))}
                          {algorithm.concepts.length > 3 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                              +{algorithm.concepts.length - 3} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          No concepts listed
                        </span>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Play className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">Start Learning</span>
                        </div>
                        <Link
                          to={`/algorithms/${algorithm.id}`}
                          className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center space-x-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {sortedAlgorithms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-200"
          >
            <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No algorithms found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Algorithms;
