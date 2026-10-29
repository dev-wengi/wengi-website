/**
 * FooterColumn.tsx
 * One navigation column in the footer link grid.
 * Heading in Exo 2 UPPERCASE with var(--footer-label) color.
 * Links in Inter 400 white, hover: underline slides from left + nudge 2px right.
 */

import React from 'react'
import { motion } from 'framer-motion'
import type { FooterColumn as FooterColumnData } from '../data/footer'

export interface FooterColumnProps {
  column: FooterColumnData
  className?: string
}



export const FooterColumn: React.FC<FooterColumnProps> = ({ column, className = '' }) => {
  return (
    <nav
      aria-label={column.heading}
      className={`flex flex-col gap-0 ${className}`}
    >
      {/* Column heading */}
      <h3
        className="font-exo font-semibold text-[13px] uppercase mb-5 tracking-[0.22em]"
        style={{ color: 'var(--footer-label, #6CF05A)' }}
      >
        {column.heading}
      </h3>

      {/* Links */}
      <ul className="flex flex-col" style={{ gap: '14px' }} role="list">
        {column.links.map((link) => (
          <li key={link.id ?? link.label}>
            <motion.a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group relative inline-flex items-center font-sans font-normal text-[18px] text-white transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-blue,#000000)] rounded-sm"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              {/* Slide-in underline */}
              <span
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-200 ease-out"
                style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                aria-hidden="true"
              />
              {link.label}
            </motion.a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterColumn
