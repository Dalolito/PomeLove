'use client';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

interface HeroAction {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundClass?: string;
  actions?: HeroAction[];
  centerContent?: React.ReactNode;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function HeroSection({ 
  title, 
  subtitle,
  backgroundClass = 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50',
  actions = [],
  centerContent,
  containerSize = 'md'
}: HeroSectionProps) {
  return (
    <section className={`px-4 py-12 ${backgroundClass}`}>
      <Container size={containerSize} className="text-center">
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {centerContent && (
          <div className="mb-8">
            {centerContent}
          </div>
        )}

        {actions.length > 0 && (
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {actions.map((action, index) => (
              <Button 
                key={index}
                variant={action.variant || 'primary'} 
                size="lg"
                onClick={action.onClick}
                className={action.variant === 'primary' ? 'font-semibold' : ''}
              >
                {action.text}
              </Button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}