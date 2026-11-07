export type VideoSourceType = 'direct' | 'youtube' | 'vimeo' | 'local';

export interface HeroVideoConfig {
  videoUrl: string;
  sourceType: VideoSourceType;
  posterUrl: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  showControls: boolean;
  badgeAr: string;
  badgeEn: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'nabaa_hero_video_config_v1';
export const HERO_VIDEO_EVENT = 'nabaa_hero_video_updated';

// Default configuration with fallback video / animation placeholder
export const DEFAULT_HERO_VIDEO_CONFIG: HeroVideoConfig = {
  videoUrl: '/assets/nabaa-animation.mp4',
  sourceType: 'local',
  posterUrl: '',
  titleAr: 'أنيميشن رحلة صهريج نبع لتوريد المياه',
  titleEn: 'The Nabaa Tanker Dispatch Journey Animation',
  taglineAr: 'شاهد دورة توصيل مياه الشرب من محطات الأشياب إلى خزان العميل بضغطة زر',
  taglineEn: 'Watch the seamless potable water delivery cycle from municipal depots to customer tanks',
  autoPlay: true,
  loop: true,
  muted: true,
  showControls: true,
  badgeAr: 'فيديو المنظومة ثلاثي الأبعاد',
  badgeEn: '3D Logistics Animation',
  updatedAt: new Date().toISOString(),
};

// Convert standard YouTube / Shorts / youtu.be URLs to embed URL
export const getYouTubeEmbedUrl = (url: string, autoPlay = true, loop = true, muted = true): string => {
  try {
    let videoId = '';
    
    // Check for youtu.be/ID
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split(/[?#]/)[0];
    }
    // Check for youtube.com/shorts/ID
    else if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1].split(/[?#]/)[0];
    }
    // Check for youtube.com/watch?v=ID
    else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    }
    // Check for youtube.com/embed/ID
    else if (url.includes('/embed/')) {
      videoId = url.split('/embed/')[1].split(/[?#]/)[0];
    }

    if (videoId) {
      const params = new URLSearchParams({
        autoplay: autoPlay ? '1' : '0',
        mute: muted ? '1' : '0',
        loop: loop ? '1' : '0',
        playlist: loop ? videoId : '',
        controls: '1',
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
      });
      return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
    }
  } catch (err) {
    console.error('Failed to parse YouTube embed URL:', err);
  }
  return url;
};

// Convert Vimeo URL to embed URL
export const getVimeoEmbedUrl = (url: string, autoPlay = true, loop = true, muted = true): string => {
  try {
    const match = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
    if (match && match[3]) {
      const videoId = match[3];
      const params = new URLSearchParams({
        autoplay: autoPlay ? '1' : '0',
        muted: muted ? '1' : '0',
        loop: loop ? '1' : '0',
        byline: '0',
        title: '0',
        portrait: '0',
      });
      return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    }
  } catch (err) {
    console.error('Failed to parse Vimeo embed URL:', err);
  }
  return url;
};

// Determine video source type from URL automatically if desired
export const detectVideoType = (url: string): VideoSourceType => {
  const trimmed = url.trim().toLowerCase();
  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) return 'youtube';
  if (trimmed.includes('vimeo.com')) return 'vimeo';
  if (trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.includes('assets/')) return 'local';
  return 'direct';
};

// Retrieve config from storage or return default
export const getHeroVideoConfig = (): HeroVideoConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_HERO_VIDEO_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Error reading hero video config from storage:', err);
  }
  return DEFAULT_HERO_VIDEO_CONFIG;
};

// Save config to storage and notify listeners across components
export const saveHeroVideoConfig = (config: HeroVideoConfig): void => {
  try {
    const updated = { ...config, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(HERO_VIDEO_EVENT, { detail: updated }));
  } catch (err) {
    console.error('Error saving hero video config:', err);
  }
};

// Reset to default
export const resetHeroVideoConfig = (): HeroVideoConfig => {
  saveHeroVideoConfig(DEFAULT_HERO_VIDEO_CONFIG);
  return DEFAULT_HERO_VIDEO_CONFIG;
};
