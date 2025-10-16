import React, { createContext, useContext } from 'react';
import { AppSettings } from '../types';
import { translations } from '../utils/translations';

type Language = AppSettings['language'];
type TranslationKey = keyof typeof translations['my'];

interface LanguageContextType {
  language: Language;
  locale: string;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ settings: AppSettings; children: React.ReactNode }> = ({ settings, children }) => {
  const language = settings.language || 'my';
  const locale = language === 'my' ? 'my-MM' : 'en-US';
  
  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations['en']?.[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, locale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return context.t;
};

export const useLocale = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
      throw new Error('useLocale must be used within a LanguageProvider');
    }
    return { language: context.language, locale: context.locale };
  };