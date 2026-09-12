import React, { useState } from 'react';
import { Droplets, Building2, ArrowRight, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { notifyNabaaBooking } from '../services/gmail';
import { useLanguage } from '../context/LanguageContext';

interface BusinessAndCustomerCTAProps {
  onOpenOrderModal: () => void;
  onOpenDemoModal?: () => void;
}

export const BusinessAndCustomerCTA: React.FC<BusinessAndCustomerCTAProps> = ({ onOpenOrderModal, onOpenDemoModal }) => {
  const [businessModalOpen, setBusinessModalOpen] = useState(false);
  const [fleetName, setFleetName] = useState('');
  const [tankerCount, setTankerCount] = useState('5–15 tankers');
  const [contactNumber, setContactNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t, isRTL, language } = useLanguage();

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20services.';

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await notifyNabaaBooking({
        bookingType: 'fleet_inquiry',
        companyName: fleetName,
        senderPhone: contactNumber,
        topic: `Commercial Fleet Onboarding (${tankerCount})`,
        notes: `Fleet Size: ${tankerCount}. Registered from Business Portal.`
      });
    } catch (err) {
      console.error('Fleet inquiry dispatch error:', err);
    }
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 relative bg-[#070e1c] border-t border-slate-800/80 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* FOR CUSTOMERS */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2044] via-[#09162e] to-[#070f1f] border border-cyan-500/30 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold uppercase tracking-wider border border-cyan-800 mb-6">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'ar' ? 'للأفراد والمنازل' : 'For Customers'}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
                {language === 'ar' ? 'هل تحتاج صهريج مياه الآن؟' : 'Need Water?'}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-8">
                {language === 'ar'
                  ? 'اختر حجم الصهريج، حدد موعد وصوله، ودع منصة نبع تتولى الباقي. تابع سائقك في الوقت الفعلي وادفع بالطريقة التي تناسبك.'
                  : 'Choose your tanker, select your delivery time, and let The Nabaa handle the rest. Track your driver in real time and pay with convenience.'}
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{language === 'ar' ? 'توصيل فوري سريع أو جدولة لموعد لاحق' : 'Immediate dispatch or scheduled arrival'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{language === 'ar' ? 'صهاريج مياه صالحة للشرب معتمدة (10، 19، 32 طن)' : '10T, 19T, 32T potable certified tankers'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{language === 'ar' ? 'الدفع عبر مدى، أبل باي، البطاقات، أو كاش عند الاستلام' : 'Mada, Apple Pay, cards, or Cash on Delivery'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 group cursor-pointer transition-all"
                id="cta-customer-order-btn"
              >
                <span>{language === 'ar' ? 'اطلب صهريجك الآن' : 'Order Now'}</span>
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                <span>{language === 'ar' ? 'للطلب المباشر:' : 'Direct Ordering:'}</span>
                <a href={`tel:${phoneTel}`} className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold" dir="ltr">
                  <Phone className="w-3 h-3" />
                  <span>{phoneDisplay}</span>
                </a>
                <span>•</span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold" dir="ltr">
                  <MessageCircle className="w-3 h-3" />
                  <span>{whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* FOR WATER DELIVERY BUSINESSES */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1f3c] via-[#09152b] to-[#070e1c] border border-blue-500/30 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-800 mb-6">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'ar' ? 'لشركات وملاك أساطيل الصهاريج' : 'For Tanker Operators & Fleets'}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
                {language === 'ar' ? 'جاهز لرقمنة وتطوير أسطول نقل المياه؟' : 'Ready to Digitize Your Water Delivery Business?'}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-8">
                {language === 'ar'
                  ? 'توفر منصة نبع البنية التحتية الرقمية المتكاملة لربط عملائك بالسائقين، وإدارة الطلبات، المدفوعات، التوجيه الذكي، والحسابات المالية.'
                  : 'The Nabaa provides the digital infrastructure needed to connect customers, drivers, tankers, orders, payments, promotions, and operational management.'}
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'ar' ? 'لوحة تحكم وتوجيه مركزي سحابية' : 'Central web dispatch and fleet oversight'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'ar' ? 'تطبيقات مخصصة للسائقين على نظامي iOS وأندرويد' : 'Dedicated iOS & Android driver applications'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'ar' ? 'هيكلة عمولات وأرباح فورية ومحافظ رقمية' : 'Configurable driver commission structures'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenDemoModal ? onOpenDemoModal : () => setBusinessModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-300 hover:brightness-110 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 group cursor-pointer transition-all"
                  id="cta-business-demo-btn"
                >
                  <span>{language === 'ar' ? 'حجز عرض توضيحي مباشر' : 'Book Live Demo'}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </button>

                <button
                  onClick={() => setBusinessModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  id="cta-business-platform-btn"
                >
                  <span>{language === 'ar' ? 'استفسار سريع' : 'Quick Inquiry'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                <span>{language === 'ar' ? 'إدارة العمليات والشركاء:' : 'Operations Desk:'}</span>
                <a href={`tel:${phoneTel}`} className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold" dir="ltr">
                  <Phone className="w-3 h-3" />
                  <span>{phoneDisplay}</span>
                </a>
                <span>•</span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold" dir="ltr">
                  <MessageCircle className="w-3 h-3" />
                  <span>{whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Business Platform Inquiry Modal */}
      {businessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#09152b] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => {
                setBusinessModalOpen(false);
                setSubmitted(false);
              }}
              className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} text-slate-400 hover:text-white text-sm p-2 cursor-pointer`}
            >
              ✕
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmitInquiry} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {language === 'ar' ? 'رقمنة أسطول صهاريج المياه لشركتك' : 'Digitize Your Water Tanker Fleet'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {language === 'ar'
                      ? 'اربط أسطولك وسائقيك بمنظومة التوجيه والتشغيل الرقمي من نبع وابدأ استقبال الطلبات فوراً.'
                      : 'Connect your existing tanker fleet and drivers to The Nabaa operational dispatch platform.'}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      {language === 'ar' ? 'اسم الشركة / الأسطول' : 'Company / Fleet Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fleetName}
                      onChange={(e) => setFleetName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: شركة الرياض لنقل وتوريد المياه' : 'e.g. Al-Riyadh Water Logistics'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      {language === 'ar' ? 'عدد الصهاريج النشطة' : 'Active Tankers Count'}
                    </label>
                    <select
                      value={tankerCount}
                      onChange={(e) => setTankerCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    >
                      <option value="1–4 tankers">{language === 'ar' ? '1 – 4 صهاريج (تشغيل مستقل)' : '1 – 4 Tankers (Independent)'}</option>
                      <option value="5–15 tankers">{language === 'ar' ? '5 – 15 صهريج (أسطول متوسط)' : '5 – 15 Tankers (Medium Fleet)'}</option>
                      <option value="16–50 tankers">{language === 'ar' ? '16 – 50 صهريج (أسطول تجاري)' : '16 – 50 Tankers (Commercial Fleet)'}</option>
                      <option value="50+ tankers">{language === 'ar' ? '50+ صهريج (مؤسسة لوجستية كبرى)' : '50+ Tankers (Enterprise Logistics)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      {language === 'ar' ? 'رقم الهاتف للتواصل (السعودية / الخليج)' : 'Contact Mobile Number (Saudi/GCC)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  {language === 'ar' ? 'طلب عرض توضيحي لمنظومة الأسطول' : 'Request Fleet Operations Demo'}
                </button>

                <div className="text-[11px] text-slate-400 font-mono text-center pt-1" dir="ltr">
                  Immediate assistance: <a href={`tel:${phoneTel}`} className="text-cyan-400 hover:underline">{phoneDisplay}</a> | WhatsApp: <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">{whatsappDisplay}</a>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {language === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Inquiry Received'}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {language === 'ar'
                    ? 'شكراً لتواصلكم. سيتواصل معكم فريق العمليات والربط اللوجستي لشرح لوحة التحكم وتجهيز حسابات السائقين وتدريب الأسطول.'
                    : 'Thank you. Our fleet onboarding team will contact you to demonstrate central dispatch, tanker compliance management, and driver app provisioning.'}
                </p>
                <div className="max-w-sm mx-auto p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center gap-2 text-xs font-mono text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'ar' ? 'تم تسجيل الطلب وإرساله لمركز العمليات الرئيسي' : 'Registered and dispatched to central fleet operations'}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono py-1" dir="ltr">
                  Direct Line: <a href={`tel:${phoneTel}`} className="text-cyan-400 hover:underline">{phoneDisplay}</a> | WhatsApp: <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">{whatsappDisplay}</a>
                </div>
                <button
                  onClick={() => {
                    setBusinessModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="px-6 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
