import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { useNewsletterForm } from '../hooks/useNewsletterForm'

/* ─── Types ─────────────────────────────────────────────────────────────── */
export interface ContactProps {
  className?: string
}

/* ─── Fade-up animation variants ────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

/* ─── Phone SVG icon ─────────────────────────────────────────────────────── */
const PhoneIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path
      d="M5.25 4.667h4.667l2.333 5.833-2.916 1.75c1.27 2.572 3.26 4.563 5.833 5.833l1.75-2.916 5.833 2.333v4.667C22.75 23.7 21.45 25 19.833 25 10.5 25 3 17.5 3 8.167 3 6.55 4.3 5.25 5.833 5.25H5.25z"
      stroke="#0A0A0A"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ─── Email SVG icon ─────────────────────────────────────────────────────── */
const EmailIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="22" height="16" rx="2" stroke="#0A0A0A" strokeWidth="1.75" />
    <path
      d="M3 8l11 8 11-8"
      stroke="#0A0A0A"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ─── Location SVG icon ──────────────────────────────────────────────────── */
const LocationIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path
      d="M14 2.333C10.134 2.333 7 5.467 7 9.333c0 5.25 7 16.334 7 16.334s7-11.084 7-16.334c0-3.866-3.134-7-7-7z"
      stroke="#0A0A0A"
      strokeWidth="1.75"
    />
    <circle cx="14" cy="9.333" r="2.333" stroke="#0A0A0A" strokeWidth="1.75" />
  </svg>
)

/* ─── Contact info items ─────────────────────────────────────────────────── */
const CONTACT_ITEMS = [
  {
    id: 'phone',
    icon: <PhoneIcon />,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    id: 'email',
    icon: <EmailIcon />,
    label: 'Email',
    value: 'hello@dev.wengi.io',
    href: 'mailto:hello@dev.wengi.io',
  },
  {
    id: 'location',
    icon: <LocationIcon />,
    label: 'Location',
    value: 'Nairobi, Kenya',
    href: 'https://maps.google.com/?q=Nairobi,Kenya',
  },
]

/* ─── Main Component ──────────────────────────────────────────────────────── */
export const Contact: React.FC<ContactProps> = ({ className = '' }) => {
  const { email, setEmail, status, errorMessage, inputRef, handleSubmit } =
    useNewsletterForm()
  const isLoading = status === 'loading'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`w-full scroll-mt-24 ${className}`}
    >
      {/* ── A) Black Banner ────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-black, #000000)',
          minHeight: '340px',
        }}
      >
        {/* Subtle radial glow behind text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[320px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(108,240,90,0.12) 0%, rgba(108,240,90,0) 70%)',
          }}
        />

        {/* Thin green horizontal line at bottom edge */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: 'var(--green-highlight, #6CF05A)', opacity: 0.3 }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 sm:py-24 h-full min-h-[340px]">
          {/* Heading */}
          <motion.h2
            id="contact-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            className="font-headline font-extrabold text-white leading-tight tracking-tight select-none"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            Have a question or{' '}
            <span style={{ color: 'var(--green-highlight, #6CF05A)' }}>
              want to connect?
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1}
            className="mt-4 text-white/70 font-sans font-normal leading-relaxed max-w-[480px]"
            style={{ fontSize: 'clamp(15px, 1.8vw, 18px)' }}
          >
            We'd love to hear from you. Reach out via any of the channels below or
            subscribe to our newsletter for the latest updates.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="mailto:hello@dev.wengi.io"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.2}
            className="mt-8 inline-flex items-center gap-2 font-exo font-semibold text-black rounded-full px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            style={{
              backgroundColor: 'var(--green-highlight, #6CF05A)',
              letterSpacing: '0.02em',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
            }}
          >
            Get in Touch
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* ── B) White Contact Row ───────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1160px] mx-auto w-full px-6 py-14 sm:py-16">
          <motion.div
            className="flex flex-col md:flex-row items-stretch justify-center gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {CONTACT_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                custom={i * 0.1}
                className="flex flex-col md:flex-row items-center md:items-start gap-5 flex-1 px-8 py-8 md:py-6 first:pl-0 last:pr-0"
              >
                {/* Icon tile */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: 'var(--contact-icon-bg, #6CF05A)' }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span
                    className="font-sans font-normal text-[13px] uppercase tracking-[0.08em] mb-1"
                    style={{ color: 'var(--text-muted-light, #8C8C8C)' }}
                  >
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    target={item.id === 'location' ? '_blank' : undefined}
                    rel={item.id === 'location' ? 'noopener noreferrer' : undefined}
                    className="font-sans font-semibold text-[16px] sm:text-[18px] transition-colors duration-200 hover:text-[var(--green-highlight,#6CF05A)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] rounded-sm"
                    style={{ color: 'var(--text-black, #0A0A0A)' }}
                  >
                    {item.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── C) Newsletter Card ─────────────────────────────────────────────── */}
      <div
        id="newsletter"
        className="w-full scroll-mt-28 pb-[208px] sm:pb-[188px] lg:pb-[268px]"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1160px] mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative w-full rounded-3xl overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-black, #000000)',
              border: '1px solid var(--card-border-gray, #9A9A9A)',
            }}
          >
            {/* Watermark logo (faint) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 select-none overflow-hidden rounded-br-3xl"
              style={{ opacity: 'var(--watermark-opacity, 0.10)' }}
            >
              <span
                className="font-headline font-extrabold text-white leading-none tracking-tight select-none"
                style={{
                  fontSize: 'clamp(80px, 14vw, 160px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  display: 'block',
                  paddingRight: '24px',
                  paddingBottom: '8px',
                }}
              >
                Dev.wengi
              </span>
            </div>

            {/* Card content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 px-8 sm:px-12 py-12 sm:py-14">
              {/* Left: heading + subtext */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[480px]">
                <h3
                  className="font-headline font-extrabold text-white leading-tight"
                  style={{
                    fontSize: 'clamp(24px, 3.5vw, 40px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Stay in the{' '}
                  <span style={{ color: 'var(--green-highlight, #6CF05A)' }}>loop</span>
                </h3>
                <p
                  className="mt-3 font-sans font-normal text-white/60 leading-relaxed"
                  style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
                >
                  Subscribe for updates about community projects, learning resources,
                  and ways to get involved.
                </p>
              </div>

              {/* Right: email form */}
              <div className="w-full max-w-[440px]">
                {status === 'success' ? (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center font-exo font-semibold text-[var(--green-highlight,#6CF05A)] text-[18px]"
                  >
                    🎉 You're subscribed! Welcome aboard.
                  </motion.p>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-3"
                    aria-label="Newsletter subscription"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Email input */}
                      <div className="flex-1 relative">
                        <label htmlFor="newsletter-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          ref={inputRef}
                          id="newsletter-email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          autoComplete="email"
                          aria-describedby={errorMessage ? 'newsletter-error' : undefined}
                          aria-invalid={!!errorMessage}
                          disabled={isLoading}
                          className="w-full h-[52px] rounded-full px-5 font-sans font-normal text-[15px] bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-[var(--green-highlight,#6CF05A)] focus:ring-1 focus:ring-[var(--green-highlight,#6CF05A)] transition-colors duration-200"
                        />
                      </div>

                      {/* Subscribe button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="h-[52px] inline-flex items-center justify-center font-exo font-semibold text-black rounded-full px-7 transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-4 focus-visible:ring-offset-black hover:-translate-y-0.5 hover:brightness-95"
                        style={{
                          backgroundColor: 'var(--green-highlight, #6CF05A)',
                          letterSpacing: '0.02em',
                          fontSize: '15px',
                        }}
                      >
                        {isLoading ? 'Subscribing…' : 'Subscribe'}
                      </button>
                    </div>

                    {/* Validation error */}
                    {errorMessage && (
                      <p
                        id="newsletter-error"
                        role="alert"
                        className="text-red-400 text-[13px] font-sans pl-2"
                      >
                        {errorMessage}
                      </p>
                    )}

                    {/* Privacy note */}
                    <p className="text-white/40 text-[12px] font-sans pl-2">
                      No spam, ever. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
