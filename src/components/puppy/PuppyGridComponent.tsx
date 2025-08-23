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
}

export default function PuppyGridComponent({
  puppies,
  dict,
  locale,
  loading = false,
  className = '',
}: PuppyGridComponentProps) {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <PuppyCardSkeletonComponent key={index} />
        ))}
      </div>
    );
  }

  if (puppies.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="mx-auto max-w-sm">
          <div className="mb-4 text-6xl">🐕</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {dict.admin.table.empty.title}
          </h3>
          <p className="text-gray-600">
            {dict.admin.table.empty.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {puppies.map((puppy, index) => (
        <PuppyCardComponent
          key={puppy.id}
          puppy={puppy}
          dict={dict}
          locale={locale}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
