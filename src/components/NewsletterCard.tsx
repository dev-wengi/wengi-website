import React from 'react'
import { motion } from 'framer-motion'
import { useNewsletterForm } from '../hooks/useNewsletterForm'

export interface NewsletterCardProps {
  formName?: string
  title?: React.ReactNode
  subtext?: string
  className?: string
}

/**
 * Shared centered newsletter card used on Resources, Blog, and About.
 * Submits to Netlify Forms like the other newsletter forms.
 */
export const NewsletterCard: React.FC<NewsletterCardProps> = ({
  formName = 'page-newsletter',
  title = (
    <>
      Keep learning. <span style={{ color: 'var(--brand,#05FF3C)' }}>Stay connected.</span>
    </>
  ),
  subtext = 'Tutorial ideas, useful resources and community updates from DevWengi. A little encouragement for your next build.',
  className = '',
}) => {
  const { email, setEmail, status, errorMessage, inputRef, handleSubmit } =
    useNewsletterForm(formName)
  const isLoading = status === 'loading'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={`relative w-full overflow-hidden rounded-[28px] bg-[var(--ink,#060A07)] px-6 py-12 text-center sm:px-12 sm:py-14 ${className}`}
    >
      <h2 className="mx-auto max-w-[560px] font-headline text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-[520px] font-sans text-[15px] leading-relaxed text-white/70">
        {subtext}
      </p>

      <div className="mx-auto mt-8 w-full max-w-[560px]">
        {status === 'success' ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-exo text-[18px] font-semibold text-[var(--brand,#05FF3C)]"
          >
            You&apos;re subscribed! Welcome aboard.
          </motion.p>
        ) : (
          <form
            name={formName}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter subscription"
          >
            <input type="hidden" name="form-name" value={formName} />
            <input
              type="text"
              name="bot-field"
              tabIndex={-1}
              aria-hidden="true"
              className="sr-only"
              style={{ display: 'none' }}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:bg-white sm:p-2 sm:pl-6">
              <label htmlFor={`${formName}-email`} className="sr-only">
                Email address
              </label>
              <input
                ref={inputRef}
                id={`${formName}-email`}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                autoComplete="email"
                aria-describedby={errorMessage ? `${formName}-error` : undefined}
                aria-invalid={!!errorMessage}
                disabled={isLoading}
                className="h-[52px] w-full flex-1 rounded-full bg-white px-5 font-sans text-[15px] text-black placeholder-neutral-500 focus:outline-none sm:h-12 sm:bg-transparent sm:px-0"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-[52px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[var(--brand,#05FF3C)] px-8 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12"
              >
                {isLoading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </div>
            {errorMessage && (
              <p
                id={`${formName}-error`}
                role="alert"
                className="mt-3 font-sans text-[13px] text-red-400"
              >
                {errorMessage}
              </p>
            )}
            <p className="mt-3 font-sans text-[12px] text-white/40">
              By subscribing, you agree to receive DevWengi emails. Unsubscribe
              anytime.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  )
}

export default NewsletterCard
