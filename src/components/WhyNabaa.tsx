import React from 'react';
import { Zap, ShieldCheck, Layers, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyNabaa: React.FC = () => {
  const { t, isRTL, language } = useLanguage();

  const values = language === 'ar' ? [
    {
      icon: Zap,
      title: 'طلب فوري ومجدول',
      desc: 'اطلب فوراً عند نفاد المياه المفاجئ، أو جدول مواعيد مسبقة تناسب أوقات تواجدك بكل سهولة.',
      tag: 'فوري ومجدول مسبقاً'
    },
    {
      icon: ShieldCheck,
      title: 'تسعير واضح وعادل',
      desc: 'أسعار واضحة ومحددة مسبقاً بالريال السعودي بحسب حمولة الصهريج دون مساومة أو مفاجآت.',
      tag: 'شفافية مالية تامة'
    },
    {
      icon: Layers,
      title: 'منظومة رقمية مترابطة',
      desc: 'ربط لحظي ومتزامن بين طالبي المياه، أسطول الصهاريج، وغرفة التحكم المركزية.',
      tag: 'إدارة تشغيلية متكاملة'
    },
    {
      icon: Eye,
      title: 'وضوح وتتبع دقيق',
      desc: 'رؤية كاملة لموقع الصهريج، تقييمات السائق، مسار الطريق، وسرعة ضخ المياه في خزانك.',
      tag: 'تحكم ورقابة شاملة'
    }
  ] : [
    {
      icon: Zap,
      title: 'Fast Ordering',
      desc: 'Order immediately for urgent replenishment or schedule days ahead with automated arrival windows.',
      tag: 'On-Demand & Scheduled'
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Pricing',
      desc: 'Clear upfront pricing in SAR based on verified vehicle tonnage, without surprise surge fees or negotiation.',
      tag: 'Zero Ambiguity'
    },
    {
      icon: Layers,
      title: 'Connected Operations',
      desc: 'Customers, drivers, tankers, and dispatch administrators collaborate seamlessly through synchronized software.',
      tag: 'Full Ecosystem'
    },
    {
      icon: Eye,
      title: 'Operational Visibility',
      desc: 'Monitor real-time tanker GPS coordinates, pump offloading status, driver ratings, and fleet health at a glance.',
      tag: 'Total Control'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-[#060c18] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'مزايا منصة نبع' : 'Platform Advantages'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {language === 'ar' ? 'لماذا تختار منصة نبع؟' : 'Why Choose The Nabaa'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'إنهاء عشوائية الاتصالات الهاتفية والانتظار الطويل، واستبدالها بحلول لوجستية ذكية وموثوقة لتوريد المياه.'
              : 'Eliminating fragmented phone dispatch and replacing it with dependable, digitally orchestrated water logistics.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#09162c] to-[#070f1f] border border-slate-800 hover:border-cyan-500/40 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider block mb-1">
                    {val.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white font-display mb-2">{val.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{language === 'ar' ? 'معايير نبع المعتمدة' : 'The Nabaa Standard'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
