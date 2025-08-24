import type { Metadata } from 'next';
import { use } from 'react';
import ClientLayoutContent from '@/components/layout/ClientLayoutContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.header.title} - ${dict.header.subtitle}`,
    description: dict.header.experience,
    openGraph: {
      title: dict.header.subtitle,
      description: dict.header.experience,
      locale: locale,
    },
  };
}

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = use(getDictionary(locale));

  return (
    <ClientLayoutContent
      title={dict.header.title}
      currentLocale={locale}
      dict={dict}
    >
      {children}
    </ClientLayoutContent>
  );
}
