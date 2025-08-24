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
      title: dict.about?.experience?.timeline?.['2014'] || 'Inicio como criadores especializados',
      description: 'Comenzamos nuestra pasión por los Pomeranias con dedicación y amor.',
      icon: '🌱',
    },
    {
      year: '2019', 
      title: dict.about?.experience?.timeline?.['2019'] || 'Primera importación de líneas coreanas',
      description: 'Nos enfocamos en la importación de líneas exclusivas de calidad, especialmente Pomeranias Coreanos.',
      icon: '🇰🇷',
    },
    {
      year: '2021',
      title: dict.about?.experience?.timeline?.['2021'] || 'Certificación FCI y AKC',
      description: 'Nos registramos ante el FCI y AKC como criadores responsables.',
      icon: '🏆',
    },
    {
      year: '2024',
      title: dict.about?.experience?.timeline?.['2024'] || 'Más de 15 países de exportación',
      description: 'Hemos exportado a EE. UU., Ecuador, México, Portugal, Chile, Panamá, República Dominicana, España, Rusia, entre otros.',
      icon: '🌍',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {dict.about?.experience?.title || 'Más de 10 Años de Experiencia'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {dict.about?.experience?.subtitle || 'Con más de 10 años de experiencia en la crianza de Pomeranias, nos hemos consolidado como criadores especializados, y desde hace 5 años, nos hemos enfocado en la importación de líneas exclusivas de calidad, especialmente Pomeranias Coreanos.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-purple-600"></div>
              
              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-start mb-12 last:mb-0"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-4 border-red-500 rounded-full shadow-lg">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  
                  <div className="ml-6 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
