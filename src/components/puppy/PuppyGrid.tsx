import PuppyCard, { Puppy } from './PuppyCard';
import Container from '@/components/ui/Container';

interface PuppyGridProps {
  puppies: Puppy[];
  buttonText: string;
  onViewDetails?: (puppy: Puppy) => void;
  columns?: 1 | 2 | 3 | 4;
  showAge?: boolean;
  showDescription?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function PuppyGrid({ 
  puppies, 
  buttonText,
  onViewDetails,
  columns = 1,
  showAge = true,
  showDescription = true,
  containerSize = 'sm'
}: PuppyGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const gapClasses = columns === 1 ? 'space-y-6' : 'grid gap-6';

  return (
    <Container size={containerSize}>
      <div className={`${columns === 1 ? gapClasses : `grid ${gridClasses[columns]} ${gapClasses}`}`}>
        {puppies.map((puppy) => (
          <PuppyCard
            key={puppy.id}
            puppy={puppy}
            buttonText={buttonText}
            onViewDetails={onViewDetails}
            showAge={showAge}
            showDescription={showDescription}
          />
        ))}
      </div>
    </Container>
  );
}