import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Home, 
  BookOpen, 
  Map, 
  TrendingUp, 
  MessageCircle, 
  User, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  Monitor,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { theme, actualTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    // Save collapsed state to localStorage
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
    
    // Update body class to adjust main content margin
    document.body.classList.toggle('sidebar-collapsed', collapsed);
  }, [collapsed]);

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Home, path: '/dashboard' },
    { id: 'algorithms', label: t('nav.algorithms'), icon: BookOpen, path: '/algorithms' },
    { id: 'roadmap', label: t('nav.roadmap'), icon: Map, path: '/roadmap' },
    { id: 'progress', label: t('nav.progress'), icon: TrendingUp, path: '/progress' },
    { id: 'chat', label: t('nav.chat'), icon: MessageCircle, path: '/chat' },
    { id: 'profile', label: t('nav.profile'), icon: User, path: '/profile' },
    { id: 'settings', label: t('nav.settings'), icon: Settings, path: '/settings' },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return Sun;
      case 'dark': return Moon;
      default: return Monitor;
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 shadow-lg z-40 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  AI Academy
                </span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            title={collapsed ? 'Toggle theme' : undefined}
          >
            <ThemeIcon size={20} />
            {!collapsed && <span className="font-medium">Theme</span>}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            title={collapsed ? t('nav.logout') : undefined}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">{t('nav.logout')}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
