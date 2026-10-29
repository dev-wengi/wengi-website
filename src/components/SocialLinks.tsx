/**
 * SocialLinks.tsx
 * 4 square icon buttons for GitHub, Twitter/X, LinkedIn, YouTube.
 * 48×48px, border-radius 12px, white SVG icon.
 * Hover: white bg + dark icon, lift 2px.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, type SocialIconLink } from '../data/footer'

export interface SocialLinksProps {
  links?: SocialIconLink[]
  className?: string
}

const SocialButton: React.FC<{ link: SocialIconLink }> = ({ link }) => (
  <motion.a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.label}
    className="group relative inline-flex items-center justify-center w-12 h-12 rounded-xl border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-blue,#000000)]"
    style={{
      background: 'rgba(255,255,255,0.12)',
      borderColor: 'var(--footer-line, rgba(255,255,255,0.25))',
    }}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.15 }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement
      el.style.background = '#FFFFFF'
      const svg = el.querySelector('svg') as SVGElement | null
      if (svg) svg.style.color = 'var(--footer-blue, #000000)'
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement
      el.style.background = 'rgba(255,255,255,0.12)'
      const svg = el.querySelector('svg') as SVGElement | null
      if (svg) svg.style.color = '#FFFFFF'
    }}
  >
    <svg
      viewBox={link.viewBox ?? '0 0 24 24'}
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden="true"
      style={{ color: '#FFFFFF', transition: 'color 0.15s' }}
    >
      <path d={link.iconPath} />
    </svg>
  </motion.a>
)

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links = SOCIAL_LINKS,
  className = '',
}) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {links.map((link) => (
      <SocialButton key={link.id} link={link} />
    ))}
  </div>
)

export default SocialLinks
