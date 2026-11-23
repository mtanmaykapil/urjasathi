import React, { useState, useEffect } from 'react';
import { useT } from '../../i18n';
import { StateGuideEntry } from '../../data/guide/schema';
import { getStateById } from '../../data/guideApi';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { GuideDisclaimer } from '../../components/GuideDisclaimer';
import { ReportErrorButton } from '../../components/ReportErrorButton';
import { SubsidyEstimator } from './SubsidyEstimator';

interface StateGuidePageProps {
  stateId: string;
  onNavigate: (route: string) => void;
}

export const StateGuidePage: React.FC<StateGuidePageProps> = ({ stateId, onNavigate }) => {
  const { lang, t } = useT();
  const [state, setState] = useState<StateGuideEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStateById(stateId).then((res) => {
      if (mounted) {
        setState(res);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [stateId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFDF5] text-slate-600">
        Loading state guide...
      </div>
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">State Not Found</h1>
          <p className="text-sm text-slate-600 mb-6">The requested state or union territory could not be identified.</p>
          <button
            onClick={() => onNavigate('/guide')}
            className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold"
          >
            {t.guide.common.backToGuideHub}
          </button>
        </main>
        <Footer onPrivacyClick={() => onNavigate('/privacy')} />
      </div>
    );
  }

  const isStateVerified = state.status === 'verified';
  const stateDisplayName = lang === 'hi' ? state.name_hi : state.name_en;
  const verificationDateText = state.last_verified || t.guide.common.notVerifiedShort;

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Navigation & Verification Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
          <button
            onClick={() => onNavigate('/guide')}
            className="text-xs sm:text-sm font-semibold text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 rounded px-1.5 py-1"
          >
            {t.guide.common.backToGuideHub}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 font-mono">
              {t.guide.common.lastVerified}: <strong className="text-slate-800">{verificationDateText}</strong>
            </span>
            <ReportErrorButton />
          </div>
        </div>

        {/* Not Verified Warning Banner */}
        {!isStateVerified && (
          <div className="p-4 bg-amber-100/70 border border-amber-300 rounded-xl text-amber-950 text-xs sm:text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold">Verification in progress</p>
              <p className="mt-0.5">{t.guide.common.stateVerifyingBanner}</p>
            </div>
          </div>
        )}

        {/* State Title */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block">
            {state.is_union_territory ? 'Union Territory' : 'State Guide'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.guide.common.stateTitle.replace('{state}', stateDisplayName)}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.guide.common.stateSubtitle}
          </p>
        </div>

        {/* 1. Central Subsidy Summary at Top */}
        <SubsidyEstimator
          selectedState={state}
          className="border-green-600/40"
        />

        {/* 2. State Top-up Subsidy Section */}
        <Card className="border border-amber-200/90 shadow-sm p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-lg font-bold text-slate-900">
              {t.guide.common.topUpTitle}
            </h2>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                state.state_top_up.status === 'available'
                  ? 'bg-green-100 text-green-900'
                  : state.state_top_up.status === 'none'
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {state.state_top_up.status === 'available'
                ? 'Available'
                : state.state_top_up.status === 'none'
                ? 'No State Top-up'
                : 'Not Verified'}
            </span>
          </div>

          {state.state_top_up.status === 'available' && state.state_top_up.amount_text ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-green-900 bg-green-50 p-3 rounded-lg border border-green-200">
                {state.state_top_up.amount_text}
              </p>
              {state.state_top_up.source_url && (
                <a
                  href={state.state_top_up.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-800 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>{t.guide.common.sourceLabel}</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ) : state.state_top_up.status === 'none' ? (
            <p className="text-sm text-slate-600">
              {t.guide.estimator.stateTopUpNone}
            </p>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
              {t.guide.common.notVerifiedYet}
            </div>
          )}
        </Card>

        {/* 3. Official State Links Box (Shows ONLY links that exist in data) */}
        <Card className="border border-amber-200/90 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            {t.guide.common.officialLinksTitle}
          </h2>

          <div className="space-y-4 text-sm">
            {/* Nodal Agency */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {t.guide.common.nodalAgencyLabel}
              </span>
              {state.nodal_agency ? (
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{state.nodal_agency}</span>
                  {state.state_portal_url && (
                    <a
                      href={state.state_portal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-800 font-bold hover:underline"
                    >
                      Visit Agency Portal &rarr;
                    </a>
                  )}
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  {t.guide.common.notVerifiedYet}
                </span>
              )}
            </div>

            {/* DISCOMs */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {t.guide.common.discomsLabel}
              </span>
              {state.discoms && state.discoms.length > 0 ? (
                <ul className="divide-y divide-slate-100 bg-slate-50 rounded-lg border border-slate-200">
                  {state.discoms.map((d, idx) => (
                    <li key={idx} className="p-2.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{d.name}</span>
                      {d.website && (
                        <a
                          href={d.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-800 font-bold hover:underline"
                        >
                          Website &rarr;
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  {t.guide.common.notVerifiedYet}
                </span>
              )}
            </div>

            {/* Net Metering Regulation URL */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {t.guide.common.netMeteringRegulationLabel}
              </span>
              {state.net_metering_regulation_url ? (
                <a
                  href={state.net_metering_regulation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-800 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>View SERC Tariff & Net Metering Order</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  {t.guide.common.notVerifiedYet}
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Footer Disclaimer */}
        <GuideDisclaimer />
      </main>

      <Footer onPrivacyClick={() => onNavigate('/privacy')} />
    </div>
  );
};
