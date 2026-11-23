import { Job, JobStage, DocItem } from '../types';

export const DEFAULT_CHECKLIST: DocItem[] = [
  { id: 'doc-1', name: 'ID proof', isDone: false },
  { id: 'doc-2', name: 'Electricity bill', isDone: false },
  { id: 'doc-3', name: 'Property ownership proof', isDone: false },
  { id: 'doc-4', name: 'Bank details', isDone: false },
  { id: 'doc-5', name: 'Site photos', isDone: false },
  { id: 'doc-6', name: 'Signed application', isDone: false },
];

export const INITIAL_SAMPLE_JOBS: Job[] = [
  {
    id: 'job-1',
    customerName: 'Ramesh Sharma',
    phone: '9876501234',
    city: 'Jaipur',
    systemKw: 3,
    stage: 'Approval pending',
    daysSinceUpdate: 11, // Stuck (>7 days)
    documents: [
      { id: 'doc-1', name: 'ID proof', isDone: true },
      { id: 'doc-2', name: 'Electricity bill', isDone: true },
      { id: 'doc-3', name: 'Property ownership proof', isDone: true },
      { id: 'doc-4', name: 'Bank details', isDone: true },
      { id: 'doc-5', name: 'Site photos', isDone: true },
      { id: 'doc-6', name: 'Signed application', isDone: true },
    ],
    notes: 'File submitted to DISCOM sub-division. Feasibility clearance awaited.',
    createdAt: '2026-11-05T10:00:00Z',
  },
  {
    id: 'job-2',
    customerName: 'Vikram Patel',
    phone: '9876505678',
    city: 'Ahmedabad',
    systemKw: 5,
    stage: 'Documents submitted',
    daysSinceUpdate: 9, // Stuck (>7 days)
    documents: [
      { id: 'doc-1', name: 'ID proof', isDone: true },
      { id: 'doc-2', name: 'Electricity bill', isDone: true },
      { id: 'doc-3', name: 'Property ownership proof', isDone: false },
      { id: 'doc-4', name: 'Bank details', isDone: true },
      { id: 'doc-5', name: 'Site photos', isDone: false },
      { id: 'doc-6', name: 'Signed application', isDone: true },
    ],
    notes: 'Missing updated property tax receipt. Need to collect from customer.',
    createdAt: '2026-11-08T11:30:00Z',
  },
  {
    id: 'job-3',
    customerName: 'Sunita Devi',
    phone: '9876509012',
    city: 'Patna',
    systemKw: 4,
    stage: 'Installed',
    daysSinceUpdate: 2,
    documents: [
      { id: 'doc-1', name: 'ID proof', isDone: true },
      { id: 'doc-2', name: 'Electricity bill', isDone: true },
      { id: 'doc-3', name: 'Property ownership proof', isDone: true },
      { id: 'doc-4', name: 'Bank details', isDone: true },
      { id: 'doc-5', name: 'Site photos', isDone: true },
      { id: 'doc-6', name: 'Signed application', isDone: true },
    ],
    notes: 'Panels mounted and inverter connected. Net meter inspection pending.',
    createdAt: '2026-11-12T14:15:00Z',
  },
  {
    id: 'job-4',
    customerName: 'Amit Verma',
    phone: '9876503456',
    city: 'Lucknow',
    systemKw: 10,
    stage: 'Survey done',
    daysSinceUpdate: 3,
    documents: [
      { id: 'doc-1', name: 'ID proof', isDone: true },
      { id: 'doc-2', name: 'Electricity bill', isDone: true },
      { id: 'doc-3', name: 'Property ownership proof', isDone: false },
      { id: 'doc-4', name: 'Bank details', isDone: false },
      { id: 'doc-5', name: 'Site photos', isDone: true },
      { id: 'doc-6', name: 'Signed application', isDone: false },
    ],
    notes: 'Shadow analysis completed. 10kW structure placement approved.',
    createdAt: '2026-11-16T09:00:00Z',
  },
  {
    id: 'job-5',
    customerName: 'Rajesh Kulkarni',
    phone: '9876507890',
    city: 'Pune',
    systemKw: 6,
    stage: 'Approved',
    daysSinceUpdate: 1,
    documents: [
      { id: 'doc-1', name: 'ID proof', isDone: true },
      { id: 'doc-2', name: 'Electricity bill', isDone: true },
      { id: 'doc-3', name: 'Property ownership proof', isDone: true },
      { id: 'doc-4', name: 'Bank details', isDone: true },
      { id: 'doc-5', name: 'Site photos', isDone: true },
      { id: 'doc-6', name: 'Signed application', isDone: true },
    ],
    notes: 'DISCOM approval letter received. Structure delivery dispatched.',
    createdAt: '2026-11-18T16:00:00Z',
  },
  {
    id: 'job-6',
    customerName: 'Priya Nair',
    phone: '9876502345',
    city: 'Kochi',
    systemKw: 3,
    stage: 'Lead',
    daysSinceUpdate: 4,
    documents: [
      { id: 'doc-1', name: 'ID proof', isDone: false },
      { id: 'doc-2', name: 'Electricity bill', isDone: true },
      { id: 'doc-3', name: 'Property ownership proof', isDone: false },
      { id: 'doc-4', name: 'Bank details', isDone: false },
      { id: 'doc-5', name: 'Site photos', isDone: false },
      { id: 'doc-6', name: 'Signed application', isDone: false },
    ],
    notes: 'Initial quotation shared. Customer evaluating 3kW on-grid system.',
    createdAt: '2026-11-19T13:45:00Z',
  },
];

// In-memory store for client-side demo state
let memoryJobs: Job[] = JSON.parse(JSON.stringify(INITIAL_SAMPLE_JOBS));

/**
 * Lists all jobs.
 */
export const listJobs = async (): Promise<Job[]> => {
  return JSON.parse(JSON.stringify(memoryJobs));
};

/**
 * Adds a new job to client state.
 */
export const addJob = async (newJobData: {
  customerName: string;
  phone: string;
  city: string;
  systemKw: number;
  notes?: string;
}): Promise<Job> => {
  const newJob: Job = {
    id: `job-${Date.now()}`,
    customerName: newJobData.customerName,
    phone: newJobData.phone,
    city: newJobData.city,
    systemKw: newJobData.systemKw,
    stage: 'Lead',
    daysSinceUpdate: 0,
    documents: DEFAULT_CHECKLIST.map((doc) => ({ ...doc })),
    notes: newJobData.notes || '',
    createdAt: new Date().toISOString(),
  };

  memoryJobs = [newJob, ...memoryJobs];
  return JSON.parse(JSON.stringify(newJob));
};

/**
 * Updates stage of a job and resets daysSinceUpdate to 0.
 */
export const updateJobStage = async (jobId: string, stage: JobStage): Promise<Job> => {
  const index = memoryJobs.findIndex((j) => j.id === jobId);
  if (index === -1) {
    throw new Error(`Job not found: ${jobId}`);
  }

  memoryJobs[index] = {
    ...memoryJobs[index],
    stage,
    daysSinceUpdate: 0,
  };

  return JSON.parse(JSON.stringify(memoryJobs[index]));
};

/**
 * Toggles a document's status in a job checklist.
 */
export const toggleDoc = async (jobId: string, docId: string): Promise<Job> => {
  const index = memoryJobs.findIndex((j) => j.id === jobId);
  if (index === -1) {
    throw new Error(`Job not found: ${jobId}`);
  }

  const updatedDocs = memoryJobs[index].documents.map((doc) =>
    doc.id === docId ? { ...doc, isDone: !doc.isDone } : doc
  );

  memoryJobs[index] = {
    ...memoryJobs[index],
    documents: updatedDocs,
  };

  return JSON.parse(JSON.stringify(memoryJobs[index]));
};

/**
 * Resets the in-memory state back to the original 6 sample jobs.
 */
export const resetJobs = async (): Promise<Job[]> => {
  memoryJobs = JSON.parse(JSON.stringify(INITIAL_SAMPLE_JOBS));
  return JSON.parse(JSON.stringify(memoryJobs));
};
