async function getDictionary(locale: string) {
    try {
      const dict = await import(`@/dictionaries/${locale}.json`)
      return dict.default
    } catch {
      const dict = await import('@/dictionaries/es.json')
      return dict.default
    }
  }
  
  import { use } from 'react';

export default function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = use(getDictionary(locale));
  
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {dict.admin?.dashboard || 'Dashboard'}
        </h1>
        <p className="text-gray-600">
          {dict.admin?.subtitle || 'Administration panel'}
        </p>
      </div>
    );
  }