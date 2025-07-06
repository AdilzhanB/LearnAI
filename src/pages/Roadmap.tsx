import React from 'react';

const Roadmap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Learning Roadmap
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Roadmap Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your personalized learning path to AI mastery
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
