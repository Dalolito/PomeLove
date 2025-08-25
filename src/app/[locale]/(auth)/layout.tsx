import AdminHeaderComponent from '@/components/admin/layout/AdminHeaderComponent';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

export default async function AuthLayout({
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
      <AdminHeaderComponent
        title={dict.header.title}
        currentLocale={locale}
        dict={dict}
        showLogout={false}
      />

      <main className="flex-1 px-4 py-1 lg:px-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
