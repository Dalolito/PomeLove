import AdminHamburgerMenu from './AdminHamburgerMenuComponent';
import LanguageButtonComponent from '@/components/layout/LanguageButtonComponent';

interface AdminHeaderProps {
  title: string;
  currentLocale: string;
  dict: any;
}

export default function AdminHeader({ title, currentLocale, dict }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo and title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              {title}
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 relative">
            
            {/* Language switcher */}
            <LanguageButtonComponent 
              currentLocale={currentLocale}
            />
            
            {/* Admin Hamburger menu */}
            <AdminHamburgerMenu 
              currentLocale={currentLocale}
              dict={dict}
            />
          </div>
        </div>
      </div>
    </header>
  );
}