import React from 'react';
import { useT } from '../i18n';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';

export const HowItWorksSection: React.FC = () => {
  const { t } = useT();

  const steps = [
    {
      num: '1',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
    },
    {
      num: '2',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
    },
    {
      num: '3',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
    },
    {
      num: '4',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
    },
  ];

  return (
    <Section id="how-it-works" background="warm" className="border-b border-amber-200/50">
      <SectionHeading
        title={t.howItWorks.sectionTitle}
        subheading={t.howItWorks.sectionSubhead}
      />

      <div className="relative">
        {/* Desktop connecting horizontal line */}
        <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-amber-300 -z-0" />

        {/* Step Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-amber-200/70 shadow-xs flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-green-700 text-white font-bold text-lg flex items-center justify-center shadow-xs mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
