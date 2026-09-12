import React, { useState } from 'react';
import { MapPin, Phone, Truck, Compass, MessageCircle } from 'lucide-react';
import { DEMO_DRIVER } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export const LiveTrackingSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'searching' | 'driver_found' | 'en_route' | 'arrived' | 'delivered'>('en_route');
  const { t, isRTL, language } = useLanguage();

  const stages = language === 'ar' ? [
    { id: 'searching', label: 'جارٍ البحث' },
    { id: 'driver_found', label: 'تم العثور على سائق' },
    { id: 'en_route', label: 'في الطريق إليك' },
    { id: 'arrived', label: 'وصل الموقع' },
    { id: 'delivered', label: 'تم التفريغ بنجاح' }
  ] : [
    { id: 'searching', label: 'Searching' },
    { id: 'driver_found', label: 'Driver Found' },
    { id: 'en_route', label: 'On the Way' },
    { id: 'arrived', label: 'Arrived' },
    { id: 'delivered', label: 'Delivered' }
  ];

  const milestonesList = language === 'ar' ? [
    { id: 'searching', title: 'مسح الصهاريج في النطاق القريب', time: '11:40 ص', done: true },
    { id: 'driver_found', title: 'تم توجيه السائق (صهريج #402 طارق)', time: '11:41 ص', done: true },
    { id: 'en_route', title: 'الصهريج في الطريق (متبقي 2.1 كم)', time: '11:43 ص', done: activeStage === 'en_route' || activeStage === 'arrived' || activeStage === 'delivered' },
    { id: 'arrived', title: 'وصول الصهريج أمام بوابة الفيلا', time: '11:49 ص', done: activeStage === 'arrived' || activeStage === 'delivered' },
    { id: 'delivered', title: 'توصيل الخرطوم واكتمال التفريغ', time: '11:58 ص', done: activeStage === 'delivered' }
  ] : [
    { id: 'searching', title: 'Searching Nearby Tankers', time: '11:40 AM', done: true },
    { id: 'driver_found', title: 'Driver Found (#402 Tariq)', time: '11:41 AM', done: true },
    { id: 'en_route', title: 'On the Way (2.1 km left)', time: '11:43 AM', done: activeStage === 'en_route' || activeStage === 'arrived' || activeStage === 'delivered' },
    { id: 'arrived', title: 'Arrived at Gate / Location', time: '11:49 AM', done: activeStage === 'arrived' || activeStage === 'delivered' },
    { id: 'delivered', title: 'Water Offloaded & Verified', time: '11:58 AM', done: activeStage === 'delivered' }
  ];

  return (
    <section id="doorstep-tracking" className="py-20 lg:py-28 relative bg-[#070e1c] border-y border-slate-800/80 overflow-hidden scroll-mt-20">
      <div id="tracking" className="scroll-mt-20"></div>
      <div id="overview" className="scroll-mt-20"></div>
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'التتبع الحي الفوري للأسطول' : 'Real-Time Fleet Telemetry'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {language === 'ar' ? 'من لحظة الطلب وحتى باب منزلك' : 'From Order to Doorstep'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'تمنحك تقنية GPS المباشرة شفافية تامة في كل خطوة. تابع حركة صهريج المياه على الخريطة مباشرة، وتعرف على وقت الوصول الدقيق، وتلق تنبيهات عند وصول السائق.'
              : 'Live GPS telemetry provides end-to-end transparency. Customers can track their incoming tanker, observe route navigation, and receive arrival alerts.'}
          </p>

          {/* Interactive Milestone Controller */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {stages.map((stg) => (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeStage === stg.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {stg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Realistic Interactive Map & Delivery Telemetry Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: GPS Simulation Map Graphic */}
          <div className="lg:col-span-7 bg-[#09152b] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden aspect-[16/10] flex flex-col justify-between">
            
            {/* Map Grid / Dark Mode Cartography aesthetic */}
            <div className="absolute inset-0 bg-[#071120] opacity-90">
              <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="20%" x2="100%" y2="25%" stroke="#1e293b" strokeWidth="12" />
                <line x1="20%" y1="0" x2="35%" y2="100%" stroke="#1e293b" strokeWidth="10" />
                <line x1="10%" y1="90%" x2="90%" y2="15%" stroke="#1e293b" strokeWidth="14" />
                <line x1="60%" y1="0" x2="80%" y2="100%" stroke="#1e293b" strokeWidth="8" />

                <path
                  d="M 160 220 Q 280 180 340 120 T 480 90"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Top map status overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>{language === 'ar' ? 'تتبع مباشر: حي الملقا - الرياض' : 'GPS LIVE: AL-MALQA DISTRICT'}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-300" dir="ltr">
                SPEED: 42 KM/H
              </div>
            </div>

            {/* Tanker Marker on Map */}
            <div className="relative z-10 flex items-center justify-center my-auto">
              <div className="relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-400/50 animate-bounce">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold mt-2 shadow-lg">
                  {language === 'ar' ? 'صهريج #402 (19 طن)' : 'Tanker #402 (19T)'}
                </div>
              </div>
            </div>

            {/* Bottom: Destination Tag */}
            <div className="relative z-10 flex items-center justify-between bg-slate-950/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">{language === 'ar' ? 'الوجهة المحددة' : 'Destination'}</div>
                  <div className="text-xs font-bold text-white">
                    {language === 'ar' ? 'فيلا 14، خزان أرضي رئيسي' : 'Villa 14, Ground Tank Inlet'}
                  </div>
                </div>
              </div>
              <div className={isRTL ? 'text-left' : 'text-right'}>
                <div className="text-[10px] text-slate-400">{language === 'ar' ? 'المتبقي للوصول' : 'Remaining'}</div>
                <div className="text-xs font-mono font-bold text-cyan-400" dir="ltr">2.1 km • 5 mins</div>
              </div>
            </div>

          </div>

          {/* Right: Driver Card & Milestone Tracker */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Driver Profile Card */}
            <div className="bg-gradient-to-b from-[#0a1832] to-[#071124] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-lg">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300 font-display font-extrabold text-xl">
                      {language === 'ar' ? 'ط.م' : 'TA'}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {language === 'ar' ? 'طارق المنصور' : DEMO_DRIVER.name}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span className="text-cyan-400 font-semibold">{DEMO_DRIVER.tankerNumber}</span>
                      <span>•</span>
                      <span>{language === 'ar' ? 'سعة 19 طن' : DEMO_DRIVER.tankerCapacity}</span>
                      <span>•</span>
                      <span className="text-amber-400" dir="ltr">★ {DEMO_DRIVER.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/923330717198?text=Hello%20Driver%20Tariq%20Al-Mansoor,%20I%20am%20tracking%20my%20Nabaa%20Tanker%20delivery..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/40 shadow-lg shadow-emerald-500/20 font-bold transition-all active:scale-95 cursor-pointer"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>

                  <a
                    href="tel:+966530434010"
                    className="p-3 rounded-2xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 font-bold transition-all active:scale-95 cursor-pointer"
                    title="Call Driver"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Status Milestone Timeline */}
              <div className="space-y-4">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {language === 'ar' ? 'مراحل التوصيل في الوقت الفعلي' : 'Live Delivery Milestones'}
                </div>

                <div className="space-y-3">
                  {milestonesList.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          m.done ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {m.done ? '✓' : idx + 1}
                        </div>
                        <span className={m.done ? 'text-white font-medium' : 'text-slate-500'}>{m.title}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{m.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
                {language === 'ar'
                  ? '* سجل تجريبي: طارق المنصور (#402) هو ملف تعريفي يوضح تجربة تتبع بيانات السائق وسرعة التحرك.'
                  : '* Demonstration record: Tariq Al-Mansoor (#402) is a fictional profile showcasing driver identification and tracking capabilities.'}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
