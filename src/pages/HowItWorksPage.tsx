import React from 'react';
import { 
  Smartphone, 
  Truck, 
  Droplets, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

interface HowItWorksPageProps {
  onOpenOrderModal: (tankerId?: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onOpenOrderModal }) => {
  const { isRTL, language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'كيف تعمل المنصة | صهاريج نبع' : 'How It Works | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'اكتشف كيف تعمل منصة صهاريج نبع لتوريد المياه: تجربة العميل لطلب الماء، تطبيق السائق لاستلام الطلبات، ومواصفات أسطول الصهاريج المعتمد.'
            : 'Explore how The Nabaa works across the ecosystem: how customers order water, how drivers accept deliveries, and how tankers operate on the ground.'
        }
        canonicalPath={language === 'ar' ? '/ar/how-it-works' : '/how-it-works'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works', path: language === 'ar' ? '/ar/how-it-works' : '/how-it-works' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{language === 'ar' ? 'نظام توريد المياه الذكي' : 'Digital Water Delivery Overview'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'كيف تعمل منصة صهاريج نبع؟' : 'How The Nabaa Works'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'تعتمد صهاريج نبع على دورة توصيل رقمية متكاملة تبدأ بطلب العميل، وتوجيه الصهريج الأقرب، وتنتهي بضخ المياه الصالحة للشرب في الخزان بأعلى معايير النظافة.'
              : 'The Nabaa coordinates customer water requests with available drivers and calibrated tankers through a seamless digital delivery cycle.'}
          </p>
        </div>

        {/* High-level 4-step Delivery Cycle Diagram */}
        <div className="p-8 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6 text-center font-bold">
            {language === 'ar' ? 'دورة التوريد المتكاملة' : 'The Complete Delivery Lifecycle'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="font-bold text-white text-base font-display">
                {language === 'ar' ? 'طلب العميل' : 'Customer Order'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'يحدد العميل الموقع وسعة الصهريج المطلوبة (10، 19، أو 32 طن) عبر التطبيق.'
                  : 'Customer selects tanker size (10T, 19T, 32T) and pinpoints delivery address.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="font-bold text-white text-base font-display">
                {language === 'ar' ? 'التوجيه والإرسال' : 'Smart Dispatch'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'يقوم النظام بإرسال الطلب فوراً إلى أقرب سائق صهريج معتمد ومتاح في النطاق.'
                  : 'System broadcasts order details to nearby available tanker drivers.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="font-bold text-white text-base font-display">
                {language === 'ar' ? 'قبول السائق والانطلاق' : 'Driver Acceptance'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'يراجع السائق تفاصيل الطلب ويقبله، ويبدأ التوجه نحو موقع العميل مع تتبع مباشر.'
                  : 'Driver accepts the request and navigates to the destination with live telemetry.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h3 className="font-bold text-white text-base font-display">
                {language === 'ar' ? 'التفريغ والتأكيد' : 'Pumping & Completion'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'يتم ضخ المياه بأمان في الخزان وتأكيد استلام الطلب رقمياً عبر المنصة.'
                  : 'Water is pumped safely into customer tanks and delivery is confirmed.'}
              </p>
            </div>
          </div>
        </div>

        {/* Three Large Choices (As specifically requested in prompt) */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {language === 'ar' ? 'اختر القسم للاطلاع على التفاصيل الكاملة' : 'Explore by Role'}
            </h2>
            <p className="text-slate-400 text-sm">
              {language === 'ar'
                ? 'صفحات مخصصة تشرح بالتفصيل تجربة العميل، تطبيق السائق، ومواصفات الصهاريج'
                : 'Dedicated guides detailing the customer experience, the driver app, and tanker specifications'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CHOICE 1: CUSTOMER */}
            <div className="p-8 rounded-3xl bg-[#09152b] border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    {language === 'ar' ? 'للمنازل والمشاريع' : 'For Customers'}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1">
                    {language === 'ar' ? 'تجربة العميل' : 'Customer App'}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'تعرف على كيفية قيام العميل بطلب صهريج المياه عبر التطبيق، واختيار السعة المناسبة، وتحديد الموقع بدقة، ومتابعة الصهريج لحظة بلحظة حتى اكتمال التعبئة.'
                    : 'Discover how customers order water tankers, choose suitable capacities, set pin locations, and track arrival in real-time.'}
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === 'ar' ? 'طلب فوري أو مجدول' : 'Instant or scheduled delivery'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === 'ar' ? 'تتبع مسار الصهريج المباشر' : 'Live GPS tanker tracking'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === 'ar' ? 'خيارات دفع إلكترونية آمنة' : 'Mada, Apple Pay & secure payment'}</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/how-it-works/customer"
                className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>{language === 'ar' ? 'شرح تجربة العميل' : 'Explore Customer Guide'}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* CHOICE 2: DRIVER */}
            <div className="p-8 rounded-3xl bg-[#09152b] border border-blue-500/30 hover:border-blue-400 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Truck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                    {language === 'ar' ? 'للسائقين والشركاء' : 'For Drivers'}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1">
                    {language === 'ar' ? 'تطبيق السائق' : 'Driver App'}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'استعرض الشاشات الأصلية لتطبيق السائق: استقبال الطلبات الواردة، مراجعة تفاصيل الرحلة، قبول المهام، إدارة محفظة العمولات، وسجل الرحلات المكتملة.'
                    : 'Review the original driver app interface: receiving requests, viewing trip distance & commission, the driver wallet, and trip history.'}
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{language === 'ar' ? 'استقبال الطلبات الواردة وقبولها' : 'Incoming order dispatch & accept'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{language === 'ar' ? 'محفظة العمولات والأرباح الفورية' : 'Driver wallet & instant commissions'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{language === 'ar' ? 'سجل الرحلات المكتملة والتقييمات' : 'Trip history & driver ratings'}</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/how-it-works/driver"
                className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-extrabold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>{language === 'ar' ? 'شرح تطبيق السائق' : 'Explore Driver Guide'}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* CHOICE 3: TANKER */}
            <div className="p-8 rounded-3xl bg-[#09152b] border border-sky-500/30 hover:border-sky-400 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Droplets className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    {language === 'ar' ? 'مواصفات الأسطول' : 'The Fleet'}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1">
                    {language === 'ar' ? 'أسطول الصهاريج' : 'Tanker Fleet'}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'تعرف على سعات الصهاريج المتاحة (10 طن للأحياء الضيقة، 19 طن للفلل السكنية، 32 طن للمشاريع)، معايير النظافة، وخراطيم الضخ الممتدة.'
                    : 'Inspect tanker capacities (10T, 19T, 32T), food-grade stainless tanks, booster pump pressure, and certified reach hoses.'}
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>{language === 'ar' ? 'سعات معتمدة: 10، 19، 32 طن' : 'Calibrated 10T, 19T, 32T sizes'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>{language === 'ar' ? 'خراطيم ومضخات حتى 50 متراً' : 'Pumps & hoses up to 50 meters'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>{language === 'ar' ? 'إدارة الصهريج تتم عبر تطبيق السائق' : 'Handled via driver application'}</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/how-it-works/tanker"
                className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>{language === 'ar' ? 'مواصفات وسعات الصهاريج' : 'Explore Tanker Specs'}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>

          </div>
        </div>

        {/* CTA Bottom Banner */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            {language === 'ar' ? 'جاهز لتجربة خدمة التوصيل؟' : 'Ready to Experience The Nabaa?'}
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            {language === 'ar'
              ? 'اطلب صهريج مياه الشرب الآن ليصلك الصهريج المناسب بأعلى سرعة وأفضل جودة.'
              : 'Order a water tanker now and get clean potable water pumped directly to your tank.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenOrderModal('tanker-19t')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'اطلب صهريج ماء الآن' : 'Order Water Now'}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
