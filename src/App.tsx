import React, { useState, useEffect } from 'react';
import { track } from './analytics';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { DemoSection } from './sections/DemoSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { ComingSoonSection } from './sections/ComingSoonSection';
import { ContactSection } from './sections/ContactSection';
import { PrivacyPage } from './pages/PrivacyPage';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'main' | 'privacy'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/privacy' || hash === '#privacy') {
        return 'privacy';
      }
    }
    return 'main';
  });

  // Track initial page view
  useEffect(() => {
    track('page_view', { path: window.location.pathname, hash: window.location.hash });

    const handlePopState = () => {
      if (window.location.pathname === '/privacy' || window.location.hash === '#privacy') {
        setCurrentView('privacy');
      } else {
        setCurrentView('main');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPrivacy = () => {
    window.history.pushState({}, '', '#privacy');
    setCurrentView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMain = () => {
    window.history.pushState({}, '', window.location.pathname.replace('/privacy', '') || '/');
    setCurrentView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'privacy') {
    return <PrivacyPage onBack={navigateToMain} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
      <Header />

      <main id="main-content" className="flex-1">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. The problem */}
        <ProblemSection />

        {/* 3. Interactive demo (the main part) */}
        <DemoSection />

        {/* 4. How it works */}
        <HowItWorksSection />

        {/* 5. Coming soon */}
        <ComingSoonSection />

        {/* 6. Contact */}
        <ContactSection />
      </main>

      {/* 7. Footer */}
      <Footer onPrivacyClick={navigateToPrivacy} />
    </div>
  );
};

export default App;
