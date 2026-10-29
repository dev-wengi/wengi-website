import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion'

export interface MissionProps {
  headingBefore?: string
  headingHighlight?: string
  text?: string
  ctaText?: string
  ctaHref?: string
  onCtaClick?: () => void
  bgImageSrc?: string
  bgImageAlt?: string
  className?: string
}

/**
 * Section 2B: Our Mission
 * - Full-bleed background photo with blur (2px) and subtle parallax
 * - Seamless top-to-bottom dark-to-brand-green gradient overlay
 * - Centered text content with H2 ("Our [Mission]"), 24px statement paragraph
 * - "Get started now" pill button in the site-wide bright green
 */
export const Mission: React.FC<MissionProps> = ({
  headingBefore = 'Our',
  headingHighlight = 'Mission',
  text = 'Learn by doing, work on real codebases, and grow through feedback. You are aiming for progress, not perfection.',
  ctaText = 'Explore projects',
  ctaHref = '#projects',
  onCtaClick,
  bgImageSrc = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
  bgImageAlt = 'Tech community members collaborating around laptops',
  className = '',
}) => {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Subtle scroll parallax for the background image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-7%', '7%'],
  )

  // Motion variants with 0.1s stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={containerRef}
      id="mission"
      aria-labelledby="mission-heading"
      className={`relative w-full min-h-[480px] py-[90px] px-6 overflow-hidden flex items-center justify-center text-center ${className}`}
    >
      {/* Background Image with Parallax & Blur */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 -top-[10%] -bottom-[10%] w-full h-[120%] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src={bgImageSrc}
          alt={bgImageAlt}
          className="w-full h-full object-cover object-center filter blur-[2px] scale-105"
        />
      </motion.div>

      {/* Seamless Top-Dark to Bottom-Green Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-10"
        style={{
          background:
            'var(--mission-overlay, linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(108,240,90,0.75) 45%, rgba(108,240,90,0.85) 100%))',
        }}
        aria-hidden="true"
      />

      {/* Centered Content Block */}
      <div className="relative z-20 max-w-[640px] mx-auto w-full flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center w-full"
        >
          {/* H2: Our [Mission] */}
          <motion.h2
            id="mission-heading"
            variants={itemVariants}
            className="font-headline font-extrabold text-[32px] sm:text-[40px] md:text-[48px] tracking-[-0.02em] leading-tight text-white select-none"
          >
            {headingBefore}{' '}
            <span className="text-[var(--green-highlight,#6CF05A)] font-extrabold">
              {headingHighlight}
            </span>
          </motion.h2>

          {/* Statement Paragraph (24px gap, 24px on desktop, line-height 1.2) */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-[18px] sm:text-[21px] md:text-[24px] text-white leading-[1.2] font-sans font-normal opacity-95 select-none"
          >
            {text}
          </motion.p>

          {/* "Get started now" Pill Button (70px gap) */}
          <motion.div variants={itemVariants} className="mt-[50px] sm:mt-[70px] w-full sm:w-auto">
            <a
              href={ctaHref}
              onClick={onCtaClick}
              className="w-full sm:w-auto max-w-[320px] inline-flex items-center justify-center font-exo font-semibold text-[18px] sm:text-[20px] tracking-[0.02em] text-black rounded-full px-10 py-3.5 sm:py-4 transition-all duration-200 shadow-[0_8px_30px_rgba(108,240,90,0.45)] hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{
                backgroundColor: 'var(--green-highlight, #6CF05A)',
              }}
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Mission
