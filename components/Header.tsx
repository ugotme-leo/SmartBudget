import React from 'react';
import { View } from '../types';
import { useTranslations } from '../contexts/LanguageContext';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  user: string;
  onLogout: () => void;
}

const NavButton: React.FC<{
  label: string;
  view: View;
  currentView: View;
  onClick: (view: View) => void;
  icon: React.ReactNode;
}> = ({ label, view, currentView, onClick, icon }) => {
  const isActive = currentView === view;
  return (
    <button
      onClick={() => onClick(view)}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, user, onLogout }) => {
  const t = useTranslations();

  return (
    <header className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <h1 className="text-xl md:text-2xl font-bold text-white">{t('appName')}</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-slate-300 text-sm hidden sm:inline capitalize" title={user}>{user}</span>
            <nav className="flex items-center space-x-1 md:space-x-2">
              <NavButton
                  label={t('dashboard')}
                  view={View.Dashboard}
                  currentView={currentView}
                  onClick={setCurrentView}
                  icon={<HomeIcon />}
                />
                <NavButton
                  label={t('reports')}
                  view={View.Reports}
                  currentView={currentView}
                  onClick={setCurrentView}
                  icon={<ChartIcon />}
                />
                <NavButton
                  label={t('categories')}
                  view={View.Categories}
                  currentView={currentView}
                  onClick={setCurrentView}
                  icon={<TagIcon />}
                />
                <NavButton
                  label={t('settings')}
                  view={View.Settings}
                  currentView={currentView}
                  onClick={setCurrentView}
                  icon={<SettingsIcon />}
                />
            </nav>
            <button 
              onClick={onLogout} 
              className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              aria-label="Log out"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM17 17h.01M17 13h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2zM12 12h.01M12 8h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2zM3 12h.01M3 8h5a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2z"/>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export default Header;