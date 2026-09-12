import React, { useState } from 'react';
import { Tag, Sparkles, Check, Gift } from 'lucide-react';
import { AUTO_PROMOTIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export const PromotionsSection: React.FC = () => {
  const [activePromoCode, setActivePromoCode] = useState<string>('WATERFAST');
  const [customInput, setCustomInput] = useState<string>('');
  const [selectedAutoPromo, setSelectedAutoPromo] = useState<string>('seasonal');
  const { t, isRTL, language } = useLanguage();

  const baseSubtotal = 200; // 19T tanker example
  
  // Calculate discounts
  let autoDiscount = 0;
  if (selectedAutoPromo === 'seasonal') {
    autoDiscount = Math.min(baseSubtotal * 0.15, 30);
  } else if (selectedAutoPromo === 'welcome') {
    autoDiscount = 25;
  }

  let codeDiscount = 0;
  if (activePromoCode === 'WATERFAST') {
    codeDiscount = 15;
  } else if (activePromoCode === 'SUMMER10') {
    codeDiscount = 10;
  }

  const finalTotal = Math.max(baseSubtotal - (autoDiscount > 0 ? autoDiscount : codeDiscount), 50);

  const applyCustomCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'WATERFAST' || formatted === 'SUMMER10') {
      setActivePromoCode(formatted);
      setSelectedAutoPromo('');
    }
  };

  return (
    <section id="promotions" className="py-20 lg:py-28 relative bg-[#070f20] border-t border-slate-800/80 scroll-mt-20">
      <div id="features" className="scroll-mt-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'ar' ? 'محرك الخصومات والعروض الذكي' : 'Smart Discount Engine'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {language === 'ar' ? 'أفضل طلبات المياه. أفضل العروض.' : 'Better Orders. Better Offers.'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'تدعم منصة نبع محفزات عروض ترويجية ذكية تجمع بين الخصومات التلقائية المطبقة مباشرة عند السداد وقسائم أكواد الخصم الترويجية.'
              : 'The Nabaa supports intelligent promotion triggers—combining automatic eligibility rules with customer coupon redemption directly within checkout.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Promotion Mechanisms */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Automatic Promotions Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {language === 'ar' ? '1. العروض الترويجية التلقائية' : '1. Automatic Promotions'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'تُطبق تلقائياً دون الحاجة لكتابة كود عند مطابقة الشروط' : 'Auto-calculated and applied at checkout without manual entry'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {AUTO_PROMOTIONS.map((promo) => {
                  const isSelected = selectedAutoPromo === promo.id;
                  const title = language === 'ar' 
                    ? (promo.id === 'seasonal' ? 'عرض موسم الصيف للمياه' : 'عرض الترحيب بالطلب الأول') 
                    : promo.title;
                  const desc = language === 'ar'
                    ? (promo.id === 'seasonal' ? 'خصم تلقائي 15% بحد أقصى 30 ر.س على الصهاريج' : 'خصم 25 ر.س عند الطلب لأول مرة عبر التطبيق')
                    : promo.description;
                  const tag = language === 'ar'
                    ? (promo.id === 'seasonal' ? 'خصم 15%' : 'خصم 25 ر.س')
                    : promo.tag;

                  return (
                    <div
                      key={promo.id}
                      onClick={() => {
                        setSelectedAutoPromo(promo.id);
                        setActivePromoCode('');
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/15'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                          {tag}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="text-sm font-bold font-display text-white">{title}</div>
                      <div className="text-xs text-slate-400 mt-1">{desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promo Codes Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {language === 'ar' ? '2. أكواد وقسائم الخصم' : '2. Promo Codes'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'أكواد المناسبات الخاصة وقسائم الشركاء والمؤثرين' : 'Special event codes and promotional voucher redemption'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={language === 'ar' ? 'أدخل كود الخصم (مثال: WATERFAST)' : 'Enter code (e.g. WATERFAST)'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white uppercase font-mono tracking-wider focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => applyCustomCode(customInput)}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shrink-0 cursor-pointer"
                  >
                    {language === 'ar' ? 'تطبيق' : 'Apply'}
                  </button>
                </div>

                {/* Example Quick Code Buttons */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span>{language === 'ar' ? 'جرب أحد الأكواد التجريبية:' : 'Try sample code:'}</span>
                  <button
                    onClick={() => {
                      setActivePromoCode('WATERFAST');
                      setSelectedAutoPromo('');
                    }}
                    className={`px-2.5 py-1 rounded font-mono font-bold border transition-colors cursor-pointer ${
                      activePromoCode === 'WATERFAST'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    WATERFAST ({language === 'ar' ? '-15 ر.س' : '-15 SAR'})
                  </button>
                  <button
                    onClick={() => {
                      setActivePromoCode('SUMMER10');
                      setSelectedAutoPromo('');
                    }}
                    className={`px-2.5 py-1 rounded font-mono font-bold border transition-colors cursor-pointer ${
                      activePromoCode === 'SUMMER10'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    SUMMER10 ({language === 'ar' ? '-10 ر.س' : '-10 SAR'})
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Real-Time Order Summary Demonstration */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0a1832] to-[#071124] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase text-slate-400">
                {language === 'ar' ? 'احتساب الطلب الفوري' : 'Live Order Calculation'}
              </span>
              <span className="text-xs font-bold text-cyan-400">
                {language === 'ar' ? 'سلة تفاعلية' : 'Interactive Checkout'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-slate-400 uppercase font-semibold">
                {language === 'ar' ? 'عنصر الطلب المحدد' : 'Configured Order Item'}
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-white font-display">
                    {language === 'ar' ? 'صهريج مياه 19 طن (وسط)' : '19T Medium Tanker'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {language === 'ar' ? '19,000 لتر • توصيل فيلا سكنية' : '19,000 Liters • Villa Delivery'}
                  </div>
                </div>
                <div className="text-base font-mono font-bold text-white" dir="ltr">200 SAR</div>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-800/80 pt-4 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-mono text-white" dir="ltr">200 SAR</span>
              </div>

              {selectedAutoPromo === 'seasonal' && (
                <div className="flex justify-between text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                  <span>{language === 'ar' ? 'عرض موسم الصيف (15%)' : 'Seasonal Water Offer (15%)'}</span>
                  <span className="font-mono font-bold" dir="ltr">-30 SAR</span>
                </div>
              )}

              {selectedAutoPromo === 'welcome' && (
                <div className="flex justify-between text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                  <span>{language === 'ar' ? 'عرض الترحيب بالطلب الأول' : 'First Order Welcome'}</span>
                  <span className="font-mono font-bold" dir="ltr">-25 SAR</span>
                </div>
              )}

              {activePromoCode && (
                <div className="flex justify-between text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                  <span>{language === 'ar' ? `كود الخصم (${activePromoCode})` : `Promo Code (${activePromoCode})`}</span>
                  <span className="font-mono font-bold" dir="ltr">-{codeDiscount} SAR</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>{language === 'ar' ? 'ضريبة القيمة المضافة (15%)' : 'Estimated VAT (15%)'}</span>
                <span className="font-mono text-white">{language === 'ar' ? 'مشمولة' : 'Included'}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-800">
                <span>{language === 'ar' ? 'المبلغ النهائي المستحق' : 'Final Amount'}</span>
                <span className="text-xl font-mono text-cyan-400" dir="ltr">{finalTotal} SAR</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              {language === 'ar'
                ? '* مثال توضيحي: يمكن لإدارة المنصة ضبط نسب الخصم والحدود القصوى وأكواد الحملات الترويجية فورياً من لوحة التحكم.'
                : '* Demonstration example: Promotions, caps, and percentage discounts can be configured dynamically by administrators via the central operations dashboard.'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
