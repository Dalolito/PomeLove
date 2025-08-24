'use client';

import { useEffect } from 'react';

interface ImagePreloaderComponentProps {
  images: string[];
}

export default function ImagePreloaderComponent({
  images,
}: ImagePreloaderComponentProps) {
  useEffect(() => {
    if (!images || !Array.isArray(images)) {
      return;
    }

    images.forEach(src => {
      if (!src || typeof src !== 'string' || src.trim() === '') {
        return;
      }

      const img = new Image();
      img.src = src.trim();
    });
  }, [images]);

  return null;
}
