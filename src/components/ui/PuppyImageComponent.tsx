'use client';

import { useState } from 'react';

interface PuppyImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export default function PuppyImageComponent({
  src,
  alt,
  className = '',
  onLoad,
}: PuppyImageComponentProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const imageSrc =
    imageError || !src || src.trim() === '' ? '/placeholder-puppy.svg' : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse rounded bg-gray-200" />
      )}

      <img
        src={imageSrc}
        alt={alt}
        className={`h-full w-full object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
        decoding="async"
        key={src}
      />
    </div>
  );
}
