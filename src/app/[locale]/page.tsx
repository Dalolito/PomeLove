import Layout from '@/app/[locale]/layout';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`)
    return dict.default
  } catch {
    const dict = await import('@/dictionaries/es.json')
    return dict.default
  }
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <Layout 
      title={dict.header.title}
      currentLocale={params.locale}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            {dict.header.subtitle}
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {dict.header.experience}
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🐕</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Welcome to PuppyShop
            </h2>
            <p className="text-slate-600">
              Find your perfect Pomeranian companion
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}