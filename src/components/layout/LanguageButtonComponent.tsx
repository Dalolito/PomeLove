'use client';

import { useRouter, usePathname } from 'next/navigation';

interface LanguageButtonComponentProps {
  currentLocale: string;
  dict: any;
}

export default function LanguageButtonComponent({
  currentLocale,
  dict,
}: LanguageButtonComponentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageSwitch = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');

    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <div className="flex items-center rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => handleLanguageSwitch('es')}
        className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
          currentLocale === 'es'
            ? 'bg-white text-slate-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
        title={dict.navigation?.spanish || 'Español'}
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageSwitch('en')}
        className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
          currentLocale === 'en'
            ? 'bg-white text-slate-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
        title={dict.navigation?.english || 'English'}
      >
        EN
      </button>
    </div>
  );
}
