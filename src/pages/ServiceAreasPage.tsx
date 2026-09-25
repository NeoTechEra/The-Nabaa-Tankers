import React, { useState } from 'react';
import { 
  MapPin, 
  Droplets, 
  CheckCircle2, 
  Search, 
  Clock, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/Link';
import { SEOHead } from '../components/SEOHead';

interface ServiceAreasPageProps {
  onOpenOrderModal: (tankerId?: string) => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ onOpenOrderModal }) => {
  const { isRTL, language } = useLanguage();
  const [searchDistrict, setSearchDistrict] = useState<string>('');

  // Confirmed Service Areas in Riyadh
  const confirmedAreas = [
    {
      id: 'north-riyadh',
      city: language === 'ar' ? 'الرياض' : 'Riyadh',
      region: language === 'ar' ? 'شمال الرياض' : 'North Riyadh',
      status: language === 'ar' ? 'تغطية فورية نشطة' : 'Active Immediate Dispatch',
      avgEta: '25 - 40 mins',
      districts: [
        language === 'ar' ? 'حي الملقا' : 'Al-Malqa',
        language === 'ar' ? 'حي النخيل' : 'Al-Nakheel',
        language === 'ar' ? 'حي الياسمين' : 'Al-Yasmin',
        language === 'ar' ? 'حي النرجس' : 'Al-Narjis',
        language === 'ar' ? 'حي العارض' : 'Al-Arid',
        language === 'ar' ? 'حي الصحافة' : 'Al-Sahafa',
        language === 'ar' ? 'حي حطين' : 'Hittin',
        language === 'ar' ? 'حي القيروان' : 'Al-Qairawan',
      ],
      availability: language === 'ar' ? 'متاح 24/7 (فوري ومجدول)' : 'Available 24/7 (Instant & Scheduled)',
      tankerTypes: language === 'ar' ? '10 طن، 19 طن، 32 طن' : '10T, 19T, 32T Tankers',
    },
    {
      id: 'central-riyadh',
      city: language === 'ar' ? 'الرياض' : 'Riyadh',
      region: language === 'ar' ? 'وسط الرياض' : 'Central Riyadh',
      status: language === 'ar' ? 'تغطية فورية نشطة' : 'Active Immediate Dispatch',
      avgEta: '30 - 45 mins',
      districts: [
        language === 'ar' ? 'حي السليمانية' : 'Al-Sulaimaniyah',
        language === 'ar' ? 'حي العليا' : 'Al-Olaya',
        language === 'ar' ? 'حي الورود' : 'Al-Wurud',
        language === 'ar' ? 'حي الملك فهد' : 'King Fahd',
        language === 'ar' ? 'حي المروج' : 'Al-Murooj',
      ],
      availability: language === 'ar' ? 'متاح 24/7 (فوري ومجدول)' : 'Available 24/7 (Instant & Scheduled)',
      tankerTypes: language === 'ar' ? '10 طن، 19 طن، 32 طن' : '10T, 19T, 32T Tankers',
    },
    {
      id: 'east-riyadh',
      city: language === 'ar' ? 'الرياض' : 'Riyadh',
      region: language === 'ar' ? 'شرق الرياض' : 'East Riyadh',
      status: language === 'ar' ? 'تغطية مجدولة وفورية' : 'Active Scheduled & Instant',
      avgEta: '35 - 50 mins',
      districts: [
        language === 'ar' ? 'حي الروضة' : 'Al-Rawdah',
        language === 'ar' ? 'حي القدس' : 'Al-Quds',
        language === 'ar' ? 'حي الحمراء' : 'Al-Hamra',
        language === 'ar' ? 'حي غرناطة' : 'Granada',
        language === 'ar' ? 'حي اليرموك' : 'Al-Yarmouk',
      ],
      availability: language === 'ar' ? 'متاح 24/7 (فوري ومجدول)' : 'Available 24/7 (Instant & Scheduled)',
      tankerTypes: language === 'ar' ? '10 طن، 19 طن، 32 طن' : '10T, 19T, 32T Tankers',
    },
    {
      id: 'commercial-logistics',
      city: language === 'ar' ? 'الرياض' : 'Riyadh',
      region: language === 'ar' ? 'النطاق التجاري والصناعي' : 'Commercial & Industrial Corridor',
      status: language === 'ar' ? 'إمداد مستمر للصهاريج الكبيرة' : 'Heavy Tanker Dispatch (32T)',
      avgEta: '45 - 60 mins',
      districts: [
        language === 'ar' ? 'مواقع التطوير السكني الكبرى' : 'Large Residential Projects',
        language === 'ar' ? 'المجمعات السكنية والتجارية' : 'Commercial Compounds',
        language === 'ar' ? 'مستودعات الإمداد ومواقع الإنشاء' : 'Construction & Storage Hubs',
      ],
      availability: language === 'ar' ? 'توريد يومي وعقود مجدولة' : 'Daily Supply & Scheduled Bulk Orders',
      tankerTypes: language === 'ar' ? '32 طن و19 طن' : '32T & 19T Heavy Tankers',
    }
  ];

  // District Search Helper
  const allKnownDistricts = confirmedAreas.flatMap(a => a.districts);
  const matchedDistrict = searchDistrict.trim() !== '' 
    ? allKnownDistricts.find(d => d.toLowerCase().includes(searchDistrict.toLowerCase()))
    : null;

  return (
    <>
      <SEOHead
        title={language === 'ar' ? 'المناطق المخدومة لتوصيل مياه الصهاريج | صهاريج نبع' : 'Where We Serve | The Nabaa Water Tankers'}
        description={
          language === 'ar'
            ? 'استعرض مناطق وأحياء الرياض المخدومة حالياً بصهاريج نبع: شمال، وسط، وشرق الرياض، مع جاهزية التوصيل الفوري على مدار الساعة.'
            : 'Explore confirmed water tanker delivery areas across Riyadh: North, Central, and East districts with 24/7 instant and scheduled dispatch.'
        }
        canonicalPath={language === 'ar' ? '/ar/service-areas' : '/service-areas'}
        breadcrumbs={[
          { name: language === 'ar' ? 'الرئيسية' : 'Home', path: language === 'ar' ? '/ar' : '/' },
          { name: language === 'ar' ? 'المناطق المخدومة' : 'Service Areas', path: language === 'ar' ? '/ar/service-areas' : '/service-areas' }
        ]}
      />

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Header (Heading: Where We Serve) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
            <MapPin className="w-4 h-4" />
            <span>{language === 'ar' ? 'نطاق الخدمة الميدانية' : 'Confirmed Coverage'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {language === 'ar' ? 'أين نوفر الخدمة؟ (المناطق المخدومة)' : 'Where We Serve'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'نلتزم بنشر المناطق المؤكدة فعلياً التي تعمل فيها شبكة صهاريج نبع حالياً. يتمركز أسطولنا النشط في العاصمة الرياض لضمان الالتزام بأوقات الوصول المعلنة وجودة الخدمة.'
              : 'The Nabaa provides water-tanker delivery in confirmed operational zones across the Riyadh metropolitan area to maintain strict ETA commitments and water safety.'}
          </p>
        </div>

        {/* Quick District Availability Checker */}
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="text-center space-y-1">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase">
              {language === 'ar' ? 'التحقق السريع من تغطية الحي' : 'Instant District Coverage Checker'}
            </div>
            <div className="text-sm text-slate-300">
              {language === 'ar' ? 'ابحث باسم حيك في الرياض للتحقق من التوصيل الفوري:' : 'Search your Riyadh district to verify immediate delivery availability:'}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              placeholder={language === 'ar' ? 'مثال: الملقا، النخيل، النرجس، العليا...' : 'e.g. Al-Malqa, Al-Nakheel, Al-Narjis...'}
              className="w-full py-3 px-11 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white text-sm focus:outline-none"
            />
            <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`} />
          </div>

          {searchDistrict.trim() !== '' && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              {matchedDistrict ? (
                <div className="flex items-center justify-between text-emerald-400 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {language === 'ar'
                        ? `حي "${matchedDistrict}" مخدوم بالكامل ومتاح للطلب الفوري الآن!`
                        : `"${matchedDistrict}" is fully covered with active immediate dispatch!`}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenOrderModal('tanker-19t')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer shrink-0"
                  >
                    {language === 'ar' ? 'طلب الآن' : 'Order Now'}
                  </button>
                </div>
              ) : (
                <div className="text-slate-400 flex items-center gap-2">
                  <InfoIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    {language === 'ar'
                      ? 'حي قيد التوسعة أو غير محدد في القائمة السريعة. يمكنك إدخال إحداثيات موقعك عبر التطبيق للتأكد.'
                      : 'District may be in adjacent expansion sectors. You can pin your location in the order flow to confirm.'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Individual Cards for Confirmed Service Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {confirmedAreas.map((area) => (
            <div
              key={area.id}
              className="p-8 rounded-3xl bg-[#09152b] border border-cyan-500/20 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">{area.city}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-cyan-300 font-semibold">{area.region}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    {area.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display">{area.region}</h3>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === 'ar' ? `متوسط وقت الوصول: ${area.avgEta}` : `Average ETA: ${area.avgEta}`}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {language === 'ar' ? 'الأحياء المشمولة بالتغطية:' : 'Confirmed Areas Served:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {area.districts.map((district, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono"
                      >
                        {district}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'ar' ? 'جاهزية التوصيل:' : 'Water Delivery Availability:'}</span>
                    <span className="text-white font-medium">{area.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'ar' ? 'سعات الصهاريج المتاحة:' : 'Available Tankers:'}</span>
                    <span className="text-cyan-300 font-mono font-medium">{area.tankerTypes}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenOrderModal('tanker-19t')}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? `طلب صهريج ماء في ${area.region}` : `Order Water in ${area.region}`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coverage Commitment Statement */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3 max-w-3xl mx-auto">
          <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto" />
          <h3 className="text-lg font-bold text-white font-display">
            {language === 'ar' ? 'معايير اعتماد مناطق التوصيل' : 'Service Area Commitment'}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {language === 'ar'
              ? 'تلتزم منصة نبع بعدم إضافة أي منطقة أو حي إلى قوائمنا إلا بعد توفير أسطول صهاريج متكامل ومضخات تغذية مياه شرب معتمدة في ذلك النطاق لضمان عدم تأخر أي طلب عن وقته المحدد.'
              : 'The Nabaa strictly publishes zones where dedicated driver networks and certified potable filling stations are operational, guaranteeing reliable delivery without false coverage claims.'}
          </p>
        </div>

      </div>
    </>
  );
};

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
