import AdminPuppiesTableButtonsComponent from '@/components/admin/table/AdminPuppiesTableButtonsComponent';
import PuppyImageComponent from '@/components/ui/PuppyImageComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Puppy } from '@/domain/entities/Puppy';
import { calculatePuppyAgeUtil } from '@/lib/utils/calculatePuppyAgeUtil';
import { getLocalizedDescription } from '@/lib/utils/getLocalizedDescription';

interface AdminPuppiesCardElementProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  isDeleting?: boolean;
  className?: string;
}

export default function AdminPuppiesCardElementComponent({
  puppy,
  dict,
  locale,
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
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <PuppyImageComponent
            src={getMainImage()}
            alt={puppy.name}
            className="h-full w-full"
          />
        </div>

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

            <div className="ml-2 flex-shrink-0">
              <AdminPuppiesTableButtonsComponent
                puppyId={puppy.id!}
                puppyName={puppy.name}
                dict={dict}
                locale={locale}
                isDeleting={isDeleting}
              />
            </div>
          </div>

          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {puppy.category.name}
            </span>
          </div>

          <div className="mt-2">
            <p
              className="line-clamp-2 text-sm text-gray-600"
              title={getLocalizedDescription(puppy, locale)}
            >
              {getLocalizedDescription(puppy, locale)}
            </p>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            {dict.admin.table.headers.birthDate}:{' '}
            {formatDate(puppy.birthDate, locale)}
          </div>
        </div>
      </div>
    </div>
  );
}
