import React, { useState } from 'react';
import { 
  Truck, 
  Wallet, 
  Clock, 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Power, 
  Star, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

export const DriverAppPage: React.FC = () => {
  const { isRTL, language } = useLanguage();
  
  // Interactive driver app states
  const [isDriverOnline, setIsDriverOnline] = useState<boolean>(true);
  const [driverOrderState, setDriverOrderState] = useState<'incoming' | 'accepted' | 'navigating' | 'delivered'>('incoming');
  const [orderCountdown] = useState<number>(18);
  const [walletBalance] = useState<number>(385);
  const [payoutRequested, setPayoutRequested] = useState<boolean>(false);

  const handleAcceptOrder = () => {
    setDriverOrderState('accepted');
  };

  const handleDeclineOrder = () => {
    setDriverOrderState('incoming');
  };

  const handlePayoutRequest = () => {
    setPayoutRequested(true);
  };

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'تطبيق السائق والشركاء | صهاريج نبع' : 'Driver App & Fleet Dispatch | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'شرح شامل لتطبيق سائق صهريج نبع: استقبال الطلبات الواردة، مراجعة تفاصيل الرحلة، قبول المهام، إدارة محفظة العمولات، وسجل الرحلات المكتملة.'
            : 'Complete guide to the driver app: receiving orders, reviewing location and commission, the driver wallet, and completed trip records.'
        }
        canonicalPath={language === 'ar' ? '/ar/how-it-works/driver' : '/how-it-works/driver'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works', path: language === 'ar' ? '/ar/how-it-works' : '/how-it-works' },
          { name: language === 'ar' ? 'تطبيق السائق' : 'Driver App', path: language === 'ar' ? '/ar/how-it-works/driver' : '/how-it-works/driver' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        
        {/* ========================================================= */}
        {/* 1. DRIVER APP INTRODUCTION                                */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Truck className="w-4 h-4" />
            <span>{language === 'ar' ? 'بوابة السائقين الميدانية' : 'Driver & Partner Application'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'تطبيق السائق وإدارة الرحلات' : 'The Nabaa Driver Application'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'تطبيق مخصص لسائقي صهاريج المياه يتيح استقبال طلبات التوصيل القريبة، ومراجعة بيانات العميل والمسافة والعمولة، وإدارة المحفظة المالية وسجل الرحلات بكل شفافية ودقة.'
              : 'A dedicated mobile application for water tanker drivers to receive nearby delivery requests, review order details, manage commissions, and track completed trips.'}
          </p>

          <div className="pt-2">
            <Link
              to="/join-as-driver"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/20"
            >
              <span>{language === 'ar' ? 'انضم كشريك سائق صهريج' : 'Join as a Driver Partner'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>

        {/* 3 Core Original Screen Columns Showcase */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {language === 'ar' ? 'واجهات التطبيق الأصلية للسائق' : 'Original Driver Application Screens'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              {language === 'ar'
                ? 'استعرض الشاشات الثلاث الرئيسية التي يعتمد عليها السائق في عمله اليومي'
                : 'Inspect the 3 core screens drivers interact with during daily field operations'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ========================================================= */}
            {/* SCREEN 1: INCOMING ORDERS / ACCEPT & DECLINE              */}
            {/* ========================================================= */}
            <div className="bg-[#09152b] border border-cyan-500/30 rounded-[36px] p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                {/* Header & Status Toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-bold text-xs flex items-center justify-center font-display">
                      #402
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-display">
                        {language === 'ar' ? 'صهريج رقم #402' : 'Tanker #402'}
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono">
                        {language === 'ar' ? 'سعة 19 طن (19,000 لتر)' : '19 Tons Capacity'}
                      </div>
                    </div>
                  </div>

                  {/* Online / Offline Toggle */}
                  <button
                    onClick={() => setIsDriverOnline(!isDriverOnline)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isDriverOnline
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    <span>
                      {isDriverOnline 
                        ? (language === 'ar' ? 'متاح للطلب' : 'ONLINE') 
                        : (language === 'ar' ? 'غير متصل' : 'OFFLINE')}
                    </span>
                  </button>
                </div>

                {/* Status Banner */}
                <div className="mb-4 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{language === 'ar' ? 'حالة السائق:' : 'Availability:'}</span>
                  <span className={`font-mono font-bold ${isDriverOnline ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isDriverOnline 
                      ? (language === 'ar' ? 'جاهز لاستقبال الطلبات' : 'Active for Requests') 
                      : (language === 'ar' ? 'لا يستقبل طلبات حالياً' : 'Not Receiving Orders')}
                  </span>
                </div>

                {/* Incoming Request Card with Accept / Decline */}
                {driverOrderState === 'incoming' && (
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0f2347] to-[#0a1832] border border-cyan-400/50 shadow-xl space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                        {language === 'ar' ? 'طلب توصيل وارد' : 'INCOMING ORDER'}
                      </span>
                      <span className="text-xs font-mono text-cyan-300" dir="ltr">{orderCountdown}s</span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white font-display">
                        {language === 'ar' ? 'فيلا سكنية - حي النخيل' : 'Al-Nakheel Residential Villa'}
                      </div>
                      <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{language === 'ar' ? 'الملقا • على بُعد 2.4 كم' : 'Al-Malqa • 2.4 km away'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400">{language === 'ar' ? 'سعة الصهريج' : 'Tanker Needed'}</div>
                        <div className="font-bold text-cyan-300 font-mono">{language === 'ar' ? '19 طن (وسط)' : '19 Tons (Medium)'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">{language === 'ar' ? 'عمولة الرحلة' : 'Est. Commission'}</div>
                        <div className="font-bold text-emerald-400 font-mono">{language === 'ar' ? '+35 ر.س' : '+35 SAR'}</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>{language === 'ar' ? 'الخرطوم المطلوب:' : 'Hose requirement:'}</span>
                      <span className="text-white font-medium">{language === 'ar' ? 'محبس أرضي 40م' : '40m ground valve'}</span>
                    </div>

                    {/* Accept / Decline actions */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={handleDeclineOrder}
                        className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 cursor-pointer transition-colors"
                      >
                        {language === 'ar' ? 'رفض' : 'Decline'}
                      </button>
                      <button
                        onClick={handleAcceptOrder}
                        className="py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 cursor-pointer transition-all"
                      >
                        {language === 'ar' ? 'قبول (35 ر.س)' : 'Accept (35 SAR)'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Accepted Order / Active Trip State */}
                {driverOrderState !== 'incoming' && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white font-display">
                        {language === 'ar' ? 'إرسالية نشطة' : 'Active Dispatch'}
                      </span>
                      <span className="text-cyan-400 font-mono">#NB-9481</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'ar' ? 'العميل' : 'Customer'}</span>
                        <span className="text-white font-medium">{language === 'ar' ? 'سعود الغامدي' : 'Saud Al-Ghamdi'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'ar' ? 'الوجهة' : 'Destination'}</span>
                        <span className="text-white font-medium">{language === 'ar' ? 'بوابة 4، خزان أرضي' : 'Gate 4, Ground Tank'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'ar' ? 'طول الخرطوم' : 'Hose Reach'}</span>
                        <span className="text-cyan-300 font-mono">{language === 'ar' ? '50م ضغط مرتفع' : '50m High Reach'}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-800/80">
                        <span className="text-slate-400">{language === 'ar' ? 'تواصل مع العميل' : 'Contact Customer'}</span>
                        <div className="flex items-center gap-1.5">
                          <a
                            href="https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Customer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-[10px] font-mono flex items-center gap-1"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href="tel:+966530434010"
                            className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-[10px] font-mono flex items-center gap-1"
                            title="Call"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Milestone progression */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">
                        {language === 'ar' ? 'مراحل التوصيل:' : 'Delivery Milestone:'}
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-mono">
                        <span className="p-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                          {language === 'ar' ? 'تم القبول' : 'Accepted'}
                        </span>
                        <span className="p-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                          {language === 'ar' ? 'في الطريق' : 'En Route'}
                        </span>
                        <span className="p-1 rounded bg-slate-800 text-slate-400">
                          {language === 'ar' ? 'وصل الموقع' : 'Arrived'}
                        </span>
                        <span className="p-1 rounded bg-slate-800 text-slate-400">
                          {language === 'ar' ? 'تم التفريغ' : 'Delivered'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setDriverOrderState('incoming')}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      {language === 'ar' ? 'محاكاة اكتمال الرحلة والتفريغ' : 'Simulate Trip Completion'}
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
                {language === 'ar' ? 'تطبيق السائق • واجهة التوجيه الميداني والطلبات الواردة' : 'Driver App • Dispatch & Incoming Requests Interface'}
              </div>
            </div>

            {/* ========================================================= */}
            {/* SCREEN 2: DRIVER WALLET & COMMISSIONS                     */}
            {/* ========================================================= */}
            <div className="bg-[#09152b] border border-cyan-500/30 rounded-[36px] p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                {/* Wallet Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-display">
                        {language === 'ar' ? 'محفظة السائق' : 'Driver Wallet'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'ar' ? 'العمولات والمستحقات الفورية' : 'Commissions & Payouts'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {language === 'ar' ? 'مفعل' : 'Active'}
                  </span>
                </div>

                {/* Available Balance Display */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 mb-5">
                  <div className="text-xs text-slate-400 font-medium">
                    {language === 'ar' ? 'الرصيد المتاح للتحويل' : 'Available Balance'}
                  </div>
                  <div className="text-3xl font-black text-white font-display flex items-baseline gap-1.5 my-1">
                    <span>{walletBalance}</span>
                    <span className="text-sm font-semibold text-emerald-400 font-sans">
                      {language === 'ar' ? 'ر.س' : 'SAR'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {language === 'ar' ? 'يُحدث الرصيد تلقائياً فور تأكيد كل تفريغ ناجح' : 'Updated after every verified delivery'}
                  </div>

                  <button
                    onClick={handlePayoutRequest}
                    disabled={payoutRequested}
                    className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      payoutRequested
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    <span>
                      {payoutRequested 
                        ? (language === 'ar' ? 'طلب التحويل قيد مراجعة الإدارة' : 'Payout Pending Review') 
                        : (language === 'ar' ? 'طلب تحويل الأرباح للحساب البنكي' : 'Payout Request')}
                    </span>
                  </button>
                </div>

                {/* Commission History */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 uppercase tracking-wider">
                      {language === 'ar' ? 'سجل العمولات' : 'Commission History'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {language === 'ar' ? 'آخر العمليات' : 'Recent Deliveries'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">
                          {language === 'ar' ? 'توصيل صهريج 19 طن - فيلا' : '19T Villa Delivery'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {language === 'ar' ? 'طلب #NB-9480 • الملقا' : 'Order #NB-9480 • Al-Malqa'}
                        </div>
                      </div>
                      <div className={isRTL ? 'text-left' : 'text-right'}>
                        <div className="text-xs font-mono font-bold text-emerald-400" dir="ltr">+35 SAR</div>
                        <div className="text-[10px] text-slate-500 font-mono">11:15 AM</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">
                          {language === 'ar' ? 'توصيل صهريج 32 طن - موقع' : '32T Site Delivery'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {language === 'ar' ? 'طلب #NB-9479 • المنطقة الصناعية' : 'Order #NB-9479 • Industrial Site'}
                        </div>
                      </div>
                      <div className={isRTL ? 'text-left' : 'text-right'}>
                        <div className="text-xs font-mono font-bold text-emerald-400" dir="ltr">+50 SAR</div>
                        <div className="text-[10px] text-slate-500 font-mono">10:50 AM</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">
                          {language === 'ar' ? 'تعبئة صهريج 10 طن - حديقة' : '10T Garden Refill'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {language === 'ar' ? 'طلب #NB-9472 • الياسمين' : 'Order #NB-9472 • Al-Yasmin'}
                        </div>
                      </div>
                      <div className={isRTL ? 'text-left' : 'text-right'}>
                        <div className="text-xs font-mono font-bold text-emerald-400" dir="ltr">+25 SAR</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {language === 'ar' ? 'أمس' : 'Yesterday'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explicit Mandatory Demonstration Disclaimer Label */}
              <div className="pt-4 border-t border-slate-800 text-[10px] text-amber-400/90 font-mono text-center flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>
                  {language === 'ar' 
                    ? 'شاشة توضيحية تجريبية • مبالغ العمولات المعروضة هي لأغراض العرض والمحاكاة فقط' 
                    : 'Example / Demonstration Screen • Demonstration Values'}
                </span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SCREEN 3: TRIP HISTORY & RATINGS                          */}
            {/* ========================================================= */}
            <div className="bg-[#09152b] border border-cyan-500/30 rounded-[36px] p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                {/* Trip History Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-display">
                        {language === 'ar' ? 'سجل الرحلات' : 'Trip History'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'ar' ? 'رحلات الصهريج المكتملة' : 'Completed Tanker Trips'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{language === 'ar' ? 'تقييم 4.95' : '4.95 Rating'}</span>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-4 text-[11px]">
                  <span className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold">
                    {language === 'ar' ? 'جميع المكتملة' : 'All Completed'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                    {language === 'ar' ? 'هذا الأسبوع (18)' : 'This Week (18)'}
                  </span>
                </div>

                {/* Records List */}
                <div className="space-y-2.5">
                  {[
                    { 
                      id: '#NB-9481', 
                      date: language === 'ar' ? 'اليوم، 11:42 ص' : 'Today, 11:42 AM', 
                      size: language === 'ar' ? '19 طن' : '19 Tons', 
                      status: language === 'ar' ? 'تم التفريغ' : 'Delivered', 
                      earnings: '+35 SAR', 
                      rating: '5.0' 
                    },
                    { 
                      id: '#NB-9475', 
                      date: language === 'ar' ? 'أمس، 04:10 م' : 'Yesterday, 04:10 PM', 
                      size: language === 'ar' ? '19 طن' : '19 Tons', 
                      status: language === 'ar' ? 'تم التفريغ' : 'Delivered', 
                      earnings: '+35 SAR', 
                      rating: '5.0' 
                    },
                    { 
                      id: '#NB-9462', 
                      date: language === 'ar' ? '08 سبتمبر، 09:30 ص' : 'Sept 08, 09:30 AM', 
                      size: language === 'ar' ? '32 طن' : '32 Tons', 
                      status: language === 'ar' ? 'تم التفريغ' : 'Delivered', 
                      earnings: '+50 SAR', 
                      rating: '4.9' 
                    },
                    { 
                      id: '#NB-9450', 
                      date: language === 'ar' ? '07 سبتمبر، 02:20 م' : 'Sept 07, 02:20 PM', 
                      size: language === 'ar' ? '10 طن' : '10 Tons', 
                      status: language === 'ar' ? 'تم التفريغ' : 'Delivered', 
                      earnings: '+25 SAR', 
                      rating: '5.0' 
                    }
                  ].map((trip, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-1.5"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-cyan-300">{trip.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {trip.status}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs text-slate-300">
                        <span>{language === 'ar' ? `سعة ${trip.size}` : `${trip.size} Capacity`}</span>
                        <span className="font-mono font-bold text-white" dir="ltr">{trip.earnings}</span>
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                        <span>{trip.date}</span>
                        <span className="text-amber-400 flex items-center gap-0.5" dir="ltr">★ {trip.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explicit Mandatory Demonstration Disclaimer Label */}
              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
                {language === 'ar' ? 'سجلات رحلات فعلية تجريبية • بيانات محاكاة' : 'Sample Trip Records • Demonstration Data'}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* STRUCTURED WORKFLOW EXPLANATIONS (As specified in brief)   */}
        {/* ========================================================= */}
        <div className="space-y-12 pt-8 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {language === 'ar' ? 'دورة عمل السائق خطوة بخطوة' : 'Driver Workflow Breakdown'}
            </h2>
            <p className="text-slate-400 text-sm">
              {language === 'ar'
                ? 'كيف يستخدم السائق التطبيق من أول استلام الطلب حتى استلام مستحقاته في حسابه البنكي'
                : 'How drivers operate the application from initial dispatch to bank account settlement'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Step 1: Receive Delivery Requests */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">01 / RECEIVE REQUESTS</div>
              <h3 className="text-lg font-bold text-white font-display">
                {language === 'ar' ? 'استقبال طلبات التوصيل' : 'Receive Delivery Requests'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'عند تفعيل حالة "متاح"، تظهر إشعارات الطلبات القريبة على شاشة السائق مع عد تنازلي يتيح له سرعة اتخاذ القرار.'
                  : 'When online, available drivers receive instantaneous push dispatches with countdown timers for nearby orders.'}
              </p>
            </div>

            {/* Step 2: Review Order Information */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">02 / REVIEW ORDER INFO</div>
              <h3 className="text-lg font-bold text-white font-display">
                {language === 'ar' ? 'مراجعة بيانات الطلب' : 'Review Order Information'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'يطلع السائق على موقع العميل بدقة، والمسافة بالكيلومتر، وسعة الصهريج المطلوبة، والعمولة المحددة قبل القبول.'
                  : 'Drivers see the exact destination pin, travel distance, required tanker capacity, and fixed commission amount.'}
              </p>
            </div>

            {/* Step 3: Accept Delivery */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">03 / ACCEPT DISPATCH</div>
              <h3 className="text-lg font-bold text-white font-display">
                {language === 'ar' ? 'قبول التوصيل والانطلاق' : 'Accept Delivery'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'بمجرد النقر على "قبول"، يبدأ التوجيه الملاحي المباشر، ويتاح رقم تواصل العميل وخيار المحادثة السريعة.'
                  : 'Clicking Accept locks the order, launches turn-by-turn route navigation, and enables direct customer calling.'}
              </p>
            </div>

            {/* Step 4: Driver Wallet & Transparent Commissions */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">04 / DRIVER WALLET</div>
              <h3 className="text-lg font-bold text-white font-display">
                {language === 'ar' ? 'محفظة السائق والعمولات' : 'Driver Wallet & Payouts'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'يضاف مبلغ العمولة فور تأكيد تفريغ المياه مباشرة إلى المحفظة، مع إمكانية طلب التحويل الأسبوعي للحساب البنكي.'
                  : 'Earnings credit to the driver wallet immediately upon delivery confirmation, eligible for direct bank transfers.'}
              </p>
            </div>

            {/* Step 5: Commission History */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">05 / COMMISSION LOGS</div>
              <h3 className="text-lg font-bold text-white font-display">
                {language === 'ar' ? 'سجل العمولات الشفاف' : 'Commission History'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'سجل مفصل يوثق كل رحلة، الوقت، سعة الصهريج، والعمولة الصافية المودعة بدون أي خصومات خفية.'
                  : 'A transparent statement recording every trip ID, timestamp, tanker volume, and net commission credited.'}
              </p>
            </div>

            {/* Step 6: Trip History & Completion */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">06 / COMPLETED TRIPS</div>
              <h3 className="text-lg font-bold text-white font-display">
                {language === 'ar' ? 'سجل الرحلات وتقييمات الخدمة' : 'Trip History & Quality Ratings'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'أرشيف الرحلات المكتملة يتيح للسائق متابعة أدائه وتقييمات العملاء وحجم الإنجاز الأسبوعي والشهري.'
                  : 'An archive of completed dispatches allowing drivers to track performance, customer feedback, and cumulative work.'}
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* JOIN THE NABAA CTA (As specifically required)             */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/40 text-center space-y-6">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              {language === 'ar' ? 'فرص عمل وشراكة مجزية' : 'Partner Recruitment'}
            </span>
            <h2 className="text-3xl font-black text-white font-display">
              {language === 'ar' ? 'هل تمتلك صهريج مياه؟ انضم إلينا اليوم' : 'Own a Water Tanker? Drive With Us'}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {language === 'ar'
                ? 'انضم إلى شبكة سائقي صهاريج نبع في الرياض، واستقبل طلبات توصيل مياه مستمرة بعمولات مجزية ودفعات منتظمة.'
                : 'Join The Nabaa driver network in Riyadh to receive consistent delivery requests, transparent commissions, and weekly bank settlements.'}
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/join-as-driver"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all"
            >
              <span>{language === 'ar' ? 'تقديم طلب الانضمام كسائق' : 'Apply to Join as a Driver'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
