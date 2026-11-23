// Configuration constants for UrjaSaathi
// Replace placeholder values before real deployment.

// CLEAR PLACEHOLDER: Replace with actual founder or business WhatsApp number (country code + 10 digits)
export const WHATSAPP_NUMBER = '919876543210';

export const SITE_NAME = 'UrjaSaathi';

// Threshold in days after which an inactive job is tagged as "Stuck"
export const STUCK_DAYS = 7;

export const DEFAULT_PREFILLED_MESSAGE = 'Hi, I want to try UrjaSaathi';

export const getWhatsAppUrl = (number: string = WHATSAPP_NUMBER, message: string = DEFAULT_PREFILLED_MESSAGE): string => {
  const cleanNumber = number.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};
