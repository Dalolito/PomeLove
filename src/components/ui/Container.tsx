'use client';

interface ContainerProps {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
  }
  
  export default function Container({ children, size = 'lg', className = '' }: ContainerProps) {
    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-2xl', 
      lg: 'max-w-4xl',
      xl: 'max-w-7xl'
    };
    
    return (
      <div className={`container mx-auto px-4 ${sizes[size]} ${className}`}>
        {children}
      </div>
    );
  }