/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': 'var(--brand, #05FF3C)',
        'brand-hover': 'var(--brand-hover, #04EB37)',
        'brand-ink': 'var(--brand-ink, #007D1B)',
        'brand-soft': 'var(--brand-soft, #E8FBEA)',
        'pine': 'var(--pine, #163520)',
        'pine-deep': 'var(--pine-deep, #0B170E)',
        'ink': 'var(--ink, #060A07)',
        'ink-raised': 'var(--ink-raised, #111713)',
        'paper': 'var(--paper, #FFFFFF)',

        'bg-dark': 'var(--bg-dark, #111713)',
        'bg-darker': 'var(--bg-darker, #060A07)',
        'surface-light': 'var(--surface-light, #FFFFFF)',
        'page-light': 'var(--page-light, #FFFFFF)',
        'green-neon': 'var(--green-neon, #05FF3C)',
        'green-brand': 'var(--green-brand, #05FF3C)',
        'green-deep': 'var(--green-deep, #05FF3C)',
        'text-on-dark': 'var(--text-on-dark, #FFFFFF)',
        'text-muted-dark': 'var(--text-muted-dark, #A7B1AB)',
        'text-on-light': 'var(--text-on-light, #060A07)',
        'text-muted-light': 'var(--text-muted-light, #57615B)',

        // Section 1: Dev.wengi Light Brand Extension Tokens
        'green-highlight': 'var(--green-highlight, #05FF3C)',
        'green-button': 'var(--green-button, #05FF3C)',
        'green-button-hover': 'var(--green-button-hover, #04EB37)',
        'nav-pill-bg': 'var(--nav-pill-bg, #EDF0EC)',
        'stats-bg': 'var(--stats-bg, rgba(17,23,19,0.94))',
        'stats-border': 'var(--stats-border, rgba(255,255,255,0.18))',
        'text-black': 'var(--text-black, #060A07)',

        // Section 2: Vision & Mission Dark Tokens
        'bg-black': 'var(--bg-black, #060A07)',
        'pixel-light': 'var(--pixel-light, #FFFFFF)',
        'pixel-dark': 'var(--pixel-dark, #060A07)',
        'pixel-digit': 'var(--pixel-digit, #9A9A9A)',
        'pixel-glow': 'var(--pixel-glow, rgba(5, 255, 60, 0.35))',
        'green-cta-light': 'var(--green-cta-light, #05FF3C)',

        // Section 3: Projects Tokens
        'bg-gray': 'var(--bg-gray, #E4E7E2)',
        'card-white': 'var(--card-white, #FFFFFF)',
        'chip-border': 'var(--chip-border, #060A07)',
        'green-live': 'var(--green-live, #05FF3C)',

        // Section 4: F.A.Qs Tokens
        'faq-border': 'var(--faq-border, #05FF3C)',
        'faq-dot': 'var(--faq-dot, #FFFFFF)',

        // Section 6: Footer Blue Field Tokens
        'footer-blue': 'var(--footer-blue, #060A07)',
        'footer-blue-deep': 'var(--footer-blue-deep, #060A07)',
        'footer-ink': 'var(--footer-ink, #FFFFFF)',
        'footer-label': 'var(--footer-label, #05FF3C)',
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
        'gradient-brand': 'linear-gradient(135deg, #05FF3C 0%, #04EB37 100%)',
        'mission-overlay': 'var(--mission-overlay, linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(5,255,60,0.75) 45%, rgba(5,255,60,0.85) 100%))',
      },
      boxShadow: {
        'card-light': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-brand': '0 0 40px -5px rgba(5, 255, 60, 0.5)',
        'glow-neon': '0 0 45px -5px rgba(5, 255, 60, 0.6)',
        'cta-glow': '0 8px 30px rgba(5, 255, 60, 0.45)',
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
