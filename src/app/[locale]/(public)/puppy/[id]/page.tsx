import { notFound } from 'next/navigation';
import { getPuppyDetailAction } from '@/actions/puppyActions';
import PuppyDetailComponent from '@/components/puppy/PuppyDetailComponent';
import { getLocalizedDescription } from '@/lib/utils/getLocalizedDescription';
import { generatePuppyMetadataFromDict } from '@/lib/utils/metadataUtils';
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
  const description =
    getLocalizedDescription(puppy, locale).substring(0, 150) + '...';

  return generatePuppyMetadataFromDict(
    dict.metadata.puppy,
    puppy,
    locale,
    description
  );
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
