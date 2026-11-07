import React from 'react';
import { ArrowRight, Droplets, Radio, Truck, Calendar, Phone, MessageCircle, MapPin, Navigation, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HeroMediaCard } from './HeroMediaCard';

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

          {/* Right Column: Hero Visual with Dual-Mode Toggle (Video Animation + Live Radar Card) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <HeroMediaCard 
              onOpenOrderModal={onOpenOrderModal} 
              onOpenAdminPortal={onOpenDemoModal} 
            />
          </div>

        </div>
      </div>
    </section>
  );
};
