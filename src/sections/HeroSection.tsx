import React from 'react';
import { useT } from '../i18n';
import { getWhatsAppUrl } from '../config';
import { track } from '../analytics';
import { Button } from '../components/Button';

export const HeroSection: React.FC = () => {
  const { t } = useT();

  const handleDemoClick = () => {
    track('demo_try_click');
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    track('whatsapp_click', { source: 'hero_cta' });
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FEFDF5] via-[#FFFDF2] to-[#FEFDF5] border-b border-amber-200/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle Solar Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
          <span>{t.header.tagline}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.12]">
          {t.hero.headline}
        </h1>

        {/* One-line Subhead */}
        <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subhead}
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Button
            size="lg"
            variant="primary"
            onClick={handleDemoClick}
            className="w-full sm:w-auto"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            {t.hero.tryDemoCta}
          </Button>

          <Button
            size="lg"
            variant="whatsapp"
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto"
            icon={
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              </svg>
            }
          >
            {t.hero.whatsappCta}
          </Button>
        </div>
      </div>
    </section>
  );
};
