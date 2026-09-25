import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';

export const ContactPage: React.FC = () => {
  const { isRTL, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
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

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20have%20an%20inquiry.';
  const emailAddress = 'thenabaatankers@gmail.com';

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'اتصل بنا | صهاريج نبع' : 'Contact Us | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'تواصل مع فريق صهاريج نبع لتوريد المياه في الرياض عبر الهاتف أو واتساب أو البريد الإلكتروني. دعم مباشر على مدار الساعة.'
            : 'Get in touch with The Nabaa Tankers: direct customer support, dispatch operations, phone hotline, and official WhatsApp assistance.'
        }
        canonicalPath={language === 'ar' ? '/ar/contact' : '/contact'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'اتصل بنا' : 'Contact Us', path: language === 'ar' ? '/ar/contact' : '/contact' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Phone className="w-4 h-4" />
            <span>{language === 'ar' ? 'قنوات التواصل المباشرة' : 'Direct Assistance'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'تواصل مع فريق صهاريج نبع' : 'Contact The Nabaa'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'يسعدنا الرد على استفساراتكم حول طلبات مياه الشرب، انضمام السائقين، أو خدمات التوريد المجدول للمشاريع في الرياض.'
              : 'Our support and dispatch operations team is ready to assist with water orders, partner onboarding, and bulk logistics.'}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Phone Hotline */}
          <div className="p-7 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {language === 'ar' ? 'الاتصال المباشر' : 'Direct Call Hotline'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ar' ? 'للطلبات والاستفسارات العاجلة' : 'For urgent dispatches & support'}
                </p>
              </div>
            </div>
            <a
              href={`tel:${phoneTel}`}
              className="text-sm font-mono font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-2 pt-2 border-t border-slate-800"
              dir="ltr"
            >
              <span>{phoneDisplay}</span>
            </a>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="p-7 rounded-3xl bg-[#09152b] border border-emerald-500/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {language === 'ar' ? 'محادثة واتساب' : 'WhatsApp Support'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ar' ? 'رد سريع وتنسيق مواقع التوصيل' : 'Fast coordinate sharing & chat'}
                </p>
              </div>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-2 pt-2 border-t border-slate-800"
              dir="ltr"
            >
              <span>{whatsappDisplay}</span>
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="p-7 rounded-3xl bg-[#09152b] border border-blue-500/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Official Email'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'ar' ? 'للاستفسارات الرسمية والعقود' : 'Formal inquiries & bulk contracts'}
                </p>
              </div>
            </div>
            <a
              href={`mailto:${emailAddress}`}
              className="text-xs font-mono font-bold text-blue-400 hover:text-blue-300 truncate pt-2 border-t border-slate-800"
            >
              {emailAddress}
            </a>
          </div>

        </div>

        {/* Operating Hours & Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Operations Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-display">
                {language === 'ar' ? 'أوقات العمل والتغطية' : 'Operating Schedule'}
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{language === 'ar' ? 'توصيل الصهاريج الميداني:' : 'Field Tanker Dispatches:'}</div>
                    <div className="text-slate-400 font-mono text-xs">{language === 'ar' ? 'على مدار 24 ساعة / 7 أيام في الأسبوع' : '24 Hours / 7 Days a Week'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{language === 'ar' ? 'خدمة العملاء الهاتفية:' : 'Customer Care Center:'}</div>
                    <div className="text-slate-400 font-mono text-xs">{language === 'ar' ? 'يومياً: 6:00 صباحاً - 12:00 منتصف الليل' : 'Daily: 6:00 AM - 12:00 Midnight'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{language === 'ar' ? 'المقر ومركز العمليات:' : 'Logistics Operations Center:'}</div>
                    <div className="text-slate-400 text-xs">{language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'ملاحظة: لطلبات توريد المياه العاجلة في حالات انقطاع المياه المفاجئ، نوصي بالاتصال المباشر على الهاتف أو الطلب الفوري عبر التطبيق لضمان سرعة التوجيه.'
                : 'Emergency refill note: For sudden water outages, we recommend placing an immediate order in the application or calling directly for priority dispatch.'}
            </div>
          </div>

          {/* Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-cyan-500/30 shadow-2xl">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {language === 'ar' ? 'شكراً لتواصلك معنا!' : 'Message Received!'}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    {language === 'ar'
                      ? 'تم استلام رسالتك بنجاح، وسيقوم ممثل خدمة العملاء في نبع بالرد عليك في أقرب وقت ممكن.'
                      : 'Thank you. A member of our support team will review your message and reply promptly.'}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white font-display">
                      {language === 'ar' ? 'نموذج الاستفسار السريع' : 'Send an Inquiry'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'ar' ? 'سنقوم بالرد عليك عبر البريد أو الهاتف خلال ساعات العمل' : 'We respond within standard business hours'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'الاسم *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'رقم الجوال *' : 'Phone Number *'}
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
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">
                        {language === 'ar' ? 'نوع الاستفسار *' : 'Inquiry Subject *'}
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                      >
                        <option value="general">{language === 'ar' ? 'استفسار عام عن الخدمة' : 'General Service Inquiry'}</option>
                        <option value="order">{language === 'ar' ? 'متابعة طلب صهريج' : 'Order Status Inquiry'}</option>
                        <option value="driver">{language === 'ar' ? 'تسجيل وانضمام سائق' : 'Driver Registration Inquiry'}</option>
                        <option value="commercial">{language === 'ar' ? 'عقود توريد وتعبئة دورية' : 'Bulk / Commercial Supply'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">
                      {language === 'ar' ? 'نص الرسالة *' : 'Message Details *'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'ar' ? 'اكتب تفاصيل استفسارك أو موقعك هنا...' : 'Write your question or request here...'}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                  >
                    <span>{isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (language === 'ar' ? 'إرسال الرسالة' : 'Send Message')}</span>
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
