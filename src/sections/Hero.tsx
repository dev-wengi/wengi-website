import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { StatsBar, type StatItem } from '../components/StatsBar'

export interface HeroProps {
  headlinePart1?: string
  headlineHighlight1?: string
  headlineHighlight2?: string
  headlinePart2?: string
  headlinePart3?: string
  subtext?: string
  ctaText?: string
  ctaHref?: string
  onCtaClick?: () => void
  heroImageSrc?: string
  heroImageAlt?: string
  stats?: StatItem[]
  className?: string
}

/**
 * Section 1: Hero Section for Dev.wengi
 * - Light background
 * - 3-line tightly wrapped headline with green-highlight spans
 * - Subtext (max 640px, 18px, 1.4 line-height)
 * - "Subscribe to our newsletter" pill CTA button
 * - Rounded 36px hero photo with proper aspect ratio
 * - Floating glass stats bar overlapping bottom of the image
 * - Page-load sequence animations with Framer Motion
 */
export const Hero: React.FC<HeroProps> = ({
  headlinePart1 = 'Learn to',
  headlineHighlight1 = 'code',
  headlineHighlight2 = 'Build',
  headlinePart2 = 'real projects',
  headlinePart3 = 'with real people.',
  subtext = 'Follow a learning track, take on real-world projects and coding challenges, and grow through feedback from the community.',
  ctaText = 'Choose your learning path',
  ctaHref = '#learning-paths',
  onCtaClick,
  heroImageSrc = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80',
  heroImageAlt = 'Happy group of young diverse people in the Dev.wengi tech community outdoors',
  stats,
  className = '',
}) => {
  // Page load motion variants typed strictly with tuple curves
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

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

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: easeCurve,
      },
    },
  }

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeCurve,
      },
    },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeCurve,
      },
    },
  }

  return (
    <section
      className={`w-full bg-white pt-10 sm:pt-14 md:pt-18 lg:pt-20 pb-20 overflow-hidden ${className}`}
      aria-label="Introduction and community overview"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* H1: 3 Lines with Highlight Spans */}
          <h1 className="font-headline font-extrabold text-[42px] sm:text-[58px] md:text-[70px] lg:text-[82px] tracking-[-0.03em] leading-[0.95] text-[var(--text-black,#0A0A0A)] max-w-[760px] mx-auto select-none">
            {/* Line 1 */}
            <motion.span variants={lineVariants} className="block">
              {headlinePart1}{' '}
              <span className="text-[var(--green-highlight,#6CF05A)] font-extrabold">
                {headlineHighlight1}
              </span>
            </motion.span>

            {/* Line 2 */}
            <motion.span variants={lineVariants} className="block mt-1 sm:mt-2">
              <span className="text-[var(--green-highlight,#6CF05A)] font-extrabold">
                {headlineHighlight2}
              </span>{' '}
              {headlinePart2}
            </motion.span>

            {/* Line 3 */}
            <motion.span variants={lineVariants} className="block mt-1 sm:mt-2">
              {headlinePart3}
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 md:mt-7 text-[16px] sm:text-[18px] text-[var(--text-black,#0A0A0A)] max-w-[640px] mx-auto leading-[1.4] font-sans font-normal"
          >
            {subtext}
          </motion.p>

          {/* Pill CTA Button */}
          <motion.div variants={fadeUpVariants} className="mt-8">
            <a
              href={ctaHref}
              onClick={onCtaClick}
              className="inline-flex items-center justify-center font-exo font-semibold text-[18px] sm:text-[20px] tracking-[0.02em] text-black rounded-full px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_10px_25px_rgba(108,240,90,0.4)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2"
              style={{
                backgroundColor: 'var(--green-highlight, #6CF05A)',
              }}
            >
              {ctaText}
            </a>
          </motion.div>

          {/* Hero Image Container */}
          <motion.div
            variants={imageVariants}
            className="w-full max-w-[1140px] mt-12 sm:mt-14 relative"
          >
            <div className="w-full aspect-[4/3] sm:aspect-[2.25/1] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] bg-neutral-100">
              <img
                src={heroImageSrc}
                alt={heroImageAlt}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Overlapping Floating Stats Panel */}
            <div className="-mt-[50px] sm:-mt-[80px] md:-mt-[100px] lg:-mt-[110px] relative z-20">
              <StatsBar stats={stats} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
