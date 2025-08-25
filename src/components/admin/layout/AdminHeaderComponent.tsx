import AdminHamburgerMenuComponent from '@/components/admin/layout/AdminHamburgerMenuComponent';
import LanguageButtonComponent from '@/components/layout/LanguageButtonComponent';
import AdminLogoutButtonComponent from '@/components/admin/auth/AdminLogoutButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Session } from 'next-auth';

interface AdminHeaderProps {
  title: string;
  currentLocale: string;
  dict: Dictionary;
  session: Session;
}

export default function AdminHeader({
  title,
  currentLocale,
  dict,
  session,
}: AdminHeaderProps) {
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
            <span className="hidden text-sm text-gray-600 sm:block">
              Hola, {session.user?.name}
            </span>

            <LanguageButtonComponent
              currentLocale={currentLocale}
              dict={dict}
            />

            <AdminLogoutButtonComponent dict={dict} />

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
