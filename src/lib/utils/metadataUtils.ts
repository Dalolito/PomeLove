import type { Metadata } from 'next';

interface MetadataConfig {
  title: string;
  description: string;
  keywords: string;
}

interface PuppyMetadataConfig {
  titleTemplate: string;
  descriptionTemplate: string;
  keywordsTemplate: string;
}

export function generateMetadataFromDict(
  config: MetadataConfig,
  locale: string
): Metadata {
  const isSpanish = locale === 'es';

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      locale: isSpanish ? 'es_CO' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
  };
}

export function generatePuppyMetadataFromDict(
  config: PuppyMetadataConfig,
  puppy: any,
  locale: string,
  description: string
): Metadata {
  const isSpanish = locale === 'es';

  const title = config.titleTemplate
    .replace('{name}', puppy.name)
    .replace('{category}', puppy.category.name);

  const metaDescription = config.descriptionTemplate
    .replace('{category}', puppy.category.name)
    .replace('{description}', description);

  const keywords = config.keywordsTemplate
    .replace('{name}', puppy.name)
    .replace('{category}', puppy.category.name.toLowerCase());

  return {
    title,
    description: metaDescription,
    keywords,
    openGraph: {
      title,
      description: metaDescription,
      images: puppy.media.length > 0 ? [puppy.media[0].url] : [],
      locale: isSpanish ? 'es_CO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: puppy.media.length > 0 ? [puppy.media[0].url] : [],
    },
    alternates: {
      canonical: `/${locale}/puppy/${puppy.id}`,
      languages: {
        es: `/es/puppy/${puppy.id}`,
        en: `/en/puppy/${puppy.id}`,
      },
    },
  };
}
