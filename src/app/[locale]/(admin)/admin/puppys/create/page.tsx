import AdminFormComponent from '@/components/admin/forms/AdminFormComponent';
import { getAllCategoriesAction } from '@/actions/categoryActions';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface CreatePuppyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CreatePuppyPage({
  params,
}: CreatePuppyPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // Fetch categories for the form
  const categoriesResult = await getAllCategoriesAction();
  const categories = categoriesResult.success ? categoriesResult.data : [];

  return (
    <div className="w-full">
      {/* Header Section*/}
      <div className="mb-8 text-center lg:mb-12">
        <h1 className="mb-3 text-3xl font-bold text-gray-800 lg:mb-4 lg:text-4xl">
          {dict.admin.forms?.create || 'Create'} {dict.admin.puppys || 'Puppy'}
        </h1>
        <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600">
          {dict.admin.forms?.description}
        </p>
      </div>

      {/* Form Section */}
      <AdminFormComponent dict={dict} categories={categories} locale={locale} />
    </div>
  );
}
