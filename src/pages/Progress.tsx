import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { ProgrammingLanguage } from '../types';
import { 
  BarChart3, 
  Clock, 
  Calendar, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Target, 
  BrainCircuit
} from 'lucide-react';

const Progress: React.FC = () => {
  const { state, refreshAnalytics } = useProgress();
  const { userProfile } = useAuth();
  const { analytics, loading } = state;
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Attempt to refresh analytics when component mounts
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshAnalytics();
    } catch (error) {
      console.error("Failed to refresh analytics:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Helper to format category names from enum values
  const formatCategoryName = (category: string) => {
    // Convert SNAKE_CASE to Title Case With Spaces
    return category
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  // Helper function to derive strength areas from category progress
  const deriveStrengthAreas = () => {
    if (!analytics?.categoriesProgress) return [];
    
    // Convert category progress to array of [category, progress] pairs
    const categories = Object.entries(analytics.categoriesProgress);
    
    // Sort by progress percentage (descending)
    const sortedCategories = categories.sort((a, b) => b[1] - a[1]);
    
    // Return top 3 categories with at least 50% progress
    return sortedCategories
      .filter(([_, progress]) => progress >= 50)
      .slice(0, 3)
      .map(([category]) => formatCategoryName(category));
  };
  
  // Helper function to derive improvement areas from category progress
  const deriveImprovementAreas = () => {
    if (!analytics?.categoriesProgress) return [];
    
    // Convert category progress to array of [category, progress] pairs
    const categories = Object.entries(analytics.categoriesProgress);
    
    // Sort by progress percentage (ascending)
    const sortedCategories = categories.sort((a, b) => a[1] - b[1]);
    
    // Return bottom 3 categories with less than 50% progress
    return sortedCategories
      .filter(([_, progress]) => progress < 50)
      .slice(0, 3)
      .map(([category]) => formatCategoryName(category));
  };
  
  // Helper function to derive next recommended algorithms
  const deriveRecommendedNext = () => {
    // This would ideally come from the API, but for now we'll provide generic recommendations
    return [
      "Complete Linear Regression algorithm exercises",
      "Practice with Decision Trees implementation",
      "Review Neural Networks fundamentals"
    ];
  };

  // Fallback data in case we're offline or data isn't loaded yet
  const fallbackAnalytics = {
    totalAlgorithmsCompleted: analytics?.algorithmsCompleted || 0,
    totalTimeSpent: analytics?.totalTimeSpent || 0,
    currentStreak: analytics?.learningStreak || 0,
    longestStreak: analytics?.learningStreak || 0, // There's no longestStreak in LearningAnalytics, using learningStreak as fallback
    completionRate: analytics?.averageAccuracy || 0, // Using averageAccuracy as a fallback for completionRate
    progressByCategory: analytics?.categoriesProgress || {},
    recentActivity: analytics?.weeklyStats || [],
    learningSpeed: 'steady', // This property doesn't exist in the API, using a default value
    preferredProgrammingLanguage: userProfile?.preferences?.learningPreferences?.preferredProgrammingLanguage || ProgrammingLanguage.PYTHON,
    strengthAreas: deriveStrengthAreas(),
    improvementAreas: deriveImprovementAreas(),
    recommendedNext: deriveRecommendedNext()
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Progress
          </h1>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Algorithms Completed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{fallbackAnalytics.totalAlgorithmsCompleted}</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-center gap-4">
                  <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Time Spent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(fallbackAnalytics.totalTimeSpent / 60)} hrs</p>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{fallbackAnalytics.currentStreak} days</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center gap-4">
                  <div className="bg-amber-100 dark:bg-amber-800 p-3 rounded-full">
                    <Target className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{fallbackAnalytics.completionRate}%</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Strength Areas */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Strengths</h2>
              {fallbackAnalytics.strengthAreas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fallbackAnalytics.strengthAreas.map((area, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">{area}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BrainCircuit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Complete more algorithms to identify your strength areas
                  </p>
                </div>
              )}
            </div>
            
            {/* Areas for Improvement */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Areas for Improvement</h2>
              {fallbackAnalytics.improvementAreas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fallbackAnalytics.improvementAreas.map((area, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">{area}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Complete more algorithms to identify areas for improvement
                  </p>
                </div>
              )}
            </div>
            
            {/* Recommended Next Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recommended Next Steps</h2>
              {fallbackAnalytics.recommendedNext.length > 0 ? (
                <div className="space-y-4">
                  {fallbackAnalytics.recommendedNext.map((recommendation, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">{recommendation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Complete more algorithms to get personalized recommendations
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
