'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { Dictionary } from '@/lib/types/dictionary';

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Filter valid media files
  const allMedia = media.filter(m => m.type === 'image' || m.type === 'video');
  const hasMedia = allMedia.length > 0;
  const selectedMedia = hasMedia ? allMedia[selectedIndex] : null;

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
          <Image
            src="/placeholder-puppy.svg"
            alt={puppyName}
            width={400}
            height={400}
            className="h-full w-full object-cover"
            priority
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
            <div className="relative h-full w-full">
              <video
                src={selectedMedia.url}
                className="h-full w-full object-cover"
                controls
                autoPlay
                muted
                loop
                onError={(e) => {
                  console.warn('Video failed to load:', selectedMedia.url);
                  // Show fallback content
                  const videoElement = e.target as HTMLVideoElement;
                  videoElement.style.display = 'none';
                  const fallbackDiv = videoElement.parentElement?.querySelector('.video-fallback');
                  if (fallbackDiv) {
                    (fallbackDiv as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              {/* Fallback content for video errors */}
              <div className="video-fallback hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">Video no disponible</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="group relative h-full w-full cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <Image
                src={selectedMedia?.url || '/placeholder-puppy.svg'}
                alt={`${puppyName} - Image ${selectedIndex + 1}`}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105"
                priority={selectedIndex < 3} // Priority for first 3 images
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                unoptimized={selectedMedia?.url?.includes('localhost')} // For local development
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />
            </div>
          )}

          {/* Navigation controls */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70 z-10"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70 z-10"
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
          <div className="absolute bottom-4 right-4 rounded-lg bg-black bg-opacity-50 px-3 py-1 text-sm text-white z-10">
            {selectedIndex + 1} / {allMedia.length}
          </div>

          {/* Media type indicator */}
          {selectedMedia?.type === 'video' && (
            <div className="absolute left-4 top-4 rounded-lg bg-red-500 px-2 py-1 text-xs text-white z-10">
              🎥 Video
            </div>
          )}

          {/* Dot indicators - mobile only */}
          {allMedia.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:hidden z-10">
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

        {/* Thumbnail carousel */}
        {allMedia.length > 1 && (
          <div className="border-t border-gray-100 p-1.5">
            <div className="flex justify-center gap-0.5">
              {allMedia.slice(0, 6).map((media, index) => (
                <button
                  key={`thumb-${media.id}-${index}`}
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
                        onError={(e) => {
                          console.warn('Thumbnail video failed to load:', media.url);
                          // Show fallback content
                          const videoElement = e.target as HTMLVideoElement;
                          videoElement.style.display = 'none';
                          const fallbackDiv = videoElement.parentElement?.querySelector('.video-fallback-thumb');
                          if (fallbackDiv) {
                            (fallbackDiv as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      {/* Fallback content for thumbnail video errors */}
                      <div className="video-fallback-thumb hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <div className="text-gray-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
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
                    <Image
                      src={media.url}
                      alt={`${puppyName} - Thumbnail ${index + 1}`}
                      width={32}
                      height={32}
                      className="object-cover transition-transform duration-200 group-hover:scale-110"
                      sizes="32px"
                      unoptimized={media.url?.includes('localhost')}
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
            className="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
          >
            <span className="text-3xl">✕</span>
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={selectedMedia.url}
              alt={`${puppyName} - Enlarged view`}
              width={1200}
              height={800}
              className="max-h-full max-w-full object-contain"
              priority={true} // Always priority in modal
              quality={95} // High quality for modal
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              unoptimized={selectedMedia.url?.includes('localhost')}
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