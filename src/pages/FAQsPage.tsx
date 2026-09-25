import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Truck, 
  MapPin, 
  Smartphone, 
  Info,
  Droplets
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../components/Link';

export const FAQsPage: React.FC = () => {
  const { isRTL, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Structured FAQ data strictly matching the requested categories and questions
  const faqs = useMemo(() => [
    // General Category
    {
      category: 'general',
      categoryName: language === 'ar' ? 'أسئلة عامة' : 'General',
      question: language === 'ar' ? 'ما هي منصة صهاريج نبع؟' : 'What is The Nabaa?',
      answer: language === 'ar'
        ? 'صهاريج نبع هي منصة سعودية متخصصة في توريد مياه الشرب النقية عبر الصهاريج، تربط العملاء بسائقي الصهاريج المعتمدين من خلال تطبيق رقمي يضمن سهولة الطلب وسرعة الوصول.'
        : 'The Nabaa is a specialized digital water delivery platform in Saudi Arabia connecting customers needing clean tanker water with verified drivers through an easy mobile ordering system.'
    },
    {
      category: 'general',
      categoryName: language === 'ar' ? 'أسئلة عامة' : 'General',
      question: language === 'ar' ? 'ماذا توفر صهاريج نبع؟' : 'What does The Nabaa provide?',
      answer: language === 'ar'
        ? 'نوفر صهاريج مياه شرب محلاة ونقية بأحجام 10 طن و19 طن و32 طن، مجهزة بمضخات ضغط وخراطيم ممتدة، مع نظام تتبع GPS ودفع إلكتروني موثوق.'
        : 'We provide certified potable water tankers in 10-ton, 19-ton, and 32-ton capacities, equipped with booster pumps, extended reach hoses, live GPS tracking, and secure digital payments.'
    },
    {
      category: 'general',
      categoryName: language === 'ar' ? 'أسئلة عامة' : 'General',
      question: language === 'ar' ? 'كيف تعمل خدمة توصيل المياه في نبع؟' : 'How does The Nabaa water delivery service work?',
      answer: language === 'ar'
        ? 'يطلب العميل المياه ويحدد موقعه وسعة الصهريج، يستلم أقرب سائق متاح الطلب ويتوجه لمحطة التعبئة ثم إلى موقع العميل لتفريغ المياه بأمان وتأكيد التسليم رقمياً.'
        : 'Customers order water and select their location and tanker size; an available nearby driver accepts the dispatch, fills from a certified station, delivers to the customer, and confirms completion.'
    },

    // Customers Category
    {
      category: 'customers',
      categoryName: language === 'ar' ? 'العملاء' : 'Customers',
      question: language === 'ar' ? 'كيف يمكنني طلب صهريج ماء؟' : 'How can I order water?',
      answer: language === 'ar'
        ? 'يمكنك طلب صهريج ماء مباشرة عبر زر "طلب صهريج ماء" في الموقع الإلكتروني، أو من خلال تحميل تطبيق نبع وتحديد حجم الصهريج وموقعك وخيار التوصيل الفوري أو المجدول.'
        : 'You can order directly using the "Order Water" button on our website or by opening The Nabaa mobile app, selecting your tanker size, and pinning your delivery location.'
    },
    {
      category: 'customers',
      categoryName: language === 'ar' ? 'العملاء' : 'Customers',
      question: language === 'ar' ? 'كيف أقوم بتحميل تطبيق نبع؟' : 'How do I download the app?',
      answer: language === 'ar'
        ? 'يمكنك زيارة صفحة "تحميل التطبيق" في الموقع وتحميل التطبيق مجاناً لأجهزة آيفون من App Store ولأجهزة أندرويد من Google Play.'
        : 'Visit our "Download App" page to get the official app for free from the Apple App Store for iOS or Google Play Store for Android.'
    },
    {
      category: 'customers',
      categoryName: language === 'ar' ? 'العملاء' : 'Customers',
      question: language === 'ar' ? 'كيف أحدد موقع التوصيل؟' : 'How do I select my delivery location?',
      answer: language === 'ar'
        ? 'عند الطلب، يتيح لك التطبيق تفعيل الـ GPS لتحديد موقعك الحالي بدقة، أو البحث باسم الحي والشارع، أو تحريك المؤشر على الخريطة لتثبيت بوابة الخزان.'
        : 'During checkout, enable GPS to pinpoint your exact coordinates, search by street/district name, or drag the map pin directly over your tank inlet gate.'
    },
    {
      category: 'customers',
      categoryName: language === 'ar' ? 'العملاء' : 'Customers',
      question: language === 'ar' ? 'كيف يمكنني تتبع طلبي؟' : 'How can I track my order?',
      answer: language === 'ar'
        ? 'يوفر التطبيق خريطة تتبع حية تعرض موقع الصهريج في الوقت الفعلي، اسم ورقم السائق، والوقت المتبقي المقدر للوصول (ETA).'
        : 'The app features a live map showing the real-time tanker location, driver contact details, tanker license ID, and an accurate arrival countdown.'
    },
    {
      category: 'customers',
      categoryName: language === 'ar' ? 'العملاء' : 'Customers',
      question: language === 'ar' ? 'كيف تتم عملية تفريغ المياه عند وصول الصهريج؟' : 'How does water delivery work on site?',
      answer: language === 'ar'
        ? 'يقوم السائق بمد خرطوم التفريغ المجهز بمحبس صحي إلى فتحة الخزان الأرضي أو العلوي، وتشغيل مضخة الضغط العالي للتفريغ في وقت يتراوح بين 8 إلى 15 دقيقة.'
        : 'The driver rolls out the sanitary reach hose to your ground or roof tank inlet, powers the high-pressure booster pump, and fills the tank in approximately 8 to 15 minutes.'
    },

    // Drivers Category
    {
      category: 'drivers',
      categoryName: language === 'ar' ? 'السائقين' : 'Drivers',
      question: language === 'ar' ? 'كيف يمكنني الانضمام كسائق في صهاريج نبع؟' : 'How can I join The Nabaa?',
      answer: language === 'ar'
        ? 'يمكنك التقديم عبر صفحة "انضم كسائق" بتعبئة بياناتك ورقم جوالك ورقم الهوية وسعة صهريجك. سيتواصل معك مشرف الأسطول للتحقق وتفعيل حسابك على تطبيق السائق.'
        : 'Submit your details on our "Join as Driver" page with your national ID/Iqama, mobile number, and tanker capacity. Our team verifies your documents and activates your account.'
    },
    {
      category: 'drivers',
      categoryName: language === 'ar' ? 'السائقين' : 'Drivers',
      question: language === 'ar' ? 'كيف يستقبل السائق طلب التوصيل؟' : 'How does a driver receive an order?',
      answer: language === 'ar'
        ? 'عندما يكون السائق مفعلاً لحالة "متاح" في التطبيق، يتلقى إشعاراً فورياً بطلب التوصيل الأقرب إليه موضحاً فيه المسافة، الحي، وسعة الصهريج المطلوبة.'
        : 'When toggled "ONLINE" in the driver app, notifications appear with an order countdown displaying the pickup distance, destination district, and requested tanker volume.'
    },
    {
      category: 'drivers',
      categoryName: language === 'ar' ? 'السائقين' : 'Drivers',
      question: language === 'ar' ? 'كيف يقبل السائق طلب التوصيل؟' : 'How does the driver accept a delivery?',
      answer: language === 'ar'
        ? 'بالنقر على زر "قبول"، يبدأ التوجيه الملاحي الفوري نحو موقع العميل، مع إمكانية التواصل المباشر هاتفياً أو عبر واتساب للتنسيق.'
        : 'Tapping the "Accept" button confirms the job, engages turn-by-turn map directions to the customer, and provides direct contact options.'
    },
    {
      category: 'drivers',
      categoryName: language === 'ar' ? 'السائقين' : 'Drivers',
      question: language === 'ar' ? 'أين يمكن للسائق الاطلاع على سجل رحلاته؟' : 'Where can drivers view their delivery history?',
      answer: language === 'ar'
        ? 'يحتوي تطبيق السائق على شاشة مخصصة بعنوان "سجل الرحلات" تعرض جميع المهام المكتملة، التواريخ، سعات الصهاريج المفرغة، والعمولات المكتسبة.'
        : 'The driver app includes a dedicated "Trip History" tab recording completed dispatches, delivery timestamps, tanker volumes, and earned commissions.'
    },
    {
      category: 'drivers',
      categoryName: language === 'ar' ? 'السائقين' : 'Drivers',
      question: language === 'ar' ? 'كيف يتم احتساب العمولات وتحويل المستحقات؟' : 'How are commissions/payouts handled?',
      answer: language === 'ar'
        ? 'تضاف العمولة المحددة فوراً إلى "محفظة السائق" بعد تأكيد كل تفريغ ناجح، ويتم تحويل الرصيد المتاح أسبوعياً للحساب البنكي المسجل باسم السائق.'
        : 'Commissions credit instantly to the driver wallet upon verified delivery completion, and available balances are transferred weekly to the driver local bank account.'
    },

    // Service Areas Category
    {
      category: 'areas',
      categoryName: language === 'ar' ? 'المناطق المخدومة' : 'Service Areas',
      question: language === 'ar' ? 'أين توصل صهاريج نبع حالياً؟' : 'Where does The Nabaa deliver?',
      answer: language === 'ar'
        ? 'تغطي صهاريج نبع حالياً أحياء مدينة الرياض المؤكدة، وخاصة أحياء شمال الرياض (الملقا، النخيل، الياسمين، النرجس، حطين، الصحافة)، ووسط وشرق الرياض.'
        : 'The Nabaa currently operates in confirmed Riyadh metropolitan zones, specifically North Riyadh (Al-Malqa, Al-Nakheel, Al-Yasmin, Al-Narjis, Hittin, Al-Sahafa), Central, and East sectors.'
    },
    {
      category: 'areas',
      categoryName: language === 'ar' ? 'المناطق المخدومة' : 'Service Areas',
      question: language === 'ar' ? 'كيف أتحقق مما إذا كان حيي مشمولاً بالتغطية؟' : 'How can I check whether my area is covered?',
      answer: language === 'ar'
        ? 'يمكنك زيارة صفحة "المناطق المخدومة" واستخدام أداة التحقق السريع بالبحث عن اسم حيك، أو إدخال موقعك في شاشة الطلب لمعرفة حالة التوصيل الفوري.'
        : 'Visit our "Service Areas" page and use the instant district checker tool, or enter your delivery coordinates in the ordering flow to verify active dispatch.'
    },

    // Mobile App Category
    {
      category: 'app',
      categoryName: language === 'ar' ? 'التطبيقات' : 'Mobile Apps',
      question: language === 'ar' ? 'من أين يمكنني تحميل تطبيق صهاريج نبع؟' : 'Where can I download the app?',
      answer: language === 'ar'
        ? 'التطبيق متاح للتحميل المجاني المباشر من خلال متجري Google Play وApple App Store عبر الروابط الموجودة في صفحة "تحميل التطبيق".'
        : 'The app is available for direct free download from the Google Play Store and Apple App Store via our Download App portal.'
    },
    {
      category: 'app',
      categoryName: language === 'ar' ? 'التطبيقات' : 'Mobile Apps',
      question: language === 'ar' ? 'هل التطبيق متوفر لأجهزة أندرويد؟' : 'Is the app available for Android?',
      answer: language === 'ar'
        ? 'نعم، يتوفر تطبيق نبع (للعميل وللسائق) لجميع هواتف أندرويد التي تعمل بالإصدار Android 9.0 فما فوق.'
        : 'Yes, both the Customer App and Driver App are fully supported on Android smartphones running Android 9.0 or higher.'
    },
    {
      category: 'app',
      categoryName: language === 'ar' ? 'التطبيقات' : 'Mobile Apps',
      question: language === 'ar' ? 'هل التطبيق متوفر لأجهزة آيفون (iOS)؟' : 'Is the app available for iPhone?',
      answer: language === 'ar'
        ? 'نعم، التطبيق متاح على متجر أبل App Store لجميع أجهزة iPhone التي تعمل بنظام iOS 15.0 أو أحدث.'
        : 'Yes, The Nabaa application is available on the Apple App Store for iPhones running iOS 15.0 or later.'
    }
  ], [language]);

  // Filter FAQs based on active category and search input
  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  // Valid Schema.org FAQPage structured data that matches the visible questions
  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      }
    }))
  }), [faqs]);

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'الأسئلة الشائعة حول توريد المياه | صهاريج نبع' : 'Frequently Asked Questions | The Nabaa Tankers'}
        description={
          language === 'ar'
            ? 'إجابات شاملة عن كافة الأسئلة المتكررة حول صهاريج نبع: كيفية الطلب، تطبيق العميل، تطبيق السائق، العمولات، ومناطق التغطية في الرياض.'
            : 'Comprehensive FAQs for The Nabaa: ordering water tankers, customer and driver apps, commission payouts, and confirmed Riyadh coverage.'
        }
        canonicalPath={language === 'ar' ? '/ar/faqs' : '/faqs'}
        schema={faqSchema}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs', path: language === 'ar' ? '/ar/faqs' : '/faqs' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'ar' ? 'مركز المساعدة والاستفسارات' : 'Help & Answers'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'ar'
              ? 'إجابات واضحة ومباشرة عن جميع تساؤلاتك حول خدمة توصيل صهاريج المياه وتطبيقات نبع.'
              : 'Clear and verified answers to questions about The Nabaa water delivery platform, mobile apps, and driver partnerships.'}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث في الأسئلة (مثال: طريقة الطلب، السائقين، التطبيق)...' : 'Search questions (e.g. how to order, driver wallet, app)...'}
            className="w-full py-3 px-11 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white text-sm focus:outline-none"
          />
          <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`} />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', name: language === 'ar' ? 'جميع الأسئلة' : 'All Questions' },
            { id: 'general', name: language === 'ar' ? 'أسئلة عامة' : 'General' },
            { id: 'customers', name: language === 'ar' ? 'العملاء' : 'Customers' },
            { id: 'drivers', name: language === 'ar' ? 'السائقين' : 'Drivers' },
            { id: 'areas', name: language === 'ar' ? 'المناطق المخدومة' : 'Service Areas' },
            { id: 'app', name: language === 'ar' ? 'التطبيقات' : 'Mobile Apps' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-sm">
              {language === 'ar' ? 'لم يتم العثور على أسئلة تطابق بحثك.' : 'No questions matched your search query.'}
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen 
                      ? 'bg-[#09152b] border-cyan-500/40 shadow-lg shadow-cyan-500/5' 
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0">
                        ?
                      </span>
                      <span className="font-bold text-white text-sm sm:text-base font-display">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 animate-in fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Assistance Callout */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl font-bold text-white font-display">
            {language === 'ar' ? 'هل لديك سؤال آخر لم تجد إجابته هنا؟' : 'Have a question not listed here?'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
            {language === 'ar'
              ? 'فريق الدعم الفني وخدمة العملاء في صهاريج نبع متاح على مدار الساعة لمساعدتك.'
              : 'Our customer support and operations team is available around the clock to assist you.'}
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <span>{language === 'ar' ? 'تواصل مع فريق الدعم' : 'Contact Support'}</span>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};
