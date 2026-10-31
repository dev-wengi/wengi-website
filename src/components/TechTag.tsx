import React from 'react'

export interface TechTagProps {
  label: string
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Outlined pill tag for project technologies
 * - Font: "Exo 2" 600
 * - Size: 16px (14px on mobile)
 * - Padding: 8px 14px
 * - Border: 1.5px solid #1A1A1A
 */
export const TechTag: React.FC<TechTagProps> = ({
  label,
  tone = 'light',
  className = '',
}) => {
  const toneClasses =
    tone === 'dark'
      ? 'border-white/55 text-white'
      : 'border-[#1A1A1A] text-[#0A0A0A] hover:border-[var(--green-highlight,#6CF05A)] hover:bg-[var(--green-highlight,#6CF05A)] hover:text-black'

  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full border font-exo font-semibold transition-colors duration-200 ${
        tone === 'dark'
          ? 'border-white/55 px-3 py-1.5 text-[13px] text-white'
          : 'border-[1.5px] px-3.5 py-1.5 text-[14px] text-[#0A0A0A] sm:px-3.5 sm:py-2 sm:text-[16px]'
      } ${toneClasses} ${className}`}
    >
      {label}
    </span>
  )
}
