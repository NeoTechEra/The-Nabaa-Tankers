import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  const { isRTL, language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'سياسة الخصوصية | صهاريج نبع' : 'Privacy Policy | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'سياسة الخصوصية وحماية البيانات في صهاريج نبع: كيفية جمع واستخدام بيانات العملاء وسائقي الصهاريج وحفظ معلومات المواقع.'
            : 'The Nabaa Privacy Policy: transparent guidelines on customer data protection, driver location data, and communication security.'
        }
        canonicalPath={language === 'ar' ? '/ar/privacy-policy' : '/privacy-policy'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy', path: language === 'ar' ? '/ar/privacy-policy' : '/privacy-policy' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Lock className="w-4 h-4" />
            <span>{language === 'ar' ? 'حماية البيانات والخصوصية' : 'Data Protection'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-slate-400 text-xs font-mono">
            {language === 'ar' ? 'آخر تحديث: سبتمبر 2026' : 'Last Updated: September 2026'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '1. التزامنا بحماية الخصوصية' : '1. Our Privacy Commitment'}
            </h2>
            <p>
              {language === 'ar'
                ? 'تلتزم منصة صهاريج نبع بحماية خصوصية كافة المستخدمين (العملاء طالبي المياه، وسائقي وشركاء الصهاريج). توضح هذه السياسة طبيعة البيانات التي نجمعها، ولماذا نحتاجها، وكيف يتم حمايتها وفق الأنظمة السارية في المملكة العربية السعودية.'
                : 'The Nabaa is committed to protecting the privacy of all platform users, including customers ordering water and independent tanker drivers. This policy describes how we collect, handle, and protect your information.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '2. البيانات التي يتم جمعها' : '2. Information We Collect'}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <strong className="text-white">{language === 'ar' ? 'بيانات العميل:' : 'Customer Information:'}</strong>{' '}
                {language === 'ar'
                  ? 'رقم الجوال للتحقق، الاسم، عنوان التوصيل وإحداثيات الموقع الجغرافي (GPS) لتوجيه الصهريج، وسجل الطلبات.'
                  : 'Mobile phone number for OTP verification, name, delivery gate coordinates (GPS), and order history.'}
              </li>
              <li>
                <strong className="text-white">{language === 'ar' ? 'بيانات السائق الشريك:' : 'Driver Partner Information:'}</strong>{' '}
                {language === 'ar'
                  ? 'الاسم، رقم الهوية أو الإقامة، بيانات رخصة القيادة، رقم الآيبان البنكي لتحويل العمولات، وموقع الصهريج أثناء ساعات الاتصال والرحلات.'
                  : 'Name, national ID / Iqama, heavy driving license details, bank IBAN for weekly commission payouts, and live vehicle telemetry during dispatches.'}
              </li>
              <li>
                <strong className="text-white">{language === 'ar' ? 'البيانات المالية:' : 'Payment Information:'}</strong>{' '}
                {language === 'ar'
                  ? 'تتم معالجة المدفوعات الإلكترونية عبر بوابات دفع بنكية معتمدة ومشفرة. لا تقوم صهاريج نبع بتخزين أرقام البطاقات الائتمانية الكاملة أو رموز الأمان (CVV).'
                  : 'Online payments are processed securely through certified banking payment gateways. The Nabaa does not store raw credit card numbers or CVV codes.'}
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '3. استخدام بيانات الموقع الجغرافي (GPS)' : '3. Use of Geolocation (GPS) Data'}
            </h2>
            <p>
              {language === 'ar'
                ? 'نستخدم بيانات الموقع الجغرافي الدقيقة حصرياً لتمكين سائق الصهريج من الوصول إلى خزان العميل في الوقت المحدد، واحتساب المسافة المقطوعة بدقة، وعرض مسار الرحلة الحية للعميل أثناء التوصيل.'
                : 'Precise GPS coordinates are utilized solely to navigate tankers to customer tanks, calculate driving distances accurately, and display real-time arrival progress.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '4. مشاركة البيانات' : '4. Data Sharing & Disclosure'}
            </h2>
            <p>
              {language === 'ar'
                ? 'لا نبيع أو نؤجر أي بيانات شخصية لأي طرف ثالث لأغراض التسويق. يتم مشاركة العنوان ورقم الهاتف فقط بين العميل والسائق المعين للطلب لغرض إتمام عملية التوصيل وتنسيق تفريغ المياه.'
                : 'We never sell or lease personal information to third parties. Contact details and delivery locations are shared strictly between the customer and assigned driver to fulfill the active dispatch.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">
              {language === 'ar' ? '5. التواصل بشأن الخصوصية' : '5. Contact for Privacy Inquiries'}
            </h2>
            <p>
              {language === 'ar'
                ? 'إذا كان لديك أي سؤال حول سياسة الخصوصية أو بياناتك المحفوظة لدينا، يمكنك التواصل مع مسؤول الخصوصية عبر البريد الإلكتروني: thenabaatankers@gmail.com'
                : 'For any privacy-related questions or data deletion requests, contact our privacy compliance team at thenabaatankers@gmail.com.'}
            </p>
          </section>

        </div>

      </div>
    </>
  );
};
