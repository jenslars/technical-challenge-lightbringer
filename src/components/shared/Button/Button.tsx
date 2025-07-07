import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  // Styling props
  backgroundColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  // Size variants
  size?: 'sm' | 'md' | 'lg';
  // Style variants
  variant?: 'solid' | 'outline' | 'ghost';
  // Full width option
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantClasses = {
  solid: 'border-0',
  outline: 'border-2 bg-transparent',
  ghost: 'border-0 bg-transparent',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  backgroundColor = 'bg-blue-600',
  textColor = 'text-white',
  hoverBackgroundColor = 'hover:bg-blue-700',
  hoverTextColor = '',
  size = 'md',
  variant = 'solid',
  fullWidth = false,
}) => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'cursor-pointer',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    variantClasses[variant],
    backgroundColor,
    textColor,
    hoverBackgroundColor,
    hoverTextColor,
    fullWidth ? 'w-full' : '',
    // Only apply size classes if no custom padding is provided
    !className.includes('p-') && !className.includes('px-') && !className.includes('py-') ? sizeClasses[size] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
};

export default Button; 