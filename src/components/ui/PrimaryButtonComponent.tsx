import BaseButtonComponent from '@/components/ui/baseButtonComponent';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return <BaseButtonComponent {...props} variant="primary" />;
}
