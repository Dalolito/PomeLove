'use client';

import { useState, useEffect } from 'react';
import { Dictionary } from '@/lib/types/dictionary';
import PuppyCarouselImageComponent from '@/components/ui/PuppyCarouselImageComponent';
import { validateImageUrl } from '@/lib/utils/imageUtils';

interface PuppyDetailParentsComponentProps {
  fatherImage: string | null;
  motherImage: string | null;
  dict: Dictionary;
  className?: string;
}

export default function PuppyDetailParentsComponent({
  fatherImage,
  motherImage,
  dict,
  className = '',
}: PuppyDetailParentsComponentProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const validatedFatherImage = validateImageUrl(fatherImage);
  const validatedMotherImage = validateImageUrl(motherImage);

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

  const hasValidParentImages =
    validatedFatherImage !== '/placeholder-puppy.svg' ||
    validatedMotherImage !== '/placeholder-puppy.svg';

  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
    setShowModal(true);
  };

  if (!hasValidParentImages) {
    return null;
  }

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        {dict.admin.forms.sections.parents}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {validatedFatherImage !== '/placeholder-puppy.svg' && (
          <div className="text-center">
            <h3 className="mb-3 font-medium text-gray-700">
              {dict.admin.forms.fields.fatherImage}
            </h3>
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <PuppyCarouselImageComponent
                src={validatedFatherImage}
                alt="Padre"
                className="cursor-pointer object-cover"
                onClick={() => handleImageClick(validatedFatherImage, 'Padre')}
              />
            </div>
          </div>
        )}

        {validatedMotherImage !== '/placeholder-puppy.svg' && (
          <div className="text-center">
            <h3 className="mb-3 font-medium text-gray-700">
              {dict.admin.forms.fields.motherImage}
            </h3>
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <PuppyCarouselImageComponent
                src={validatedMotherImage}
                alt="Madre"
                className="cursor-pointer object-cover"
                onClick={() => handleImageClick(validatedMotherImage, 'Madre')}
              />
            </div>
          </div>
        )}
      </div>

      {showModal && modalImage && (
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
            <PuppyCarouselImageComponent
              src={modalImage.src}
              alt={modalImage.alt}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
