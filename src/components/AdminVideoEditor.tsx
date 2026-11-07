import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Save, 
  RotateCcw, 
  Check, 
  Play, 
  ExternalLink, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Info,
  Youtube,
  Video,
  Eye,
  Sliders,
  Layers,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  getHeroVideoConfig, 
  saveHeroVideoConfig, 
  resetHeroVideoConfig, 
  HeroVideoConfig, 
  VideoSourceType,
  detectVideoType,
  getYouTubeEmbedUrl,
  getVimeoEmbedUrl,
  isYouTubeUrl,
  subscribeHeroVideoConfig,
  DEFAULT_HERO_VIDEO_CONFIG
} from '../services/heroVideoStore';

export const AdminVideoEditor: React.FC = () => {
  const { language, isRTL } = useLanguage();
  
  const [config, setConfig] = useState<HeroVideoConfig>(() => getHeroVideoConfig());
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'source' | 'metadata' | 'playback' | 'preview'>('source');

  // Form states
  const [videoUrl, setVideoUrl] = useState<string>(config.videoUrl);
  const [sourceType, setSourceType] = useState<VideoSourceType>(config.sourceType);
  const [posterUrl, setPosterUrl] = useState<string>(config.posterUrl);
  const [titleAr, setTitleAr] = useState<string>(config.titleAr);
  const [titleEn, setTitleEn] = useState<string>(config.titleEn);
  const [taglineAr, setTaglineAr] = useState<string>(config.taglineAr);
  const [taglineEn, setTaglineEn] = useState<string>(config.taglineEn);
  const [badgeAr, setBadgeAr] = useState<string>(config.badgeAr);
  const [badgeEn, setBadgeEn] = useState<string>(config.badgeEn);
  const [autoPlay, setAutoPlay] = useState<boolean>(config.autoPlay);
  const [loop, setLoop] = useState<boolean>(config.loop);
  const [muted, setMuted] = useState<boolean>(config.muted);
  const [showControls, setShowControls] = useState<boolean>(config.showControls);

  // Sync with Firestore in real-time
  useEffect(() => {
    const unsubscribe = subscribeHeroVideoConfig((fresh) => {
      setConfig(fresh);
    });
    return () => unsubscribe();
  }, []);

  // Auto-detect source type when URL changes if user is typing
  const handleUrlChange = (newUrl: string) => {
    setVideoUrl(newUrl);
    const detected = detectVideoType(newUrl);
    setSourceType(detected);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setIsSaving(true);
      setSaveError(null);

      const resolvedUrl = videoUrl.trim() || DEFAULT_HERO_VIDEO_CONFIG.videoUrl;
      const resolvedType = isYouTubeUrl(resolvedUrl) ? 'youtube' : sourceType;

      const updated: HeroVideoConfig = {
        videoUrl: resolvedUrl,
        sourceType: resolvedType,
        posterUrl: posterUrl.trim(),
        titleAr: titleAr.trim() || config.titleAr,
        titleEn: titleEn.trim() || config.titleEn,
        taglineAr: taglineAr.trim() || config.taglineAr,
        taglineEn: taglineEn.trim() || config.taglineEn,
        badgeAr: badgeAr.trim() || config.badgeAr,
        badgeEn: badgeEn.trim() || config.badgeEn,
        autoPlay,
        loop,
        muted,
        showControls,
      };

      await saveHeroVideoConfig(updated);
      setConfig(updated);
      setSourceType(resolvedType);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من استعادة الإعدادات الافتراضية للفيديو ومزامنتها؟' : 'Reset hero video configuration to default?')) {
      try {
        setIsSaving(true);
        const def = await resetHeroVideoConfig();
        setConfig(def);
        setVideoUrl(def.videoUrl);
        setSourceType(def.sourceType);
        setPosterUrl(def.posterUrl);
        setTitleAr(def.titleAr);
        setTitleEn(def.titleEn);
        setTaglineAr(def.taglineAr);
        setTaglineEn(def.taglineEn);
        setBadgeAr(def.badgeAr);
        setBadgeEn(def.badgeEn);
        setAutoPlay(def.autoPlay);
        setLoop(def.loop);
        setMuted(def.muted);
        setShowControls(def.showControls);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err: any) {
        setSaveError(err.message || 'Failed to reset configuration');
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Preset loaders for convenience
  const applyPreset = (type: 'default_youtube' | 'youtube_demo' | 'sample_mp4') => {
    if (type === 'default_youtube') {
      setVideoUrl('https://www.youtube.com/watch?v=Rt1Ahwj3XsA');
      setSourceType('youtube');
    } else if (type === 'youtube_demo') {
      setVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      setSourceType('youtube');
    } else if (type === 'sample_mp4') {
      setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      setSourceType('direct');
    }
  };

  const isEmbed = isYouTubeUrl(videoUrl) || sourceType === 'youtube' || sourceType === 'vimeo';
  const previewEmbedUrl = (isYouTubeUrl(videoUrl) || sourceType === 'youtube')
    ? getYouTubeEmbedUrl(videoUrl, autoPlay, loop, muted)
    : getVimeoEmbedUrl(videoUrl, autoPlay, loop, muted);

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0a1a36] to-[#071329] border border-cyan-500/25 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold shadow-inner">
            <Film className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-display">
                {language === 'ar' ? 'إدارة فيديو الأنيميشن للواجهة الرئيسية (Hero Video)' : 'Hero Section Video & Animation Manager'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Live Dual-Mode
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {language === 'ar'
                ? 'تحكم في رابط فيديو صهاريج نبع، سواء كان ملف MP4 محلي، رابط YouTube/Vimeo، أو خادم سحابي'
                : 'Configure video source (Local MP4/WebM, YouTube, Vimeo, or CDN URL), subtitles, & playback behavior'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'استعادة الافتراضي' : 'Reset'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-md shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
            id="admin-save-hero-video-btn"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4 text-slate-950" />
            ) : (
              <Save className="w-4 h-4 text-slate-950" />
            )}
            <span>
              {isSaving
                ? (language === 'ar' ? 'جارِ الحفظ...' : 'Saving...')
                : saveSuccess
                ? (language === 'ar' ? 'تم الحفظ والمزامنة!' : 'Saved Live!')
                : (language === 'ar' ? 'حفظ ونشر التعديل' : 'Save Changes')}
            </span>
          </button>
        </div>
      </div>

      {saveError && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {language === 'ar'
              ? 'تم تحديث إعدادات الفيديو وحفظها سحابياً في Firestore بنجاح. تنعكس التغييرات فوراً في الواجهة الرئيسية على كافة الأجهزة وفي Vercel!'
              : 'Hero video settings updated and synced to Firestore successfully! Changes reflect immediately on Vercel and all devices.'}
          </span>
        </div>
      )}

      {/* Editor Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Navigation Sub-Tabs */}
          <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('source')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'source' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{language === 'ar' ? 'مصدر ورابط الفيديو' : 'Video Source & URL'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('metadata')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'metadata' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{language === 'ar' ? 'العناوين والوصف' : 'Titles & Copy'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('playback')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'playback' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{language === 'ar' ? 'خصائص التشغيل' : 'Playback Settings'}</span>
            </button>
          </div>

          {/* TAB 1: Video Source & URL */}
          {activeTab === 'source' && (
            <div className="p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-5">
              
              {/* Source Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2 font-mono">
                  {language === 'ar' ? 'نوع مصدر الفيديو (Source Type):' : 'Video Source Type:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'local', label: language === 'ar' ? 'ملف محلي (Local)' : 'Local File', icon: Video },
                    { id: 'youtube', label: 'YouTube', icon: Youtube },
                    { id: 'vimeo', label: 'Vimeo', icon: Film },
                    { id: 'direct', label: language === 'ar' ? 'رابط MP4 خارجي' : 'Direct MP4 URL', icon: ExternalLink }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = sourceType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSourceType(item.id as VideoSourceType)}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Video URL Input */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  {language === 'ar' ? 'رابط أو مسار الفيديو (Video URL / Path):' : 'Video URL or Asset Path:'}
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder={
                    sourceType === 'youtube'
                      ? 'https://www.youtube.com/watch?v=... or https://youtu.be/...'
                      : sourceType === 'local'
                      ? '/assets/nabaa-animation.mp4'
                      : 'https://your-domain.com/videos/nabaa-animation.mp4'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  dir="ltr"
                />
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>
                    {sourceType === 'local'
                      ? (language === 'ar' 
                          ? 'ضع ملف الفيديو في مجلد public/assets/ باسم nabaa-animation.mp4' 
                          : 'Place your video in the public/assets/ folder named nabaa-animation.mp4')
                      : sourceType === 'youtube'
                      ? (language === 'ar' 
                          ? 'يدعم كافة روابط يوتيوب (العادية، المختصرة youtu.be، والفيديوهات القصيرة Shorts)' 
                          : 'Supports standard YouTube URLs, shortened youtu.be links, and YouTube Shorts')
                      : (language === 'ar' 
                          ? 'أدخل رابط مباشر لملف MP4 أو WebM مستضاف على خادم أو سحابة' 
                          : 'Enter a direct MP4 or WebM URL hosted on any CDN or Cloud storage')}
                  </span>
                </p>
              </div>

              {/* Poster Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  {language === 'ar' ? 'رابط الصورة المصغرة (Poster / Thumbnail URL):' : 'Thumbnail Poster URL (Optional):'}
                </label>
                <input
                  type="text"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  placeholder="https://... or /assets/poster.jpg (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  dir="ltr"
                />
              </div>

              {/* Quick Presets Strip */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block mb-2">
                  {language === 'ar' ? 'نماذج جاهزة للاختبار السريع:' : 'Quick Presets for Testing:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyPreset('default_youtube')}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-cyan-300 border border-slate-700 cursor-pointer flex items-center gap-1"
                  >
                    <Youtube className="w-3 h-3 text-red-400" />
                    <span>{language === 'ar' ? 'فيديو أنيميشن المياه (YouTube)' : 'Nabaa Water Dispatch Animation'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('sample_mp4')}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700 cursor-pointer"
                  >
                    Google Cloud Sample MP4
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Titles & Copy (Arabic & English) */}
          {activeTab === 'metadata' && (
            <div className="p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-4">
              
              {/* Title Arabic & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    {language === 'ar' ? 'عنوان الفيديو (بالعربية):' : 'Video Title (Arabic):'}
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    {language === 'ar' ? 'عنوان الفيديو (بالإنجليزية):' : 'Video Title (English):'}
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Tagline Arabic & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    {language === 'ar' ? 'الوصف التوضيحي (بالعربية):' : 'Tagline / Caption (Arabic):'}
                  </label>
                  <textarea
                    rows={2}
                    value={taglineAr}
                    onChange={(e) => setTaglineAr(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    {language === 'ar' ? 'الوصف التوضيحي (بالإنجليزية):' : 'Tagline / Caption (English):'}
                  </label>
                  <textarea
                    rows={2}
                    value={taglineEn}
                    onChange={(e) => setTaglineEn(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Badge Arabic & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    {language === 'ar' ? 'شارة الفيديو (بالعربية):' : 'Floating Badge (Arabic):'}
                  </label>
                  <input
                    type="text"
                    value={badgeAr}
                    onChange={(e) => setBadgeAr(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    {language === 'ar' ? 'شارة الفيديو (بالإنجليزية):' : 'Floating Badge (English):'}
                  </label>
                  <input
                    type="text"
                    value={badgeEn}
                    onChange={(e) => setBadgeEn(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Playback Settings */}
          {activeTab === 'playback' && (
            <div className="p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 space-y-4">
              
              <div className="space-y-3">
                {/* AutoPlay */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">
                      {language === 'ar' ? 'التشغيل التلقائي (Autoplay)' : 'Autoplay on Viewport'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'ar' ? 'يبدأ الفيديو بالعمل تلقائياً فور فتح الصفحة' : 'Start playing automatically when loaded'}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => setAutoPlay(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </label>

                {/* Loop */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">
                      {language === 'ar' ? 'التكرار المستمر (Loop)' : 'Continuous Loop'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'ar' ? 'إعادة تشغيل الفيديو فور انتهائه دون توقف' : 'Repeat playback automatically in a loop'}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={loop}
                    onChange={(e) => setLoop(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </label>

                {/* Muted */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">
                      {language === 'ar' ? 'كتم الصوت افتراضياً (Start Muted)' : 'Start Muted (Required for Autoplay)'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'ar' ? 'ضروري للسماح بالتشغيل التلقائي في متصفحات الجوال والويب' : 'Mandatory across web browsers for silent autoplay'}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={muted}
                    onChange={(e) => setMuted(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </label>

                {/* Show Controls */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">
                      {language === 'ar' ? 'إظهار أزرار التحكم المخصصة (Controls)' : 'Show Custom Video Controls'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'ar' ? 'أزرار إيقاف/تشغيل، كتم/إلغاء كتم، وتكبير الشاشة' : 'Overlay Play/Pause, Mute/Unmute, and Fullscreen icons'}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showControls}
                    onChange={(e) => setShowControls(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </label>
              </div>

            </div>
          )}

        </div>

        {/* Right Live Preview Box (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-3xl bg-[#09152b] border border-cyan-500/25 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'ar' ? 'معاينة حية ومباشرة' : 'Live Player Preview'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {sourceType}
              </span>
            </div>

            {/* Simulated Hero Player Container */}
            <div className="aspect-video w-full rounded-2xl bg-black border border-cyan-500/30 overflow-hidden relative shadow-lg">
              {isEmbed ? (
                <iframe
                  src={previewEmbedUrl}
                  title="Preview"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <video
                  src={videoUrl}
                  poster={posterUrl || undefined}
                  autoPlay={autoPlay}
                  loop={loop}
                  muted={muted}
                  playsInline
                  controls={showControls}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Preview Metadata */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-white truncate">
                {language === 'ar' ? titleAr : titleEn}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {language === 'ar' ? taglineAr : taglineEn}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'ar' ? 'تطبيق وحفظ الإعدادات للواجهة' : 'Apply & Save Configuration'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
