'use client';

import { Dictionary } from '@/lib/types/dictionary';
import AboutUsMediaCarouselComponent from './AboutUsMediaCarouselComponent';
import CountUpComponent from '@/components/ui/CountUpComponent';
import { aboutMedia } from '@/lib/data/aboutMedia';

interface AboutUsHappyClientsProps {
  dict: Dictionary;
  locale: string;
}

export default function AboutUsHappyClientsComponent({
  dict,
  locale,
}: AboutUsHappyClientsProps) {
  const clientsStats = [
    {
      number: 100,
      suffix: '+',
      label: dict.about?.happyClients?.stats?.puppies || 'Cachorros vendidos',
      icon: '🐕',
    },
    {
      number: 15,
      suffix: '+',
      label:
        dict.about?.happyClients?.stats?.countries || 'Países de exportación',
      icon: '🌍',
    },
    {
      number: 10,
      suffix: '+',
      label: dict.about?.happyClients?.stats?.years || 'Años de experiencia',
      icon: '⭐',
    },
    {
      number: 5,
      suffix: '+',
      label:
        dict.about?.happyClients?.stats?.korean ||
        'Años importando líneas coreanas',
      icon: '🇰🇷',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-20 top-20 h-32 w-32 animate-pulse rounded-full bg-red-500 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 h-40 w-40 animate-pulse rounded-full bg-blue-500 blur-3xl delay-1000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="fade-in-up mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-5xl font-bold text-gray-900 text-transparent md:text-6xl">
            {dict.about?.happyClients?.title || 'Más de 100 Cachorros Vendidos'}
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl">
            {dict.about?.happyClients?.subtitle ||
              'Hemos tenido el privilegio de exportar nuestros cachorros a más de 15 países alrededor del mundo'}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {clientsStats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/80 p-6 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-3 text-4xl">{stat.icon}</div>
              <CountUpComponent
                end={stat.number}
                suffix={stat.suffix}
                className="mb-2 text-3xl font-bold text-red-500 md:text-4xl"
              />
              <p className="font-medium text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mb-12 max-w-4xl">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {dict.about?.happyClients?.carouselTitle ||
                'Clientes felices con sus cachorros'}
            </h3>
          </div>
          <AboutUsMediaCarouselComponent
            media={aboutMedia.clients}
            variant="clients"
            showCaptions={false}
            className="mb-6"
          />
        </div>

        <div className="mt-12 text-center">
          <h3 className="mb-8 text-3xl font-bold text-gray-900">
            {dict.about?.happyClients?.countriesTitle ||
              'Algunos países de exportación'}{' '}
            🌎
          </h3>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {[
              '🇺🇸 EE. UU.',
              '🇪🇨 Ecuador',
              '🇲🇽 México',
              '🇵🇹 Portugal',
              '🇨🇱 Chile',
              '🇵🇦 Panamá',
              '🇩🇴 República Dominicana',
              '🇪🇸 España',
              '🇷🇺 Rusia',
            ].map((country, index) => (
              <span
                key={index}
                className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
