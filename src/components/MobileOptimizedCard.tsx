import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { cn } from '../utils/cn';

interface MobileOptimizedCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  touchable?: boolean;
  compact?: boolean;
}

export const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  title,
  children,
  className,
  onClick,
  touchable = false,
  compact = false
}) => {
  const baseClasses = "transition-all duration-200";
  const touchableClasses = touchable 
    ? "active:scale-95 hover:shadow-lg cursor-pointer touch-manipulation" 
    : "";
  const compactClasses = compact ? "p-3" : "p-4";

  return (
    <Card 
      className={cn(
        baseClasses,
        touchableClasses,
        compactClasses,
        className
      )}
      onClick={onClick}
    >
      <CardHeader className={cn("pb-2", compact && "pb-1")}>
        <CardTitle className={cn(
          "text-lg font-semibold",
          compact && "text-base"
        )}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("pt-0", compact && "pt-1")}>
        {children}
      </CardContent>
    </Card>
  );
};

interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm rounded-md min-h-[44px]",
    md: "px-4 py-3 text-base rounded-lg min-h-[48px]",
    lg: "px-6 py-4 text-lg rounded-lg min-h-[52px]"
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClasses,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface MobileInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const MobileInput: React.FC<MobileInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-3 text-base border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          "touch-manipulation",
          error && "border-red-500 focus:ring-red-500"
        )}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface MobileGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MobileGrid: React.FC<MobileGridProps> = ({
  children,
  cols = 2,
  gap = 'md',
  className
}) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6"
  };

  return (
    <div className={cn(
      "grid",
      gridClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

interface MobileStackProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'column';
  className?: string;
}

export const MobileStack: React.FC<MobileStackProps> = ({
  children,
  spacing = 'md',
  direction = 'column',
  className
}) => {
  const spacingClasses = {
    sm: "space-y-1 sm:space-y-0 sm:space-x-1",
    md: "space-y-2 sm:space-y-0 sm:space-x-2",
    lg: "space-y-4 sm:space-y-0 sm:space-x-4"
  };

  const directionClasses = {
    row: "flex-col sm:flex-row",
    column: "flex-col"
  };

  return (
    <div className={cn(
      "flex",
      directionClasses[direction],
      spacingClasses[spacing],
      className
    )}>
      {children}
    </div>
  );
};
