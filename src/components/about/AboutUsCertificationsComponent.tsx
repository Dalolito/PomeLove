'use client';

import { Dictionary } from '@/lib/types/dictionary';

interface AboutUsCertificationsProps {
  dict: Dictionary;
}

export default function AboutUsCertificationsComponent({
  dict,
}: AboutUsCertificationsProps) {
  const certifications = [
    {
      name: 'FCI',
      fullName: 'Federación Cinológica Internacional',
      logo: (
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      description: 'Registrados como criadores responsables ante la FCI',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'AKC',
      fullName: 'American Kennel Club',
      logo: (
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      description: 'Registrados como criadores responsables ante el AKC',
      color: 'from-red-500 to-red-600',
    },
  ];

  const badges = [
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: dict.about?.certifications?.badges?.[0] || '100% legítimos',
      description: 'Ofrecemos perros 100% legítimos y de calidad garantizada',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: dict.about?.certifications?.badges?.[1] || 'No revendedores',
      description:
        'A diferencia de otras páginas, nosotros no somos revendedores ni intermediarios',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: dict.about?.certifications?.badges?.[2] || 'Criadores directos',
      description:
        'Vendemos exclusivamente nuestros propios ejemplares, criados y seleccionados con la mayor dedicación y cuidado',
      color: 'from-blue-500 to-purple-500',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: dict.about?.certifications?.badges?.[3] || 'Calidad garantizada',
      description:
        'Siempre garantizando estándares elevados en todos nuestros procesos',
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-900 py-20 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-red-600"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="fade-in-up mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            {dict.about?.certifications?.title ||
              'Certificaciones Internacionales'}
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            {dict.about?.certifications?.subtitle ||
              'Nos enorgullece estar registrados ante el FCI (Federación Cinológica Internacional) y el AKC (American Kennel Club) como criadores responsables, lo que nos permite ofrecer perros 100% legítimos y de calidad garantizada.'}
          </p>
        </div>

        <div className="mb-16 grid gap-12 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group text-center"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`inline-flex h-32 w-32 items-center justify-center bg-gradient-to-br ${cert.color} mb-6 rounded-full text-6xl shadow-2xl transition-all duration-300 group-hover:scale-110`}
              >
                {cert.logo}
              </div>
              <h3 className="mb-2 text-4xl font-bold">{cert.name}</h3>
              <p className="mb-4 text-lg text-gray-300">{cert.fullName}</p>
              <p className="mx-auto max-w-sm leading-relaxed text-gray-400">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`inline-flex h-16 w-16 items-center justify-center bg-gradient-to-br ${badge.color} mb-4 rounded-2xl text-2xl shadow-lg`}
              >
                {badge.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{badge.title}</h3>
              <p className="text-sm leading-relaxed text-gray-300">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        <div className="fade-in-up mt-16 text-center">
          <div className="inline-block rounded-3xl border border-white/20 bg-gradient-to-r from-red-500/20 to-purple-500/20 p-8 backdrop-blur-sm">
            <h3 className="mb-4 text-3xl font-bold text-yellow-400">
              <svg
                className="inline h-8 w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>{' '}
              {dict.about?.certifications?.difference?.title ||
                'La Diferencia POMELOVE KOREA'}{' '}
              <svg
                className="inline h-8 w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </h3>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-200">
              {dict.about?.certifications?.difference?.description ||
                'A diferencia de otras páginas, nosotros NO SOMOS REVENDEDORES ni intermediarios. Vendemos exclusivamente nuestros propios ejemplares, criados y seleccionados con la mayor dedicación y cuidado.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
