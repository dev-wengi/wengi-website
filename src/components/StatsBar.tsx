import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, animate, useReducedMotion } from 'framer-motion'

export interface StatItem {
  number: number
  suffix?: string
  label: string
}

export interface StatsBarProps {
  stats?: StatItem[]
  className?: string
}

const DEFAULT_STATS: StatItem[] = [
  { number: 17, suffix: '', label: 'Real-world projects' },
  { number: 50, suffix: '', label: 'Coding challenges' },
  { number: 3, suffix: '', label: 'Learning tracks' },
]

/**
 * Animated Counter component that animates from 0 to target number on scroll reveal
 */
const AnimatedCounter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({
  target,
  suffix = '+',
  duration = 1.5,
}) => {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(elementRef, { once: true, margin: '-40px' })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target)
      return
    }

    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => setCount(Math.floor(latest)),
      })
      return () => controls.stop()
    }
  }, [isInView, target, duration, shouldReduceMotion])

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

/**
 * Floating Stats Panel Component:
 * - Overlaps hero image via negative margin
 * - Semi-transparent background: rgba(70,70,70,0.94)
 * - 1px border: rgba(255,255,255,0.18)
 * - Backdrop-blur 8px
 * - 3 equal columns with count-up animation
 */
export const StatsBar: React.FC<StatsBarProps> = ({
  stats = DEFAULT_STATS,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      className={`w-[92%] sm:w-[88%] lg:w-[86%] max-w-[980px] mx-auto rounded-[20px] sm:rounded-[24px] p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-20 ${className}`}
      style={{
        backgroundColor: 'var(--stats-bg, rgba(70,70,70,0.94))',
        border: '1px solid var(--stats-border, rgba(255,255,255,0.18))',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      role="region"
      aria-label="Dev.wengi learning resources"
    >
      <div className="grid grid-cols-3 divide-x divide-white/10 text-center items-center">
        {stats.map((item, index) => (
          <div key={index} className="px-2 sm:px-4 md:px-6 flex flex-col items-center justify-center">
            {/* Number: White, 700, 28px, Inter */}
            <div className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-white tracking-tight leading-none mb-1.5 sm:mb-2">
              <AnimatedCounter target={item.number} suffix={item.suffix} />
            </div>

            {/* Label: var(--green-highlight) #6CF05A, Exo 2 600, ~20px */}
            <div className="font-exo font-semibold text-[11px] sm:text-[14px] md:text-[17px] lg:text-[20px] text-[var(--green-highlight,#6CF05A)] tracking-[0.02em] leading-snug">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
