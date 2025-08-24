'use client';

import { useState, useCallback, useEffect } from 'react';

interface PuppyImageComponentProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  containerClassName?: string;
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
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  const getImageSrc = (): string => {
    if (!src || typeof src !== 'string' || src.trim() === '') {
      return '/placeholder-puppy.svg';
    }

    const trimmedSrc = src.trim();

    if (trimmedSrc === '') {
      return '/placeholder-puppy.svg';
    }

    if (trimmedSrc.includes('unsplash.com') && !trimmedSrc.includes('w=')) {
      const separator = trimmedSrc.includes('?') ? '&' : '?';
      return `${trimmedSrc}${separator}w=300&h=300&fit=crop&q=80`;
    }

    return trimmedSrc;
  };

  const isPlaceholder = (url: string): boolean => {
    return url === '/placeholder-puppy.svg';
  };

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    console.log(`❌ Image failed to load: ${currentSrc}`);

    if (retryCount === 0 && !isPlaceholder(currentSrc)) {
      const separator = currentSrc.includes('?') ? '&' : '?';
      const retryUrl = `${currentSrc}${separator}retry=${Date.now()}`;

      console.log(`🔄 Retrying with: ${retryUrl}`);
      setTimeout(() => {
        setRetryCount(1);
        setCurrentSrc(retryUrl);
        setIsLoading(true);
      }, 500);
      return;
    }

    if (retryCount === 1 && currentSrc.includes('unsplash.com')) {
      const optimizedUnsplashUrl = currentSrc.includes('?')
        ? `${currentSrc}&w=300&h=300&fit=crop&q=80`
        : `${currentSrc}?w=300&h=300&fit=crop&q=80`;

      console.log(`🔄 Trying optimized Unsplash URL: ${optimizedUnsplashUrl}`);
      setTimeout(() => {
        setRetryCount(2);
        setCurrentSrc(optimizedUnsplashUrl);
        setIsLoading(true);
      }, 1000);
      return;
    }

    if (retryCount === 2 && currentSrc.includes('unsplash.com')) {
      const simpleUnsplashUrl =
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop&q=70';

      console.log(`🔄 Trying simple Unsplash URL: ${simpleUnsplashUrl}`);
      setTimeout(() => {
        setRetryCount(3);
        setCurrentSrc(simpleUnsplashUrl);
        setIsLoading(true);
      }, 1500);
      return;
    }

    console.log(`❌ All retries failed, using placeholder`);
    setHasError(true);
    setIsLoading(false);
    setCurrentSrc('/placeholder-puppy.svg');
  }, [currentSrc, retryCount]);

  useEffect(() => {
    const initialSrc = getImageSrc();
    setCurrentSrc(initialSrc);
    setRetryCount(0);
    setHasError(false);
    setIsLoading(!isPlaceholder(initialSrc));
  }, [src]);

  const finalSrc =
    hasError || !currentSrc || currentSrc.trim() === ''
      ? '/placeholder-puppy.svg'
      : currentSrc;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !isPlaceholder(currentSrc) && (
        <div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center bg-gray-200">
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
        key={currentSrc}
        src={finalSrc || '/placeholder-puppy.svg'}
        alt={alt}
        className={`h-full w-full transition-all duration-300 ${
          isLoading && !isPlaceholder(currentSrc) ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {process.env.NODE_ENV === 'development' && retryCount > 0 && (
        <div className="absolute right-2 top-2 rounded bg-yellow-500 px-1 py-0.5 text-xs text-black">
          R{retryCount}
        </div>
      )}
    </div>
  );
}
