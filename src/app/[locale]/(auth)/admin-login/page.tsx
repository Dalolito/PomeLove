import LoginFormComponent from '@/components/admin/auth/LoginFormComponent';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface AdminLoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminLoginPage({ params }: AdminLoginPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {dict.header.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{dict.admin.subtitle}</p>
        </div>

        <LoginFormComponent dict={dict} />
      </div>
    </div>
  );
}
