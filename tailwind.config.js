/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          warm: '#FEFDF5',       // Primary soft-yellow page background
          cream: '#FFFBEB',      // Slightly deeper yellow surface (amber-50)
          card: '#FFFFFF',       // Clean card surface
          border: '#E2E8F0',     // Subtle border
          green: {
            DEFAULT: '#15803D',  // Deep forest green accent (green-700)
            hover: '#166534',    // Hover dark green (green-800)
            light: '#DCFCE7',    // Light green background (green-100)
          },
          orange: {
            DEFAULT: '#EA580C',  // Orange warning accent (orange-600)
            hover: '#C2410C',    // Darker orange (orange-700)
            light: '#FFEDD5',    // Light orange background (orange-100)
          },
          stuck: {
            bg: '#FEE2E2',       // Light red for stuck badge (red-100)
            text: '#B91C1C',     // Dark red text for stuck badge (red-700)
            border: '#FCA5A5',   // Stuck border (red-300)
          },
          whatsapp: {
            DEFAULT: '#25D366',  // WhatsApp brand green
            hover: '#128C7E',    // Darker WhatsApp green
            light: '#DCFCE7',    // Tinted WhatsApp pill
          },
          text: {
            primary: '#0F172A',   // High contrast slate-900
            secondary: '#334155', // Slate-700 readable body
            muted: '#64748B',     // Slate-500 helper text
          }
        }
      },
      minHeight: {
        tap: '44px',
      },
      minWidth: {
        tap: '44px',
      },
      borderRadius: {
        'touch': '10px',
      }
    },
  },
  plugins: [],
}
