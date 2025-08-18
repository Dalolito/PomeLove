async function getDictionary() {
  const dict = await import('@/dictionaries/es.json')
  return dict.default
}

export default async function LocalePage() {
  const dict = await getDictionary()

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-4 py-12">
        <div className="container mx-auto text-center">
          
          {/* Hero Content */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              {dict.header.subtitle}
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              {dict.header.experience}
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-8">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 rounded-full"></div>
              <div className="relative z-10 w-full h-full rounded-full bg-white shadow-lg flex items-center justify-center text-6xl">
                🐕
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-orange-400 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 max-w-sm mx-auto mb-8">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {dict.buttons.search_puppy}
            </button>
            <button className="bg-white hover:bg-gray-50 text-slate-700 font-medium px-8 py-4 rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-gray-300">
              {dict.buttons.about_us}
            </button>
          </div>
        </div>
      </section>

      {/* Available Puppies Section */}
      <section className="px-4 py-12 bg-white">
        <div className="container mx-auto">
          
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            {dict.home.available_now}
          </h2>

          {/* Puppies Grid */}
          <div className="space-y-6 max-w-md mx-auto">
            
            {/* Puppy Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop" 
                  alt="Pomerania cachorro"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-slate-700">2 meses</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Gracia</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Hermosa Pomerania hembra, muy juguetona y cariñosa. Lista para su nuevo hogar.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
                    <span className="text-sm text-slate-600">Naranja</span>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Puppy Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop" 
                  alt="Pomerania cachorro"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-slate-700">1.5 meses</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Max</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Pomerania macho muy energético. Excelente linaje y temperamento dulce.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber-600 rounded-full"></span>
                    <span className="text-sm text-slate-600">Marrón</span>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Puppy Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop" 
                  alt="Pomerania cachorro"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-slate-700">2.5 meses</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Luna</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Pomerania hembra blanca, muy tranquila y perfecta para familias.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                    <span className="text-sm text-slate-600">Blanco</span>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button className="text-red-500 hover:text-red-600 font-semibold px-6 py-3 border-2 border-red-500 hover:border-red-600 rounded-xl transition-colors">
              Ver todos los cachorros
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <div className="grid grid-cols-1 gap-6">
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold text-slate-800 mb-2">15+ Años</h3>
              <p className="text-sm text-slate-600">De experiencia criando Pomeranias</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="font-semibold text-slate-800 mb-2">Amor y Cuidado</h3>
              <p className="text-sm text-slate-600">Cada cachorro criado con dedicación</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🩺</div>
              <h3 className="font-semibold text-slate-800 mb-2">Salud Garantizada</h3>
              <p className="text-sm text-slate-600">Controles veterinarios completos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <div className="px-4 py-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium text-sm">
              ✅ i18n funcionando perfectamente
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}