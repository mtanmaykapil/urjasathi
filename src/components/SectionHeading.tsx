import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subheading?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subheading,
  badge,
  align = 'center',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl mb-8 sm:mb-12 ${alignClass} ${className}`}>
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-green-800 bg-green-100 px-3 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
        {title}
      </h2>
      {subheading && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
};
