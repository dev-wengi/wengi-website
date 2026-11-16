/**
 * sections/Footer.tsx
 * Site footer shared by all pages: brand + socials, link columns,
 * newsletter mini form, and a bottom bar.
 */

import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FooterColumn } from '../components/FooterColumn'
import { SocialLinks } from '../components/SocialLinks'
import { FooterNewsletter } from '../components/FooterNewsletter'
import { Logo } from '../components/Logo'
import { FOOTER_COLUMNS, LEGAL_LINKS } from '../data/footer'

export interface FooterSectionProps {
  className?: string
}

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

export const FooterSection: React.FC<FooterSectionProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion()
  const year = new Date().getFullYear()

  const containerAnimProps = shouldReduceMotion
    ? {}
    : {
        variants: staggerContainer,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.05 },
      }

  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className={`relative w-full overflow-x-clip ${className}`}
      style={{ backgroundColor: 'var(--footer-blue, #060A07)' }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-14 sm:pt-16">
        <motion.div
          className="grid grid-cols-1 gap-y-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] lg:gap-x-8"
          {...containerAnimProps}
        >
          {/* Brand + socials */}
          <motion.div
            className="flex flex-col gap-5"
            variants={itemVariants}
            custom={0}
          >
            <Logo
              variant="horizontal"
              alt="Dev.wengi"
              imgClassName="h-10 w-auto object-contain block"
            />
            <p
              className="font-sans font-normal text-[13px] leading-relaxed max-w-[260px]"
              style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
            >
              Building Africa&apos;s next generation of tech professionals —
              together.
            </p>
            <SocialLinks />
          </motion.div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col, i) => (
            <motion.div
              key={col.id}
              variants={itemVariants}
              custom={0.08 * (i + 1)}
            >
              <FooterColumn column={col} />
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div variants={itemVariants} custom={0.32}>
            <FooterNewsletter />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6"
        style={{ borderTop: '1px solid var(--footer-line, rgba(255,255,255,0.25))' }}
      >
        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row sm:gap-4">
          <p
            className="font-sans font-normal text-[13px] text-center sm:text-left"
            style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
          >
            © {year} DevWengi. All rights reserved.
          </p>

          <nav aria-label="Legal" className="flex items-center gap-1">
            {LEGAL_LINKS.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && (
                  <span
                    className="font-sans text-[13px] select-none px-1"
                    style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
                    aria-hidden="true"
                  >
                    ·
                  </span>
                )}
                <Link
                  to={link.href}
                  className="font-sans font-normal text-[13px] transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-blue,#060A07)] rounded-sm"
                  style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          <p
            className="font-sans font-normal text-[13px] text-center sm:text-right"
            style={{ color: 'var(--footer-muted, rgba(255,255,255,0.72))' }}
          >
            Built in Kisumu · Made for learning together
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
