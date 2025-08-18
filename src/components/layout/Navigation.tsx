'use client';

import { useRouter, usePathname } from 'next/navigation';

interface NavigationProps {
  currentLocale: string;
}

export default function Navigation({ currentLocale }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-3">
      
      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          onClick={() => switchLanguage('es')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLocale === 'es' 
              ? 'bg-white text-slate-700 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          ES
        </button>
        <button 
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLocale === 'en' 
              ? 'bg-white text-slate-700 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          EN
        </button>
      </div>
      
      <button className="flex flex-col gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-5 h-0.5 bg-slate-600 rounded-full"></div>
        <div className="w-5 h-0.5 bg-slate-600 rounded-full"></div>
        <div className="w-5 h-0.5 bg-slate-600 rounded-full"></div>
      </button>
    </div>
  );
}
