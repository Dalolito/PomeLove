'use client';

import { useState } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { calculatePuppyAgeUtil } from '@/lib/utils/calculatePuppyAgeUtil';
import PuppyCardImageComponent from '@/components/puppy/PuppyCardImageComponent';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';

interface PuppyCardComponentProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  priority?: boolean;
  className?: string;
}

export default function PuppyCardComponent({
  puppy,
  dict,
  locale,
  priority = false,
  className = '',
}: PuppyCardComponentProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get the first available image or fallback to placeholder
  const getMainImage = (): string => {
    if (puppy.media && puppy.media.length > 0) {
      const firstImage = puppy.media.find(media => media.type === 'image');
      if (firstImage && firstImage.url) {
        return firstImage.url;
      }
    }
    return '/placeholder-puppy.svg';
  };

  // Format price according to locale
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle WhatsApp contact click
  const handleContactClick = () => {
    const message = encodeURIComponent(
      `${dict.buttons.search_puppy}: ${puppy.name} - ${puppy.category.name}`
    );
    window.open(`https://wa.me/573004439574?text=${message}`, '_blank');
  };

  return (
    <div
      className={`group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl ${className}`}
    >
      {/* Image section */}
      <div className="relative aspect-square">
        <PuppyCardImageComponent
          src={getMainImage()}
          alt={puppy.name}
          priority={priority}
          className="absolute inset-0"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Availability badge */}
        {puppy.available && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
              {dict.admin.table.status.available}
            </span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="space-y-3 p-4">
        {/* Name and age */}
        <div className="flex items-center justify-between">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {puppy.name}
          </h3>
          <span className="ml-2 whitespace-nowrap text-sm text-gray-500">
            {calculatePuppyAgeUtil(puppy.birthDate, dict)}
          </span>
        </div>

        {/* Category and gender badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
            {puppy.category.name}
          </span>
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
            {dict.admin.forms.gender[puppy.gender]}
          </span>
        </div>

        {/* Description */}
        <p
          className="line-clamp-2 text-sm text-gray-600"
          title={puppy.description}
        >
          {puppy.description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <PrimaryButtonComponent
            href={`/${locale}/puppy/${puppy.id}`}
            fullWidth
            size="md"
            className="!hover:bg-blue-600 transform !bg-blue-500 transition-transform duration-200 active:scale-95"
          >
            {dict.buttons.view_details}
          </PrimaryButtonComponent>

          <PrimaryButtonComponent
            onClick={handleContactClick}
            fullWidth
            size="md"
            className="!hover:bg-emerald-600 transform !bg-emerald-500 transition-transform duration-200 active:scale-95"
          >
            {dict.buttons.ask_about_puppy}
          </PrimaryButtonComponent>
        </div>
      </div>
    </div>
  );
}
