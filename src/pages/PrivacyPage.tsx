import React from 'react';
import { useT } from '../i18n';
import { getWhatsAppUrl } from '../config';
import { Button } from '../components/Button';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  const { t } = useT();

  return (
    <div className="min-h-screen bg-[#FEFDF5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-amber-200/90 shadow-sm">
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-semibold text-green-800 hover:text-green-900 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-green-600 rounded-md py-1 px-2 cursor-pointer"
          >
            {t.privacy.backLink}
          </button>

          <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-md uppercase tracking-wide">
            {t.privacy.draftBadge}
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          {t.privacy.title}
        </h1>
        <p className="text-sm text-slate-600 mb-8 pb-4 border-b border-slate-100">
          {t.privacy.intro}
        </p>

        {/* Sections */}
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {t.privacy.section1Title}
            </h2>
            <p>{t.privacy.section1Text}</p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {t.privacy.section2Title}
            </h2>
            <p>{t.privacy.section2Text}</p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {t.privacy.section3Title}
            </h2>
            <p className="mb-3">{t.privacy.section3Text}</p>
            <Button
              size="sm"
              variant="whatsapp"
              onClick={() => window.open(getWhatsAppUrl(undefined, 'Hi, I want to request deletion of my data from UrjaSaathi'), '_blank', 'noopener,noreferrer')}
              className="mt-2"
            >
              Request Data Deletion on WhatsApp
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 mb-1">
              {t.privacy.section4Title}
            </h2>
            <p className="text-xs text-slate-500 italic">
              {t.privacy.section4Text}
            </p>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <Button variant="outline" size="sm" onClick={onBack}>
            {t.privacy.backLink}
          </Button>
        </div>
      </div>
    </div>
  );
};
