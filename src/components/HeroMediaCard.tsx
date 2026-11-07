import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Radio, 
  Droplets, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ExternalLink,
  Navigation,
  MapPin,
  Clock,
  Film
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  getHeroVideoConfig, 
  HeroVideoConfig, 
  HERO_VIDEO_EVENT, 
  getYouTubeEmbedUrl, 
  getVimeoEmbedUrl 
} from '../services/heroVideoStore';

interface HeroMediaCardProps {
  onOpenOrderModal: (tankerId?: string) => void;
  onOpenAdminPortal?: (tab?: any) => void;
}

export const HeroMediaCard: React.FC<HeroMediaCardProps> = ({ 
  onOpenOrderModal,
  onOpenAdminPortal
}) => {
  const { language, isRTL } = useLanguage();
  
  // Dual-mode state: 'video' | 'radar'
  const [activeMode, setActiveMode] = useState<'video' | 'radar'>('video');
  const [videoConfig, setVideoConfig] = useState<HeroVideoConfig>(() => getHeroVideoConfig());
  
  // Video player playback states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);

  // Subscribe to live video config updates from Admin Panel
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<HeroVideoConfig>;
      if (customEvent.detail) {
        setVideoConfig(customEvent.detail);
        setVideoError(false);
      } else {
        setVideoConfig(getHeroVideoConfig());
        setVideoError(false);
      }
    };
    window.addEventListener(HERO_VIDEO_EVENT, handleUpdate);
    return () => window.removeEventListener(HERO_VIDEO_EVENT, handleUpdate);
  }, []);

  // Update muted state if config changes
  useEffect(() => {
    setIsMuted(videoConfig.muted);
  }, [videoConfig.muted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  // Check if video source is YouTube or Vimeo
  const isEmbed = videoConfig.sourceType === 'youtube' || videoConfig.sourceType === 'vimeo';
  const embedUrl = videoConfig.sourceType === 'youtube'
    ? getYouTubeEmbedUrl(videoConfig.videoUrl, videoConfig.autoPlay, videoConfig.loop, isMuted)
    : getVimeoEmbedUrl(videoConfig.videoUrl, videoConfig.autoPlay, videoConfig.loop, isMuted);

  return (
    <div className="relative w-full max-w-[560px] mx-auto rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-slate-900/95 via-[#0a1529]/95 to-[#060e1d] border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl flex flex-col justify-between gap-4 overflow-hidden">
      
      {/* Background ambient water glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ======================================================== */}
      {/* TOP DUAL-MODE SEGMENTED TOGGLE SWITCHER                   */}
      {/* [ 🎬 Video Animation | 📡 Live Radar Card ]              */}
      {/* ======================================================== */}
      <div className="relative z-10 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-1 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveMode('video')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMode === 'video'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-[1.01]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
          id="hero-toggle-video-btn"
        >
          <Film className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'فيديو الأنيميشن' : 'Video Animation'}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('radar')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMode === 'radar'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-[1.01]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
          id="hero-toggle-radar-btn"
        >
          <Radio className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'رادار التتبع المباشر' : 'Live Radar Card'}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: VIDEO ANIMATION CONTAINER                         */}
      {/* ======================================================== */}
      {activeMode === 'video' && (
        <div className="relative z-10 flex flex-col gap-3 animate-in fade-in duration-200">
          
          {/* Main Video Frame */}
          <div className="relative aspect-[16/10] sm:aspect-video w-full rounded-2xl bg-slate-950 border border-cyan-500/25 overflow-hidden shadow-xl group">
            
            {isEmbed ? (
              /* Embed (YouTube / Vimeo) */
              <iframe
                src={embedUrl}
                title={language === 'ar' ? videoConfig.titleAr : videoConfig.titleEn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : !videoError ? (
              /* Direct HTML5 Video Player */
              <>
                <video
                  ref={videoRef}
                  src={videoConfig.videoUrl}
                  poster={videoConfig.posterUrl || undefined}
                  autoPlay={videoConfig.autoPlay}
                  loop={videoConfig.loop}
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover"
                />

                {/* Video Controls Overlay */}
                {videoConfig.showControls && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 opacity-90 transition-opacity flex flex-col justify-between p-3.5 pointer-events-none">
                    
                    {/* Top status indicator on video */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>{language === 'ar' ? videoConfig.badgeAr : videoConfig.badgeEn}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsFullscreenModalOpen(true)}
                        className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white pointer-events-auto transition-colors cursor-pointer"
                        title={language === 'ar' ? 'عرض ملء الشاشة' : 'Fullscreen'}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom playback buttons */}
                    <div className="flex items-center justify-between pointer-events-auto">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-cyan-500/30 cursor-pointer"
                          title={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={toggleMute}
                          className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                          title={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                        </button>

                        <button
                          type="button"
                          onClick={restartVideo}
                          className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                          title="Restart"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded border border-slate-800">
                        HD 1080p
                      </span>
                    </div>

                  </div>
                )}
              </>
            ) : (
              /* Fallback / Animated Preview when video file is loading or placeholder */
              <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#071329] to-[#040914] overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/20 animate-pulse">
                  <Droplets className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {language === 'ar' ? videoConfig.titleAr : videoConfig.titleEn}
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mb-3 leading-relaxed">
                  {language === 'ar' ? videoConfig.taglineAr : videoConfig.taglineEn}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.load();
                        setVideoError(false);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إعادة المحاولة' : 'Retry Playback'}</span>
                  </button>

                  {onOpenAdminPortal && (
                    <button
                      type="button"
                      onClick={() => onOpenAdminPortal('hero_video')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'ar' ? 'تعديل الرابط' : 'Edit Link'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Quick Caption Strip under Video */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="truncate max-w-[340px]">
              {language === 'ar' ? videoConfig.taglineAr : videoConfig.taglineEn}
            </span>
            <button
              type="button"
              onClick={() => onOpenOrderModal('tanker-19t')}
              className="text-cyan-400 hover:text-cyan-300 font-bold shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{language === 'ar' ? 'اطلب الصهريج' : 'Order Tanker'}</span>
              <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: LIVE RADAR CARD                                  */}
      {/* ======================================================== */}
      {activeMode === 'radar' && (
        <div className="relative z-10 space-y-4 animate-in fade-in duration-200">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'رادار التوجيه الحي المباشر' : 'Live Fleet Active Dispatch'}
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400">Riyadh Hub</span>
          </div>

          {/* Telemetry Nodes */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#09152b]/95 border border-cyan-500/30 rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 uppercase font-medium">
                  {language === 'ar' ? 'السائق المعين' : 'Assigned Driver'}
                </div>
                <div className="text-xs font-bold text-cyan-300 truncate">
                  {language === 'ar' ? 'الكابتن طارق • #402' : 'Tariq • #402'}
                </div>
              </div>
            </div>

            <div className="bg-[#09152b]/95 border border-blue-500/30 rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 uppercase font-medium">
                  {language === 'ar' ? 'طلب العميل' : 'Customer Site'}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {language === 'ar' ? 'فيلا الملقا #14' : 'Al-Malqa Villa #14'}
                </div>
              </div>
            </div>
          </div>

          {/* Standard Tanker Payload & Quality Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{language === 'ar' ? 'سعة الصهريج القياسي' : 'Standard Tanker Size'}</span>
              <span className="font-mono font-bold text-cyan-300">19 {language === 'ar' ? 'طن' : 'Tons'} (19,000L)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{language === 'ar' ? 'جودة ونقاء المياه' : 'Water Quality'}</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {language === 'ar' ? 'صالحة للشرب ومحلاة' : 'Certified Potable'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{language === 'ar' ? 'متوسط وقت الوصول (ETA)' : 'Average ETA'}</span>
              <span className="font-mono text-white font-bold" dir="ltr">18 - 35 min</span>
            </div>
          </div>

          {/* ETA & Road Status Bar */}
          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-slate-300 font-medium">
                {language === 'ar' ? 'الصهريج على الطريق إلى الموقع' : 'En route to location'}
              </span>
            </div>
            <span className="font-mono text-cyan-300 font-bold">ONLINE</span>
          </div>

          {/* Instant Order Button */}
          <button
            type="button"
            onClick={() => onOpenOrderModal('tanker-19t')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Droplets className="w-4 h-4 fill-slate-950" />
            <span>{language === 'ar' ? 'بدء الطلب السريع للصهريج' : 'Start Instant Order'}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

        </div>
      )}

      {/* ======================================================== */}
      {/* FULLSCREEN EXPAND MODAL                                  */}
      {/* ======================================================== */}
      {isFullscreenModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
          onClick={() => setIsFullscreenModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video rounded-3xl bg-black border border-cyan-500/40 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsFullscreenModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>

            {isEmbed ? (
              <iframe
                src={embedUrl}
                title="Fullscreen Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoConfig.videoUrl}
                poster={videoConfig.posterUrl || undefined}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
};
