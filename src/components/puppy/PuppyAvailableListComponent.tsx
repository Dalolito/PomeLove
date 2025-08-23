'use client';

import { useState, useEffect } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { getFilteredPuppiesAction } from '@/actions/puppyActions';
import PuppyGridComponent from '@/components/puppy/PuppyGridComponent';

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
    <PuppyGridComponent
      puppies={puppies}
      dict={dict}
      locale={locale}
      loading={loading}
      className={className}
    />
  );
}
