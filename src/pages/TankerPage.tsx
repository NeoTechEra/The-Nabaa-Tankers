import React from 'react';
import { 
  Droplets, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  ArrowRight, 
  Gauge, 
  Scale, 
  Clock, 
  PhoneCall, 
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

interface TankerPageProps {
  onOpenOrderModal: (tankerId?: string) => void;
}

export const TankerPage: React.FC<TankerPageProps> = ({ onOpenOrderModal }) => {
  const { isRTL, language } = useLanguage();

  const tankers = [
    {
      id: 'tanker-10t',
      name: language === 'ar' ? 'صهريج 10 طن (حجم مدمج)' : '10-Ton Compact Tanker',
      capacity: '10,000 Liters / 10 Tons',
      tag: language === 'ar' ? 'للشوارع الضيقة والمزارع الصغيرة' : 'Narrow Streets & Residential Refills',
      desc: language === 'ar'
        ? 'مخصص للمواقع السكنية ذات المداخل الضيقة أو الشوارع التي يصعب على الصهاريج الكبيرة دخولها.'
        : 'Engineered for tight residential lanes, villas with narrow gates, and quick top-ups where heavy trucks cannot maneuver.',
      specs: [
        { label: language === 'ar' ? 'سعة الخزان:' : 'Tank Volume:', val: '10,000 Liters' },
        { label: language === 'ar' ? 'طول الخرطوم:' : 'Hose Length:', val: '30 Meters' },
        { label: language === 'ar' ? 'سرعة التفريغ:' : 'Pump Rate:', val: '1,200 L/min (~8 mins)' },
        { label: language === 'ar' ? 'مطابقة الجودة:' : 'Quality Grade:', val: language === 'ar' ? 'مياه شرب محلاة' : 'Potable Drinking Grade' }
      ]
    },
    {
      id: 'tanker-19t',
      name: language === 'ar' ? 'صهريج 19 طن (الحجم القياسي للفلل)' : '19-Ton Standard Villa Tanker',
      capacity: '19,000 Liters / 19 Tons',
      tag: language === 'ar' ? 'الأكثر طلباً للفلل والمنازل' : 'Most Popular • Residential Standard',
      popular: true,
      desc: language === 'ar'
        ? 'السعة المثالية لخزانات الفلل السكنية الأرضية والعلوية، يوفر التوازن المثالي بين الكمية وسهولة الوصول.'
        : 'The industry standard for residential villas, compounding optimal capacity with robust pumping to fully replenish ground tanks.',
      specs: [
        { label: language === 'ar' ? 'سعة الخزان:' : 'Tank Volume:', val: '19,000 Liters' },
        { label: language === 'ar' ? 'طول الخرطوم:' : 'Hose Length:', val: '40 - 50 Meters' },
        { label: language === 'ar' ? 'سرعة التفريغ:' : 'Pump Rate:', val: '1,800 L/min (~11 mins)' },
        { label: language === 'ar' ? 'مطابقة الجودة:' : 'Quality Grade:', val: language === 'ar' ? 'مياه شرب نقية محلاة' : 'Purified Drinking Water' }
      ]
    },
    {
      id: 'tanker-32t',
      name: language === 'ar' ? 'صهريج 32 طن (سعة كبرى للمشاريع)' : '32-Ton Heavy Commercial Tanker',
      capacity: '32,000 Liters / 32 Tons',
      tag: language === 'ar' ? 'للمشاريع والمجمعات والخزانات الكبرى' : 'Commercial & Heavy Projects',
      desc: language === 'ar'
        ? 'شاحنات نقل مياه ثقيلة مخصصة للمجمعات السكنية، الفنادق، مواقع الإنشاءات، والخزانات المركزية.'
        : 'Heavy-duty transport tankers designed for commercial compounds, hotels, construction sites, and bulk emergency reserves.',
      specs: [
        { label: language === 'ar' ? 'سعة الخزان:' : 'Tank Volume:', val: '32,000 Liters' },
        { label: language === 'ar' ? 'طول الخرطوم:' : 'Hose Length:', val: '50 Meters High Pressure' },
        { label: language === 'ar' ? 'سرعة التفريغ:' : 'Pump Rate:', val: '2,400 L/min (~14 mins)' },
        { label: language === 'ar' ? 'مطابقة الجودة:' : 'Quality Grade:', val: language === 'ar' ? 'مياه نقية معتمدة' : 'Certified Bulk Potable' }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'أسطول صهاريج المياه وسعاتها | صهاريج نبع' : 'Tanker Fleet & Equipment Specifications | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'مواصفات وسعات أسطول صهاريج نبع: صهاريج 10 طن و19 طن و32 طن معتمدة لمياه الشرب ومجهزة بمضخات ضغط وخراطيم حتى 50 متراً.'
            : 'Explore The Nabaa tanker fleet specifications: 10T, 19T, and 32T calibrated potable water tankers with food-grade sanitary tanks and booster pumps.'
        }
        canonicalPath={language === 'ar' ? '/ar/how-it-works/tanker' : '/how-it-works/tanker'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works', path: language === 'ar' ? '/ar/how-it-works' : '/how-it-works' },
          { name: language === 'ar' ? 'أسطول الصهاريج' : 'Tanker Fleet', path: language === 'ar' ? '/ar/how-it-works/tanker' : '/how-it-works/tanker' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Droplets className="w-4 h-4" />
            <span>{language === 'ar' ? 'المواصفات الميدانية للأسطول' : 'Fleet Specifications & Capabilities'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'أسطول صهاريج مياه الشرب' : 'The Nabaa Tanker Fleet'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'تلتزم صهاريج نبع بتشغيل صهاريج مطابقة لأعلى المعايير الصحية ومعايير جودة مياه الشرب، مجهزة بمضخات عالية الكفاءة وخراطيم ممتدة للوصول إلى كافة الخزانات.'
              : 'The Nabaa operates sanitary, food-grade water tankers equipped with high-performance booster pumps and extended reach hoses for all types of storage tanks.'}
          </p>
        </div>

        {/* CLARIFICATION CALLOUT (Explicitly required in brief) */}
        <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3.5 text-xs text-slate-300 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-white">
              {language === 'ar' ? 'ملاحظة تشغيلية هامة:' : 'Operational Architecture Note:'}{' '}
            </span>
            {language === 'ar'
              ? 'تتم إدارة عمليات الصهاريج (التوجيه، قبول الطلبات، ومتابعة التفريغ) مباشرة من خلال تطبيق السائق ونظام العمليات المركزي في نبع، وليس عبر تطبيق منفصل خاص بالصهريج.'
              : 'All tanker dispatch, capacity matching, customer routing, and delivery confirmations are handled directly through the unified Driver Application and central operations, rather than a separate tanker app.'}
          </div>
        </div>

        {/* Tanker Specifications Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tankers.map((t) => (
            <div
              key={t.id}
              className={`p-7 rounded-3xl bg-[#09152b] border flex flex-col justify-between relative transition-all ${
                t.popular 
                  ? 'border-cyan-500 shadow-xl shadow-cyan-500/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-wider">
                  {language === 'ar' ? 'الأكثر طلباً للفلل' : 'Most Popular'}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 font-bold">{t.capacity}</span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs font-display">
                    {t.id.includes('10') ? '10T' : t.id.includes('19') ? '19T' : '32T'}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display">{t.name}</h3>
                  <div className="text-[11px] text-cyan-300 font-mono mt-1">{t.tag}</div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {t.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  {t.specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-400">{s.label}</span>
                      <span className="text-slate-200 font-mono font-medium">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onOpenOrderModal(t.id)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    t.popular
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? `طلب صهريج ${t.capacity.split('/')[0]}` : `Order ${t.capacity.split('/')[0]}`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quality, Sanitation & Pumping Standards */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              {language === 'ar' ? 'معايير الصحة والسلامة' : 'Hygiene & Technical Protocols'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {language === 'ar' ? 'مواصفات تضمن وصول المياه نقية وصالحة للشرب' : 'Sanitary Protocols & Technical Delivery'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white text-sm font-display">
                {language === 'ar' ? 'خزانات صهاريج معقمة' : 'Sanitized Food-Grade Tanks'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'صهاريج مكسوة بمواد آمنة مخصصة لنقل مياه الشرب، تخضع للغسيل والتعقيم الدوري وفق الاشتراطات الصحية.'
                  : 'Inspected stainless and food-grade coated tanks sterilized regularly to preserve absolute purity.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <Gauge className="w-6 h-6 text-cyan-400" />
              <h4 className="font-bold text-white text-sm font-display">
                {language === 'ar' ? 'مضخات ضغط عالي' : 'High-Pressure Booster Pumps'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'مضخات حديثة تتيح تفريغ الصهريج في وقت قياسي يتراوح بين 8 إلى 15 دقيقة مع الحفاظ على سلامة الخزان.'
                  : 'Rapid pumping units capable of discharging entire payloads in 8-15 minutes safely.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <Scale className="w-6 h-6 text-sky-400" />
              <h4 className="font-bold text-white text-sm font-display">
                {language === 'ar' ? 'سعات وحمولات معايرة' : 'Calibrated Liquid Payloads'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'نضمن استلامك للكمية الكاملة المطلوبة دون نقص بفضل تعبئة الصهاريج من محطات الضخ الرسمية المعتمدة.'
                  : 'Full volume assurance filled strictly from verified municipal water distribution stations.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
              <Clock className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-white text-sm font-display">
                {language === 'ar' ? 'خراطيم بطول حتى 50م' : 'Extended 30 - 50m Hoses'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'خراطيم صحية ممتدة تصل بسهولة إلى الخزانات الخلفية والحدائق ومداخل الفلل العميقة.'
                  : 'Flexible food-grade delivery hoses reaching deep villa courtyards, ground valves, and rooftop shafts.'}
              </p>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            {language === 'ar' ? 'حدد سعة الصهريج المناسبة واطلب الآن' : 'Select Your Tanker & Order Now'}
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            {language === 'ar'
              ? 'تصلك صهاريج نبع أينما كنت في الرياض مع خيارات الدفع الإلكتروني والتتبع المباشر.'
              : 'The Nabaa delivers clean potable water to your exact address with live tracking and verified quality.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenOrderModal('tanker-19t')}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'اطلب صهريج 19 طن القياسي' : 'Order Standard 19T Tanker'}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
