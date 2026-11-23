// Anonymous, privacy-friendly analytics stub
// Logs events to console in this stage. When the backend is plugged in,
// this function will send anonymous records to Supabase 'events' table.

export type AnalyticsEvent =
  | 'page_view'
  | 'demo_try_click'
  | 'demo_job_opened'
  | 'demo_stage_changed'
  | 'whatsapp_click'
  | 'interest_form_submitted';

export const track = (eventName: AnalyticsEvent, metadata?: Record<string, unknown>): void => {
  // Console logging for Phase 0 frontend validation
  console.log(`[Analytics Event] ${eventName}`, {
    timestamp: new Date().toISOString(),
    ...metadata,
  });
};
