import AdminPuppiesTableButtonsComponent from './AdminPuppiesTableButtonsComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Puppy } from '@/domain/entities/Puppy';
import { calculatePuppyAgeUtil } from '@/lib/utils/calculatePuppyAgeUtil';

interface AdminPuppiesCardElementProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  className?: string;
}

export default function AdminPuppiesCardElementComponent({
  puppy,
  dict,
  locale,
  onView,
  onEdit,
  onDelete,
  isDeleting = false,
  className = '',
}: AdminPuppiesCardElementProps) {
  const formatDate = (date: Date, localeParam: string): string => {
    return new Date(date).toLocaleDateString(
      localeParam === 'es' ? 'es-ES' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );
  };

  const getMainImage = (): string => {
    if (puppy.media && puppy.media.length > 0) {
      const firstImage = puppy.media.find(media => media.type === 'image');
      if (firstImage) {
        return firstImage.url;
      }
    }
    return '/placeholder-puppy.svg';
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={getMainImage()}
            alt={puppy.name}
            className="h-full w-full object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement;
              if (target.src !== '/placeholder-puppy.svg') {
                target.src = '/placeholder-puppy.svg';
              }
            }}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-gray-900">
                {puppy.name}
              </h3>
              <p className="text-sm text-gray-500">
                {calculatePuppyAgeUtil(puppy.birthDate, dict)}
              </p>
            </div>

            {/* Actions */}
            <div className="ml-2 flex-shrink-0">
              <AdminPuppiesTableButtonsComponent
                puppyId={puppy.id!}
                puppyName={puppy.name}
                dict={dict}
                locale={locale}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                isDeleting={isDeleting}
              />
            </div>
          </div>

          {/* Category */}
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {puppy.category.name}
            </span>
          </div>

          {/* Description */}
          <div className="mt-2">
            <p
              className="line-clamp-2 text-sm text-gray-600"
              title={puppy.description}
            >
              {puppy.description}
            </p>
          </div>

          {/* Birth Date */}
          <div className="mt-2 text-xs text-gray-500">
            {dict.admin.table.headers.birthDate}:{' '}
            {formatDate(puppy.birthDate, locale)}
          </div>
        </div>
      </div>
    </div>
  );
}
