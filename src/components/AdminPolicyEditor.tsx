import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  RotateCcw, 
  ExternalLink, 
  Sparkles, 
  Calendar, 
  HelpCircle, 
  X, 
  Save, 
  Layers, 
  Check, 
  AlertTriangle,
  ListPlus,
  Eye,
  Info,
  User,
  Truck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  LegalDocument, 
  PolicySection, 
  PolicyBullet,
  LegalDocId,
  getLegalDocument, 
  saveLegalDocument, 
  addSectionToDocument, 
  updateSectionInDocument, 
  deleteSectionFromDocument, 
  reorderSectionsInDocument, 
  resetLegalDocumentToDefault,
  LEGAL_CONTENT_EVENT
} from '../services/legalContentStore';
import { useRouter } from '../context/RouterContext';

interface AdminPolicyEditorProps {
  initialDocId?: LegalDocId;
  onNavigateToPage?: (path: string) => void;
}

export const AdminPolicyEditor: React.FC<AdminPolicyEditorProps> = ({ 
  initialDocId = 'customer_privacy',
  onNavigateToPage 
}) => {
  const { language, isRTL } = useLanguage();
  const { navigate } = useRouter();

  const [activeDocId, setActiveDocId] = useState<LegalDocId>(initialDocId);
  const [doc, setDoc] = useState<LegalDocument>(() => getLegalDocument(initialDocId));
  
  // UI Tabs inside the editor
  const [activeTab, setActiveTab] = useState<'sections' | 'metadata'>('sections');
  const [languageMode, setLanguageMode] = useState<'both' | 'ar' | 'en'>('both');
  
  // Section Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  // Section Form state
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [badgeAr, setBadgeAr] = useState('');
  const [badgeEn, setBadgeEn] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [isActiveSection, setIsActiveSection] = useState(true);
  const [bullets, setBullets] = useState<PolicyBullet[]>([]);

  // Metadata form state
  const [docTitleAr, setDocTitleAr] = useState('');
  const [docTitleEn, setDocTitleEn] = useState('');
  const [taglineAr, setTaglineAr] = useState('');
  const [taglineEn, setTaglineEn] = useState('');
  const [lastUpdatedAr, setLastUpdatedAr] = useState('');
  const [lastUpdatedEn, setLastUpdatedEn] = useState('');
  const [introAr, setIntroAr] = useState('');
  const [introEn, setIntroEn] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Notification message
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync state when active document changes
  useEffect(() => {
    const currentDoc = getLegalDocument(activeDocId);
    setDoc(currentDoc);
    setDocTitleAr(currentDoc.titleAr);
    setDocTitleEn(currentDoc.titleEn);
    setTaglineAr(currentDoc.taglineAr);
    setTaglineEn(currentDoc.taglineEn);
    setLastUpdatedAr(currentDoc.lastUpdatedAr);
    setLastUpdatedEn(currentDoc.lastUpdatedEn);
    setIntroAr(currentDoc.introAr);
    setIntroEn(currentDoc.introEn);
    setContactEmail(currentDoc.contactEmail);
    setContactPhone(currentDoc.contactPhone);
  }, [activeDocId]);

  // Listen to legal content changes across tabs or windows
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ docId: LegalDocId }>;
      if (customEvent.detail && customEvent.detail.docId === activeDocId) {
        setDoc(getLegalDocument(activeDocId));
      }
    };
    window.addEventListener(LEGAL_CONTENT_EVENT, handleUpdate);
    return () => window.removeEventListener(LEGAL_CONTENT_EVENT, handleUpdate);
  }, [activeDocId]);

  const showNotification = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleOpenAddModal = () => {
    setEditingSectionId(null);
    const nextNumber = doc.sections.length + 1;
    setTitleAr(`${nextNumber}. قسم جديد`);
    setTitleEn(`${nextNumber}. New Section`);
    setBadgeAr('بند جديد');
    setBadgeEn('New Clause');
    setContentAr('');
    setContentEn('');
    setIsActiveSection(true);
    setBullets([]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (section: PolicySection) => {
    setEditingSectionId(section.id);
    setTitleAr(section.titleAr);
    setTitleEn(section.titleEn);
    setBadgeAr(section.badgeAr || '');
    setBadgeEn(section.badgeEn || '');
    setContentAr(section.contentAr);
    setContentEn(section.contentEn);
    setIsActiveSection(section.isActive);
    setBullets(section.bullets ? [...section.bullets] : []);
    setIsModalOpen(true);
  };

  const handleAddBullet = () => {
    const newBullet: PolicyBullet = {
      id: `b-${Date.now()}`,
      labelAr: 'نقطة جديدة:',
      labelEn: 'New Point:',
      textAr: '',
      textEn: ''
    };
    setBullets([...bullets, newBullet]);
  };

  const handleUpdateBullet = (id: string, updates: Partial<PolicyBullet>) => {
    setBullets(bullets.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleDeleteBullet = (id: string) => {
    setBullets(bullets.filter(b => b.id !== id));
  };

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr && !titleEn) {
      showNotification(language === 'ar' ? 'يرجى إدخال عنوان القسم' : 'Please provide section title', 'error');
      return;
    }

    if (editingSectionId) {
      updateSectionInDocument(activeDocId, editingSectionId, {
        titleAr,
        titleEn,
        badgeAr: badgeAr || undefined,
        badgeEn: badgeEn || undefined,
        contentAr,
        contentEn,
        isActive: isActiveSection,
        bullets: bullets.length > 0 ? bullets : undefined
      });
      showNotification(language === 'ar' ? 'تم تحديث القسم بنجاح' : 'Section updated successfully');
    } else {
      addSectionToDocument(activeDocId, {
        titleAr,
        titleEn,
        badgeAr: badgeAr || undefined,
        badgeEn: badgeEn || undefined,
        contentAr,
        contentEn,
        bullets: bullets.length > 0 ? bullets : undefined
      });
      showNotification(language === 'ar' ? 'تم إضافة قسم جديد بنجاح' : 'New section added successfully');
    }

    setDoc(getLegalDocument(activeDocId));
    setIsModalOpen(false);
  };

  const handleDeleteSection = (sectionId: string, sectionTitle: string) => {
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف (${sectionTitle})؟` : `Delete section (${sectionTitle})?`)) {
      deleteSectionFromDocument(activeDocId, sectionId);
      setDoc(getLegalDocument(activeDocId));
      showNotification(language === 'ar' ? 'تم حذف القسم' : 'Section deleted', 'info');
    }
  };

  const handleReorder = (sectionId: string, direction: 'up' | 'down') => {
    reorderSectionsInDocument(activeDocId, sectionId, direction);
    setDoc(getLegalDocument(activeDocId));
  };

  const handleToggleActive = (section: PolicySection) => {
    updateSectionInDocument(activeDocId, section.id, { isActive: !section.isActive });
    setDoc(getLegalDocument(activeDocId));
    showNotification(
      language === 'ar' 
        ? (!section.isActive ? 'تم تفعيل القسم' : 'تم تعطيل القسم')
        : (!section.isActive ? 'Section activated' : 'Section hidden'), 
      'info'
    );
  };

  const handleSaveMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: LegalDocument = {
      ...doc,
      titleAr: docTitleAr,
      titleEn: docTitleEn,
      taglineAr,
      taglineEn,
      lastUpdatedAr,
      lastUpdatedEn,
      introAr,
      introEn,
      contactEmail,
      contactPhone
    };
    saveLegalDocument(updated);
    setDoc(updated);
    showNotification(language === 'ar' ? 'تم حفظ التعديلات العامة للوثيقة بنجاح' : 'Document header & metadata saved successfully');
  };

  const handleResetDocument = () => {
    if (window.confirm(
      language === 'ar'
        ? 'هل أنت متأكد من إعادة ضبط هذه الوثيقة إلى نصوصها المعتمدة الافتراضية؟ سيتم مسح أي تعديلات سابقة عليها.'
        : 'Are you sure you want to restore this document to default certified clauses? Custom changes will be reset.'
    )) {
      const reset = resetLegalDocumentToDefault(activeDocId);
      setDoc(reset);
      showNotification(language === 'ar' ? 'تمت استعادة الوثيقة الافتراضية المعتمدة' : 'Default policy restored', 'info');
    }
  };

  // Get current public URL for live preview
  const getPublicPath = (docId: LegalDocId) => {
    switch (docId) {
      case 'customer_privacy': return '/privacy-policy/customer';
      case 'driver_privacy': return '/privacy-policy/driver';
      case 'customer_terms': return '/terms-and-conditions/customer';
      case 'driver_terms': return '/terms-and-conditions/driver';
      default: return '/privacy-policy';
    }
  };

  const publicUrl = getPublicPath(activeDocId);

  return (
    <div className="space-y-6">
      
      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200 ${
          notification.type === 'error'
            ? 'bg-rose-950/90 text-rose-200 border border-rose-500/40'
            : notification.type === 'info'
            ? 'bg-amber-950/90 text-amber-200 border border-amber-500/40'
            : 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/40'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'error' ? <AlertTriangle className="w-4 h-4 text-rose-400" /> : <Check className="w-4 h-4 text-emerald-400" />}
            <span>{notification.text}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4-Document Selector Segmented Controls */}
      <div className="p-4 rounded-2xl bg-[#09152b] border border-cyan-500/20 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{language === 'ar' ? 'اختر الوثيقة القانونية للتعديل (4 وثائق منفصلة):' : 'Select Legal Document to Edit (4 Distinct Documents):'}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 font-medium transition-colors"
            >
              <span>{language === 'ar' ? 'معاينة الصفحة الحية' : 'Live Preview'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Cards Grid for Documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* 1. Customer Privacy */}
          <button
            type="button"
            onClick={() => setActiveDocId('customer_privacy')}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              activeDocId === 'customer_privacy'
                ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold">
                <User className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'العميل' : 'Customer'}</span>
              </div>
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="font-bold text-xs">
              {language === 'ar' ? 'سياسة خصوصية العميل' : 'Customer Privacy Policy'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
              /privacy-policy/customer
            </div>
          </button>

          {/* 2. Driver Privacy */}
          <button
            type="button"
            onClick={() => setActiveDocId('driver_privacy')}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              activeDocId === 'driver_privacy'
                ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'السائق' : 'Driver'}</span>
              </div>
              <Shield className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-bold text-xs">
              {language === 'ar' ? 'سياسة خصوصية السائق' : 'Driver Privacy Policy'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
              /privacy-policy/driver
            </div>
          </button>

          {/* 3. Customer Terms */}
          <button
            type="button"
            onClick={() => setActiveDocId('customer_terms')}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              activeDocId === 'customer_terms'
                ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold">
                <User className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'العميل' : 'Customer'}</span>
              </div>
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="font-bold text-xs">
              {language === 'ar' ? 'شروط وأحكام العميل' : 'Customer Terms & Conditions'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
              /terms-and-conditions/customer
            </div>
          </button>

          {/* 4. Driver Terms */}
          <button
            type="button"
            onClick={() => setActiveDocId('driver_terms')}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              activeDocId === 'driver_terms'
                ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'السائق' : 'Driver'}</span>
              </div>
              <FileText className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-bold text-xs">
              {language === 'ar' ? 'شروط وأحكام السائق' : 'Driver Terms & Conditions'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
              /terms-and-conditions/driver
            </div>
          </button>
        </div>
      </div>

      {/* Secondary Controls Bar: Mode Switcher & Add Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
        
        {/* Sections vs Metadata tab */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? `البنود والأقسام (${doc.sections.length})` : `Sections (${doc.sections.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metadata')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'metadata'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'العناوين والمقدمة' : 'Title & Intro'}</span>
          </button>
        </div>

        {/* Right action tools */}
        <div className="flex items-center gap-2">
          {activeTab === 'sections' && (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{language === 'ar' ? 'إضافة بند جديد' : 'Add New Section'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleResetDocument}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors cursor-pointer"
            title={language === 'ar' ? 'استعادة البنود الافتراضية' : 'Restore certified defaults'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TAB 1: Sections Manager List */}
      {activeTab === 'sections' && (
        <div className="space-y-3">
          {doc.sections.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Layers className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-400">
                {language === 'ar' ? 'لا توجد بنود حالياً في هذه الوثيقة.' : 'No sections in this document.'}
              </p>
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
              >
                {language === 'ar' ? 'إضافة بند أول' : 'Add First Section'}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {doc.sections.map((section, idx) => (
                <div
                  key={section.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    section.isActive
                      ? 'bg-[#09152b]/90 border-cyan-500/20 hover:border-cyan-500/40'
                      : 'bg-slate-950/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Left title and badges */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Reorder arrows */}
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleReorder(section.id, 'up')}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === doc.sections.length - 1}
                          onClick={() => handleReorder(section.id, 'down')}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Number badge */}
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {section.order}
                      </span>

                      {/* Titles */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">
                            {section.titleAr || section.titleEn}
                          </h4>
                          {(section.badgeAr || section.badgeEn) && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                              {section.badgeAr || section.badgeEn}
                            </span>
                          )}
                          {!section.isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-500/30">
                              {language === 'ar' ? 'معطل' : 'Hidden'}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5" dir="ltr">
                          {section.titleEn}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(section)}
                        className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                          section.isActive
                            ? 'bg-slate-800/80 border-slate-700 text-emerald-400 hover:bg-slate-700'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                        title={section.isActive ? 'Hide section' : 'Show section'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(section)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSection(section.id, section.titleAr || section.titleEn)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                  {/* Section Content Snippet */}
                  <div className="mt-2.5 pt-2.5 border-t border-slate-800/70 text-xs text-slate-300 line-clamp-2">
                    {section.contentAr || section.contentEn}
                  </div>

                  {/* Sub-bullets count badge */}
                  {section.bullets && section.bullets.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
                      <ListPlus className="w-3.5 h-3.5" />
                      <span>{section.bullets.length} {language === 'ar' ? 'نقاط وتفريعات تفصيلية' : 'bullet points attached'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Metadata and Header Settings Form */}
      {activeTab === 'metadata' && (
        <form onSubmit={handleSaveMetadata} className="p-6 rounded-2xl bg-[#09152b] border border-cyan-500/20 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">
                {language === 'ar' ? 'إعدادات عنوان ومقدمة الوثيقة' : 'Document Header & Introduction'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'تعديل العناوين الرئيسية، تواريخ التحديث، وبيانات التواصل' : 'Configure main heading, intro excerpt, update dates and contact info'}
              </p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'ar' ? 'حفظ التعديلات' : 'Save Header'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title Ar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="rtl">
                عنوان الوثيقة (العربية):
              </label>
              <input
                type="text"
                value={docTitleAr}
                onChange={(e) => setDocTitleAr(e.target.value)}
                dir="rtl"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            {/* Title En */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                Document Title (English):
              </label>
              <input
                type="text"
                value={docTitleEn}
                onChange={(e) => setDocTitleEn(e.target.value)}
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            {/* Tagline Ar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="rtl">
                الشعار الفرعي (العربية):
              </label>
              <input
                type="text"
                value={taglineAr}
                onChange={(e) => setTaglineAr(e.target.value)}
                dir="rtl"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Tagline En */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                Tagline / Subheading (English):
              </label>
              <input
                type="text"
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Last Updated Ar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="rtl">
                تاريخ آخر تحديث (العربية):
              </label>
              <input
                type="text"
                value={lastUpdatedAr}
                onChange={(e) => setLastUpdatedAr(e.target.value)}
                dir="rtl"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Last Updated En */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                Last Updated (English):
              </label>
              <input
                type="text"
                value={lastUpdatedEn}
                onChange={(e) => setLastUpdatedEn(e.target.value)}
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                Official Contact Email:
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                Official Contact Phone:
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Intro Paragraphs */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="rtl">
                المقدمة الإيضاحية (العربية):
              </label>
              <textarea
                rows={3}
                value={introAr}
                onChange={(e) => setIntroAr(e.target.value)}
                dir="rtl"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                Executive Introduction (English):
              </label>
              <textarea
                rows={3}
                value={introEn}
                onChange={(e) => setIntroEn(e.target.value)}
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'ar' ? 'حفظ إعدادات الوثيقة' : 'Save Header Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION MODAL (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#09152b] border border-cyan-500/30 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {editingSectionId 
                      ? (language === 'ar' ? 'تعديل بند قانوني' : 'Edit Legal Section')
                      : (language === 'ar' ? 'إضافة بند قانوني جديد' : 'Add New Legal Section')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'إدخال العنوان، المحتوى، الشارات، والنقاط الفرعية' : 'Provide titles, content, clause badges, and sub-bullets'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveSection} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Language Mode Selector inside modal */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="text-slate-400 font-medium">
                  {language === 'ar' ? 'لغات الإدخال:' : 'Input Languages:'}
                </span>
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setLanguageMode('both')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                      languageMode === 'both' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    العربية + English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguageMode('ar')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                      languageMode === 'ar' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    العربية فقط
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguageMode('en')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                      languageMode === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English Only
                  </button>
                </div>
              </div>

              {/* Title Inputs */}
              {(languageMode === 'both' || languageMode === 'ar') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1" dir="rtl">
                    عنوان البند (العربية): *
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    dir="rtl"
                    placeholder="مثال: 1. معايير سلامة الصهريج ونظافة الخزان"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    required={languageMode === 'ar' || languageMode === 'both'}
                  />
                </div>
              )}

              {(languageMode === 'both' || languageMode === 'en') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                    Section Title (English): *
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    dir="ltr"
                    placeholder="e.g.: 1. Potable Tank Hygiene & Health Compliance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    required={languageMode === 'en' || languageMode === 'both'}
                  />
                </div>
              )}

              {/* Badge Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(languageMode === 'both' || languageMode === 'ar') && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1" dir="rtl">
                      شارة البند (العربية - اختياري):
                    </label>
                    <input
                      type="text"
                      value={badgeAr}
                      onChange={(e) => setBadgeAr(e.target.value)}
                      dir="rtl"
                      placeholder="مثال: الاشتراطات الصحية"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                )}

                {(languageMode === 'both' || languageMode === 'en') && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                      Clause Badge (English - optional):
                    </label>
                    <input
                      type="text"
                      value={badgeEn}
                      onChange={(e) => setBadgeEn(e.target.value)}
                      dir="ltr"
                      placeholder="e.g.: Health Standard"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Main Content Paragraphs */}
              {(languageMode === 'both' || languageMode === 'ar') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1" dir="rtl">
                    نص البند الكامل (العربية):
                  </label>
                  <textarea
                    rows={4}
                    value={contentAr}
                    onChange={(e) => setContentAr(e.target.value)}
                    dir="rtl"
                    placeholder="اكتب شرح البند القانوني هنا..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              )}

              {(languageMode === 'both' || languageMode === 'en') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1" dir="ltr">
                    Section Full Content (English):
                  </label>
                  <textarea
                    rows={4}
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                    dir="ltr"
                    placeholder="Provide full legal paragraph here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Sub-Bullets Manager */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <ListPlus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === 'ar' ? 'النقاط والتفريعات الفرعية الملحقة:' : 'Detailed Bullet Sub-Points:'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{language === 'ar' ? 'إضافة نقطة فرعية' : 'Add Bullet'}</span>
                  </button>
                </div>

                {bullets.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    {language === 'ar' ? 'لا توجد تفريعات إضافية لهذا البند.' : 'No bullet points attached to this section.'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {bullets.map((bullet, bIdx) => (
                      <div key={bullet.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-cyan-400 font-bold">
                            #{bIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteBullet(bullet.id)}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                            title="Remove bullet"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <input
                              type="text"
                              value={bullet.labelAr}
                              onChange={(e) => handleUpdateBullet(bullet.id, { labelAr: e.target.value })}
                              dir="rtl"
                              placeholder="عنوان النقطة (عربي)"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <textarea
                              rows={2}
                              value={bullet.textAr}
                              onChange={(e) => handleUpdateBullet(bullet.id, { textAr: e.target.value })}
                              dir="rtl"
                              placeholder="نص النقطة (عربي)"
                              className="w-full mt-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                          </div>

                          <div>
                            <input
                              type="text"
                              value={bullet.labelEn}
                              onChange={(e) => handleUpdateBullet(bullet.id, { labelEn: e.target.value })}
                              dir="ltr"
                              placeholder="Bullet Label (English)"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                            <textarea
                              rows={2}
                              value={bullet.textEn}
                              onChange={(e) => handleUpdateBullet(bullet.id, { textEn: e.target.value })}
                              dir="ltr"
                              placeholder="Bullet text (English)"
                              className="w-full mt-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section Visibility Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveCheck"
                  checked={isActiveSection}
                  onChange={(e) => setIsActiveSection(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800"
                />
                <label htmlFor="isActiveCheck" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  {language === 'ar' ? 'عرض هذا البند في الصفحة العامة للمستخدمين' : 'Publish and show this section on public page'}
                </label>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === 'ar' ? 'حفظ وتثبيت البند' : 'Save Section'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
