'use client';

import { useState, useEffect, useCallback } from 'react';
import PuppyCarouselImageComponent from '@/components/ui/PuppyCarouselImageComponent';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
}

interface AboutUsMediaCarouselProps {
  media: MediaItem[];
  autoPlay?: boolean;
  showCaptions?: boolean;
  variant?: 'clients' | 'facilities' | 'puppies';
  className?: string;
}

export default function AboutUsMediaCarouselComponent({
  media,
  autoPlay = true,
  showCaptions = false,
  variant = 'clients',
  className = '',
}: AboutUsMediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
    setImageLoaded(false);
  }, [media.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
    setImageLoaded(false);
  }, [media.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setImageLoaded(false);
  }, []);

  useEffect(() => {
    if (!isPlaying || media.length <= 1) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, media.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (media.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-gray-100 p-8">
        <p className="text-gray-500">No hay media disponible</p>
      </div>
    );
  }

  const currentItem = media[currentIndex];

  const getAspectRatio = () => {
    switch (variant) {
      case 'clients':
        return 'aspect-[4/3]';
      case 'facilities':
        return 'aspect-[16/9]';
      case 'puppies':
        return 'aspect-[3/2]';
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <div className={`group relative ${className}`}>
      <div
        className={`relative ${getAspectRatio()} overflow-hidden rounded-xl bg-gray-900 shadow-2xl`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(autoPlay)}
      >
        <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50">
          {currentItem?.type === 'video' ? (
            <video
              key={currentItem.id}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            >
              <source
                src={
                  currentItem.url && currentItem.url.trim() !== ''
                    ? currentItem.url
                    : '/placeholder-puppy.svg'
                }
                type="video/mp4"
              />
            </video>
          ) : (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
                </div>
              )}
              <PuppyCarouselImageComponent
                src={
                  currentItem?.url && currentItem.url.trim() !== ''
                    ? currentItem.url
                    : '/placeholder-puppy.svg'
                }
                alt="Imagen de carrusel"
                className={`transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                priority={true}
                onLoad={handleImageLoad}
              />
            </>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {media.length > 1 && (
          <>
            <div
              className="absolute left-0 top-0 z-10 h-full w-1/2 cursor-pointer"
              onClick={prevSlide}
              aria-label="Anterior"
            />
            <div
              className="absolute right-0 top-0 z-10 h-full w-1/2 cursor-pointer"
              onClick={nextSlide}
              aria-label="Siguiente"
            />
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'scale-125 bg-red-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
