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

  const getMainImage = (): string => {
    if (puppy.media && puppy.media.length > 0) {
      const firstImage = puppy.media.find(media => media.type === 'image');
      if (firstImage) {
        return firstImage.url;
      }
    }
    return '/placeholder-puppy.svg';
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleContactClick = () => {
    const message = encodeURIComponent(
      `${dict.buttons.search_puppy}: ${puppy.name} - ${puppy.category.name}`
    );
    window.open(`https://wa.me/573004439574?text=${message}`, '_blank');
  };

  return (
    <div className={`group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:scale-[1.02] ${className}`}>
      <div className="relative aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <PuppyCardImageComponent
          src={getMainImage()}
          alt={puppy.name}
          priority={priority}
          className={`absolute inset-0 transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {puppy.available && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
              {dict.admin.table.status.available}
            </span>
          </div>
        )}


      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {puppy.name}
          </h3>
          <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
            {calculatePuppyAgeUtil(puppy.birthDate, dict)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 border border-sky-200">
            {puppy.category.name}
          </span>
          <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800 border border-rose-200">
            {dict.admin.forms.gender[puppy.gender]}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2" title={puppy.description}>
          {puppy.description}
        </p>

                <div className="flex flex-col gap-2">
                     <PrimaryButtonComponent
             href={`/${locale}/puppy/${puppy.id}`}
             fullWidth
             size="md"
             className="!bg-blue-500 !hover:bg-blue-600 transform transition-transform duration-200 active:scale-95"
           >
             {dict.buttons.view_details}
           </PrimaryButtonComponent>
           
           <PrimaryButtonComponent
             onClick={handleContactClick}
             fullWidth
             size="md"
             className="!bg-emerald-500 !hover:bg-emerald-600 transform transition-transform duration-200 active:scale-95"
           >
             {dict.buttons.ask_about_puppy}
           </PrimaryButtonComponent>
        </div>
      </div>
    </div>
  );
}
