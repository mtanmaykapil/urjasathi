import centralData from './guide/central.json';
import statesData from './guide/states.json';
import { CentralGuideData, StateGuideEntry } from './guide/schema';

/**
 * Retrieves central rooftop solar guidance and subsidy structure.
 */
export const getCentralGuide = async (): Promise<CentralGuideData> => {
  return centralData as unknown as CentralGuideData;
};

/**
 * Retrieves all 28 states and 8 union territories.
 */
export const getAllStates = async (): Promise<StateGuideEntry[]> => {
  return statesData as unknown as StateGuideEntry[];
};

/**
 * Retrieves a specific state or UT by slug ID.
 */
export const getStateById = async (id: string): Promise<StateGuideEntry | null> => {
  const match = (statesData as unknown as StateGuideEntry[]).find(
    (s) => s.id.toLowerCase() === id.toLowerCase()
  );
  return match || null;
};

/**
 * Returns verification completeness summary across all states and UTs.
 */
export const getGuideStatusSummary = async (): Promise<{
  total: number;
  verifiedCount: number;
  notVerifiedCount: number;
  states: StateGuideEntry[];
}> => {
  const states = statesData as unknown as StateGuideEntry[];
  const verifiedCount = states.filter((s) => s.status === 'verified').length;
  return {
    total: states.length,
    verifiedCount,
    notVerifiedCount: states.length - verifiedCount,
    states,
  };
};

/**
 * Calculates estimated Central residential subsidy.
 * Formula:
 * - 30,000 per kW for first 2 kW
 * - 18,000 per kW for additional capacity up to 3 kW
 * - Total capped at 78,000 for systems >= 3 kW
 */
export const calculateEstimatedSubsidy = (kw: number): number => {
  if (kw <= 0) return 0;
  if (kw >= 3) return 78000;
  
  const first2Kw = Math.min(kw, 2);
  const additionalKw = Math.max(0, Math.min(kw, 3) - 2);
  
  return first2Kw * 30000 + additionalKw * 18000;
};
