import { InterestSubmission } from '../types';

/**
 * Submits an installer interest lead.
 * 
 * BACKEND INTEGRATION NOTE:
 * When Supabase or database backend is connected, replace this mock rejection with:
 * 
 * const response = await fetch(`${SUPABASE_URL}/rest/v1/interest_signups`, {
 *   method: 'POST',
 *   headers: {
 *     'apikey': SUPABASE_ANON_KEY,
 *     'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
 *     'Content-Type': 'application/json',
 *     'Prefer': 'return=minimal'
 *   },
 *   body: JSON.stringify({
 *     name: data.name,
 *     phone: data.phone,
 *     city: data.city,
 *     jobs_per_month: data.jobsPerMonth,
 *     language: data.language,
 *   })
 * });
 * if (!response.ok) throw new Error('Database insert failed');
 */
export const submitInterest = async (data: InterestSubmission): Promise<{ success: boolean }> => {
  // Simulate minimal network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log('[InterestApi] Interest submission received (client-side only):', data);

  // In this frontend-only phase, intentionally reject so user sees the fallback WhatsApp prompt
  return Promise.reject(new Error('Backend not connected yet'));
};
