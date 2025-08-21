import type { Metadata } from 'next';
import AdminHeaderComponent from '@/components/admin/layout/AdminHeaderComponent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.header.title} - ${dict.admin?.subtitle || 'Admin'}`,
    description: `${dict.admin?.subtitle || 'Administration panel'} - ${dict.header.experience}`,
    openGraph: {
      title: `${dict.header.title} - Admin`,
      description: dict.admin?.subtitle || 'Administration panel',
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

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Admin Header with navigation and hamburger menu */}
      <AdminHeaderComponent
        title={dict.header.title}
        currentLocale={locale}
        dict={dict}
      />

      {/* Main admin content area */}
      <main className="flex-1 px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
