import React from 'react';
import { useT } from '../i18n';
import { getWhatsAppUrl } from '../config';

export const ReportErrorButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useT();

  const handleReport = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'UrjaSaathi Solar Guide';
    const message = t.guide.common.reportErrorWhatsAppTemplate.replace('{url}', currentUrl);
    window.open(getWhatsAppUrl(undefined, message), '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleReport}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 ${className}`}
      title="Report an error or update on this guide page"
    >
      <svg className="w-3.5 h-3.5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{t.guide.common.reportErrorBtn}</span>
    </button>
  );
};
