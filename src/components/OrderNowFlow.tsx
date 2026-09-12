import React, { useState, useEffect } from 'react';
import { Truck, Navigation, CheckCircle2, RotateCcw, Zap, MessageCircle, Phone } from 'lucide-react';
import { DEMO_DRIVER } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface OrderNowFlowProps {
  onStartOrder?: () => void;
}

export const OrderNowFlow: React.FC<OrderNowFlowProps> = ({ onStartOrder }) => {
  const [simulationState, setSimulationState] = useState<'idle' | 'searching' | 'driver_found' | 'en_route'>('searching');
  const [searchTimer, setSearchTimer] = useState<number>(3);
  const { t, isRTL, language } = useLanguage();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (simulationState === 'searching') {
      interval = setInterval(() => {
        setSearchTimer((prev) => {
          if (prev <= 1) {
            setSimulationState('driver_found');
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simulationState]);

  const resetSimulation = () => {
    setSimulationState('searching');
    setSearchTimer(3);
  };

  const stepsList = language === 'ar' ? [
    { step: '1', title: 'تحديد العنوان ونوع الخزان', desc: 'خزان أرضي، علوي، أو حوض مائي.' },
    { step: '2', title: 'اختيار سعة الصهريج', desc: '10 طن، 19 طن، أو مقطورة 32 طن.' },
    { step: '3', title: 'الضغط على "اطلب الآن"', desc: 'توجيه فوري لأقرب صهريج بالمنطقة.' },
    { step: '4', title: 'اختيار وسيلة الدفع', desc: 'مدى، أبل باي، بطاقات، أو كاش.' },
    { step: '5', title: 'مراجعة تفاصيل التكلفة', desc: 'شامل الضريبة والخصومات التلقائية.' },
    { step: '6', title: 'النظام يفحص الصهاريج القريبة', desc: 'خوارزمية تحديد النطاق الجغرافي الحي.' },
    { step: '7', title: 'قبول السائق في التطبيق', desc: 'تأكيد فوري لبيانات السائق ورقم الصهريج.' },
    { step: '8', title: 'تفعيل مسار التوصيل', desc: 'بدء تتبع حركة الشاحنة عبر GPS.' },
    { step: '9', title: 'متابعة الوصول والتفريغ', desc: 'وقت وصول دقيق، توصيل الخرطوم، والانتهاء.' }
  ] : [
    { step: '1', title: 'Selects address & tank inlet', desc: 'Rooftop, ground, or commercial basin.' },
    { step: '2', title: 'Selects tanker capacity', desc: '10T, 19T, or 32T vehicle class.' },
    { step: '3', title: 'Chooses "Order Now"', desc: 'Immediate prioritized dispatch queue.' },
    { step: '4', title: 'Selects payment method', desc: 'Mada, Apple Pay, card, or cash on delivery.' },
    { step: '5', title: 'Reviews order breakdown', desc: 'Taxes, automatic discounts, and final total.' },
    { step: '6', title: 'System searches nearby tankers', desc: 'Geofence radius proximity matching.' },
    { step: '7', title: 'Driver accepts in app', desc: 'Confirmed vehicle identity and driver details.' },
    { step: '8', title: 'Order becomes active', desc: 'Live GPS route tracking initiated.' },
    { step: '9', title: 'Customer tracks delivery', desc: 'Real-time ETA, pump connection, completion.' }
  ];

  return (
    <section id="order-flow" className="py-20 lg:py-28 relative bg-[#07101f] border-t border-slate-800/80 scroll-mt-20">
      <div id="order-now-section" className="scroll-mt-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'ar' ? 'محرك التوجيه الفوري للصهاريج' : 'On-Demand Dispatch Engine'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {language === 'ar' ? 'تحتاج ماء على وجه السرعة؟' : 'Need Water Now?'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'عند انخفاض منسوب الخزان، تقوم خوارزمية نبع الذكية بمسح صهاريج المياه النشطة القريبة فوراً، وحساب أقصر مسار وصول، وتوجيه الصهريج في ثوانٍ معدودة.'
              : 'When urgent water replenishment is required, our intelligent dispatch algorithm scans nearby active tankers, calculates optimal transit routes, and pairs the request in seconds.'}
          </p>
        </div>

        {/* Interactive Order Flow & Live Radar Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 9-Step Delivery Progression */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-lg font-bold text-white font-display flex items-center justify-between mb-4">
              <span>{language === 'ar' ? 'مراحل الطلب الفوري المباشر' : 'Immediate Order Lifecycle'}</span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                {language === 'ar' ? 'توجيه آلي ذكي' : 'Automated Dispatch'}
              </span>
            </h3>

            <div className="space-y-2">
              {stepsList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Interactive Radar & Driver Found UI Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-b from-[#091730] to-[#060e1d] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              {/* Reset/Trigger Button */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>{language === 'ar' ? 'محاكي التوجيه الميداني' : 'DISPATCH SIMULATOR'}</span>
                </div>
                <button
                  onClick={resetSimulation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إعادة تشغيل المحاكاة' : 'Replay Dispatch'}</span>
                </button>
              </div>

              {/* State 1: Animated Radar Scanning */}
              {simulationState === 'searching' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                  {/* Radar Circles with Rotating Beam */}
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-cyan-500/20 bg-slate-950/80 flex items-center justify-center overflow-hidden">
                    <div className="absolute w-36 h-36 rounded-full border border-cyan-500/30"></div>
                    <div className="absolute w-20 h-20 rounded-full border border-cyan-500/40"></div>
                    
                    <div className="absolute inset-0 animate-radar-sweep origin-center pointer-events-none">
                      <div className="w-1/2 h-1/2 bg-gradient-to-tr from-cyan-400/30 to-transparent"></div>
                    </div>

                    <div className="absolute top-12 right-14 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80 animate-ping"></div>
                    <div className="absolute top-12 right-14 w-3 h-3 rounded-full bg-cyan-300"></div>

                    <Truck className="w-8 h-8 text-cyan-400 relative z-10 animate-bounce" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white font-display">
                      {language === 'ar' ? 'جارٍ مسح الصهاريج القريبة في نطاقك...' : 'Searching for nearby tankers...'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'ar'
                        ? `البحث عن أقرب صهريج 19 طن في نطاق 5 كم (${searchTimer} ثوانٍ)`
                        : `Querying nearest 19T vehicles within 5 km radius (${searchTimer}s)`}
                    </p>
                  </div>
                </div>
              )}

              {/* State 2 & 3: Driver Found & Active Match Card */}
              {(simulationState === 'driver_found' || simulationState === 'en_route') && (
                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                  {/* Success notification banner */}
                  <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {language === 'ar' ? 'تم العثور على أقرب صهريج وتأكيد الطلب' : 'Driver Found & Assigned'}
                        </div>
                        <div className="text-[11px] text-emerald-300">
                          {language === 'ar' ? 'صهريج رقم #402 قبل طلب التوصيل' : 'Tanker #402 accepted delivery request'}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800" dir="ltr">
                      ETA 6 MIN
                    </span>
                  </div>

                  {/* Driver Profile Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-lg font-display">
                          {language === 'ar' ? 'ط.م' : 'TA'}
                        </div>
                        <div>
                          <div className="text-base font-bold text-white font-display">
                            {language === 'ar' ? 'طارق المنصور' : DEMO_DRIVER.name}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <span className="text-cyan-400 font-semibold">{DEMO_DRIVER.tankerNumber}</span>
                            <span>•</span>
                            <span>{language === 'ar' ? 'سعة 19 طن' : DEMO_DRIVER.tankerCapacity}</span>
                            <span>•</span>
                            <span className="text-amber-400" dir="ltr">★ {DEMO_DRIVER.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href="https://wa.me/923330717198?text=Hello%20Driver%20Tariq%20Al-Mansoor,%20regarding%20my%20Nabaa%20Tanker%20water%20delivery..."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a
                          href="tel:+966530434010"
                          className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                          title="Call"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Delivery Route Progress bar */}
                    <div className="pt-2 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span className="flex items-center gap-1 text-cyan-400">
                          <Navigation className="w-3.5 h-3.5 animate-pulse" />
                          {language === 'ar' ? 'في الطريق إلى فيلا حي الملقا' : 'En Route to Al-Malqa Villa'}
                        </span>
                        <span className="font-mono text-white" dir="ltr">2.4 km distance</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 text-center">
                    {language === 'ar'
                      ? '* أسماء السائقين وأرقام الشاحنات وأوقات الوصول معروضة للمحاكاة وتوضيح تجربة التطبيق.'
                      : '* Names, tanker numbers, and ETAs are demonstration data illustrating the real-time matching experience.'}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
