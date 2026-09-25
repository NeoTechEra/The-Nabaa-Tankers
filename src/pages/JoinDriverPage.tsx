import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Wallet, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  FileText, 
  Smartphone,
  Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

export const JoinDriverPage: React.FC = () => {
  const { isRTL, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    nationalId: '',
    city: 'الرياض',
    tankerOwnership: 'owner',
    tankerCapacity: '19t',
    licenseValid: true,
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'انضم كسائق صهريج شريك | صهاريج نبع' : 'Join as a Tanker Driver Partner | The Nabaa'}
        description={
          language === 'ar'
            ? 'سجل كسائق أو شريك صهريج مياه مع منصة نبع في الرياض: عمولات مجزية لكل رحلة، تحويلات بنكية منتظمة، واستقبال طلبات مستمرة.'
            : 'Register as a water tanker driver partner in Riyadh with The Nabaa: transparent per-trip commissions, flexible hours, and weekly bank payouts.'
        }
        canonicalPath={language === 'ar' ? '/ar/join-as-driver' : '/join-as-driver'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'انضم كسائق' : 'Join as Driver', path: language === 'ar' ? '/ar/join-as-driver' : '/join-as-driver' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Truck className="w-4 h-4" />
            <span>{language === 'ar' ? 'شراكة سائقي الصهاريج' : 'Driver Partner Onboarding'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'انضم لشبكة سائقي صهاريج نبع' : 'Drive With The Nabaa'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'هل تقود أو تمتلك صهريج مياه في الرياض؟ انضم إلى منصة نبع واستقبل طلبات توصيل مستمرة بعمولات مجزية وتحويلات بنكية مباشرة.'
              : 'Do you drive or operate a water tanker in Riyadh? Partner with The Nabaa to receive steady delivery dispatches, clear per-trip commissions, and reliable weekly payouts.'}
          </p>
        </div>

        {/* 3 Core Partner Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-7 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? 'عمولات واضحة ومباشرة' : 'Transparent Commissions'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'تعرف مسبقاً على قيمة العمولة المحددة لكل رحلة قبل قبولها، بدون أي خصومات غير واضحة.'
                : 'See the exact commission earned on every trip before you accept, with zero hidden fees.'}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#09152b] border border-blue-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? 'مرونة تامة في ساعات العمل' : 'Flexible Hours'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'أنت مدير وقتك؛ قم بتفعيل حالة "متاح" متى ما أردت استقبال الطلبات وإيقافها عند انتهاء دوامك.'
                : 'Control your own schedule: toggle online status when ready to deliver, and offline when off duty.'}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#09152b] border border-emerald-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? 'تحويلات بنكية منتظمة' : 'Weekly Bank Transfers'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'تحويل الأرباح المستحقة مباشرة إلى حسابك البنكي المحلي في نهاية كل أسبوع مع كشف حساب رقمي.'
                : 'Automatic settlements straight to your local IBAN bank account with full digital reporting.'}
            </p>
          </div>

        </div>

        {/* Requirements & Application Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Requirements & Steps (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-display">
                {language === 'ar' ? 'شروط الانضمام المطلوبة:' : 'Partner Requirements:'}
              </h3>
              
              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{language === 'ar' ? 'رخصة قيادة نقل سارية' : 'Valid Heavy Driving License'}</div>
                    <div className="text-xs text-slate-400">{language === 'ar' ? 'رخصة عمومي أو نقل خفيف/ثقيل سارية المفعول.' : 'Valid Saudi heavy vehicle operating license.'}</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{language === 'ar' ? 'صهريج مطابق للاشتراطات' : 'Certified Water Tanker'}</div>
                    <div className="text-xs text-slate-400">{language === 'ar' ? 'صهريج مياه مخصص وصحي ومجهز بمضخة وتفريغ سليم.' : 'Food-grade or inspected water tank with functioning pump.'}</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{language === 'ar' ? 'هاتف ذكي (أندرويد أو آيفون)' : 'Smartphone'}</div>
                    <div className="text-xs text-slate-400">{language === 'ar' ? 'لتشغيل تطبيق السائق واستقبال إشعارات الطلبات وتحديد المواقع.' : 'Android or iOS device to run the driver dispatch application.'}</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{language === 'ar' ? 'هوية وطنية أو إقامة نظامية' : 'National ID / Iqama'}</div>
                    <div className="text-xs text-slate-400">{language === 'ar' ? 'إثبات هوية رسمي ساري مع رقم آيبان بنكي باسم السائق.' : 'Valid official identification and bank account in driver name.'}</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="font-bold text-white">{language === 'ar' ? 'هل لديك استفسار قبل التقديم؟' : 'Questions before applying?'}</div>
              <div>
                {language === 'ar' ? 'تواصل مع فريق تسجيل الشركاء مباشرة عبر واتساب:' : 'Contact our driver operations team via WhatsApp:'}
              </div>
              <a
                href="https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Driver%20Recruitment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 font-mono font-bold"
              >
                <span>+92 333 0717198</span>
              </a>
            </div>
          </div>

          {/* Interactive Driver Application Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-cyan-500/30 shadow-2xl">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {language === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Application Received!'}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    {language === 'ar'
                      ? 'شكراً لك، سيتواصل معك فريق إدارة أسطول نبع خلال 24 ساعة لاستكمال التحقق من الوثائق وتفعيل حساب السائق على التطبيق.'
                      : 'Thank you. Our fleet operations team will contact you within 24 hours to verify documents and activate your driver account.'}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'تقديم طلب آخر' : 'Submit Another Application'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white font-display">
                      {language === 'ar' ? 'استمارة التسجيل المبدئي لسائقي الصهاريج' : 'Driver Partner Application Form'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'ar' ? 'املأ البيانات التالية ليتواصل معك مشرف الأسطول' : 'Provide your details to initiate verification'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'الاسم الكامل للسائق *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={language === 'ar' ? 'مثال: محمد سعيد' : 'e.g. Mohammed Saeed'}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'رقم الجوال السعودي *' : 'Saudi Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05XXXXXXXX"
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs font-mono focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'رقم الهوية / الإقامة *' : 'National ID / Iqama Number *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nationalId}
                        onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                        placeholder="1XXXXXXXXX / 2XXXXXXXXX"
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs font-mono focus:outline-none"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'مدينة العمل *' : 'Operating City *'}
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                      >
                        <option value="الرياض">{language === 'ar' ? 'الرياض (تغطية نشطة)' : 'Riyadh (Active Coverage)'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'سعة الصهريج *' : 'Tanker Capacity *'}
                      </label>
                      <select
                        value={formData.tankerCapacity}
                        onChange={(e) => setFormData({ ...formData, tankerCapacity: e.target.value })}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                      >
                        <option value="19t">{language === 'ar' ? '19 طن (الحجم القياسي للفلل)' : '19 Tons (Standard Villa)'}</option>
                        <option value="10t">{language === 'ar' ? '10 طن (حجم مدمج)' : '10 Tons (Compact)'}</option>
                        <option value="32t">{language === 'ar' ? '32 طن (سعة كبرى للمشاريع)' : '32 Tons (Heavy Commercial)'}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'ملكية الصهريج *' : 'Tanker Status *'}
                      </label>
                      <select
                        value={formData.tankerOwnership}
                        onChange={(e) => setFormData({ ...formData, tankerOwnership: e.target.value })}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                      >
                        <option value="owner">{language === 'ar' ? 'مالك وسائق الصهريج' : 'Owner & Driver'}</option>
                        <option value="driver">{language === 'ar' ? 'سائق مفوض على صهريج' : 'Authorized Driver on Fleet Tanker'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">
                      {language === 'ar' ? 'ملاحظات إضافية (سنة الصنع، نوع المضخة)' : 'Additional Notes (Make, Pump type)'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: صهريج مرسيدس 2022، مضخة تفريغ ضغط عالي، حي التمركز: الملقا' : 'e.g. Mercedes 2022, high pressure pump, stationed in Al-Malqa'}
                      className="w-full py-2 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="licenseValidCheck"
                      checked={formData.licenseValid}
                      onChange={(e) => setFormData({ ...formData, licenseValid: e.target.checked })}
                      required
                      className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                    />
                    <label htmlFor="licenseValidCheck" className="text-xs text-slate-400 cursor-pointer">
                      {language === 'ar'
                        ? 'أؤكد أن رخصة القيادة والوثائق الرسمية سارية المفعول.'
                        : 'I confirm that my driving license and identification are currently valid.'}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                  >
                    <span>{isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (language === 'ar' ? 'إرسال طلب الانضمام' : 'Submit Driver Application')}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </>
  );
};
