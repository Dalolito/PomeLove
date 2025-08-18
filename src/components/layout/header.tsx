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
  
            <div className="flex items-center gap-3">
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button 
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentLocale === 'es' 
                      ? 'bg-white text-slate-700 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  ES
                </button>
                <button 
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
          </div>
        </div>
      </header>
    );
  }