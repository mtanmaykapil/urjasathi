import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  background?: 'warm' | 'white' | 'cream';
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  background = 'warm',
  className = '',
  ...props
}) => {
  const bgClasses = {
    warm: 'bg-[#FEFDF5]',
    white: 'bg-white',
    cream: 'bg-[#FFFDF0]',
  };

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 ${bgClasses[background]} ${className}`}
      {...props}
    >
      <div className="max-w-5xl mx-auto w-full">{children}</div>
    </section>
  );
};
