import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';
import SecondaryButtonComponent from '@/components/ui/SecondaryButtonComponent';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

import { use } from 'react';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = use(getDictionary(locale));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-800">
          {dict.header.subtitle}
        </h1>
        <p className="mb-8 text-lg text-slate-600">{dict.header.experience}</p>

        <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-4 text-6xl">🐕</div>
          <h2 className="mb-2 text-xl font-semibold text-slate-800">
            {dict.navigation.home} - PuppyShop
          </h2>
          <p className="mb-6 text-slate-600">{dict.buttons.search_puppy}</p>

          <div className="space-y-3">
            <PrimaryButtonComponent
              fullWidth
              size="lg"
              href={`/${locale}/catalog`}
            >
              {dict.buttons.search_puppy}
            </PrimaryButtonComponent>

            <SecondaryButtonComponent
              fullWidth
              size="lg"
              href={`/${locale}/about`}
            >
              {dict.buttons.about_us}
            </SecondaryButtonComponent>
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          {dict.home.available_now}
        </div>
      </div>
    </div>
  );
}
