import BaseButtonComponent from './BaseButtonComponent';

interface SecondaryButtonProps {
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

export default function SecondaryButton(props: SecondaryButtonProps) {
  return <BaseButtonComponent {...props} variant="outline" />;
}
