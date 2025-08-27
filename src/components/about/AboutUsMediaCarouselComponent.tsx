'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent)
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
    setImageLoaded(false);
    setVideoLoaded(false);
  }, [media.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
    setImageLoaded(false);
    setVideoLoaded(false);
  }, [media.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setImageLoaded(false);
    setVideoLoaded(false);
  }, []);

  useEffect(() => {
    if (!isPlaying || media.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const currentMediaItem = media[currentIndex];
    if (!currentMediaItem) return;

    let slideDelay = isMobile ? 3000 : 4000;

    if (currentMediaItem.type === 'video') {
      slideDelay = isMobile ? 6000 : 5000;
    }

    intervalRef.current = setTimeout(() => {
      const currentVideo = videoRef.current;
      const isVideoCurrentlyPlaying =
        currentVideo && !currentVideo.paused && currentVideo.currentTime > 0;

      if (currentMediaItem.type === 'video' && isVideoCurrentlyPlaying) {
        return;
      }

      nextSlide();
    }, slideDelay);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, nextSlide, media.length, currentIndex, media, isMobile]);

  useEffect(() => {
    const currentVideo = videoRef.current;
    const currentMediaItem = media[currentIndex];

    if (!currentVideo || currentMediaItem?.type !== 'video') return;

    const handleVideoCanPlay = () => {
      setVideoLoaded(true);

      if (!isMobile) {
        currentVideo.play().catch(() => {
          console.log('Autoplay prevented by browser - desktop');
        });
      }
    };

    const handleVideoError = () => {
      console.error('Video error for:', currentMediaItem.url);
      setVideoLoaded(true);
    };

    const handleVideoEnded = () => {
      setIsVideoPlaying(false);
      if (isPlaying) {
        setTimeout(() => {
          nextSlide();
        }, 1000);
      }
    };

    const handleVideoLoadedData = () => {};

    const handleVideoPause = () => {
      setIsVideoPlaying(false);

      if (isPlaying && media.length > 1) {
        const currentMediaItem = media[currentIndex];
        let slideDelay = isMobile ? 3000 : 4000;

        if (currentMediaItem.type === 'video') {
          slideDelay = isMobile ? 6000 : 5000;
        }

        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
        }

        intervalRef.current = setTimeout(() => {
          nextSlide();
        }, slideDelay);
      }
    };

    const handleVideoPlay = () => {
      setIsVideoPlaying(true);

      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVideoLoadStart = () => {
      setVideoLoaded(false);
      setIsVideoPlaying(false);
    };

    currentVideo.addEventListener('canplay', handleVideoCanPlay);
    currentVideo.addEventListener('error', handleVideoError);
    currentVideo.addEventListener('ended', handleVideoEnded);
    currentVideo.addEventListener('loadeddata', handleVideoLoadedData);
    currentVideo.addEventListener('loadstart', handleVideoLoadStart);
    currentVideo.addEventListener('pause', handleVideoPause);
    currentVideo.addEventListener('play', handleVideoPlay);

    return () => {
      currentVideo.removeEventListener('canplay', handleVideoCanPlay);
      currentVideo.removeEventListener('error', handleVideoError);
      currentVideo.removeEventListener('ended', handleVideoEnded);
      currentVideo.removeEventListener('loadeddata', handleVideoLoadedData);
      currentVideo.removeEventListener('loadstart', handleVideoLoadStart);
      currentVideo.removeEventListener('pause', handleVideoPause);
      currentVideo.removeEventListener('play', handleVideoPlay);
    };
  }, [currentIndex, media, isPlaying, nextSlide, isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart !== null) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoLoaded(true);
  };

  const handleVideoClick = () => {
    if (currentItem?.type === 'video' && videoRef.current) {
      const video = videoRef.current;

      if (video.paused) {
        video.muted = true;
        video.playsInline = true;
        video.volume = 0;

        video
          .play()
          .then(() => {
            setIsVideoPlaying(true);

            if (intervalRef.current) {
              clearTimeout(intervalRef.current);
              intervalRef.current = null;
            }
          })
          .catch(error => {
            console.error('Video play failed:', error);
          });
      } else {
        video.pause();
        setIsVideoPlaying(false);

        if (isPlaying && media.length > 1) {
          const currentMediaItem = media[currentIndex];
          let slideDelay = isMobile ? 3000 : 4000;

          if (currentMediaItem.type === 'video') {
            slideDelay = isMobile ? 6000 : 5000;
          }

          if (intervalRef.current) {
            clearTimeout(intervalRef.current);
          }

          intervalRef.current = setTimeout(() => {
            nextSlide();
          }, slideDelay);
        }
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsPlaying(autoPlay);
    }
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50">
          {currentItem?.type === 'video' ? (
            <>
              {!videoLoaded && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-200">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
                </div>
              )}

              <video
                ref={videoRef}
                key={`${currentItem.id}-${currentIndex}`}
                autoPlay={false}
                muted={true}
                loop
                playsInline={true}
                preload="metadata"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                controls={false}
                className={`h-full w-full object-contain transition-opacity duration-300 ${
                  videoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onCanPlay={handleVideoLoad}
                onClick={handleVideoClick}
                style={{
                  pointerEvents: 'auto',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                }}
                src={currentItem.url}
              >
                Tu navegador no soporta videos.
              </video>

              {isMobile && !isVideoPlaying && (
                <button
                  className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 opacity-100 transition-opacity duration-300"
                  onClick={handleVideoClick}
                  aria-label="Play video"
                >
                  <div className="rounded-full bg-white bg-opacity-90 p-4">
                    <svg
                      className="h-10 w-10 text-gray-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 5v10l8-5-8-5z" />
                    </svg>
                  </div>
                </button>
              )}
            </>
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
                isMobile={isMobile}
              />
            </>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {media.length > 1 && isMobile && (
          <>
            <div
              className="absolute left-0 top-0 z-10 h-full w-1/3 cursor-pointer"
              onClick={prevSlide}
              aria-label="Anterior"
            />
            <div
              className="absolute right-0 top-0 z-10 h-full w-1/3 cursor-pointer"
              onClick={nextSlide}
              aria-label="Siguiente"
            />
          </>
        )}

        {media.length > 1 && !isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white bg-opacity-70 p-3 text-gray-800 opacity-0 shadow-lg transition-all duration-300 hover:bg-opacity-90 group-hover:opacity-100"
              aria-label="Previous"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white bg-opacity-70 p-3 text-gray-800 opacity-0 shadow-lg transition-all duration-300 hover:bg-opacity-90 group-hover:opacity-100"
              aria-label="Next"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
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
