'use client';

import { useState, useEffect, useCallback } from 'react';
import PuppyImageComponent from '@/components/ui/PuppyImageComponent';

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
    setCurrentIndex((prevIndex) => 
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
    setImageLoaded(false);
  }, [media.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
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
      <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
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
    <div className={`relative group ${className}`}>
      <div
        className={`relative ${getAspectRatio()} bg-gray-900 rounded-xl overflow-hidden shadow-2xl`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(autoPlay)}
      >
        {currentItem?.type === 'video' ? (
          <video
            key={currentItem.id}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={currentItem.url} type="video/mp4" />
          </video>
        ) : (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <PuppyImageComponent
              src={currentItem?.url || '/placeholder-puppy.svg'}
              alt="Imagen de carrusel"
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority={true}
              onLoad={handleImageLoad}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {media.length > 1 && (
          <>
            <div 
              className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10"
              onClick={prevSlide}
              aria-label="Anterior"
            />
            <div 
              className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
              onClick={nextSlide}
              aria-label="Siguiente"
            />
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-red-500 scale-125'
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
