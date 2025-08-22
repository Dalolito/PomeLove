import AdminEditFormComponent from '@/components/admin/forms/AdminEditFormComponent';
import { getAllCategoriesAction } from '@/actions/categoryActions';
import { getPuppyByIdAction } from '@/actions/puppyActions';
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

interface EditPuppyPageProps {
  params: Promise<{ 
    locale: string;
    id: string;
  }>;
}

export default async function EditPuppyPage({
  params,
}: EditPuppyPageProps) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);
  
  const [puppyResult, categoriesResult] = await Promise.all([
    getPuppyByIdAction(id),
    getAllCategoriesAction(),
  ]);

  if (!puppyResult.success || !puppyResult.puppy) {
    notFound();
  }

  const puppy = puppyResult.puppy;
  const categories = categoriesResult.success ? categoriesResult.data : [];

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:mb-12">
        <h1 className="mb-3 text-3xl font-bold text-gray-800 lg:mb-4 lg:text-4xl">
          {dict.admin.forms?.edit || 'Edit'} {puppy.name}
        </h1>
        <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600">
          {dict.admin.forms?.editDescription || 'Update the information for this pet'}
        </p>
      </div>

      <AdminEditFormComponent 
        puppy={puppy}
        dict={dict} 
        categories={categories || []}
        locale={locale} 
      />
    </div>
  );
}
