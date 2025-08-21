import AdminPuppiesTableButtonsComponent from './AdminPuppiesTableButtonsComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Puppy } from '@/domain/entities/Puppy';
import { calculatePuppyAgeUtil } from '@/lib/utils/calculatePuppyAgeUtil';

interface AdminPuppiesTableElementProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  className?: string;
}

export default function AdminPuppiesTableElementComponent({
  puppy,
  dict,
  locale,
  onView,
  onEdit,
  onDelete,
  isDeleting = false,
  className = '',
}: AdminPuppiesTableElementProps) {
  const formatDate = (date: Date, localeParam: string): string => {
    return new Date(date).toLocaleDateString(localeParam === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getMainImage = (): string => {
    if (puppy.media && puppy.media.length > 0) {
      return puppy.media[0].url;
    }
    return '/placeholder-puppy.jpg';
  };

  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`}>
      <td className="px-4 py-3">
        <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={getMainImage()}
            alt={puppy.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-puppy.jpg';
            }}
          />
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{puppy.name}</div>
        <div className="text-sm text-gray-500">
          {calculatePuppyAgeUtil(puppy.birthDate, dict)}
        </div>
      </td>

      <td className="px-4 py-3">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          {puppy.category.name}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-gray-900">
        {formatDate(puppy.birthDate, locale)}
      </td>

      <td className="max-w-xs px-4 py-3">
        <div className="truncate text-sm text-gray-900" title={puppy.description}>
          {puppy.description}
        </div>
      </td>

      <td className="px-4 py-3 text-center text-sm text-gray-500">
        {puppy.media ? puppy.media.length : 0}
      </td>

      <td className="px-4 py-3">
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
      </td>
    </tr>
  );
}