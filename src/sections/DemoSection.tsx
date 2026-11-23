import React, { useState, useEffect, useMemo } from 'react';
import { Job, JobStage } from '../types';
import { useT } from '../i18n';
import { STUCK_DAYS } from '../config';
import { listJobs, addJob, updateJobStage, toggleDoc, resetJobs } from '../data/jobsApi';
import { track } from '../analytics';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { JobCard } from './demo/JobCard';
import { JobDetailPanel } from './demo/JobDetailPanel';
import { AddJobModal } from './demo/AddJobModal';

const ALL_STAGES_FILTER: (JobStage | 'ALL')[] = [
  'ALL',
  'Lead',
  'Survey done',
  'Documents submitted',
  'Approval pending',
  'Approved',
  'Installed',
  'Commissioned',
];

export const DemoSection: React.FC = () => {
  const { t } = useT();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<JobStage | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load initial jobs
  useEffect(() => {
    let mounted = true;
    listJobs().then((data) => {
      if (mounted) {
        setJobs(data);
        if (data.length > 0) {
          setSelectedJobId(data[0].id);
        }
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Compute stuck jobs count live
  const stuckCount = useMemo(() => {
    return jobs.filter((j) => j.daysSinceUpdate > STUCK_DAYS).length;
  }, [jobs]);

  // Filter and sort jobs: Stuck first, then most recently updated (daysSinceUpdate ascending)
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => {
        const matchesStage = stageFilter === 'ALL' || j.stage === stageFilter;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          j.customerName.toLowerCase().includes(q) ||
          j.phone.includes(q) ||
          j.city.toLowerCase().includes(q);
        return matchesStage && matchesQuery;
      })
      .sort((a, b) => {
        const aStuck = a.daysSinceUpdate > STUCK_DAYS;
        const bStuck = b.daysSinceUpdate > STUCK_DAYS;
        if (aStuck && !bStuck) return -1;
        if (!aStuck && bStuck) return 1;
        return a.daysSinceUpdate - b.daysSinceUpdate;
      });
  }, [jobs, stageFilter, searchQuery]);

  const selectedJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || null;
  }, [jobs, selectedJobId]);

  const handleSelectJob = (job: Job) => {
    track('demo_job_opened', { jobId: job.id, stage: job.stage });
    setSelectedJobId(job.id);
  };

  const handleStageChange = async (jobId: string, newStage: JobStage) => {
    const updated = await updateJobStage(jobId, newStage);
    setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)));
  };

  const handleToggleDoc = async (jobId: string, docId: string) => {
    const updated = await toggleDoc(jobId, docId);
    setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)));
  };

  const handleAddJob = async (newJobData: {
    customerName: string;
    phone: string;
    city: string;
    systemKw: number;
    notes?: string;
  }) => {
    const created = await addJob(newJobData);
    setJobs((prev) => [created, ...prev]);
    setSelectedJobId(created.id);
  };

  const handleReset = async () => {
    if (window.confirm(t.demo.resetConfirmPrompt)) {
      const resetList = await resetJobs();
      setJobs(resetList);
      if (resetList.length > 0) {
        setSelectedJobId(resetList[0].id);
      }
    }
  };

  return (
    <Section id="demo" background="cream" className="border-b border-amber-200/50">
      <div className="flex flex-col items-center">
        <SectionHeading
          badge={t.demo.sampleNotice}
          title={t.demo.sectionTitle}
          subheading={t.demo.sectionSubhead}
        />

        {/* Live Stuck Counter & Toolbar */}
        <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Live Stuck Job Pill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3.5 py-2 rounded-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span className="text-xs sm:text-sm font-bold text-red-900">
                  {t.demo.stuckCounter}:
                </span>
                <span className="text-base sm:text-lg font-black text-red-700">
                  {stuckCount}
                </span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                (&gt; {STUCK_DAYS} days inactive)
              </span>
            </div>

            {/* Action Buttons: Add Job & Reset */}
            <div className="flex items-center gap-2.5 self-end md:self-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                title="Reset sample jobs"
              >
                {t.demo.resetBtn}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                {t.demo.addJobBtn}
              </Button>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.demo.searchPlaceholder}
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-colors"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Stage Filter */}
            <div>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value as JobStage | 'ALL')}
                className="w-full min-h-[44px] px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
              >
                {ALL_STAGES_FILTER.map((st) => (
                  <option key={st} value={st}>
                    {st === 'ALL' ? t.demo.filterStageAll : t.demo.stages[st]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Board Split Layout (List + Detail) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Job Cards List */}
          <div className="lg:col-span-7 space-y-3">
            {loading ? (
              <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                Loading demo board...
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-amber-200/80">
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  {t.demo.emptyTitle}
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  {t.demo.emptyDesc}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setStageFilter('ALL');
                  }}
                >
                  {t.demo.clearFilter}
                </Button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={job.id === selectedJobId}
                  onSelect={handleSelectJob}
                />
              ))
            )}
          </div>

          {/* Right Column: Detail Panel */}
          <div className="lg:col-span-5 sticky top-24">
            <JobDetailPanel
              job={selectedJob}
              onClose={() => setSelectedJobId(null)}
              onStageChange={handleStageChange}
              onToggleDoc={handleToggleDoc}
            />
          </div>
        </div>

        {/* Demo Disclaimer */}
        <p className="mt-8 text-xs text-center text-slate-500 max-w-lg">
          {t.demo.demoDisclaimer}
        </p>

        {/* Add Job Modal Dialog */}
        <AddJobModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddJob}
        />
      </div>
    </Section>
  );
};
