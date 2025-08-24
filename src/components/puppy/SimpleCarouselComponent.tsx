'use client';

import { useState, useEffect } from 'react';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';

interface SimpleCarouselComponentProps {
  media: MediaFile[];
  puppyName: string;
  className?: string;
}

export default function SimpleCarouselComponent({
  media,
  puppyName,
  className = '',
}: SimpleCarouselComponentProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const validMedia = media.filter(m => m.type === 'image' && m.url);
  const hasMedia = validMedia.length > 0;

  if (!hasMedia) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex aspect-square items-center justify-center bg-gray-100">
          <img
            src="/placeholder-puppy.svg"
            alt={puppyName}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setSelectedIndex(prev => (prev + 1) % validMedia.length);
  };

  const prevSlide = () => {
    setSelectedIndex(
      prev => (prev - 1 + validMedia.length) % validMedia.length
    );
  };

  const goToSlide = (index: number) => {
    setSelectedIndex(index);
  };

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
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

    if (isLeftSwipe && validMedia.length > 1) {
      nextSlide();
    }
    if (isRightSwipe && validMedia.length > 1) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (validMedia.length <= 1) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case 'Escape':
          setShowModal(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [validMedia.length]);

  const handleImageError = (index: number) => {
    setImageError(prev => new Set([...prev, index]));
  };

  const handleImageLoad = (index: number) => {
    setImageError(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const getImageSrc = (index: number) => {
    if (imageError.has(index)) {
      return '/placeholder-puppy.svg';
    }
    return validMedia[index]?.url || '/placeholder-puppy.svg';
  };

  return (
    <>
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        {/* Main image display */}
        <div
          className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={getImageSrc(selectedIndex)}
            alt={`${puppyName} - Image ${selectedIndex + 1}`}
            className="h-full w-full cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
            onClick={() => setShowModal(true)}
            onError={() => handleImageError(selectedIndex)}
            onLoad={() => handleImageLoad(selectedIndex)}
          />

          {/* Navigation controls */}
          {validMedia.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70"
                aria-label="Previous"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70"
                aria-label="Next"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Position indicator */}
          <div className="absolute bottom-2 right-2 rounded-lg bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
            {selectedIndex + 1} / {validMedia.length}
          </div>

          {/* Dot indicators - mobile only */}
          {validMedia.length > 1 && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 sm:hidden">
              {validMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    selectedIndex === index
                      ? 'bg-white'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail carousel */}
        {validMedia.length > 1 && (
          <div className="border-t border-gray-100 p-2">
            <div className="flex justify-center gap-1 overflow-x-auto">
              {validMedia.slice(0, 6).map((mediaItem, index) => (
                <button
                  key={`thumb-${mediaItem.id}-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                    selectedIndex === index
                      ? 'border-blue-500 ring-1 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={getImageSrc(index)}
                    alt={`${puppyName} - Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={() => handleImageError(index)}
                    onLoad={() => handleImageLoad(index)}
                  />
                </button>
              ))}
              {validMedia.length > 6 && (
                <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-gray-200 bg-gray-50 text-xs text-gray-500">
                  +{validMedia.length - 6}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setShowModal(false)}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute right-4 top-4 z-10 text-white hover:text-gray-300"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw] p-4">
            <img
              src={getImageSrc(selectedIndex)}
              alt={`${puppyName} - Enlarged view`}
              className="max-h-full max-w-full object-contain"
              onError={() => handleImageError(selectedIndex)}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black bg-opacity-50 px-4 py-2 text-white">
              {selectedIndex + 1} / {validMedia.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
