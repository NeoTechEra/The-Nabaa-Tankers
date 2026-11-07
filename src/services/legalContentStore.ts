export interface PolicyBullet {
  id: string;
  labelAr: string;
  labelEn: string;
  textAr: string;
  textEn: string;
}

export interface PolicySection {
  id: string;
  order: number;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  bullets?: PolicyBullet[];
  badgeAr?: string;
  badgeEn?: string;
  isActive: boolean;
  updatedAt?: string;
}

export type LegalDocId = 
  | 'customer_privacy' 
  | 'driver_privacy' 
  | 'customer_terms' 
  | 'driver_terms';

export interface LegalDocument {
  id: LegalDocId;
  targetAudience: 'customer' | 'driver';
  type: 'privacy' | 'terms';
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  lastUpdatedAr: string;
  lastUpdatedEn: string;
  introAr: string;
  introEn: string;
  contactEmail: string;
  contactPhone: string;
  sections: PolicySection[];
}

const STORAGE_KEY_PREFIX = 'nabaa_legal_doc_v3_';
export const LEGAL_CONTENT_EVENT = 'nabaa_legal_content_updated';

// 1. CUSTOMER PRIVACY POLICY - THE NABAA TANKERS FOR CUSTOMERS
export const INITIAL_CUSTOMER_PRIVACY: LegalDocument = {
  id: 'customer_privacy',
  targetAudience: 'customer',
  type: 'privacy',
  titleAr: 'سياسة الخصوصية لعملاء صهاريج نبع لمياه الشرب',
  titleEn: 'The Nabaa Tankers Customer Privacy Policy',
  taglineAr: 'حماية بيانات العملاء، وموقع خزان المياه، وسجل الطلبات، وتشفير المدفوعات وفق نظام حماية البيانات الشخصية السعودي (PDPL)',
  taglineEn: 'Protecting residential & commercial customer data, tank GPS coordinates, delivery logs, and payment encryption under Saudi PDPL regulations',
  lastUpdatedAr: 'أكتوبر 2026',
  lastUpdatedEn: 'October 2026',
  introAr: 'تلتزم منصة صهاريج نبع (The Nabaa Tankers) بأعلى معايير حماية الخصوصية والأمان السيبراني لعملائنا الكرام من طالبي صهاريج مياه الشرب النقية. توضح هذه الوثيقة البيانات الشخصية التي نجمعها، وكيفية استخدام موقع الخزان بدقة متناهية لتوجيه الناقل المعتمد، وبروتوكولات تشفير المدفوعات، وحقوقك النظامية الكاملة وفق نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي في المملكة العربية السعودية.',
  introEn: 'The Nabaa Tankers is committed to the highest standards of data privacy and cybersecurity for our valued customers requesting potable drinking water deliveries across Riyadh and the Kingdom of Saudi Arabia. This document details the personal data we collect, how your tank GPS coordinates are used exclusively for dispatch routing, payment encryption protocols, and your statutory rights under the Saudi Personal Data Protection Law (PDPL).',
  contactEmail: 'thenabaatankers@gmail.com',
  contactPhone: '+966 53 043 4010',
  sections: [
    {
      id: 'cpriv-1',
      order: 1,
      badgeAr: 'نطاق السياسة والهوية',
      badgeEn: 'Scope & Entity Identity',
      titleAr: '1. من نحن ونطاق سريان سياسة الخصوصية',
      titleEn: '1. Who We Are & Policy Scope',
      contentAr: 'منصة صهاريج نبع (The Nabaa Tankers) هي منصة رقمية متخصصة في وساطة وتوريد مياه الشرب المحلاة والنقية عبر صهاريج معتمدة (سعات 10 طن، 19 طن، و32 طن) في مدينة الرياض ومناطق المملكة. تنطبق هذه السياسة على كافة العملاء الذين يستخدمون موقعنا الإلكتروني، أو تطبيقات الهواتف الذكية (iOS و Android)، أو قنوات الطلب المباشرة عبر الهاتف وواتساب.',
      contentEn: 'The Nabaa Tankers is an on-demand digital brokerage platform supplying certified potable drinking water via licensed tankers (10-ton, 19-ton, and 32-ton capacities) across Riyadh and surrounding regions in Saudi Arabia. This privacy policy applies to all customers interacting with our web application, mobile apps (iOS & Android), and direct customer ordering channels via phone or WhatsApp.',
      bullets: [
        {
          id: 'cp1-b1',
          labelAr: 'فئات العملاء المشمولين:',
          labelEn: 'Covered Customer Categories:',
          textAr: 'المنازل والفلل السكنية، المجمعات السكنية، الاستراحات، المطاعم، المقاهي، والفنادق والمنشآت التجارية التي تطلب مياه الشرب.',
          textEn: 'Residential villas, residential compounds, retreats, restaurants, cafés, hotels, and commercial facilities ordering potable water.'
        },
        {
          id: 'cp1-b2',
          labelAr: 'الجهة المسؤولة عن التحكم بالبيانات:',
          labelEn: 'Data Controller:',
          textAr: 'إدارة منصة صهاريج نبع، الرياض، المملكة العربية السعودية، المسؤولة عن معالجة وحفظ البيانات الشخصية وفق الأنظمة السارية.',
          textEn: 'The management of The Nabaa Tankers, Riyadh, Kingdom of Saudi Arabia, acting as the primary Data Controller under applicable laws.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-2',
      order: 2,
      badgeAr: 'البيانات المجمعة',
      badgeEn: 'Data We Collect',
      titleAr: '2. البيانات الشخصية التي نجمعها من العميل',
      titleEn: '2. Personal Data We Collect From Customers',
      contentAr: 'نجمع فقط الحد الأدنى من البيانات الضرورية لإتمام طلب توصيل مياه الشرب وضمان وصول الشاحنة بدقة وأمان:',
      contentEn: 'We collect only the minimum necessary information required to verify your customer account, process payments, and dispatch potable water tankers safely to your location:',
      bullets: [
        {
          id: 'cp2-b1',
          labelAr: 'بيانات الهوية والتواصل:',
          labelEn: 'Identity & Contact Data:',
          textAr: 'الاسم الكامل أو اسم العقار، ورقم الجوال النشط للتحقق عبر رمز التحقق لمرة واحدة (OTP)، والبريد الإلكتروني للفواتير الضريبية.',
          textEn: 'Full name or property label, active mobile phone number for secure One-Time Password (OTP) verification, and optional email for electronic tax invoices.'
        },
        {
          id: 'cp2-b2',
          labelAr: 'موقع الخزان والعنوان الجغرافي (GPS):',
          labelEn: 'Tank GPS & Site Details:',
          textAr: 'إحداثيات موقع العقار الدقيقة عبر الخرائط، واسم الحي والشارع بالرياض، ونوع الخزان (أرضي أو علوي)، وملاحظات طول خراطيم الضخ (مثل 40 إلى 80 متراً) وتعليمات الدخول للبوابة.',
          textEn: 'Exact GPS pin of customer tank access point, neighborhood and district in Riyadh, tank location type (ground or rooftop tank), hose extension requirements (40-80m), and gate entry instructions.'
        },
        {
          id: 'cp2-b3',
          labelAr: 'تفاصيل الطلبات والمشتريات:',
          labelEn: 'Order & Supply Records:',
          textAr: 'سعة الصهريج المطلوبة (10، 19، أو 32 طن)، وتاريخ ووقت التوريد المفضل (فوري أو مجدول)، ومحطة التعبئة (الأشياب)، والفواتير الضريبية المعتمدة من هيئة الزكاة والضريبة والجمارك (ZATCA).',
          textEn: 'Requested tanker payload capacity (10T, 19T, 32T), delivery timing (on-demand or scheduled), depot source (licensed water stations), and ZATCA-compliant digital tax invoices.'
        },
        {
          id: 'cp2-b4',
          labelAr: 'بيانات الدفع والفوترة:',
          labelEn: 'Payment & Billing Data:',
          textAr: 'طريقة الدفع المختارة (مدى، أبل باي، فيزا، ماستركارد، أو الدفع عند الاستلام). نؤكد أننا لا نحفظ بيانات البطاقات الائتمانية أو رموز الأمان إطلاقاً.',
          textEn: 'Chosen payment method (Mada, Apple Pay, Visa, Mastercard, or Cash on Delivery). We never store raw card numbers or security CVV codes on our servers.'
        },
        {
          id: 'cp2-b5',
          labelAr: 'البيانات الفنية ومعلومات الجهاز:',
          labelEn: 'Technical & Device Telemetry:',
          textAr: 'نوع الجهاز، ونظام التشغيل، وعنوان بروتوكول الإنترنت (IP)، وسجلات الأداء والأخطاء لضمان استقرار التطبيق وتفضيلات اللغة المختارة (العربية / الإنجليزية).',
          textEn: 'Device model, operating system, IP address, crash analytics, performance telemetry, and language preference (Arabic / English).'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-3',
      order: 3,
      badgeAr: 'المسوغ النظامي',
      badgeEn: 'Legal Processing Basis',
      titleAr: '3. المسوغ النظامي وأغراض معالجة البيانات',
      titleEn: '3. Legal Basis & Purposes for Data Processing',
      contentAr: 'تتم معالجة بيانات العميل استناداً إلى الأسس النظامية المنصوص عليها في نظام حماية البيانات الشخصية السعودي (PDPL):',
      contentEn: 'Customer personal data is processed strictly in accordance with recognized lawful grounds under the Saudi Personal Data Protection Law (PDPL):',
      bullets: [
        {
          id: 'cp3-b1',
          labelAr: 'تنفيذ العقد وتقديم خدمة التوريد:',
          labelEn: 'Contractual Performance:',
          textAr: 'ربط طلب العميل بأقرب صهريج متاح، وإرسال مسار التوصيل، وتأكيد وصول كمية المياه المحددة إلى خزان العقار.',
          textEn: 'Matching orders with the closest certified water tanker driver, dispatching transit coordinates, and confirming discharge into your water tank.'
        },
        {
          id: 'cp3-b2',
          labelAr: 'التواصل التشغيلي وإشعارات الحالة:',
          labelEn: 'Operational Notifications:',
          textAr: 'إرسال رسائل التنبيه الفورية عبر الرسائل النصية والواتساب والتطبيق لإشعار العميل بتحرك الصهريج، ووصوله إلى البوابة، وبدء وانتهاء الضخ.',
          textEn: 'Sending real-time order updates via SMS, WhatsApp, and in-app alerts when the tanker departs, arrives at your gate, starts pumping, and concludes delivery.'
        },
        {
          id: 'cp3-b3',
          labelAr: 'الامتثال للأنظمة والرقابة الصحية:',
          labelEn: 'Statutory & Health Compliance:',
          textAr: 'الاحتفاظ بسجلات التوريد لإثبات مصادر مياه الشرب من الأشياب الرسمية، وتقديم الفواتير الإلكترونية المعتمدة نظاماً.',
          textEn: 'Maintaining supply audit logs verifying water sources from licensed municipal stations, and issuing official ZATCA tax invoices.'
        },
        {
          id: 'cp3-b4',
          labelAr: 'تحسين جودة الخدمة ودعم العملاء:',
          labelEn: 'Quality Assurance & Customer Support:',
          textAr: 'استقبال بلاغات العملاء وملاحظاتهم، وتقييم جودة المياه وأداء السائقين لحظر أي ناقل لا يلتزم بالمعايير الصحية الصارمة.',
          textEn: 'Investigating customer inquiries, tracking water clarity satisfaction, and penalizing any driver failing health or punctuality codes.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-4',
      order: 4,
      badgeAr: 'التتبع المباشر و GPS',
      badgeEn: 'Live GPS & Routing',
      titleAr: '4. استخدام إحداثيات موقع الخزان والتتبع الحي للصهريج',
      titleEn: '4. Water Tank Location Pin & Live Tanker Tracking',
      contentAr: 'تتطلب طبيعة شاحنات صهاريج المياه الثقيلة دقة متناهية في تحديد موقع خزان العميل في أحياء الرياض لتجنب ضياع المسارات أو دخول شوارع ضيقة غير ملائمة:',
      contentEn: 'Due to the large footprint of heavy water tankers, precise tank coordinate pinning is essential across Riyadh neighborhoods to prevent wrong turns or impassable street blockages:',
      bullets: [
        {
          id: 'cp4-b1',
          labelAr: 'مشاركة الموقع مع السائق المكلف فقط:',
          labelEn: 'Shared Solely with Assigned Driver:',
          textAr: 'يتم تزويد سائق الصهريج بإحداثيات خزان العميل فقط بعد قبول الطلب وبدء مسار الرحلة، ولا يتاح موقعه لأي سائق آخر غير معني بالطلب.',
          textEn: 'Tank GPS coordinates are revealed to the transporter driver only after the order is officially accepted and en route. No unauthorized drivers have access to your address.'
        },
        {
          id: 'cp4-b2',
          labelAr: 'التتبع الحي للعميل (Live ETA):',
          labelEn: 'Live Customer ETA Map:',
          textAr: 'يوفر التطبيق للعميل تتبعاً مباشراً لمسار شاحنة الصهريج على الخريطة منذ خروجها من محطة التعبئة وحتى وصولها إلى باب المنزل.',
          textEn: 'Customers can monitor the live GPS transit of their assigned tanker on Google Maps from the refill depot to their property gate.'
        },
        {
          id: 'cp4-b3',
          labelAr: 'إغلاق صلاحية الوصول فور انتهاء التوصيل:',
          labelEn: 'Access Revoked Upon Completion:',
          textAr: 'بمجرد تأكيد تفريغ مياه الشرب وإغلاق الطلب، يتوقف وصول السائق للموقع المباشر في تطبيق السائق نهائياً.',
          textEn: 'As soon as water pumping finishes and the order is marked completed, the driver’s navigation access to your location is immediately closed.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-5',
      order: 5,
      badgeAr: 'أمان المدفوعات',
      badgeEn: 'Payment Encryption',
      titleAr: '5. حماية وتشفير المدفوعات الإلكترونية',
      titleEn: '5. Payment Security & Financial Card Protection',
      contentAr: 'تطبق منصة صهاريج نبع أعلى معايير الأمان المالي العالمية لحماية جميع المعاملات النقدية والإلكترونية لعملائنا:',
      contentEn: 'The Nabaa Tankers adheres to gold-standard financial security practices to safeguard all digital water purchases:',
      bullets: [
        {
          id: 'cp5-b1',
          labelAr: 'بوابات دفع معتمدة بتوافق PCI-DSS:',
          labelEn: 'PCI-DSS Level 1 Certified Gateways:',
          textAr: 'تتم كافة عمليات الدفع عبر بوابات سحابية مرخصة من البنك المركزي السعودي (ساما) ومتوافقة مع معيار PCI-DSS لأمان بيانات بطاقات الدفع.',
          textEn: 'All transactions are routed through Saudi Central Bank (SAMA) licensed payment gateways adhering to PCI-DSS Level 1 compliance.'
        },
        {
          id: 'cp5-b2',
          labelAr: 'عدم حفظ بيانات البطاقات المصرفية:',
          labelEn: 'Zero Card Credentials Stored:',
          textAr: 'لا تحتفظ خوادم منصة نبع نهائياً بأرقام البطاقات الائتمانية، أو تاريخ الانتهاء، أو رمز الأمان (CVV). يتم استبدال البيانات برموز رقمية مشفرة (Tokenization).',
          textEn: 'The Nabaa servers never store raw credit card numbers, expiration dates, or CVV codes. Sensitive inputs are tokenized directly with the acquirer bank.'
        },
        {
          id: 'cp5-b3',
          labelAr: 'أبل باي ومدى للدفع المشفر الفوري:',
          labelEn: 'Apple Pay & Mada Support:',
          textAr: 'ندعم الدفع الآمن بلمسة واحدة عبر Apple Pay وشبكة مدى السعودية المشفرة بأعلى تقنيات الحماية الحيوية.',
          textEn: 'Seamless biometric and encrypted one-tap checkouts supported via Apple Pay and the national Mada debit payment network.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-6',
      order: 6,
      badgeAr: 'مشاركة البيانات',
      badgeEn: 'Data Sharing & Disclosure',
      titleAr: '6. مشاركة البيانات والإفصاح لأطراف ثالثة',
      titleEn: '6. Data Sharing, Transporter Disclosure & Non-Sale Policy',
      contentAr: 'تلتزم منصة نبع بسياسة صارمة تمنع بيع أو تأجير بيانات العملاء لأي جهة إعلانية أو تجارية، وتقتصر مشاركة البيانات على ما يلي فقط:',
      contentEn: 'The Nabaa strictly prohibits selling, trading, or leasing customer personal information to third-party advertisers or marketers. Sharing occurs solely under the following parameters:',
      bullets: [
        {
          id: 'cp6-b1',
          labelAr: 'سائقو الصهاريج المعتمدون:',
          labelEn: 'Certified Tanker Transporters:',
          textAr: 'مشاركة الاسم، ورقم الهاتف المؤقت للتنسيق، وموقع الخزان فقط للسائق المنفذ للطلب. يُلزم السائق نظامياً بعدم الاحتفاظ بأي من بيانات العميل بعد انتهاء التوصيل.',
          textEn: 'Sharing customer first name, contact number, and tank location pin strictly with the assigned driver. Drivers are bound by confidentiality clauses.'
        },
        {
          id: 'cp6-b2',
          labelAr: 'مزودو الخدمات التقنية والبنية التحتية:',
          labelEn: 'Infrastructure & SMS Providers:',
          textAr: 'شركات الرسائل النصية المعتمدة (لإرسال رموز التحقق OTP) ومزودو الخرائط السحابية (Google Maps) لإجراء الملاحة الدقيقة.',
          textEn: 'Licensed telecommunication providers for SMS OTP dispatch and Google Maps cloud APIs for turnkey street navigation.'
        },
        {
          id: 'cp6-b3',
          labelAr: 'الجهات الحكومية والرقابية:',
          labelEn: 'Government & Regulatory Authorities:',
          textAr: 'الإفصاح فقط في حال ورود طلب رسمي بموجب أمر قضائي أو متطلبات تنظيمية من وزارة البيئة والمياه والزراعة، أو شركة المياه الوطنية، أو هيئة الزكاة والضريبة والجمارك.',
          textEn: 'Disclosures strictly when compelled by valid legal orders or official statutory requests by Saudi ministries, the National Water Company, or ZATCA.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-7',
      order: 7,
      badgeAr: 'التخزين داخل المملكة',
      badgeEn: 'Local Cloud Hosting',
      titleAr: '7. التخزين السحابي والأمان السيبراني داخل المملكة العربية السعودية',
      titleEn: '7. In-Kingdom Cloud Hosting & Data Retention',
      contentAr: 'امتثالاً لأحكام نظام حماية البيانات الشخصية الصادر في المملكة، يتم حفظ ومعالجة بيانات عملاء منصة صهاريج نبع داخل مراكز بيانات سحابية متطورة ومحمية داخل حدود المملكة العربية السعودية.',
      contentEn: 'In strict compliance with Saudi Personal Data Protection Law provisions regarding cross-border transfers, customer records are hosted and processed within secure enterprise cloud data centers physically located in the Kingdom of Saudi Arabia.',
      bullets: [
        {
          id: 'cp7-b1',
          labelAr: 'التشفير الشامل (Encryption):',
          labelEn: 'End-to-End Encryption:',
          textAr: 'تشفير كافة البيانات أثناء النقل عبر بروتوكولات TLS 1.3 / HTTPS، وتشفير البيانات المحفوظة في قواعد البيانات بخوارزمية AES-256 القياسية.',
          textEn: 'All data in transit is encrypted using TLS 1.3 / HTTPS, while stored database records are secured using AES-256 standard encryption at rest.'
        },
        {
          id: 'cp7-b2',
          labelAr: 'مدة الاحتفاظ بالبيانات:',
          labelEn: 'Data Retention Schedule:',
          textAr: 'نحتفظ ببيانات الحساب طالما كان الحساب نشطاً. يتم حفظ الفواتير الضريبية وسجلات التوريد لمدة 5 سنوات التزاماً بنظام ضريبة القيمة المضافة وهيئة الزكاة.',
          textEn: 'Customer profile data is retained as long as the account remains active. Delivery tax invoices are archived for 5 years in compliance with Saudi ZATCA VAT regulations.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-8',
      order: 8,
      badgeAr: 'حقوق العميل النظامية',
      badgeEn: 'Customer Statutory Rights',
      titleAr: '8. حقوق العميل بموجب نظام حماية البيانات الشخصية (PDPL)',
      titleEn: '8. Customer Rights Under the Saudi PDPL Framework',
      contentAr: 'يتمتع كل عميل يستخدم منصة صهاريج نبع بالحقوق النظامية التالية التي يمكن ممارستها في أي وقت دون أي تكلفة:',
      contentEn: 'Every customer ordering through The Nabaa Tankers possesses clear statutory rights guaranteed under the Saudi Data Protection Law:',
      bullets: [
        {
          id: 'cp8-b1',
          labelAr: 'حق العلم والإحاطة (Right to be Informed):',
          labelEn: 'Right to be Informed:',
          textAr: 'معرفة المسوغ النظامي لجمع بياناتك وطبيعة استخدامها، وهو ما تضمنه هذه السياسة.',
          textEn: 'To be clearly informed of the legal basis, specific purposes, and processing procedures applied to your personal data.'
        },
        {
          id: 'cp8-b2',
          labelAr: 'حق الوصول والاطلاع (Right to Access):',
          labelEn: 'Right of Access:',
          textAr: 'الاطلاع على بيانات حسابك الشخصي، وسجل طلبات الصهاريج السابقة، والفواتير الصادرة.',
          textEn: 'To inspect your stored personal data, view past water delivery history, and download copies of electronic invoices.'
        },
        {
          id: 'cp8-b3',
          labelAr: 'حق التصحيح والتحديث (Right to Rectification):',
          labelEn: 'Right to Rectification:',
          textAr: 'تعديل أو تحديث أرقام التواصل، أو أسماء الأحياء، أو مواقع الخزانات المسجلة بسهولة عبر الملف الشخصي أو بمراسلة الدعم.',
          textEn: 'To update or correct obsolete phone numbers, neighborhood pins, or tank access notes anytime directly in the app or via support.'
        },
        {
          id: 'cp8-b4',
          labelAr: 'حق محو البيانات وحذف الحساب (Right to Erasure):',
          labelEn: 'Right to Erasure / Deletion:',
          textAr: 'طلب حذف الحساب ومسح كافة العناوين وبيانات الموقع نهائياً من خوادمنا، وسيتم تنفيذ الطلب خلال 72 ساعة عمل باستثناء السجلات الملزمة نظاماً.',
          textEn: 'To request complete deletion of your account and permanent purging of stored location pins from our servers within 72 business hours (excluding mandatory tax audit archives).'
        },
        {
          id: 'cp8-b5',
          labelAr: 'حق سحب الموافقة (Right to Withdraw Consent):',
          labelEn: 'Right to Withdraw Consent:',
          textAr: 'إلغاء الاشتراك في الرسائل الترويجية والعروض التسويقية في أي وقت مع استمرار استقبال الإشعارات التشغيلية للطلبات النشطة.',
          textEn: 'To opt out of marketing communications at any time while retaining critical transactional updates for active water tanker orders.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-9',
      order: 9,
      badgeAr: 'سجلات جودة المياه والصحة',
      badgeEn: 'Water Sanitation Logs',
      titleAr: '9. خصوصية وسجلات فحص جودة مياه الشرب والتطهير',
      titleEn: '9. Potable Water Quality & Sanitization Records',
      contentAr: 'حرصاً على سلامة وصحة العائلة والمنشآت، تخضع مياه الشرب المنقولة عبر صهاريج نبع لرقابة دورية صارمة:',
      contentEn: 'To protect customer health and safety, all drinking water delivered through The Nabaa Tankers adheres to rigorous sanitary audits:',
      bullets: [
        {
          id: 'cp9-b1',
          labelAr: 'مصادر مياه معتمدة رسمياً:',
          labelEn: 'Certified Municipal Water Terminals:',
          textAr: 'تتم تعبئة كافة الصهاريج حصرياً من أشياب شركة المياه الوطنية والمحطات المصرحة لمياه الشرب فقط بالرياض.',
          textEn: 'Tankers refill solely at authorized municipal potable water terminals and certified desalination distribution stations in Riyadh.'
        },
        {
          id: 'cp9-b2',
          labelAr: 'شهادات تبطين ونظافة الخزانات:',
          labelEn: 'Sanitary Tank Lining & Hose Inspections:',
          textAr: 'توثق المنصة شهادات تطهير الصهاريج بمواد إيبوكسي صحية مخصصة للأغذية، وخراطيم تفريغ معقمة، لمنع أي تلوث كيميائي أو بكتيري.',
          textEn: 'Our system verifies driver certificates for food-grade tank linings and sanitization cycles to guarantee zero chemical or bacterial contamination.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-10',
      order: 10,
      badgeAr: 'التواصل والدعم 24/7',
      badgeEn: 'Customer Support & Comms',
      titleAr: '10. قنوات التواصل والتنبيهات المباشرة',
      titleEn: '10. Direct Customer Communications & Alerts',
      contentAr: 'تتواصل المنصة مع العملاء عبر القنوات الرسمية التالية فقط لضمان سلامة الخدمة وسرعة الاستجابة:',
      contentEn: 'The Nabaa communicates with customers exclusively via authorized channels to ensure prompt response and order fulfillment:',
      bullets: [
        {
          id: 'cp10-b1',
          labelAr: 'خدمة العملاء والخط الساخن:',
          labelEn: 'Hotline & Emergency Dispatch:',
          textAr: 'رقم الهاتف المباشر (+966 53 043 4010) وخدمة واتساب الرسمية المتاحة على مدار 24 ساعة للتعامل مع أي طوارئ انقطاع مياه.',
          textEn: 'Direct dispatch telephone (+966 53 043 4010) and official 24/7 WhatsApp emergency support for rapid water replenishment.'
        },
        {
          id: 'cp10-b2',
          labelAr: 'إشعارات التوصيل التلقائية:',
          labelEn: 'Automated Delivery Pushes:',
          textAr: 'تنبيهات تلقائية في مراحل الرحلة: قبول الطلب، خروج الصهريج، الوصول، بدء الضخ، وإيصال الاستلام الرقمي.',
          textEn: 'Automated stage notifications: Order Confirmed, Tanker En Route, Arrived at Gate, Pumping Commenced, and Delivery Receipt.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-11',
      order: 11,
      badgeAr: 'التعديلات والتحديثات',
      badgeEn: 'Policy Amendments',
      titleAr: '11. تعديلات وتحديثات سياسة الخصوصية',
      titleEn: '11. Policy Updates & Modifications',
      contentAr: 'قد نقوم بتحديث سياسة الخصوصية هذه بصورة دورية لمواكبة التحديثات التنظيمية في المملكة العربية السعودية أو تطوير ميزات جديدة في التطبيق. سيتم نشر أي تغيير جوهري مع تحديث تاريخ "آخر تحديث" في أعلى هذه الصفحة وإرسال إشعار توضيحي في التطبيق.',
      contentEn: 'We may periodically revise this Privacy Policy to reflect regulatory evolutions in Saudi Arabia or new platform capabilities. Material revisions will be highlighted on this page with an updated "Last Modified" timestamp and an in-app notice prior to enforcement.',
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    },
    {
      id: 'cpriv-12',
      order: 12,
      badgeAr: 'التواصل ومسؤول الخصوصية',
      badgeEn: 'Contact & DPO',
      titleAr: '12. التواصل مع فريق حماية البيانات وخدمة العملاء',
      titleEn: '12. Contact Our Data Protection Team',
      contentAr: 'إذا كانت لديك أي استفسارات حول سياسة الخصوصية الخاصة بصهاريج نبع، أو ترغب في ممارسة أي من حقوقك النظامية في تعديل أو حذف بياناتك، يُرجى التواصل معنا مباشرة عبر القنوات المعتمدة:',
      contentEn: 'If you have questions regarding The Nabaa Tankers Customer Privacy Policy or wish to exercise your rights to review, update, or delete your information, please contact our dedicated team:',
      bullets: [
        {
          id: 'cp12-b1',
          labelAr: 'البريد الإلكتروني الرسمي:',
          labelEn: 'Official Email:',
          textAr: 'thenabaatankers@gmail.com',
          textEn: 'thenabaatankers@gmail.com'
        },
        {
          id: 'cp12-b2',
          labelAr: 'رقم الهاتف المباشر وواتساب:',
          labelEn: 'Telephone & WhatsApp:',
          textAr: '+966 53 043 4010 / +92 333 0717198',
          textEn: '+966 53 043 4010 / +92 333 0717198'
        },
        {
          id: 'cp12-b3',
          labelAr: 'المقر والمدينة:',
          labelEn: 'Headquarters & Location:',
          textAr: 'مدينة الرياض، المملكة العربية السعودية - خدمة وتغطية على مدار 24/7',
          textEn: 'Riyadh, Kingdom of Saudi Arabia - 24/7 Dispatch and Customer Care'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-10T00:00:00.000Z'
    }
  ]
};

// 2. DRIVER PRIVACY POLICY
export const INITIAL_DRIVER_PRIVACY: LegalDocument = {
  id: 'driver_privacy',
  targetAudience: 'driver',
  type: 'privacy',
  titleAr: 'سياسة الخصوصية لسائقي وناقلي الصهاريج',
  titleEn: 'Driver & Transporter Privacy Policy',
  taglineAr: 'حماية بيانات السائقين والتحقق المهني ومحفظة الأرباح وتتبع مسار المركبة',
  taglineEn: 'Protecting tanker driver identity, earnings wallet, fleet credentials, and vehicle telemetry',
  lastUpdatedAr: 'أكتوبر 2026',
  lastUpdatedEn: 'October 2026',
  introAr: 'تلتزم منصة صهاريج نبع بحماية خصوصية شركائها من سائقي وناقلي صهاريج المياه. توضح هذه السياسة طبيعة بيانات السائق والشاحنة المجمعة، وكيفية معالجة المحفظة المالية والأرباح، وضوابط التتبع الميداني.',
  introEn: 'The Nabaa respects the privacy and data rights of our independent tanker drivers and fleet partners. This policy outlines how driver profile documents, telemetry during shifts, and payout earnings are securely handled.',
  contactEmail: 'thenabaatankers@gmail.com',
  contactPhone: '+92 333 0717198',
  sections: [
    {
      id: 'dpriv-1',
      order: 1,
      badgeAr: 'توثيق السائق',
      badgeEn: 'Driver Verification',
      titleAr: '1. البيانات المهنية ومستندات السائق المجمعة',
      titleEn: '1. Driver Credentials & Regulatory Documentation',
      contentAr: 'لضمان سلامة وجودة نقل مياه الشرب، نجمع البيانات المهنية المعتمدة للتحقق من أهلية السائق قبل تفعيل حسابه:',
      contentEn: 'To uphold health regulations and transport compliance, we collect certified professional documents prior to driver activation:',
      bullets: [
        {
          id: 'dp-b1',
          labelAr: 'الهوية الوطنية ورخصة القيادة:',
          labelEn: 'National ID & Heavy Transport License:',
          textAr: 'رقم الهوية الوطنية أو الإقامة النظامية، ورخصة قيادة مركبات ثقيلة سارية المفعول.',
          textEn: 'National ID / Iqama number, verified heavy vehicle transport license, and background check records.'
        },
        {
          id: 'dp-b2',
          labelAr: 'رخصة واستمارة الصهريج:',
          labelEn: 'Tanker Registration & Health Certificate:',
          textAr: 'استمارة الشاحنة، سعة التانكي المعتمدة، وشهادة فحص ونظافة الخزان المخصصة لمياه الشرب.',
          textEn: 'Vehicle registration, verified tanker water volume (10T/19T/32T), and potable water sanitary certificates.'
        },
        {
          id: 'dp-b3',
          labelAr: 'الحساب البنكي والآيبان (IBAN):',
          labelEn: 'Bank Details & IBAN:',
          textAr: 'رقم الآيبان البنكي المعتمد باسم السائق أو المؤسسة لتحويل الأرباح والمستحقات الأسبوعية.',
          textEn: 'Official IBAN under the driver or fleet entity name for automated weekly payout transfers.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'dpriv-2',
      order: 2,
      badgeAr: 'تتبع التيليماتكس',
      badgeEn: 'Vehicle Telemetry',
      titleAr: '2. تتبع الموقع الحي (GPS) أثناء ساعات العمل',
      titleEn: '2. GPS Telemetry & Shift Location Tracking',
      contentAr: 'يتم تتبع الموقع الجغرافي الحي للمركبة فقط عندما يقوم السائق بتفعيل حالة "متاح للعمل" في تطبيق السائق، وذلك لتوزيع الطلبات القريبة من موقعه وحساب مسافات التوصيل بدقة. يتوقف التتبع بمجرد تسجيل الخروج أو إيقاف الحالة.',
      contentEn: 'Live vehicle GPS telemetry is recorded only while the driver is toggled "Online / Available" in the Driver App to match nearby customer orders and calculate transit mileage. Tracking ceases immediately upon going offline.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'dpriv-3',
      order: 3,
      badgeAr: 'أمان المحفظة',
      badgeEn: 'Earnings Security',
      titleAr: '3. خصوصية المحفظة المالية وسجل الأرباح',
      titleEn: '3. Financial Wallet & Earnings Privacy',
      contentAr: 'تُعامل بيانات أرباح السائق، والعمولات المقتطعة، والتحويلات المصرفية بأعلى درجات السرية والخصوصية. لا يُشارك كشف حساب المحفظة مع أي أطراف خارجية ويتاح حصرياً لصاحب الحساب والإدارة المالية.',
      contentEn: 'Driver trip earnings, platform fee reconciliations, and payout histories are treated with strict confidentiality and accessible only to the driver and authorized financial auditing personnel.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'dpriv-4',
      order: 4,
      badgeAr: 'التواصل مع العميل',
      badgeEn: 'Driver-Customer Comms',
      titleAr: '4. ضوابط مشاركة أرقام التواصل مع العملاء',
      titleEn: '4. Communication Safeguards with Customers',
      contentAr: 'يتم إظهار رقم هاتف السائق للعميل فقط أثناء الرحلة الجارية لتنسيق مدخل الخزان والتفريغ، ويُحظر استخدام بيانات العملاء لأي أغراض شخصية أو ترويجية خارج نطاق التوصيل.',
      contentEn: 'Driver phone numbers are shared with the customer solely during the active delivery window for gate coordination. Utilizing customer data for external communication is strictly prohibited.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    }
  ]
};

// 3. CUSTOMER TERMS AND CONDITIONS
export const INITIAL_CUSTOMER_TERMS: LegalDocument = {
  id: 'customer_terms',
  targetAudience: 'customer',
  type: 'terms',
  titleAr: 'الشروط والأحكام للعملاء طالبي مياه الشرب',
  titleEn: 'Customer Terms & Conditions',
  taglineAr: 'الشروط والاشتراطات التشغيلية لطلب وتوريد مياه الشرب بالصهاريج للعملاء',
  taglineEn: 'Operational terms and service obligations for residential water tanker delivery customers',
  lastUpdatedAr: 'أكتوبر 2026',
  lastUpdatedEn: 'October 2026',
  introAr: 'تحكم هذه الشروط والأحكام طلبات العملاء لتوريد مياه الشرب الصالحة للاستخدام عبر صهاريج نبع (10، 19، 32 طن). يُعتبر إرسال طلب صهريج موافقة كاملة وصريحة على هذه الشروط والتزامات الاستلام.',
  introEn: 'These Terms & Conditions govern customer orders for certified potable water tanker supply (10T, 19T, 32T). Placing an order represents full agreement with delivery prerequisites and site receiving conditions.',
  contactEmail: 'thenabaatankers@gmail.com',
  contactPhone: '+966 53 043 4010',
  sections: [
    {
      id: 'cterm-1',
      order: 1,
      badgeAr: 'طبيعة الخدمة',
      badgeEn: 'Service Nature',
      titleAr: '1. نطاق خدمة توريد المياه للعميل',
      titleEn: '1. Scope of Customer Water Supply Service',
      contentAr: 'تقدم منصة نبع خدمة وساطة وتقنية تربط العميل بسائقي صهاريج مياه الشرب المعتمدين في أحياء الرياض، لتوصيل المياه المحلاة الصالحة للشرب وتفريغها في الخزانات الأرضية أو العلوية.',
      contentEn: 'The Nabaa provides digital brokerage connecting customers with certified potable water tankers in Riyadh, delivering desalinated drinking water into ground or elevated tanks.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'cterm-2',
      order: 2,
      badgeAr: 'جاهزية الخزان',
      badgeEn: 'Tank Readiness',
      titleAr: '2. مسؤولية العميل وجاهزية خزان المياه والمدخل',
      titleEn: '2. Customer Obligations & Site Access',
      contentAr: 'يلتزم العميل بضمان الشروط التشغيلية التالية قبل وصول شاحنة الصهريج:',
      contentEn: 'The customer is obligated to ensure the following conditions prior to tanker arrival:',
      bullets: [
        {
          id: 'ct-b1',
          labelAr: 'فراغ وسعة الخزان:',
          labelEn: 'Sufficient Tank Space:',
          textAr: 'التأكد من وجود سعة كافية في الخزان لاستيعاب حمولة الصهريج المطلوبة كاملة تفادياً لفيضان المياه وهدرها.',
          textEn: 'Ensuring your water tank has adequate volume to receive the full tanker payload (10T, 19T, 32T) without overflow.'
        },
        {
          id: 'ct-b2',
          labelAr: 'مسار ومدخل الشاحنة:',
          labelEn: 'Street & Gate Access:',
          textAr: 'أن يكون الشارع ومدخل العقار متاحاً لمرور الشاحنة الثقيلة دون عوائق مرورية مع سهولة مد خراطيم التفريغ.',
          textEn: 'Ensuring street access accommodates heavy vehicle entry and parking within standard hose distance (40-80 meters).'
        },
        {
          id: 'ct-b3',
          labelAr: 'فتح المحبس والاستلام:',
          labelEn: 'Valve Opening & Acceptance:',
          textAr: 'التواجد أثناء وصول السائق لفتح غطاء الخزان والمحبس، وتأكيد إتمام الضخ بنجاح.',
          textEn: 'Customer presence at the site to grant entry, open tank valves, and inspect completed pumping.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'cterm-3',
      order: 3,
      badgeAr: 'جودة مياه الشرب',
      badgeEn: 'Water Quality',
      titleAr: '3. مصدر وجودة مياه الشرب',
      titleEn: '3. Potable Water Source & Sanitation Standards',
      contentAr: 'تتم تعبئة مياه الشرب حصرياً من أشياب ومحطات التعبئة الرسمية المعتمدة في الرياض والخاضعة للمواصفات القياسية السعودية. يُلزم الناقلون باستخدام صهاريج مبطنة بمواد غذائية صحية وخراطيم مخصصة لمياه الشرب فقط.',
      contentEn: 'Water is drawn exclusively from authorized municipal potable water terminals in Riyadh complying with SASO standards. Tank interiors feature certified food-grade sanitary linings.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'cterm-4',
      order: 4,
      badgeAr: 'الإلغاء والرسوم',
      badgeEn: 'Cancellation & Fees',
      titleAr: '4. سياسة الإلغاء والتعديل والرسوم التشغيلية',
      titleEn: '4. Cancellation Policy & Deadhead Fees',
      contentAr: 'يحق للعميل إلغاء الطلب مجاناً طالما كان الصهريج في مرحلة القبول وقبل انطلاقه من محطة التعبئة. إذا وصل السائق إلى موقع العميل ولم يتمكن من التفريغ لسبب يعود للعميل (كالخزان الممتلئ أو الشارع المغلق)، تطبق رسوم انتقال تشغيلية رمزية.',
      contentEn: 'Free cancellation is available before the tanker departs the filling station. If the driver arrives at the site and delivery is impossible due to customer cause (e.g. full tank or blocked access), a nominal dispatch transit fee applies.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    }
  ]
};

// 4. DRIVER TERMS AND CONDITIONS
export const INITIAL_DRIVER_TERMS: LegalDocument = {
  id: 'driver_terms',
  targetAudience: 'driver',
  type: 'terms',
  titleAr: 'الشروط والأحكام لناقلي وسائقي الصهاريج',
  titleEn: 'Driver & Transporter Terms of Service',
  taglineAr: 'الاتفاقية التشغيلية والتنظيمية لشركاء النقل وسائقي الصهاريج المستقلين',
  taglineEn: 'Operational partner agreement, service standards, commissions, and fleet obligations for tanker drivers',
  lastUpdatedAr: 'أكتوبر 2026',
  lastUpdatedEn: 'October 2026',
  introAr: 'تحكم هذه الاتفاقية التشغيلية انضمام وعمل ناقلي وسائقي صهاريج المياه عبر منصة نبع. يُعتبر تفعيل حساب السائق واستقبال الطلبات موافقة ملزمة على جميع البنود التنظيمية ومعايير السلامة ونظام العمولات.',
  introEn: 'This operational agreement governs tanker drivers and fleet partners partnering with The Nabaa. Activating the driver account and accepting orders constitutes binding adherence to safety protocols, sanitary guidelines, and payout terms.',
  contactEmail: 'thenabaatankers@gmail.com',
  contactPhone: '+92 333 0717198',
  sections: [
    {
      id: 'dterm-1',
      order: 1,
      badgeAr: 'الوضع التعاقدي',
      badgeEn: 'Contractual Status',
      titleAr: '1. الطبيعة القانونية للشراكة المستقلة',
      titleEn: '1. Independent Contractor Relationship',
      contentAr: 'يعمل سائق أو ناقل الصهريج كمتعهد نقل مستقل، ولا يُعد موظفاً لدى المنصة. يتولى السائق كامل المسؤولية عن صيانة شاحنته، ورخصها النظامية، وتكاليف التشغيل والوقود والتأمين.',
      contentEn: 'Tanker drivers operate as independent transport partners and not direct employees. The driver maintains sole responsibility for vehicle maintenance, insurance, commercial permits, fuel, and heavy vehicle safety.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'dterm-2',
      order: 2,
      badgeAr: 'معايير الصهريج والصحة',
      badgeEn: 'Sanitary Standards',
      titleAr: '2. الالتزام بالاشتراطات الصحية لصهريج المياه',
      titleEn: '2. Potable Tank Hygiene & Health Compliance',
      contentAr: 'يلتزم سائق الصهريج بالمعايير الصارمة التالية لنقل مياه الشرب:',
      contentEn: 'Tanker drivers must strictly observe the following food-grade drinking water hygiene standards:',
      bullets: [
        {
          id: 'dt-b1',
          labelAr: 'التعبئة من الأشياب المعتمدة فقط:',
          labelEn: 'Official Station Refill Only:',
          textAr: 'تعبئة المياه حصرياً من محطات التوزيع والأشياب البلدية المعتمدة رسمياً لمياه الشرب.',
          textEn: 'Drawing water exclusively from licensed municipal drinking water supply depots.'
        },
        {
          id: 'dt-b2',
          labelAr: 'نظافة الصهريج والخراطيم:',
          labelEn: 'Sanitary Tank Lining & Hoses:',
          textAr: 'الحفاظ على بطانة الصهريج وخراطيم الضخ نظيفة ومعقمة وخالية من أي شوائب أو ملوثات.',
          textEn: 'Maintaining food-grade epoxy tank linings and dedicated sanitary hoses free of contamination.'
        },
        {
          id: 'dt-b3',
          labelAr: 'حظر نقل أي سوائل أخرى:',
          labelEn: 'Absolute Non-Potable Ban:',
          textAr: 'يُحظر منعاً باتاً استخدام الصهريج لنقل مياه الصرف أو مياه الري غير المعالجة أو أي مواد أخرى.',
          textEn: 'Strictly prohibited from transporting wastewater, non-potable irrigation, or industrial liquids in the registered tanker.'
        }
      ],
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'dterm-3',
      order: 3,
      badgeAr: 'العمولات والمحفظة',
      badgeEn: 'Payouts & Commissions',
      titleAr: '3. المحفظة الرقمية واقتطاع العمولات والتحويلات',
      titleEn: '3. Digital Wallet, Platform Fee & Payout Schedule',
      contentAr: 'تحتسب المنصة نسبة عمولة تشغيلية محددة وشفافة عن كل طلب ناجح يتم تفريغه. تُضاف أرباح السائق الصافية فورياً إلى محفظته الرقمية داخل التطبيق، ويتم تحويل المستحقات آلياً إلى الحساب البنكي المسجل وفق الجدول الأسبوعي.',
      contentEn: 'The platform charges a transparent service fee per successfully delivered order. Net driver earnings credit instantly to the Driver App digital wallet and are wired weekly to the verified IBAN.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    },
    {
      id: 'dterm-4',
      order: 4,
      badgeAr: 'السلوك والجودة',
      badgeEn: 'Service Quality',
      titleAr: '4. تقييم الأداء وقواعد السلوك المهني',
      titleEn: '4. Performance Ratings & Code of Conduct',
      contentAr: 'يلتزم السائق بالتعامل المهني اللائق مع العملاء، والالتزام بمواعيد التوصيل المحددة، وعدم طلب مبالغ نقدية إضافية خارج قيمة الطلب المسجلة في التطبيق. تحتفظ المنصة بحق إيقاف أي حساب يخالف المعايير أو يحصل على تقييمات متدنية متكررة.',
      contentEn: 'Drivers must exhibit professional etiquette, adhere to delivery ETAs, and never solicit cash surcharges outside the in-app fare. The platform reserves the right to suspend partners violating health codes or receiving recurring poor ratings.',
      isActive: true,
      updatedAt: '2026-10-08T00:00:00.000Z'
    }
  ]
};

export const INITIAL_LEGAL_DOCS: Record<LegalDocId, LegalDocument> = {
  customer_privacy: INITIAL_CUSTOMER_PRIVACY,
  driver_privacy: INITIAL_DRIVER_PRIVACY,
  customer_terms: INITIAL_CUSTOMER_TERMS,
  driver_terms: INITIAL_DRIVER_TERMS,
};

// Helper to get legal document from storage or defaults
export const getLegalDocument = (docId: LegalDocId): LegalDocument => {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${docId}`);
    if (raw) {
      const parsed = JSON.parse(raw) as LegalDocument;
      return parsed;
    }
    // Also check older v2 fallback if not in v3 yet, but prefer fresh initial defaults for customer privacy
    const v2Raw = localStorage.getItem(`nabaa_legal_doc_v2_${docId}`);
    if (v2Raw && docId !== 'customer_privacy') {
      const parsed = JSON.parse(v2Raw) as LegalDocument;
      return parsed;
    }
  } catch (err) {
    console.error(`Error reading ${docId} from localStorage:`, err);
  }
  return INITIAL_LEGAL_DOCS[docId] || INITIAL_CUSTOMER_PRIVACY;
};

// Save a legal document to storage
export const saveLegalDocument = (doc: LegalDocument): void => {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${doc.id}`, JSON.stringify(doc));
    window.dispatchEvent(new CustomEvent(LEGAL_CONTENT_EVENT, { detail: { docId: doc.id } }));
  } catch (err) {
    console.error(`Error saving legal document ${doc.id}:`, err);
  }
};

// Reset a legal document to its initial state
export const resetLegalDocumentToDefault = (docId: LegalDocId): LegalDocument => {
  const initial = INITIAL_LEGAL_DOCS[docId];
  saveLegalDocument(initial);
  return initial;
};

// Section manipulation helpers
export const addSectionToDocument = (
  docId: LegalDocId,
  section: Omit<PolicySection, 'id' | 'order' | 'isActive'>
): LegalDocument => {
  const current = getLegalDocument(docId);
  const newOrder = current.sections.length + 1;
  const newId = `${docId}-sec-${Date.now()}`;

  const newSection: PolicySection = {
    ...section,
    id: newId,
    order: newOrder,
    isActive: true,
    updatedAt: new Date().toISOString()
  };

  const updatedDoc: LegalDocument = {
    ...current,
    sections: [...current.sections, newSection]
  };

  saveLegalDocument(updatedDoc);
  return updatedDoc;
};

export const updateSectionInDocument = (
  docId: LegalDocId,
  sectionId: string,
  updates: Partial<PolicySection>
): LegalDocument => {
  const current = getLegalDocument(docId);
  const updatedSections = current.sections.map((s) => {
    if (s.id === sectionId) {
      return {
        ...s,
        ...updates,
        updatedAt: new Date().toISOString()
      };
    }
    return s;
  });

  const updatedDoc: LegalDocument = {
    ...current,
    sections: updatedSections
  };

  saveLegalDocument(updatedDoc);
  return updatedDoc;
};

export const deleteSectionFromDocument = (
  docId: LegalDocId,
  sectionId: string
): LegalDocument => {
  const current = getLegalDocument(docId);
  const updatedSections = current.sections
    .filter((s) => s.id !== sectionId)
    .map((s, idx) => ({ ...s, order: idx + 1 }));

  const updatedDoc: LegalDocument = {
    ...current,
    sections: updatedSections
  };

  saveLegalDocument(updatedDoc);
  return updatedDoc;
};

export const reorderSectionsInDocument = (
  docId: LegalDocId,
  sectionId: string,
  direction: 'up' | 'down'
): LegalDocument => {
  const current = getLegalDocument(docId);
  const index = current.sections.findIndex((s) => s.id === sectionId);
  if (index === -1) return current;

  if (direction === 'up' && index === 0) return current;
  if (direction === 'down' && index === current.sections.length - 1) return current;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  const newSections = [...current.sections];
  const [removed] = newSections.splice(index, 1);
  newSections.splice(targetIndex, 0, removed);

  const reordered = newSections.map((s, idx) => ({ ...s, order: idx + 1 }));
  const updatedDoc: LegalDocument = {
    ...current,
    sections: reordered
  };

  saveLegalDocument(updatedDoc);
  return updatedDoc;
};
