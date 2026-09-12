import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      className={`inline-flex items-center p-1 rounded-lg bg-slate-900/90 border border-cyan-500/30 shadow-inner backdrop-blur-md transition-all ${className}`}
      role="group"
      aria-label="Language Switcher"
      id="language-switcher"
    >
      <div className="flex items-center px-1.5 text-cyan-400">
        <Globe className="w-3.5 h-3.5" aria-hidden="true" />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        aria-pressed={language === 'en'}
        title="Switch to English"
        id="lang-btn-en"
      >
        EN
      </button>

      <span className="text-slate-600 text-xs px-1 select-none font-sans">|</span>

      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer font-sans ${
          language === 'ar'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        aria-pressed={language === 'ar'}
        title="التبديل إلى العربية"
        id="lang-btn-ar"
      >
        العربية
      </button>
    </div>
  );
};
