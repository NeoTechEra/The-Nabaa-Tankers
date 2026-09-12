import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  BarChart3, 
  Truck, 
  Users, 
  Tag, 
  DollarSign, 
  Activity, 
  Search, 
  Filter, 
  Clock, 
  TrendingUp, 
  Map, 
  Mail,
  Calendar
} from 'lucide-react';
import { SAMPLE_ADMIN_STATS, SAMPLE_ADMIN_ORDERS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { AdminDemoRequestsManager } from './AdminDemoRequestsManager';

export const AdminDashboardSection: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'drivers' | 'tankers' | 'promotions' | 'commission' | 'analytics' | 'demo_requests'>('orders');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderFilter, setOrderFilter] = useState<'all' | 'Immediate' | 'Scheduled'>('all');
  const [commissionType, setCommissionType] = useState<'fixed' | 'percentage'>('fixed');
  const [commissionFixedValue] = useState<number>(35);
  const [commissionPercentageValue] = useState<number>(15);
  const { t, isRTL, language } = useLanguage();

  // Support direct deep link via hash (#admin-demo-requests)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin-demo-requests' || hash === '#demo-requests') {
        setActiveAdminTab('demo_requests');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filteredOrders = SAMPLE_ADMIN_ORDERS.filter((order) => {
    const matchesFilter = orderFilter === 'all' || order.type === orderFilter;
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="admin-dashboard" className="py-24 relative bg-[#050b16] border-t border-slate-800/80 overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.admin.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            {t.admin.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.admin.subtitle}
          </p>
        </div>

        {/* Big Desktop Dashboard Shell */}
        <div className="bg-[#081224] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden backdrop-blur-2xl">
          
          {/* Dashboard Top Header Bar */}
          <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-[#09162c]/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-bold">
                <Activity className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <span>{language === 'ar' ? 'مركز عمليات منصة نبع المركزية' : 'The Nabaa Operations Hub'}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {language === 'ar' ? 'تتبع فوري متصل' : 'Live Telemetry'}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {language === 'ar' ? 'عمليات منطقة الرياض والخليج العربي • مراقبة حية لأسطول الصهاريج' : 'Riyadh & Central Region Operations • Real-time Monitoring'}
                </div>
              </div>
            </div>

            {/* Live Synchronized Clock */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800" dir="ltr">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sync: 11:42:18 AST</span>
              </div>
            </div>
          </div>

          {/* Top Real-Time KPI Metric Cards */}
          <div className="p-6 border-b border-slate-800 bg-[#070e1c]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {language === 'ar' ? 'طلبات اليوم' : "Today's Orders"}
                </div>
                <div className="text-2xl font-black text-white font-display mt-1">{SAMPLE_ADMIN_STATS.todayOrders}</div>
                <div className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1 font-mono" dir="ltr">
                  <TrendingUp className="w-3 h-3" /> +14%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {language === 'ar' ? 'توصيلات نشطة' : 'Active Deliveries'}
                </div>
                <div className="text-2xl font-black text-cyan-300 font-display mt-1">{SAMPLE_ADMIN_STATS.activeDeliveries}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {language === 'ar' ? 'على الطريق حالياً' : 'In transit on road'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {language === 'ar' ? 'الإيراد الإجمالي' : 'Gross Revenue (SAR)'}
                </div>
                <div className="text-2xl font-black text-white font-display mt-1" dir="ltr">68.4K</div>
                <div className="text-[10px] text-emerald-400 mt-1 font-mono">
                  {language === 'ar' ? 'حجم المبيعات اليومية' : 'Daily volume (SAR)'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {language === 'ar' ? 'جاهزية الأسطول' : 'Fleet Availability'}
                </div>
                <div className="text-2xl font-black text-emerald-400 font-display mt-1" dir="ltr">84 / 144</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {language === 'ar' ? '48 في مهمة • 12 استراحة' : '48 busy • 12 offline'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {language === 'ar' ? 'السائقون المتصلون' : 'Drivers Online'}
                </div>
                <div className="text-2xl font-black text-white font-display mt-1">132</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {language === 'ar' ? 'جاهزون للاستقبال' : 'Active drivers'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {language === 'ar' ? 'الطلبات المجدولة' : 'Scheduled Orders'}
                </div>
                <div className="text-2xl font-black text-cyan-400 font-display mt-1">{SAMPLE_ADMIN_STATS.scheduledDeliveries}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {language === 'ar' ? 'خلال 48 ساعة' : 'Upcoming 48 hrs'}
                </div>
              </div>

            </div>
          </div>

          {/* Sub-Navigation Tabs across Modules */}
          <div className="px-6 py-3 border-b border-slate-800 bg-[#081326] flex flex-wrap gap-2">
            {[
              { id: 'orders', label: language === 'ar' ? 'مركز إدارة الطلبات' : '17. Live Order Center', icon: Activity },
              { id: 'demo_requests', label: language === 'ar' ? 'طلبات العروض التوضيحية (Firestore)' : 'Demo Requests (Live)', icon: Calendar },
              { id: 'drivers', label: language === 'ar' ? 'إدارة السائقين' : '18. Driver Management', icon: Users },
              { id: 'tankers', label: language === 'ar' ? 'أسطول الصهاريج' : '19. Tanker Fleet', icon: Truck },
              { id: 'promotions', label: language === 'ar' ? 'العروض وأكواد الخصم' : '20-21. Promotions & Codes', icon: Tag },
              { id: 'commission', label: language === 'ar' ? 'عمولات السائقين' : '22. Driver Commissions', icon: DollarSign },
              { id: 'analytics', label: language === 'ar' ? 'خريطة الطلب الحرارية' : '23. Operations & Heatmap', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAdminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB: Demo Requests Firestore Manager */}
          {activeAdminTab === 'demo_requests' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200">
              <AdminDemoRequestsManager />
            </div>
          )}

          {/* TAB: Live Order Command Center */}
          {activeAdminTab === 'orders' && (
            <div className="p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      placeholder={language === 'ar' ? 'البحث عن طلب، عميل، حي (#NB-...)' : 'Search orders, customers, addresses (#NB-...)'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> {language === 'ar' ? 'التصفية:' : 'Filter:'}
                  </span>
                  <button
                    onClick={() => setOrderFilter('all')}
                    className={`px-2.5 py-1 rounded-lg ${orderFilter === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    {language === 'ar' ? 'الكل' : 'All'}
                  </button>
                  <button
                    onClick={() => setOrderFilter('Immediate')}
                    className={`px-2.5 py-1 rounded-lg ${orderFilter === 'Immediate' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    {language === 'ar' ? 'توصيل فوري' : 'Immediate'}
                  </button>
                  <button
                    onClick={() => setOrderFilter('Scheduled')}
                    className={`px-2.5 py-1 rounded-lg ${orderFilter === 'Scheduled' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    {language === 'ar' ? 'مجدول' : 'Scheduled'}
                  </button>
                </div>
              </div>

              {/* Orders Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className={`w-full text-xs ${isRTL ? 'text-right' : 'text-left'}`}>
                  <thead className="bg-slate-900/90 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">{language === 'ar' ? 'رقم الطلب' : 'Order ID'}</th>
                      <th className="p-3.5">{language === 'ar' ? 'العميل والعنوان' : 'Customer & Address'}</th>
                      <th className="p-3.5">{language === 'ar' ? 'حجم الصهريج' : 'Tanker Size'}</th>
                      <th className="p-3.5">{language === 'ar' ? 'حالة الطلب' : 'Status'}</th>
                      <th className="p-3.5">{language === 'ar' ? 'السائق المعين' : 'Assigned Driver'}</th>
                      <th className="p-3.5">{language === 'ar' ? 'الإجمالي (ر.س)' : 'Total (SAR)'}</th>
                      <th className={`p-3.5 ${isRTL ? 'text-left' : 'text-right'}`}>{language === 'ar' ? 'إجراءات التوجيه' : 'Dispatch Control'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-300">{order.id}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-white">{order.customerName}</div>
                          <div className="text-[11px] text-cyan-300 font-mono flex items-center gap-1" dir="ltr">
                            <Mail className="w-3 h-3 text-cyan-400" />
                            <span>{order.customerName.toLowerCase().replace(/[^a-z0-9]/g, '.') + '@gmail.com'}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">{order.address}</div>
                        </td>
                        <td className="p-3.5 font-mono text-slate-200">{order.tankerType}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold inline-flex items-center gap-1 ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : order.status === 'On the Way'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
                              : order.status === 'Scheduled'
                              ? 'bg-blue-950 text-blue-300 border border-blue-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {language === 'ar' 
                              ? (order.status === 'Delivered' ? 'تم التوصيل' : order.status === 'On the Way' ? 'في الطريق' : order.status === 'Scheduled' ? 'مجدول' : 'قيد المعالجة')
                              : order.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300 font-mono">{order.driver}</td>
                        <td className="p-3.5 font-mono font-bold text-white" dir="ltr">{order.amountSAR} SAR</td>
                        <td className={`p-3.5 ${isRTL ? 'text-left' : 'text-right'}`}>
                          <button
                            onClick={() => {}}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold border border-slate-700 cursor-pointer"
                          >
                            {language === 'ar' ? 'إعادة توجيه' : 'Reassign'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Driver Management */}
          {activeAdminTab === 'drivers' && (
            <div className="p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center pb-2">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {language === 'ar' ? 'سجل السائقين المعتمدين' : 'Active Driver Registry'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'الملفات الشخصية، رخص القيادة، الصهريج المعين، وتقييمات الخدمة' : 'Driver profiles, verification, assigned tanker, and ratings'}
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                  {language === 'ar' ? '132 متصل الآن' : '132 Online Now'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    name: language === 'ar' ? 'طارق المنصور' : 'Tariq Al-Mansoor', 
                    id: '#DRV-102', 
                    tanker: language === 'ar' ? 'صهريج #402 (19 طن)' : 'Tanker #402 (19T)', 
                    trips: 1428, 
                    rating: 4.95, 
                    status: language === 'ar' ? 'نشط (في الطريق)' : 'Active (On Route)', 
                    payout: '385 SAR' 
                  },
                  { 
                    name: language === 'ar' ? 'حمزة العتيبي' : 'Hamza Al-Otaibi', 
                    id: '#DRV-088', 
                    tanker: language === 'ar' ? 'صهريج #118 (10 طن)' : 'Tanker #118 (10T)', 
                    trips: 914, 
                    rating: 4.90, 
                    status: language === 'ar' ? 'متاح للطلب' : 'Idle (Available)', 
                    payout: '210 SAR' 
                  },
                  { 
                    name: language === 'ar' ? 'راشد الحربي' : 'Rashid Al-Harbi', 
                    id: '#DRV-145', 
                    tanker: language === 'ar' ? 'صهريج #305 (32 طن)' : 'Tanker #305 (32T)', 
                    trips: 2150, 
                    rating: 4.98, 
                    status: language === 'ar' ? 'تفريغ في الموقع' : 'Offloading Site', 
                    payout: '520 SAR' 
                  }
                ].map((drv, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white font-display">{drv.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{drv.id}</span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono">{drv.tanker}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800">
                      <div>{language === 'ar' ? 'الرحلات:' : 'Trips:'} <span className="text-white font-mono">{drv.trips}</span></div>
                      <div>{language === 'ar' ? 'التقييم:' : 'Rating:'} <span className="text-amber-400 font-mono" dir="ltr">★ {drv.rating}</span></div>
                      <div>{language === 'ar' ? 'الحالة:' : 'Status:'} <span className="text-emerald-400 font-mono">{drv.status}</span></div>
                      <div>{language === 'ar' ? 'المحفظة:' : 'Wallet:'} <span className="text-white font-mono" dir="ltr">{drv.payout}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Tanker Management */}
          {activeAdminTab === 'tankers' && (
            <div className="p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center pb-2">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {language === 'ar' ? 'أسطول صهاريج المياه والامتثال' : 'Tanker Fleet Compliance & Capacity'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'مخزون صهاريج 10 طن، 19 طن، 32 طن، شهادات السلامة، والفحص الدوري' : '10T, 19T, 32T vehicle inventory, maintenance records, and certificate dates'}
                  </p>
                </div>
                <button 
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 cursor-pointer"
                >
                  {language === 'ar' ? '+ إضافة صهريج جديد' : '+ Add Tanker'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    id: language === 'ar' ? 'صهريج #402' : 'Tanker #402', 
                    reg: 'KSA 4192-BTR', 
                    capacity: language === 'ar' ? '19 طن (وسط)' : '19 Tons (Medium)', 
                    driver: language === 'ar' ? 'طارق المنصور' : 'Tariq Al-Mansoor', 
                    certDate: '2027-04-15', 
                    status: language === 'ar' ? 'في الخدمة' : 'In Service' 
                  },
                  { 
                    id: language === 'ar' ? 'صهريج #118' : 'Tanker #118', 
                    reg: 'KSA 8921-RTA', 
                    capacity: language === 'ar' ? '10 طن (صغير)' : '10 Tons (Small)', 
                    driver: language === 'ar' ? 'حمزة العتيبي' : 'Hamza Al-Otaibi', 
                    certDate: '2026-11-30', 
                    status: language === 'ar' ? 'في الخدمة' : 'In Service' 
                  },
                  { 
                    id: language === 'ar' ? 'صهريج #305' : 'Tanker #305', 
                    reg: 'KSA 1104-NVA', 
                    capacity: language === 'ar' ? '32 طن (كبير مقطورة)' : '32 Tons (Large)', 
                    driver: language === 'ar' ? 'راشد الحربي' : 'Rashid Al-Harbi', 
                    certDate: '2027-01-20', 
                    status: language === 'ar' ? 'في الخدمة' : 'In Service' 
                  }
                ].map((tanker, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white font-display text-sm">{tanker.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {tanker.status}
                      </span>
                    </div>
                    <div className="text-xs text-cyan-300 font-mono">{tanker.capacity}</div>
                    <div className="text-xs text-slate-400">{language === 'ar' ? 'اللوحة:' : 'Plate:'} <span className="text-white font-mono">{tanker.reg}</span></div>
                    <div className="text-xs text-slate-400">{language === 'ar' ? 'السائق المعين:' : 'Assigned:'} <span className="text-slate-200">{tanker.driver}</span></div>
                    <div className="text-xs text-slate-400">{language === 'ar' ? 'موعد فحص الامتثال القادم:' : 'Compliance Audit Due:'} <span className="text-cyan-400 font-mono" dir="ltr">{tanker.certDate}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Promotion & Promo Code Management */}
          {activeAdminTab === 'promotions' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 20. Automatic Promotions Config */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white font-display">
                      {language === 'ar' ? '20. قواعد العروض التلقائية' : '20. Automatic Promotion Rules'}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {language === 'ar' ? 'تطبيق تلقائي عند السداد' : 'Checkout Rules'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">
                          {language === 'ar' ? 'عرض موسم الصيف للمياه' : 'Seasonal Water Offer'}
                        </div>
                        <div className="text-slate-400">
                          {language === 'ar' ? 'خصم 15% بحد أقصى 30 ر.س' : '15% OFF capped at 30 SAR'}
                        </div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">{language === 'ar' ? 'نشط' : 'Active'}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">
                          {language === 'ar' ? 'ترحيب بالطلب الأول' : 'First Order Welcome'}
                        </div>
                        <div className="text-slate-400">
                          {language === 'ar' ? 'خصم 25 ر.س للأرقام الجديدة' : '25 SAR discount for new registered numbers'}
                        </div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">{language === 'ar' ? 'نشط' : 'Active'}</span>
                    </div>
                  </div>
                </div>

                {/* 21. Promo Code Management */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white font-display">
                      {language === 'ar' ? '21. محرك أكواد الخصم والرموز الترويجية' : '21. Promo Code Engine'}
                    </h4>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                      {language === 'ar' ? 'قسائم إدخال يدوي' : 'Manual Vouchers'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-cyan-300" dir="ltr">WATERFAST</div>
                        <div className="text-slate-400">
                          {language === 'ar' ? 'خصم 15 ر.س • حد 500 استخدام' : '15 SAR OFF • Limit 500 redemptions'}
                        </div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">{language === 'ar' ? 'نشط' : 'Active'}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-cyan-300" dir="ltr">SUMMER10</div>
                        <div className="text-slate-400">
                          {language === 'ar' ? 'خصم 10 ر.س • طلبات نهاية الأسبوع' : '10 SAR OFF • Weekend tanker refills'}
                        </div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">{language === 'ar' ? 'نشط' : 'Active'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: Driver Commission Management */}
          {activeAdminTab === 'commission' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {language === 'ar' ? '22. إعدادات وقواعد عمولات السائقين' : '22. Driver Commission Settings'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar'
                      ? 'حدد طريقة احتساب عمولة السائقين: إما بمبلغ ثابت لكل رحلة منجزة أو نسبة مئوية من قيمة الطلب'
                      : 'Configure whether drivers receive a fixed fee per trip or a percentage of order value'}
                  </p>
                </div>

                {/* Commission Mode Toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setCommissionType('fixed')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      commissionType === 'fixed'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/15'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm font-display mb-1">
                      {language === 'ar' ? 'مبلغ ثابت لكل رحلة (ر.س)' : 'Fixed Amount (SAR)'}
                    </div>
                    <div className="text-xs text-slate-400 mb-3">
                      {language === 'ar' ? 'يحصل السائق على مبلغ محدد ثابت عن كل تفريغ ناجح للصهريج.' : 'Drivers receive a set flat payout per completed tanker delivery.'}
                    </div>
                    <div className="text-2xl font-mono font-bold text-cyan-300">
                      {commissionFixedValue} {language === 'ar' ? 'ر.س' : 'SAR'}
                    </div>
                  </div>

                  <div
                    onClick={() => setCommissionType('percentage')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      commissionType === 'percentage'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/15'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm font-display mb-1">
                      {language === 'ar' ? 'نسبة مئوية ديناميكية (%)' : 'Percentage (%)'}
                    </div>
                    <div className="text-xs text-slate-400 mb-3">
                      {language === 'ar' ? 'يحصل السائق على حصة محددة من إجمالي قيمة طلب العميل.' : 'Drivers receive a dynamic share of the order gross total.'}
                    </div>
                    <div className="text-2xl font-mono font-bold text-cyan-300" dir="ltr">
                      {commissionPercentageValue}%
                    </div>
                  </div>
                </div>

                {/* Financial flow illustration */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white font-mono uppercase text-[11px] text-cyan-400">
                    {language === 'ar' ? 'دورة حياة العمولة الآلية:' : 'Automated Commission Lifecycle:'}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-slate-800">
                      {language === 'ar' ? 'اكتمال الطلب (200 ر.س)' : 'Order Completed (200 SAR)'}
                    </span>
                    <span>→</span>
                    <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {language === 'ar' 
                        ? `احتساب العمولة (${commissionType === 'fixed' ? `${commissionFixedValue} ر.س` : `${(200 * commissionPercentageValue / 100).toFixed(0)} ر.س`})`
                        : `Commission Calculated (${commissionType === 'fixed' ? `${commissionFixedValue} SAR` : `${(200 * commissionPercentageValue / 100).toFixed(0)} SAR`})`}
                    </span>
                    <span>→</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {language === 'ar' ? 'إيداع فوري بمحفظة السائق' : 'Driver Wallet Credited'}
                    </span>
                    <span>→</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800">
                      {language === 'ar' ? 'تسوية بنكية أسبوعية' : 'Weekly Settlement'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Operations & Analytics with Demand Heatmap */}
          {activeAdminTab === 'analytics' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Metric trends */}
                <div className="lg:col-span-6 space-y-4">
                  <h4 className="text-sm font-bold text-white font-display">
                    {language === 'ar' ? 'مؤشرات الأداء ومعدل تشغيل الأسطول' : 'Performance Metrics & Utilization'}
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>{language === 'ar' ? 'معدل تشغيل الأسطول' : 'Fleet Utilization Rate'}</span>
                        <span className="font-mono text-cyan-300 font-bold" dir="ltr">87.5%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[87.5%] h-full bg-cyan-400 rounded-full"></div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>{language === 'ar' ? 'حصة صهريج 19 طن (الأكثر طلباً)' : '19T Medium Tanker Share'}</span>
                        <span className="font-mono text-cyan-300 font-bold" dir="ltr">62%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[62%] h-full bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>{language === 'ar' ? 'معدل الوصول في الموعد المحدد' : 'On-Time Arrival Rate'}</span>
                        <span className="font-mono text-emerald-400 font-bold" dir="ltr">96.4%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[96.4%] h-full bg-emerald-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Demand Heatmap Simulation */}
                <div className="lg:col-span-6 p-5 rounded-2xl bg-gradient-to-b from-[#09172f] to-[#060e1d] border border-cyan-500/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                      <Map className="w-4 h-4 text-cyan-400" />
                      <span>{language === 'ar' ? 'الخريطة الحرارية لكثافة الطلب الجغرافي' : 'Operational Demand Heatmap'}</span>
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {language === 'ar' ? 'ذكاء جغرافي' : 'Analytics Capability'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'ar'
                      ? 'تحدد الخريطة الحرارية أماكن تكدس الطلبات غير المكتملة في الوقت الفعلي، مما يمكّن مسؤولي التوجيه من إعادة تموضع الصهاريج الاحتياطية نحو ممرات الفلل والأحياء ذات الكثافة العالية.'
                      : 'Visualizes geographic clusters of unfulfilled demand, allowing dispatch controllers to reposition standby tankers toward high-density villa and construction corridors.'}
                  </p>

                  <div className="aspect-[16/9] rounded-xl bg-[#061022] border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Simulated heat zones */}
                    <div className="absolute top-1/4 left-1/3 w-28 h-28 bg-rose-500/30 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-amber-500/25 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 text-center space-y-1">
                      <div className="text-xs font-mono font-bold text-white">
                        {language === 'ar' ? 'محور شمال الرياض (الملقا - النرجس - الياسمين)' : 'NORTH DISTRICT CORRIDOR'}
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono">
                        {language === 'ar' ? 'كثافة طلب عالية: 42 طلب / ساعة' : 'High Demand: 42 Requests / hr'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'ar' ? 'التوزيع الموصى به: توجيه 8 صهاريج احتياطية' : 'Recommended Tanker Staging: 8 Units'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Admin Dashboard Bottom Status Line */}
          <div className="px-6 py-3 border-t border-slate-800/80 bg-[#060e1d] flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>
              {language === 'ar' ? '* البيانات وأسماء السائقين المعروضة هي بيانات استرشادية لمحاكاة لوحة التحكم.' : '* Displayed figures and driver names are demonstration data illustrating operational dashboards.'}
            </span>
            <span>{language === 'ar' ? 'منصة نبع لصهاريج المياه الرقمية' : 'The Nabaa Tankers Operational Suite'}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
