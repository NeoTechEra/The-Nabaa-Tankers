import React from 'react';
import { Smartphone, Server, Truck, CheckCircle2, ShieldCheck, Droplets, Navigation, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeliveryWorkflow: React.FC = () => {
  const { t, isRTL, language } = useLanguage();

  const steps = language === 'ar' ? [
    {
      actor: 'العميل',
      action: 'إرسال طلب صهريج المياه',
      desc: 'يحدد سعة الصهريج، طول الخرطوم المطلوب وموقع الخزان على الخريطة.',
      icon: Smartphone,
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
    },
    {
      actor: 'منصة نبع',
      action: 'التحقق والمطابقة اللوجستية',
      desc: 'فحص توفر المياه، مراجعة تصاريح الأشياب وتفعيل النطاق الجغرافي للمنطقة.',
      icon: Server,
      color: 'border-blue-500/40 text-blue-300 bg-blue-950/40'
    },
    {
      actor: 'منصة نبع',
      action: 'تحديد وتوجيه أقرب صهريج متاح',
      desc: 'حساب أقرب صهريج نشط متوافق مع متطلبات الخرطوم والسعة المطلوبة.',
      icon: RefreshCw,
      color: 'border-blue-500/40 text-blue-300 bg-blue-950/40'
    },
    {
      actor: 'السائق',
      action: 'استلام تنبيه الطلب',
      desc: 'وصول إشعار صوتي فوري في تطبيق السائق يوضح الوجهة والمسافة والأرباح.',
      icon: Truck,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'السائق',
      action: 'قبول مهمة التوصيل',
      desc: 'تأكيد الحجز وتثبيت مسار الرحلة والتحول لحالة القيادة على الطريق.',
      icon: CheckCircle2,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'السائق',
      action: 'الانطلاق الملاحي نحو العميل',
      desc: 'اتباع خرائط GPS المخصصة لمركبات النقل الثقيل متجنباً الشوارع المحظورة.',
      icon: Navigation,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'السائق',
      action: 'الوصول لموقع خزان العميل',
      desc: 'تسجيل الوصول عبر التطبيق والتحقق من فتحات ومحبس الخزان الأرضي أو العلوي.',
      icon: Truck,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'السائق',
      action: 'تشغيل المضخة وتفريغ المياه',
      desc: 'ضخ المياه الصالحة للشرب بمعدل 1,200 لتر/دقيقة وتوثيق اكتمال الكمية.',
      icon: Droplets,
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
    },
    {
      actor: 'العميل',
      action: 'استلام وتأكيد التعبئة',
      desc: 'فحص امتلاء الخزان، تأكيد الاستلام عبر التطبيق وتقييم تجربة السائق.',
      icon: CheckCircle2,
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
    },
    {
      actor: 'الإدارة',
      action: 'أرشفة العملية والتسوية المالية',
      desc: 'تسجيل قياسات التوصيل في السجل المركزي، وتحويل مستحقات السائق لمحفظته الرقمية.',
      icon: ShieldCheck,
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
    }
  ] : [
    {
      actor: 'CUSTOMER',
      action: 'Places Order',
      desc: 'Selects tanker capacity, specifies hose reach, and confirms address.',
      icon: Smartphone,
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
    },
    {
      actor: 'NABAA PLATFORM',
      action: 'Validates Order',
      desc: 'Checks inventory, verifies payment authorization, and activates geofencing.',
      icon: Server,
      color: 'border-blue-500/40 text-blue-300 bg-blue-950/40'
    },
    {
      actor: 'NABAA PLATFORM',
      action: 'Finds Available Tanker / Driver',
      desc: 'Calculates nearest active 10T, 19T, or 32T vehicle with required hose specs.',
      icon: RefreshCw,
      color: 'border-blue-500/40 text-blue-300 bg-blue-950/40'
    },
    {
      actor: 'DRIVER',
      action: 'Receives Request',
      desc: 'Receives audible dispatch ping with destination, distance, and earnings.',
      icon: Truck,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'DRIVER',
      action: 'Accepts Order',
      desc: 'Locks dispatch assignment and transitions vehicle to active road mode.',
      icon: CheckCircle2,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'DRIVER',
      action: 'Navigates to Customer',
      desc: 'Follows heavy vehicle optimized GPS route avoiding restricted streets.',
      icon: Navigation,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'DRIVER',
      action: 'Arrives at Location',
      desc: 'Checks in via Driver App and verifies tank inlet valve compatibility.',
      icon: Truck,
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40'
    },
    {
      actor: 'DRIVER',
      action: 'Delivers Water',
      desc: 'Powers 1,200 L/min pump, offloads potable water, and records flow completion.',
      icon: Droplets,
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
    },
    {
      actor: 'CUSTOMER',
      action: 'Receives Delivery',
      desc: 'Inspects water replenishment, verifies receipt, and rates the driver.',
      icon: CheckCircle2,
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
    },
    {
      actor: 'ADMIN',
      action: 'Monitors & Records Operation',
      desc: 'Central ledger archives delivery metrics, disburses driver wallet commission, and logs tank history.',
      icon: ShieldCheck,
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-[#060c18] overflow-hidden">
      
      {/* Ambient background particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{language === 'ar' ? 'دورة التوريد التشغيلية الشاملة' : 'End-to-End Operational Lifecycle'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {language === 'ar' ? 'رحلة التوصيل المتكاملة' : 'The Complete Delivery Journey'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'من نقرة الطلب الأولى على تطبيق الهاتف إلى توجيه الصهريج، العبور السريع، الضخ عالي الكفاءة، وحتى التأكيد والتسوية الآلية.'
              : 'From the initial mobile request to tanker dispatch, highway transit, high-pressure pumping, and automated settlement.'}
          </p>
        </div>

        {/* Visual Animated Flow Line & Sequence */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Connecting Line */}
          <div className={`absolute ${isRTL ? 'right-6 sm:right-1/2 translate-x-1/2' : 'left-6 sm:left-1/2 -translate-x-1/2'} top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-emerald-500 opacity-30 rounded-full`}></div>

          <div className="space-y-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full sm:w-[calc(50%-2rem)] ${isRTL ? 'pr-12 sm:pr-0' : 'pl-12 sm:pl-0'} ${
                    isEven 
                      ? (isRTL ? 'sm:text-left' : 'sm:text-right') 
                      : (isRTL ? 'sm:text-right' : 'sm:text-left')
                  }`}>
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-lg backdrop-blur-md">
                      <div className={`flex items-center gap-2 mb-1 ${isEven ? (isRTL ? 'sm:justify-start' : 'sm:justify-end') : (isRTL ? 'sm:justify-end' : 'sm:justify-start')}`}>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 font-bold">
                          {step.actor}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display">{step.action}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className={`absolute ${isRTL ? 'right-6 sm:right-1/2 translate-x-1/2' : 'left-6 sm:left-1/2 -translate-x-1/2'} w-10 h-10 rounded-xl bg-[#09152b] border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/20 flex items-center justify-center z-10`}>
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>

                  {/* Spacer for desktop layout balance */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]"></div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
