import AdminCategoryFormComponent from '@/components/admin/forms/AdminCategoryFormComponent';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface CreateCategoryPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CreateCategoryPage({
  params,
}: CreateCategoryPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:mb-12">
        <h1 className="mb-3 text-3xl font-bold text-gray-800 lg:mb-4 lg:text-4xl">
          {dict.admin.forms?.create || 'Create'}{' '}
          {dict.admin.categories?.title || 'Category'}
        </h1>
        <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600">
          {dict.admin.categories?.description ||
            'Add a new category to the system'}
        </p>
      </div>

      <AdminCategoryFormComponent dict={dict} locale={locale} />
    </div>
  );
}
