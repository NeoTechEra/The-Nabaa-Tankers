import React, { useState } from 'react';
import { Phone, MessageCircle, X, ChevronUp, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isRTL, language } = useLanguage();

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20and%20platform%20services.';

  return (
    <div className={`fixed bottom-5 ${isRTL ? 'left-5' : 'right-5'} z-40 flex flex-col ${isRTL ? 'items-start' : 'items-end'} gap-2.5 font-sans`}>
      
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="w-80 bg-[#091326]/95 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-4 shadow-2xl shadow-cyan-950/80 mb-1 animate-in zoom-in-95 duration-150">
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
              title="Close"
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

      {/* Floating Action Pill Bar */}
      <div className="flex items-center gap-2 bg-[#060e1e]/90 backdrop-blur-xl border border-cyan-500/30 p-1.5 rounded-full shadow-2xl shadow-cyan-950/80">
        
        {/* WhatsApp Direct Pill */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          title="WhatsApp +92 333 0717198"
          id="floating-pill-whatsapp"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span className="hidden sm:inline">{language === 'ar' ? 'واتساب:' : 'WhatsApp:'}</span>
          <span className="font-mono" dir="ltr">{whatsappDisplay}</span>
        </a>

        {/* Direct Call Pill */}
        <a
          href={`tel:${phoneTel}`}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
          title="Call +966 53 043 4010"
          id="floating-pill-call"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">{language === 'ar' ? 'اتصال:' : 'Call:'}</span>
          <span className="font-mono" dir="ltr">{phoneDisplay}</span>
        </a>

        {/* Info / Toggle Expand */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          title={isOpen ? "Collapse options" : "More contact details"}
        >
          {isOpen ? <X className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

      </div>
    </div>
  );
};
