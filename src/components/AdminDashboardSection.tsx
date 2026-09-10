import React, { useState } from 'react';
import { 
  Shield, 
  Layers, 
  BarChart3, 
  Truck, 
  Users, 
  Tag, 
  DollarSign, 
  Activity, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  Sliders, 
  TrendingUp, 
  Map, 
  RefreshCw,
  Clock,
  Check,
  Building
} from 'lucide-react';
import { SAMPLE_ADMIN_STATS, SAMPLE_ADMIN_ORDERS, TANKER_MODELS } from '../data/mockData';
import { GmailIntegrationBadge } from './GmailIntegrationBadge';

export const AdminDashboardSection: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'drivers' | 'tankers' | 'promotions' | 'commission' | 'analytics'>('orders');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderFilter, setOrderFilter] = useState<'all' | 'Immediate' | 'Scheduled'>('all');
  const [commissionType, setCommissionType] = useState<'fixed' | 'percentage'>('fixed');
  const [commissionFixedValue, setCommissionFixedValue] = useState<number>(35);
  const [commissionPercentageValue, setCommissionPercentageValue] = useState<number>(15);

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
            <span>Central Operations Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            The Command Center Behind Every Delivery
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            The Nabaa Admin Dashboard gives business owners, dispatchers, and operations teams centralized visibility over orders, drivers, tankers, promotions, commissions, and fleet activity.
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
                  <span>The Nabaa Operations Hub</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Live Telemetry
                  </span>
                </div>
                <div className="text-xs text-slate-400">Riyadh & Central Region Operations • Real-time Monitoring</div>
              </div>
            </div>

            {/* Live Synchronized Clock */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sync: 11:42:18 AST</span>
              </div>
            </div>
          </div>

          {/* Operational Gmail Dispatch Notification Management */}
          <div className="p-4 sm:p-5 border-b border-slate-800/90 bg-[#060e1e]">
            <GmailIntegrationBadge />
          </div>

          {/* Section 16: Top Real-Time KPI Metric Cards */}
          <div className="p-6 border-b border-slate-800 bg-[#070e1c]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Today's Orders</div>
                <div className="text-2xl font-black text-white font-display mt-1">{SAMPLE_ADMIN_STATS.todayOrders}</div>
                <div className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1 font-mono">
                  <TrendingUp className="w-3 h-3" /> +14% vs yesterday
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Active Deliveries</div>
                <div className="text-2xl font-black text-cyan-300 font-display mt-1">{SAMPLE_ADMIN_STATS.activeDeliveries}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">In transit on road</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Gross Revenue (SAR)</div>
                <div className="text-2xl font-black text-white font-display mt-1">68.4K</div>
                <div className="text-[10px] text-emerald-400 mt-1 font-mono">Daily volume (SAR)</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Fleet Availability</div>
                <div className="text-2xl font-black text-emerald-400 font-display mt-1">84 / 144</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">48 busy • 12 offline</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Drivers Online</div>
                <div className="text-2xl font-black text-white font-display mt-1">132</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">18 offline today</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Scheduled Orders</div>
                <div className="text-2xl font-black text-cyan-400 font-display mt-1">{SAMPLE_ADMIN_STATS.scheduledDeliveries}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Upcoming 48 hrs</div>
              </div>

            </div>
          </div>

          {/* Sub-Navigation Navigation Tabs across Modules 17 - 23 */}
          <div className="px-6 py-3 border-b border-slate-800 bg-[#081326] flex flex-wrap gap-2">
            {[
              { id: 'orders', label: '17. Live Order Center', icon: Activity },
              { id: 'drivers', label: '18. Driver Management', icon: Users },
              { id: 'tankers', label: '19. Tanker Fleet', icon: Truck },
              { id: 'promotions', label: '20-21. Promotions & Codes', icon: Tag },
              { id: 'commission', label: '22. Driver Commissions', icon: DollarSign },
              { id: 'analytics', label: '23. Operations & Heatmap', icon: BarChart3 }
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

          {/* TAB 17: Live Order Command Center */}
          {activeAdminTab === 'orders' && (
            <div className="p-6 space-y-4 animate-in fade-in duration-200">
              {/* Filter and Search Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search orders, customers, addresses (#NB-...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Filter:
                  </span>
                  <button
                    onClick={() => setOrderFilter('all')}
                    className={`px-2.5 py-1 rounded-lg ${orderFilter === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setOrderFilter('Immediate')}
                    className={`px-2.5 py-1 rounded-lg ${orderFilter === 'Immediate' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    Immediate
                  </button>
                  <button
                    onClick={() => setOrderFilter('Scheduled')}
                    className={`px-2.5 py-1 rounded-lg ${orderFilter === 'Scheduled' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                  >
                    Scheduled
                  </button>
                </div>
              </div>

              {/* Orders Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer & Address</th>
                      <th className="p-3.5">Tanker Size</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Assigned Driver</th>
                      <th className="p-3.5">Total (SAR)</th>
                      <th className="p-3.5 text-right">Dispatch Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-300">{order.id}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-white">{order.customerName}</div>
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
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300 font-mono">{order.driver}</td>
                        <td className="p-3.5 font-mono font-bold text-white">{order.amountSAR} SAR</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => alert(`Operations control: Reassigning driver for Order ${order.id}`)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold border border-slate-700 cursor-pointer"
                          >
                            Reassign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 18: Driver Management */}
          {activeAdminTab === 'drivers' && (
            <div className="p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center pb-2">
                <div>
                  <h3 className="text-base font-bold text-white font-display">Active Driver Registry</h3>
                  <p className="text-xs text-slate-400">Driver profiles, verification, assigned tanker, and ratings</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                  132 Online Now
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Tariq Al-Mansoor', id: '#DRV-102', tanker: 'Tanker #402 (19T)', trips: 1428, rating: 4.95, status: 'Active (On Route)', payout: '385 SAR' },
                  { name: 'Hamza Al-Otaibi', id: '#DRV-088', tanker: 'Tanker #118 (10T)', trips: 914, rating: 4.90, status: 'Idle (Available)', payout: '210 SAR' },
                  { name: 'Rashid Al-Harbi', id: '#DRV-145', tanker: 'Tanker #305 (32T)', trips: 2150, rating: 4.98, status: 'Offloading Site', payout: '520 SAR' }
                ].map((drv, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white font-display">{drv.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{drv.id}</span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono">{drv.tanker}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800">
                      <div>Trips: <span className="text-white font-mono">{drv.trips}</span></div>
                      <div>Rating: <span className="text-amber-400 font-mono">★ {drv.rating}</span></div>
                      <div>Status: <span className="text-emerald-400 font-mono">{drv.status}</span></div>
                      <div>Wallet: <span className="text-white font-mono">{drv.payout}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 19: Tanker Management */}
          {activeAdminTab === 'tankers' && (
            <div className="p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center pb-2">
                <div>
                  <h3 className="text-base font-bold text-white font-display">Tanker Fleet Compliance & Capacity</h3>
                  <p className="text-xs text-slate-400">10T, 19T, 32T vehicle inventory, maintenance records, and certificate dates</p>
                </div>
                <button 
                  onClick={() => alert("Fleet action: Register new tanker to Nabaa platform.")}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 cursor-pointer"
                >
                  + Add Tanker
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'Tanker #402', reg: 'KSA 4192-BTR', capacity: '19 Tons (Medium)', driver: 'Tariq Al-Mansoor', certDate: '2027-04-15', status: 'In Service' },
                  { id: 'Tanker #118', reg: 'KSA 8921-RTA', capacity: '10 Tons (Small)', driver: 'Hamza Al-Otaibi', certDate: '2026-11-30', status: 'In Service' },
                  { id: 'Tanker #305', reg: 'KSA 1104-NVA', capacity: '32 Tons (Large)', driver: 'Rashid Al-Harbi', certDate: '2027-01-20', status: 'In Service' }
                ].map((tanker, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white font-display text-sm">{tanker.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {tanker.status}
                      </span>
                    </div>
                    <div className="text-xs text-cyan-300 font-mono">{tanker.capacity}</div>
                    <div className="text-xs text-slate-400">Plate: <span className="text-white font-mono">{tanker.reg}</span></div>
                    <div className="text-xs text-slate-400">Assigned: <span className="text-slate-200">{tanker.driver}</span></div>
                    <div className="text-xs text-slate-400">Compliance Audit Due: <span className="text-cyan-400 font-mono">{tanker.certDate}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 20 & 21: Promotion & Promo Code Management */}
          {activeAdminTab === 'promotions' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 20. Automatic Promotions Config */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white font-display">20. Automatic Promotion Rules</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">Checkout Rules</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">Seasonal Water Offer</div>
                        <div className="text-slate-400">15% OFF capped at 30 SAR</div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">Active</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">First Order Welcome</div>
                        <div className="text-slate-400">25 SAR discount for new registered numbers</div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">Active</span>
                    </div>
                  </div>
                </div>

                {/* 21. Promo Code Management */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white font-display">21. Promo Code Engine</h4>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">Manual Vouchers</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-cyan-300">WATERFAST</div>
                        <div className="text-slate-400">15 SAR OFF • Limit 500 redemptions</div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">Active</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-cyan-300">SUMMER10</div>
                        <div className="text-slate-400">10 SAR OFF • Weekend tanker refills</div>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">Active</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 22: Driver Commission Management */}
          {activeAdminTab === 'commission' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">22. Driver Commission Settings</h3>
                  <p className="text-xs text-slate-400">Configure whether drivers receive a fixed fee per trip or a percentage of order value</p>
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
                    <div className="font-bold text-sm font-display mb-1">Fixed Amount (SAR)</div>
                    <div className="text-xs text-slate-400 mb-3">Drivers receive a set flat payout per completed tanker delivery.</div>
                    <div className="text-2xl font-mono font-bold text-cyan-300">{commissionFixedValue} SAR</div>
                  </div>

                  <div
                    onClick={() => setCommissionType('percentage')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      commissionType === 'percentage'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/15'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm font-display mb-1">Percentage (%)</div>
                    <div className="text-xs text-slate-400 mb-3">Drivers receive a dynamic share of the order gross total.</div>
                    <div className="text-2xl font-mono font-bold text-cyan-300">{commissionPercentageValue}%</div>
                  </div>
                </div>

                {/* Financial flow illustration */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white font-mono uppercase text-[11px] text-cyan-400">
                    Automated Commission Lifecycle:
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-slate-800">Order Completed (200 SAR)</span>
                    <span>→</span>
                    <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Commission Calculated ({commissionType === 'fixed' ? `${commissionFixedValue} SAR` : `${(200 * commissionPercentageValue / 100).toFixed(0)} SAR`})
                    </span>
                    <span>→</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Driver Wallet Credited</span>
                    <span>→</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800">Weekly Settlement</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 23: Operations & Analytics with Demand Heatmap */}
          {activeAdminTab === 'analytics' && (
            <div className="p-6 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Metric trends */}
                <div className="lg:col-span-6 space-y-4">
                  <h4 className="text-sm font-bold text-white font-display">Performance Metrics & Utilization</h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Fleet Utilization Rate</span>
                        <span className="font-mono text-cyan-300 font-bold">87.5%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[87.5%] h-full bg-cyan-400 rounded-full"></div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>19T Medium Tanker Share</span>
                        <span className="font-mono text-cyan-300 font-bold">62% (Most Popular)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[62%] h-full bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>On-Time Arrival Rate</span>
                        <span className="font-mono text-emerald-400 font-bold">96.4%</span>
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
                      <span>Operational Demand Heatmap</span>
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      Analytics Capability
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Visualizes geographic clusters of unfulfilled demand, allowing dispatch controllers to reposition standby tankers toward high-density villa and construction corridors.
                  </p>

                  <div className="aspect-[16/9] rounded-xl bg-[#061022] border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Simulated heat zones */}
                    <div className="absolute top-1/4 left-1/3 w-28 h-28 bg-rose-500/30 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-amber-500/25 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 text-center space-y-1">
                      <div className="text-xs font-mono font-bold text-white">NORTH DISTRICT CORRIDOR</div>
                      <div className="text-[11px] text-cyan-300 font-mono">High Demand: 42 Requests / hr</div>
                      <div className="text-[10px] text-slate-400">Recommended Tanker Staging: 8 Units</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Admin Dashboard Bottom Status Line */}
          <div className="px-6 py-3 border-t border-slate-800/80 bg-[#060e1d] flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>* Displayed figures and driver names are demonstration data illustrating operational dashboards.</span>
            <span>The Nabaa Tankers Operational Suite</span>
          </div>

        </div>

      </div>
    </section>
  );
};
