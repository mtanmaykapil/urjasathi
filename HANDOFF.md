# UrjaSaathi - Backend Integration & Engineering Handoff

This document provides complete instructions for an engineer or AI assistant integrating a persistent database backend (e.g. Supabase, PostgreSQL) into UrjaSaathi.

---

## 1. Product Summary & Architecture

- **Target User:** Small rooftop solar installers in tier-2 and tier-3 Indian cities installing 5–30 kW residential systems.
- **Core Value Proposition:** Single-screen job tracker from Lead to Commissioning, proactive stuck-job flags (>7 days without progress in DISCOM approval queues), and one-tap WhatsApp status updates for homeowners.
- **Architecture Philosophy:** The frontend is decoupled from persistence. All data operations flow through cleanly isolated API adapters in `src/data/` and `src/analytics.ts`. UI components never call backend SDKs directly.

---

## 2. Integration Touchpoints

### A. Lead Capture Integration
- **File:** `src/data/interestApi.ts`
- **Function:** `submitInterest(data: InterestSubmission): Promise<{ success: boolean }>`
- **Current Behavior:** Rejects with `Error("Backend not connected yet")` after a 600ms delay.
- **Target Backend Table:** `interest_signups`
- **Input Payload:**
  ```typescript
  {
    name: string;        // e.g. "Rahul Mehta"
    phone: string;       // 10 digits, validated e.g. "9876543210"
    city: string;        // e.g. "Nashik, Maharashtra"
    jobsPerMonth: 'under_10' | '10_to_30' | 'over_30';
    language: 'en' | 'hi';
  }
  ```
- **Security Requirement:** 
  - Anonymous `INSERT` only via public anon key.
  - Zero `SELECT`, `UPDATE`, or `DELETE` permissions for the anon role.
  - Never expose installer leads to public client queries.

### B. Anonymous Analytics Integration
- **File:** `src/analytics.ts`
- **Function:** `track(eventName: AnalyticsEvent, metadata?: Record<string, unknown>): void`
- **Current Behavior:** Logs events to `console.log`.
- **Target Backend Table:** `events`
- **Schema:**
  ```sql
  create table events (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    language text not null,
    metadata jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );
  ```
- **Tracked Events:**
  - `page_view`
  - `demo_try_click`
  - `demo_job_opened`
  - `demo_stage_changed`
  - `whatsapp_click`
  - `interest_form_submitted`
- **Security Requirement:** Anonymous `INSERT` only. Zero personal identifying data (no IPs, no cookies, no canvas fingerprints).

### C. Real App Job Board (Next Stage)
- **File:** `src/data/jobsApi.ts`
- **Functions:**
  - `listJobs(): Promise<Job[]>`
  - `addJob(data): Promise<Job>`
  - `updateJobStage(jobId: string, stage: JobStage): Promise<Job>`
  - `toggleDoc(jobId: string, docId: string): Promise<Job>`
  - `resetJobs(): Promise<Job[]>`
- **Target Database Tables (v1 Schema):**
  1. `installers` (id uuid primary key, business_name text, phone text, created_at timestamptz)
  2. `jobs` (id uuid primary key, installer_id uuid references installers, customer_name text, phone text, city text, system_kw numeric, stage text, notes text, updated_at timestamptz, created_at timestamptz)
  3. `job_documents` (id uuid primary key, job_id uuid references jobs, name text, is_done boolean)
- **Row-Level Security (RLS):** Every row must enforce `installer_id = auth.uid()`.

---

## 3. Core TypeScript Types (`src/types.ts`)

```typescript
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
```

---

## 4. Non-Negotiable Engineering Rules

1. **Scope Discipline:** Do NOT build admin dashboards, complex CRM features, or inventory management until 10 paying installers actively use the basic board weekly.
2. **Zero Government Misrepresentation:** Never hardcode national solar subsidy amounts or portal procedures as undisputed facts. Always label requirements as "Sample checklist" and disclaim government affiliation.
3. **No Secrets in Repo:** Backend API keys must be loaded via Vite environment variables (`import.meta.env.VITE_SUPABASE_URL`, `import.meta.env.VITE_SUPABASE_ANON_KEY`).
4. **Mobile Performance:** Keep JavaScript payload minimal. Avoid importing heavyweight component libraries. Target budget Android devices (Chrome on Android 9+).

---

## 5. Known Limitations of Current Stage

- **In-Memory Demo State:** Reloading the browser restores the 6 seeded sample jobs.
- **Manual WhatsApp Redirect:** Message triggers rely on `wa.me` browser intents rather than server-side WhatsApp Business API webhooks.
- **Simulated Form Rejection:** The interest form intentionally fails until environment variables and Supabase tables are configured.

---

## 6. Suggested Next Steps (Priority Order)

1. **Connect Supabase for Leads:**
   - Create Supabase project.
   - Run SQL migration for `interest_signups` and `events` with public insert-only RLS policies.
   - Replace rejection in `src/data/interestApi.ts` with direct POST fetch.
2. **Native Hindi Review:**
   - Review strings flagged with `// REVIEW: native check` in `src/i18n/hi.ts` with a native speaker operating in solar installations.
3. **Add Supabase Auth (Stage 1):**
   - Add phone OTP authentication (or email magic link) for installers.
   - Wire `src/data/jobsApi.ts` to authenticated Supabase REST endpoints.
4. **Deploy to Vercel/Netlify:**
   - Connect GitHub repository. Set environment variables in deployment dashboard.
