'use client';

import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';
import SecondaryButtonComponent from '@/components/ui/SecondaryButtonComponent';

interface FormActionButtonsProps {
  primaryText: string;
  secondaryText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryLoading?: boolean;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  primaryType?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
  className?: string;
}

export default function FormActionButtons({
  primaryText,
  secondaryText,
  onPrimaryClick,
  onSecondaryClick,
  primaryLoading = false,
  primaryDisabled = false,
  secondaryDisabled = false,
  primaryType = 'button',
  size = 'lg',
  layout = 'horizontal',
  fullWidth = true,
  className = ''
}: FormActionButtonsProps) {
  
  // Layout-based container classes
  const containerClasses = layout === 'horizontal' 
    ? 'flex gap-4 justify-end' 
    : 'flex flex-col gap-3';

  return (
    <div className={`${containerClasses} ${className}`}>
      <SecondaryButtonComponent
        onClick={onSecondaryClick}
        size={size}
        disabled={secondaryDisabled}
        fullWidth={layout === 'vertical' ? fullWidth : false}
      >
        {secondaryText}
      </SecondaryButtonComponent>
      
      <PrimaryButtonComponent
        type={primaryType}
        onClick={onPrimaryClick}
        size={size}
        loading={primaryLoading}
        disabled={primaryDisabled}
        fullWidth={layout === 'vertical' ? fullWidth : false}
      >
        {primaryText}
      </PrimaryButtonComponent>
    </div>
  );
}