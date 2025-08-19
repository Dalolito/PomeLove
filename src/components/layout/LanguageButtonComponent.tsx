'use client';

import { useRouter, usePathname } from 'next/navigation';

interface LanguageButtonComponentProps {
  currentLocale: string;
}

export default function LanguageButtonComponent({ 
  currentLocale
}: LanguageButtonComponentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageSwitch = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button 
        onClick={() => handleLanguageSwitch('es')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currentLocale === 'es' 
            ? 'bg-white text-slate-700 shadow-sm' 
            : 'text-slate-500 hover:text-slate-700'
        }`}
        title="Español"
      >
        ES
      </button>
      <button 
        onClick={() => handleLanguageSwitch('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currentLocale === 'en' 
            ? 'bg-white text-slate-700 shadow-sm' 
            : 'text-slate-500 hover:text-slate-700'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
}