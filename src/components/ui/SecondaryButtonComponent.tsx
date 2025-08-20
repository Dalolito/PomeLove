'use client';

import Button from './baseButtonComponent';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function SecondaryButton(props: SecondaryButtonProps) {
  return <Button {...props} variant="outline" />;
}