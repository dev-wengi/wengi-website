import React from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'

export interface MissionProps {
  className?: string
}

/**
 * Mission band below Vision (per Frame 8 design).
 * - Full-bleed developer photo with dark overlay and green wash rising
 *   from the bottom edge
 * - Centered "Our Mission" heading, statement, and CTA
 */
export const Mission: React.FC<MissionProps> = ({ className = '' }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className={`relative flex w-full items-center justify-center overflow-hidden px-6 py-28 sm:py-36 ${className}`}
    >
      {/* Background photo */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/vision-collab.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,10,7,0.88) 0%, rgba(6,10,7,0.62) 50%, rgba(6,10,7,0.78) 100%)',
        }}
      />

      {/* Green wash rising from the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,255,60,0) 40%, rgba(5,255,60,0.16) 75%, rgba(5,255,60,0.32) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[680px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="w-full">
            <SectionHeading
              id="mission-heading"
              before="Our"
              highlight="Mission"
              align="center"
              className="mb-0"
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[560px] font-sans text-[17px] font-normal leading-relaxed text-white/90 sm:text-[20px]"
          >
            Learn by doing, work on real codebases, and grow through feedback.
            You are aiming for progress, not perfection.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <Link
              to="/#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand,#05FF3C)] px-9 font-exo text-[16px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Mission
