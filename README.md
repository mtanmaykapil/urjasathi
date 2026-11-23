# UrjaSaathi (ऊर्जा साथी)

A fast, mobile-first job tracking tool designed specifically for small rooftop solar installers in India. It helps installers manage each customer job from lead to commissioning, prevents files from getting stalled in DISCOM approvals, and enables one-tap WhatsApp status updates for homeowners.

---

## What This Version Does

1. **Product Explanation:** Clearly describes the daily administrative headaches of small solar installers (lost paperwork, endless customer phone calls, forgotten post-installation service) in plain, jargon-free words.
2. **Interactive Live Demo:** A fully working client-side demo running in browser memory:
   - 6 sample customer jobs with realistic Indian names and capacities (kW).
   - Real-time "Stuck jobs" counter highlighting projects inactive for > 7 days.
   - Stage progression from Lead to Commissioned.
   - Document checklist for DISCOM feasibility readiness ("X of Y ready").
   - One-tap WhatsApp update generator using `wa.me` links with stage-specific customer templates.
   - Search by name/phone, filtering by stage, and "Add sample job" capability.
3. **Bilingual Support (English & Hindi):** Instant language switching in the header with natural conversational Hindi translations.
4. **Early Interest Capture & Contact:** Direct WhatsApp link and a lead capture form with 10-digit Indian mobile validation.
5. **Privacy Note:** Plain-language draft explaining data handling and deletion rights.

---

## What Is Intentionally NOT Built Yet (Phase 0 Scope Discipline)

- **No backend database:** The interactive demo runs purely in client-side state.
- **No user authentication or login:** No installer accounts or passwords yet.
- **No admin dashboard:** Customer leads will be viewed directly in the database dashboard once connected.
- **No pricing or payment gateway:** Prices remain hypotheses until demand is validated.
- **No hardcoded government subsidies or state-specific schemes:** Subsidies vary by state and DISCOM; no claims of government affiliation are made.

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (configured for warm white, soft-yellow surfaces, deep green primary, and warning orange)
- **Icons:** Inline SVG / Lucide React
- **Internationalization:** Custom lightweight React Context hook (`useT`) with zero runtime overhead

---

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or pnpm

### Running Locally
```bash
# Navigate to the project root
cd F:\UrjaSaathi

# Run the development server
npm run dev
```
Open `http://localhost:5173` in your browser (use mobile device emulation at 360px width to view the target installer experience).

### Production Build
```bash
npm run build
```
This produces an optimized production bundle in the `dist/` directory.

---

## Folder Structure

```
F:\UrjaSaathi/
├── index.html                   # Entry HTML with SEO meta tags & favicon
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Warm theme tokens & 44px tap targets
├── tsconfig.json                # TypeScript root configuration
├── vite.config.ts               # Vite bundler configuration
├── src/
│   ├── main.tsx                 # React DOM mount with I18nProvider
│   ├── App.tsx                  # Single-page layout with section order
│   ├── config.ts                # Site name, WhatsApp number placeholder, stuck days
│   ├── types.ts                 # Job, JobStage, DocItem, InterestSubmission types
│   ├── analytics.ts             # Anonymous event tracking interface
│   ├── index.css                # Base Tailwind imports & CSS theme tokens
│   ├── data/
│   │   ├── jobsApi.ts           # Job CRUD operations (in-memory for demo)
│   │   └── interestApi.ts       # Interest lead submission interface
│   ├── i18n/
│   │   ├── index.tsx            # I18nProvider and useT() hook
│   │   ├── en.ts                # English text dictionary
│   │   └── hi.ts                # Hindi text dictionary (with native review tags)
│   ├── components/
│   │   ├── Button.tsx           # Primary, secondary, whatsapp button variants
│   │   ├── Card.tsx             # Surface containers
│   │   ├── Badge.tsx            # Status & stuck badges
│   │   ├── Section.tsx          # Standard container layout
│   │   ├── SectionHeading.tsx   # Consistent section headings
│   │   ├── Header.tsx           # Sticky nav with mobile drawer & language toggle
│   │   └── Footer.tsx           # Govt disclaimer & privacy link
│   ├── sections/
│   │   ├── HeroSection.tsx      # Main headline & dual CTAs
│   │   ├── ProblemSection.tsx   # Three pain points (no fake stats)
│   │   ├── DemoSection.tsx      # Main interactive demo board
│   │   ├── HowItWorksSection.tsx# 4-step stepper (desktop/mobile responsive)
│   │   ├── ComingSoonSection.tsx# Unbuilt pipeline features
│   │   ├── ContactSection.tsx   # WhatsApp CTA & interest form
│   │   └── demo/
│   │       ├── JobCard.tsx      # Individual job card with stuck flag
│   │       ├── JobDetailPanel.tsx# Detail view, checklist & WhatsApp updater
│   │       └── AddJobModal.tsx  # Add job form dialog with validation
│   └── pages/
│       └── PrivacyPage.tsx      # Plain-language draft privacy policy
└── HANDOFF.md                   # Technical guide for backend integration
```
