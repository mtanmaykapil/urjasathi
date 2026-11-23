import React from 'react';
import { Job } from '../../types';
import { useT } from '../../i18n';
import { STUCK_DAYS } from '../../config';
import { Badge } from '../../components/Badge';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onSelect }) => {
  const { t } = useT();
  const isStuck = job.daysSinceUpdate > STUCK_DAYS;

  // Completed documents counter
  const completedDocs = job.documents.filter((d) => d.isDone).length;
  const totalDocs = job.documents.length;

  return (
    <div
      onClick={() => onSelect(job)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(job);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Select job for ${job.customerName}, ${job.systemKw} kW, stage ${t.demo.stages[job.stage]}`}
      className={`p-4 rounded-xl border transition-all cursor-pointer outline-none select-none ${
        isSelected
          ? 'bg-amber-50/80 border-green-700 ring-2 ring-green-600/50 shadow-md'
          : 'bg-white border-amber-200/80 hover:border-green-600 hover:shadow-xs active:bg-amber-50/40'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div>
          <h4 className="text-base font-bold text-slate-900 leading-snug">
            {job.customerName}
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            +91 {job.phone} • {job.city}
          </p>
        </div>

        {/* Stuck Badge */}
        {isStuck ? (
          <Badge variant="stuck" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            {t.demo.stuckBadge}
          </Badge>
        ) : (
          <span className="text-[11px] text-slate-500">
            {job.daysSinceUpdate === 0
              ? t.demo.today
              : `${job.daysSinceUpdate} ${t.demo.daysAgo}`}
          </span>
        )}
      </div>

      {/* Middle row: System Size & Stage */}
      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
            {job.systemKw} kW
          </span>

          <span className="text-xs text-slate-600">
            {completedDocs}/{totalDocs} {t.demo.readyCount}
          </span>
        </div>

        <Badge
          variant={job.stage === 'Commissioned' ? 'success' : 'default'}
          size="sm"
        >
          {t.demo.stages[job.stage]}
        </Badge>
      </div>

      {/* Inactivity indicator if stuck */}
      {isStuck && (
        <div className="mt-2.5 text-xs text-red-700 font-medium flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>
            {job.daysSinceUpdate} {t.demo.daysSince}
          </span>
        </div>
      )}
    </div>
  );
};
