import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cardVariant, defaultViewport } from '../styles/motion'

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'light' | 'dark'
  radius?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  overlap?: boolean // if true, adds negative margin / overlap behavior
  children: React.ReactNode
  className?: string
}

/**
 * Reusable Card component supporting the alternating design rhythm:
 * - "light": Large rounded white card (border-radius 32-40px, soft shadow)
 * - "dark": Dark card (border-radius 24-32px, subtle 1px border, dark shadow)
 */
export const Card: React.FC<CardProps> = ({
  variant = 'dark',
  radius = 'md',
  interactive = false,
  overlap = false,
  children,
  className = '',
  ...props
}) => {
  // Radius mapping
  const radiusMap = {
    sm: 'rounded-[20px] md:rounded-[24px]',
    md: 'rounded-[24px] md:rounded-[32px]',
    lg: 'rounded-[32px] md:rounded-[40px]',
  }[radius]

  // Variant styling
  const variantStyles = {
    light:
      'bg-white text-[#1A1A1A] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)] border-0',
    dark:
      'bg-[#1E1E1E] text-white border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
  }[variant]

  const interactiveStyles = interactive
    ? 'transition-all duration-300 hover:-translate-y-1 hover:border-[var(--green-highlight,#6CF05A)]/40 hover:shadow-[0_20px_40px_-10px_rgba(108,240,90,0.15)]'
    : ''

  const overlapStyles = overlap
    ? '-mt-12 md:-mt-20 relative z-10'
    : 'relative z-0'

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={`p-6 sm:p-8 lg:p-10 ${radiusMap} ${variantStyles} ${interactiveStyles} ${overlapStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.div>
  )
}
