import React, { useState } from 'react';
import { User, MapPin, History, Calendar, Gift, Tag, CreditCard, Settings, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CustomerAccountMockup: React.FC = () => {
  const [activeAccountTab, setActiveAccountTab] = useState<'profile' | 'addresses' | 'history' | 'scheduled'>('profile');
  const { t, isRTL, language } = useLanguage();

  return (
    <section className="py-20 lg:py-24 relative bg-[#060c18] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'بوابة العميل الرقمية' : 'Customer Portal'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {language === 'ar' ? 'إدارة شاملة لحساب العميل وخزاناته' : 'Complete Customer Account Management'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'كل ما تحتاجه في مكان واحد: إدارة مواقع الخزانات المحفوظة، سجل الطلبات السابقة، الجدولة الدورية، ووسائل الدفع المفضلة.'
              : 'Everything in one touchpoint. Manage saved tank locations, past deliveries, recurring schedules, and payment preferences.'}
          </p>
        </div>

        {/* Realistic Mobile Application Account UI Mockup */}
        <div className="max-w-md mx-auto bg-[#071120] border-4 border-slate-800 rounded-[38px] p-5 shadow-2xl shadow-cyan-950/40 relative">
          
          {/* Top Notch */}
          <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-4"></div>

          {/* Profile Header Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/20 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-bold text-base font-display">
                {language === 'ar' ? 'س.غ' : 'SA'}
              </div>
              <div>
                <div className="text-sm font-bold text-white font-display">
                  {language === 'ar' ? 'سعود الغامدي' : 'Saud Al-Ghamdi'}
                </div>
                <div className="text-xs text-slate-400 font-mono" dir="ltr">+966 50 ••• 4567</div>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {language === 'ar' ? 'موثق' : 'Verified'}
            </span>
          </div>

          {/* Quick Account Navigation Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-xl mb-4 text-center">
            {[
              { id: 'profile', label: language === 'ar' ? 'الحساب' : 'Profile' },
              { id: 'addresses', label: language === 'ar' ? 'العناوين' : 'Addresses' },
              { id: 'history', label: language === 'ar' ? 'الطلبات' : 'Orders' },
              { id: 'scheduled', label: language === 'ar' ? 'المجدول' : 'Scheduled' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAccountTab(tab.id as any)}
                className={`py-1.5 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeAccountTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="space-y-3 min-h-[260px]">
            {activeAccountTab === 'profile' && (
              <div className="space-y-2 text-xs">
                {(language === 'ar' ? [
                  { icon: MapPin, label: 'العناوين المحفوظة ومواصفات الخزانات', meta: '3 مواقع' },
                  { icon: History, label: 'سجل الطلبات السابقة', meta: '12 طلب مكتمل' },
                  { icon: Calendar, label: 'الطلبات المجدولة القادمة', meta: '1 غداً' },
                  { icon: Gift, label: 'العروض الترويجية والخصومات', meta: '2 متاحة' },
                  { icon: Tag, label: 'أكواد الخصم النشطة', meta: 'WATERFAST مفعل' },
                  { icon: CreditCard, label: 'وسائل الدفع والبطاقات', meta: 'مدى •••• 9102' },
                  { icon: Settings, label: 'إعدادات الإشعارات والتطبيق', meta: 'مفعلة' }
                ] : [
                  { icon: MapPin, label: 'Saved Addresses & Tank Specs', meta: '3 Locations' },
                  { icon: History, label: 'Order History', meta: '12 completed' },
                  { icon: Calendar, label: 'Upcoming Scheduled Deliveries', meta: '1 Tomorrow' },
                  { icon: Gift, label: 'Offers & Promotions', meta: '2 Available' },
                  { icon: Tag, label: 'Promo Codes', meta: 'WATERFAST active' },
                  { icon: CreditCard, label: 'Payment Methods', meta: 'Mada •••• 9102' },
                  { icon: Settings, label: 'Application Settings', meta: 'Notifications On' }
                ]).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium text-slate-200">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span>{item.meta}</span>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeAccountTab === 'addresses' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white font-display">
                      {language === 'ar' ? 'فيلا الملقا (الرئيسي)' : 'Al-Malqa Villa (Primary)'}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {language === 'ar' ? 'أرضي + علوي' : 'Ground & Roof'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {language === 'ar' ? 'بوابة 2 • يحتاج خرطوم 40م' : 'Gate 2 • 40m hose connection required'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white font-display">
                      {language === 'ar' ? 'مزرعة العمارية' : 'Al-Ammariyah Farm'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {language === 'ar' ? 'حوض زراعي' : 'Basin Tank'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {language === 'ar' ? 'قطعة 14 • يحتاج خرطوم 60م' : 'Plot 14 • 60m hose length'}
                  </p>
                </div>
              </div>
            )}

            {activeAccountTab === 'history' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex justify-between text-white font-bold mb-1">
                    <span>{language === 'ar' ? 'طلب #NB-9480' : 'Order #NB-9480'}</span>
                    <span className="text-cyan-400 font-mono" dir="ltr">120 SAR</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {language === 'ar' ? 'صهريج 10 طن • تم التوصيل اليوم' : '10T Small Tanker • Delivered Today'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between text-white font-bold mb-1">
                    <span>{language === 'ar' ? 'طلب #NB-8924' : 'Order #NB-8924'}</span>
                    <span className="text-cyan-400 font-mono" dir="ltr">200 SAR</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {language === 'ar' ? 'صهريج 19 طن • تم التوصيل الأسبوع الماضي' : '19T Medium Tanker • Delivered Last Week'}
                  </div>
                </div>
              </div>
            )}

            {activeAccountTab === 'scheduled' && (
              <div className="space-y-2 text-xs">
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                  <div className="flex justify-between text-white font-bold mb-1">
                    <span>{language === 'ar' ? 'موعد قادم: غداً، 10:00 ص' : 'Upcoming: Tomorrow, 10:00 AM'}</span>
                    <span className="text-cyan-400 font-mono" dir="ltr">200 SAR</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {language === 'ar' ? '19 طن (وسط) • فيلا الملقا' : '19 Tons (Medium) • Al-Malqa Villa'}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{language === 'ar' ? 'تم تأكيد التوجيه الآلي' : 'Auto-dispatch confirmed'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
            {language === 'ar' ? 'واجهة تجريبية لمحاكاة حساب العميل وتفضيلاته' : 'Sample customer account demonstration interface'}
          </div>

        </div>

      </div>
    </section>
  );
};
