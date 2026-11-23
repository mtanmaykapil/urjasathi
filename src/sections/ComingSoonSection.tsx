import React from 'react';
import { useT } from '../i18n';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '../components/Card';

export const ComingSoonSection: React.FC = () => {
  const { t } = useT();

  const items = [
    {
      title: t.comingSoon.item1Title,
      desc: t.comingSoon.item1Desc,
      icon: (
        <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      title: t.comingSoon.item2Title,
      desc: t.comingSoon.item2Desc,
      icon: (
        <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: t.comingSoon.item3Title,
      desc: t.comingSoon.item3Desc,
      icon: (
        <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  return (
    <Section background="white" className="border-b border-amber-200/50">
      <SectionHeading
        badge={t.comingSoon.badge}
        title={t.comingSoon.sectionTitle}
        subheading={t.comingSoon.sectionSubhead}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card key={idx} variant="cream" className="border border-amber-200/80">
            <div className="w-10 h-10 rounded-lg bg-amber-100/80 border border-amber-200 flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
};
