import React from 'react';
import { 
  Droplets, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Smartphone, 
  Clock, 
  ChevronRight, 
  Star,
  Sparkles,
  Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

interface HomePageProps {
  onOpenOrderModal: (tankerId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenOrderModal }) => {
  const { t, isRTL, language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'توصيل مياه الصهاريج عبر تطبيق رقمي ذكي' : 'Potable Water Tanker Delivery via Digital Platform'}
        description={
          language === 'ar'
            ? 'اطلب صهريج مياه نقي لمنزلك أو مشروعك بضغطة زر. صهاريج نبع تربط العملاء بسائقي الصهاريج المعتمدين لضمان سرعة الوصول ونقاء المياه.'
            : 'Order clean water tankers directly to your location with digital tracking, verified drivers, and transparent pricing across Riyadh.'
        }
        canonicalPath={language === 'ar' ? '/ar' : '/'}
      />

      <div className="space-y-24 py-6 sm:py-10">
        
        {/* ========================================================= */}
        {/* 1. HERO SECTION                                           */}
        {/* ========================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-12">
          {/* Subtle ambient lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left / Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Domain-native clean kicker (anti-pill) */}
              <div className={`flex items-center justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase`}>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{language === 'ar' ? 'خدمة توصيل صهاريج المياه الرقمية' : 'Digital Water Tanker Delivery'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{language === 'ar' ? 'الرياض والمناطق المجاورة' : 'Riyadh Metropolitan'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.15]">
                {language === 'ar' ? (
                  <>
                    ماء نقي يصلك <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                      أينما كنت وفي الوقت المحدد
                    </span>
                  </>
                ) : (
                  <>
                    Water Delivered <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                      When You Need It
                    </span>
                  </>
                )}
              </h1>

              {/* Sub-headline */}
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {language === 'ar'
                  ? 'اطلب صهريج مياه الشرب عبر منصة نبع الرقمية واحصل على توصيل سريع وموثوق مباشرة إلى موقعك، مع تتبع لحظي وتأكيد معايير الجودة.'
                  : 'Order water through The Nabaa and get it delivered directly to your location with real-time tracking, certified potable quality, and verified drivers.'}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className={`flex flex-wrap items-center justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} gap-3 pt-2`}>
                <button
                  onClick={() => onOpenOrderModal('tanker-19t')}
                  className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                  id="hero-order-water-btn"
                >
                  <Droplets className="w-4 h-4 fill-slate-950" />
                  <span>{language === 'ar' ? 'اطلب صهريج ماء الآن' : 'Order Water Now'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <Link
                  to="/download-app"
                  className="px-5 py-3.5 rounded-xl font-bold text-sm text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'تحميل التطبيق' : 'Download the App'}</span>
                </Link>

                <Link
                  to="/join-as-driver"
                  className="px-4 py-3.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-1.5"
                >
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>{language === 'ar' ? 'انضم كسائق صهريج' : 'Join as a Driver'}</span>
                </Link>
              </div>

              {/* Official Store Badges */}
              <div className={`pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} gap-4 text-xs text-slate-400`}>
                <span className="font-mono">{language === 'ar' ? 'تطبيقات الأجهزة الذكية:' : 'Available for download:'}</span>
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/download-app"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors"
                    title="Google Play Store"
                  >
                    <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                      <path d="M3.6 1.4L13.7 12 3.6 22.6c-.4-.4-.6-1-.6-1.7V3.1c0-.7.2-1.3.6-1.7zm11.2 11.7l2.8 2.9-12.8 7.4 10-10.3zm0-2.2L4.8.6l12.8 7.4-2.8 2.9zm1.1 1.1l3.5-2c1-.6 1-1.6 0-2.2l-3.5-2-2.5 2.6 2.5 3.6z"/>
                    </svg>
                    <div className="text-left font-mono">
                      <div className="text-[9px] text-slate-400 leading-none">GET IT ON</div>
                      <div className="text-xs font-bold leading-none mt-0.5">Google Play</div>
                    </div>
                  </Link>

                  <Link
                    to="/download-app"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors"
                    title="Apple App Store"
                  >
                    <svg className="w-4 h-4 fill-current text-cyan-400" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.06-.51 2.68-1.26z"/>
                    </svg>
                    <div className="text-left font-mono">
                      <div className="text-[9px] text-slate-400 leading-none">Download on the</div>
                      <div className="text-xs font-bold leading-none mt-0.5">App Store</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right / Visual Preview Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-[#09152b] border border-cyan-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {language === 'ar' ? 'طلب فوري مباشر' : 'Active Dispatch Radar'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">Riyadh Hub</span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{language === 'ar' ? 'سعة الصهريج القياسي' : 'Standard Tanker Size'}</span>
                      <span className="font-mono font-bold text-cyan-300">19 {language === 'ar' ? 'طن' : 'Tons'} (19,000L)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{language === 'ar' ? 'جودة المياه' : 'Water Quality'}</span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {language === 'ar' ? 'مياه شرب محلاة صالحة للاستهلاك' : 'Certified Potable Drinking'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{language === 'ar' ? 'متوسط وقت الوصول (ETA)' : 'Average ETA'}</span>
                      <span className="font-mono text-white">25 - 45 {language === 'ar' ? 'دقيقة' : 'mins'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 flex items-center justify-between">
                    <span>{language === 'ar' ? 'التوصيل متاح الآن لجميع أحياء شمال ووسط الرياض' : 'Immediate dispatch active across Riyadh'}</span>
                    <span className="font-mono text-cyan-300 font-bold">ONLINE</span>
                  </div>

                  <button
                    onClick={() => onOpenOrderModal('tanker-19t')}
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{language === 'ar' ? 'بدء الطلب السريع' : 'Start Instant Order'}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400 font-mono">
                  {language === 'ar' ? 'نظام صهاريج نبع الذكي لتوريد المياه' : 'The Nabaa Smart Water Logistics Network'}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 2. WHAT IS THE NABAA? (Concise Section)                    */}
        {/* ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
              {language === 'ar' ? 'عن المنصة والخدمة' : 'About The Service'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
              {language === 'ar' ? 'توريد المياه أصبح بسيطاً وموثوقاً' : 'Water Delivery Made Simple'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {language === 'ar'
                ? 'صهاريج نبع تجعل توصيل مياه الشرب بالصهاريج أكثر سهولة وموثوقية من خلال ربط طلبات العملاء مباشرة مع سائقي الصهاريج المعتمدين عبر منصة رقمية متطورة تضمن نقاء المياه وشفافية الأسعار.'
                : 'The Nabaa makes water-tanker delivery easier by connecting customer orders with delivery drivers and tankers through a digital platform.'}
            </p>
            <div className="pt-3">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
              >
                <span>{language === 'ar' ? 'تعرف أكثر على صهاريج نبع' : 'Learn About The Nabaa'}</span>
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 3. HOW IT WORKS (3-Step Overview)                         */}
        {/* ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
              {language === 'ar' ? 'خطوات التوصيل' : 'Delivery Workflow'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {language === 'ar' ? 'كيف تعمل خدمة صهاريج نبع؟' : 'How It Works'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              {language === 'ar'
                ? 'ثلاث خطوات واضحة ومباشرة لتوصيل المياه إلى موقعك بكل يسر'
                : 'Three straightforward steps to get fresh water delivered to your doorstep'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Step 01 */}
            <div className="p-8 rounded-3xl bg-[#09152b]/80 border border-slate-800/90 relative group hover:border-cyan-500/40 transition-all">
              <div className="text-3xl font-black font-mono text-cyan-400 mb-4">01</div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {language === 'ar' ? 'الطلب' : 'Order'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'يختار العميل احتياجه من المياه (سعة الصهريج ونوع المياه) ويحدد موقع التوصيل بدقة عبر تطبيق نبع.'
                  : 'Customers select their water requirement and delivery location through The Nabaa application.'}
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-8 rounded-3xl bg-[#09152b]/80 border border-slate-800/90 relative group hover:border-cyan-500/40 transition-all">
              <div className="text-3xl font-black font-mono text-cyan-400 mb-4">02</div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {language === 'ar' ? 'التوجيه والإرسال' : 'Delivery'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'يتولى سائق صهريج متاح وقريب استلام الطلب وتعبئة المياه من محطة معتمدة والتوجه إلى موقعك.'
                  : 'The order is handled by an available driver/tanker who accepts the dispatch and heads to the destination.'}
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-8 rounded-3xl bg-[#09152b]/80 border border-slate-800/90 relative group hover:border-cyan-500/40 transition-all">
              <div className="text-3xl font-black font-mono text-cyan-400 mb-4">03</div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {language === 'ar' ? 'التفريغ والاكتمال' : 'Delivered'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'يصل الصهريج إلى موقع العميل، ويتم تفريغ المياه في الخزان بواسطة خراطيم ضغط عالية مع تأكيد التسليم.'
                  : "The water tanker reaches the customer's location, pumps the water safely into the tank, and completes the delivery."}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-bold text-sm transition-all"
            >
              <span>{language === 'ar' ? 'تفاصيل كيفية عمل النظام والتطبيقات' : 'See How It Works'}</span>
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 4. OUR APPLICATIONS (Technology Behind The Nabaa)          */}
        {/* ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
              {language === 'ar' ? 'التكنولوجيا المشغلة لعملياتنا' : 'Technology Behind The Nabaa'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {language === 'ar' ? 'تطبيقات رقمية تجعل توريد المياه أسهل' : 'Technology Behind The Nabaa'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'ar'
                ? 'تعتمد صهاريج نبع على تطبيقات رقمية متكاملة لربط العملاء والسائقين وإدارة أسطول الصهاريج بدقة وشفافية.'
                : 'The Nabaa uses digital applications to make water delivery easier for customers and drivers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* 1. Customer App Card */}
            <div className="p-7 rounded-3xl bg-[#09152b] border border-cyan-500/20 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {language === 'ar' ? 'تطبيق العميل' : 'Customer App'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'طلب سريع بنقرة واحدة، تحديد سعة الصهريج، اختيار الموقع على الخريطة، والتتبع المباشر حتى اكتمال التفريغ.'
                    : 'Easy water ordering, capacity selection, real-time tanker tracking on the map, and secure digital payment.'}
                </p>
              </div>
              <Link
                to="/how-it-works/customer"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 pt-4 border-t border-slate-800"
              >
                <span>{language === 'ar' ? 'استكشف تطبيق العميل' : 'Explore Customer App'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* 2. Driver App Card */}
            <div className="p-7 rounded-3xl bg-[#09152b] border border-blue-500/20 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {language === 'ar' ? 'تطبيق السائق' : 'Driver App'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'استقبال الطلبات الواردة، مراجعة الوجهة والمسافة والعمولة، إدارة محفظة الأرباح، وسجل الرحلات المكتملة.'
                    : 'Receive incoming delivery requests, review order details, accept jobs, view earnings in the wallet, and track trips.'}
                </p>
              </div>
              <Link
                to="/how-it-works/driver"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 pt-4 border-t border-slate-800"
              >
                <span>{language === 'ar' ? 'استكشف تطبيق السائق' : 'Explore Driver App'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* 3. Tanker Fleet Card */}
            <div className="p-7 rounded-3xl bg-[#09152b] border border-sky-500/20 hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {language === 'ar' ? 'أسطول الصهاريج' : 'Tanker Fleet'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'ar'
                    ? 'صهاريج مياه معتمدة وصحية بسعات 10 طن و19 طن و32 طن، مجهزة بمضخات قوية وخراطيم ممتدة حتى 50 متراً.'
                    : 'Sanitary food-grade tankers in 10T, 19T, and 32T capacities, fitted with high-pressure booster pumps and extended hoses.'}
                </p>
              </div>
              <Link
                to="/how-it-works/tanker"
                className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 pt-4 border-t border-slate-800"
              >
                <span>{language === 'ar' ? 'مواصفات وسعات الصهاريج' : 'Explore Tanker Fleet'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-sm shadow-md shadow-cyan-500/20"
            >
              <span>{language === 'ar' ? 'استكشف كيفية عمل التطبيقات بالتفصيل' : 'Explore How the Apps Work'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 5. SERVICE AREAS SNIPPET                                   */}
        {/* ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                {language === 'ar' ? 'مناطق التغطية' : 'Service Coverage'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {language === 'ar' ? 'أين نوفر الخدمة حالياً؟' : 'Where We Deliver'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'نغطي حالياً أحياء الرياض الحيوية (الملقا، النخيل، الياسمين، النرجس، حطين، وغيرها) مع جاهزية الصهاريج للتوصيل الفوري أو المجدول.'
                  : 'Active water tanker delivery across confirmed Riyadh metropolitan districts including Al-Malqa, Al-Nakheel, Al-Yasmin, Al-Narjis, Hittin, and surrounding sectors.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                to="/service-areas"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'استعرض المناطق المخدومة' : 'View Service Areas'}</span>
              </Link>

              <button
                onClick={() => onOpenOrderModal('tanker-19t')}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Droplets className="w-4 h-4" />
                <span>{language === 'ar' ? 'طلب صهريج لموقعك' : 'Order to My Location'}</span>
              </button>
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 6. CONVERSION BANNER (Need Water Delivered Today?)         */}
        {/* ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-[#071733] to-[#040e24] border border-cyan-500/30 text-center space-y-6 relative overflow-hidden">
            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
                {language === 'ar' ? 'هل تحتاج إلى صهريج ماء اليوم؟' : 'Need Water Delivered Today?'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === 'ar'
                  ? 'سواء كنت بحاجة إلى تعبئة عاجلة لخزان الفيلا أو إمداد منتظم، صهاريج نبع جاهزة لتوصيل المياه النقية في أقصر وقت ممكن.'
                  : 'Whether you require an urgent refill for your residential tank or scheduled commercial supply, The Nabaa is ready.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenOrderModal('tanker-19t')}
                className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <Droplets className="w-4 h-4 fill-slate-950" />
                <span>{language === 'ar' ? 'اطلب صهريج ماء' : 'Order Water Now'}</span>
              </button>

              <a
                href="tel:+966530434010"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span dir="ltr">+966 53 043 4010</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};
