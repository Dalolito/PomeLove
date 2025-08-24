'use client';

import { useState, useEffect, useMemo } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { getFilteredPuppiesAction } from '@/actions/puppyActions';
import PuppyGridComponent from '@/components/puppy/PuppyGridComponent';
import ImagePreloaderComponent from '@/components/ui/ImagePreloaderComponent';
import { validateImageUrl } from '@/lib/utils/imageUtils';

interface PuppyAvailableListComponentProps {
  dict: Dictionary;
  locale: string;
  maxPuppies?: number;
  className?: string;
}

const cleanPuppyData = (puppy: Puppy): Puppy => {
  if (!puppy || !puppy.id) {
    return puppy;
  }

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
};

export default function PuppyAvailableListComponent({
  dict,
  locale,
  maxPuppies = 8,
  className = '',
}: PuppyAvailableListComponentProps) {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAvailablePuppies = async () => {
      try {
        setLoading(true);
        setError('');

        const result = await getFilteredPuppiesAction({
          available: true,
        });

        if (result.success && result.puppies) {
          const cleanedPuppies = result.puppies.map(cleanPuppyData);
          const limitedPuppies = cleanedPuppies.slice(0, maxPuppies);
          setPuppies(limitedPuppies);
        } else {
          setError(result.error || 'Error fetching puppies');
        }
      } catch {
        setError(dict.utils.errors.unexpected);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailablePuppies();
  }, [maxPuppies]);

  const priorityImages = useMemo(() => {
    return puppies
      .slice(0, 6)
      .map(puppy => {
        if (puppy.media && puppy.media.length > 0) {
          const firstImage = puppy.media.find(media => media.type === 'image');
          if (firstImage?.url) {
            const validatedUrl = validateImageUrl(firstImage.url);
            return validatedUrl !== '/placeholder-puppy.svg' ? validatedUrl : null;
          }
        }
        return null;
      })
      .filter(Boolean) as string[];
  }, [puppies]);

  if (error) {
    return (
      <div className={`py-12 text-center ${className}`}>
        <div className="mx-auto max-w-sm">
          <div className="mb-4 text-6xl">⚠️</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {dict.admin.table.empty.title}
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ImagePreloaderComponent images={priorityImages} />
      <PuppyGridComponent
        puppies={puppies}
        dict={dict}
        locale={locale}
        loading={loading}
        className={className}
      />
    </>
  );
}
