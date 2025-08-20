import AdminFormComponent from '@/components/admin/forms/AdminFormComponent';

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

export default async function CreatePuppyPage({ params }: CreatePuppyPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {dict.admin.forms?.create || 'Create'} {dict.admin.puppys || 'Puppy'}
        </h1>
        <p className="text-gray-600">
          {dict.admin.forms?.description}
        </p>
      </div>

      <AdminFormComponent
        dict={dict}
        locale={locale}
      />
    </div>
  );
}