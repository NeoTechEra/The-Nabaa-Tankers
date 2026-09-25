import React from 'react';
import { FileText, ShieldAlert, CheckCircle2, Droplets } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';

export const TermsPage: React.FC = () => {
  const { isRTL, language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'الشروط والأحكام | صهاريج نبع' : 'Terms & Conditions | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'الشروط والأحكام المنظمة لخدمة توريد مياه الشرب بالصهاريج عبر منصة نبع: التزامات العميل، اشتراطات الخزانات، والإلغاء والاسترجاع.'
            : 'Terms and Conditions for The Nabaa water delivery platform: customer tank access obligations, driver partner standards, and cancellation policies.'
        }
        canonicalPath={language === 'ar' ? '/ar/terms-and-conditions' : '/terms-and-conditions'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions', path: language === 'ar' ? '/ar/terms-and-conditions' : '/terms-and-conditions' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <FileText className="w-4 h-4" />
            <span>{language === 'ar' ? 'الاتفاقية والاشتراطات الرسمية' : 'Service Agreement'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
            {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          <p className="text-slate-400 text-xs font-mono">
            {language === 'ar' ? 'آخر تحديث: سبتمبر 2026' : 'Last Updated: September 2026'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '1. طبيعة الخدمة' : '1. Nature of the Service'}
            </h2>
            <p>
              {language === 'ar'
                ? 'توفر صهاريج نبع منصة رقمية تربط طالبي مياه الشرب بسائقي صهاريج المياه المعتمدين والمستقلين. يتم تنفيذ عمليات التعبئة والتفريغ وفق الإجراءات القياسية لسلامة نقل المياه الصالحة للشرب.'
                : 'The Nabaa provides a digital platform coordinating potable water tanker delivery between customers and verified drivers. Pumping and unloading procedures follow established standards for sanitary drinking water.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '2. التزامات العميل وجاهزية الخزان' : '2. Customer Obligations & Tank Accessibility'}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <strong className="text-white">{language === 'ar' ? 'سعة الخزان الاستيعابية:' : 'Tank Capacity:'}</strong>{' '}
                {language === 'ar'
                  ? 'يتحمل العميل مسؤولية التأكد من أن سعة الخزان لديه كافية لاستيعاب كمية المياه المطلوبة بالكامل (10، 19، أو 32 طن) لمنع فيضان المياه.'
                  : 'The customer is responsible for ensuring their storage tank has sufficient capacity to receive the full ordered payload (10T, 19T, 32T) without overflow.'}
              </li>
              <li>
                <strong className="text-white">{language === 'ar' ? 'إمكانية وصول الصهريج:' : 'Road & Gate Accessibility:'}</strong>{' '}
                {language === 'ar'
                  ? 'يجب أن يكون موقع التوصيل قابلاً لدخول الصهريج بدون عوائق مرورية حادة، مع إمكانية مد الخرطوم لمحبس الخزان.'
                  : 'The delivery site must allow safe truck entry and maneuvering, with unobstructed ground or valve access for the reach hose.'}
              </li>
              <li>
                <strong className="text-white">{language === 'ar' ? 'التواجد أثناء التفريغ:' : 'On-Site Presence:'}</strong>{' '}
                {language === 'ar'
                  ? 'يلتزم العميل أو من ينوب عنه بالتواجد أو فتح مدخل الخزان لتأكيد استلام المياه ومطابقة التفريغ.'
                  : 'The customer or an authorized representative must ensure the tank inlet valve is accessible upon tanker arrival.'}
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '3. معايير جودة المياه ونظافة الصهريج' : '3. Water Potability & Quality Standard'}
            </h2>
            <p>
              {language === 'ar'
                ? 'تتم تعبئة مياه الشرب المحلاة حصرياً من محطات الأشياب وتوزيع المياه الرسمية المعتمدة الخاضعة للفحص المخبري الدوري، ويشترط في صهاريج السائقين نظافة الخزانات والمضخات والخراطيم.'
                : 'All drinking water payloads are sourced exclusively from authorized municipal filling stations subject to sanitary inspection. Drivers must maintain clean tanks, sanitary seals, and food-grade discharge hoses.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '4. سياسة الإلغاء والتعديل' : '4. Cancellation & Order Modification'}
            </h2>
            <p>
              {language === 'ar'
                ? 'يمكن للعميل إلغاء الطلب مجاناً طالما كان في حالة "قيد المراجعة" وقبل تحرك الصهريج من محطة التعبئة. في حال تحرك الصهريج واقترابه من الموقع، قد تنطبق رسوم انتقال رمزية لتغطية تكاليف الوقود للسائق.'
                : 'Customers may cancel an order free of charge prior to driver dispatch from the water station. If cancellation occurs after the tanker has arrived in the immediate vicinity, a nominal transit fee may apply.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '5. خدمة الدعم وحل الشكاوى' : '5. Customer Support & Dispute Resolution'}
            </h2>
            <p>
              {language === 'ar'
                ? 'في حال وجود أي ملاحظة على جودة التوصيل أو الكمية أو تعامل السائق، يمكن تقديم بلاغ مباشر عبر خدمة العملاء أو البريد الإلكتروني thenabaatankers@gmail.com ويتم التعامل مع البلاغ فوراً.'
                : 'For any issues regarding quantity, driver conduct, or pump reach, report immediately to our care team or email thenabaatankers@gmail.com for prompt resolution.'}
            </p>
          </section>

        </div>

      </div>
    </>
  );
};
