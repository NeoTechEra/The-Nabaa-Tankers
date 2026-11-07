import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

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

const STORAGE_KEY = 'nabaa_hero_video_config_v2';
export const HERO_VIDEO_EVENT = 'nabaa_hero_video_updated';
const FIRESTORE_COLLECTION = 'siteSettings';
const FIRESTORE_DOC_ID = 'heroVideo';

// Universal default configuration (uses a reliable, working video that never crashes on Vercel)
export const DEFAULT_HERO_VIDEO_CONFIG: HeroVideoConfig = {
  // Reliable water & logistics animation video embed on YouTube (can be overridden anytime from Admin or directly on the card)
  videoUrl: 'https://www.youtube.com/watch?v=0hO1pXp87nU',
  sourceType: 'youtube',
  posterUrl: '',
  titleAr: 'أنيميشن رحلة صهريج نبع لتوريد المياه',
  titleEn: 'The Nabaa Tanker Dispatch Journey Animation',
  taglineAr: 'شاهد دورة توصيل مياه الشرب من محطات الأشياب إلى خزان العميل بضغطة زر',
  taglineEn: 'Watch the seamless potable water delivery cycle from municipal depots to customer tanks',
  autoPlay: true,
  loop: true,
  muted: true,
  showControls: true,
  badgeAr: 'فيديو المنظومة',
  badgeEn: 'System Animation',
  updatedAt: new Date().toISOString(),
};

// Check if a URL is a YouTube link
export const isYouTubeUrl = (url: string): boolean => {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.includes('youtube.com') ||
    trimmed.includes('youtu.be') ||
    trimmed.includes('youtube-nocookie.com') ||
    /^[a-zA-Z0-9_-]{11}$/.test(url.trim())
  );
};

// Check if a URL is a Vimeo link
export const isVimeoUrl = (url: string): boolean => {
  if (!url) return false;
  return url.trim().toLowerCase().includes('vimeo.com');
};

// Extract 11-character YouTube video ID reliably from ANY YouTube format
export const extractYouTubeId = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  
  // Bare 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex matching youtu.be, youtube.com/watch?v=, /embed/, /shorts/, /live/, etc.
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/i
  );

  return match ? match[1] : '';
};

// Convert standard YouTube / Shorts / youtu.be URLs to a compliant embed URL
export const getYouTubeEmbedUrl = (url: string, autoPlay = true, loop = true, muted = true): string => {
  const videoId = extractYouTubeId(url);
  if (videoId) {
    const params = new URLSearchParams({
      autoplay: autoPlay ? '1' : '0',
      mute: muted ? '1' : '0',
      loop: loop ? '1' : '0',
      playlist: videoId, // Required by YouTube iframe player API to loop single videos
      controls: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }
  return url;
};

// Convert Vimeo URL to compliant embed URL
export const getVimeoEmbedUrl = (url: string, autoPlay = true, loop = true, muted = true): string => {
  try {
    const match = url.match(
      /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/
    );
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

// Automatically determine video source type from URL
export const detectVideoType = (url: string): VideoSourceType => {
  if (!url) return 'direct';
  if (isYouTubeUrl(url)) return 'youtube';
  if (isVimeoUrl(url)) return 'vimeo';
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.includes('assets/')) {
    return 'local';
  }
  return 'direct';
};

// Local storage helper
export const getLocalHeroVideoConfig = (): HeroVideoConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Auto-correct source type if URL is clearly YouTube
      if (isYouTubeUrl(parsed.videoUrl)) {
        parsed.sourceType = 'youtube';
      }
      return { ...DEFAULT_HERO_VIDEO_CONFIG, ...parsed };
    }
  } catch (err) {
    console.error('Error reading hero video config from storage:', err);
  }
  return DEFAULT_HERO_VIDEO_CONFIG;
};

// Synchronous getter (returns local or default immediately for initial render)
export const getHeroVideoConfig = (): HeroVideoConfig => {
  return getLocalHeroVideoConfig();
};

// Save config to both localStorage AND Firestore (shared globally with Vercel and all devices)
export const saveHeroVideoConfig = async (config: HeroVideoConfig): Promise<void> => {
  try {
    // Ensure correct sourceType is resolved
    const detectedType = isYouTubeUrl(config.videoUrl) 
      ? 'youtube' 
      : isVimeoUrl(config.videoUrl) 
      ? 'vimeo' 
      : config.sourceType;

    const updated: HeroVideoConfig = { 
      ...config, 
      sourceType: detectedType,
      updatedAt: new Date().toISOString() 
    };

    // 1. Save to local storage for instant offline/re-render access
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 2. Dispatch local event for instant update in the current tab
    window.dispatchEvent(new CustomEvent(HERO_VIDEO_EVENT, { detail: updated }));

    // 3. Save to Firestore (persists globally for all users on Vercel & across devices)
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC_ID);
      await setDoc(docRef, updated, { merge: true });
      console.log('[HeroVideoStore] Saved to Cloud Firestore successfully.');
    } catch (firestoreErr) {
      console.warn('[HeroVideoStore] Firestore sync notice (saved locally):', firestoreErr);
    }
  } catch (err) {
    console.error('Error saving hero video config:', err);
  }
};

// Subscribe in real-time to Firestore so Vercel & any device gets live updates
export const subscribeHeroVideoConfig = (
  onUpdate: (config: HeroVideoConfig) => void
): (() => void) => {
  try {
    const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC_ID);
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<HeroVideoConfig>;
          const merged: HeroVideoConfig = {
            ...DEFAULT_HERO_VIDEO_CONFIG,
            ...data,
          };
          if (isYouTubeUrl(merged.videoUrl)) {
            merged.sourceType = 'youtube';
          }
          // Update local cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          onUpdate(merged);
        } else {
          // If no doc in Firestore yet, fetch local or default
          onUpdate(getLocalHeroVideoConfig());
        }
      },
      (error) => {
        console.warn('[HeroVideoStore] Firestore real-time listener notice (using local):', error);
        onUpdate(getLocalHeroVideoConfig());
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('[HeroVideoStore] Could not establish Firestore listener:', err);
    onUpdate(getLocalHeroVideoConfig());
    return () => {};
  }
};

// Reset to default in both storage and Firestore
export const resetHeroVideoConfig = async (): Promise<HeroVideoConfig> => {
  await saveHeroVideoConfig(DEFAULT_HERO_VIDEO_CONFIG);
  return DEFAULT_HERO_VIDEO_CONFIG;
};
