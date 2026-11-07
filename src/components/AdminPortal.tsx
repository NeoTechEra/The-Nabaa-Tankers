import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  LogOut, 
  Calendar,
  Eye,
  EyeOff,
  Shield,
  FileText,
  Sparkles,
  Maximize2,
  Minimize2,
  Activity,
  Layers,
  ArrowRight,
  Film
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdminDemoRequestsManager } from './AdminDemoRequestsManager';
import { AdminPolicyEditor } from './AdminPolicyEditor';
import { AdminDashboardSection } from './AdminDashboardSection';
import { AdminVideoEditor } from './AdminVideoEditor';
import { useRouter } from '../context/RouterContext';

export type AdminPortalTab = 'operations' | 'demo_requests' | 'hero_video' | 'privacy_policy' | 'terms_and_conditions';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: AdminPortalTab;
  isStandalonePage?: boolean;
}

const ADMIN_PASSWORD = 'H78900123osA@';

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'operations',
  isStandalonePage = false
}) => {
  const { language, isRTL } = useLanguage();
  const { navigate } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nabaa_admin_auth') === 'true';
  });
  const [activeTab, setActiveTab] = useState<AdminPortalTab>(initialTab);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fullscreen expand toggle (defaults to true if on standalone page or stored preference)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => {
    if (isStandalonePage) return true;
    return localStorage.getItem('nabaa_admin_fullscreen') === 'true';
  });

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const next = !prev;
      localStorage.setItem('nabaa_admin_fullscreen', String(next));
      return next;
    });
  };

  // Sync activeTab when initialTab prop updates
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Close on Escape when opened as modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isStandalonePage) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isStandalonePage]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('nabaa_admin_auth', 'true');
      setErrorMsg(null);
      setPasswordInput('');
    } else {
      setErrorMsg(
        language === 'ar'
          ? 'رمز الدخول غير صحيح. يرجى المحاولة مرة أخرى.'
          : 'Incorrect administrator password. Please try again.'
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nabaa_admin_auth');
    setPasswordInput('');
    setErrorMsg(null);
  };

  const modalContent = (
    <div 
      className={`relative w-full bg-[#071122] transition-all duration-200 flex flex-col ${
        isFullscreen 
          ? 'max-w-none min-h-screen rounded-none m-0 border-0 p-0 shadow-none' 
          : 'max-w-[1600px] min-h-[90vh] rounded-3xl my-2 sm:my-4 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 overflow-hidden'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sticky Top Header Bar */}
      <header className="sticky top-0 z-30 px-4 sm:px-6 py-4 border-b border-slate-800 bg-[#09152b]/95 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold shadow-inner">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                {language === 'ar' ? 'لوحة الإدارة والتحكم الشاملة' : 'Administrative Control Portal'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                v2.8 Enterprise
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {language === 'ar' 
                ? 'إدارة أسطول صهاريج نبع، طلبات العروض التوضيحية، ومحرر السياسات والشروط المعتمدة' 
                : 'Manage Tanker Fleet Operations, Corporate Demo Pipeline & Real-Time Legal Policies'}
            </p>
          </div>
        </div>

        {/* Header Right Action Tools */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              {/* Fullscreen Expand / Restore Toggle Button */}
              {!isStandalonePage && (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title={isFullscreen ? (language === 'ar' ? 'استعادة الحجم الطبيعي' : 'Windowed View') : (language === 'ar' ? 'ملء الشاشة بالكامل' : 'Fullscreen View')}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden md:inline">{language === 'ar' ? 'تصغير' : 'Windowed'}</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden md:inline">{language === 'ar' ? 'ملء الشاشة' : 'Fullscreen'}</span>
                    </>
                  )}
                </button>
              )}

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                title={language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'خروج' : 'Log Out'}</span>
              </button>
            </>
          )}

          {/* Close or Back Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
            title={language === 'ar' ? 'إغلاق اللوحة' : 'Close Dashboard'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8 flex-1">
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto py-12 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-950/50">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-display">
                {language === 'ar' ? 'تسجيل دخول الإدارة المحمية' : 'Restricted Administrator Authentication'}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'هذه اللوحة مخصصة لإدارة منصة نبع وتعديل السياسات القانونية ومراقبة العمليات والطلبات'
                  : 'Authorized administrators only. Enter your administrative credentials to manage policies, fleet operations, & bookings.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل كلمة مرور الإدارة...' : 'Enter administrator key...'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm shadow-inner"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-start">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{language === 'ar' ? 'تأكيد ودخول لوحة الإدارة' : 'Verify & Access Full Dashboard'}</span>
              </button>
            </form>

            <div className="text-[11px] text-slate-500 font-mono">
              {language === 'ar'
                ? '🔒 جلسة مشفرة ومحمية بالكامل وفق بروتوكول TLS 1.3'
                : '🔒 TLS-encrypted isolated administrative session'}
            </div>
          </div>
        ) : (
          /* Authenticated Complete Dashboard */
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Sticky Navigation Tabs across All Management Modules */}
            <div className="sticky top-[73px] z-20 bg-[#071122]/95 backdrop-blur-md border border-cyan-500/25 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-cyan-950/30">
              <div className="flex flex-wrap items-center gap-1.5">
                
                {/* Tab 1: Full Fleet Operations Hub */}
                <button
                  type="button"
                  onClick={() => setActiveTab('operations')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'operations'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>{language === 'ar' ? 'مركز العمليات والأسطول' : 'Fleet Operations Hub'}</span>
                </button>

                {/* Tab 2: Corporate Demo Requests */}
                <button
                  type="button"
                  onClick={() => setActiveTab('demo_requests')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'demo_requests'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'ar' ? 'طلبات العروض التوضيحية' : 'Corporate Demo Requests'}</span>
                </button>

                {/* Tab 3: Hero Video & Animation Editor */}
                <button
                  type="button"
                  onClick={() => setActiveTab('hero_video')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'hero_video'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Film className="w-4 h-4" />
                  <span>{language === 'ar' ? 'فيديو الأنيميشن' : 'Hero Video & Animation'}</span>
                </button>

                {/* Tab 4: Privacy Policy Editor */}
                <button
                  type="button"
                  onClick={() => setActiveTab('privacy_policy')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'privacy_policy'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>{language === 'ar' ? 'محرر سياسة الخصوصية' : 'Privacy Policy Editor'}</span>
                </button>

                {/* Tab 5: Terms and Conditions Editor */}
                <button
                  type="button"
                  onClick={() => setActiveTab('terms_and_conditions')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'terms_and_conditions'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{language === 'ar' ? 'محرر الشروط والأحكام' : 'Terms & Conditions Editor'}</span>
                </button>

              </div>

              {/* Status pill & view indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{language === 'ar' ? 'جلسة مسؤول معتمدة' : 'Authorized Session'}</span>
              </div>
            </div>

            {/* TAB CONTENT 1: Full Fleet Operations Hub */}
            {activeTab === 'operations' && (
              <div className="animate-in fade-in duration-200">
                <AdminDashboardSection embedded={true} />
              </div>
            )}

            {/* TAB CONTENT 2: Corporate Live Demo Requests Manager */}
            {activeTab === 'demo_requests' && (
              <div className="animate-in fade-in duration-200">
                <AdminDemoRequestsManager />
              </div>
            )}

            {/* TAB CONTENT 3: Hero Video & Animation Editor */}
            {activeTab === 'hero_video' && (
              <div className="animate-in fade-in duration-200">
                <AdminVideoEditor />
              </div>
            )}

            {/* TAB CONTENT 4: Privacy Policy Content Editor */}
            {activeTab === 'privacy_policy' && (
              <div className="animate-in fade-in duration-200">
                <AdminPolicyEditor 
                  initialDocId="customer_privacy"
                  onNavigateToPage={(path) => {
                    onClose();
                    navigate(path);
                  }}
                />
              </div>
            )}

            {/* TAB CONTENT 5: Terms and Conditions Content Editor */}
            {activeTab === 'terms_and_conditions' && (
              <div className="animate-in fade-in duration-200">
                <AdminPolicyEditor 
                  initialDocId="customer_terms"
                  onNavigateToPage={(path) => {
                    onClose();
                    navigate(path);
                  }}
                />
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );

  // If used as a standalone page (e.g. /admin), render without fixed overlay backdrop
  if (isStandalonePage) {
    return (
      <div className="w-full min-h-screen">
        {modalContent}
      </div>
    );
  }

  // Modal View with items-start to prevent top clipping
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      {modalContent}
    </div>
  );
};
