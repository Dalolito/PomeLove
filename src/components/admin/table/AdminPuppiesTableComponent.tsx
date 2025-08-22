import AdminPuppiesTableRowComponent from './AdminPuppiesTableRowComponent';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Puppy } from '@/domain/entities/Puppy';
import { replaceText } from '@/lib/utils/textUtils';

interface AdminPuppiesTableComponentProps {
  puppies: Puppy[];
  dict: Dictionary;
  locale: string;
  loading?: boolean;
  className?: string;
}

export default function AdminPuppiesTableComponent({
  puppies,
  dict,
  locale,
  loading = false,
  className = '',
}: AdminPuppiesTableComponentProps) {
  if (loading) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
            <span className="text-gray-600">{dict.admin.table.loading}</span>
          </div>
        </div>
      </div>
    );
  }

  if (puppies.length === 0) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex flex-col items-center justify-center p-12">
          <div className="mb-4 text-6xl">🐕</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {dict.admin.table.empty.title}
          </h3>
          <p className="mb-6 text-center text-gray-600">
            {dict.admin.table.empty.description}
          </p>
          <PrimaryButtonComponent
            href={`/${locale}/admin/puppys/create`}
            className="rounded-lg"
          >
            {dict.admin.table.empty.button}
          </PrimaryButtonComponent>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {dict.admin.table.title}
            </h2>
            <p className="text-sm text-gray-600">
              {replaceText(dict.admin.table.subtitle, {
                count: puppies.length,
              })}
            </p>
          </div>
          <PrimaryButtonComponent
            href={`/${locale}/admin/puppys/create`}
            className="w-full sm:w-auto"
          >
            + {dict.admin.table.actions.newPet}
          </PrimaryButtonComponent>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-4">
                  {dict.admin.table.headers.image}
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-4">
                  {dict.admin.table.headers.name}
                </th>
                <th className="hidden px-2 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:table-cell sm:px-4">
                  {dict.admin.table.headers.category}
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-4">
                  {dict.admin.table.headers.gender}
                </th>
                <th className="hidden px-2 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-4 md:table-cell">
                  {dict.admin.table.headers.birthDate}
                </th>
                <th className="hidden px-2 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-4 lg:table-cell">
                  {dict.admin.table.headers.description}
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-4">
                  {dict.admin.table.headers.available}
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-4">
                  {dict.admin.table.headers.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {puppies.map(puppy => (
                <AdminPuppiesTableRowComponent
                  key={puppy.id}
                  puppy={puppy}
                  dict={dict}
                  locale={locale}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
