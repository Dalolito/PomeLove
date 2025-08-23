'use client';

import { useState, useEffect, useMemo } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { getFilteredPuppiesAction } from '@/actions/puppyActions';
import PuppyGridComponent from '@/components/puppy/PuppyGridComponent';
import ImagePreloaderComponent from '@/components/ui/ImagePreloaderComponent';

interface PuppyAvailableListComponentProps {
  dict: Dictionary;
  locale: string;
  maxPuppies?: number;
  className?: string;
}

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
          const limitedPuppies = result.puppies.slice(0, maxPuppies);
          setPuppies(limitedPuppies);
        } else {
          setError(result.error || 'Error fetching puppies');
        }
      } catch {
        setError('Error inesperado');
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
          return firstImage?.url;
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
            Error al cargar mascotas
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
