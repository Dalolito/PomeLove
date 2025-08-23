import AdminEditCategoryFormComponent from '@/components/admin/forms/AdminEditCategoryFormComponent';
import { getCategoryByIdAction } from '@/actions/categoryActions';
import { notFound } from 'next/navigation';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface EditCategoryPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);

  const categoryResult = await getCategoryByIdAction(id);

  if (!categoryResult.success || !categoryResult.category) {
    notFound();
  }

  const category = categoryResult.category;

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:mb-12">
        <h1 className="mb-3 text-3xl font-bold text-gray-800 lg:mb-4 lg:text-4xl">
          {dict.admin.forms?.edit || 'Edit'} {category.name}
        </h1>
        <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600">
          {dict.admin.categories?.editDescription ||
            'Update the category information'}
        </p>
      </div>

      <AdminEditCategoryFormComponent
        category={category}
        dict={dict}
        locale={locale}
      />
    </div>
  );
}
