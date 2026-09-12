import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Clock, Search, Filter, Download, CheckCircle2, 
  Clock3, AlertCircle, Phone, Mail, Building2, User, 
  ExternalLink, MessageSquare, Video, Check, X, ChevronRight,
  ShieldCheck, ArrowUpDown, RefreshCw, Send, Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  DemoRequest, 
  DemoRequestStatus, 
  subscribeDemoRequests, 
  updateDemoRequestStatus, 
  exportDemoRequestsToCSV,
  auth
} from '../services/firebase';
import { getBookingRecords } from '../services/bookingStore';

export const AdminDemoRequestsManager: React.FC = () => {
  const { language, isRTL } = useLanguage();

  // Data state
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [interestFilter, setInterestFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'date'>('newest');

  // Detail Modal Actions state
  const [actionStatus, setActionStatus] = useState<DemoRequestStatus>('new');
  const [meetingLinkInput, setMeetingLinkInput] = useState<string>('');
  const [adminNotesInput, setAdminNotesInput] = useState<string>('');
  const [isSavingAction, setIsSavingAction] = useState<boolean>(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Subscribe to real Firestore demoRequests collection
  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = subscribeDemoRequests(
      (items) => {
        // If Firestore items exist, use them
        if (items.length > 0) {
          setRequests(items);
        } else {
          // Fallback / initial seed from local store if Firestore is still fresh
          const localBookings = getBookingRecords().filter(b => b.type === 'demo');
          const fallbackRequests: DemoRequest[] = localBookings.map(b => ({
            id: b.id,
            name: b.customerName,
            companyName: b.details?.company || '',
            email: b.customerEmail,
            phone: b.customerPhone,
            country: b.details?.country || 'Saudi Arabia',
            interestedIn: b.details?.topic || 'Full Platform Walkthrough',
            preferredDate: b.details?.scheduledTime?.split(' at ')[0] || 'Tomorrow',
            preferredTime: b.details?.scheduledTime?.split(' at ')[1] || '11:00 AM (AST)',
            timezone: b.details?.timezone || 'Asia/Riyadh',
            message: b.details?.notes || '',
            status: (b.status === 'sent' ? 'confirmed' : 'new') as DemoRequestStatus,
            createdAt: b.createdAt,
            updatedAt: b.createdAt,
          }));
          setRequests(fallbackRequests);
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn('Firestore subscription notice (using local offline cache):', error);
        const localBookings = getBookingRecords().filter(b => b.type === 'demo');
        const fallbackRequests: DemoRequest[] = localBookings.map(b => ({
          id: b.id,
          name: b.customerName,
          companyName: b.details?.company || '',
          email: b.customerEmail,
          phone: b.customerPhone,
          country: b.details?.country || 'Saudi Arabia',
          interestedIn: b.details?.topic || 'Full Platform Walkthrough',
          preferredDate: b.details?.scheduledTime?.split(' at ')[0] || 'Tomorrow',
          preferredTime: b.details?.scheduledTime?.split(' at ')[1] || '11:00 AM (AST)',
          timezone: b.details?.timezone || 'Asia/Riyadh',
          message: b.details?.notes || '',
          status: 'new' as DemoRequestStatus,
          createdAt: b.createdAt,
          updatedAt: b.createdAt,
        }));
        setRequests(fallbackRequests);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sync selected request updates
  useEffect(() => {
    if (selectedRequest) {
      const refreshed = requests.find(r => r.id === selectedRequest.id);
      if (refreshed) {
        setSelectedRequest(refreshed);
      }
    }
  }, [requests]);

  // Open detail modal helper
  const handleOpenDetails = (req: DemoRequest) => {
    setSelectedRequest(req);
    setActionStatus(req.status);
    setMeetingLinkInput(req.meetingLink || '');
    setAdminNotesInput(req.adminNotes || '');
    setActionSuccessMessage(null);
    setIsDetailModalOpen(true);
  };

  // KPI Metrics (Calculated dynamically from real requests)
  const stats = useMemo(() => {
    const total = requests.length;
    const newCount = requests.filter(r => r.status === 'new').length;
    const awaitingCount = requests.filter(r => r.status === 'new' || r.status === 'contacted').length;
    const confirmedCount = requests.filter(r => r.status === 'confirmed').length;
    const completedCount = requests.filter(r => r.status === 'completed').length;
    return { total, newCount, awaitingCount, confirmedCount, completedCount };
  }, [requests]);

  // Filter & Sort computation
  const filteredRequests = useMemo(() => {
    return requests
      .filter((req) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            req.id.toLowerCase().includes(q) ||
            req.name.toLowerCase().includes(q) ||
            (req.companyName && req.companyName.toLowerCase().includes(q)) ||
            req.email.toLowerCase().includes(q) ||
            req.phone.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Status Filter
        if (statusFilter !== 'all' && req.status !== statusFilter) {
          return false;
        }

        // Interest Filter
        if (interestFilter !== 'all' && req.interestedIn !== interestFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') {
          const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
          const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
          return timeB - timeA;
        }
        if (sortOrder === 'oldest') {
          const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
          const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
          return timeA - timeB;
        }
        if (sortOrder === 'date') {
          return (a.preferredDate || '').localeCompare(b.preferredDate || '');
        }
        return 0;
      });
  }, [requests, searchQuery, statusFilter, interestFilter, sortOrder]);

  // Handle Save Status & Notes
  const handleSaveStatusUpdate = async () => {
    if (!selectedRequest) return;
    setIsSavingAction(true);
    setActionSuccessMessage(null);

    try {
      await updateDemoRequestStatus(
        selectedRequest.id,
        {
          status: actionStatus,
          meetingLink: meetingLinkInput,
          adminNotes: adminNotesInput,
          updatedBy: auth.currentUser?.email || 'The Nabaa Admin',
        },
        selectedRequest
      );

      // Local optimistic update
      setRequests(prev => prev.map(r => {
        if (r.id === selectedRequest.id) {
          return {
            ...r,
            status: actionStatus,
            meetingLink: meetingLinkInput,
            adminNotes: adminNotesInput,
            updatedAt: new Date().toISOString(),
          };
        }
        return r;
      }));

      setActionSuccessMessage(
        language === 'ar' 
          ? 'تم تحديث حالة الطلب وإشعار العميل بنجاح!' 
          : 'Request state updated & customer notified successfully!'
      );
      setTimeout(() => setActionSuccessMessage(null), 3500);
    } catch (err) {
      console.error('Failed to update request:', err);
      alert(language === 'ar' ? 'تعذر حفظ التحديث، يرجى التحقق من الاتصال.' : 'Failed to update request. Please try again.');
    } finally {
      setIsSavingAction(false);
    }
  };

  // Helper for status badge rendering
  const renderStatusBadge = (status: DemoRequestStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {language === 'ar' ? 'طلب جديد' : 'New'}
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            <Clock3 className="w-3 h-3 text-cyan-400" />
            {language === 'ar' ? 'تم التواصل' : 'Contacted'}
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {language === 'ar' ? 'موعد مؤكد' : 'Confirmed'}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-400/30">
            <Check className="w-3 h-3 text-purple-400" />
            {language === 'ar' ? 'مكتمل' : 'Completed'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <X className="w-3 h-3 text-slate-400" />
            {language === 'ar' ? 'ملغي' : 'Cancelled'}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <AlertCircle className="w-3 h-3 text-rose-400" />
            {language === 'ar' ? 'مرفوض' : 'Rejected'}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Summary Statistics KPIs (Dynamically calculated from real Firestore data) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        
        {/* Total */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            {language === 'ar' ? 'إجمالي الطلبات' : 'Total Requests'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-display mt-2">
            {stats.total}
          </div>
          <span className="text-[10px] text-cyan-400 font-mono mt-1">
            {language === 'ar' ? 'سجل المنظومة الحي' : 'Live Firestore collection'}
          </span>
        </div>

        {/* New */}
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            {language === 'ar' ? 'طلبات جديدة' : 'New Requests'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-display mt-2">
            {stats.newCount}
          </div>
          <span className="text-[10px] text-amber-400/80 font-mono mt-1">
            {language === 'ar' ? 'تحتاج مراجعة فورية' : 'Requires review'}
          </span>
        </div>

        {/* Awaiting Confirmation */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">
            {language === 'ar' ? 'بانتظار التأكيد' : 'Awaiting Confirmation'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-display mt-2">
            {stats.awaitingCount}
          </div>
          <span className="text-[10px] text-cyan-400 font-mono mt-1">
            {language === 'ar' ? 'جدول وتنسيق المواعيد' : 'In scheduling pipeline'}
          </span>
        </div>

        {/* Confirmed */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider">
            {language === 'ar' ? 'مواعيد مؤكدة' : 'Confirmed'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-display mt-2">
            {stats.confirmedCount}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono mt-1">
            {language === 'ar' ? 'تم إرسال الرابط للعميل' : 'Meeting link sent'}
          </span>
        </div>

        {/* Completed */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
            {language === 'ar' ? 'جلسات مكتملة' : 'Completed'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 font-display mt-2">
            {stats.completedCount}
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-1">
            {language === 'ar' ? 'تم تقديم العرض' : 'Delivered sessions'}
          </span>
        </div>

      </div>

      {/* 2. Controls Bar: Search, Filters, Sorters & CSV Export */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث بالاسم، الشركة، البريد، أو معرّف الطلب (DEMO-...)' : 'Search by Name, Company, Email, or Request ID...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
              <option value="new">{language === 'ar' ? 'جديد (New)' : 'New'}</option>
              <option value="contacted">{language === 'ar' ? 'تم التواصل' : 'Contacted'}</option>
              <option value="confirmed">{language === 'ar' ? 'مؤكد (Confirmed)' : 'Confirmed'}</option>
              <option value="completed">{language === 'ar' ? 'مكتمل (Completed)' : 'Completed'}</option>
              <option value="cancelled">{language === 'ar' ? 'ملغي' : 'Cancelled'}</option>
              <option value="rejected">{language === 'ar' ? 'مرفوض' : 'Rejected'}</option>
            </select>
          </div>

          {/* Interest Topic Dropdown */}
          <select
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="py-2 px-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer max-w-[170px] truncate"
          >
            <option value="all">{language === 'ar' ? 'كافة المواضيع' : 'All Topics'}</option>
            <option value="Full Platform Walkthrough">Full Platform Walkthrough</option>
            <option value="Customer App">Customer App</option>
            <option value="Driver App">Driver App</option>
            <option value="Admin Dashboard">Admin Dashboard</option>
            <option value="Fleet Management">Fleet Management</option>
            <option value="Business / Partnership">Business / Partnership</option>
          </select>

          {/* Sort Order */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="py-2 px-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="newest">{language === 'ar' ? 'الأحدث أولاً' : 'Newest'}</option>
              <option value="oldest">{language === 'ar' ? 'الأقدم أولاً' : 'Oldest'}</option>
              <option value="date">{language === 'ar' ? 'تاريخ الموعد' : 'Requested Date'}</option>
            </select>
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={() => exportDemoRequestsToCSV(filteredRequests)}
            className="py-2 px-3.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Export filtered records to CSV"
            id="admin-export-demo-csv-btn"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'ar' ? 'تصدير CSV' : 'Export CSV'}</span>
          </button>

        </div>

      </div>

      {/* 3. Demo Requests Data Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#070e1c] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-300 text-left border-collapse">
            <thead>
              <tr className="bg-[#09152b] border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="p-3.5">{language === 'ar' ? 'المعرّف' : 'ID'}</th>
                <th className="p-3.5">{language === 'ar' ? 'العميل والمنشأة' : 'Customer & Company'}</th>
                <th className="p-3.5">{language === 'ar' ? 'التواصل' : 'Contact Details'}</th>
                <th className="p-3.5">{language === 'ar' ? 'محور الاهتمام' : 'Interested In'}</th>
                <th className="p-3.5">{language === 'ar' ? 'الموعد المفضل' : 'Preferred Schedule'}</th>
                <th className="p-3.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="p-3.5 text-right">{language === 'ar' ? 'الإجراء' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                      <span>{language === 'ar' ? 'جارٍ مزامنة طلبات العروض التوضيحية...' : 'Synchronizing demo requests from Firestore...'}</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-300">
                      {language === 'ar' ? 'لا توجد طلبات عروض تطابق البحث المحدد' : 'No demo requests found matching your filters'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {language === 'ar' ? 'جرّب تعديل كلمة البحث أو فلتر الحالة' : 'Try adjusting the search query or status filter'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr 
                    key={req.id} 
                    className="hover:bg-slate-900/60 transition-colors cursor-pointer"
                    onClick={() => handleOpenDetails(req)}
                  >
                    {/* ID */}
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-mono font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/70 px-2 py-0.5 rounded text-[11px]">
                        {req.id}
                      </span>
                    </td>

                    {/* Customer & Company */}
                    <td className="p-3.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{req.name}</span>
                      </div>
                      {req.companyName ? (
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{req.companyName}</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-500 italic">Individual</div>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="p-3.5 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]" dir="ltr">
                        <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{req.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]" dir="ltr">
                        <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[160px]">{req.email}</span>
                      </div>
                    </td>

                    {/* Interested In */}
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-[11px]">
                        {req.interestedIn}
                      </span>
                    </td>

                    {/* Preferred Date & Time */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{req.preferredDate}</span>
                      </div>
                      <div className="text-[11px] text-cyan-300/90 font-mono flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{req.preferredTime}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-3.5 whitespace-nowrap">
                      {renderStatusBadge(req.status)}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(req)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>{language === 'ar' ? 'إدارة' : 'Manage'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Request Details & Action Drawer / Modal */}
      {isDetailModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl bg-[#091326] border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/70 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Cyan Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300"></div>

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono font-bold text-sm text-cyan-300 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                    {selectedRequest.id}
                  </span>
                  {renderStatusBadge(selectedRequest.status)}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedRequest.name}
                  {selectedRequest.companyName && <span className="text-slate-400 font-normal text-sm"> • {selectedRequest.companyName}</span>}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar text-xs">
              
              {actionSuccessMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{actionSuccessMessage}</span>
                </div>
              )}

              {/* Grid 1: Customer Info & Quick Contact Buttons */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  {language === 'ar' ? 'معلومات التواصل والعميل' : 'Customer & Contact Channels'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Email:</span>
                    <a href={`mailto:${selectedRequest.email}`} className="text-cyan-400 hover:underline font-mono">
                      {selectedRequest.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Phone:</span>
                    <a href={`tel:${selectedRequest.phone}`} className="text-white hover:underline font-mono">
                      {selectedRequest.phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Country:</span>
                    <span className="text-white font-medium">{selectedRequest.country}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Timezone:</span>
                    <span className="text-slate-400 font-mono">{selectedRequest.timezone}</span>
                  </div>
                </div>

                {/* Direct Action Chips: WhatsApp, Phone, Email */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedRequest.name}, regarding your demo request ${selectedRequest.id} for The Nabaa Tankers platform:`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold hover:bg-emerald-500/25 transition-all flex items-center gap-1.5"
                  >
                    <span>WhatsApp Client</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={`mailto:${selectedRequest.email}?subject=${encodeURIComponent(
                      `The Nabaa Tankers Demo Request — ${selectedRequest.id}`
                    )}`}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold hover:bg-cyan-500/25 transition-all flex items-center gap-1.5"
                  >
                    <span>Send Email</span>
                    <Mail className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Grid 2: Session Topic & Customer Message */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  {language === 'ar' ? 'تفاصيل الجلسة المطلوبة' : 'Requested Session Details'}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 py-1 border-b border-slate-800">
                  <span className="text-slate-400">{language === 'ar' ? 'محور الجلسة:' : 'Session Topic:'}</span>
                  <span className="font-bold text-white">{selectedRequest.interestedIn}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 py-1 border-b border-slate-800">
                  <span className="text-slate-400">{language === 'ar' ? 'الموعد المفضل:' : 'Preferred Date & Time:'}</span>
                  <span className="font-bold text-cyan-300">{selectedRequest.preferredDate} ({selectedRequest.preferredTime})</span>
                </div>

                {selectedRequest.message && (
                  <div className="pt-1">
                    <span className="text-slate-500 block text-[10px] uppercase mb-1">
                      {language === 'ar' ? 'ملاحظات العميل / حجم الأسطول:' : 'Client Message / Fleet Scope:'}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                      {selectedRequest.message}
                    </div>
                  </div>
                )}
              </div>

              {/* Grid 3: Operational Status Control & Meeting Link */}
              <div className="p-4 rounded-2xl bg-[#061124] border border-cyan-500/30 space-y-3">
                <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold flex items-center justify-between">
                  <span>{language === 'ar' ? 'إجراءات المشرف وتأكيد الموعد' : 'Admin Actions & Schedule Confirmation'}</span>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Status Selector */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'تعديل حالة الطلب:' : 'Update Lifecycle Status:'}
                  </label>
                  <select
                    value={actionStatus}
                    onChange={(e) => setActionStatus(e.target.value as DemoRequestStatus)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="new">New (Awaiting Review)</option>
                    <option value="contacted">Mark as Contacted</option>
                    <option value="confirmed">Confirm Demo (Triggers Confirmed Email)</option>
                    <option value="completed">Mark as Completed</option>
                    <option value="cancelled">Cancel Request</option>
                    <option value="rejected">Reject Request</option>
                  </select>
                </div>

                {/* Meeting Link Input (Active especially when confirming) */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                    <span>{language === 'ar' ? 'رابط الاجتماع (Google Meet / Zoom / Teams):' : 'Official Video Meeting Link:'}</span>
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                  </label>
                  <input
                    type="url"
                    placeholder="https://meet.google.com/xxx-xxxx-xxx or Zoom link..."
                    value={meetingLinkInput}
                    onChange={(e) => setMeetingLinkInput(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    dir="ltr"
                  />
                  {actionStatus === 'confirmed' && (
                    <p className="text-[10px] text-cyan-300 mt-1">
                      {language === 'ar'
                        ? 'ملاحظة: عند الحفظ سيتم إرسال بريد رسمي مؤكد للعميل يحتوي هذا الرابط والموعد.'
                        : 'Note: Saving with Confirmed status sends an official email to the customer with this meeting link.'}
                    </p>
                  )}
                </div>

                {/* Internal Admin Notes */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'ar' ? 'ملاحظات المشرف الداخلية (تدقيق وسجل):' : 'Internal Admin Notes (Audit Trail):'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={language === 'ar' ? 'سجل متابعة الاتصال، متطلبات الربط، أو توثيق الاجتماع...' : 'Add internal notes regarding call outcome, custom quotes, or fleet size...'}
                    value={adminNotesInput}
                    onChange={(e) => setAdminNotesInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                {/* Audit Information */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{selectedRequest.createdAt?.toDate ? selectedRequest.createdAt.toDate().toLocaleString() : selectedRequest.createdAt || 'N/A'}</span>
                  </div>
                  {selectedRequest.updatedBy && (
                    <div className="flex justify-between">
                      <span>Last Updated By:</span>
                      <span className="text-slate-300">{selectedRequest.updatedBy}</span>
                    </div>
                  )}
                  {selectedRequest.confirmedAt && (
                    <div className="flex justify-between">
                      <span>Confirmed At:</span>
                      <span className="text-emerald-400">
                        {selectedRequest.confirmedAt?.toDate ? selectedRequest.confirmedAt.toDate().toLocaleString() : selectedRequest.confirmedAt}
                      </span>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#081326] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>

              <button
                type="button"
                onClick={handleSaveStatusUpdate}
                disabled={isSavingAction}
                className="px-6 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:brightness-110 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                id="save-demo-request-action-btn"
              >
                {isSavingAction ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{language === 'ar' ? 'جارٍ الحفظ...' : 'Saving...'}</span>
                  </div>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'حفظ التحديث وإرسال الإشعار' : 'Save & Dispatch Status'}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
