
async function getDictionary() {
    const dict = await import('@/dictionaries/es.json')
    return dict.default
  }
  
  export default async function HomePage() {
    const dict = await getDictionary()
  
    return (
      <div className="container mx-auto px-4 py-8">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {dict.header.subtitle}
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {dict.header.experience}
          </p>
  
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-colors">
              {dict.buttons.search_puppy}
            </button>
            <button className="bg-white hover:bg-gray-50 text-slate-700 font-medium px-8 py-3 rounded-lg border border-gray-200 transition-colors">
              {dict.buttons.about_us}
            </button>
          </div>
        </section>
  
        <section>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            {dict.home.available_now}
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">🐕 Foto del perro {i}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pomerania {i}</h3>
                <p className="text-gray-600 mb-4">Descripción del cachorro...</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </section>
  
        <div className="mt-8 p-4 bg-green-50 rounded-lg text-center">
          <p className="text-green-800 font-medium">
            ✅ i18n funcionando
          </p>
        </div>
      </div>
    )
  }