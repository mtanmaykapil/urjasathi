import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes: min 44px tap target, readable typography, subtle tap transition
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeClasses = {
    sm: 'min-h-[44px] px-3.5 py-2 text-sm gap-2',
    md: 'min-h-[48px] px-5 py-2.5 text-base gap-2.5',
    lg: 'min-h-[52px] px-6 py-3 text-lg font-semibold gap-3',
  };

  const variantClasses = {
    primary:
      'bg-green-700 text-white hover:bg-green-800 active:bg-green-900 focus:ring-green-600 shadow-sm',
    secondary:
      'bg-amber-100 text-amber-950 hover:bg-amber-200 active:bg-amber-300 focus:ring-amber-500 border border-amber-300/80',
    whatsapp:
      'bg-[#25D366] text-white hover:bg-[#1EBE5D] active:bg-[#128C7E] focus:ring-[#25D366] shadow-sm',
    outline:
      'bg-transparent text-slate-800 hover:bg-slate-100 active:bg-slate-200 border border-slate-300 focus:ring-slate-400',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-400',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
