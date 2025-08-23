'use client';

import { useEffect } from 'react';

interface ImagePreloaderComponentProps {
  images: string[];
}

export default function ImagePreloaderComponent({ images }: ImagePreloaderComponentProps) {
  useEffect(() => {
    const preloadImages = () => {
      images.forEach(src => {
        if (src && src !== '/placeholder-puppy.svg') {
          const img = new Image();
          img.src = src;
        }
      });
    };

    preloadImages();
  }, [images]);

  return null;
}
