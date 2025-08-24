'use client';

import { Dictionary } from '@/lib/types/dictionary';
import { aboutMedia } from '@/lib/data/aboutMedia';
import AboutUsMediaCarouselComponent from './AboutUsMediaCarouselComponent';

interface AboutUsBreedingProps {
  dict: Dictionary;
  locale: string;
}

export default function AboutUsBreedingComponent({
  dict,
  locale,
}: AboutUsBreedingProps) {
  const features = [
    {
      icon: '🏠',
      title: dict.about?.breeding?.features?.[0] || 'Espacio amplio y seguro',
      description: 'Nuestro criadero está ubicado en un espacio amplio y seguro, diseñado para el bienestar de nuestros cachorros.',
    },
    {
      icon: '👥',
      title: dict.about?.breeding?.features?.[1] || 'Entorno familiar', 
      description: 'Nuestros cachorros son criados en un entorno familiar, lleno de juguetes, estructuras y actividades.',
    },
    {
      icon: '🎾',
      title: dict.about?.breeding?.features?.[2] || 'Desarrollo físico y emocional',
      description: 'Cada cachorro tiene la oportunidad de interactuar sin jaulas, tanto con otras personas como con otros cachorros.',
    },
    {
      icon: '💝',
      title: dict.about?.breeding?.features?.[3] || 'Socialización temprana',
      description: 'Fomentamos una socialización temprana que asegura que cada Pomerania sea el compañero ideal para su nueva familia.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {dict.about?.breeding?.title || 'Crianza en Entorno Familiar'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {dict.about?.breeding?.subtitle || 'En nuestro criadero, ubicado en un espacio amplio y seguro, nuestros cachorros son criados en un entorno familiar, lleno de juguetes, estructuras y actividades que favorecen su desarrollo físico y emocional.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="text-xl">🎥</span>
                <span>Tour Virtual Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
