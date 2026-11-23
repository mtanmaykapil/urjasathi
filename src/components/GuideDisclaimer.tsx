import React from 'react';
import { useT } from '../i18n';

export const GuideDisclaimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useT();

  return (
    <div className={`p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center text-xs text-amber-950 font-medium ${className}`}>
      <p>{t.guide.common.disclaimer}</p>
    </div>
  );
};
