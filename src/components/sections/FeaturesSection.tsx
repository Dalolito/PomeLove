'use client';

import Container from '@/components/ui/Container';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  backgroundClass?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  columns?: 1 | 2 | 3 | 4;
}

export default function FeaturesSection({ 
  features, 
  backgroundClass = 'bg-gray-50',
  containerSize = 'sm',
  columns = 1
}: FeaturesSectionProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <section className={`px-4 py-12 ${backgroundClass}`}>
      <Container size={containerSize}>
        <div className={`grid ${gridClasses[columns]} gap-6`}>
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
