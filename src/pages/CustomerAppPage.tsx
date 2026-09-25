import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Droplets, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  Navigation, 
  ChevronRight,
  Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

interface CustomerAppPageProps {
  onOpenOrderModal: (tankerId?: string) => void;
}

export const CustomerAppPage: React.FC<CustomerAppPageProps> = ({ onOpenOrderModal }) => {
  const { isRTL, language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedTanker, setSelectedTanker] = useState<string>('19t');

  const steps = [
    {
      step: 1,
      title: language === 'ar' ? '1. فتح التطبيق والتسجيل السريع' : '1. Open the App & Quick Access',
      desc: language === 'ar' 
        ? 'تسجيل دخول فوري برقم الجوال السعودي ورمز التحقق OTP دون تعقيد أو انتظار.'
        : 'Fast mobile sign-in with your Saudi phone number and instant SMS OTP verification.',
    },
    {
      step: 2,
      title: language === 'ar' ? '2. تحديد سعة الصهريج ونوع المياه' : '2. Select Water Requirement',
      desc: language === 'ar'
        ? 'اختر حجم الصهريج المناسب (10 طن، 19 طن، أو 32 طن) ونوع المياه (مياه شرب محلاة صالحة للاستهلاك الآدمي).'
        : 'Choose the appropriate tanker capacity (10T, 19T, 32T) and verified potable drinking water standard.',
    },
    {
      step: 3,
      title: language === 'ar' ? '3. تحديد موقع التوصيل على الخريطة' : '3. Pin Delivery Location',
      desc: language === 'ar'
        ? 'تحديد العنوان بدقة عبر نظام الـ GPS مع إمكانية حفظ عناوين متعددة (الفيلا، المزرعة، المشروع).'
        : 'Pinpoint delivery coordinates via GPS or address search, with saved locations for recurring orders.',
    },
    {
      step: 4,
      title: language === 'ar' ? '4. تأكيد الطلب واختيار موعد الوصول' : '4. Place the Order',
      desc: language === 'ar'
        ? 'اختر التوصيل الفوري (وصول خلال 25-45 دقيقة) أو جدولة موعد محدد، مع دفع إلكتروني آمن عبر مدى، أبل باي أو بطاقة الائتمان.'
        : 'Choose immediate dispatch (25-45 min ETA) or schedule a future slot, paid via Mada, Apple Pay, or credit card.',
    },
    {
      step: 5,
      title: language === 'ar' ? '5. تتبع الصهريج لحظة بلحظة' : '5. Follow the Order Live',
      desc: language === 'ar'
        ? 'متابعة مسار الصهريج على الخريطة، معرفة اسم السائق ورقم الصهريج، ووقت الوصول المتوقع بدقة.'
        : 'Track the tanker on the live map, inspect driver name and tanker ID, and watch real-time ETA countdown.',
    },
    {
      step: 6,
      title: language === 'ar' ? '6. وصول الصهريج والتفريغ الآمن' : '6. Receive Tanker & Delivery Completion',
      desc: language === 'ar'
        ? 'يصل الصهريج إلى الموقع، يتم مد خرطوم الضغط العالي وتفريغ المياه بالكامل في الخزان مع تأكيد الإنجاز.'
        : 'The tanker arrives at your gate, high-pressure food-grade hoses pump the water, and digital delivery is confirmed.',
    },
  ];

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'تطبيق العميل لطلب مياه الصهاريج | صهاريج نبع' : 'Customer Water Ordering App | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'شرح كامل لتطبيق العميل: خطوات طلب صهريج ماء نقي، تحديد سعة الصهريج والموقع، التتبع المباشر، والدفع الآمن.'
            : 'Step-by-step customer app walkthrough: how to order potable water tankers, select capacity, pin delivery address, and track drivers in real-time.'
        }
        canonicalPath={language === 'ar' ? '/ar/how-it-works/customer' : '/how-it-works/customer'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works', path: language === 'ar' ? '/ar/how-it-works' : '/how-it-works' },
          { name: language === 'ar' ? 'تطبيق العميل' : 'Customer App', path: language === 'ar' ? '/ar/how-it-works/customer' : '/how-it-works/customer' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Smartphone className="w-4 h-4" />
            <span>{language === 'ar' ? 'دليل تطبيق العميل' : 'Customer App Walkthrough'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'تطبيق العميل لطلب مياه الصهاريج' : 'The Nabaa Customer App'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'صممت صهاريج نبع تطبيق العميل ليوفر تجربة طلب سلسة ومباشرة، تمكنك من طلب صهريج مياه الشرب وتتبعه حتى اكتمال التعبئة في خطوات محددة وموثوقة.'
              : 'The Nabaa customer application is designed for rapid ordering, accurate address geocoding, live driver tracking, and verified water supply.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenOrderModal('tanker-19t')}
              className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Droplets className="w-4 h-4 fill-slate-950" />
              <span>{language === 'ar' ? 'طلب صهريج ماء الآن' : 'Order Water Now'}</span>
            </button>
            <Link
              to="/download-app"
              className="px-5 py-3.5 rounded-xl font-bold text-sm text-cyan-300 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>{language === 'ar' ? 'تحميل تطبيق نبع' : 'Download The App'}</span>
            </Link>
          </div>
        </div>

        {/* Step-by-Step Interactive Customer Experience Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Step Selector & Explanations (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800">
              {language === 'ar' ? 'مراحل تجربة العميل بالتفصيل:' : 'Customer Experience Steps:'}
            </div>

            {steps.map((item) => (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === item.step
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-base font-display ${activeStep === item.step ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                  </h3>
                  <span className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                    activeStep === item.step
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    0{item.step}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Screen Mockup (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#09152b] border border-cyan-500/30 rounded-[36px] p-6 shadow-2xl backdrop-blur-xl">
              
              {/* App Status Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-display">The Nabaa App</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {language === 'ar' ? 'واجهة العميل الذكية' : 'Customer Experience Interface'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Step 0{activeStep}/06
                </span>
              </div>

              {/* Dynamic Screen Content Based on activeStep */}
              <div className="min-h-[360px] flex flex-col justify-between py-2 space-y-4">
                
                {activeStep === 1 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="text-xs text-cyan-400 font-mono font-bold">1. WELCOME & PHONE SIGN-IN</div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="text-xs text-slate-400">
                        {language === 'ar' ? 'أدخل رقم الجوال للمتابعة:' : 'Enter Saudi Mobile Number:'}
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono" dir="ltr">
                        <span className="text-cyan-400 font-bold">+966</span>
                        <span className="text-white">53 043 4010</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تم إرسال رمز التحقق OTP' : 'OTP code verified instantly'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="text-xs text-cyan-400 font-mono font-bold">2. SELECT TANKER CAPACITY</div>
                    <div className="space-y-2">
                      {[
                        { id: '10t', name: language === 'ar' ? 'صهريج 10 طن (صغير)' : '10 Tons (Compact)', cap: '10,000 Liters' },
                        { id: '19t', name: language === 'ar' ? 'صهريج 19 طن (وسط/فيلا)' : '19 Tons (Standard Villa)', cap: '19,000 Liters' },
                        { id: '32t', name: language === 'ar' ? 'صهريج 32 طن (كبير/مشاريع)' : '32 Tons (Heavy Commercial)', cap: '32,000 Liters' },
                      ].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTanker(t.id)}
                          className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                            selectedTanker === t.id
                              ? 'bg-cyan-950/40 border-cyan-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold font-display">{t.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{t.cap}</div>
                          </div>
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {selectedTanker === t.id ? 'SELECTED' : 'SELECT'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="text-xs text-cyan-400 font-mono font-bold">3. DELIVERY ADDRESS PIN</div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="font-bold">
                          {language === 'ar' ? 'حي الملقا - شارع وادي حنيفة، فيلا 24' : 'Al-Malqa, Wadi Hanifah St, Villa 24'}
                        </span>
                      </div>
                      <div className="h-28 rounded-xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/5" />
                        <div className="relative flex flex-col items-center gap-1 text-center">
                          <MapPin className="w-6 h-6 text-cyan-400 animate-bounce" />
                          <span className="text-[10px] font-mono text-cyan-300">24.7938° N, 46.6184° E</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'ar' ? 'ملاحظة: خزان أرضي مع محبس خارجي' : 'Note: Ground tank with outside valve access'}
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="text-xs text-cyan-400 font-mono font-bold">4. ORDER CONFIRMATION & PAYMENT</div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'ar' ? 'نوع الصهريج:' : 'Tanker Size:'}</span>
                        <span className="text-white font-bold font-mono">19 Tons (19,000L)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'ar' ? 'وقت الوصول المقدر:' : 'Estimated Arrival:'}</span>
                        <span className="text-cyan-400 font-bold font-mono">35 mins</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                        <span className="text-emerald-400 font-bold font-mono">Mada / Apple Pay</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                        <span className="text-white">{language === 'ar' ? 'الإجمالي الشامل:' : 'Total:'}</span>
                        <span className="text-cyan-300 font-mono">180 SAR</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 5 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="text-xs text-cyan-400 font-mono font-bold">5. LIVE TANKER TELEMETRY</div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white font-bold">
                          {language === 'ar' ? 'الصهريج في الطريق إليك' : 'Tanker En Route'}
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-400">ETA: 12 mins</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                        <div>
                          <div className="text-white font-bold">{language === 'ar' ? 'سائق: سعود الغامدي' : 'Driver: Saud Al-Ghamdi'}</div>
                          <div className="text-[10px] text-slate-400 font-mono">صهريج #402 • مرسيدس أكتروس</div>
                        </div>
                        <a
                          href="tel:+966530434010"
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-mono flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-3/4 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 6 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="text-xs text-emerald-400 font-mono font-bold">6. DELIVERY COMPLETED</div>
                    <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-display">
                        {language === 'ar' ? 'تم تفريغ 19 طن بنجاح' : '19 Tons Successfully Delivered'}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {language === 'ar'
                          ? 'تم التحقق من إغلاق محبس الخزان وإصدار فاتورة التسليم الإلكترونية.'
                          : 'Tank valve sealed and electronic delivery receipt generated.'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setActiveStep(prev => prev > 1 ? prev - 1 : 6)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'السابق' : 'Previous'}
                  </button>
                  <button
                    onClick={() => setActiveStep(prev => prev < 6 ? prev + 1 : 1)}
                    className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'التالي' : 'Next Step'}
                  </button>
                </div>
              </div>

              {/* Footer label */}
              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
                {language === 'ar' ? 'واجهة محاكاة تطبيق العميل' : 'Interactive Customer App Simulator'}
              </div>
            </div>
          </div>

        </div>

        {/* Download Badges Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-white font-display">
              {language === 'ar' ? 'حمل تطبيق صهاريج نبع الآن' : 'Download The Nabaa Customer App'}
            </h3>
            <p className="text-slate-300 text-sm">
              {language === 'ar'
                ? 'متوفر مجاناً على متجري جوجل بلاي وأبل ستور لجميع سكان منطقة الرياض.'
                : 'Available for free on Google Play and Apple App Store for iOS and Android.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/download-app"
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white transition-colors"
            >
              <svg className="w-5 h-5 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M3.6 1.4L13.7 12 3.6 22.6c-.4-.4-.6-1-.6-1.7V3.1c0-.7.2-1.3.6-1.7zm11.2 11.7l2.8 2.9-12.8 7.4 10-10.3zm0-2.2L4.8.6l12.8 7.4-2.8 2.9zm1.1 1.1l3.5-2c1-.6 1-1.6 0-2.2l-3.5-2-2.5 2.6 2.5 3.6z"/>
              </svg>
              <div className="text-left font-mono">
                <div className="text-[10px] text-slate-400 leading-none">GET IT ON</div>
                <div className="text-sm font-bold leading-none mt-1">Google Play</div>
              </div>
            </Link>

            <Link
              to="/download-app"
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-white transition-colors"
            >
              <svg className="w-5 h-5 fill-current text-cyan-400" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.06-.51 2.68-1.26z"/>
              </svg>
              <div className="text-left font-mono">
                <div className="text-[10px] text-slate-400 leading-none">Download on the</div>
                <div className="text-sm font-bold leading-none mt-1">App Store</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
