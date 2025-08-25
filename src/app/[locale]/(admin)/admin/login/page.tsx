import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/authUtils';
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

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const session = await auth();
  if (session?.user) {
    redirect(`/${locale}/admin/puppys`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <LoginFormComponent dict={dict} locale={locale} />
      </div>
    </div>
  );
}
