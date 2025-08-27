import { Suspense } from 'react';
import type { Metadata } from 'next';
import AboutUsContentComponent from '@/components/about/AboutUsContentComponent';
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

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return generateMetadataFromDict(dict.metadata.about, locale);
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
              <span className="text-gray-600">Cargando...</span>
            </div>
          </div>
        }
      >
        <AboutUsContentComponent dict={dict} locale={locale} />
      </Suspense>
    </div>
  );
}
