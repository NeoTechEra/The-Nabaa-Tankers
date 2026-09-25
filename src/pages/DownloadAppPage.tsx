import React from 'react';
import { 
  Smartphone, 
  Truck, 
  Droplets, 
  QrCode, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

export const DownloadAppPage: React.FC = () => {
  const { isRTL, language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'تحميل تطبيق صهاريج نبع للعميل والسائق' : 'Download The Nabaa Apps | iOS & Android'}
        description={
          language === 'ar'
            ? 'حمل تطبيق صهاريج نبع الآن على أجهزة آيفون وأندرويد. تطبيق العميل لطلب مياه الشرب وتطبيق السائق لاستقبال طلبات التوصيل.'
            : 'Download The Nabaa Customer and Driver apps for iOS and Android. Quick, certified water-tanker delivery across Riyadh.'
        }
        canonicalPath={language === 'ar' ? '/ar/download-app' : '/download-app'}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          name: 'The Nabaa Tankers',
          operatingSystem: 'iOS, Android',
          applicationCategory: 'BusinessApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'SAR'
          }
        }}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'تحميل التطبيق' : 'Download App', path: language === 'ar' ? '/ar/download-app' : '/download-app' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Smartphone className="w-4 h-4" />
            <span>{language === 'ar' ? 'التطبيقات الرسمية' : 'Official Applications'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'حمل تطبيق صهاريج نبع' : 'Download The Nabaa Applications'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'سواء كنت عميلاً ترغب في طلب صهريج مياه نقي لمنزلك أو سائقاً شريكاً يدير رحلات التوصيل، حمل التطبيق المناسب لك مجاناً.'
              : 'Whether you are a customer ordering potable water for your residence or a driver partner managing deliveries, download the official app for free.'}
          </p>
        </div>

        {/* 2 App Columns: Customer App & Driver App */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* App 1: Customer App */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-cyan-500/30 flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">
                      {language === 'ar' ? 'تطبيق العميل' : 'Customer App'}
                    </h2>
                    <span className="text-xs text-cyan-400 font-mono">
                      {language === 'ar' ? 'لطلب وتتبع مياه الصهاريج' : 'For Water Ordering & Tracking'}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800">
                  v2.4
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'اطلب صهريج مياه الشرب لفيّلتك أو مشروعك في 3 خطوات بسيطة: حدد الحجم والموقع، وتابع مسار الصهريج حتى وصوله وتفريغه.'
                  : 'Order water tankers for your villa or project in 3 simple steps: choose capacity, pinpoint your gate, and follow delivery in real-time.'}
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'سعات متعددة: 10، 19، 32 طن' : 'Multiple capacities: 10T, 19T, 32T'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'تتبع مسار الصهريج بدقة GPS' : 'Real-time GPS tanker tracking'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'دفع إلكتروني فوري (مدى، أبل باي)' : 'Secure payments via Mada and Apple Pay'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase">
                {language === 'ar' ? 'روابط التحميل المباشرة:' : 'Direct Download Links:'}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#customer-play"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                    <path d="M3.6 1.4L13.7 12 3.6 22.6c-.4-.4-.6-1-.6-1.7V3.1c0-.7.2-1.3.6-1.7zm11.2 11.7l2.8 2.9-12.8 7.4 10-10.3zm0-2.2L4.8.6l12.8 7.4-2.8 2.9zm1.1 1.1l3.5-2c1-.6 1-1.6 0-2.2l-3.5-2-2.5 2.6 2.5 3.6z"/>
                  </svg>
                  <div className="text-left font-mono">
                    <div className="text-[8px] text-slate-400 leading-none">GET IT ON</div>
                    <div className="text-xs font-bold leading-none mt-0.5">Google Play</div>
                  </div>
                </a>

                <a
                  href="#customer-appstore"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-cyan-400" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.06-.51 2.68-1.26z"/>
                  </svg>
                  <div className="text-left font-mono">
                    <div className="text-[8px] text-slate-400 leading-none">Download on the</div>
                    <div className="text-xs font-bold leading-none mt-0.5">App Store</div>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/how-it-works/customer"
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'تعرف على خطوات تجربة العميل بالتفصيل' : 'View customer step-by-step guide'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>

          {/* App 2: Driver App */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-blue-500/30 flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">
                      {language === 'ar' ? 'تطبيق السائق' : 'Driver App'}
                    </h2>
                    <span className="text-xs text-blue-400 font-mono">
                      {language === 'ar' ? 'لاستقبال وإنجاز طلبات التوصيل' : 'For Dispatch & Order Fulfillment'}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800">
                  v2.4
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'منصة السائق المتكاملة لاستقبال الطلبات الميدانية، مراجعة المسافة والعمولة، إدارة محفظة الأرباح، وسجل الرحلات.'
                  : 'Field application for tanker drivers to receive incoming dispatches, view commissions, manage wallet payouts, and log trips.'}
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>{language === 'ar' ? 'إشعارات فورية للطلبات القريبة' : 'Instant dispatch alerts for nearby requests'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>{language === 'ar' ? 'محفظة عمولات شفافة ودفعات منتظمة' : 'Transparent wallet & regular bank payouts'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>{language === 'ar' ? 'ملاحة مدمجة وتوجيه مباشر للعميل' : 'Built-in navigation & direct customer contact'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase">
                {language === 'ar' ? 'روابط التحميل المباشرة:' : 'Direct Download Links:'}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#driver-play"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                    <path d="M3.6 1.4L13.7 12 3.6 22.6c-.4-.4-.6-1-.6-1.7V3.1c0-.7.2-1.3.6-1.7zm11.2 11.7l2.8 2.9-12.8 7.4 10-10.3zm0-2.2L4.8.6l12.8 7.4-2.8 2.9zm1.1 1.1l3.5-2c1-.6 1-1.6 0-2.2l-3.5-2-2.5 2.6 2.5 3.6z"/>
                  </svg>
                  <div className="text-left font-mono">
                    <div className="text-[8px] text-slate-400 leading-none">GET IT ON</div>
                    <div className="text-xs font-bold leading-none mt-0.5">Google Play</div>
                  </div>
                </a>

                <a
                  href="#driver-appstore"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-cyan-400" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.06-.51 2.68-1.26z"/>
                  </svg>
                  <div className="text-left font-mono">
                    <div className="text-[8px] text-slate-400 leading-none">Download on the</div>
                    <div className="text-xs font-bold leading-none mt-0.5">App Store</div>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/join-as-driver"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'تقديم طلب التسجيل والانضمام كسائق' : 'Apply to register as a driver partner'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Technical Requirements & Supported Devices */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-mono text-cyan-400 uppercase font-semibold">
            {language === 'ar' ? 'متطلبات النظام والأجهزة' : 'System Requirements'}
          </div>
          <div className="flex justify-center gap-8 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 font-mono">iOS:</span> iPhone (iOS 15.0 أو أحدث)
            </div>
            <div>
              <span className="text-slate-500 font-mono">Android:</span> الإصدار 9.0 أو أحدث
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
