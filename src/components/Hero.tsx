import React from 'react';
import { ArrowRight, Droplets, Radio, Truck, Calendar, Phone, MessageCircle, MapPin, Navigation, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenOrderModal: () => void;
  onOpenDemoModal?: () => void;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal, onOpenDemoModal, onExploreClick }) => {
  const { t, isRTL, language } = useLanguage();

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Background ambient lighting and water flow glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1f3815_1px,transparent_1px),linear-gradient(to_bottom,#0f1f3815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Column: Headlines and Call to Actions */}
          <div className={`lg:col-span-6 space-y-6 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            {/* Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.brand.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.2]">
              {language === 'ar' ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                    نعيد تعريف
                  </span>{' '}
                  توصيل المياه
                </>
              ) : (
                <>
                  Water Delivery, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                    Reimagined.
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Copy */}
            <p className={`text-base sm:text-lg text-slate-300 max-w-xl mx-auto ${isRTL ? 'lg:mr-0 lg:ml-auto' : 'lg:ml-0 lg:mr-auto'} font-normal leading-relaxed`}>
              {t.hero.subheadline}
            </p>

            {/* Primary Action Buttons */}
            <div className={`pt-2 flex flex-col sm:flex-row items-center justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-start'} gap-3 flex-wrap`}>
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-xl shadow-cyan-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-order-now-btn"
              >
                <span>{t.hero.orderNowBtn}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>

              <button
                onClick={handleExplore}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-explore-btn"
              >
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{t.hero.exploreBtn}</span>
              </button>

              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/40"
                id="hero-book-demo-btn"
                title={t.hero.bookDemoBtn}
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.bookDemoBtn}</span>
              </button>
            </div>

            {/* Direct Phone & WhatsApp Instant Access Strip */}
            <div className={`pt-2 flex flex-wrap items-center justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-start'} gap-4 text-xs font-mono text-slate-300`}>
              <span className="text-slate-400 flex items-center gap-1.5 font-sans font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {isRTL ? 'حجز فوري ومباشر مع مركز التوجيه:' : 'Direct Inquiries & Fast Booking:'}
              </span>
              <a
                href="tel:+966530434010"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all font-semibold"
                id="hero-call-link"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+966 53 043 4010</span>
              </a>
              <a
                href="https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all font-semibold"
                id="hero-whatsapp-link"
                dir="ltr"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+92 333 0717198</span>
              </a>
            </div>

            {/* Platform Metrics Bar */}
            <div className={`pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div>
                <div className="text-2xl font-bold text-white font-display">
                  {language === 'ar' ? '10 – 32 طن' : '10T – 32T'}
                </div>
                <div className="text-xs text-slate-400">
                  {language === 'ar' ? 'سعات الصهاريج' : 'Tanker Capacity'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-display">
                  {language === 'ar' ? '18 دقيقة' : '< 18 min'}
                </div>
                <div className="text-xs text-slate-400">
                  {language === 'ar' ? 'متوسط سرعة الوصول' : 'Avg. Dispatch ETA'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-display">
                  {language === 'ar' ? '100% رقمي' : '100% SAR'}
                </div>
                <div className="text-xs text-slate-400">
                  {language === 'ar' ? 'تتبع ودفع إلكتروني' : 'Digital Tracking'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Connected UI Overlays & Tanker Graphic */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Animated Ambient Ring / Flow Effect */}
            <div className="relative w-full max-w-[540px] rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-slate-900/90 via-[#0a1529]/95 to-[#060e1d] border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 overflow-hidden backdrop-blur-xl flex flex-col justify-between gap-4">
              
              {/* Animated water waves visual */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute -bottom-10 left-0 right-0 h-40 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"></div>

              {/* Central Premium Tanker Silhouette / Visual Representation */}
              <div className="relative flex flex-col justify-between gap-4 z-10">
                
                {/* Top Telemetry Bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono font-medium text-emerald-400 uppercase">
                      {isRTL ? 'الأسطول متصل ونشط' : 'Live Fleet Active'}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isRTL ? 'تزامن لحظي #NB-9481' : 'Telemetry Sync #NB-9481'}</span>
                  </div>
                </div>

                {/* Telemetry Quick Info Strip - Non-overlapping cleanly structured HUD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Node 1: Driver Assignment & Tanker #402 */}
                  <div className="bg-[#09152b]/95 border border-cyan-500/30 rounded-xl p-2.5 shadow-md flex items-center gap-2.5 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase font-medium">
                        {isRTL ? 'السائق المعين' : 'Assigned Driver'}
                      </div>
                      <div className="text-xs font-bold text-cyan-300 truncate">
                        {isRTL ? 'الكابتن طارق • صهريج #402' : 'Tariq • Tanker #402'}
                      </div>
                    </div>
                  </div>

                  {/* Node 2: Customer Order */}
                  <div className="bg-[#09152b]/95 border border-blue-500/30 rounded-xl p-2.5 shadow-md flex items-center gap-2.5 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase font-medium">
                        {isRTL ? 'طلب العميل' : 'Customer Order'}
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {isRTL ? 'فيلا حي الملقا #14' : 'Al-Malqa Villa #14'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: Detailed Vector Tanker Graphic */}
                <div className="relative py-4 flex items-center justify-center">
                  <div className="absolute w-56 h-56 rounded-full border border-cyan-500/20 animate-ping opacity-20 pointer-events-none"></div>
                  <div className="absolute w-72 h-72 rounded-full border border-blue-500/10 pointer-events-none"></div>

                  <div className="relative w-full max-w-sm flex flex-col items-center group">
                    <div className="relative w-72 sm:w-80 h-36 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-3xl border border-cyan-400/30 p-4 shadow-xl flex items-center justify-between overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-cyan-600/40 to-blue-500/10 rounded-b-2xl border-t border-cyan-400/40">
                        <div className="w-full h-2 bg-cyan-400/30 blur-[2px] animate-pulse"></div>
                      </div>
                      
                      {/* Tanker Branding on barrel */}
                      <div className="relative z-10 flex flex-col">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-display font-bold text-sm tracking-wider">
                          <Droplets className="w-4 h-4 text-cyan-400" />
                          <span>{language === 'ar' ? 'نَبْع | THE NABAA' : 'THE NABAA'}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-300">
                          {language === 'ar' ? 'صهريج مياه نقية صالحة للشرب' : 'POTABLE WATER DISPATCH'}
                        </span>
                      </div>

                      <div className="relative z-10 text-right">
                        <span className="text-xl font-black font-display text-white">19T</span>
                        <div className="text-[10px] text-cyan-300 font-mono">
                          {language === 'ar' ? '19,000 لتر' : '19,000 LITERS'}
                        </div>
                      </div>
                    </div>

                    <div className="w-64 sm:w-72 h-3 bg-slate-900 rounded-sm mt-1 flex justify-between px-4"></div>
                    <div className="w-68 sm:w-76 flex justify-between px-6 -mt-2">
                      <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-slate-700 shadow-inner flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-slate-700 shadow-inner flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-slate-700 shadow-inner flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 3: Live ETA & Status (Bottom) */}
                <div className="bg-[#0b1b36]/90 border border-slate-700/80 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">
                        {isRTL ? 'حالة التوصيل' : 'Delivery Status'}
                      </div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {isRTL ? 'السائق في الطريق إلى موقع الخزان' : 'On the Way to Customer'}
                      </div>
                    </div>
                  </div>

                  <div className={`${isRTL ? 'text-left' : 'text-right'} shrink-0`}>
                    <div className="text-[11px] text-slate-400">
                      {isRTL ? 'الوقت المقدر' : 'Estimated Arrival'}
                    </div>
                    <div className="text-sm font-extrabold text-cyan-300 font-mono" dir="ltr">
                      {isRTL ? '6 دقائق (2.4 كم)' : '6 min (2.4 km)'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
