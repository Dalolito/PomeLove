import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/Footer";

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
    const dict = await import(`@/dictionaries/${locale}.json`)
    return dict.default
  } catch {
    const dict = await import('@/dictionaries/es.json')
    return dict.default
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale)
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={dict.header.title} currentLocale={params.locale} />
      <main className="flex-1">
        {children}
      </main>
      <Footer title={dict.header.title} />
    </div>
  );
}