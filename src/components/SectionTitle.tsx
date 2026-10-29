import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, defaultViewport } from '../styles/motion'

export interface SectionTitleProps {
  label?: string
  numeral?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  theme?: 'dark' | 'light'
  isDisplay?: boolean // Uses Oswald uppercase display font if true, else Onest geometric heading
  className?: string
}

/**
 * Reusable SectionTitle component adhering to typography rules:
 * - Small label: 11-12px, UPPERCASE, letter-spacing 0.08em in bright green
 * - Numeral: "Exo 2" 500/600 in bright green
 * - Heading: "Oswald" 700 uppercase for display OR "Onest" 700 sentence-case
 * - Fluid clamp scale & Framer Motion scroll trigger
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  label,
  numeral,
  title,
  subtitle,
  align = 'left',
  theme = 'dark',
  isDisplay = false,
  className = '',
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align]

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'
  const subtitleColor = theme === 'dark' ? 'text-[#A8A8A8]' : 'text-[#8C8C8C]'

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={`flex flex-col max-w-3xl ${alignmentClass} ${className}`}
    >
      {/* Top Label & Optional Numeral */}
      {(label || numeral) && (
        <div className="flex items-center gap-2 mb-3">
          {numeral && (
            <span className="font-numeral text-[14px] md:text-[16px] font-semibold text-[var(--green-highlight,#6CF05A)] tracking-wider">
              {numeral}
            </span>
          )}
          {numeral && label && (
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-highlight,#6CF05A)]/60" />
          )}
          {label && (
            <span className="text-[11px] md:text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-[var(--green-highlight,#6CF05A)]">
              {label}
            </span>
          )}
        </div>
      )}

      {/* Main Heading */}
      <h2
        className={`${
          isDisplay
            ? 'heading-h1 font-display'
            : 'heading-h2 font-heading'
        } ${textColor} tracking-tight`}
      >
        {title}
      </h2>

      {/* Subtitle / Description */}
      {subtitle && (
        <p className={`mt-4 text-body ${subtitleColor} max-w-2xl leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
