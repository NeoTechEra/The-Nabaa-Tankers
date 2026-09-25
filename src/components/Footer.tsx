import React from 'react';
import { Droplets, Shield, MapPin, ArrowUp, ChevronRight, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from './Link';

interface FooterProps {
  onOpenOrderModal?: (tankerId?: string) => void;
  onOpenDemoModal?: () => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal, onOpenAdminPortal }) => {
  const { isRTL, language } = useLanguage();

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20and%20services.';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040813] border-t border-slate-800 text-slate-400 relative overflow-hidden">
      
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white font-display">
                  {language === 'ar' ? 'صهاريج نبع' : 'THE NABAA'}{' '}
                  <span className="text-cyan-400 font-sans font-semibold text-xs tracking-widest uppercase">
                    {language === 'ar' ? 'الذكية' : 'TANKERS'}
                  </span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-mono">
                  {language === 'ar' ? 'توريد مياه الشرب، برؤية رقمية' : 'Potable Water Delivery'}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {language === 'ar'
                ? 'توفر صهاريج نبع خدمة توصيل مياه الشرب النقية للعملاء عبر نظام رقمي ذكي يربط الطلبات مباشرة مع سائقي وأسطول الصهاريج المعتمدين في الرياض.'
                : 'The Nabaa provides water-tanker delivery to customers through its digital ordering and delivery system, while drivers and tanker partners use the application to receive and complete delivery requests.'}
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'مطابقة لمعايير جودة مياه الشرب المحلاة المعتمدة'
                    : 'Certified Potable Drinking Water Quality'}
                </span>
              </div>
            </div>

            {/* Direct Contact & WhatsApp */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                {language === 'ar' ? 'التواصل المباشر والاستفسارات:' : 'Direct Contact & Inquiries'}
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all text-xs font-mono"
                  dir="ltr"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {whatsappDisplay}</span>
                </a>

                <a
                  href={`tel:${phoneTel}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all text-xs font-mono"
                  dir="ltr"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Tel: {phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Water Delivery Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {language === 'ar' ? 'خدمات التوريد' : 'Water Delivery'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/how-it-works/customer" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'تطبيق العميل والطلب' : 'Customer App'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/how-it-works/tanker" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'مواصفات وسعات الصهاريج' : 'Tanker Fleet Specs'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'المناطق المخدومة في الرياض' : 'Confirmed Service Areas'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              {onOpenOrderModal && (
                <li>
                  <button
                    onClick={() => onOpenOrderModal('tanker-19t')}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{language === 'ar' ? 'طلب صهريج ماء الآن' : 'Order Water Tanker'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Drivers & Mobile Apps */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {language === 'ar' ? 'السائقين والتطبيقات' : 'Drivers & Apps'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/how-it-works/driver" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'شرح تطبيق السائق' : 'Driver App Guide'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/join-as-driver" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'الانضمام كسائق صهريج' : 'Join as a Driver'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/download-app" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'تحميل التطبيقات (iOS / أندرويد)' : 'Download Applications'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {language === 'ar' ? 'الشركة والمساعدة' : 'Company & Legal'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/about-us" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'من نحن' : 'About The Nabaa'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            {language === 'ar' ? '© 2026 صهاريج نبع. جميع الحقوق محفوظة.' : '© 2026 The Nabaa Tankers. All rights reserved.'}
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500 font-mono">
            {language === 'ar'
              ? '* شاشات العمولات وأرقام الصهاريج المعروضة هي لأغراض العرض التوضيحي ومحاكاة الواجهات.'
              : '* Demonstration values and UI previews shown on this website are for illustrative purposes.'}
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Dedicated Under Footer Area for Admin Access (Preserved as strictly required) */}
        {onOpenAdminPortal && (
          <div className="mt-4 pt-3 border-t border-slate-900/90 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-600">
                {language === 'ar' ? 'نظام صهاريج نبع التشغيلي' : 'The Nabaa Operations Engine'}
              </span>
              <span className="text-slate-800">•</span>
              <span className="text-emerald-500/80 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                {language === 'ar' ? 'شبكة التوصيل متصلة' : 'Dispatch Network Active'}
              </span>
            </div>

            <button
              onClick={onOpenAdminPortal}
              className="text-slate-500 hover:text-cyan-400 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer font-mono text-[11px] group"
              id="under-footer-admin-btn"
              title={language === 'ar' ? 'بوابة إدارة المشرف المشفرة' : 'Encrypted Operations Admin Portal'}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <span>{language === 'ar' ? 'بوابة المشرف (Admin)' : 'Admin Portal'}</span>
            </button>
          </div>
        )}

      </div>
    </footer>
  );
};
