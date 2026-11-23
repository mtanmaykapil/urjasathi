import React, { useState } from 'react';
import { useT } from '../../i18n';
import { getWhatsAppUrl } from '../../config';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { GuideDisclaimer } from '../../components/GuideDisclaimer';
import { ReportErrorButton } from '../../components/ReportErrorButton';

interface ChecklistGuidePageProps {
  onNavigate: (route: string) => void;
}

interface ChecklistItem {
  id: string;
  key: 'item1' | 'item2' | 'item3' | 'item4' | 'item5' | 'item6';
}

const ITEMS: ChecklistItem[] = [
  { id: '1', key: 'item1' },
  { id: '2', key: 'item2' },
  { id: '3', key: 'item3' },
  { id: '4', key: 'item4' },
  { id: '5', key: 'item5' },
  { id: '6', key: 'item6' },
];

export const ChecklistGuidePage: React.FC<ChecklistGuidePageProps> = ({ onNavigate }) => {
  const { t } = useT();
  const [checkedIds, setCheckedIds] = useState<string[]>(['1', '3']);

  const handleToggle = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const readyCount = checkedIds.length;
  const totalCount = ITEMS.length;

  const handleShareWhatsApp = () => {
    const readyNames = ITEMS.filter((item) => checkedIds.includes(item.id))
      .map((item) => `• ${t.guide.checklist[item.key]}`)
      .join('\n');

    const pendingNames = ITEMS.filter((item) => !checkedIds.includes(item.id))
      .map((item) => `• ${t.guide.checklist[item.key]}`)
      .join('\n');

    const message = t.guide.checklist.whatsappTemplate
      .replace('{readyCount}', readyCount.toString())
      .replace('{totalCount}', totalCount.toString())
      .replace('{readyItems}', readyNames || 'None')
      .replace('{pendingItems}', pendingNames || 'All complete!');

    window.open(getWhatsAppUrl(undefined, message), '_blank', 'noopener,noreferrer');
  };

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
            Homeowner Tool
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.guide.checklist.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.guide.checklist.subhead}
          </p>
        </div>

        {/* Interactive Checklist Card */}
        <Card className="border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.guide.checklist.progressLabel}
              </span>
              <p className="text-lg font-bold text-slate-900">
                {readyCount} of {totalCount} items ready
              </p>
            </div>

            <div className="w-full sm:w-48 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-green-700 h-full transition-all duration-300"
                style={{ width: `${(readyCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 italic">
            {t.guide.checklist.sampleNotice}
          </p>

          <div className="space-y-3">
            {ITEMS.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <label
                  key={item.id}
                  className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer min-h-[48px] select-none ${
                    isChecked
                      ? 'bg-green-50/60 border-green-300 text-slate-900'
                      : 'bg-white border-amber-200/80 text-slate-700 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(item.id)}
                    className="w-5 h-5 rounded text-green-700 focus:ring-green-600 border-slate-300 cursor-pointer shrink-0 mt-0.5"
                  />
                  <span className={`text-sm sm:text-base font-medium flex-1 ${isChecked ? 'line-through text-slate-500' : ''}`}>
                    {t.guide.checklist[item.key]}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Share on WhatsApp Button */}
          <div className="pt-4 border-t border-slate-100">
            <Button
              size="lg"
              variant="whatsapp"
              fullWidth
              onClick={handleShareWhatsApp}
              icon={
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                </svg>
              }
            >
              {t.guide.checklist.shareBtn}
            </Button>
          </div>
        </Card>

        {/* Footer Disclaimer */}
        <GuideDisclaimer />
      </main>

      <Footer onPrivacyClick={() => onNavigate('/privacy')} />
    </div>
  );
};
