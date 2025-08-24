'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { calculatePuppyAgeUtil } from '@/lib/utils/calculatePuppyAgeUtil';
import { openWhatsAppContact } from '@/lib/utils/whatsappUtils';
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

  const getMainImage = useCallback((): string => {
    if (!puppy.media || puppy.media.length === 0) {
      return '/placeholder-puppy.svg';
    }

    const firstValidImage = puppy.media.find(
      media =>
        media &&
        media.type === 'image' &&
        media.url &&
        media.url.trim() !== '' &&
        !media.url.includes('undefined') &&
        !media.url.includes('null')
    );

    if (firstValidImage && firstValidImage.url) {
      return firstValidImage.url;
    }

    return '/placeholder-puppy.svg';
  }, [puppy.media]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsAppContact(puppy, dict, locale);
  };

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <Link
      href={`/${locale}/puppy/${puppy.id}`}
      className={`group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl ${className}`}
    >
      <div className="relative aspect-square">
        <PuppyCardImageComponent
          src={getMainImage()}
          alt={`${puppy.name} - ${puppy.category?.name || dict.utils.fallbacks.pet}`}
          priority={priority}
          className="absolute inset-0"
          onLoad={handleImageLoad}
        />

        {puppy.available && (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
              {dict.admin.table.status.available}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {puppy.name || dict.utils.fallbacks.noName}
          </h3>
          <span className="ml-2 whitespace-nowrap text-sm text-gray-500">
            {calculatePuppyAgeUtil(puppy.birthDate, dict)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
            {puppy.category?.name || dict.utils.fallbacks.noCategory}
          </span>
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
            {dict.admin.forms.gender[puppy.gender] || puppy.gender}
          </span>
        </div>

        <p
          className="line-clamp-2 text-sm text-gray-600"
          title={puppy.description || ''}
        >
          {puppy.description || dict.utils.fallbacks.noDescription}
        </p>

        <div className="flex flex-col gap-2">
          <div className="text-center">
            <span className="inline-flex w-full items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100">
              {dict.buttons.view_details}
            </span>
          </div>

          <button
            onClick={handleContactClick}
            className="w-full transform rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95"
          >
            {dict.buttons.ask_about_puppy}
          </button>
        </div>
      </div>
    </Link>
  );
}
