import React, { useState, useEffect, useMemo } from 'react';
import { useT } from '../../i18n';
import { StateGuideEntry } from '../../data/guide/schema';
import { getAllStates } from '../../data/guideApi';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { SubsidyEstimator } from './SubsidyEstimator';
import { GuideDisclaimer } from '../../components/GuideDisclaimer';
import { ReportErrorButton } from '../../components/ReportErrorButton';

interface GuideHubPageProps {
  onNavigate: (route: string) => void;
}

export const GuideHubPage: React.FC<GuideHubPageProps> = ({ onNavigate }) => {
  const { lang, t } = useT();
  const [states, setStates] = useState<StateGuideEntry[]>([]);
  const [selectedState, setSelectedState] = useState<StateGuideEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAllStates().then((data) => {
      if (mounted) {
        setStates(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredStates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return states;
    return states.filter(
      (s) =>
        s.name_en.toLowerCase().includes(q) ||
        s.name_hi.includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  }, [states, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10">
        {/* Navigation Breadcrumb & Report Error Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs sm:text-sm font-semibold text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 rounded px-1.5 py-1"
          >
            {t.guide.common.backToHome}
          </button>

          <ReportErrorButton />
        </div>

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-green-800 bg-green-100 border border-green-200 px-3 py-1 rounded-full mb-3 inline-block">
            {t.landingGuideTeaser.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t.guide.hub.headline}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.guide.hub.subhead}
          </p>
        </div>

        {/* 3 Main Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Central Scheme */}
          <div
            onClick={() => onNavigate('/guide/central')}
            className="bg-white rounded-xl p-5 border border-amber-200/90 shadow-xs hover:border-green-600 hover:shadow-md active:bg-amber-50/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-800 flex items-center justify-center font-bold mb-3">
                ₹
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {t.guide.hub.card1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.guide.hub.card1Desc}
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-green-800 flex items-center gap-1">
              {t.guide.hub.centralGuideCta} &rarr;
            </span>
          </div>

          {/* Card 2: Process */}
          <div
            onClick={() => onNavigate('/guide/process')}
            className="bg-white rounded-xl p-5 border border-amber-200/90 shadow-xs hover:border-green-600 hover:shadow-md active:bg-amber-50/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-3">
                <svg className="w-5 h-5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {t.guide.hub.card2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.guide.hub.card2Desc}
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-green-800 flex items-center gap-1">
              {t.guide.hub.processCta} &rarr;
            </span>
          </div>

          {/* Card 3: Checklist */}
          <div
            onClick={() => onNavigate('/guide/checklist')}
            className="bg-white rounded-xl p-5 border border-amber-200/90 shadow-xs hover:border-green-600 hover:shadow-md active:bg-amber-50/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold mb-3">
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {t.guide.hub.card3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.guide.hub.card3Desc}
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-green-800 flex items-center gap-1">
              {t.guide.hub.checklistCta} &rarr;
            </span>
          </div>
        </div>

        {/* Central Subsidy Estimator */}
        <SubsidyEstimator
          states={states}
          selectedState={selectedState}
          onSelectState={setSelectedState}
        />

        {/* State/UT Directory Section */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.guide.hub.allStatesTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Select your state or union territory to inspect DISCOMs, net metering regulations, and verified local top-ups.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/guide/status')}
              className="text-xs text-slate-500 hover:text-slate-800 underline self-start sm:self-auto focus:outline-none"
            >
              {t.guide.hub.statusLink}
            </button>
          </div>

          {/* Search Input for Mobile-first quick lookup */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.guide.hub.searchPlaceholder}
              className="w-full min-h-[48px] pl-11 pr-4 py-2.5 text-sm sm:text-base text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-xs"
            />
            <svg
              className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* States Grid */}
          {loading ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
              Loading states and UTs directory...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredStates.map((state) => {
                const displayName = lang === 'hi' ? state.name_hi : state.name_en;
                const isVerified = state.status === 'verified';
                return (
                  <button
                    key={state.id}
                    onClick={() => onNavigate(`/guide/state/${state.id}`)}
                    className="p-3 text-left bg-white hover:bg-amber-50/60 active:bg-amber-100/60 border border-amber-200/80 rounded-xl transition-all cursor-pointer flex flex-col justify-between min-h-[68px] focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {displayName}
                    </span>
                    <div className="flex items-center justify-between gap-1 mt-2 text-[10px]">
                      <span className="text-slate-500 uppercase tracking-wider font-semibold">
                        {state.is_union_territory ? 'UT' : 'State'}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded font-medium ${
                          isVerified
                            ? 'bg-green-100 text-green-900'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isVerified ? 'Verified' : 'Draft'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Disclaimer */}
        <GuideDisclaimer className="mt-8" />
      </main>

      <Footer onPrivacyClick={() => onNavigate('/privacy')} />
    </div>
  );
};
