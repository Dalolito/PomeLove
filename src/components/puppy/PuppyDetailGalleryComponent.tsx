'use client';

import { useState, useEffect } from 'react';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { Dictionary } from '@/lib/types/dictionary';
import PuppyImageComponent from '@/components/ui/PuppyImageComponent';

interface PuppyDetailGalleryComponentProps {
  media: MediaFile[];
  puppyName: string;
  dict: Dictionary;
  className?: string;
}

export default function PuppyDetailGalleryComponent({
  media,
  puppyName,
  dict,
  className = '',
}: PuppyDetailGalleryComponentProps) {
  // Debug: Log incoming media data
  console.log('PuppyDetailGalleryComponent Debug:', {
    puppyName,
    mediaLength: media.length,
    media: media.map(m => ({
      id: m.id,
      type: m.type,
      url: m.url
    }))
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Filter valid media files
  const allMedia = media.filter(m => m.type === 'image' || m.type === 'video');
  const hasMedia = allMedia.length > 0;
  const selectedMedia = hasMedia ? allMedia[selectedIndex] : null;

  // Debug: Log media information
  console.log('Gallery Debug:', {
    mediaCount: media.length,
    allMediaCount: allMedia.length,
    selectedIndex,
    selectedMedia: selectedMedia ? {
      id: selectedMedia.id,
      type: selectedMedia.type,
      url: selectedMedia.url
    } : null
  });

  // Navigation functions
  const nextSlide = () => {
    setSelectedIndex(prev => (prev + 1) % allMedia.length);
  };

  const prevSlide = () => {
    setSelectedIndex(prev => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const goToSlide = (index: number) => {
    setSelectedIndex(index);
  };

  // Touch navigation handlers
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

    if (isLeftSwipe && allMedia.length > 1) {
      nextSlide();
    }
    if (isRightSwipe && allMedia.length > 1) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Reset image loaded state when selected media changes
  useEffect(() => {
    setImageLoaded(false);
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (allMedia.length <= 1) return;

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
  }, [allMedia.length]);

  // Show placeholder when no media available
  if (!hasMedia) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex aspect-square items-center justify-center bg-gray-100">
          <PuppyImageComponent
            src="/placeholder-puppy.svg"
            alt={puppyName}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        {/* Main carousel display */}
        <div
          className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {selectedMedia?.type === 'video' ? (
            <video
              src={selectedMedia.url}
              className="h-full w-full object-cover"
              controls
              autoPlay
              muted
              loop
            />
          ) : (
            <div
              className="group relative h-full w-full cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <img
                src={selectedMedia?.url || '/placeholder-puppy.svg'}
                alt={`${puppyName} - Main view`}
                className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.log('Image error for:', target.src);
                  setImageLoaded(true);
                  if (target.src !== '/placeholder-puppy.svg') {
                    target.src = '/placeholder-puppy.svg';
                  }
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', selectedMedia?.url);
                  setImageLoaded(true);
                }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-200" />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />
            </div>
          )}

          {/* Navigation controls */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70"
                aria-label="Previous"
              >
                <svg
                  className="h-6 w-6"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70"
                aria-label="Next"
              >
                <svg
                  className="h-6 w-6"
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
          <div className="absolute bottom-4 right-4 rounded-lg bg-black bg-opacity-50 px-3 py-1 text-sm text-white">
            {selectedIndex + 1} / {allMedia.length}
          </div>

          {/* Media type indicator */}
          {selectedMedia?.type === 'video' && (
            <div className="absolute left-4 top-4 rounded-lg bg-red-500 px-2 py-1 text-xs text-white">
              🎥 Video
            </div>
          )}

          {/* Dot indicators - mobile only */}
          {allMedia.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:hidden">
              {allMedia.map((_, index) => (
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

        {/* Thumbnail carousel - ultra compact version */}
        {allMedia.length > 1 && (
          <div className="border-t border-gray-100 p-1.5">
            <div className="flex justify-center gap-0.5">
              {allMedia.slice(0, 6).map((media, index) => (
                <button
                  key={media.id}
                  onClick={() => goToSlide(index)}
                  className={`group relative h-8 w-8 flex-shrink-0 overflow-hidden rounded border transition-all ${
                    selectedIndex === index
                      ? 'border-blue-500 ring-1 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {media.type === 'video' ? (
                    <div className="relative h-full w-full">
                      <video
                        src={media.url}
                        className="h-full w-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="rounded-full bg-white bg-opacity-80 p-0.5">
                          <svg
                            className="h-1.5 w-1.5 text-gray-800"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={media.url}
                      alt={`${puppyName} - ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/placeholder-puppy.svg') {
                          target.src = '/placeholder-puppy.svg';
                        }
                      }}
                    />
                  )}
                </button>
              ))}
              {allMedia.length > 6 && (
                <div className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-gray-50 text-xs text-gray-500">
                  +{allMedia.length - 6}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image modal */}
      {showModal && selectedMedia?.type === 'image' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setShowModal(false)}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute right-4 top-4 text-white hover:text-gray-300"
          >
            <span className="text-3xl">✕</span>
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={selectedMedia.url}
              alt={`${puppyName} - Enlarged view`}
              className="max-h-full max-w-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black bg-opacity-50 px-4 py-2 text-white">
              {selectedIndex + 1} / {allMedia.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
