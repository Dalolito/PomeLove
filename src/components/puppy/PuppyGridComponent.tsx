import { memo } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import PuppyCardComponent from '@/components/puppy/PuppyCardComponent';
import PuppyCardSkeletonComponent from '@/components/puppy/PuppyCardSkeletonComponent';

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

  if (!puppies || puppies.length === 0) {
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
      {puppies.map((puppy, index) => {
        if (!puppy || !puppy.id) {
          console.warn('Puppy with invalid data found:', puppy);
          return null;
        }

        return (
          <PuppyCardComponent
            key={`puppy-${puppy.id}-${index}`}
            puppy={puppy}
            dict={dict}
            locale={locale}
            priority={index < 6}
          />
        );
      })}
    </div>
  );
}

export default memo(PuppyGridComponent);
