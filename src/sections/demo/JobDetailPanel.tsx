import React from 'react';
import { Job, JobStage } from '../../types';
import { useT } from '../../i18n';
import { STUCK_DAYS, getWhatsAppUrl } from '../../config';
import { track } from '../../analytics';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';

interface JobDetailPanelProps {
  job: Job | null;
  onClose: () => void;
  onStageChange: (jobId: string, stage: JobStage) => void;
  onToggleDoc: (jobId: string, docId: string) => void;
}

const ALL_STAGES: JobStage[] = [
  'Lead',
  'Survey done',
  'Documents submitted',
  'Approval pending',
  'Approved',
  'Installed',
  'Commissioned',
];

export const JobDetailPanel: React.FC<JobDetailPanelProps> = ({
  job,
  onClose,
  onStageChange,
  onToggleDoc,
}) => {
  const { t } = useT();

  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-amber-200/80 text-slate-500">
        <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="font-medium text-slate-700">Select a job from the list</p>
        <p className="text-xs text-slate-400 mt-1">Click any card to inspect details, checklist, and WhatsApp updates.</p>
      </div>
    );
  }

  const isStuck = job.daysSinceUpdate > STUCK_DAYS;
  const completedDocs = job.documents.filter((d) => d.isDone).length;
  const totalDocs = job.documents.length;
  const isAllReady = completedDocs === totalDocs;

  // Generate WhatsApp prefilled message based on stage
  const template = t.demo.whatsappTemplates[job.stage] || t.demo.whatsappTemplates['Lead'];
  const formattedMessage = template.replace('{name}', job.customerName);

  const handleWhatsAppSend = () => {
    track('whatsapp_click', {
      source: 'demo_detail_update',
      stage: job.stage,
      customerPhone: job.phone,
    });
    const url = getWhatsAppUrl(`91${job.phone}`, formattedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleStageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value as JobStage;
    track('demo_stage_changed', { from: job.stage, to: newStage, jobId: job.id });
    onStageChange(job.id, newStage);
  };

  const currentStageIndex = ALL_STAGES.indexOf(job.stage);

  return (
    <div className="bg-white rounded-xl border border-amber-200/90 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-[#FFFDF7]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {job.customerName}
            </h3>
            {isStuck && (
              <Badge variant="stuck" size="sm">
                {t.demo.stuckBadge}
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            +91 {job.phone} • {job.city} • <span className="font-semibold text-slate-700">{job.systemKw} kW</span>
          </p>
        </div>

        {/* Close Button (especially useful on mobile full-width sheet) */}
        <button
          onClick={onClose}
          aria-label={t.demo.closeDetail}
          className="min-h-[44px] min-w-[44px] p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
        {/* Stage Selector */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="stage-select"
              className="text-xs sm:text-sm font-bold text-slate-900"
            >
              {t.demo.currentStageLabel}
            </label>
            <span className="text-xs text-slate-500">
              {job.daysSinceUpdate === 0
                ? t.demo.today
                : `${job.daysSinceUpdate} ${t.demo.daysAgo}`}
            </span>
          </div>

          <div className="relative">
            <select
              id="stage-select"
              value={job.stage}
              onChange={handleStageSelect}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 cursor-pointer shadow-xs"
            >
              {ALL_STAGES.map((s) => (
                <option key={s} value={s}>
                  {t.demo.stages[s]}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            {t.demo.stageHelpText}
          </p>
        </div>

        {/* Stage Timeline */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {t.demo.timelineHeading}
          </h4>
          <div className="space-y-2">
            <div className="grid grid-cols-7 gap-1">
              {ALL_STAGES.map((st, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div
                    key={st}
                    title={t.demo.stages[st]}
                    className={`h-2 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-green-600 ring-2 ring-green-300'
                        : isPassed
                        ? 'bg-green-700'
                        : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>
            <p className="text-xs font-semibold text-green-900 mt-1">
              {t.demo.stages[job.stage]}
            </p>
          </div>
        </div>

        {/* WhatsApp Notification Action */}
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">
              WhatsApp Status Update
            </span>
            <span className="text-[10px] uppercase font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-md">
              wa.me ready
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 italic leading-relaxed mb-3">
            "{formattedMessage}"
          </div>

          <Button
            variant="whatsapp"
            fullWidth
            onClick={handleWhatsAppSend}
            icon={
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              </svg>
            }
          >
            {t.demo.whatsappBtn}
          </Button>
        </div>

        {/* Document Checklist */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-900">
              {t.demo.checklistHeading}
            </h4>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                isAllReady
                  ? 'bg-green-100 text-green-900'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {completedDocs} of {totalDocs} {t.demo.readyCount}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 mb-3">
            {t.demo.checklistSampleNotice}
          </p>

          <div className="space-y-2">
            {job.documents.map((doc) => {
              const isMissing = !doc.isDone;
              return (
                <label
                  key={doc.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer min-h-[48px] select-none ${
                    doc.isDone
                      ? 'bg-green-50/50 border-green-200 text-slate-800'
                      : 'bg-white border-amber-200/80 text-slate-700 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={doc.isDone}
                    onChange={() => onToggleDoc(job.id, doc.id)}
                    className="w-5 h-5 rounded text-green-700 focus:ring-green-600 border-slate-300 cursor-pointer shrink-0"
                  />
                  <span
                    className={`text-sm flex-1 font-medium ${
                      doc.isDone ? 'line-through text-slate-500' : 'text-slate-900'
                    }`}
                  >
                    {doc.name}
                  </span>
                  {isMissing && (
                    <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-medium">
                      Pending
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          {!isAllReady && (
            <p className="text-xs text-orange-800 bg-orange-50 p-2.5 rounded-lg border border-orange-200 mt-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t.demo.missingWarning}</span>
            </p>
          )}
        </div>

        {/* Notes if available */}
        {job.notes && (
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Field Notes
            </h4>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
              {job.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
