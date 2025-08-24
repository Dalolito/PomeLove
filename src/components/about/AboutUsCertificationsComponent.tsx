'use client';

import { Dictionary } from '@/lib/types/dictionary';

interface AboutUsCertificationsProps {
  dict: Dictionary;
  locale: string;
}

export default function AboutUsCertificationsComponent({
  dict,
  locale,
}: AboutUsCertificationsProps) {
  const certifications = [
    {
      name: 'FCI',
      fullName: 'Federación Cinológica Internacional',
      logo: '🏆',
      description: 'Registrados como criadores responsables ante la FCI',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'AKC',
      fullName: 'American Kennel Club',
      logo: '🥇',
      description: 'Registrados como criadores responsables ante el AKC',
      color: 'from-red-500 to-red-600',
    },
  ];

  const badges = [
    {
      icon: '✅',
      title: dict.about?.certifications?.badges?.[0] || '100% legítimos',
      description: 'Ofrecemos perros 100% legítimos y de calidad garantizada',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🚫',
      title: dict.about?.certifications?.badges?.[1] || 'No revendedores',
      description: 'A diferencia de otras páginas, nosotros no somos revendedores ni intermediarios',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: '🎯',
      title: dict.about?.certifications?.badges?.[2] || 'Criadores directos',
      description: 'Vendemos exclusivamente nuestros propios ejemplares, criados y seleccionados con la mayor dedicación y cuidado',
      color: 'from-blue-500 to-purple-500',
    },
    {
      icon: '👨‍⚕️',
      title: dict.about?.certifications?.badges?.[3] || 'Calidad garantizada',
      description: 'Siempre garantizando estándares elevados en todos nuestros procesos',
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-red-600"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {dict.about?.certifications?.title || 'Certificaciones Internacionales'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {dict.about?.certifications?.subtitle || 'Nos enorgullece estar registrados ante el FCI (Federación Cinológica Internacional) y el AKC (American Kennel Club) como criadores responsables, lo que nos permite ofrecer perros 100% legítimos y de calidad garantizada.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br ${cert.color} rounded-full text-6xl mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                {cert.logo}
              </div>
              <h3 className="text-4xl font-bold mb-2">{cert.name}</h3>
              <p className="text-lg text-gray-300 mb-4">{cert.fullName}</p>
              <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${badge.color} rounded-2xl text-2xl mb-4 shadow-lg`}>
                {badge.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{badge.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center fade-in-up">
          <div className="inline-block p-8 bg-gradient-to-r from-red-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl border border-white/20">
            <h3 className="text-3xl font-bold mb-4 text-yellow-400">
              ⭐ {dict.about?.certifications?.difference?.title || 'La Diferencia POMELOVE KOREA'} ⭐
            </h3>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {dict.about?.certifications?.difference?.description || 'A diferencia de otras páginas, nosotros NO SOMOS REVENDEDORES ni intermediarios. Vendemos exclusivamente nuestros propios ejemplares, criados y seleccionados con la mayor dedicación y cuidado.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
