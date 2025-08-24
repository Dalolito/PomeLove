import { Suspense } from 'react';
import AboutUsContentComponent from '@/components/about/AboutUsContentComponent';
import type { Metadata } from 'next';

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

  return {
    title: `${dict.about?.hero?.title || 'Sobre Nosotros'} - ${dict.header.title}`,
    description: dict.about?.hero?.subtitle || 'Criadores especializados en Pomeranias Coreanos',
    openGraph: {
      title: dict.about?.hero?.title || 'Sobre Nosotros',
      description: dict.about?.hero?.subtitle || 'Criadores especializados en Pomeranias Coreanos',
      images: ['/media/sended-dog-1.jpeg'],
      locale,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
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
