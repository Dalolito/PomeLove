'use client';

import AdminPuppiesTableButtonsComponent from '@/components/admin/table/AdminPuppiesTableButtonsComponent';
import PuppyImageComponent from '@/components/ui/PuppyImageComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Puppy } from '@/domain/entities/Puppy';
import { calculatePuppyAgeUtil } from '@/lib/utils/calculatePuppyAgeUtil';

interface AdminPuppiesTableRowProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function AdminPuppiesTableRowComponent({
  puppy,
  dict,
  locale,
  className = '',
}: AdminPuppiesTableRowProps) {
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
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`}>
      <td className="px-2 py-3 sm:px-4">
        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-20">
          <PuppyImageComponent
            src={getMainImage()}
            alt={puppy.name}
            className="h-full w-full object-cover"
          />
        </div>
      </td>

      <td className="px-2 py-3 sm:px-4">
        <div className="font-medium text-gray-900">{puppy.name}</div>
        <div className="text-sm text-gray-500">
          {calculatePuppyAgeUtil(puppy.birthDate, dict)}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 sm:hidden">
          <span>{puppy.category.name}</span>
          <span>•</span>
          <span>{dict.admin.forms.gender[puppy.gender]}</span>
          <span>•</span>
          <span>{formatDate(puppy.birthDate, locale)}</span>
        </div>
      </td>

      <td className="hidden px-2 py-3 sm:table-cell sm:px-4">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          {puppy.category.name}
        </span>
      </td>

      <td className="px-2 py-3 sm:px-4">
        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
          {dict.admin.forms.gender[puppy.gender]}
        </span>
      </td>

      <td className="hidden px-2 py-3 text-sm text-gray-900 sm:px-4 md:table-cell">
        {formatDate(puppy.birthDate, locale)}
      </td>

      <td className="hidden max-w-xs px-2 py-3 sm:px-4 lg:table-cell">
        <div
          className="truncate text-sm text-gray-900"
          title={puppy.description}
        >
          {puppy.description}
        </div>
      </td>

      <td className="px-2 py-3 text-center sm:px-4">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            puppy.available
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {puppy.available
            ? dict.admin.table.status.available
            : dict.admin.table.status.unavailable}
        </span>
      </td>

      <td className="px-2 py-3 sm:px-4">
        <AdminPuppiesTableButtonsComponent
          puppyId={puppy.id!}
          puppyName={puppy.name}
          dict={dict}
          locale={locale}
        />
      </td>
    </tr>
  );
}
