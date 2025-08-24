'use client';

import { useEffect } from 'react';
import { validateImageUrl } from '@/lib/utils/imageUtils';

interface ImagePreloaderComponentProps {
  images: string[];
}

export default function ImagePreloaderComponent({
  images,
}: ImagePreloaderComponentProps) {
  useEffect(() => {
    const preloadImages = () => {
      if (!images || !Array.isArray(images)) {
        return;
      }

      images.forEach(src => {
        if (!src || typeof src !== 'string' || src.trim() === '') {
          return;
        }

        const validatedSrc = validateImageUrl(src);
        if (validatedSrc && validatedSrc !== '/placeholder-puppy.svg' && validatedSrc.trim() !== '') {
          const img = new Image();
          img.onload = () => console.log('Preloaded image:', validatedSrc);
          img.onerror = () => console.warn('Failed to preload image:', validatedSrc);
          img.src = validatedSrc;
        }
      });
    };

    preloadImages();
  }, [images]);

  return null;
}
