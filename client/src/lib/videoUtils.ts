/**
 * Video utility functions for detecting and transforming video URLs
 */

export interface VideoEmbedInfo {
  isEmbeddable: boolean;
  embedUrl: string;
  type: 'youtube' | 'vimeo' | 'direct' | 'other-embed' | 'external';
}

/**
 * Converts a YouTube URL (watch or share link) to proper embed format
 */
function getYouTubeEmbedUrl(url: string): string | null {
  // Handle youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  
  // Handle youtu.be/VIDEO_ID
  const shareMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (shareMatch) {
    return `https://www.youtube.com/embed/${shareMatch[1]}`;
  }
  
  // Handle youtube.com/embed/VIDEO_ID (already in embed format)
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  return null;
}

/**
 * Converts a Vimeo URL to proper embed format
 */
function getVimeoEmbedUrl(url: string): string | null {
  // Handle vimeo.com/VIDEO_ID
  const match = url.match(/(?:vimeo\.com\/)([0-9]+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  
  // Handle player.vimeo.com/video/VIDEO_ID (already in embed format)
  if (url.includes('player.vimeo.com/video/')) {
    return url;
  }
  
  return null;
}

/**
 * Analyzes a video URL and returns embed information
 */
export function getVideoEmbedInfo(videoUrl: string | null | undefined): VideoEmbedInfo {
  if (!videoUrl || videoUrl.trim() === '') {
    return {
      isEmbeddable: false,
      embedUrl: '',
      type: 'external'
    };
  }

  const url = videoUrl.trim();

  // Check for YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (embedUrl) {
      return {
        isEmbeddable: true,
        embedUrl,
        type: 'youtube'
      };
    }
  }

  // Check for Vimeo
  if (url.includes('vimeo.com')) {
    const embedUrl = getVimeoEmbedUrl(url);
    if (embedUrl) {
      return {
        isEmbeddable: true,
        embedUrl,
        type: 'vimeo'
      };
    }
  }

  // Check for direct video files
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return {
      isEmbeddable: true,
      embedUrl: url,
      type: 'direct'
    };
  }

  // Check for other embed URLs (like Zimmer Biomet, etc.)
  if (url.includes('/embed')) {
    return {
      isEmbeddable: true,
      embedUrl: url,
      type: 'other-embed'
    };
  }

  // Everything else is external
  return {
    isEmbeddable: false,
    embedUrl: url,
    type: 'external'
  };
}
