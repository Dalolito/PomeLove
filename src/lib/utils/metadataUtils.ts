import { Metadata } from 'next';
import { Dictionary } from '@/lib/types/dictionary';

interface MetadataParams {
  dict: Dictionary;
  page?: 'home' | 'catalog' | 'about' | 'puppy';
  puppyData?: {
    name?: string;
    category?: string;
    description?: string;
  };
  locale?: string;
}

export function generateMetadata({
  dict,
  page = 'home',
  puppyData,
  locale = 'es',
}: MetadataParams): Metadata {
  const baseUrl = 'https://pomeloves.com';
  const currentUrl = `${baseUrl}/${locale}`;

  let title: string;
  let description: string;
  let keywords: string;

  const pageMetadata = dict.metadata[page];

  if (page === 'puppy' && puppyData) {
    const puppyMetadata = pageMetadata as typeof dict.metadata.puppy;
    title = puppyMetadata.titleTemplate
      .replace('{name}', puppyData.name || dict.utils.fallbacks.noName)
      .replace(
        '{category}',
        puppyData.category || dict.utils.fallbacks.noCategory
      );

    description = puppyMetadata.descriptionTemplate
      .replace(
        '{category}',
        puppyData.category || dict.utils.fallbacks.noCategory
      )
      .replace(
        '{description}',
        puppyData.description || dict.utils.fallbacks.noDescription
      );

    keywords = puppyMetadata.keywordsTemplate
      .replace('{name}', puppyData.name || dict.utils.fallbacks.noName)
      .replace(
        '{category}',
        puppyData.category || dict.utils.fallbacks.noCategory
      );
  } else {
    const staticMetadata = pageMetadata as typeof dict.metadata.home;
    title = staticMetadata.title;
    description = staticMetadata.description;
    keywords = staticMetadata.keywords;
  }

  const metadata: Metadata = {
    title: {
      default: title,
      template: '%s | POMELOVE KOREA',
    },
    description,
    keywords,
    authors: [{ name: 'POMELOVE KOREA' }],
    creator: 'POMELOVE KOREA',
    publisher: 'POMELOVE KOREA',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    icons: {
      icon: [
        { url: '/logo-2.png', sizes: '16x16', type: 'image/png' },
        { url: '/logo-2.png', sizes: '32x32', type: 'image/png' },
        { url: '/logo-2.png', sizes: '48x48', type: 'image/png' },
        { url: '/logo-2.png', sizes: '96x96', type: 'image/png' },
      ],
      shortcut: '/logo-2.png',
      apple: [
        { url: '/logo-2.png', sizes: '180x180', type: 'image/png' },
        { url: '/logo-2.png', sizes: '152x152', type: 'image/png' },
        { url: '/logo-2.png', sizes: '144x144', type: 'image/png' },
      ],
      other: [
        {
          rel: 'icon',
          url: '/logo-2.png',
          type: 'image/png',
        },
        {
          rel: 'mask-icon',
          url: '/logo-2.png',
        },
      ],
    },
    manifest: '/manifest.json',
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      url: currentUrl,
      title,
      description,
      siteName: 'POMELOVE KOREA',
      images: [
        {
          url: '/logo-2.png',
          width: 1200,
          height: 630,
          alt: 'POMELOVE KOREA - Pomerania de Alta Calidad',
        },
        {
          url: '/logo-2.png',
          width: 512,
          height: 512,
          alt: 'POMELOVE KOREA Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo-2.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google:
        process.env.GOOGLE_VERIFICATION_CODE || 'your-google-verification-code',
    },
    other: {
      'msapplication-TileImage': '/logo-2.png',
      'msapplication-TileColor': '#ffffff',
      'theme-color': '#ffffff',
    },
  };

  return metadata;
}

export function generateAdminMetadata(dict: Dictionary): Metadata {
  return {
    title: {
      default: `${dict.admin.menu} - POMELOVE KOREA`,
      template: '%s | POMELOVE KOREA',
    },
    description: dict.admin.subtitle,
    robots: {
      index: false,
      follow: false,
    },
    icons: {
      icon: [
        { url: '/logo-2.png', sizes: '16x16', type: 'image/png' },
        { url: '/logo-2.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/logo-2.png',
      apple: '/logo-2.png',
    },
  };
}
