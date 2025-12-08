/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hollywood Noir Glamour palette
        'laiff-burgundy': '#9F1239',
        'laiff-gold': '#D4AF37',
        'laiff-coral': '#FF6B4A',
        'laiff-dark': '#0F0F0F',
        'laiff-cream': '#FDF8F3',
        'laiff-rose': '#FBE8E8',
        'laiff-midnight': '#1A1A2E',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'art-deco': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23D4AF37' stroke-opacity='0.1'/%3E%3C/svg%3E\")",
        'film-strip': "repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(212,175,55,0.1) 8px, rgba(212,175,55,0.1) 12px)",
      },
    },
  },
  plugins: [],
}
