import React from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { Faq } from '../data/faqs'

export interface FaqItemProps {
  faq: Faq
  isOpen: boolean
  onToggle: () => void
  className?: string
}

/**
 * Single FAQ Item Component
 * - Big numeral (~110px, Inter 900, #6CF05A) + white filled circular dot (~22px)
 * - Fixed width ~130px numeral block for alignment
 * - Question: Inter 700, 24px, line-height 1.15, max 760px
 * - Accessible accordion button inside <h3>
 * - Open answer box: 1.5px bright green border, 4px radius, 18px text, indented 130px
 */
export const FaqItem: React.FC<FaqItemProps> = ({
  faq,
  isOpen,
  onToggle,
  className = '',
}) => {
  const rowVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Two-digit numbers adapt font size slightly to fit smoothly
  const isTwoDigit = faq.id >= 10

  return (
    <motion.div
      variants={rowVariants}
      className={`w-full flex flex-col ${className}`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
          className="w-full flex items-center gap-3 sm:gap-6 lg:gap-8 group text-left cursor-pointer select-none py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          {/* LEFT: Numeral + White Dot (~130px fixed width on desktop) */}
          <div className="flex items-baseline shrink-0 w-[72px] sm:w-[100px] lg:w-[130px] select-none">
            <span
              className={`font-sans font-black ${
                isTwoDigit
                  ? 'text-[46px] sm:text-[68px] lg:text-[88px]'
                  : 'text-[56px] sm:text-[80px] lg:text-[110px]'
              } leading-[0.85] text-[var(--green-highlight,#6CF05A)] tracking-tighter transition-all duration-200 group-hover:brightness-115`}
            >
              {faq.id}
            </span>
            {/* White Filled Dot Div */}
            <span
              aria-hidden="true"
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-[22px] lg:h-[22px] rounded-full bg-white ml-1.5 sm:ml-2 shrink-0 translate-y-[-2px] sm:translate-y-[-4px] shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            />
          </div>

          {/* RIGHT: Question Text (24px, Inter 700, line-height 1.15) */}
          <div className="flex-1 text-left flex items-center">
            <span
              id={`faq-question-${faq.id}`}
              className="font-sans font-bold text-[17px] sm:text-[20px] lg:text-[24px] text-white leading-[1.15] max-w-[760px] group-hover:text-white/90 transition-colors"
            >
              {faq.question}
            </span>
          </div>
        </button>
      </h3>

      {/* Answer Panel: Below question, indented ~130px on desktop */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden ml-0 sm:ml-[100px] lg:ml-[130px] max-w-[780px]"
          >
            <div
              className="mt-3 sm:mt-4 p-4 sm:p-[16px_18px] rounded-[4px] border-[1.5px] text-white font-sans font-medium text-[15px] sm:text-[18px] leading-[1.2] bg-transparent shadow-[0_0_20px_rgba(108,240,90,0.15)]"
              style={{ borderColor: 'var(--faq-border, #6CF05A)' }}
            >
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
