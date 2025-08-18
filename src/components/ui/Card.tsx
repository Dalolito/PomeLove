interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined';
  }
  
  export default function Card({ children, className = '', variant = 'default' }: CardProps) {
    const variants = {
      default: 'bg-white border border-gray-100',
      elevated: 'bg-white shadow-lg border border-gray-100',
      outlined: 'bg-white border-2 border-gray-200'
    };
    
    return (
      <div className={`rounded-2xl overflow-hidden ${variants[variant]} ${className}`}>
        {children}
      </div>
    );
  }