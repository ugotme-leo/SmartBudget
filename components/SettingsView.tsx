import React, { useState } from 'react';
import { AppSettings } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useTranslations } from '../contexts/LanguageContext';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface SettingsViewProps {
  currentSettings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
  onDeleteAllData: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentSettings, onSave, onDeleteAllData }) => {
  const t = useTranslations();
  const [theme, toggleTheme] = useTheme();

  const [symbol, setSymbol] = useState(currentSettings.currencySymbol);
  const [position, setPosition] = useState(currentSettings.currencyPosition);
  const [language, setLanguage] = useState(currentSettings.language);
  const [savedMessageVisible, setSavedMessageVisible] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ currencySymbol: symbol.trim(), currencyPosition: position, language });
    setSavedMessageVisible(true);
    setTimeout(() => {
      setSavedMessageVisible(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={onDeleteAllData}
        title={t('confirmDeleteAllDataTitle')}
        message={t('confirmDeleteAllDataMessage')}
        confirmButtonText={t('deleteAllData')}
      />

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-700 dark:text-slate-200">{t('settingsTitle')}</h2>
        
        <form onSubmit={handleSave} className="space-y-8">
          <fieldset>
            <legend className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">{t('theme')}</legend>
            <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {theme === 'dark' ? t('darkTheme') : t('lightTheme')}
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-500 dark:text-slate-300 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                  aria-label={theme === 'dark' ? t('toggleToLight') : t('toggleToDark')}
                >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">{t('language')}</legend>
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="lang-my"
                  name="language"
                  value="my"
                  checked={language === 'my'}
                  onChange={() => setLanguage('my')}
                  className="h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-blue-500"
                />
                <label htmlFor="lang-my" className="ml-2 block text-sm text-slate-800 dark:text-slate-200">
                  {t('burmese')}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="lang-en"
                  name="language"
                  value="en"
                  checked={language === 'en'}
                  onChange={() => setLanguage('en')}
                  className="h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-blue-500"
                />
                <label htmlFor="lang-en" className="ml-2 block text-sm text-slate-800 dark:text-slate-200">
                  {t('english')}
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
              <legend className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">{t('currencySymbol')}</legend>
              <div>
              <label htmlFor="currencySymbol" className="sr-only">{t('currencySymbol')}</label>
              <input
                  type="text"
                  id="currencySymbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder={t('currencySymbolPlaceholder')}
                  className="w-full md:w-1/2 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
              
              <div className="mt-4">
              <h4 className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">{t('symbolPosition')}</h4>
              <div className="flex items-center gap-6">
                  <div className="flex items-center">
                  <input
                      type="radio"
                      id="position-before"
                      name="currencyPosition"
                      value="before"
                      checked={position === 'before'}
                      onChange={() => setPosition('before')}
                      className="h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-blue-500"
                  />
                  <label htmlFor="position-before" className="ml-2 block text-sm text-slate-800 dark:text-slate-200">
                      {t('positionBefore')}
                  </label>
                  </div>
                  <div className="flex items-center">
                  <input
                      type="radio"
                      id="position-after"
                      name="currencyPosition"
                      value="after"
                      checked={position === 'after'}
                      onChange={() => setPosition('after')}
                      className="h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-blue-500"
                  />
                  <label htmlFor="position-after" className="ml-2 block text-sm text-slate-800 dark:text-slate-200">
                      {t('positionAfter')}
                  </label>
                  </div>
              </div>
              </div>
          </fieldset>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-800 focus:ring-blue-500 transition-colors">
              {t('save')}
              </button>
              {savedMessageVisible && (
                  <span className="text-green-600 dark:text-green-400 text-sm transition-opacity duration-300">
                  {t('savedMessage')}
                  </span>
              )}
          </div>
        </form>
      </div>
      
      <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-red-500/30">
        <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-3">{t('dangerZone')}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{t('deleteAllDataMessage')}</p>
        <button
            type="button"
            onClick={() => setIsConfirmModalOpen(true)}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-800 focus:ring-red-500 transition-colors"
        >
            {t('deleteAllData')}
        </button>
      </div>

    </div>
  );
};

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
  
  const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

export default SettingsView;