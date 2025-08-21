import AdminHamburgerMenuComponent from './AdminHamburgerMenuComponent';
import LanguageButtonComponent from '@/components/layout/LanguageButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';

interface AdminHeaderProps {
  title: string;
  currentLocale: string;
  dict: Dictionary;
}

export default function AdminHeader({
  title,
  currentLocale,
  dict,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">
              {title}
            </h1>
          </div>

          {/* Navigation */}
          <div className="relative flex items-center gap-3">
            {/* Language switcher */}
            <LanguageButtonComponent currentLocale={currentLocale} />

            {/* Admin Hamburger menu */}
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
