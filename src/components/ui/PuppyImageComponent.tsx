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
    setIsLoading(false);
    setImageError(true);
  };

  const imageSrc = imageError ? '/placeholder-puppy.svg' : src;

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
