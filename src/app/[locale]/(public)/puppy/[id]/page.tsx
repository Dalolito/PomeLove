import { notFound } from 'next/navigation';
import { getPuppyDetailAction } from '@/actions/puppyActions';
import PuppyDetailComponent from '@/components/puppy/PuppyDetailComponent';
import type { Metadata } from 'next/types';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface PuppyDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PuppyDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);
  const puppyResult = await getPuppyDetailAction(id);

  if (!puppyResult.success || !puppyResult.puppy) {
    return {
      title: `${dict.header.title} - Puppy Not Found`,
    };
  }

  const puppy = puppyResult.puppy;
  const title = `${puppy.name} - ${puppy.category.name} | ${dict.header.title}`;
  const description = `${puppy.description.substring(0, 150)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: puppy.media.length > 0 ? [puppy.media[0].url] : [],
      locale,
    },
  };
}

export default async function PuppyDetailPage({
  params,
}: PuppyDetailPageProps) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);

  const puppyResult = await getPuppyDetailAction(id);

  if (!puppyResult.success || !puppyResult.puppy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PuppyDetailComponent
        puppy={puppyResult.puppy}
        dict={dict}
        locale={locale}
      />
    </div>
  );
}
