import Link from 'next/link';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  onClick,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-deep-teal text-white hover:bg-slate-navy focus:ring-deep-teal',
    secondary: 'bg-industrial-amber text-white hover:bg-orange-600 focus:ring-industrial-amber',
    outline: 'border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white focus:ring-deep-teal',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
