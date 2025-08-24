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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-40"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/media/sended-dog-8.mp4" type="video/mp4" />
        </video>
        {!videoLoaded && (
          <PuppyImageComponent
            src="/media/sended-dog-1.jpeg"
            alt="Hero background"
            className="h-full w-full object-cover opacity-40"
            priority={true}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            {dict.about?.hero?.title || 'Más de 10 Años de Experiencia'}
          </h1>

          <p className="mb-8 text-xl leading-relaxed opacity-90 md:text-2xl">
            {dict.about?.hero?.subtitle ||
              'Con más de 10 años de experiencia en la crianza de Pomeranias, nos hemos consolidado como criadores especializados, y desde hace 5 años, nos hemos enfocado en la importación de líneas exclusivas de calidad, especialmente Pomeranias Coreanos.'}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <PrimaryButtonComponent
              href={`/${locale}/catalog`}
              size="xl"
              className="transform bg-gradient-to-r from-red-500 to-orange-500 shadow-lg transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-orange-600"
            >
              🐕 {dict.about?.hero?.cta || 'Conoce nuestros cachorros'}
            </PrimaryButtonComponent>
          </div>
        </div>
      </div>
    </section>
  );
}
