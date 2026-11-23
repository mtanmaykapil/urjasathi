import React from 'react';
import { useT } from '../i18n';
import { Section } from '../components/Section';
import { Button } from '../components/Button';

interface GuideTeaserSectionProps {
  onNavigateGuide: () => void;
}

export const GuideTeaserSection: React.FC<GuideTeaserSectionProps> = ({ onNavigateGuide }) => {
  const { t } = useT();

  return (
    <Section background="warm" className="border-b border-amber-200/50">
      <div className="bg-gradient-to-r from-amber-100/90 via-[#FFFDF5] to-green-100/80 rounded-2xl p-6 sm:p-10 border border-amber-300/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-green-900 bg-green-100 px-3 py-1 rounded-full mb-3 inline-block">
            {t.landingGuideTeaser.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {t.landingGuideTeaser.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            {t.landingGuideTeaser.subhead}
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <Button
            size="lg"
            variant="primary"
            onClick={onNavigateGuide}
            className="w-full md:w-auto"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          >
            {t.landingGuideTeaser.cta}
          </Button>
        </div>
      </div>
    </Section>
  );
};
