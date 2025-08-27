'use client';

import { Dictionary } from '@/lib/types/dictionary';
import { aboutMedia } from '@/lib/data/aboutMedia';
import AboutUsMediaCarouselComponent from './AboutUsMediaCarouselComponent';

interface AboutUsBreedingProps {
  dict: Dictionary;
}

export default function AboutUsBreedingComponent({
  dict,
}: AboutUsBreedingProps) {
  const features = [
    {
      icon: '🏠',
      title: dict.about?.breeding?.features?.[0] || 'Espacio amplio y seguro',
      description:
        'Nuestro criadero está ubicado en un espacio amplio y seguro, diseñado para el bienestar de nuestros cachorros.',
    },
    {
      icon: '👥',
      title: dict.about?.breeding?.features?.[1] || 'Entorno familiar',
      description:
        'Nuestros cachorros son criados en un entorno familiar, lleno de juguetes, estructuras y actividades.',
    },
    {
      icon: '🎾',
      title:
        dict.about?.breeding?.features?.[2] || 'Desarrollo físico y emocional',
      description:
        'Cada cachorro tiene la oportunidad de interactuar sin jaulas, tanto con otras personas como con otros cachorros.',
    },
    {
      icon: '💝',
      title: dict.about?.breeding?.features?.[3] || 'Socialización temprana',
      description:
        'Fomentamos una socialización temprana que asegura que cada Pomerania sea el compañero ideal para su nueva familia.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
      <div className="absolute left-10 top-20 h-64 w-64 animate-pulse rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 h-80 w-80 animate-pulse rounded-full bg-pink-200 opacity-20 blur-3xl delay-1000"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="fade-in-up mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-gray-900 text-transparent md:text-6xl">
            {dict.about?.breeding?.title || 'Crianza en Entorno Familiar'}
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl">
            {dict.about?.breeding?.subtitle ||
              'En nuestro criadero, ubicado en un espacio amplio y seguro, nuestros cachorros son criados en un entorno familiar, lleno de juguetes, estructuras y actividades que favorecen su desarrollo físico y emocional.'}
          </p>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-6 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-2xl shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <AboutUsMediaCarouselComponent
              media={aboutMedia.facilities}
              variant="facilities"
              showCaptions={false}
              autoPlay={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
