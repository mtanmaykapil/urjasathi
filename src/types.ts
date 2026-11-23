export type Language = 'en' | 'hi';

export type JobStage =
  | 'Lead'
  | 'Survey done'
  | 'Documents submitted'
  | 'Approval pending'
  | 'Approved'
  | 'Installed'
  | 'Commissioned';

export interface DocItem {
  id: string;
  name: string;
  isDone: boolean;
}

export interface Job {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  systemKw: number;
  stage: JobStage;
  daysSinceUpdate: number;
  documents: DocItem[];
  notes?: string;
  createdAt: string;
}

export type JobsPerMonth = 'under_10' | '10_to_30' | 'over_30';

export interface InterestSubmission {
  name: string;
  phone: string;
  city: string;
  jobsPerMonth: JobsPerMonth;
  language: Language;
}
