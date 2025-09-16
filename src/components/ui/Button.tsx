import React from 'react';

// @lovable:button-component

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none -webkit-tap-highlight-color: transparent';

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'text-gray-700 hover:bg-gray-100 bg-white',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg',
    icon: 'h-10 w-10'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

// Export buttonVariants for compatibility with other UI components
export const buttonVariants = (variant: string = 'default', size: string = 'md') => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none -webkit-tap-highlight-color: transparent';

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'text-gray-700 hover:bg-gray-100 bg-white',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg',
    icon: 'h-10 w-10'
  };

  return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]}`;
};

export default Button;