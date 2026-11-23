import React, { useState, useEffect } from 'react';
import { useT } from '../../i18n';
import { CentralGuideData } from '../../data/guide/schema';
import { getCentralGuide } from '../../data/guideApi';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { GuideDisclaimer } from '../../components/GuideDisclaimer';
import { ReportErrorButton } from '../../components/ReportErrorButton';

interface CentralGuidePageProps {
  onNavigate: (route: string) => void;
}

export const CentralGuidePage: React.FC<CentralGuidePageProps> = ({ onNavigate }) => {
  const { lang, t } = useT();
  const [data, setData] = useState<CentralGuideData | null>(null);

  useEffect(() => {
    let mounted = true;
    getCentralGuide().then((res) => {
      if (mounted) setData(res);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFDF5] text-slate-600">
        Loading Central Guidelines...
      </div>
    );
  }

  const isVerified = data.subsidy_structure.verified_on !== 'TO_BE_FILLED_BY_FOUNDER';
  const verificationDateText = isVerified
    ? data.subsidy_structure.verified_on
    : t.guide.common.notVerifiedShort;

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFDF5] text-slate-900">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10">
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

        {/* Title */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-green-800 bg-green-100 border border-green-200 px-3 py-1 rounded-full mb-3 inline-block">
            National Scheme
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.guide.central.title}
          </h1>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            {t.guide.central.subtitle}
          </p>
        </div>

        {/* Section 1: Subsidy Structure */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">
              {t.guide.central.subsidySectionTitle}
            </h2>
            <a
              href={data.subsidy_structure.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-800 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{t.guide.common.sourceLabel} (PIB Notification)</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50/70 p-4 rounded-xl border border-green-200">
              <span className="text-xs font-bold uppercase tracking-wider text-green-900 block mb-1">Tier 1</span>
              <p className="text-sm font-semibold text-slate-900">{t.guide.central.subsidyTier1}</p>
            </div>
            <div className="bg-green-50/70 p-4 rounded-xl border border-green-200">
              <span className="text-xs font-bold uppercase tracking-wider text-green-900 block mb-1">Tier 2</span>
              <p className="text-sm font-semibold text-slate-900">{t.guide.central.subsidyTier2}</p>
            </div>
            <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-1">Maximum Cap</span>
              <p className="text-sm font-semibold text-slate-900">{t.guide.central.subsidyTier3}</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {t.guide.central.subsidyNote}
          </p>
        </Card>

        {/* Section 2: Capacity Guidance Table */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">
              {t.guide.central.capacitySectionTitle}
            </h2>
            <a
              href={data.capacity_guidance.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-800 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{t.guide.common.sourceLabel}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-amber-50/40 text-slate-800">
                  <th className="py-3 px-4 font-bold">{t.guide.central.unitsHeader}</th>
                  <th className="py-3 px-4 font-bold">{t.guide.central.recommendedKwHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.capacity_guidance.tiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-900">{tier.units_range}</td>
                    <td className="py-3 px-4 font-mono font-bold text-green-800">{tier.recommended_kw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Section 3: High-Level 5-Stage Process */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">
              {t.guide.central.processSectionTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {data.high_level_process.disclaimer}
            </p>
          </div>

          <div className="space-y-4">
            {data.high_level_process.stages.map((stage) => (
              <div
                key={stage.step}
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white"
              >
                <div className="w-8 h-8 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  {stage.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {lang === 'hi' ? stage.title_hi : stage.title_en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {lang === 'hi' ? stage.description_hi : stage.description_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 4: Documents to Prepare */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">
              {t.guide.central.documentsSectionTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.guide.central.documentsNotice}
            </p>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
              <span>{t.guide.central.doc1}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
              <span>{t.guide.central.doc2}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
              <span>{t.guide.central.doc3}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
              <span>{t.guide.central.doc4}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
              <span>{t.guide.central.doc5}</span>
            </li>
          </ul>
        </Card>

        {/* Section 5: Glossary & FAQ */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            {t.guide.central.faqSectionTitle}
          </h2>

          <div className="space-y-5 text-sm">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">{t.guide.central.faqDiscomQ}</h3>
              <p className="text-slate-600 leading-relaxed">{t.guide.central.faqDiscomA}</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">{t.guide.central.faqNetMeterQ}</h3>
              <p className="text-slate-600 leading-relaxed">{t.guide.central.faqNetMeterA}</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">{t.guide.central.faqEmpanelledVendorQ}</h3>
              <p className="text-slate-600 leading-relaxed">{t.guide.central.faqEmpanelledVendorA}</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">{t.guide.central.faqAlmmQ}</h3>
              <p className="text-slate-600 leading-relaxed">{t.guide.central.faqAlmmA}</p>
            </div>
          </div>
        </Card>

        {/* Section 6: Official Portal External Link */}
        <div className="p-6 bg-[#FFFDF2] rounded-xl border border-amber-300/80 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            {t.guide.common.officialPortal}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Applications for the central subsidy must be lodged directly on the official Government of India portal:
          </p>
          <a
            href={data.official_portal_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-700 text-white font-semibold text-sm hover:bg-green-800 transition-colors shadow-xs"
          >
            <span>{t.guide.central.officialPortalLinkText}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Footer Disclaimer */}
        <GuideDisclaimer />
      </main>

      <Footer onPrivacyClick={() => onNavigate('/privacy')} />
    </div>
  );
};
