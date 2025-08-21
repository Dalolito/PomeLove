import type { Metadata } from 'next';
import { use } from 'react';
import HeaderComponent from '@/components/layout/HeaderComponent';
import FooterComponent from '@/components/layout/FooterComponent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: `${dict.header.title} - ${dict.header.subtitle}`,
    description: dict.header.experience,
    openGraph: {
      title: dict.header.subtitle,
      description: dict.header.experience,
      locale: params.locale,
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
    <div className="flex min-h-screen flex-col">
      {/* Header with navigation and hamburger menu */}
      <HeaderComponent
        title={dict.header.title}
        currentLocale={locale}
        dict={dict}
      />

      {/* Main content for each page */}
      <main className="flex-1">{children}</main>

      {/* Footer with contact info and social media */}
      <FooterComponent
        title={dict.header.title}
        currentLocale={locale}
        dict={dict}
      />
    </div>
  );
}
