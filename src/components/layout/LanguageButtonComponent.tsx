'use client';

interface LanguageButtonComponentProps {
  currentLocale: string;
  onLanguageChange?: (locale: string) => void;
}

export default function LanguageButtonComponent({ 
  currentLocale, 
  onLanguageChange 
}: LanguageButtonComponentProps) {

  const handleLanguageSwitch = (locale: string) => {
    if (onLanguageChange) {
      onLanguageChange(locale);
    } else {
      console.log('Switching to:', locale);
    }
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