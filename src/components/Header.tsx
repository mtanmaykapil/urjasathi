import React, { useState } from 'react';
import { useT } from '../i18n';
import { SITE_NAME } from '../config';

export const Header: React.FC = () => {
  const { lang, t, toggleLang } = useT();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-700 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        {t.header.skipToContent}
      </a>

      <header className="sticky top-0 z-40 bg-[#FEFDF5]/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded-lg p-1"
            aria-label={`${SITE_NAME} Home`}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-700 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-green-800 transition-colors">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-green-800 transition-colors">
                {SITE_NAME}
              </span>
              <span className="hidden sm:inline text-[11px] font-medium text-slate-500 leading-none">
                {t.header.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick('demo')}
              className="text-base font-medium text-slate-700 hover:text-green-800 py-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 rounded-md px-2"
            >
              {t.header.navDemo}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-base font-medium text-slate-700 hover:text-green-800 py-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 rounded-md px-2"
            >
              {t.header.navHowItWorks}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-base font-medium text-slate-700 hover:text-green-800 py-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 rounded-md px-2"
            >
              {t.header.navContact}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              aria-label={t.header.langToggleAria}
              className="min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-slate-800 font-semibold text-sm hover:bg-amber-100 active:bg-amber-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 flex items-center justify-center gap-1.5"
            >
              <span className="text-xs text-slate-500">A/अ</span>
              <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </nav>

          {/* Mobile Right Controls: Language Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label={t.header.langToggleAria}
              className="min-h-[44px] px-3 rounded-lg border border-amber-300 bg-amber-50 text-slate-800 font-semibold text-sm hover:bg-amber-100 active:bg-amber-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 flex items-center justify-center"
            >
              {lang === 'en' ? 'हिंदी' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.header.menuClose : t.header.menuOpen}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg text-slate-700 hover:bg-amber-100/60 active:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-green-600 flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-amber-200/80 bg-[#FEFDF5] px-4 pt-3 pb-5 space-y-2 shadow-md">
            <button
              onClick={() => handleNavClick('demo')}
              className="w-full text-left min-h-[48px] px-4 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-amber-100/80 flex items-center"
            >
              {t.header.navDemo}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="w-full text-left min-h-[48px] px-4 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-amber-100/80 flex items-center"
            >
              {t.header.navHowItWorks}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left min-h-[48px] px-4 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-amber-100/80 flex items-center"
            >
              {t.header.navContact}
            </button>
          </div>
        )}
      </header>
    </>
  );
};
