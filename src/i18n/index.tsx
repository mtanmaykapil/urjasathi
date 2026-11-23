import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, Translations } from './en';
import { hi } from './hi';
import { Language } from '../types';

interface I18nContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    // Check localStorage or default to 'en'
    try {
      const saved = localStorage.getItem('urjasaathi_lang');
      if (saved === 'en' || saved === 'hi') return saved;
    } catch {
      // ignore storage errors
    }
    return 'en';
  });

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('urjasaathi_lang', lang);
    } catch {
      // ignore storage errors
    }
    // Update HTML lang attribute for SEO and a11y
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    t: lang === 'hi' ? hi : en,
    setLang,
    toggleLang,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useT = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useT must be used within an I18nProvider');
  }
  return context;
};
