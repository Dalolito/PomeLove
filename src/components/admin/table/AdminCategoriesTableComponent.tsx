import AdminCategoriesTableRowComponent from '@/components/admin/table/AdminCategoriesTableRowComponent';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Category } from '@/domain/entities/Category';
import { replaceText } from '@/lib/utils/textUtils';

interface AdminCategoriesTableComponentProps {
  categories: Category[];
  dict: Dictionary;
  locale: string;
  loading?: boolean;
  className?: string;
}

export default function AdminCategoriesTableComponent({
  categories,
  dict,
  locale,
  loading = false,
  className = '',
}: AdminCategoriesTableComponentProps) {
  if (loading) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
            <span className="text-gray-600">
              {dict.admin.categories.loading}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="flex flex-col items-center justify-center p-12">
          <div className="mb-4 text-6xl">📂</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {dict.admin.categories.empty.title}
          </h3>
          <p className="mb-6 text-center text-gray-600">
            {dict.admin.categories.empty.description}
          </p>
          <PrimaryButtonComponent
            href={`/${locale}/admin/categories/create`}
            className="rounded-lg"
          >
            {dict.admin.categories.empty.button}
          </PrimaryButtonComponent>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {dict.admin.categories.title}
            </h2>
            <p className="text-sm text-gray-600">
              {replaceText(dict.admin.categories.subtitle, {
                count: categories.length,
              })}
            </p>
          </div>
          <PrimaryButtonComponent
            href={`/${locale}/admin/categories/create`}
            className="w-full sm:w-auto"
          >
            + {dict.admin.categories.actions.newCategory}
          </PrimaryButtonComponent>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-6">
                {dict.admin.categories.headers.name}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-6">
                {dict.admin.categories.headers.minPriceCOP}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-6">
                {dict.admin.categories.headers.minPriceUSD}
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:px-6">
                {dict.admin.categories.headers.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories.map(category => (
              <AdminCategoriesTableRowComponent
                key={category.id}
                category={category}
                dict={dict}
                locale={locale}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
