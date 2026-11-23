import React from 'react';
import { useT } from '../../i18n';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { GuideDisclaimer } from '../../components/GuideDisclaimer';
import { ReportErrorButton } from '../../components/ReportErrorButton';

interface ProcessGuidePageProps {
  onNavigate: (route: string) => void;
}

export const ProcessGuidePage: React.FC<ProcessGuidePageProps> = ({ onNavigate }) => {
  const { t } = useT();

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Navigation & Report Error Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
          <button
            onClick={() => onNavigate('/guide')}
            className="text-xs sm:text-sm font-semibold text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 rounded px-1.5 py-1"
          >
            {t.guide.common.backToGuideHub}
          </button>

          <ReportErrorButton />
        </div>

        {/* Title */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-green-800 bg-green-100 border border-green-200 px-3 py-1 rounded-full mb-3 inline-block">
            Technical Guide
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.guide.process.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.guide.process.subhead}
          </p>
        </div>

        {/* Topic 1: Bidirectional Meter */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold">
              ⇄
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {t.guide.process.meterHeading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {t.guide.process.meterDesc}
          </p>
        </Card>

        {/* Topic 2: Surplus Power Accounting */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {t.guide.process.surplusHeading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {t.guide.process.surplusDesc}
          </p>
        </Card>

        {/* Topic 3: Inspection Before Subsidy */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {t.guide.process.inspectionHeading}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {t.guide.process.inspectionDesc}
          </p>

          <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 italic">
            {t.guide.process.noFeesDisclaimer}
          </div>
        </Card>

        {/* Footer Disclaimer */}
        <GuideDisclaimer />
      </main>

      <Footer onPrivacyClick={() => onNavigate('/privacy')} />
    </div>
  );
};
