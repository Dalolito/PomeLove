'use client';

import { useState } from 'react';

interface PuppyCardImageComponentProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
}

export default function PuppyCardImageComponent({
  src,
  alt,
  priority = false,
  className = '',
  onLoad,
}: PuppyCardImageComponentProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const imageSrc = imageError ? '/placeholder-puppy.svg' : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <img
        src={imageSrc}
        alt={alt}
        className={`h-full w-full object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } group-hover:scale-110`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
