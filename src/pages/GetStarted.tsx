import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, HeartHandshake, Minus, Plus } from 'lucide-react'
import { usePageTitle } from '../components/ScrollManager'
import { useJoinForm } from '../hooks/useJoinForm'
import {
  AUDIENCES,
  PARTICIPATION,
  NEXT_STEPS,
  COMMUNITY_VALUES,
  GET_STARTED_FAQS,
  EXPERIENCE_LEVELS,
  PATH_OPTIONS,
} from '../data/getstarted'
import { CONTACT_EMAIL, DISCORD_INVITE } from '../data/resources'

const inputClass =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-sans text-[15px] text-black placeholder-neutral-400 transition-colors focus:border-[var(--brand-ink,#007D1B)] focus:outline-none focus:ring-1 focus-visible:ring-[var(--brand-ink,#007D1B)]'

const Label: React.FC<{ htmlFor: string; required?: boolean; children: React.ReactNode }> = ({
  htmlFor,
  required,
  children,
}) => (
  <label htmlFor={htmlFor} className="mb-1.5 block font-sans text-[13px] font-semibold text-neutral-800">
    {children}{' '}
    {required ? (
      <span aria-hidden="true" className="text-[var(--brand-ink,#007D1B)]">*</span>
    ) : (
      <span className="font-normal text-neutral-400">(optional)</span>
    )}
  </label>
)

export const GetStarted: React.FC = () => {
  usePageTitle('Get started · Dev.wengi')
  const [openFaq, setOpenFaq] = useState<number | null>(1)
  const { values, setField, status, errorMessage, firstErrorRef, handleSubmit } =
    useJoinForm()
  const isLoading = status === 'loading'

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-14 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto grid w-full max-w-[1160px] items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-white/15 px-4 py-1.5 font-sans text-[13px] font-medium text-white/80">
              Your next chapter starts here
            </span>
            <h1 className="mt-5 font-headline text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              You belong here.
              <br />
              <span className="text-[var(--brand,#05FF3C)]">Let&apos;s build something.</span>
            </h1>
            <p className="mt-5 max-w-[460px] font-sans text-base leading-relaxed text-white/70">
              A first line of code. A rough design. A big question. Wherever
              you&apos;re starting, DevWengi is a place to learn, make and grow
              with others.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Join the community
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link
                to="/resources"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 font-exo text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Find your path
              </Link>
            </div>
            <p className="mt-5 font-sans text-[13px] text-white/40">
              Beginner friendly. Community first. Rooted in Kisumu.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[24px]">
            <img
              src="/images/vision-community.jpg"
              alt="Community members coding together at a hackathon"
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-[16px] bg-black/75 p-5 backdrop-blur-sm">
              <p className="font-headline text-[19px] font-bold leading-snug text-white">
                Different starting points.{' '}
                <span className="text-[var(--brand,#05FF3C)]">One shared direction.</span>
              </p>
              <p className="mt-1 font-sans text-[13px] text-white/65">
                Learning is better when we do it together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px] text-center">
          <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink,#007D1B)]">
            There&apos;s room for you
          </p>
          <h2 className="mx-auto mt-3 max-w-[640px] font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
            Start where you are.{' '}
            <span className="text-[var(--brand-ink,#007D1B)]">Grow from there.</span>
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <p className="mx-auto mt-4 max-w-[520px] font-sans text-[15px] leading-relaxed text-neutral-600">
            You don&apos;t need to fit a job title. Choose the direction that
            feels closest to you today — you can always explore another.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {AUDIENCES.map((audience, i) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className={`flex flex-col rounded-[24px] border p-6 ${
                  audience.featured
                    ? 'border-transparent bg-[var(--brand-soft,#E8FBEA)]'
                    : 'border-black/10 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                    <audience.icon size={20} className="text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                  </span>
                  <span className="font-exo text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-ink,#007D1B)]">
                    {audience.level}
                  </span>
                </div>
                <h3 className="mt-4 font-headline text-[21px] font-bold tracking-tight text-black">
                  {audience.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-[14px] leading-relaxed text-neutral-600">
                  {audience.text}
                </p>
                <p className="mt-4 border-t border-black/10 pt-4 font-sans text-[13px] font-semibold text-[var(--brand-ink,#007D1B)]">
                  {audience.firstStep}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand,#05FF3C)]">
            Not just a place to scroll
          </p>
          <h2 className="mt-3 font-headline text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
            A community you <span className="text-[var(--brand,#05FF3C)]">take part in.</span>
          </h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <p className="mt-4 max-w-[640px] font-sans text-base leading-relaxed text-white/70">
            The value is in showing up for each other. Here are a few ways to
            make your learning — and someone else&apos;s — a little better.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PARTICIPATION.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className="flex flex-col rounded-[24px] border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--pine,#163520)]">
                  <item.icon size={20} className="text-[var(--brand,#05FF3C)]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-headline text-[20px] font-bold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-[14px] leading-relaxed text-white/65">
                  {item.text}
                </p>
                <p className="mt-4 font-sans text-[13px] font-semibold text-[var(--brand,#05FF3C)]">
                  {item.action}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join form */}
      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink,#007D1B)]">
              Take the first step
            </p>
            <h2 className="mt-3 font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
              Tell us a little{' '}
              <span className="text-[var(--brand-ink,#007D1B)]">about you.</span>
            </h2>
            <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
            <p className="mt-4 max-w-[400px] font-sans text-[15px] leading-relaxed text-neutral-600">
              Share what you&apos;re curious about and where you are on your
              journey. It helps us point you towards a useful way to get
              involved.
            </p>

            <h3 className="mt-10 font-headline text-xl font-bold text-black">
              What happens next?
            </h3>
            <ol className="mt-4 space-y-5">
              {NEXT_STEPS.map((step, i) => (
                <li key={step.title} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft,#E8FBEA)] font-exo text-[12px] font-bold text-[var(--brand-ink,#007D1B)]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-semibold text-black">
                      {step.title}
                    </p>
                    <p className="font-sans text-[13px] leading-relaxed text-neutral-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-[20px] bg-neutral-100 p-6">
              <p className="flex items-center gap-2 font-headline text-[17px] font-bold text-black">
                <HeartHandshake size={18} className="text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                How we show up
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 font-sans text-[13px] leading-relaxed text-neutral-600">
                {COMMUNITY_VALUES.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>

            <p className="mt-6 font-sans text-[13px] text-neutral-500">
              Have a question before joining?
              <br />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-[var(--brand-ink,#007D1B)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)]"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div className="h-fit rounded-[24px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-16 text-center"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand,#05FF3C)]">
                  <Check size={26} className="text-black" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-headline text-2xl font-bold text-black">
                  Request received!
                </h3>
                <p className="mt-2 max-w-[360px] font-sans text-[15px] leading-relaxed text-neutral-600">
                  Thanks for reaching out. Keep an eye on your inbox — the
                  community team will reply with your next step.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-headline text-2xl font-bold tracking-tight text-black">
                  Join the DevWengi community
                </h3>
                <p className="mt-1 font-sans text-[13px] text-neutral-500">
                  A few details to start the conversation. Fields marked * are
                  required.
                </p>
                <form
                  name="join-request"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Join request"
                  className="mt-6 space-y-5"
                >
                  <input type="hidden" name="form-name" value="join-request" />
                  <input
                    type="text"
                    name="bot-field"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="sr-only"
                    style={{ display: 'none' }}
                  />

                  <div>
                    <Label htmlFor="join-name" required>
                      Your name
                    </Label>
                    <input
                      id="join-name"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={(e) => setField('name', e.target.value)}
                      placeholder="What should we call you?"
                      autoComplete="name"
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <Label htmlFor="join-email" required>
                      Email address
                    </Label>
                    <input
                      id="join-email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={(e) => setField('email', e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <Label htmlFor="join-city">City / country</Label>
                    <input
                      id="join-city"
                      type="text"
                      name="city"
                      value={values.city}
                      onChange={(e) => setField('city', e.target.value)}
                      placeholder="e.g. Kisumu, Kenya"
                      autoComplete="address-level2"
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <Label htmlFor="join-level" required>
                      Where are you on your journey?
                    </Label>
                    <select
                      id="join-level"
                      name="level"
                      value={values.level}
                      onChange={(e) => setField('level', e.target.value)}
                      disabled={isLoading}
                      className={`${inputClass} ${values.level ? '' : 'text-neutral-400'}`}
                    >
                      <option value="" disabled>
                        Choose your experience level
                      </option>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <option key={level} value={level} className="text-black">
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <fieldset>
                    <legend className="mb-1.5 font-sans text-[13px] font-semibold text-neutral-800">
                      What would you like to explore?{' '}
                      <span aria-hidden="true" className="text-[var(--brand-ink,#007D1B)]">*</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {PATH_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-sans text-[13px] font-medium transition-colors focus-within:ring-2 focus-within:ring-[var(--brand-ink,#007D1B)] ${
                            values.path === option
                              ? 'border-[var(--brand-ink,#007D1B)] bg-[var(--brand-soft,#E8FBEA)] text-black'
                              : 'border-black/15 text-neutral-600 hover:border-black/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="path"
                            value={option}
                            checked={values.path === option}
                            onChange={() => setField('path', option)}
                            disabled={isLoading}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`inline-flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                              values.path === option
                                ? 'border-[var(--brand-ink,#007D1B)]'
                                : 'border-neutral-300'
                            }`}
                          >
                            {values.path === option && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-ink,#007D1B)]" />
                            )}
                          </span>
                          {option}
                        </label>
                      ))}
                    </div>
                    <p className="mt-1.5 font-sans text-[12px] text-neutral-400">
                      Pick the closest fit. You can explore other pathways later.
                    </p>
                  </fieldset>

                  <div>
                    <Label htmlFor="join-goal" required>
                      What would you like to learn or build?
                    </Label>
                    <textarea
                      id="join-goal"
                      name="goal"
                      value={values.goal}
                      onChange={(e) => setField('goal', e.target.value)}
                      placeholder="A small goal, an idea or a question you're thinking about..."
                      rows={4}
                      disabled={isLoading}
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  <div>
                    <Label htmlFor="join-portfolio">Portfolio or GitHub link</Label>
                    <input
                      id="join-portfolio"
                      type="url"
                      name="portfolio"
                      value={values.portfolio}
                      onChange={(e) => setField('portfolio', e.target.value)}
                      placeholder="https://"
                      inputMode="url"
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-3 border-t border-black/10 pt-5">
                    {(
                      [
                        {
                          field: 'expectations' as const,
                          text: 'I agree to the community expectations: participate respectfully, share responsibly and protect others’ privacy. *',
                        },
                        {
                          field: 'dataUse' as const,
                          text: 'I agree that DevWengi may use these details to respond to my request and help me join the community. *',
                        },
                        {
                          field: 'newsletter' as const,
                          text: 'I’d also like to receive learning resources and community updates by email. I can unsubscribe anytime.',
                        },
                      ]
                    ).map((item) => (
                      <label
                        key={item.field}
                        className="flex cursor-pointer items-start gap-3 font-sans text-[13px] leading-relaxed text-neutral-600"
                      >
                        <input
                          type="checkbox"
                          name={item.field === 'dataUse' ? 'data-use' : item.field}
                          checked={values[item.field]}
                          onChange={(e) => setField(item.field, e.target.checked)}
                          disabled={isLoading}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#007D1B]"
                        />
                        {item.text}
                      </label>
                    ))}
                  </div>

                  {errorMessage && (
                    <div
                      ref={firstErrorRef}
                      tabIndex={-1}
                      role="alert"
                      className="rounded-xl bg-red-50 p-4 font-sans text-[14px] font-medium text-red-700 focus:outline-none"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[16px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                  >
                    {isLoading ? 'Sending…' : 'Send join request'}
                    {!isLoading && <ArrowRight size={17} aria-hidden="true" />}
                  </button>
                  <p className="text-center font-sans text-[12px] text-neutral-400">
                    Please don&apos;t include passwords or sensitive personal
                    information.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-neutral-50 px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[800px] text-center">
          <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink,#007D1B)]">
            Before you join
          </p>
          <h2 className="mt-3 font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
            A few things you{' '}
            <span className="text-[var(--brand-ink,#007D1B)]">might be wondering.</span>
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
        </div>
        <div className="mx-auto mt-10 w-full max-w-[800px]">
          {GET_STARTED_FAQS.map((faq) => {
            const isOpen = openFaq === faq.id
            return (
              <div key={faq.id} className="border-b border-black/10">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`gs-faq-${faq.id}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)]"
                  >
                    <span className="font-headline text-[17px] font-bold text-black sm:text-[19px]">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus size={18} className="shrink-0 text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                    ) : (
                      <Plus size={18} className="shrink-0 text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`gs-faq-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[680px] pb-6 font-sans text-[15px] leading-relaxed text-neutral-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* Banner */}
      <section className="w-full bg-[var(--brand-soft,#E8FBEA)] px-4 py-12 sm:px-6">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-headline text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              The best time to start is with your next small step.
            </h2>
            <p className="mt-1 font-sans text-[15px] text-neutral-600">
              Explore a learning path while you think about what you&apos;d like to build.
            </p>
          </div>
          <Link
            to="/resources"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2"
          >
            Browse resources
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default GetStarted
