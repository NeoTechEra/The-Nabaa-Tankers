import React, { useState } from 'react';
import { Smartphone, Shield, Truck, ArrowRight, CheckCircle2, Layers, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PlatformOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customer' | 'driver' | 'admin'>('customer');
  const { t, isRTL, language } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative bg-[#070e1c] border-y border-slate-800/80">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-slate-700">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.platformOverview.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {t.platformOverview.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.platformOverview.subtitle}
          </p>
        </div>

        {/* Central Visual Architecture Diagram */}
        <div className="bg-[#09152b]/90 border border-slate-700/80 rounded-3xl p-6 lg:p-10 mb-16 shadow-2xl backdrop-blur-xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>{isRTL ? 'تدفق البيانات المتصل في الوقت الفعلي' : 'Connected Real-Time Data Flow'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            
            {/* 1. Customer Node */}
            <div 
              onClick={() => setActiveTab('customer')}
              className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                activeTab === 'customer' 
                  ? 'bg-cyan-950/40 border-cyan-400/60 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/30' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-1 rounded border border-cyan-800">
                  {language === 'ar' ? 'تطبيق العميل' : 'iOS & Android'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-2">
                {t.platformOverview.roles.customer.title}
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {t.platformOverview.roles.customer.desc}
              </p>
              <div className="space-y-1.5 text-xs text-slate-400">
                {t.platformOverview.roles.customer.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Driver Node */}
            <div 
              onClick={() => setActiveTab('driver')}
              className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                activeTab === 'driver' 
                  ? 'bg-blue-950/40 border-blue-400/60 shadow-lg shadow-blue-500/15 ring-1 ring-blue-400/30' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-blue-300 bg-blue-950 px-2 py-1 rounded border border-blue-800">
                  {language === 'ar' ? 'أسطول السائقين' : 'Driver Fleet'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-2">
                {t.platformOverview.roles.driver.title}
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {t.platformOverview.roles.driver.desc}
              </p>
              <div className="space-y-1.5 text-xs text-slate-400">
                {t.platformOverview.roles.driver.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Admin Operations Hub */}
            <div 
              onClick={() => setActiveTab('admin')}
              className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                activeTab === 'admin' 
                  ? 'bg-sky-950/40 border-sky-400/60 shadow-lg shadow-sky-500/15 ring-1 ring-sky-400/30' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                  {language === 'ar' ? 'المركز الإداري' : 'Central Web Hub'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-2">
                {t.platformOverview.roles.admin.title}
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {t.platformOverview.roles.admin.desc}
              </p>
              <div className="space-y-1.5 text-xs text-slate-400">
                {t.platformOverview.roles.admin.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Workflow arrows visualization */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-800/80 text-cyan-300 border border-slate-700">
              {language === 'ar' ? 'طلب العميل' : 'Customer Request'}
            </span>
            <ArrowRight className={`w-4 h-4 text-cyan-500 hidden sm:inline ${isRTL ? 'rotate-180' : ''}`} />
            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              {language === 'ar' ? 'محرك توجيه نبع الذكي' : 'The Nabaa Dispatch Core'}
            </span>
            <ArrowRight className={`w-4 h-4 text-cyan-500 hidden sm:inline ${isRTL ? 'rotate-180' : ''}`} />
            <span className="px-3 py-1 rounded-full bg-slate-800/80 text-blue-300 border border-slate-700">
              {language === 'ar' ? 'تنفيذ وتوصيل السائق' : 'Driver Fulfilment'}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800">
              {language === 'ar' ? 'المتابعة التشغيلية للإدارة' : 'Admin Operational Oversight'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
