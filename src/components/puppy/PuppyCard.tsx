'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export interface Puppy {
  id: number;
  name: string;
  age: string;
  description: string;
  color: string;
  colorHex: string;
  imageUrl: string;
  gradientFrom?: string;
  gradientTo?: string;
}

interface PuppyCardProps {
  puppy: Puppy;
  buttonText: string;
  onViewDetails?: (puppy: Puppy) => void;
  showAge?: boolean;
  showDescription?: boolean;
  imageHeight?: string;
}

export default function PuppyCard({ 
  puppy, 
  buttonText,
  onViewDetails,
  showAge = true,
  showDescription = true,
  imageHeight = 'aspect-square'
}: PuppyCardProps) {
  const gradientClasses = puppy.gradientFrom && puppy.gradientTo 
    ? `bg-gradient-to-br ${puppy.gradientFrom} ${puppy.gradientTo}`
    : 'bg-gray-100';

  return (
    <Card variant="elevated">
      <div className={`${imageHeight} ${gradientClasses} flex items-center justify-center relative`}>
        <img 
          src={puppy.imageUrl}
          alt={`${puppy.name} - Pomerania cachorro`}
          className="w-full h-full object-cover"
        />
        {showAge && (
          <div className="absolute top-3 right-3">
            <Badge variant="age">
              {puppy.age}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{puppy.name}</h3>
        {showDescription && (
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">
            {puppy.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: puppy.colorHex }}
            ></span>
            <Badge variant="color">{puppy.color}</Badge>
          </div>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onViewDetails?.(puppy)}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Card>
  );
}