'use client';

import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PuppyGrid from '@/components/puppy/PuppyGrid';
import { Puppy } from '@/components/puppy/PuppyCard';
import Container from '@/components/ui/Container';
import StatusIndicator from '@/components/ui/StatusIndicator';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`)
    return dict.default
  } catch {
    const dict = await import('@/dictionaries/es.json')
    return dict.default
  }
}

export default async function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale)

  // Sample puppy data
  const puppies: Puppy[] = [
    {
      id: 1,
      name: "Gracia",
      age: "2 meses",
      description: "Hermosa Pomerania hembra, muy juguetona y cariñosa. Lista para su nuevo hogar.",
      color: "Naranja",
      colorHex: "#f97316",
      imageUrl: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop",
      gradientFrom: "from-blue-100",
      gradientTo: "to-purple-100"
    },
    {
      id: 2,
      name: "Max",
      age: "1.5 meses",
      description: "Pomerania macho muy energético. Excelente linaje y temperamento dulce.",
      color: "Marrón",
      colorHex: "#d97706",
      imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
      gradientFrom: "from-pink-100",
      gradientTo: "to-red-100"
    },
    {
      id: 3,
      name: "Luna",
      age: "2.5 meses",
      description: "Pomerania hembra blanca, muy tranquila y perfecta para familias.",
      color: "Blanco",
      colorHex: "#d1d5db",
      imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop",
      gradientFrom: "from-gray-100",
      gradientTo: "to-blue-100"
    }
  ];

  const heroActions = [
    {
      text: dict.buttons.search_puppy,
      variant: 'primary' as const
    },
    {
      text: dict.buttons.about_us,
      variant: 'secondary' as const
    }
  ];

  const features = [
    {
      icon: "🏆",
      title: "15+ Años",
      description: "De experiencia criando Pomeranias"
    },
    {
      icon: "❤️",
      title: "Amor y Cuidado",
      description: "Cada cachorro criado con dedicación"
    },
    {
      icon: "🩺",
      title: "Salud Garantizada",
      description: "Controles veterinarios completos"
    }
  ];

  const handleViewDetails = (puppy: Puppy) => {
    console.log('Ver detalles de:', puppy.name);
  };

  const centerContent = (
    <div className="relative w-48 h-48 mx-auto mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 rounded-full"></div>
      <div className="relative z-10 w-full h-full rounded-full bg-white shadow-lg flex items-center justify-center text-6xl">
        🐕
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full opacity-80"></div>
      <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-orange-400 rounded-full opacity-60"></div>
    </div>
  );

  return (
    <div>
      
      <HeroSection
        title={dict.header.subtitle}
        subtitle={dict.header.experience}
        actions={heroActions}
        centerContent={centerContent}
        containerSize="md"
      />

      <section className="px-4 py-12 bg-white">
        <Container size="sm">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            {dict.home.available_now}
          </h2>

          <PuppyGrid
            puppies={puppies}
            buttonText="Ver detalles"
            onViewDetails={handleViewDetails}
            columns={1}
            containerSize="sm"
          />

          <div className="text-center mt-8">
            <button className="text-red-500 hover:text-red-600 font-semibold px-6 py-3 border-2 border-red-500 hover:border-red-600 rounded-xl transition-colors">
              Ver todos los cachorros
            </button>
          </div>
        </Container>
      </section>

      <FeaturesSection features={features} />

      <StatusIndicator 
        message={`✅ i18n funcionando - Idioma: ${params.locale.toUpperCase()}`}
        variant="success"
      />
    </div>
  );
}