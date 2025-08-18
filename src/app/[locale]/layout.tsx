async function getDictionary() {
  const dict = await import('@/dictionaries/es.json')
  return dict.default
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dict = await getDictionary()

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">
                {dict.header.title}
              </h1>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              
              {/* Language Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button className="bg-white text-slate-700 px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                  ES
                </button>
                <button className="text-slate-500 px-3 py-1 rounded-md text-sm font-medium hover:text-slate-700 transition-colors">
                  EN
                </button>
              </div>
              
              {/* Menu Button */}
              <button className="flex flex-col gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-5 h-0.5 bg-slate-600 rounded-full"></div>
                <div className="w-5 h-0.5 bg-slate-600 rounded-full"></div>
                <div className="w-5 h-0.5 bg-slate-600 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}