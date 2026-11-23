import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'stuck' | 'success' | 'sample';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-md whitespace-nowrap';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
  };

  const variantClasses = {
    default: 'bg-slate-100 text-slate-800 border border-slate-200',
    warning: 'bg-orange-100 text-orange-900 border border-orange-200',
    stuck: 'bg-red-100 text-red-800 border border-red-300 font-semibold',
    success: 'bg-green-100 text-green-900 border border-green-200',
    sample: 'bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider text-[10px] font-bold',
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
