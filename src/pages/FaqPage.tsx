import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { usePageTitle } from '../components/ScrollManager'
import { FaqItem } from '../components/FaqItem'
import { NewsletterCard } from '../components/NewsletterCard'
import { FAQS_DATA } from '../data/faqs'

export const FaqPage: React.FC = () => {
  usePageTitle('Questions & Answers · Dev.wengi')
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <>
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-14 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-[940px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center"
          >
            <span className="inline-block rounded-full border border-white/15 px-4 py-1.5 font-sans text-[13px] font-medium text-white/80">
              Questions &amp; answers
            </span>
            <h1 className="mt-5 font-headline text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Everything you&apos;re{' '}
              <span className="text-[var(--brand,#05FF3C)]">wondering.</span>
            </h1>
            <p className="mt-5 max-w-[520px] font-sans text-base leading-relaxed text-white/70">
              Practical answers about joining, learning tracks, challenges,
              projects, and taking part in the community.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        aria-label="All questions and answers"
        className="w-full bg-[var(--ink,#060A07)] px-6 pb-20"
      >
        <div className="mx-auto flex w-full max-w-[940px] flex-col gap-6">
          {FAQS_DATA.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() =>
                setOpenId((prev) => (prev === faq.id ? null : faq.id))
              }
            />
          ))}
        </div>
      </section>

      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <NewsletterCard
            title={
              <>
                Still curious?{' '}
                <span style={{ color: 'var(--brand,#05FF3C)' }}>Stay close.</span>
              </>
            }
            subtext="New guides, community updates, and answers to questions we hear often — straight to your inbox."
          />
        </div>
      </section>
    </>
  )
}

export default FaqPage
