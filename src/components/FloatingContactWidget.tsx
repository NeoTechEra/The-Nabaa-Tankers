import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, X, ChevronUp, Clock, ShieldCheck, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isRTL, language } = useLanguage();
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20and%20platform%20services.';

  // Show scroll-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40 flex flex-col ${isRTL ? 'items-start' : 'items-end'} gap-3 font-sans`}>
      
      {/* Direct Contact & Support Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="w-80 sm:w-88 bg-[#091326]/95 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-4 shadow-2xl shadow-cyan-950/80 mb-1 animate-in zoom-in-95 duration-150"
          id="direct-contact-popup"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                {language === 'ar' ? 'التواصل المباشر والدعم الفوري' : 'Direct Contact & Support'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              title={language === 'ar' ? 'إغلاق' : 'Close'}
              id="close-contact-popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2.5 mb-3 leading-relaxed">
            {language === 'ar'
              ? 'تواصل مباشرة مع غرفة عمليات صهاريج نبع لطلب المياه، متابعة السائقين، أو استفسارات الأساطيل:'
              : 'Connect directly with The Nabaa Tankers operations desk for tanker bookings, driver dispatch, and fleet inquiries:'}
          </p>

          <div className="space-y-2.5">
            {/* WhatsApp Contact */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
              id="floating-whatsapp-link"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 fill-emerald-400/20" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-semibold">
                    {language === 'ar' ? 'محادثة واتساب' : 'WhatsApp Chat'}
                  </div>
                  <div className="text-sm font-bold text-white font-mono" dir="ltr">
                    {whatsappDisplay}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                {language === 'ar' ? 'متصل' : 'Online'}
              </span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${phoneTel}`}
              className={`group flex items-center justify-between p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
              id="floating-call-link"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                    {language === 'ar' ? 'الاتصال الهاتفي المباشر' : 'Direct Call / Hotline'}
                  </div>
                  <div className="text-sm font-bold text-white font-mono" dir="ltr">
                    {phoneDisplay}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                24/7
              </span>
            </a>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              {language === 'ar' ? 'استجابة سريعة' : 'Instant Response'}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {language === 'ar' ? 'عمليات معتمدة' : 'Verified Operations'}
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Scroll Up Button */}
        <button
          onClick={scrollToTop}
          className={`w-11 h-11 rounded-full bg-[#071224]/90 hover:bg-cyan-950/80 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white flex items-center justify-center shadow-lg shadow-cyan-950/60 hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
            showScrollTop
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
          title={language === 'ar' ? 'التمرير للأعلى' : 'Scroll to top'}
          aria-label={language === 'ar' ? 'التمرير للأعلى' : 'Scroll to top'}
          id="scroll-to-top-btn"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Support / Direct Contact Trigger Button */}
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 cursor-pointer ${
            isOpen
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/30 rotate-90'
              : 'bg-gradient-to-br from-[#0c1e3d] to-[#061021] text-cyan-300 hover:text-white border-cyan-500/40 hover:border-cyan-400 shadow-cyan-950/80'
          }`}
          title={isOpen ? (language === 'ar' ? 'إغلاق' : 'Close') : (language === 'ar' ? 'التواصل المباشر والدعم' : 'Direct Contact & Support')}
          aria-label={language === 'ar' ? 'التواصل المباشر والدعم' : 'Direct Contact & Support'}
          id="floating-support-btn"
        >
          {isOpen ? (
            <X className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <>
              <Headphones className="w-5 h-5" />
              {/* Pulsing online status indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#091326]"></span>
              </span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
