import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'white' | 'cream' | 'border-highlight';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  interactive = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-xl p-4 sm:p-6 transition-all duration-150';

  const variantClasses = {
    white: 'bg-white border border-amber-100/80 shadow-xs',
    cream: 'bg-[#FFFBEB] border border-amber-200/70 shadow-xs',
    'border-highlight': 'bg-white border-2 border-green-700 shadow-sm',
  };

  const interactiveClasses = interactive
    ? 'hover:border-green-600 hover:shadow-md active:bg-amber-50/50 cursor-pointer'
    : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
