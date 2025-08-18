import Navigation from './Navigation';

interface HeaderProps {
    title: string;
    currentLocale: string;
  }
  
  export default function Header({ title, currentLocale }: HeaderProps) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">
                {title}
              </h1>
            </div>
  
            <Navigation currentLocale={currentLocale} />
          </div>
        </div>
      </header>
    );
  }