/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': 'var(--bg-dark, #1E1E1E)',
        'bg-darker': 'var(--bg-darker, #151515)',
        'surface-light': 'var(--surface-light, #FFFFFF)',
        'page-light': 'var(--page-light, #F2F2F2)',
        'green-neon': 'var(--green-neon, #6CF05A)',
        'green-brand': 'var(--green-brand, #6CF05A)',
        'green-deep': 'var(--green-deep, #6CF05A)',
        'text-on-dark': 'var(--text-on-dark, #FFFFFF)',
        'text-muted-dark': 'var(--text-muted-dark, #A8A8A8)',
        'text-on-light': 'var(--text-on-light, #1A1A1A)',
        'text-muted-light': 'var(--text-muted-light, #8C8C8C)',

        // Section 1: Dev.wengi Light Brand Extension Tokens
        'green-highlight': 'var(--green-highlight, #6CF05A)',
        'green-button': 'var(--green-button, #6CF05A)',
        'green-button-hover': 'var(--green-button-hover, #6CF05A)',
        'nav-pill-bg': 'var(--nav-pill-bg, #F3F4F6)',
        'stats-bg': 'var(--stats-bg, rgba(70,70,70,0.94))',
        'stats-border': 'var(--stats-border, rgba(255,255,255,0.18))',
        'text-black': 'var(--text-black, #0A0A0A)',

        // Section 2: Vision & Mission Dark Tokens
        'bg-black': 'var(--bg-black, #000000)',
        'green-cta-light': 'var(--green-cta-light, #6CF05A)',

        // Section 3: Projects Tokens
        'bg-gray': 'var(--bg-gray, #E2E2E2)',
        'card-white': 'var(--card-white, #FFFFFF)',
        'chip-border': 'var(--chip-border, #1A1A1A)',
        'green-live': 'var(--green-live, #6CF05A)',

        // Section 4: F.A.Qs Tokens
        'faq-border': 'var(--faq-border, #6CF05A)',
        'faq-dot': 'var(--faq-dot, #FFFFFF)',

        // Section 6: Footer Blue Field Tokens
        'footer-blue': 'var(--footer-blue, #101BFF)',
        'footer-blue-deep': 'var(--footer-blue-deep, #0A12CC)',
        'footer-ink': 'var(--footer-ink, #FFFFFF)',
        'footer-label': 'var(--footer-label, #6CF05A)',
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        headline: ['"Inter"', '"Inter Tight"', 'sans-serif'],
        display: ['"Oswald"', '"Roboto Condensed"', 'sans-serif'],
        heading: ['"Onest"', 'sans-serif'],
        numeral: ['"Exo 2"', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        body: ['"Inter"', '"Onest"', 'sans-serif'],
        sans: ['"Inter"', '"Onest"', 'sans-serif'],
      },
      borderRadius: {
        'card-sm': '24px',
        'card': '32px',
        'card-lg': '40px',
        'hero-img': '36px',
        'stats-panel': '24px',
        'feature-img': '28px',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6CF05A 0%, #6CF05A 100%)',
        'mission-overlay': 'var(--mission-overlay, linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(108,240,90,0.75) 45%, rgba(108,240,90,0.85) 100%))',
      },
      boxShadow: {
        'card-light': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-brand': '0 0 40px -5px rgba(108, 240, 90, 0.5)',
        'glow-neon': '0 0 45px -5px rgba(108, 240, 90, 0.6)',
        'cta-glow': '0 8px 30px rgba(108, 240, 90, 0.45)',
        'stats': '0 20px 50px rgba(0, 0, 0, 0.25)',
        'nav-capsule': 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      letterSpacing: {
        'tight-headline': '-0.03em',
        'label': '0.08em',
        'exo-btn': '0.02em',
      },
      maxWidth: {
        'content': '1280px',
        'hero-headline': '760px',
        'hero-subtext': '640px',
        'hero-image': '1140px',
        'stats-panel': '980px',
      },
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}
