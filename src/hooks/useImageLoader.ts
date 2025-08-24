'use client';

import { useState, useEffect, useCallback } from 'react';

interface ImageCache {
  [url: string]: {
    status: 'loading' | 'loaded' | 'error';
    timestamp: number;
  };
}

const imageCache: ImageCache = {};
const CACHE_EXPIRY = 5 * 60 * 1000;

export function useImageLoader(src: string) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  const loadImage = useCallback((url: string) => {
    const cached = imageCache[url];
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < CACHE_EXPIRY) {
      setStatus(cached.status);
      return;
    }

    setStatus('loading');
    imageCache[url] = { status: 'loading', timestamp: now };

    const img = new Image();
    
    img.onload = () => {
      imageCache[url] = { status: 'loaded', timestamp: now };
      setStatus('loaded');
    };

    img.onerror = () => {
      imageCache[url] = { status: 'error', timestamp: now };
      setStatus('error');
    };

    img.src = url;
  }, []);

  useEffect(() => {
    if (src && src !== '/placeholder-puppy.svg') {
      loadImage(src);
    } else {
      setStatus('loaded');
    }
  }, [src, loadImage]);

  return { status, reload: () => loadImage(src) };
}
