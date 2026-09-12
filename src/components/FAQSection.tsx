import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_LIST } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t, isRTL, language } = useLanguage();

  const faqs = language === 'ar' ? [
    {
      question: 'ما هي منصة نبع لتوريد المياه؟',
      answer: 'نبع هي منصة رقمية متخصصة ومبتكرة لإدارة وتوصيل صهاريج المياه الصالحة للشرب، تربط بين طالبي المياه (المنازل، المزارع، والمنشآت) وسائقي الصهاريج وغرفة العمليات في منظومة واحدة متكاملة.'
    },
    {
      question: 'هل يمكنني طلب صهريج مياه فوري؟',
      answer: 'نعم بالتأكيد. تتيح لك خاصية "اطلب الآن" إرسال طلب فوري لنقل وتفريغ المياه، حيث يوجه النظام الذكي أقرب صهريج متاح ومتطابق مع مواصفات خزانك في غضون دقائق.'
    },
    {
      question: 'هل يمكن جدولة وصول الصهريج لموعد لاحق؟',
      answer: 'نعم. يمكنك اختيار يوم ووقت التوصيل المناسب بدقة، وتحديد نوع الخزان وسعة الصهريج، مع إمكانية تفعيل التوصيل الدوري الأسبوعي لتفادي انقطاع المياه تماماً.'
    },
    {
      question: 'كيف يمكنني استخدام أكواد وقسائم الخصم؟',
      answer: 'تدعم شاشة إتمام الطلب تطبيق العروض التلقائية للعملاء الجدد والمواسم، بالإضافة إلى إمكانية إدخال أكواد الخصم مثل (WATERFAST أو SUMMER10) لاحتساب الخصم الفوري.'
    },
    {
      question: 'كيف يستقبل السائقون طلبات توصيل المياه؟',
      answer: 'يتلقى السائقون إشعارات وتنبيهات صوتية فورية عبر تطبيق السائق المخصص، تحتوي على عنوان العميل، نوع الخزان، طول الخرطوم، المسافة، وصافي الأرباح المتوقعة، مع خيار القبول الفوري.'
    },
    {
      question: 'هل يستطيع السائق متابعة أرباحه ومحفظته؟',
      answer: 'نعم، يتضمن تطبيق السائق محفظة مالية رقمية متكاملة توضح تفاصيل أرباح كل رحلة، إجمالي الرصيد اليومي والأسبوعي، وإمكانية طلب التحويل البنكي بسهولة.'
    },
    {
      question: 'هل تدعم المنصة إدارة أساطيل الصهاريج المتعددة؟',
      answer: 'صُممت منصة نبع خصيصاً لمشغلي الأساطيل وأصحاب الصهاريج التجارية، حيث تتيح تسجيل ومتابعة وفحص تراخيص الصهاريج (10، 19، 32 طن) وتعيين السائقين ومراقبة حركة الأسطول على الخريطة.'
    },
    {
      question: 'هل يمكن للإدارة إنشاء حملات عروض ترويجية؟',
      answer: 'نعم، توفر لوحة التحكم المركزية للإدارة صلاحيات متكاملة لتخصيص الخصومات (كنسبة مئوية أو مبلغ ثابت)، وتحديد سقف الخصم، والحد الأدنى للطلب، وتاريخ الصلاحية بسهولة.'
    }
  ] : FAQ_LIST;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-[#070e1d] border-t border-slate-800/80 overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'الأسئلة الشائعة والأجوبة' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {language === 'ar' ? 'كل ما تحتاج معرفته عن نبع' : 'Everything You Need to Know'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'إجابات واضحة وشاملة حول طلب الصهاريج الفورية، الجدولة المسبقة، أرباح السائقين، والامتثال اللوجستي للأساطيل.'
              : 'Clarifications on immediate water dispatch, driver earnings, fleet compliance, and platform capabilities.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-gradient-to-b from-[#0a172e] to-[#070f20] border border-slate-800 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className={`w-full px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <span className="text-base sm:text-lg font-bold text-white font-display">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-cyan-400 bg-slate-900 border border-slate-800 shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-cyan-500/20 border-cyan-400/40' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 font-normal ${isRTL ? 'text-right' : 'text-left'}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
