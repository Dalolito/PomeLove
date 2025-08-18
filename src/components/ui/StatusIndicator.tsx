'use client';

import Container from '@/components/ui/Container';

interface StatusIndicatorProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function StatusIndicator({ 
  message, 
  variant = 'success',
  containerSize = 'sm'
}: StatusIndicatorProps) {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className="px-4 py-4">
      <Container size={containerSize}>
        <div className={`border rounded-lg p-4 text-center ${variants[variant]}`}>
          <p className="font-medium text-sm">
            {message}
          </p>
        </div>
      </Container>
    </div>
  );
}
