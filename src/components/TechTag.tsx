import React from 'react'

export interface TechTagProps {
  label: string
  className?: string
}

/**
 * Outlined pill tag for project technologies
 * - Font: "Exo 2" 600
 * - Size: 16px (14px on mobile)
 * - Padding: 8px 14px
 * - Border: 1.5px solid #1A1A1A
 */
export const TechTag: React.FC<TechTagProps> = ({ label, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center font-exo font-semibold text-[14px] sm:text-[16px] text-[#0A0A0A] rounded-full px-3.5 py-1.5 sm:px-3.5 sm:py-2 select-none shrink-0 transition-colors duration-200 border-[1.5px] border-[#1A1A1A] hover:border-[var(--green-highlight,#6CF05A)] hover:bg-[var(--green-highlight,#6CF05A)] hover:text-black ${className}`}
    >
      {label}
    </span>
  )
}
