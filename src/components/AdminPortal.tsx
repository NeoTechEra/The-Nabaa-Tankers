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
  EyeOff
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AdminDemoRequestsManager } from './AdminDemoRequestsManager';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = 'H78900123osA@';

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const { language, isRTL } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nabaa_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('nabaa_admin_auth', 'true');
      setErrorMsg(null);
      setPasswordInput('');
    } else {
      setErrorMsg(
        language === 'ar' 
          ? 'كلمة المرور غير صحيحة. يرجى إدخال كلمة مرور المشرف المعتمدة.'
          : 'Invalid password. Please enter the authorized administrator password.'
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nabaa_admin_auth');
    setPasswordInput('');
    setErrorMsg(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[950px] bg-[#070e1c] border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#08152e] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white font-display">
                  {language === 'ar' ? 'بوابة إدارة نبع المعتمدة' : 'Nabaa Restricted Admin Portal'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase font-semibold">
                  {language === 'ar' ? 'خاص بالإدارة فقط' : 'Admin Only'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'ar' 
                  ? 'إدارة طلبات العروض التوضيحية الحية لعملاء الشركات والمؤسسات' 
                  : 'Live Corporate Demo Requests & B2B Inquiries Management'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title={language === 'ar' ? 'قفل البوابة' : 'Lock Portal'}
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">{language === 'ar' ? 'قفل البوابة' : 'Lock'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-800/80 flex items-center justify-center transition-all cursor-pointer"
              id="close-admin-portal-btn"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#060c18] p-4 sm:p-6">
          {!isAuthenticated ? (
            /* PIN / Password Gatekeeper Screen */
            <div className="h-full flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#09152b] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 text-center space-y-6">
                
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {language === 'ar' ? 'منطقة المشرف المعتمد' : 'Authorized Admin Access'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    {language === 'ar'
                      ? 'هذا القسم مخصص لإدارة نبع فقط لعرض طلبات عروض الشركات وبيانات التواصل.'
                      : 'This section is strictly restricted to Nabaa management to review corporate demo requests & client leads.'}
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5" dir={isRTL ? 'rtl' : 'ltr'}>
                      {language === 'ar' ? 'كلمة مرور المشرف (Admin Password):' : 'Administrator Password:'}
                    </label>
                    <div className="relative">
                      <KeyRound className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        placeholder="••••••••••••"
                        className={`w-full py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 font-mono text-sm tracking-wide focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all ${
                          isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'
                        }`}
                        autoFocus
                        id="admin-password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1 cursor-pointer ${
                          isRTL ? 'left-2.5' : 'right-2.5'
                        }`}
                        title={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 rounded-xl p-3" dir={isRTL ? 'rtl' : 'ltr'}>
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      id="admin-portal-login-btn"
                    >
                      {language === 'ar' ? 'تسجيل الدخول لبوابة الإدارة' : 'Unlock Admin Portal'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Authenticated: ONLY 16. Live Demo Requests */
            <div className="space-y-4">
              <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      {language === 'ar' ? '16. مركز طلبات العروض التوضيحية الحية' : '16. Live Corporate Demo Requests'}
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      {language === 'ar'
                        ? 'مخصص فقط للمشرف: متابعة المواعيد، روابط Google Meet، والتواصل مع ممثلي الشركات.'
                        : 'Restricted to admin: Review corporate demo bookings, assign Google Meet links, & dispatch emails.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'جلسة مسؤول نشطة' : 'Active Admin Session'}</span>
                </div>
              </div>

              {/* Renders the Demo Requests Manager */}
              <AdminDemoRequestsManager />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
