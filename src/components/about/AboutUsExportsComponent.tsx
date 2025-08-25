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
      title: dict.about?.exports?.process?.[0],
      description:
        'Ayudamos a elegir el cachorro perfecto según tus preferencias y estilo de vida.',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      step: '02',
      title: dict.about?.exports?.process?.[1],
      description:
        'Cada exportación se realiza con el mayor cuidado y bajo estrictos protocolos de bienestar animal.',
      icon: '🏥',
    },
    {
      step: '03',
      title: dict.about?.exports?.process?.[2],
      description:
        'Nuestros cachorros viajan cómodamente por cabina de avión, nunca en bodega.',
      icon: '✈️',
    },
    {
      step: '04',
      title: dict.about?.exports?.process?.[3],
      description:
        'Aseguramos que nuestros cachorros lleguen sanos y felices a su nuevo hogar.',
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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 py-20 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-80 w-80 animate-pulse rounded-full bg-yellow-400 blur-3xl delay-1000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="fade-in-up mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold md:text-6xl">
            {dict.about?.exports?.title}
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-blue-100 md:text-2xl">
            {dict.about?.exports?.subtitle}
          </p>
        </div>

        <div className="mb-20">
          <h3 className="fade-in-up mb-12 text-center text-4xl font-bold">
            {dict.about?.exports?.processTitle}
          </h3>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {exportProcess.map((process, index) => (
              <div
                key={index}
                className="fade-in-up group text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-6">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-4xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                    {process.icon}
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black">
                    {process.step}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold">{process.title}</h3>
                <p className="text-sm leading-relaxed text-blue-100">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-in-up mb-16 text-center">
          <h3 className="mb-12 text-4xl font-bold">
            {dict.about?.exports?.countriesTitle}
          </h3>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {exportCountries.map((country, index) => (
              <div
                key={index}
                className="fade-in-up group rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-2 text-3xl transition-transform duration-300 group-hover:scale-125">
                  {country.flag}
                </div>
                <h4 className="text-sm font-semibold">{country.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-in-up text-center">
          <div className="inline-block rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
            <h3 className="mb-4 text-3xl font-bold">
              {dict.about?.exports?.cta?.title}
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-blue-100">
              {dict.about?.exports?.cta?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
