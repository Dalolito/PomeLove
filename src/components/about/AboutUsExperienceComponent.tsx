'use client';

import { Dictionary } from '@/lib/types/dictionary';
import { aboutMedia } from '@/lib/data/aboutMedia';
import AboutUsMediaCarouselComponent from './AboutUsMediaCarouselComponent';

interface AboutUsExperienceProps {
  dict: Dictionary;
  locale: string;
}

export default function AboutUsExperienceComponent({
  dict,
  locale,
}: AboutUsExperienceProps) {
  const timelineItems = [
    {
      year: '2014',
      title:
        dict.about?.experience?.timeline?.['2014'] ||
        'Inicio como criadores especializados',
      description:
        'Comenzamos nuestra pasión por los Pomeranias con dedicación y amor.',
      icon: '🌱',
    },
    {
      year: '2019',
      title:
        dict.about?.experience?.timeline?.['2019'] ||
        'Primera importación de líneas coreanas',
      description:
        'Nos enfocamos en la importación de líneas exclusivas de calidad, especialmente Pomeranias Coreanos.',
      icon: '🇰🇷',
    },
    {
      year: '2021',
      title:
        dict.about?.experience?.timeline?.['2021'] || 'Certificación FCI y AKC',
      description:
        'Nos registramos ante el FCI y AKC como criadores responsables.',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      year: '2024',
      title:
        dict.about?.experience?.timeline?.['2024'] ||
        'Más de 15 países de exportación',
      description:
        'Hemos exportado a EE. UU., Ecuador, México, Portugal, Chile, Panamá, República Dominicana, España, Rusia, entre otros.',
      icon: '🌍',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-50"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="fade-in-up mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
            {dict.about?.experience?.title || 'Más de 10 Años de Experiencia'}
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl">
            {dict.about?.experience?.subtitle ||
              'Con más de 10 años de experiencia en la crianza de Pomeranias, nos hemos consolidado como criadores especializados, y desde hace 5 años, nos hemos enfocado en la importación de líneas exclusivas de calidad, especialmente Pomeranias Coreanos.'}
          </p>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="relative">
              <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-gradient-to-b from-red-500 to-purple-600"></div>

              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  className="relative mb-12 flex items-start last:mb-0"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-red-500 bg-white shadow-lg">
                    <span className="text-xl">{item.icon}</span>
                  </div>

                  <div className="ml-6 flex-1 rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <AboutUsMediaCarouselComponent
              media={aboutMedia.breeding}
              variant="puppies"
              showCaptions={false}
              autoPlay={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
