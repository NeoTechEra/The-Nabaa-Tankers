import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, Translations, translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'nabaa_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL parameters first (?lang=ar or ?lang=en)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'ar' || urlLang === 'en') {
        return urlLang;
      }

      // Check pathname (e.g., /ar or /en)
      const path = window.location.pathname;
      if (path.startsWith('/ar')) return 'ar';
      if (path.startsWith('/en')) return 'en';

      // Check localStorage
      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang === 'ar' || savedLang === 'en') {
        return savedLang;
      }

      // Check browser locale
      if (navigator.language && navigator.language.toLowerCase().startsWith('ar')) {
        return 'ar';
      }
    }
    return 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';
  const t = useMemo(() => translations[language], [language]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        // Cleanly update URL param without reloading the page
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        console.warn('Could not save language preference:', e);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Sync DOM attributes and SEO meta whenever language updates
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', language);

      // Update Page Title
      document.title = t.meta.title;

      // Update SEO Meta Description
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) {
        descEl.setAttribute('content', t.meta.description);
      }

      // Update OpenGraph Title & Description
      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) {
        ogTitleEl.setAttribute('content', t.meta.title);
      }
      const ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) {
        ogDescEl.setAttribute('content', t.meta.description);
      }
    }
  }, [language, dir, t]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, dir, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
