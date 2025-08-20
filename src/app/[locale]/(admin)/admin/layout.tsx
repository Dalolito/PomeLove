import type { Metadata } from "next";
import AdminHeaderComponent from '@/components/admin/layout/AdminHeaderComponent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  
  return {
    title: `${dict.header.title} - ${dict.admin?.subtitle || 'Admin'}`,
    description: `${dict.admin?.subtitle || 'Administration panel'} - ${dict.header.experience}`,
    openGraph: {
      title: `${dict.header.title} - Admin`,
      description: dict.admin?.subtitle || 'Administration panel',
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

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale)
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Admin Header with navigation and hamburger menu */}
      <AdminHeaderComponent 
        title={dict.header.title} 
        currentLocale={params.locale} 
        dict={dict}
      />
      
      {/* Main admin content area */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}