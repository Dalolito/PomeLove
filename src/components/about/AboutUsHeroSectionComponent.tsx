'use client';

import { useState } from 'react';
import { Dictionary } from '@/lib/types/dictionary';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';
import PuppyImageComponent from '@/components/ui/PuppyImageComponent';

interface AboutUsHeroProps {
  dict: Dictionary;
  locale: string;
}

export default function AboutUsHeroSectionComponent({
  dict,
  locale,
}: AboutUsHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/media/sended-dog-8.mp4" type="video/mp4" />
        </video>
        {!videoLoaded && (
          <PuppyImageComponent
            src="/media/sended-dog-1.jpeg"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
            priority={true}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {dict.about?.hero?.title || 'Más de 10 Años de Experiencia'}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            {dict.about?.hero?.subtitle || 'Con más de 10 años de experiencia en la crianza de Pomeranias, nos hemos consolidado como criadores especializados, y desde hace 5 años, nos hemos enfocado en la importación de líneas exclusivas de calidad, especialmente Pomeranias Coreanos.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButtonComponent
              href={`/${locale}/catalog`}
              size="xl"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🐕 {dict.about?.hero?.cta || 'Conoce nuestros cachorros'}
            </PrimaryButtonComponent>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
