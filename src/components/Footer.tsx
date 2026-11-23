import React from 'react';
import { useT } from '../i18n';

interface FooterProps {
  onPrivacyClick: () => void;
  onGuideClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onGuideClick }) => {
  const { t } = useT();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="max-w-xl">
          <p className="text-sm sm:text-base font-semibold text-amber-300 mb-2">
            {t.footer.statutoryDisclaimer}
          </p>
          <p className="text-xs text-slate-400">
            {t.footer.copyright}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
          {onGuideClick && (
            <button
              onClick={onGuideClick}
              className="min-h-[44px] px-3 py-2 text-sm text-amber-300 hover:text-white underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-md cursor-pointer"
            >
              {t.footer.guideLink}
            </button>
          )}

          <button
            onClick={onPrivacyClick}
            className="min-h-[44px] px-3 py-2 text-sm text-slate-300 hover:text-white underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-md cursor-pointer"
          >
            {t.footer.privacyLink}
          </button>
        </div>
      </div>
    </footer>
  );
};
