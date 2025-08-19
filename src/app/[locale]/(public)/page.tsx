// src/app/[locale]/page.tsx
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
            {dict.navigation.home} - PuppyShop
          </h2>
          <p className="text-slate-600 mb-6">
            {dict.buttons.search_puppy}
          </p>
          
          <div className="space-y-3">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              {dict.buttons.search_puppy}
            </button>
            <button className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition-colors">
              {dict.buttons.about_us}
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-slate-500">
          {dict.home.available_now}
        </div>
      </div>
    </div>
  );
}