import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'ar';

interface RouterContextType {
  currentPath: string;
  basePath: string;
  lang: Language;
  navigate: (to: string, options?: { replace?: boolean; scrollToTop?: boolean }) => void;
  switchLanguage: (targetLang: Language) => void;
  isArabic: boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Helper to parse path into language and basePath
export function parseRoute(pathname: string): { lang: Language; basePath: string } {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  
  if (normalized === '/ar' || normalized.startsWith('/ar/')) {
    const withoutAr = normalized.substring(3) || '/';
    return { lang: 'ar', basePath: withoutAr };
  }
  
  if (normalized === '/en' || normalized.startsWith('/en/')) {
    const withoutEn = normalized.substring(3) || '/';
    return { lang: 'en', basePath: withoutEn };
  }

  // Check query parameter if path doesn't specify
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const qLang = searchParams.get('lang');
    if (qLang === 'ar') {
      return { lang: 'ar', basePath: normalized };
    }
  }

  return { lang: 'en', basePath: normalized };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const { lang, basePath } = parseRoute(currentPath);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean; scrollToTop?: boolean }) => {
    if (typeof window === 'undefined') return;

    // Handle hash anchors on the same page
    if (to.startsWith('#')) {
      const el = document.getElementById(to.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', to);
      }
      return;
    }

    // External link
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      window.location.href = to;
      return;
    }

    // Normalize URL
    let target = to;
    // If target doesn't specify language prefix and current language is Arabic, keep Arabic route
    if (lang === 'ar' && !target.startsWith('/ar') && !target.startsWith('/en')) {
      target = target === '/' ? '/ar' : `/ar${target}`;
    }

    if (options?.replace) {
      window.history.replaceState({}, '', target);
    } else {
      window.history.pushState({}, '', target);
    }

    setCurrentPath(window.location.pathname || '/');

    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lang]);

  // Seamlessly toggle language while preserving current route
  const switchLanguage = useCallback((targetLang: Language) => {
    if (typeof window === 'undefined') return;

    let newPath: string;
    if (targetLang === 'ar') {
      newPath = basePath === '/' ? '/ar' : `/ar${basePath}`;
    } else {
      newPath = basePath === '/' ? '/' : basePath;
    }

    window.history.pushState({}, '', newPath);
    setCurrentPath(window.location.pathname || '/');
    try {
      localStorage.setItem('nabaa_language', targetLang);
    } catch {
      // ignore
    }
  }, [basePath]);

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        basePath,
        lang,
        navigate,
        switchLanguage,
        isArabic: lang === 'ar',
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
