import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  CheckCircle2, 
  Printer, 
  Share2, 
  Edit3, 
  Mail, 
  Phone, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Check,
  User,
  Truck,
  ArrowRight
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

interface PrivacyPolicyPageProps {
  onOpenAdminPortal?: (tab?: any) => void;
  target?: 'customer' | 'driver';
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ 
  onOpenAdminPortal, 
  target = 'customer' 
}) => {
  const { isRTL, language } = useLanguage();
  const docId: LegalDocId = target === 'driver' ? 'driver_privacy' : 'customer_privacy';
  const [doc, setDoc] = useState<LegalDocument>(() => getLegalDocument(docId));
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Sync document when target prop changes
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
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-cyan-950/30">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-200">
                {language === 'ar' 
                  ? `أنت مسجل كمسؤول: يمكنك تعديل محتوى (${isDriver ? 'خصوصية السائق' : 'خصوصية العميل'}) مباشرة` 
                  : `Admin mode active: You can edit (${isDriver ? 'Driver' : 'Customer'} Privacy) directly`}
              </span>
            </div>
            <button
              onClick={() => onOpenAdminPortal('privacy_policy')}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تعديل السياسة في لوحة الإدارة' : 'Edit Policy in Admin'}</span>
            </button>
          </div>
        )}

        {/* Audience Toggle Tabs: Customer vs Driver Privacy */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <div className="flex items-center gap-2">
            <Link
              to="/privacy-policy/customer"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                !isDriver
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{language === 'ar' ? 'خصوصية العميل' : 'Customer Privacy'}</span>
            </Link>

            <Link
              to="/privacy-policy/driver"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                isDriver
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'ar' ? 'خصوصية السائق' : 'Driver Privacy'}</span>
            </Link>
          </div>

          {/* Quick link to matching Terms & Conditions */}
          <Link
            to={isDriver ? '/terms-and-conditions/driver' : '/terms-and-conditions/customer'}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>
              {language === 'ar' 
                ? `عرض الشروط والأحكام لـ (${isDriver ? 'السائق' : 'العميل'})` 
                : `View ${isDriver ? 'Driver' : 'Customer'} Terms & Conditions`}
            </span>
            <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
            {isDriver ? <Truck className="w-4 h-4 text-cyan-400" /> : <Shield className="w-4 h-4 text-cyan-400" />}
            <span>{isDriver ? (language === 'ar' ? 'وثيقة خصوصية السائق وناقل الصهريج' : 'Tanker Driver Privacy Document') : (language === 'ar' ? 'وثيقة خصوصية عملاء طلب المياه' : 'Water Customer Privacy Document')}</span>
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
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ar' ? 'تشفير TLS 1.3 / AES-256' : 'TLS 1.3 / AES-256 Security'}</span>
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
              <Eye className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-cyan-300">
                {language === 'ar' ? 'مقدمة إيضاحية والتزام المنصة' : 'Executive Overview & Privacy Commitment'}
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
            <span>{language === 'ar' ? 'فهرس بنود الخصوصية' : 'Table of Contents'}</span>
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

        {/* Contact and Privacy Officer Footer Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#0c1d3b] border border-cyan-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h4 className="text-base font-bold text-white">
              {language === 'ar' ? 'مسؤول حماية البيانات والخصوصية' : 'Data Protection & Compliance Officer'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'ar' 
                ? 'لأي استفسار بخصوص سياسة الخصوصية أو طلب تصدير أو حذف بياناتك:' 
                : 'For inquiries regarding this privacy policy, data access, or removal requests:'}
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
