import { memo, useMemo, useCallback } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import PuppyCardComponent from '@/components/puppy/PuppyCardComponent';
import PuppyCardSkeletonComponent from '@/components/puppy/PuppyCardSkeletonComponent';
import { validateImageUrl } from '@/lib/utils/imageUtils';

interface PuppyGridComponentProps {
  puppies: Puppy[];
  dict: Dictionary;
  locale: string;
  loading?: boolean;
  className?: string;
  isPublic?: boolean;
}

function PuppyGridComponent({
  puppies,
  dict,
  locale,
  loading = false,
  className = '',
  isPublic = false,
}: PuppyGridComponentProps) {
  const validPuppies = useMemo(() => {
    if (!puppies || !Array.isArray(puppies)) {
      return [];
    }

    return puppies
      .filter(puppy => {
        if (!puppy || !puppy.id) {
          return false;
        }
        return true;
      })
      .map(puppy => {
        const cleanedPuppy = { ...puppy };

        if (puppy.media && Array.isArray(puppy.media)) {
          cleanedPuppy.media = puppy.media
            .filter(media => media && media.type && media.url)
            .map(media => ({
              ...media,
              url: validateImageUrl(media.url)
            }));
        }

        if (puppy.fatherImage) {
          cleanedPuppy.fatherImage = validateImageUrl(puppy.fatherImage);
        }

        if (puppy.motherImage) {
          cleanedPuppy.motherImage = validateImageUrl(puppy.motherImage);
        }

        return cleanedPuppy;
      });
  }, [puppies]);

  const handleCardError = useCallback((puppyId: string, error: any) => {
    console.error(`Error rendering puppy card ${puppyId}:`, error);
  }, []);

  if (loading) {
    return (
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <PuppyCardSkeletonComponent key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (validPuppies.length === 0) {
    return (
      <div className={`py-12 text-center ${className}`}>
        <div className="mx-auto max-w-sm">
          <div className="mb-4 text-6xl">🐕</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {isPublic ? dict.catalog.empty.title : dict.admin.table.empty.title}
          </h3>
          <p className="text-gray-600">
            {isPublic
              ? dict.catalog.empty.description
              : dict.admin.table.empty.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {validPuppies.map((puppy, index) => {
        try {
          return (
            <PuppyCardComponent
              key={`puppy-${puppy.id}-${index}`}
              puppy={puppy}
              dict={dict}
              locale={locale}
              priority={index < 4}
            />
          );
        } catch (error) {
          handleCardError(puppy.id || 'unknown', error);
          return null;
        }
      })}
    </div>
  );
}

export default memo(PuppyGridComponent);
