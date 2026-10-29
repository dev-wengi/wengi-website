/**
 * FooterNewsletter.tsx
 * Email subscribe form for the footer (Section 6).
 * Uses the shared useNewsletterForm hook.
 * Input + button side-by-side (button stacks below at <420px).
 */

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNewsletterForm } from '../hooks/useNewsletterForm'

export interface FooterNewsletterProps {
  className?: string
}

export const FooterNewsletter: React.FC<FooterNewsletterProps> = ({ className = '' }) => {
  const { email, setEmail, status, errorMessage, inputRef, handleSubmit } =
    useNewsletterForm()

  const isSuccess = status === 'success'
  const isLoading = status === 'loading'

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Column heading */}
      <h3
        className="font-exo font-semibold text-[13px] uppercase tracking-[0.22em]"
        style={{ color: 'var(--footer-label, #6CF05A)' }}
      >
        Stay Updated
      </h3>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-exo font-semibold text-[var(--footer-label,#6CF05A)] text-[16px] leading-snug"
          >
            🎉 You're subscribed!
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter subscription"
            className="flex flex-col gap-2"
            initial={{ opacity: 1 }}
          >
            {/* Honeypot — hidden from humans */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              aria-hidden="true"
              className="sr-only"
              style={{ display: 'none' }}
            />

            {/* Input + button row */}
            <div className="flex flex-col xs:flex-row gap-2">
              {/* Visually hidden label */}
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                ref={inputRef}
                id="footer-newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-describedby={errorMessage ? 'footer-newsletter-error' : undefined}
                aria-invalid={!!errorMessage}
                disabled={isLoading}
                className="flex-1 min-w-0 h-[52px] px-4 font-sans text-[15px] text-white placeholder-white/40 rounded-[10px] border outline-none transition-colors duration-150 disabled:opacity-60"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  borderColor: 'var(--footer-line, rgba(255,255,255,0.25))',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--footer-label, #6CF05A)'
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(108,240,90,0.18)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    'var(--footer-line, rgba(255,255,255,0.25))'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="h-[52px] px-[22px] font-sans font-bold text-[15px] text-black rounded-[10px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-blue,#000000)] disabled:opacity-60 whitespace-nowrap"
                style={{ backgroundColor: 'var(--green-highlight, #6CF05A)' }}
                onMouseEnter={(e) => {
                  if (isLoading) return
                  ;(e.currentTarget as HTMLElement).style.filter = 'brightness(1.08)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.filter = ''
                  ;(e.currentTarget as HTMLElement).style.transform = ''
                }}
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M14 8a6 6 0 00-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Subscribing…
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.p
                  id="footer-newsletter-error"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-[13px] font-sans pl-1"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FooterNewsletter
