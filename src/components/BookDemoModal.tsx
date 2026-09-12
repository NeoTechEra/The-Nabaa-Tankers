import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, Building2, User, Mail, Phone, 
  CheckCircle2, ChevronRight, AlertCircle, Copy, Check, Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { createDemoRequest, TARGET_BUSINESS_EMAIL } from '../services/firebase';
import { addBookingRecord } from '../services/bookingStore';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const { isRTL, language } = useLanguage();
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Saudi Arabia');
  const [interestedIn, setInterestedIn] = useState<string>('Whole Platform Demo');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('11:00 AM (AST)');
  const [timezone, setTimezone] = useState<string>('Asia/Riyadh');
  const [message, setMessage] = useState('');

  // UI & Validation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedRequestId, setGeneratedRequestId] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // Set default preferred date to tomorrow on mount
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setPreferredDate(`${yyyy}-${mm}-${dd}`);

      try {
        const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (detectedTz) setTimezone(detectedTz);
      } catch {
        setTimezone('Asia/Riyadh');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Minimum allowed date is today
  const todayIso = new Date().toISOString().split('T')[0];

  const interestOptions = language === 'ar' ? [
    { id: 'Whole Platform Demo', label: 'استعراض المنظومة كاملة (كافة التطبيقات)', desc: 'جولة مباشرة وشاملة: تطبيق العميل، تطبيق السائق، ولوحة التحكم والعمليات' },
    { id: 'Customer App', label: 'تطبيق طلب وتتبع المياه (العميل)', desc: 'حجز الصهاريج، التتبع المباشر على الخريطة، والدفع الإلكتروني' },
    { id: 'Driver App', label: 'تطبيق السائق وتوصيل المياه', desc: 'استلام الإرساليات، التوجيه الملاحي، وإثبات تفريغ المياه رقمياً' },
    { id: 'Admin & Fleet Management', label: 'لوحة التحكم المركزية وإدارة الأسطول', desc: 'توزيع الإرساليات، مراقبة حركة الصهاريج، التسعير الديناميكي والتقارير' },
  ] : [
    { id: 'Whole Platform Demo', label: 'Complete Platform Demo (Whole App)', desc: 'Full end-to-end walkthrough: Customer App, Driver App, and Admin Operations' },
    { id: 'Customer App', label: 'Customer Water Ordering App', desc: 'Tanker booking, real-time GPS tracking, and digital payments' },
    { id: 'Driver App', label: 'Driver Delivery App', desc: 'Mission dispatch, turn-by-turn routing, and delivery confirmation' },
    { id: 'Admin & Fleet Management', label: 'Admin Dashboard & Fleet Operations', desc: 'Live dispatching, tanker tracking, tariffs, and operations reports' },
  ];

  const timeSlots = [
    '09:30 AM (AST)',
    '11:00 AM (AST)',
    '01:30 PM (AST)',
    '03:00 PM (AST)',
    '04:30 PM (AST)',
    '07:00 PM (AST)'
  ];

  const countries = [
    { code: 'SA', nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', flag: '🇸🇦' },
    { code: 'AE', nameEn: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة', flag: '🇦🇪' },
    { code: 'KW', nameEn: 'Kuwait', nameAr: 'الكويت', flag: '🇰🇼' },
    { code: 'BH', nameEn: 'Bahrain', nameAr: 'البحرين', flag: '🇧🇭' },
    { code: 'OM', nameEn: 'Oman', nameAr: 'عُمان', flag: '🇴🇲' },
    { code: 'QA', nameEn: 'Qatar', nameAr: 'قطر', flag: '🇶🇦' },
    { code: 'EG', nameEn: 'Egypt', nameAr: 'مصر', flag: '🇪🇬' },
    { code: 'JO', nameEn: 'Jordan', nameAr: 'الأردن', flag: '🇯🇴' },
    { code: 'PK', nameEn: 'Pakistan', nameAr: 'باكستان', flag: '🇵🇰' },
    { code: 'OTHER', nameEn: 'Other International', nameAr: 'دولة أخرى', flag: '🌐' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.name = language === 'ar' ? 'يرجى إدخال الاسم الكامل (حرفان على الأقل)' : 'Please enter your full name (at least 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid business email address';
    }

    const phoneClean = phone.replace(/[^0-9+]/g, '');
    if (!phoneClean || phoneClean.length < 7) {
      newErrors.phone = language === 'ar' ? 'يرجى إدخال رقم هاتف أو واتساب صالح مع مفتاح الدولة' : 'Please enter a valid phone or WhatsApp number with country code';
    }

    if (!preferredDate) {
      newErrors.date = language === 'ar' ? 'يرجى تحديد التاريخ المفضل' : 'Please select a preferred date';
    } else if (preferredDate < todayIso) {
      newErrors.date = language === 'ar' ? 'لا يمكن تحديد تاريخ في الماضي' : 'Preferred date cannot be in the past';
    }

    if (!preferredTime) {
      newErrors.time = language === 'ar' ? 'يرجى تحديد الوقت المفضل' : 'Please select a preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    // Rate Limiting Protection (prevent multiple submissions within 30 seconds)
    const lastSubmitTime = sessionStorage.getItem('nabaa_demo_last_submit');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 30000) {
      setSubmitError(
        language === 'ar' 
          ? 'تم استلام طلبك للتو! يرجى الانتظار نصف دقيقة قبل إرسال طلب جديد.' 
          : 'You just submitted a demo request. Please wait 30 seconds before submitting again.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create real Demo Request in Firebase Firestore and trigger email
      const { id } = await createDemoRequest({
        name: fullName,
        companyName: company,
        email: email,
        phone: phone,
        country: country,
        interestedIn: interestedIn,
        preferredDate: preferredDate,
        preferredTime: preferredTime,
        timezone: timezone,
        message: message,
      });

      // 2. Also register in local storage store for offline record inspection
      addBookingRecord({
        type: 'demo',
        title: `[The Nabaa Tankers] Demo Request: ${fullName} (${interestedIn})`,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        targetEmail: TARGET_BUSINESS_EMAIL,
        status: 'pending',
        details: {
          requestId: id,
          topic: interestedIn,
          company: company || 'Individual',
          country: country,
          scheduledTime: `${preferredDate} at ${preferredTime}`,
          timezone: timezone,
          notes: message || 'N/A',
        },
        htmlContent: `<p>Demo Request ${id} submitted for ${fullName} (${email}). Topic: ${interestedIn}. Date: ${preferredDate} ${preferredTime}.</p>`,
        plainContent: `The Nabaa Tankers Demo Request\nID: ${id}\nName: ${fullName}\nEmail: ${email}\nTopic: ${interestedIn}\nDate: ${preferredDate} ${preferredTime}`,
      });

      sessionStorage.setItem('nabaa_demo_last_submit', String(now));
      setGeneratedRequestId(id);
      setStep('success');
    } catch (err: any) {
      console.error('Error creating demo request:', err);
      setSubmitError(
        language === 'ar'
          ? 'تعذر إرسال طلب العرض التوضيحي حالياً بسبب انقطاع الشبكة. يرجى المحاولة ثانية أو التواصل مباشرة عبر الواتساب.'
          : 'Unable to submit your demo request right now. Please check your connection or contact us directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep('form');
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  const handleCopyId = () => {
    if (!generatedRequestId) return;
    navigator.clipboard.writeText(generatedRequestId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddCalendarReminder = () => {
    const title = encodeURIComponent(
      language === 'ar' 
        ? `[بانتظار التأكيد] عرض منصة صهاريج نبع - ${generatedRequestId}` 
        : `[Awaiting Confirmation] The Nabaa Tankers Demo - ${generatedRequestId}`
    );
    const details = encodeURIComponent(
      `The Nabaa Tankers Demo Request (Awaiting Admin Confirmation)\nRequest ID: ${generatedRequestId}\nTopic: ${interestedIn}\nRequested Time: ${preferredDate} ${preferredTime}\nNote: Our operations team will contact you directly to confirm the meeting link.`
    );
    const location = encodeURIComponent('The Nabaa Tankers Online Platform Walkthrough');
    
    // Quick Google Calendar deep link
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#091326] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300"></div>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/90 flex items-start justify-between relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono mb-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'حجز موعد / عرض توضيحي مباشر' : 'Book Platform Demo / Schedule Walkthrough'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              {language === 'ar' ? 'طلب جلسة استعراض لمنظومة نبع' : 'Request a Platform Demo'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
              {language === 'ar'
                ? 'جلسة استعراضية تفاعلية لتطبيقات المنظومة ولوحة التحكم المركزية مع فريق العمليات.'
                : 'Schedule a tailored walkthrough of our Customer App, Driver App, and Admin Command Center.'}
            </p>
          </div>

          <button 
            onClick={handleResetAndClose}
            className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0 ${isRTL ? 'mr-auto' : 'ml-auto'}`}
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            
            {submitError && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* 1. What are you interested in? */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                {language === 'ar' ? '1. ما هو محور الاهتمام الرئيسي؟ *' : '1. What are you interested in? *'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {interestOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInterestedIn(item.id)}
                    className={`p-3 rounded-xl border ${isRTL ? 'text-right' : 'text-left'} transition-all cursor-pointer flex flex-col justify-between ${
                      interestedIn === item.id
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm shadow-cyan-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-100">{item.label}</span>
                    <span className="text-[11px] text-slate-400 mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Contact Information */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                {language === 'ar' ? '2. معلومات الاتصال والتواصل *' : '2. Contact Information *'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3' : 'left-3'} top-3`} />
                    <input
                      type="text"
                      required
                      placeholder={language === 'ar' ? 'الاسم الثلاثي أو الثنائي' : 'Your Full Name'}
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2.5 rounded-xl bg-slate-900 border ${errors.name ? 'border-rose-500' : 'border-slate-700'} text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'اسم الشركة أو المؤسسة (اختياري)' : 'Company / Business Name (Optional)'}
                  </label>
                  <div className="relative">
                    <Building2 className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3' : 'left-3'} top-3`} />
                    <input
                      type="text"
                      placeholder={language === 'ar' ? 'شركة المقاولات، المجمع، المؤسسة...' : 'e.g. Riyadh Water Logistics LLC'}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني للعمل *' : 'Work Email Address *'}
                  </label>
                  <div className="relative">
                    <Mail className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3' : 'left-3'} top-3`} />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2.5 rounded-xl bg-slate-900 border ${errors.email ? 'border-rose-500' : 'border-slate-700'} text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                      dir="ltr"
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'الجوال / واتساب (مع مفتاح الدولة) *' : 'Phone / WhatsApp Number *'}
                  </label>
                  <div className="relative">
                    <Phone className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3' : 'left-3'} top-3`} />
                    <input
                      type="tel"
                      required
                      placeholder="+966 50 123 4567"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2.5 rounded-xl bg-slate-900 border ${errors.phone ? 'border-rose-500' : 'border-slate-700'} text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono`}
                      dir="ltr"
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* 3. Country & Preferred Date / Time */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                {language === 'ar' ? '3. الدولة والوقت المفضل *' : '3. Country & Preferred Schedule *'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Country */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    <span>{language === 'ar' ? 'الدولة' : 'Country'}</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.nameEn}>
                        {c.flag} {language === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'التاريخ المفضل *' : 'Preferred Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    min={todayIso}
                    value={preferredDate}
                    onChange={(e) => {
                      setPreferredDate(e.target.value);
                      if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                    }}
                    className={`w-full py-2 px-3 rounded-xl bg-slate-900 border ${errors.date ? 'border-rose-500' : 'border-slate-700'} text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer`}
                  />
                  {errors.date && <p className="text-[10px] text-rose-400 mt-1">{errors.date}</p>}
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'الوقت المفضل *' : 'Preferred Time *'}
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>
                  {language === 'ar' ? `المنطقة الزمنية: ${timezone}` : `Timezone: ${timezone}`}
                </span>
              </div>
            </div>

            {/* 4. Additional Message or Fleet Details */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-1">
                {language === 'ar' ? '4. ملاحظات إضافية أو حجم الأسطول المطلوب (اختياري)' : '4. Additional Message or Fleet Details (Optional)'}
              </label>
              <textarea
                rows={2}
                placeholder={language === 'ar' ? 'أخبرنا عن عدد الصهاريج التي تديرها، أو أي متطلبات خاصة ترغب بمناقشتها...' : 'Tell us about your fleet size, location, or specific requirements you want to explore...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Submit Action & Clarification Notice */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">
                    {language === 'ar' ? 'إجراء الحجز والتأكيد:' : 'Booking Confirmation Workflow:'}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {language === 'ar'
                      ? 'سيتم تسجيل طلبكم فوراً وإنشاء معرف حجز، وسيتواصل معكم فريق العمليات عبر الواتساب أو البريد لتثبيت وتأكيد الموعد النهائي ورابط الاجتماع.'
                      : 'Your request will be recorded with a unique tracking ID. Our operations team will review your preferred slot and contact you to officially confirm the session and meeting link.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 font-mono" dir="ltr">
                  Helpline: <a href="tel:+966530434010" className="text-cyan-400 hover:underline">+966 53 043 4010</a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  id="submit-demo-request-btn"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>{language === 'ar' ? 'جارٍ تسجيل الطلب...' : 'Submitting Demo Request...'}</span>
                    </div>
                  ) : (
                    <>
                      <span>{language === 'ar' ? 'إرسال طلب العرض التوضيحي' : 'Submit Demo Request'}</span>
                      <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* Confirmation State (Complies strictly with: DO NOT CLAIM A MEETING IS CONFIRMED) */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            {/* Status Icon */}
            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Header & ID */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{language === 'ar' ? 'بانتظار التأكيد' : 'AWAITING CONFIRMATION'}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {language === 'ar' ? 'تم استلام طلب العرض التوضيحي' : 'Demo Request Received'}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {language === 'ar' ? (
                  <>
                    شكراً لاهتمامكم بـ <strong className="text-white">صهاريج نبع</strong>. تم استلام طلبكم بنجاح وسيقوم فريق العمليات بالتواصل معكم لتأكيد موعد الجلسة النهائي.
                  </>
                ) : (
                  <>
                    Thank you for your interest in <strong className="text-white">The Nabaa Tankers</strong>. Your demo request has been received and our team will contact you to confirm the meeting.
                  </>
                )}
              </p>
            </div>

            {/* Request Summary Card */}
            <div className={`max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 ${isRTL ? 'text-right' : 'text-left'} space-y-3 text-xs text-slate-300`}>
              
              {/* Request ID with Copy Button */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  {language === 'ar' ? 'معرّف الطلب:' : 'Request ID:'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                    {generatedRequestId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Request ID"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400">{language === 'ar' ? 'الجلسة المطلوبة:' : 'Requested Session:'}</span>
                <span className="font-semibold text-white text-right">{interestedIn}</span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400">{language === 'ar' ? 'الوقت المفضل:' : 'Requested Time:'}</span>
                <span className="font-semibold text-cyan-300 text-right">{preferredDate} ({preferredTime})</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">{language === 'ar' ? 'حالة الطلب:' : 'Status:'}</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {language === 'ar' ? 'قيد المراجعة والتنسيق' : 'Awaiting Confirmation'}
                </span>
              </div>
            </div>

            {/* Helpful Note about confirmation */}
            <div className="max-w-md mx-auto p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-normal">
              {language === 'ar'
                ? 'ملاحظة: الوقت المحدد أعلاه هو رغبتكم المبدئية. سيقوم مسؤول التنسيق بإرسال رابط الاجتماع وتأكيد التوقيت النهائي عبر البريد والواتساب.'
                : 'Note: The requested time is awaiting scheduling confirmation. You will receive an official confirmation message and video link once verified by our team.'}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddCalendarReminder}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'إضافة تذكير للتقويم' : 'Add Calendar Reminder'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer"
              >
                {language === 'ar' ? 'تم، إغلاق النافذة' : 'Done & Close'}
              </button>
            </div>

            {/* Direct Contact Support */}
            <div className="text-[11px] text-slate-400 font-mono flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-slate-800" dir="ltr">
              <span>Direct Support:</span>
              <a
                href={`https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20have%20submitted%20demo%20request%20${generatedRequestId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-bold"
              >
                WhatsApp: +92 333 0717198
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="tel:+966530434010"
                className="text-cyan-400 hover:underline font-bold"
              >
                Call: +966 53 043 4010
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
