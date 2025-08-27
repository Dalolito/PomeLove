'use client';

import { useState, useEffect } from 'react';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import PuppyCarouselImageComponent from '@/components/ui/PuppyCarouselImageComponent';

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const validMedia =
    media?.filter(
      item =>
        item &&
        (item.type === 'image' || item.type === 'video') &&
        item.url &&
        typeof item.url === 'string' &&
        item.url.trim() !== '' &&
        item.url !== 'null' &&
        item.url !== 'undefined' &&
        !item.url.includes('undefined') &&
        !item.url.includes('null')
    ) || [];

  const hasMedia = validMedia.length > 0;

  useEffect(() => {
    if (selectedIndex >= validMedia.length && validMedia.length > 0) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, validMedia.length]);

  if (!hasMedia) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex aspect-square items-center justify-center bg-gray-100">
          <PuppyCarouselImageComponent
            src="/placeholder-puppy.svg"
            alt={puppyName}
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
    if (index >= 0 && index < validMedia.length) {
      setSelectedIndex(index);
    }
  };

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

  const getCurrentMedia = () => {
    if (selectedIndex >= 0 && selectedIndex < validMedia.length) {
      return validMedia[selectedIndex];
    }
    return null;
  };

  const currentMedia = getCurrentMedia();

  if (!currentMedia) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex aspect-square items-center justify-center bg-gray-100">
          <PuppyCarouselImageComponent
            src="/placeholder-puppy.svg"
            alt={puppyName}
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
        <div
          className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {currentMedia.type === 'video' ? (
            <video
              src={currentMedia.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full cursor-pointer object-contain"
              onClick={() => setShowModal(true)}
            >
              Tu navegador no soporta el elemento de video.
            </video>
          ) : (
            <PuppyCarouselImageComponent
              src={currentMedia.url}
              alt={`${puppyName} - ${currentMedia.type} ${selectedIndex + 1}`}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => setShowModal(true)}
            />
          )}

          {validMedia.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white transition-all hover:bg-opacity-70"
                aria-label="Previous"
              >
                <svg
                  className="h-7 w-7"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white transition-all hover:bg-opacity-70"
                aria-label="Next"
              >
                <svg
                  className="h-7 w-7"
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

          <div className="absolute bottom-2 right-2 rounded-lg bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
            {currentMedia.type === 'video' ? (
              <svg
                className="inline h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            ) : (
              <svg
                className="inline h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            )}{' '}
            {selectedIndex + 1} / {validMedia.length}
          </div>

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
                  aria-label={`Go to ${validMedia[index].type} ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {validMedia.length > 1 && (
          <div className="border-t border-gray-100 p-2">
            <div className="flex justify-center gap-1 overflow-x-auto">
              {validMedia.slice(0, 6).map((mediaItem, index) => (
                <button
                  key={`thumb-${mediaItem.id}-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                    selectedIndex === index
                      ? 'border-blue-500 ring-1 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {mediaItem.type === 'video' ? (
                    <div className="flex h-full w-full items-center justify-center bg-gray-800 text-white">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                  ) : (
                    <PuppyCarouselImageComponent
                      src={mediaItem.url}
                      alt={`${puppyName} - Thumbnail ${index + 1}`}
                    />
                  )}
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
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

          <div className="relative flex h-[90vh] w-[90vw] items-center justify-center p-4">
            {currentMedia.type === 'video' ? (
              <video
                src={currentMedia.url}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <PuppyCarouselImageComponent
                src={currentMedia.url}
                alt={`${puppyName} - Enlarged view`}
                className="h-full w-full object-contain"
              />
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black bg-opacity-50 px-4 py-2 text-white">
              {currentMedia.type === 'video' ? (
                <svg
                  className="inline h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              ) : (
                <svg
                  className="inline h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}{' '}
              {selectedIndex + 1} / {validMedia.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
