import React from 'react'
import { motion, type Variants } from 'framer-motion'

export interface FilterChipsProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  className?: string
}

/**
 * FilterChips Component
 * - Outlined pill buttons (1.5px border, Exo 2 600, 18px, padding 10px 32px)
 * - Active state: Green button background & border, white text
 * - Wraps naturally in a ~480px max-width container
 * - Stagger animation on load
 * - Fully accessible with keyboard navigation
 */
export const FilterChips: React.FC<FilterChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className = '',
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const chipVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      role="tablist"
      aria-label="Filter projects by category"
      className={`flex flex-wrap gap-x-3 gap-y-4 max-w-[480px] ${className}`}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category

        return (
          <motion.button
            key={category}
            variants={chipVariants}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(category)}
            className={`font-exo font-semibold text-[16px] sm:text-[18px] rounded-full px-6 sm:px-8 py-2 sm:py-2.5 transition-all duration-200 select-none cursor-pointer border-[1.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] ${
              isSelected
                ? 'bg-[var(--green-highlight,#6CF05A)] border-[var(--green-highlight,#6CF05A)] text-black shadow-sm'
                : 'bg-transparent border-[#1A1A1A] text-[#0A0A0A] hover:border-[var(--green-highlight,#6CF05A)] hover:text-[#0A0A0A] hover:-translate-y-[1px]'
            }`}
          >
            {category}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
