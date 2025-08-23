import { Suspense } from 'react';
import { getAllPuppiesAction } from '@/actions/puppyActions';
import { getAllCategoriesAction } from '@/actions/categoryActions';
import CatalogContentComponent from '@/components/catalog/CatalogContentComponent';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface CatalogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const [puppiesResult, categoriesResult] = await Promise.all([
    getAllPuppiesAction(),
    getAllCategoriesAction(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
              <span className="text-gray-600">{dict.catalog.loading}</span>
            </div>
          </div>
        }
      >
        <CatalogContentComponent
          initialPuppies={puppiesResult.puppies || []}
          categories={categoriesResult.data || []}
          dict={dict}
          locale={locale}
        />
      </Suspense>
    </div>
  );
}
