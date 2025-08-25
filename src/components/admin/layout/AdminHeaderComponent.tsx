import AdminHamburgerMenuComponent from '@/components/admin/layout/AdminHamburgerMenuComponent';
import LanguageButtonComponent from '@/components/layout/LanguageButtonComponent';
import LogoutButtonComponent from '@/components/admin/auth/LogoutButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { headers } from 'next/headers';

interface AdminHeaderProps {
  title: string;
  currentLocale: string;
  dict: Dictionary;
  showLogout?: boolean;
}

export default async function AdminHeader({
  title,
  currentLocale,
  dict,
  showLogout = true,
}: AdminHeaderProps) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const isLoginPage = pathname.includes('/login');

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">
              {title}
            </h1>
          </div>

          <div className="relative flex items-center gap-3">
            {!isLoginPage && <LogoutButtonComponent dict={dict} />}
            
            <LanguageButtonComponent
              currentLocale={currentLocale}
              dict={dict}
            />

            <AdminHamburgerMenuComponent
              currentLocale={currentLocale}
              dict={dict}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
