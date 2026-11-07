import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowUp, 
  MessageCircle,
  FileText,
  Shield,
  Layers,
  ChevronRight,
  User,
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from './Link';

interface FooterProps {
  onOpenOrderModal?: (tankerId?: string) => void;
  onOpenDemoModal?: () => void;
  onOpenAdminPortal?: (tab?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenOrderModal, 
  onOpenDemoModal,
  onOpenAdminPortal 
}) => {
  const { isRTL, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20and%20services.';

  return (
    <footer className="bg-[#030814] border-t border-cyan-500/15 text-slate-400 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#081224] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                  <Droplets className="w-6 h-6 text-cyan-400 relative z-10 group-hover:scale-110 transition-transform" />
                  <Truck className="w-3.5 h-3.5 text-white/80 absolute bottom-1 right-1 z-10" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold tracking-tight text-white font-display">
                    {language === 'ar' ? 'نبع' : 'The Nabaa'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono font-medium border border-cyan-500/20">
                    {language === 'ar' ? 'صهاريج مياه الشرب' : 'Potable Tankers'}
                  </span>
                </div>
                <span className="text-xs tracking-wider text-slate-400">
                  {language === 'ar' ? 'The Nabaa Tankers | توريد مياه الشرب' : 'Digital Water Tanker Delivery Infrastructure'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              {language === 'ar'
                ? 'منصة رقمية متخصصة في توريد وتوصيل صهاريج مياه الشرب المحلاة بأعلى معايير النظافة والسرعة في الرياض. نربط العملاء بأسطول متكامل بسعات 10 و19 و32 طن.'
                : 'Pioneering on-demand potable water tanker dispatch platform in Riyadh. Delivering food-grade desalinated water directly to your ground and elevated tanks.'}
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                {language === 'ar' ? 'قنوات التواصل المباشر السريعة:' : 'Direct Quick Hotlines:'}
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

          {/* Col 5: Company, Support & Legal (With Distinct Customer & Driver Policies) */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {language === 'ar' ? 'الدعم والسياسات النظامية' : 'Support & Legal Policies'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/about-us" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'من نحن' : 'About The Nabaa'}</span>
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
                <Link to="/faqs" className="hover:text-cyan-300 transition-colors flex items-center justify-between group">
                  <span>{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>

              {/* Distinct Privacy Policies */}
              <li className="pt-1 border-t border-slate-800/80">
                <Link to="/privacy-policy/customer" className="hover:text-cyan-300 transition-colors flex items-center justify-between group text-[11px] text-cyan-400/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    <span>{language === 'ar' ? 'خصوصية العميل' : 'Customer Privacy'}</span>
                  </span>
                  <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy/driver" className="hover:text-cyan-300 transition-colors flex items-center justify-between group text-[11px] text-amber-400/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3 h-3" />
                    <span>{language === 'ar' ? 'خصوصية السائق' : 'Driver Privacy'}</span>
                  </span>
                  <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>

              {/* Distinct Terms and Conditions */}
              <li className="pt-1 border-t border-slate-800/80">
                <Link to="/terms-and-conditions/customer" className="hover:text-cyan-300 transition-colors flex items-center justify-between group text-[11px] text-cyan-400/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    <span>{language === 'ar' ? 'شروط العميل' : 'Customer Terms'}</span>
                  </span>
                  <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions/driver" className="hover:text-cyan-300 transition-colors flex items-center justify-between group text-[11px] text-amber-400/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3 h-3" />
                    <span>{language === 'ar' ? 'شروط السائق' : 'Driver Terms'}</span>
                  </span>
                  <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 ${isRTL ? 'rotate-180' : ''}`} />
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
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>{language === 'ar' ? 'منصة تشغيلية معتمدة لتوزيع مياه الشرب' : 'Authorized Potable Water Distribution System'}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAdminPortal('privacy_policy')}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer font-mono"
              >
                <Shield className="w-3 h-3" />
                <span>{language === 'ar' ? 'محرر السياسات' : 'Policy Editor'}</span>
              </button>

              <button
                onClick={() => onOpenAdminPortal('demo_requests')}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer font-mono"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>{language === 'ar' ? 'بوابة الإدارة (Admin Portal)' : 'Admin Portal'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </footer>
  );
};
