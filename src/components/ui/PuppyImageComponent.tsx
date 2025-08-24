'use client';

import { useState } from 'react';

interface PuppyImageComponentProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export default function PuppyImageComponent({
  src,
  alt,
  className = '',
  priority = false,
  onLoad,
}: PuppyImageComponentProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getImageSrc = (): string => {
    if (!src || typeof src !== 'string' || src.trim() === '') {
      return '/placeholder-puppy.svg';
    }
    return src.trim();
  };

  const imageSrc = getImageSrc();
  const isPlaceholder = imageSrc === '/placeholder-puppy.svg';

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !isPlaceholder && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200">
          <svg
            className="h-8 w-8 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <img
        src={hasError ? '/placeholder-puppy.svg' : imageSrc}
        alt={alt}
        className={`w-full h-full transition-opacity duration-200 ${
          isLoading && !isPlaceholder ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
