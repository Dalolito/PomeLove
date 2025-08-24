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
      label: dict.about?.happyClients?.stats?.countries || 'Países de exportación',
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
      label: dict.about?.happyClients?.stats?.korean || 'Años importando líneas coreanas',
      icon: '🇰🇷',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            {dict.about?.happyClients?.title || 'Más de 100 Cachorros Vendidos'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {dict.about?.happyClients?.subtitle || 'Hemos tenido el privilegio de exportar nuestros cachorros a más de 15 países alrededor del mundo'}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {clientsStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <CountUpComponent
                end={stat.number}
                suffix={stat.suffix}
                className="text-3xl md:text-4xl font-bold text-red-500 mb-2"
              />
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.about?.happyClients?.carouselTitle || 'Clientes felices con sus cachorros'}
            </h3>
          </div>
          <AboutUsMediaCarouselComponent 
            media={aboutMedia.clients}
            variant="clients"
            showCaptions={false}
            className="mb-6"
          />
        </div>

        <div className="text-center mt-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            {dict.about?.happyClients?.countriesTitle || 'Algunos países de exportación'} 🌎
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              '🇺🇸 EE. UU.', '🇪🇨 Ecuador', '🇲🇽 México', '🇵🇹 Portugal',
              '🇨🇱 Chile', '🇵🇦 Panamá', '🇩🇴 República Dominicana', '🇪🇸 España',
              '🇷🇺 Rusia'
            ].map((country, index) => (
              <span
                key={index}
                className="inline-block px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
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
