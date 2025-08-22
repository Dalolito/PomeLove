import { Suspense } from 'react';
import { getAllPuppiesAction } from '@/actions/puppyActions';
import AdminPuppiesTableComponent from '@/components/admin/table/AdminPuppiesTableComponent';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface AdminPuppiesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminPuppiesPage({
  params,
}: AdminPuppiesPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const result = await getAllPuppiesAction();

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
              <span className="text-gray-600">{dict.admin.table.loading}</span>
            </div>
          </div>
        }
      >
        <AdminPuppiesTableComponent
          puppies={result.puppies || []}
          dict={dict}
          locale={locale}
        />
      </Suspense>
    </div>
  );
}
