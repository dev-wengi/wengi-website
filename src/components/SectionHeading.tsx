import React from 'react'
import { motion, type Variants } from 'framer-motion'

export interface SectionHeadingProps {
  before: string
  highlight: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  subtitleMaxWidth?: string
  id?: string
}

/**
 * Reusable SectionHeading component
 * Pattern: "White word + [green highlight word]"
 * Used in Our Vision, Our Mission, and future sections.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  before,
  highlight,
  subtitle,
  align = 'center',
  className = '',
  subtitleMaxWidth = 'max-w-[480px]',
  id,
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align]

  const motionVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={motionVariants}
      className={`flex flex-col ${alignClass} ${className}`}
    >
      <h2
        id={id}
        className="font-headline font-extrabold text-[32px] sm:text-[40px] md:text-[48px] tracking-[-0.02em] leading-tight text-white select-none"
      >
        {before}{' '}
        <span className="text-[var(--green-highlight,#6CF05A)] font-extrabold">
          {highlight}
        </span>
      </h2>

      {subtitle && (
        <p
          className={`mt-3 text-[16px] sm:text-[18px] text-white leading-[1.3] font-sans font-normal ${subtitleMaxWidth} ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
