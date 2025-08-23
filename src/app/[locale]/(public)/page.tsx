import { Suspense } from 'react';
import PuppyAvailableListComponent from '@/components/puppy/PuppyAvailableListComponent';
import PuppyCardSkeletonComponent from '@/components/puppy/PuppyCardSkeletonComponent';
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

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <PuppyCardSkeletonComponent key={index} />
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative bg-white border-b">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              {dict.header.subtitle}
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              {dict.header.experience}
            </p>
            
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <PrimaryButtonComponent
                size="xl"
                href={`/${locale}/catalog`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🐕 {dict.buttons.search_puppy}
              </PrimaryButtonComponent>
              
              <SecondaryButtonComponent
                size="xl"
                href={`/${locale}/about`}
                className="border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                ℹ️ {dict.buttons.about_us}
              </SecondaryButtonComponent>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {dict.home.available_now}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.home.availableDescription}
            </p>
          </div>

          <Suspense fallback={<LoadingSkeleton />}>
            <PuppyAvailableListComponent
              dict={dict}
              locale={locale}
              maxPuppies={8}
              className="mb-12"
            />
          </Suspense>

          <div className="text-center">
            <PrimaryButtonComponent
              size="lg"
              href={`/${locale}/catalog`}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {dict.home.viewAllPuppies}
            </PrimaryButtonComponent>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">
              {dict.home.contactTitle}
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              {dict.home.contactDescription}
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <a
                href="https://wa.me/573004439574"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-red-500 transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl">💬</span>
                {dict.home.whatsappText}
              </a>
              
              <a
                href="https://www.instagram.com/pomelove_korea?igsh=dTA4Njl5aXY5bnRk&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-red-500 transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl">📱</span>
                {dict.home.instagramText}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
