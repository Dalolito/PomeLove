'use client';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'age' | 'color';
    className?: string;
  }
  
  export default function Badge({ children, variant = 'age', className = '' }: BadgeProps) {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-semibold';
    
    const variants = {
      age: 'bg-white/90 backdrop-blur-sm text-slate-700',
      color: 'text-slate-600'
    };
    
    return (
      <span className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  }