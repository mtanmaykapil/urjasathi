export interface FactWithSource<T> {
  value: T;
  source_url: string | null;
  verified_on: string | null; // ISO Date string e.g. "2025-02-12" or "TO_BE_FILLED_BY_FOUNDER"
  verify_before_launch?: boolean;
}

export interface CentralSubsidyTier {
  kw_range: string;
  rate_per_kw: number;
  notes: string;
}

export interface CapacityGuidanceRow {
  units_range: string;
  recommended_kw: string;
}

export interface ProcessStep {
  step: number;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
}

export interface CentralGuideData {
  subsidy_structure: {
    first_2kw_rate: number; // 30000
    additional_3kw_rate: number; // 18000
    max_cap: number; // 78000
    source_url: string;
    verified_on: string;
    verify_before_launch: boolean;
  };
  capacity_guidance: {
    tiers: CapacityGuidanceRow[];
    source_url: string;
    verified_on: string;
  };
  high_level_process: {
    stages: ProcessStep[];
    source_url: string;
    verified_on: string;
    disclaimer: string;
  };
  official_portal_url: string;
}

export interface DiscomInfo {
  name: string;
  website: string;
}

export interface StateTopUp {
  status: 'not_verified' | 'none' | 'available';
  amount_text: string | null;
  source_url: string | null;
  verified_on: string | null;
}

export interface StateGuideEntry {
  id: string; // url slug e.g. "maharashtra"
  name_en: string;
  name_hi: string;
  is_union_territory: boolean;
  nodal_agency: string | null;
  state_portal_url: string | null;
  discoms: DiscomInfo[];
  net_metering_regulation_url: string | null;
  state_top_up: StateTopUp;
  notes: string | null;
  status: 'not_verified' | 'verified';
  last_verified?: string | null;
}
