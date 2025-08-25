import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { calculatePuppyAgeUtil } from '@/lib/utils/calculatePuppyAgeUtil';
import { getLocalizedDescription } from '@/lib/utils/getLocalizedDescription';

interface PuppyDetailInfoComponentProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function PuppyDetailInfoComponent({
  puppy,
  dict,
  locale,
  className = '',
}: PuppyDetailInfoComponentProps) {
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString(
      locale === 'es' ? 'es-ES' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  const age = calculatePuppyAgeUtil(puppy.birthDate, dict);

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        {dict.admin.forms.basicInfo}
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            {dict.admin.table.headers.name}:
          </span>
          <span className="text-gray-900">{puppy.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            {dict.admin.table.headers.age}:
          </span>
          <span className="text-gray-900">{age}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            {dict.admin.table.headers.gender}:
          </span>
          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-sm font-medium text-purple-800">
            {dict.admin.forms.gender[puppy.gender]}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            {dict.admin.table.headers.category}:
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
            {puppy.category.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            {dict.admin.table.headers.birthDate}:
          </span>
          <span className="text-gray-900">{formatDate(puppy.birthDate)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            {dict.admin.table.headers.available}:
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${
              puppy.available
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {puppy.available
              ? dict.admin.table.status.available
              : dict.admin.table.status.unavailable}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="mb-3 font-medium text-gray-900">
          {dict.admin.table.headers.description}
        </h3>
        <p className="leading-relaxed text-gray-700">
          {getLocalizedDescription(puppy, locale)}
        </p>
      </div>
    </div>
  );
}
