'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function BaseButtonComponent({
  children,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const router = useRouter();

  // Color variants configuration
  const variants = {
    primary: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white shadow-sm',
    outline: 'border-2 border-red-500 text-red-500 hover:bg-red-50 bg-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-sm',
  };

  // Size configurations
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  // State-based classes
  const disabledClasses =
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const widthClasses = fullWidth ? 'w-full' : '';

  // Handle click - navigate if href provided, otherwise call onClick
  const handleClick = () => {
    if (disabled || loading) return;

    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={` ${variants[variant]} ${sizes[size]} ${disabledClasses} ${widthClasses} focus:ring-opacity-50 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:outline-none active:scale-95 active:transform ${className} `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
