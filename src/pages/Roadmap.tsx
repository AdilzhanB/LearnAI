import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { Link } from 'react-router-dom';
import { ProgressStatus } from '../types';
import { 
  BookOpen, 
  ChevronRight, 
  Check, 
  Lock, 
  Clock, 
  AlertCircle,
  Brain,
  MapPin
} from 'lucide-react';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  type: 'algorithm' | 'concept' | 'milestone';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'completed' | 'in-progress' | 'locked' | 'available';
  prerequisites: string[];
  estimatedTime: number; // in minutes
  category: string;
  algorithmId?: string;
}

const Roadmap: React.FC = () => {
  const { userProfile } = useAuth();
  const { state } = useProgress();
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoadmap();
  }, [userProfile]);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API first
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/roadmap`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.data)) {
            processRoadmapData(data.data);
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch roadmap data from API, using fallback data', err);
      }

      // Fallback data when offline or API fails
      const fallbackRoadmap: RoadmapNode[] = [
        {
          id: 'intro-ml',
          title: 'Introduction to Machine Learning',
          description: 'Fundamentals of ML and core concepts',
          type: 'concept',
          difficulty: 'beginner',
          status: 'available',
          prerequisites: [],
          estimatedTime: 60,
          category: 'fundamentals'
        },
        {
          id: 'linear-regression',
          title: 'Linear Regression',
          description: 'Learn simple and multiple linear regression',
          type: 'algorithm',
          difficulty: 'beginner',
          status: 'available',
          prerequisites: ['intro-ml'],
          estimatedTime: 90,
          category: 'supervised',
          algorithmId: 'linear-regression'
        },
        {
          id: 'logistic-regression',
          title: 'Logistic Regression',
          description: 'Classification using logistic regression',
          type: 'algorithm',
          difficulty: 'beginner',
          status: 'locked',
          prerequisites: ['linear-regression'],
          estimatedTime: 90,
          category: 'supervised',
          algorithmId: 'logistic-regression'
        },
        {
          id: 'decision-trees',
          title: 'Decision Trees',
          description: 'Building and optimizing decision trees',
          type: 'algorithm',
          difficulty: 'intermediate',
          status: 'locked',
          prerequisites: ['logistic-regression'],
          estimatedTime: 120,
          category: 'supervised',
          algorithmId: 'decision-trees'
        },
        {
          id: 'clustering',
          title: 'K-Means Clustering',
          description: 'Unsupervised learning through clustering',
          type: 'algorithm',
          difficulty: 'intermediate',
          status: 'locked',
          prerequisites: ['intro-ml'],
          estimatedTime: 120,
          category: 'unsupervised',
          algorithmId: 'kmeans'
        },
        {
          id: 'neural-networks',
          title: 'Neural Networks Fundamentals',
          description: 'Foundations of neural network architecture',
          type: 'concept',
          difficulty: 'advanced',
          status: 'locked',
          prerequisites: ['decision-trees', 'clustering'],
          estimatedTime: 180,
          category: 'deep-learning'
        },
        {
          id: 'cnn',
          title: 'Convolutional Neural Networks',
          description: 'Image processing with CNNs',
          type: 'algorithm',
          difficulty: 'advanced',
          status: 'locked',
          prerequisites: ['neural-networks'],
          estimatedTime: 240,
          category: 'deep-learning',
          algorithmId: 'cnn'
        }
      ];

      // Update the status based on user progress
      processRoadmapData(fallbackRoadmap);
    } catch (err) {
      console.error('Error fetching roadmap:', err);
      setError('Failed to load roadmap data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const processRoadmapData = (data: RoadmapNode[]) => {
    // Process each node to determine its status based on user progress
    const updatedNodes = data.map(node => {
      // Check if this algorithm is completed in user progress
      if (node.type === 'algorithm' && node.algorithmId) {
        const progress = state.userProgress[node.algorithmId];
        if (progress?.status === ProgressStatus.COMPLETED) {
          return { ...node, status: 'completed' as const };
        } else if (progress?.status === ProgressStatus.IN_PROGRESS) {
          return { ...node, status: 'in-progress' as const };
        }
      }

      // Check if all prerequisites are met
      const allPrereqsMet = node.prerequisites.every(prereqId => {
        const prereqNode = data.find(n => n.id === prereqId);
        return prereqNode?.status === 'completed';
      });

      if (allPrereqsMet) {
        return { ...node, status: 'available' as const };
      }

      return node;
    });

    setRoadmapNodes(updatedNodes);
  };

  const filteredNodes = selectedCategory === 'all' 
    ? roadmapNodes 
    : roadmapNodes.filter(node => node.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'fundamentals', name: 'Fundamentals' },
    { id: 'supervised', name: 'Supervised Learning' },
    { id: 'unsupervised', name: 'Unsupervised Learning' },
    { id: 'deep-learning', name: 'Deep Learning' }
  ];

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return { label: 'Beginner', color: 'bg-green-100 text-green-800 border-green-200' };
      case 'intermediate': return { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
      case 'advanced': return { label: 'Advanced', color: 'bg-red-100 text-red-800 border-red-200' };
      default: return { label: 'Unknown', color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'locked': return <Lock className="h-5 w-5 text-gray-400" />;
      case 'available': return <ChevronRight className="h-5 w-5 text-blue-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
          <button 
            onClick={fetchRoadmap}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Roadmap
          </h1>
          <div className="flex items-center gap-2">
            <label htmlFor="category-filter" className="text-sm text-gray-600 dark:text-gray-400">
              Filter by:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredNodes.length > 0 ? (
          <div className="space-y-4">
            {filteredNodes.map((node) => {
              const difficulty = getDifficultyLabel(node.difficulty);
              const isClickable = node.status !== 'locked' && node.type === 'algorithm' && node.algorithmId;
              
              return (
                <div 
                  key={node.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden ${
                    isClickable ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
                  }`}
                >
                  {isClickable ? (
                    <Link to={`/algorithms/${node.algorithmId}`} className="block p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                            {node.type === 'algorithm' ? (
                              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            ) : node.type === 'concept' ? (
                              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            ) : (
                              <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{node.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{node.description}</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full border ${difficulty.color}`}>
                                {difficulty.label}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {node.estimatedTime} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>{getStatusIcon(node.status)}</div>
                      </div>
                    </Link>
                  ) : (
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                            {node.type === 'algorithm' ? (
                              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            ) : node.type === 'concept' ? (
                              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            ) : (
                              <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{node.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{node.description}</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full border ${difficulty.color}`}>
                                {difficulty.label}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {node.estimatedTime} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>{getStatusIcon(node.status)}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No roadmap items found for the selected category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
