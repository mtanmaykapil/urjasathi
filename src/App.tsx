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
import { GuideTeaserSection } from './sections/GuideTeaserSection';
import { PrivacyPage } from './pages/PrivacyPage';
import { GuideHubPage } from './pages/guide/GuideHubPage';
import { CentralGuidePage } from './pages/guide/CentralGuidePage';
import { ProcessGuidePage } from './pages/guide/ProcessGuidePage';
import { ChecklistGuidePage } from './pages/guide/ChecklistGuidePage';
import { StateGuidePage } from './pages/guide/StateGuidePage';
import { GuideStatusPage } from './pages/guide/GuideStatusPage';

export const App: React.FC = () => {
  const getRouteFromUrl = (): string => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (hash.startsWith('#/')) {
      return hash.replace('#', '');
    }
    if (hash === '#privacy') return '/privacy';
    if (hash === '#guide') return '/guide';
    if (path && path !== '/') return path;
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getRouteFromUrl);

  const navigateTo = (route: string) => {
    // If routing to anchor on main page
    if (route.startsWith('/#')) {
      window.history.pushState({}, '', route);
      setCurrentRoute('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const anchor = route.replace('/#', '');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update dynamic page title and analytics per route
  useEffect(() => {
    track('page_view', { route: currentRoute });

    if (currentRoute === '/privacy') {
      document.title = 'Privacy Note | UrjaSaathi';
    } else if (currentRoute === '/guide') {
      document.title = 'Rooftop Solar Guide for India | UrjaSaathi';
    } else if (currentRoute === '/guide/central') {
      document.title = 'Central Solar Scheme & Subsidies | UrjaSaathi';
    } else if (currentRoute === '/guide/process') {
      document.title = 'Meter & Net Metering Explained | UrjaSaathi';
    } else if (currentRoute === '/guide/checklist') {
      document.title = 'Homeowner Rooftop Solar Checklist | UrjaSaathi';
    } else if (currentRoute === '/guide/status') {
      document.title = 'Solar Guide Verification Tracker | UrjaSaathi';
    } else if (currentRoute.startsWith('/guide/state/')) {
      const stateSlug = currentRoute.replace('/guide/state/', '');
      document.title = `Rooftop Solar Guide (${stateSlug}) | UrjaSaathi`;
    } else {
      document.title = 'UrjaSaathi | Solar Job Tracker for Indian Installers';
    }
  }, [currentRoute]);

  // Route: /privacy
  if (currentRoute === '/privacy') {
    return <PrivacyPage onBack={() => navigateTo('/')} />;
  }

  // Route: /guide
  if (currentRoute === '/guide') {
    return <GuideHubPage onNavigate={navigateTo} />;
  }

  // Route: /guide/central
  if (currentRoute === '/guide/central') {
    return <CentralGuidePage onNavigate={navigateTo} />;
  }

  // Route: /guide/process
  if (currentRoute === '/guide/process') {
    return <ProcessGuidePage onNavigate={navigateTo} />;
  }

  // Route: /guide/checklist
  if (currentRoute === '/guide/checklist') {
    return <ChecklistGuidePage onNavigate={navigateTo} />;
  }

  // Route: /guide/status
  if (currentRoute === '/guide/status') {
    return <GuideStatusPage onNavigate={navigateTo} />;
  }

  // Route: /guide/state/:id
  if (currentRoute.startsWith('/guide/state/')) {
    const stateId = currentRoute.replace('/guide/state/', '').split('/')[0];
    return <StateGuidePage stateId={stateId} onNavigate={navigateTo} />;
  }

  // Default: Landing Page (/)
  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
      <Header onNavigate={navigateTo} />

      <main id="main-content" className="flex-1">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. The problem */}
        <ProblemSection />

        {/* 3. Interactive demo (the main part) */}
        <DemoSection />

        {/* 4. How it works */}
        <HowItWorksSection />

        {/* 5. Customer Solar Guide Teaser Section */}
        <GuideTeaserSection onNavigateGuide={() => navigateTo('/guide')} />

        {/* 6. Coming soon */}
        <ComingSoonSection />

        {/* 7. Contact */}
        <ContactSection />
      </main>

      {/* 8. Footer */}
      <Footer
        onPrivacyClick={() => navigateTo('/privacy')}
        onGuideClick={() => navigateTo('/guide')}
      />
    </div>
  );
};

export default App;
