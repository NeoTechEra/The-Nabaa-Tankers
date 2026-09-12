import React, { useState } from 'react';
import { Smartphone, Check, KeyRound, ArrowRight } from 'lucide-react';
import { TANKER_MODELS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface CustomerExperienceProps {
  onSelectTanker?: (tankerId: string) => void;
}

export const CustomerExperience: React.FC<CustomerExperienceProps> = ({ onSelectTanker }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedTanker, setSelectedTanker] = useState<string>('19t');
  const [selectedAddressType, setSelectedAddressType] = useState<string>('Villa');
  const [mobileInput, setMobileInput] = useState<string>('050 123 4567');
  const { t, isRTL, language } = useLanguage();

  const addressPresets = [
    { 
      name: language === 'ar' ? 'فيلا سكنية' : 'Villa', 
      detail: language === 'ar' ? 'خزان أرضي وعلوي' : 'Ground & Rooftop Tank', 
      hose: language === 'ar' ? 'خرطوم قياسي 40م' : 'Standard 40m' 
    },
    { 
      name: language === 'ar' ? 'خزان علوي' : 'Rooftop Tank', 
      detail: language === 'ar' ? 'ارتفاع حتى 3 طوابق' : 'Elevated 3-Story Access', 
      hose: language === 'ar' ? 'ضغط عالي 50م' : '50m high-pressure' 
    },
    { 
      name: language === 'ar' ? 'خزان أرضي' : 'Ground/Basement', 
      detail: language === 'ar' ? 'خزان أرضي سفلي' : 'Submerged Reservoir', 
      hose: language === 'ar' ? 'انسيابي 40م' : '40m gravity/pump' 
    },
    { 
      name: language === 'ar' ? 'مجمع سكني' : 'Residential Compound', 
      detail: language === 'ar' ? 'خزان رئيسي مجمع' : 'Central Cluster Tank', 
      hose: language === 'ar' ? 'خرطوم معزز 60م' : '60m heavy-duty' 
    },
    { 
      name: language === 'ar' ? 'مزرعة / استراحة' : 'Farm / Agricultural', 
      detail: language === 'ar' ? 'أحواض ري وزراعة' : 'Main Irrigation Basin', 
      hose: language === 'ar' ? 'ممتد 60م' : '60m extended' 
    },
    { 
      name: language === 'ar' ? 'موقع إنشاءات' : 'Construction Site', 
      detail: language === 'ar' ? 'خزانات صب ومشاريع' : 'Concrete Curing Basin', 
      hose: language === 'ar' ? 'خرطوم صناعي' : 'Industrial hose' 
    }
  ];

  return (
    <section id="customer-app" className="py-24 relative bg-[#060c18] overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.customerExperience.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {t.customerExperience.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {t.customerExperience.subtitle}
          </p>

          {/* Interactive Step Switcher - strictly formatted in one line with extended width */}
          <div className="pt-2 flex justify-center w-full">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner max-w-full overflow-x-auto no-scrollbar gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveStep(1)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeStep === 1
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.customerExperience.steps.step1.title}
              </button>
              <button
                onClick={() => setActiveStep(2)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeStep === 2
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.customerExperience.steps.step2.title}
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeStep === 3
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.customerExperience.steps.step3.title}
              </button>
            </div>
          </div>
        </div>

        {/* Step 1: Mobile Number & OTP Verification */}
        {activeStep === 1 && (
          <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#09152b] to-[#070e1c] border border-cyan-500/25 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {language === 'ar' ? 'إنشاء حساب فوري برقم الجوال' : 'Create an Account'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'ar' 
                    ? 'تسجيل سريع وسلس: رقم الجوال ← رمز التحقق OTP ← حساب جاهز للطلب' 
                    : 'Frictionless onboarding: Mobile Number → OTP Verification → Account Created'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'بدون تعقيد أو كلمات مرور منسية. يدخل العميل رقم الجوال الخاص به في دول الخليج ويتحقق فورا عبر رمز تحقق صالح لمرة واحدة.'
                    : 'No password-heavy onboarding or lengthy registrations. Customers enter their mobile number and verify via a single-use 4-digit code.'}
                </p>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {language === 'ar' ? 'رقم الجوال' : 'Mobile Number'}
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-900/90 focus-within:border-cyan-400" dir="ltr">
                    <span className="px-3.5 py-3 text-xs font-mono text-slate-400 bg-slate-800/80 border-r border-slate-700 flex items-center">
                      🇸🇦 +966
                    </span>
                    <input
                      type="text"
                      value={mobileInput}
                      onChange={(e) => setMobileInput(e.target.value)}
                      className="w-full px-3 py-3 text-sm text-white bg-transparent focus:outline-none font-mono text-left"
                      placeholder="5X XXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold">
                      {language === 'ar' ? 'رمز التحقق (OTP)' : 'One-Time Password (OTP)'}
                    </span>
                    <span className="text-cyan-400 font-mono" dir="ltr">00:48 remaining</span>
                  </div>
                  <div className="flex gap-2 justify-between" dir="ltr">
                    {['4', '8', '2', '9'].map((digit, idx) => (
                      <div
                        key={idx}
                        className="w-14 h-14 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 flex items-center justify-center text-xl font-mono font-bold shadow-inner"
                      >
                        {digit}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveStep(2)}
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>{language === 'ar' ? 'التحقق والمتابعة إلى العنوان' : 'Verify & Proceed to Address'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Mobile Phone Mockup Frame */}
              <div className="relative mx-auto w-64 rounded-3xl border-4 border-slate-800 bg-[#07101e] p-4 shadow-2xl">
                <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto mb-4"></div>
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-white font-display">
                    {language === 'ar' ? 'تسجيل دخول ناجح' : 'Instant Login'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {language === 'ar' ? 'تم تأكيد الرمز. أهلاً بك في منصة نبع.' : 'Code verified. Welcome to The Nabaa Tankers.'}
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    {language === 'ar' ? '✓ الحساب مفعل وجاهز' : '✓ Account Active'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Delivery Address & Tank Specs */}
        {activeStep === 2 && (
          <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#09152b] to-[#070e1c] border border-cyan-500/25 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {language === 'ar' ? 'تحديد موقع التوصيل ومواصفات الخزان' : 'Select Delivery Address & Tank Specs'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'ar'
                    ? 'حدد موقعك عبر الخريطة، واختر نوع الخزان وطول الخرطوم المطلوب لسائق الصهريج.'
                    : 'Pin location, designate tank type, and specify hose requirements for tanker drivers.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Presets and options */}
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                  {language === 'ar' ? 'نوع موقع التوصيل' : 'Target Location Type'}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {addressPresets.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedAddressType(item.name)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedAddressType === item.name
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/15'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold font-display">{item.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{item.detail}</div>
                      <div className="text-[10px] text-cyan-300 font-mono mt-1">{item.hose}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveStep(3)}
                  className="w-full mt-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>{language === 'ar' ? 'تأكيد الموقع واختيار حجم الصهريج' : 'Confirm Location & Select Tanker'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Delivery Instructions Panel */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="font-semibold text-slate-200">
                    {language === 'ar' ? 'إرشادات الوصول والتوصيل' : 'Delivery Instructions'}
                  </span>
                  <span className="text-cyan-400 font-mono">
                    {language === 'ar' ? 'دليل السائق' : 'Driver Guide'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="text-slate-400">
                    {language === 'ar' ? 'تعليمات البوابة والدخول' : 'Gate / Access Instructions'}
                  </label>
                  <input
                    type="text"
                    defaultValue={language === 'ar' ? 'البوابة الشمالية 2 - التواصل مع الأمن عند الوصول' : 'North Gate 2 - Call security upon arrival'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-2 text-xs">
                  <label className="text-slate-400">
                    {language === 'ar' ? 'موقع الخزان والخرطوم' : 'Tank Location & Hose Length'}
                  </label>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-xs">
                      {language === 'ar' ? 'محبس أرضي وعلوي' : 'Ground & Rooftop Inlet'}
                    </span>
                    <span className="px-2.5 py-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                      {language === 'ar' ? 'خرطوم مطلوب 50م' : '50m Reach Required'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="text-slate-400">
                    {language === 'ar' ? 'ملاحظات إضافية للتوصيل' : 'Special Delivery Notes'}
                  </label>
                  <textarea
                    rows={2}
                    defaultValue={language === 'ar' ? 'يرجى توصيل الخرطوم إلى المحبس الأرضي رقم 1 يسار مدخل الكراج.' : 'Please connect hose to ground intake valve #1 on the left side of the garage.'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Select Tanker Size */}
        {activeStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TANKER_MODELS.map((tanker) => {
                const isSelected = selectedTanker === tanker.id;
                return (
                  <div
                    key={tanker.id}
                    onClick={() => {
                      setSelectedTanker(tanker.id);
                      if (onSelectTanker) onSelectTanker(tanker.id);
                    }}
                    className={`relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#0e2246] to-[#08152e] border-cyan-400 shadow-2xl shadow-cyan-500/25 ring-1 ring-cyan-400/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tanker.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[11px] font-extrabold tracking-wider uppercase shadow-md shadow-cyan-500/30">
                        {language === 'ar' 
                          ? (tanker.id === '19t' ? 'الأكثر طلباً للفلل' : tanker.badge)
                          : tanker.badge}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                          {language === 'ar' ? `فئة ${tanker.capacityTons} طن` : `${tanker.capacityTons} Tons Class`}
                        </span>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-white font-display mb-1">
                        {language === 'ar' ? `صهريج ${tanker.capacityTons} طن (${tanker.capacityLiters.toLocaleString()} لتر)` : tanker.name}
                      </h3>
                      <div className="text-xs font-mono text-slate-400 mb-4">
                        {tanker.capacityLiters.toLocaleString()} {language === 'ar' ? 'لتر ماء عذب' : 'Liters Capacity'}
                      </div>

                      <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                        <div className="text-xs text-slate-400">
                          {language === 'ar' ? 'سعر قياسي تقديري' : 'Example Standard Price'}
                        </div>
                        <div className="text-3xl font-black text-white font-display flex items-baseline gap-1.5">
                          <span>{tanker.priceSAR}</span>
                          <span className="text-sm font-semibold text-cyan-400 font-sans">
                            {language === 'ar' ? 'ر.س / رحلة' : 'SAR / trip'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {language === 'ar' ? 'يشمل التوصيل والضخ' : 'Configured baseline rate'}
                        </div>
                      </div>

                      <div className="space-y-2 mb-6 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{language === 'ar' ? `طول الخرطوم: ${tanker.hoseReach}` : tanker.hoseReach}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{language === 'ar' ? `سرعة الضخ: ${tanker.pumpSpeed}` : tanker.pumpSpeed}</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-800/80 pt-4">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                          {language === 'ar' ? 'مناسب لـ:' : 'Suitable for:'}
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {tanker.idealFor.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {isSelected 
                        ? (language === 'ar' ? 'الصهريج المختار' : 'Selected Tanker') 
                        : (language === 'ar' ? 'اختيار الصهريج' : 'Select Tanker')}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="text-center text-xs text-slate-400 max-w-2xl mx-auto">
              {language === 'ar'
                ? '* الأسعار وسعات الصهاريج المعروضة تمثل أمثلة قياسية للمنصة ويمكن تخصيصها وفقاً لمنطقة التوصيل ونطاق الخدمة والتعاقدات.'
                : '* Pricing and tanker capacity classes shown are configured demonstration examples and may be tailored according to delivery radius and service agreements.'}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
