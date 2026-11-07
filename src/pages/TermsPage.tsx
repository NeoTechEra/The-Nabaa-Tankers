import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  Droplets, 
  Printer, 
  Share2, 
  Edit3, 
  Mail, 
  Phone, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Check,
  Scale,
  User,
  Truck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { 
  getLegalDocument, 
  LegalDocument, 
  LegalDocId,
  LEGAL_CONTENT_EVENT 
} from '../services/legalContentStore';
import { Link } from '../components/Link';

interface TermsPageProps {
  onOpenAdminPortal?: (tab?: any) => void;
  target?: 'customer' | 'driver';
}

export const TermsPage: React.FC<TermsPageProps> = ({ 
  onOpenAdminPortal, 
  target = 'customer' 
}) => {
  const { isRTL, language } = useLanguage();
  const docId: LegalDocId = target === 'driver' ? 'driver_terms' : 'customer_terms';
  const [doc, setDoc] = useState<LegalDocument>(() => getLegalDocument(docId));
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Sync document when target changes
    setDoc(getLegalDocument(docId));
  }, [docId]);

  useEffect(() => {
    // Check if admin is currently authenticated in session
    setIsAdminAuthenticated(sessionStorage.getItem('nabaa_admin_auth') === 'true');

    // Subscribe to live legal content updates from Admin Panel
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ docId: string }>;
      if (!customEvent.detail || customEvent.detail.docId === docId) {
        setDoc(getLegalDocument(docId));
      }
    };
    window.addEventListener(LEGAL_CONTENT_EVENT, handleUpdate);
    return () => window.removeEventListener(LEGAL_CONTENT_EVENT, handleUpdate);
  }, [docId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const activeSections = doc.sections.filter(s => s.isActive);
  const isDriver = target === 'driver';

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-100 py-10 sm:py-16 selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead 
        title={language === 'ar' ? `${doc.titleAr} | منصة صهاريج نبع` : `${doc.titleEn} | The Nabaa Tankers`}
        description={language === 'ar' ? doc.taglineAr : doc.taglineEn}
      />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Bar Notification if Logged In */}
        {isAdminAuthenticated && onOpenAdminPortal && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-cyan-950/30">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-200">
                {language === 'ar' 
                  ? `أنت مسجل كمسؤول: يمكنك تعديل (${isDriver ? 'شروط وأحكام السائق' : 'شروط وأحكام العميل'}) مباشرة` 
                  : `Admin mode active: You can edit (${isDriver ? 'Driver' : 'Customer'} Terms & Conditions) directly`}
              </span>
            </div>
            <button
              onClick={() => onOpenAdminPortal('terms_and_conditions')}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تعديل الشروط في لوحة الإدارة' : 'Edit Terms in Admin'}</span>
            </button>
          </div>
        )}

        {/* Audience Toggle Tabs: Customer vs Driver Terms */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <div className="flex items-center gap-2">
            <Link
              to="/terms-and-conditions/customer"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                !isDriver
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{language === 'ar' ? 'شروط العميل' : 'Customer Terms'}</span>
            </Link>

            <Link
              to="/terms-and-conditions/driver"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                isDriver
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'ar' ? 'شروط السائق' : 'Driver Terms'}</span>
            </Link>
          </div>

          {/* Quick link to matching Privacy Policy */}
          <Link
            to={isDriver ? '/privacy-policy/driver' : '/privacy-policy/customer'}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>
              {language === 'ar' 
                ? `عرض سياسة الخصوصية لـ (${isDriver ? 'السائق' : 'العميل'})` 
                : `View ${isDriver ? 'Driver' : 'Customer'} Privacy Policy`}
            </span>
            <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>{isDriver ? (language === 'ar' ? 'وثيقة الشروط التشغيلية للسائق والناقل' : 'Tanker Driver & Transporter Terms') : (language === 'ar' ? 'وثيقة الشروط التشغيلية لطلب وتوريد المياه' : 'Customer Water Order Terms')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {language === 'ar' ? doc.titleAr : doc.titleEn}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {language === 'ar' ? doc.taglineAr : doc.taglineEn}
          </p>

          {/* Utility info bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? `آخر تحديث: ${doc.lastUpdatedAr}` : `Last Updated: ${doc.lastUpdatedEn}`}</span>
            </span>

            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'معايير مياه الشرب الصالحة' : 'Potable Water Compliance'}</span>
            </span>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title={language === 'ar' ? 'نسخ الرابط' : 'Copy link'}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'مشاركة' : 'Share')}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title={language === 'ar' ? 'طباعة' : 'Print'}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'طباعة' : 'Print'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Executive Intro Callout Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1c38]/90 via-[#09152b]/95 to-[#050b16] border border-cyan-500/30 shadow-2xl shadow-cyan-950/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-cyan-300">
                {language === 'ar' ? 'مقدمة الاتفاقية والاشتراطات التشغيلية' : 'Agreement Overview & Operational Terms'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === 'ar' ? doc.introAr : doc.introEn}
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents Navigation Pills */}
        <div className="p-4 rounded-2xl bg-[#09152b]/70 border border-slate-800/90">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'ar' ? 'فهرس بنود الشروط والأحكام' : 'Table of Contents'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeSections.map((sec, idx) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <span className="font-mono text-cyan-400 mr-1.5 ml-1.5">§{idx + 1}</span>
                <span>{language === 'ar' ? sec.titleAr.replace(/^\d+\.\s*/, '') : sec.titleEn.replace(/^\d+\.\s*/, '')}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Document Sections List */}
        <div className="space-y-6">
          {activeSections.map((sec) => (
            <article
              key={sec.id}
              id={sec.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#09152b]/80 border border-cyan-500/15 hover:border-cyan-500/35 transition-all shadow-lg hover:shadow-cyan-950/20 scroll-mt-28"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                    {sec.order}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {language === 'ar' ? sec.titleAr : sec.titleEn}
                  </h3>
                </div>

                {(sec.badgeAr || sec.badgeEn) && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {language === 'ar' ? sec.badgeAr : sec.badgeEn}
                  </span>
                )}
              </div>

              {/* Section Paragraph */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {language === 'ar' ? sec.contentAr : sec.contentEn}
              </p>

              {/* Sub-bullets if any */}
              {sec.bullets && sec.bullets.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                  {sec.bullets.map((bullet) => (
                    <div 
                      key={bullet.id}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold text-white block sm:inline mr-1.5 ml-1.5">
                          {language === 'ar' ? bullet.labelAr : bullet.labelEn}
                        </span>
                        <span className="text-slate-300">
                          {language === 'ar' ? bullet.textAr : bullet.textEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Contact and Legal Compliance Footer Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#0c1d3b] border border-cyan-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h4 className="text-base font-bold text-white">
              {language === 'ar' ? 'فريق الشؤون القانونية والتشغيلية' : 'Legal & Operational Support Desk'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'ar' 
                ? 'لأي استفسارات قانونية أو منازعات تخص عقود وتوريد صهاريج المياه:' 
                : 'For legal queries or contract fulfillment support concerning tanker operations:'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${doc.contactEmail}`}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-mono font-medium flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{doc.contactEmail}</span>
            </a>

            <a
              href={`tel:${doc.contactPhone}`}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">{doc.contactPhone}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
