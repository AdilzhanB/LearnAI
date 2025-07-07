import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  Clock, 
  Target, 
  Brain,
  Code,
  BarChart3,
  Eye,
  Lightbulb,
  Download,
  Share2,
  Heart,
  Star,
  ChevronRight,
  Users,
  Award,
  CheckCircle,
  AlertTriangle,
  Info,
  PlayCircle,
  PauseCircle,
  SkipForward,
  RotateCcw,
  Settings,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Layers,
  GitBranch,
  Cpu,
  Database,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AlgorithmData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  difficulty: string;
  description: string;
  longDescription: string;
  timeToComplete: number;
  prerequisites: string[];
  learningObjectives: string[];
  applications: string[];
  visualization: {
    type: string;
    config: any;
    steps: any[];
  };
  codeExamples: {
    language: string;
    code: string;
    explanation: string;
  }[];
  mathematics: {
    formulas: string[];
    concepts: string[];
    proofs: string[];
  };
  relatedAlgorithms: {
    id: string;
    name: string;
    similarity: number;
  }[];
  exercises: {
    id: string;
    title: string;
    difficulty: string;
    description: string;
  }[];
  resources: {
    type: string;
    title: string;
    url: string;
  }[];
  rating: number;
  reviewCount: number;
  estimatedTime: string;
  lastUpdated: string;
  tags: string[];
  level: string;
  popularity: number;
  completionRate: number;
}

const AlgorithmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [algorithm, setAlgorithm] = useState<AlgorithmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [visualizationPlaying, setVisualizationPlaying] = useState(false);
  const [visualizationStep, setVisualizationStep] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const visualizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAlgorithmData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/algorithms/detailed/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAlgorithm(data.data);
        }
      } catch (error) {
        console.error('Error fetching algorithm data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlgorithmData();
    }
  }, [id]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleVisualization = () => {
    setVisualizationPlaying(!visualizationPlaying);
  };

  const nextStep = () => {
    if (algorithm && visualizationStep < algorithm.visualization.steps.length - 1) {
      setVisualizationStep(visualizationStep + 1);
    }
  };

  const resetVisualization = () => {
    setVisualizationStep(0);
    setVisualizationPlaying(false);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!algorithm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('errors.algorithmNotFound')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('errors.algorithmNotFoundDesc')}
          </p>
          <Link
            to="/algorithms"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.backToAlgorithms')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/algorithms"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {algorithm.name}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {algorithm.category}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    algorithm.difficulty === 'Beginner' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : algorithm.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {algorithm.difficulty}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {algorithm.estimatedTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {algorithm.rating}/5 ({algorithm.reviewCount} {t('common.reviews')})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <BookOpen className="h-5 w-5" />
              </button>
              <button
                onClick={toggleLike}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Play className="h-4 w-4 mr-2 inline" />
                {t('algorithmDetail.startLearning')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: t('algorithmDetail.overview'), icon: Info },
              { id: 'visualization', label: t('algorithmDetail.visualization'), icon: Eye },
              { id: 'code', label: t('algorithmDetail.code'), icon: Code },
              { id: 'mathematics', label: t('algorithmDetail.mathematics'), icon: Brain },
              { id: 'exercises', label: t('algorithmDetail.exercises'), icon: Target },
              { id: 'resources', label: t('algorithmDetail.resources'), icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t('algorithmDetail.description')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {algorithm.longDescription}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        {t('algorithmDetail.learningObjectives')}
                      </h4>
                      <ul className="space-y-2">
                        {algorithm.learningObjectives.map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        {t('algorithmDetail.applications')}
                      </h4>
                      <ul className="space-y-2">
                        {algorithm.applications.map((application, index) => (
                          <li key={index} className="flex items-start">
                            <Zap className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{application}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t('algorithmDetail.prerequisites')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {algorithm.prerequisites.map((prereq, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'visualization' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('algorithmDetail.interactiveVisualization')}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleSound}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    ref={visualizationRef}
                    className={`${fullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-800' : ''} rounded-lg bg-gray-50 dark:bg-gray-900 p-6 min-h-[400px] flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">🧠</div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {algorithm.visualization.type} Visualization
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Interactive {algorithm.name} algorithm visualization
                      </p>
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={toggleVisualization}
                          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          {visualizationPlaying ? <PauseCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
                          {visualizationPlaying ? t('common.pause') : t('common.play')}
                        </button>
                        <button
                          onClick={nextStep}
                          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <SkipForward className="h-4 w-4 mr-2" />
                          {t('common.nextStep')}
                        </button>
                        <button
                          onClick={resetVisualization}
                          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          {t('common.reset')}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Step {visualizationStep + 1} of {algorithm.visualization.steps.length}: 
                      {algorithm.visualization.steps[visualizationStep]?.description || 'Loading...'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'code' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {algorithm.codeExamples.map((example, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {example.language} Implementation
                      </h3>
                      <button className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Download className="h-4 w-4 mr-2" />
                        {t('common.copy')}
                      </button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {example.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'mathematics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t('algorithmDetail.mathematicalFoundation')}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        {t('algorithmDetail.keyFormulas')}
                      </h4>
                      <div className="space-y-2">
                        {algorithm.mathematics.formulas.map((formula, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <code className="text-sm text-gray-800 dark:text-gray-200">{formula}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        {t('algorithmDetail.keyConcepts')}
                      </h4>
                      <ul className="space-y-2">
                        {algorithm.mathematics.concepts.map((concept, index) => (
                          <li key={index} className="flex items-start">
                            <Brain className="h-4 w-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'exercises' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t('algorithmDetail.practiceExercises')}
                  </h3>
                  <div className="space-y-4">
                    {algorithm.exercises.map((exercise, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{exercise.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            exercise.difficulty === 'Easy' 
                              ? 'bg-green-100 text-green-800'
                              : exercise.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {exercise.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{exercise.description}</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          {t('common.startExercise')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t('algorithmDetail.additionalResources')}
                  </h3>
                  <div className="space-y-4">
                    {algorithm.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{resource.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{resource.type}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          {t('common.open')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('common.progress')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('algorithmDetail.completion')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">0%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('algorithmDetail.timeSpent')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">0 min</span>
                </div>
              </div>
            </div>

            {/* Related Algorithms */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('algorithmDetail.relatedAlgorithms')}
              </h3>
              <div className="space-y-3">
                {algorithm.relatedAlgorithms.map((related, index) => (
                  <Link
                    key={index}
                    to={`/algorithm/${related.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{related.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{related.similarity}%</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Algorithm Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('algorithmDetail.algorithmStats')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('algorithmDetail.popularity')}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{algorithm.popularity}/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('algorithmDetail.completionRate')}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{algorithm.completionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('algorithmDetail.lastUpdated')}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{algorithm.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDetail;
