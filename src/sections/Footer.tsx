/**
 * sections/Footer.tsx
 * Section 6: Footer — black background with editorial content, navigation,
 * and a bottom bar.
 *
 * Structure (top → bottom):
 *  A) PixelField — pixel edge sits in reserved space above the footer
 *  B) Editorial header row — numbered label, large thin heading, 2 text blocks
 *  C) Footer links — brand | Company | Resources | Community | Follow + Newsletter
 *  D) Bottom bar — copyright | legal links | Made with ♥
 *
 * All other elements: Framer Motion whileInView fade+slideUp, stagger 0.08s.
 * prefers-reduced-motion: skip all motion.
 */

import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { PixelField } from '../components/PixelField'
import { FooterColumn } from '../components/FooterColumn'
import { SocialLinks } from '../components/SocialLinks'
import { FooterNewsletter } from '../components/FooterNewsletter'
import { Logo } from '../components/Logo'
import { FOOTER_COLUMNS, LEGAL_LINKS } from '../data/footer'

// ─── Props ───────────────────────────────────────────────────────────────────

export interface FooterSectionProps {
  heading?: [string, string]
  className?: string
}

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay },
  }),
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Heart SVG (inline, footer-label colour) */
const HeartIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="currentColor"
    aria-label="love"
    role="img"
    style={{ color: 'var(--footer-label, #6CF05A)', display: 'inline', verticalAlign: 'middle' }}
  >
    <path d="M7 12.5S1 8.5 1 4.5A3.5 3.5 0 017 2.58 3.5 3.5 0 0113 4.5c0 4-6 8-6 8z" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

export const FooterSection: React.FC<FooterSectionProps> = ({
  heading = ['LEARN BY BUILDING.', 'GROW TOGETHER.'],
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion()
  const year = new Date().getFullYear()

  const animProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          variants: fadeUp,
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, amount: 0.1 },
          custom: delay,
        }

  const containerAnimProps = shouldReduceMotion
    ? {}
    : {
        variants: staggerContainer,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.05 },
      }

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className={`relative w-full overflow-x-clip ${className}`}
      style={{
        backgroundColor: 'var(--footer-blue, #000000)',
      }}
    >
      {/* Reserved space in Contact keeps the pixel edge clear of the newsletter. */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <PixelField seed={42} color="var(--footer-blue, #000000)" />
      </div>

      {/* ── A) EDITORIAL HEADER ROW ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 pt-14 sm:pt-16 lg:pt-20">
        {/* Top meta labels */}
        <motion.div
          className="flex items-center justify-between mb-8 sm:mb-10"
          {...animProps(0)}
        >
          <span
            className="font-exo font-normal text-[12px] uppercase tracking-[0.14em]"
            style={{ color: 'var(--footer-label, #6CF05A)' }}
          >
            [ 06 ]
          </span>
          <span
            className="font-exo font-normal text-[12px] uppercase tracking-[0.14em]"
            style={{ color: 'var(--footer-label, #6CF05A)' }}
          >
            Get in Touch
          </span>
        </motion.div>

        {/* Large thin heading */}
        <motion.div className="mb-12 sm:mb-14" {...animProps(0.06)}>
          <h2
            className="font-exo uppercase text-white text-left leading-[0.95] tracking-[0.02em]"
            style={{
              fontWeight: 200,
              fontSize: 'clamp(40px, 8vw, 120px)',
              letterSpacing: '0.02em',
            }}
          >
            {heading[0]}
            <br />
            {heading[1]}
          </h2>
        </motion.div>
      </div>

      {/* ── C) FOOTER LINKS ───────────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-[1280px] mx-auto w-full px-6"
        style={{ borderTop: '1px solid var(--footer-line, rgba(255,255,255,0.25))' }}
      >
        <motion.div
          className="pt-12 sm:pt-14 pb-0 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr_1.6fr] gap-y-12 md:gap-x-0"
          {...containerAnimProps}
        >
          {/* Brand column */}
          <motion.div
            className="flex flex-col gap-5 md:pr-10"
            variants={shouldReduceMotion ? {} : fadeUp}
            custom={0}
          >
            <Logo
              theme="onBlue"
              alt="Dev.wengi"
              imgClassName="h-10 w-auto object-contain block"
            />
            <p
              className="font-sans font-normal text-[15px] leading-relaxed"
              style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
            >
              Learn to code by building real projects with real people.
            </p>
            <p
              className="font-sans font-normal text-[15px] leading-relaxed -mt-3"
              style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
            >
              Follow a track, take on a challenge, and learn with the community.
            </p>
          </motion.div>

          {/* Thin vertical divider — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block w-px self-stretch mx-10"
            style={{ backgroundColor: 'var(--footer-line, rgba(255,255,255,0.25))' }}
          />

          {/* Navigation columns */}
          {FOOTER_COLUMNS.map((col, i) => (
            <motion.div
              key={col.id}
              className="md:px-6 first:md:pl-0"
              variants={shouldReduceMotion ? {} : fadeUp}
              custom={0.08 * (i + 1)}
            >
              <FooterColumn column={col} />
            </motion.div>
          ))}

          {/* Follow us + Stay updated */}
          <motion.div
            className="flex flex-col gap-8 md:pl-8"
            variants={shouldReduceMotion ? {} : fadeUp}
            custom={0.32}
          >
            {/* Follow us */}
            <div className="flex flex-col gap-5">
              <h3
                className="font-exo font-semibold text-[13px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--footer-label, #6CF05A)' }}
              >
                Follow Us
              </h3>
              <SocialLinks />
            </div>

            {/* Newsletter */}
            <FooterNewsletter />
          </motion.div>
        </motion.div>
      </div>

      {/* ── D) BOTTOM BAR ─────────────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-[1280px] mx-auto w-full px-6 mt-14"
        style={{ borderTop: '1px solid var(--footer-line, rgba(255,255,255,0.25))' }}
      >
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-7"
          {...animProps(0.1)}
        >
          {/* Copyright */}
          <p
            className="font-sans font-normal text-[15px] text-center sm:text-left"
            style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
          >
            © {year} Dev.wengi. All rights reserved.
          </p>

          {/* Legal links */}
          <nav aria-label="Legal" className="flex items-center gap-1">
            {LEGAL_LINKS.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && (
                  <span
                    className="font-sans text-[15px] select-none px-1"
                    style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
                    aria-hidden="true"
                  >
                    ·
                  </span>
                )}
                <a
                  href={link.href}
                  className="font-sans font-normal text-[15px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-blue,#000000)] rounded-sm"
                  style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      'var(--footer-muted, rgba(255,255,255,0.72))'
                  }}
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* Made with ♥ */}
          <p
            className="font-sans font-normal text-[15px] flex items-center gap-1.5"
            style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
          >
            Made with <HeartIcon />
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default FooterSection
