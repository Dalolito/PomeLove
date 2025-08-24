'use client';

import { Dictionary } from '@/lib/types/dictionary';

interface AboutUsExportsProps {
  dict: Dictionary;
  locale: string;
}

export default function AboutUsExportsComponent({
  dict,
  locale,
}: AboutUsExportsProps) {
  const exportProcess = [
    {
      step: '01',
      title: dict.about?.exports?.process?.[0] || 'Selección personalizada',
      description: 'Ayudamos a elegir el cachorro perfecto según tus preferencias y estilo de vida.',
      icon: '🎯',
    },
    {
      step: '02', 
      title: dict.about?.exports?.process?.[1] || 'Protocolos de bienestar',
      description: 'Cada exportación se realiza con el mayor cuidado y bajo estrictos protocolos de bienestar animal.',
      icon: '🏥',
    },
    {
      step: '03',
      title: dict.about?.exports?.process?.[2] || 'Viaje en cabina',
      description: 'Nuestros cachorros viajan cómodamente por cabina de avión, nunca en bodega.',
      icon: '✈️',
    },
    {
      step: '04',
      title: dict.about?.exports?.process?.[3] || 'Llegada sana y feliz',
      description: 'Aseguramos que nuestros cachorros lleguen sanos y felices a su nuevo hogar.',
      icon: '🏠',
    },
  ];

  const exportCountries = [
    { name: 'EE. UU.', flag: '🇺🇸' },
    { name: 'Ecuador', flag: '🇪🇨' },
    { name: 'México', flag: '🇲🇽' },
    { name: 'Portugal', flag: '🇵🇹' },
    { name: 'Chile', flag: '🇨🇱' },
    { name: 'Panamá', flag: '🇵🇦' },
    { name: 'Rep. Dominicana', flag: '🇩🇴' },
    { name: 'España', flag: '🇪🇸' },
    { name: 'Rusia', flag: '🇷🇺' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {dict.about?.exports?.title || 'Exportadores de Pomeranias'}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {dict.about?.exports?.subtitle || 'Además de ser criadores, somos también exportadores de Pomeranias. Hemos tenido el privilegio de exportar nuestros cachorros a más de 15 países alrededor del mundo.'}
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center mb-12 fade-in-up">
            {dict.about?.exports?.processTitle || 'Nuestro Proceso de Exportación'}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exportProcess.map((process, index) => (
              <div
                key={index}
                className="text-center group fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-all duration-300 border-2 border-white/30">
                    {process.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-16 fade-in-up">
          <h3 className="text-4xl font-bold mb-12">{dict.about?.exports?.countriesTitle || 'Países de Exportación'}</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {exportCountries.map((country, index) => (
              <div
                key={index}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 group fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {country.flag}
                </div>
                <h4 className="font-semibold text-sm">{country.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center fade-in-up">
          <div className="inline-block p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
            <h3 className="text-3xl font-bold mb-4">
              {dict.about?.exports?.cta?.title || 'En nuestro criadero, no solo te ofrecemos un cachorro, sino un compañero de vida 🐕'}
            </h3>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {dict.about?.exports?.cta?.description || 'Nuestra pasión por esta raza nos ha llevado a ofrecer solo lo mejor para nuestros cachorros, siempre garantizando estándares elevados en todos nuestros procesos.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
