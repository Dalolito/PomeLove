'use client';

import { useEffect } from 'react';

interface ImagePreloaderComponentProps {
  images: string[];
}

export default function ImagePreloaderComponent({
  images,
}: ImagePreloaderComponentProps) {
  useEffect(() => {
    const preloadImages = () => {
      images.forEach(src => {
        if (src && src !== '/placeholder-puppy.svg' && src.trim() !== '') {
          const img = new Image();
          img.onload = () => console.log('Preloaded image:', src);
          img.onerror = () => console.warn('Failed to preload image:', src);
          img.src = src;
        }
      });
    };

    preloadImages();
  }, [images]);

  return null;
}
