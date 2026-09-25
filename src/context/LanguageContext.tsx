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
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/ar' || path.startsWith('/ar/')) return 'ar';
      if (path === '/en' || path.startsWith('/en/')) return 'en';

      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'ar' || urlLang === 'en') {
        return urlLang;
      }

      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang === 'ar' || savedLang === 'en') {
        return savedLang as Language;
      }

      if (navigator.language && navigator.language.toLowerCase().startsWith('ar')) {
        return 'ar';
      }
    }
    return 'en';
  });

  // Keep state updated on browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === '/ar' || path.startsWith('/ar/')) {
        setLanguageState('ar');
      } else if (path === '/en' || path.startsWith('/en/')) {
        setLanguageState('en');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';
  const t = useMemo(() => translations[language], [language]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        
        // Clean URL path transformation
        const currentPath = window.location.pathname;
        let newPath = currentPath;
        if (newLang === 'ar') {
          if (!currentPath.startsWith('/ar')) {
            newPath = currentPath === '/' ? '/ar' : `/ar${currentPath}`;
          }
        } else {
          if (currentPath.startsWith('/ar')) {
            newPath = currentPath.replace(/^\/ar/, '') || '/';
          }
        }

        if (newPath !== currentPath) {
          window.history.pushState({}, '', newPath + window.location.search + window.location.hash);
        }
      } catch (e) {
        console.warn('Could not update language route:', e);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Sync DOM attributes whenever language updates
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', language);
    }
  }, [language, dir]);

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
