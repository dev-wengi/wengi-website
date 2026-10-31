import React, { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { FaqItem } from '../components/FaqItem'
import { FAQS_DATA, type Faq } from '../data/faqs'

export interface FaqsProps {
  initialFaqs?: Faq[]
  className?: string
}

/**
 * Section 4: F.A.Qs
 * - Full-width pure black background (#000000)
 * - Centered header with H2 "F.A.Qs" and 14px subtext
 * - Big typographic numbered items ("1.", "2.", "3.", "4." with white circle dot)
 * - Accordion behavior (Item 4 open by default to match screenshot)
 * - "See more questions" wide pill button revealing extra items
 */
export const Faqs: React.FC<FaqsProps> = ({
  initialFaqs = FAQS_DATA,
  className = '',
}) => {
  // Item 4 is open by default to match the reference screenshot
  const [openId, setOpenId] = useState<number | null>(4)
  const [showAll, setShowAll] = useState<boolean>(false)

  // Initial 4 items vs full 8 items
  const displayedFaqs = showAll ? initialFaqs : initialFaqs.slice(0, 4)

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const headerVariants: Variants = {
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
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className={`w-full scroll-mt-24 pt-16 pb-20 px-6 overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--bg-black, #000000)' }}
    >
      <div className="max-w-[940px] mx-auto w-full">
        {/* Header Block, Centered */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center max-w-[480px] mx-auto mb-16 sm:mb-20"
        >
          <h2
            id="faqs-heading"
            className="font-headline font-extrabold text-[28px] sm:text-[34px] lg:text-[40px] text-white tracking-tight leading-none select-none"
          >
            F.A.Qs
          </h2>

          <p className="mt-3 text-[14px] text-white leading-[1.2] max-w-[440px] font-sans font-normal opacity-90">
            Practical answers about joining the community, building projects, and learning together.
          </p>
        </motion.div>

        {/* FAQ Items List (24px vertical gap) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-6 w-full"
        >
          {displayedFaqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </motion.div>

        {/* "See more questions" Wide Pill Button (60px gap below list) */}
        {initialFaqs.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="mt-14 sm:mt-16 flex justify-center w-full"
          >
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="w-full sm:w-auto max-w-[340px] sm:max-w-none inline-flex items-center justify-center font-exo font-semibold text-[18px] sm:text-[20px] tracking-[0.02em] text-black rounded-full px-12 sm:px-[70px] py-4 sm:py-[18px] transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_8px_30px_rgba(108,240,90,0.4)] active:translate-y-0 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              style={{
                backgroundColor: 'var(--green-highlight, #6CF05A)',
              }}
            >
              {showAll ? 'Show fewer questions' : 'See more questions'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Faqs
