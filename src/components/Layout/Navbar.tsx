import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const { userProfile } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - could be breadcrumb or page title */}
          <div className="flex items-center space-x-4">
            <div className="ml-64"> {/* Offset for sidebar */}
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                AI Algorithms Academy
              </h1>
            </div>
          </div>

          {/* Right side - actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('common.search')}
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>

            {/* Language selector */}
            <div className="relative">
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="ru">🇷🇺 RU</option>
                <option value="kz">🇰🇿 KZ</option>
              </select>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                {userProfile?.photoURL ? (
                  <img 
                    src={userProfile.photoURL} 
                    alt={userProfile.displayName} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {userProfile?.displayName?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {userProfile?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Level {userProfile?.level || 1}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
