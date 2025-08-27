import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import PuppyAvailableListComponent from '@/components/puppy/PuppyAvailableListComponent';
import PuppyCardSkeletonComponent from '@/components/puppy/PuppyCardSkeletonComponent';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';
import SecondaryButtonComponent from '@/components/ui/SecondaryButtonComponent';
import { generateMetadataFromDict } from '@/lib/utils/metadataUtils';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return generateMetadataFromDict(dict.metadata.home, locale);
}

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
    <div className="min-h-screen bg-gray-50">
      <section className="relative border-b bg-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              {dict.header.subtitle}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              {dict.about.experience.subtitle}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-red-500">100+</div>
                <div className="text-sm text-gray-600">
                  {dict.about.happyClients.stats.puppies}
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-red-500">15+</div>
                <div className="text-sm text-gray-600">
                  {dict.about.happyClients.stats.countries}
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-red-500">10+</div>
                <div className="text-sm text-gray-600">
                  {dict.about.happyClients.stats.years}
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-red-500">5+</div>
                <div className="text-sm text-gray-600">
                  {dict.about.happyClients.stats.korean}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <PrimaryButtonComponent
                size="xl"
                href={`/${locale}/catalog`}
                className="transform bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-blue-800"
              >
                🐕 {dict.buttons.search_puppy}
              </PrimaryButtonComponent>

              <SecondaryButtonComponent
                size="xl"
                href={`/${locale}/about`}
                className="transform border-2 border-gray-300 bg-white shadow-lg transition-all duration-200 hover:scale-105 hover:border-gray-400 hover:bg-gray-50"
              >
                ℹ️ {dict.buttons.about_us}
              </SecondaryButtonComponent>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {dict.home.available_now}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
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
              className="transform bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg transition-all duration-200 hover:scale-105 hover:from-emerald-700 hover:to-emerald-800"
            >
              {dict.home.viewAllPuppies}
            </PrimaryButtonComponent>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              {dict.home.contactTitle}
            </h2>
            <p className="mb-8 text-xl text-orange-100">
              {dict.home.contactDescription}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <a
                href="https://wa.me/573004439574"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-red-500 shadow-lg transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl active:scale-95"
              >
                <Image
                  src="/icons/icon-whatsapp.png"
                  alt="WhatsApp"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                {dict.home.whatsappText}
              </a>

              <a
                href="https://www.instagram.com/pomelove_korea?igsh=dTA4Njl5aXY5bnRk&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-red-500 shadow-lg transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl active:scale-95"
              >
                <Image
                  src="/icons/icon-instagram.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                {dict.home.instagramText}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
