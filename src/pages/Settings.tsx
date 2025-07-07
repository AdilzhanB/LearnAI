import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Monitor, Bell, Globe, Eye, Lock, CloudOff } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'kz', name: 'Kazakh', flag: '🇰🇿' }
  ];
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('settings.title', 'Settings')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sun className="mr-2" size={20} />
            {t('settings.appearance', 'Appearance')}
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('settings.chooseTheme', 'Choose your preferred theme:')}
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => setTheme('light')}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  theme === 'light' 
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Sun size={18} className="mr-2" />
                  <span>{t('settings.lightTheme', 'Light')}</span>
                </div>
                {theme === 'light' && (
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                )}
              </button>
              
              <button 
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Moon size={18} className="mr-2" />
                  <span>{t('settings.darkTheme', 'Dark')}</span>
                </div>
                {theme === 'dark' && (
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                )}
              </button>
              
              <button 
                onClick={() => setTheme('system')}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  theme === 'system' 
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Monitor size={18} className="mr-2" />
                  <span>{t('settings.systemTheme', 'System Default')}</span>
                </div>
                {theme === 'system' && (
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Globe className="mr-2" size={20} />
            {t('settings.language', 'Language')}
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('settings.chooseLanguage', 'Choose your preferred language:')}
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              {languages.map(lang => (
                <button 
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    i18n.language === lang.code 
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {i18n.language === lang.code && (
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Other Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="mr-2" size={20} />
            {t('settings.preferences', 'Preferences')}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Bell size={18} className="mr-2" />
                <span>{t('settings.notifications', 'Notifications')}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <CloudOff size={18} className="mr-2" />
                <span>{t('settings.offlineMode', 'Offline Mode')}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={offlineMode}
                  onChange={() => setOfflineMode(!offlineMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Lock size={18} className="mr-2" />
                <span>{t('settings.privacyMode', 'Privacy Mode')}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={privacyMode}
                  onChange={() => setPrivacyMode(!privacyMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Eye size={18} className="mr-2" />
                <span>{t('settings.accessibility', 'Accessibility Mode')}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={accessibilityMode}
                  onChange={() => setAccessibilityMode(!accessibilityMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('settings.dataSecurity', 'Data & Security')}
        </h2>
        
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {t('settings.dataDesc', 'Manage your data and security preferences:')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">
                {t('settings.exportData', 'Export Your Data')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('settings.exportDesc', 'Download a copy of your learning data and progress')}
              </p>
            </button>
            
            <button className="text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">
                {t('settings.clearCache', 'Clear Cache')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('settings.cacheDesc', 'Clear local storage and cached data')}
              </p>
            </button>
            
            <button className="text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">
                {t('settings.syncSettings', 'Sync Settings')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('settings.syncDesc', 'Sync your settings across devices')}
              </p>
            </button>
            
            <button className="text-left p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <h3 className="text-md font-medium text-red-600 dark:text-red-400 mb-1">
                {t('settings.deleteAccount', 'Delete Account')}
              </h3>
              <p className="text-sm text-red-600/80 dark:text-red-400/80">
                {t('settings.deleteDesc', 'Permanently delete your account and all data')}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
