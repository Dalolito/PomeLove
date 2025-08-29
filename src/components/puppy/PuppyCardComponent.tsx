'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { formatAge } from '@/lib/utils/formatAgeUtil';
import { openWhatsAppContact } from '@/lib/utils/whatsappUtils';
import { getLocalizedDescription } from '@/lib/utils/getLocalizedDescription';
import PuppyCardImageComponent from '@/components/ui/PuppyCardImageComponent';
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

  const mainImage = useMemo((): string => {
    if (
      !puppy.media ||
      !Array.isArray(puppy.media) ||
      puppy.media.length === 0
    ) {
      return '/placeholder-puppy.svg';
    }

    const validImages = puppy.media.filter(
      media =>
        media &&
        media.type === 'image' &&
        media.url &&
        typeof media.url === 'string' &&
        media.url.trim() !== '' &&
        media.url !== 'null' &&
        media.url !== 'undefined' &&
        !media.url.includes('undefined') &&
        !media.url.includes('null')
    );

    if (validImages.length === 0) {
      return '/placeholder-puppy.svg';
    }

    const firstValidUrl = validImages[0].url.trim();
    return firstValidUrl || '/placeholder-puppy.svg';
  }, [puppy.media]);

  const formatPrice = useCallback(
    (price: number): string => {
      return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(price);
    },
    [locale]
  );

  const formatCategoryPrice = useCallback((): string => {
    if (!puppy.category) return '';

    const price =
      locale === 'es' ? puppy.category.minPriceCOP : puppy.category.minPriceUSD;
    const currency = locale === 'es' ? 'COP' : 'USD';

    const formattedPrice = new Intl.NumberFormat(
      locale === 'es' ? 'es-CO' : 'en-US',
      {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
      }
    ).format(price);

    return formattedPrice + (locale === 'es' ? ' COP' : ' USD');
  }, [puppy.category, locale]);

  const handleContactClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openWhatsAppContact(puppy, dict, locale);
    },
    [puppy, dict, locale]
  );

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  if (!puppy || !puppy.id || !puppy.name) {
    return null;
  }

  return (
    <Link
      href={`/${locale}/puppy/${puppy.id}`}
      className={`group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl ${className}`}
    >
      <div className="relative aspect-square">
        <PuppyCardImageComponent
          src={mainImage}
          alt={`${puppy.name} - ${puppy.category?.name || dict.utils.fallbacks.pet}`}
          priority={priority}
          onLoad={handleImageLoad}
        />

        {puppy.available ? (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white shadow-sm">
              {dict.admin.table.status.available}
            </span>
          </div>
        ) : (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-gray-500 px-3 py-1 text-sm font-medium text-white shadow-sm">
              {dict.admin.table.status.unavailable}
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
            {formatAge(puppy.ageYears, puppy.ageMonths, dict)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="w-full">
            <div className="flex flex-col items-center rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 shadow-sm">
              <span className="mb-1 text-center text-base font-semibold text-blue-900">
                {puppy.category?.name || dict.utils.fallbacks.noCategory}
              </span>
              {puppy.category && (
                <span className="text-center text-sm font-bold text-emerald-700">
                  {dict.catalog.fromPrice} {formatCategoryPrice()}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 px-4 py-2 text-sm font-semibold text-pink-800 shadow-sm">
              {dict.admin.forms.gender[puppy.gender] || puppy.gender}
            </span>
          </div>
        </div>

        <p
          className="line-clamp-2 text-sm leading-tight text-gray-600"
          title={getLocalizedDescription(puppy, locale) || ''}
        >
          {getLocalizedDescription(puppy, locale) ||
            dict.utils.fallbacks.noDescription}
        </p>

        <div className="flex flex-col gap-2 pt-1">
          <div className="text-center">
            <span className="inline-flex w-full items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100">
              {dict.buttons.view_details}
            </span>
          </div>

          <button
            onClick={handleContactClick}
            className="flex w-full transform items-center justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95"
          >
            <img
              src="/icons/icon-whatsapp.png"
              alt="WhatsApp"
              className="mr-2 h-7 w-7"
            />
            <span className="whitespace-nowrap">
              {puppy.available
                ? dict.buttons.ask_about_puppy
                : dict.buttons.ask_about_similar}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}
