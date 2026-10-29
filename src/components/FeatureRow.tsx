import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

export interface FeatureRowProps {
  image: string
  imageAlt?: string
  title: string
  text: string
  reverse?: boolean
  className?: string
}

/**
 * Terminal Prompt Icon Tile (54x54px, #6CF05A, rounded-[3px], black >_ glyph)
 */
export const TerminalIconTile: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`w-[54px] h-[54px] min-w-[54px] rounded-[3px] flex items-center justify-center shrink-0 shadow-sm ${className}`}
    style={{ backgroundColor: 'var(--green-highlight, #6CF05A)' }}
    aria-hidden="true"
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Terminal prompt chevron '>' with 3px stroke */}
      <path
        d="M5 7L13 14L5 21"
        stroke="#000000"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Terminal underscore '_' */}
      <line
        x1="16"
        y1="21"
        x2="24"
        y2="21"
        stroke="#000000"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  </div>
)

/**
 * Reusable FeatureRow Component for Vision Section
 * - 2-column layout (~435px each, ~70px gap, max 1000px)
 * - reverse={false}: Image Left, Text Right
 * - reverse={true}: Text Left, Image Right
 * - Mobile (<768px): Image ALWAYS on top, Text below, left-aligned
 * - 3:2 Aspect ratio image with 28px radius & hover zoom
 * - Motion: Image slides from its side, Text fades from opposite side
 */
export const FeatureRow: React.FC<FeatureRowProps> = ({
  image,
  imageAlt = 'Feature illustration',
  title,
  text,
  reverse = false,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion()

  // Directional slide calculation
  // Image: if on left (reverse=false), slides from -40; if on right (reverse=true), slides from +40
  const imageInitialX = shouldReduceMotion ? 0 : reverse ? 40 : -40
  // Text: opposite side
  const textInitialX = shouldReduceMotion ? 0 : reverse ? -40 : 40

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: imageInitialX },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  const textVariants: Variants = {
    hidden: { opacity: 0, x: textInitialX },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        delay: 0.1,
      },
    },
  }

  return (
    <div
      className={`w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[70px] items-center ${className}`}
    >
      {/* Image Block: Always order-1 on mobile, mirrored order on desktop */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`w-full flex justify-center order-1 ${
          reverse ? 'md:order-2 md:justify-end' : 'md:order-1 md:justify-start'
        }`}
      >
        <div className="w-full max-w-[435px] aspect-[3/2] rounded-[28px] overflow-hidden bg-neutral-900 group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Text Block: Always order-2 on mobile, mirrored order on desktop */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`w-full flex flex-col justify-center text-left order-2 ${
          reverse ? 'md:order-1 md:items-start' : 'md:order-2 md:items-start'
        }`}
      >
        <div className="w-full max-w-[435px]">
          {/* Header Row: Icon Tile + Title (16px gap, vertically centered) */}
          <div className="flex items-center gap-4">
            <TerminalIconTile />
            <h3 className="font-sans font-bold text-[20px] md:text-[22px] text-white leading-[1.15] max-w-[260px] tracking-tight">
              {title}
            </h3>
          </div>

          {/* Description Paragraph (30px gap below, 15px, line-height 1.2, max-w 360px) */}
          <p className="mt-[30px] text-[15px] text-white leading-[1.2] max-w-[360px] font-sans font-normal opacity-90">
            {text}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
