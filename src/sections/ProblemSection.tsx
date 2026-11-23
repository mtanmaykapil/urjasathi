import React from 'react';
import { useT } from '../i18n';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '../components/Card';

export const ProblemSection: React.FC = () => {
  const { t } = useT();

  const cards = [
    {
      title: t.problem.card1Title,
      desc: t.problem.card1Desc,
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accent: 'border-orange-200 bg-orange-50/40',
    },
    {
      title: t.problem.card2Title,
      desc: t.problem.card2Desc,
      icon: (
        <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      accent: 'border-amber-200 bg-amber-50/40',
    },
    {
      title: t.problem.card3Title,
      desc: t.problem.card3Desc,
      icon: (
        <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      accent: 'border-slate-200 bg-slate-50/60',
    },
  ];

  return (
    <Section background="white" className="border-b border-amber-200/50">
      <SectionHeading
        title={t.problem.heading}
        subheading={t.problem.subheading}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <Card key={idx} className={`border ${card.accent} flex flex-col justify-between`}>
            <div>
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200/80 shadow-xs flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {card.title}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};
