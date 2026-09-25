import React from 'react';
import { 
  Droplets, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  ArrowRight,
  Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

export const AboutUsPage: React.FC = () => {
  const { isRTL, language } = useLanguage();

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'من نحن | صهاريج نبع' : 'About Us | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'تعرف على صهاريج نبع: منصة رقمية سعودية متخصصة في توريد مياه الشرب بالصهاريج عبر ربط العملاء بسائقي الصهاريج المعتمدين.'
            : 'Learn about The Nabaa: a dedicated digital water-tanker delivery system connecting customers with drivers and clean tankers in Saudi Arabia.'
        }
        canonicalPath={language === 'ar' ? '/ar/about-us' : '/about-us'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'من نحن' : 'About Us', path: language === 'ar' ? '/ar/about-us' : '/about-us' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <Droplets className="w-4 h-4" />
            <span>{language === 'ar' ? 'عن صهاريج نبع' : 'About The Nabaa'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'توريد المياه، برؤية رقمية موثوقة' : 'Water Delivery, Built on Reliability'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'نعمل على تسهيل حصول المنازل والمشاريع على مياه الشرب النقية عبر صهاريج معتمدة وبإشراف رقمي يضمن سرعة التوصيل ووضوح الأسعار.'
              : 'The Nabaa provides water-tanker delivery through a digital ordering and delivery system, connecting customer requests directly with available drivers and tankers.'}
          </p>
        </div>

        {/* Section 1: Who We Are & What We Do */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-6">
          <h2 className="text-2xl font-bold text-white font-display">
            {language === 'ar' ? 'من هي صهاريج نبع وماذا نقدم؟' : 'Who We Are & What We Do'}
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              {language === 'ar'
                ? 'صهاريج نبع هي منصة تشغيلية لتوصيل مياه الشرب عبر الصهاريج في المملكة العربية السعودية. نوفر نظاماً رقمياً يمكن العملاء من طلب كميات المياه التي يحتاجونها، وفي الوقت نفسه يتيح لسائقي الصهاريج استلام طلبات التوصيل وإنجازها بسهولة.'
                : 'The Nabaa is a dedicated water delivery operation based in Saudi Arabia. We provide water-tanker delivery to customers through our digital ordering platform, while independent drivers and tanker partners utilize the driver application to receive, navigate, and complete delivery requests.'}
            </p>
            <p>
              {language === 'ar'
                ? 'لسنا شركة لبيع البرمجيات أو الاشتراكات لشركات أخرى؛ بل التكنولوجيا التي طورناها هي المحرك التقني لعمليات التوصيل الميدانية الخاصة بنا، لضمان خدمة عملاء فائقة وسرعة استجابة استثنائية.'
                : 'We are not a SaaS software vendor selling software subscriptions to third-party water companies. The digital platform we built is the proprietary technology that powers our own direct water delivery operations, ensuring operational speed and transparent service.'}
            </p>
          </div>
        </div>

        {/* Section 2: The Water Delivery Service & The Role of Technology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white font-display">
              {language === 'ar' ? 'خدمة توصيل المياه' : 'The Water Delivery Service'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {language === 'ar'
                ? 'تعتبر المياه شرياناً أساسياً للحياة اليومية. تهدف خدمتنا إلى معالجة نقص المياه الطارئ أو تلبية الاحتياجات الدورية للفلل، المباني السكنية، والمشاريع في وقت قياسي وبأعلى معايير النقاء.'
                : 'Fresh water is essential infrastructure. Our service directly solves emergency water shortages and supplies regular refills for residential villas, buildings, and worksites with certified potable water.'}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white font-display">
              {language === 'ar' ? 'دور التكنولوجيا في نبع' : 'The Role of Technology'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {language === 'ar'
                ? 'استبدلنا الاتصالات العشوائية والانتظار غير المعلوم بنظام رقمي متطور يحدد موقع العميل على الخريطة، يوجه أقرب صهريج، يعرض وقت الوصول التقديري، ويوثق إتمام التعبئة.'
                : 'We replaced unstructured phone calls and unverified arrival times with digital geocoding, automated driver matching, live GPS telemetry, and verified pumping milestones.'}
            </p>
          </div>

        </div>

        {/* Section 3: The Customer Experience & The Driver Network */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white font-display">
            {language === 'ar' ? 'تجربة العميل وشبكة السائقين' : 'Customer Experience & Driver Network'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-bold text-white text-base">
                {language === 'ar' ? 'تجربة العميل' : 'Customer Experience'}
              </h4>
              <p className="leading-relaxed">
                {language === 'ar'
                  ? 'بساطة الطلب في 3 نقرات: اختيار السعة (10 أو 19 أو 32 طن)، تثبيت الموقع، واختيار موعد الوصول الفوري أو المجدول مع وضوح السعر الإجمالي والدفع الإلكتروني الموثق.'
                  : 'Effortless 3-step ordering: select capacity (10T, 19T, 32T), confirm pin location, and schedule arrival with transparent pricing and secure online payments.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-base">
                {language === 'ar' ? 'شبكة السائقين والشركاء' : 'Driver & Tanker Network'}
              </h4>
              <p className="leading-relaxed">
                {language === 'ar'
                  ? 'نوفر لسائقي الصهاريج منصة عمل رقمية عادلة تضمن لهم دخلاً مستمراً بعمولات واضحة وتحويلات بنكية منتظمة، مع دعم فني مستمر لتسهيل وصولهم لمواقع العملاء.'
                  : 'We empower tanker drivers with a reliable work platform featuring fair per-trip commissions, an in-app wallet, and transparent weekly bank settlements.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: The Company's Approach */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-4 text-center">
          <h3 className="text-2xl font-bold text-white font-display">
            {language === 'ar' ? 'منهجيتنا في العمل' : "The Company's Approach"}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'نؤمن بالشفافية والالتزام العملي. نركز على جودة المياه ونظافة الصهاريج وسرعة التوصيل بدلاً من الوعود التسويقية غير الواقعية. هدفنا بناء ثقة دائمة مع كل قطرة ماء نوردها.'
              : 'We believe in practical reliability and transparency. We focus on clean drinking water standards, properly calibrated tanks, and punctual delivery rather than promotional hype. Our goal is earning customer trust on every dispatch.'}
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/service-areas"
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-colors"
            >
              {language === 'ar' ? 'استعرض المناطق المخدومة' : 'Explore Service Areas'}
            </Link>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
            >
              {language === 'ar' ? 'تواصل معنا مباشرة' : 'Contact Our Team'}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
