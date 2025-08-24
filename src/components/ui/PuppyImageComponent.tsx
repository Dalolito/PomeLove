'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

interface PuppyImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  retryCount?: number;
}

export default function PuppyImageComponent({
  src,
  alt,
  className = '',
  priority = false,
  onLoad,
  retryCount = 2,
}: PuppyImageComponentProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  const [currentRetry, setCurrentRetry] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const validateImageUrl = useCallback((url: string): string => {
    if (!url || 
        url.trim() === '' || 
        url.includes('undefined') || 
        url.includes('null') ||
        url === 'null' ||
        url === 'undefined'
    ) {
      return '/placeholder-puppy.svg';
    }
    
    if (currentRetry > 0 && url.startsWith('http')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}v=${Date.now()}-${currentRetry}`;
    }
    
    return url;
  }, [currentRetry]);

  useEffect(() => {
    const validatedSrc = validateImageUrl(src);
    setImageSrc(validatedSrc);
    setImageError(validatedSrc === '/placeholder-puppy.svg');
    setIsLoading(validatedSrc !== '/placeholder-puppy.svg');
  }, [src, validateImageUrl]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setImageError(false);
    setCurrentRetry(0);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    if (currentRetry < retryCount && imageSrc !== '/placeholder-puppy.svg') {
      setTimeout(() => {
        setCurrentRetry(prev => prev + 1);
        const retrySrc = validateImageUrl(src);
        setImageSrc(retrySrc);
      }, 500 * (currentRetry + 1));
    } else {
      setImageError(true);
      setIsLoading(false);
      setImageSrc('/placeholder-puppy.svg');
    }
  }, [imageSrc, currentRetry, retryCount, src, validateImageUrl]);

  useEffect(() => {
    if (priority && imageSrc && imageSrc !== '/placeholder-puppy.svg') {
      const img = new Image();
      img.src = imageSrc;
    }
  }, [imageSrc, priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="animate-pulse">
            <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      <img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        className={`h-full w-full object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        key={`${imageSrc}-${currentRetry}`}
      />

      {currentRetry > 0 && currentRetry <= retryCount && (
        <div className="absolute bottom-2 right-2 rounded bg-yellow-500 px-2 py-1 text-xs text-white">
          Retry {currentRetry}
        </div>
      )}
    </div>
  );
}
