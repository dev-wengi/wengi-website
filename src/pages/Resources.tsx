import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight, ArrowUpRight, Check, Route } from 'lucide-react'
import { usePageTitle } from '../components/ScrollManager'
import { NewsletterCard } from '../components/NewsletterCard'
import {
  RESOURCE_PATHS,
  PROJECT_BRIEFS,
  BRIEF_FILTERS,
  REFERENCES,
  HERO_STEPS,
  DISCORD_INVITE,
  type ProjectBrief,
} from '../data/resources'

const matchesQuery = (text: string, query: string) =>
  query.trim() === '' ||
  text.toLowerCase().includes(query.trim().toLowerCase())

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const BriefVisual: React.FC<{ brief: ProjectBrief }> = ({ brief }) => {
  const Icon = brief.icon
  return (
    <div className="rounded-[20px] bg-[var(--pine,#163520)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
          {brief.kicker}
        </span>
        <Icon size={18} className="text-[var(--brand,#05FF3C)]" aria-hidden="true" />
      </div>
      {brief.visual.type === 'browser' ? (
        <div className="rounded-[12px] bg-white p-4">
          <p className="font-mono text-[10px] text-neutral-400">
            <span aria-hidden="true">● ● ● </span>
            <span className="ml-1">a small idea, made real</span>
          </p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <div>
              <p className="font-headline text-[17px] font-extrabold leading-tight text-black">
                {brief.visual.title}
              </p>
              <span
                aria-hidden="true"
                className="mt-2 block h-[18px] w-20 rounded-full bg-[var(--brand,#05FF3C)]"
              />
            </div>
            <div
              aria-hidden="true"
              className="flex w-16 shrink-0 flex-col gap-1.5 rounded-lg bg-[var(--brand-soft,#E8FBEA)] p-2"
            >
              <span className="h-5 w-5 rounded-md bg-[var(--brand,#05FF3C)]" />
              <span className="h-1.5 rounded-full bg-black/15" />
              <span className="h-1.5 w-2/3 rounded-full bg-black/15" />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-[12px] border border-white/10 bg-black/60 p-4">
          <p className="font-mono text-[10px] text-white/40">
            <span aria-hidden="true">● ● ● </span>
            <span className="ml-1">{brief.visual.file}</span>
          </p>
          <div className="mt-2 space-y-1">
            {brief.visual.lines.map((line) => (
              <p key={line} className="font-mono text-[12px] leading-relaxed text-white/80">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const Resources: React.FC = () => {
  usePageTitle('Resources · Dev.wengi')
  const [query, setQuery] = useState('')
  const [briefFilter, setBriefFilter] = useState('All projects')

  const paths = useMemo(
    () =>
      RESOURCE_PATHS.filter((p) =>
        matchesQuery(`${p.title} ${p.tag} ${p.blurb} ${p.points.join(' ')}`, query),
      ),
    [query],
  )

  const briefs = useMemo(
    () =>
      PROJECT_BRIEFS.filter(
        (b) =>
          (briefFilter === 'All projects' || b.topics.includes(briefFilter)) &&
          matchesQuery(
            `${b.title} ${b.description} ${b.kicker} ${b.level} ${b.outcome}`,
            query,
          ),
      ),
    [query, briefFilter],
  )

  const references = useMemo(
    () =>
      REFERENCES.filter((r) =>
        matchesQuery(`${r.title} ${r.description} ${r.tag} ${r.host}`, query),
      ),
    [query],
  )

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-14 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[620px]">
              <span className="inline-block rounded-full border border-white/15 px-4 py-1.5 font-sans text-[13px] font-medium text-white/80">
                The learning library
              </span>
              <h1 className="mt-5 font-headline text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
                Less searching.
                <br />
                <span className="text-[var(--brand,#05FF3C)]">More building.</span>
              </h1>
              <p className="mt-5 max-w-[480px] font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                Find a starting point, follow a practical path, and turn what
                you learn into something you can share.
              </p>
            </div>

            <div className="w-full max-w-[360px] shrink-0 rounded-[20px] border border-white/10 bg-white/[0.04] p-6">
              <p className="font-exo text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand,#05FF3C)]">
                Your next small step
              </p>
              <div className="mt-4 space-y-4">
                {HERO_STEPS.map((step) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <step.icon
                      size={18}
                      className="mt-0.5 shrink-0 text-[var(--brand,#05FF3C)]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans text-[15px] font-semibold text-white">
                        {step.title}
                      </p>
                      <p className="font-sans text-[13px] text-white/60">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form
            role="search"
            aria-label="Search resources"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:bg-white sm:p-2 sm:pl-5"
            onSubmit={(e) => {
              e.preventDefault()
              scrollToId('paths')
            }}
          >
            <Search size={18} className="hidden shrink-0 text-neutral-500 sm:block" aria-hidden="true" />
            <label htmlFor="resource-search" className="sr-only">
              Search resources
            </label>
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='What do you want to learn? Try "CSS", "Git" or "your first API"'
              className="h-[52px] w-full flex-1 rounded-full bg-white px-5 font-sans text-[15px] text-black placeholder-neutral-500 focus:outline-none sm:h-12 sm:bg-transparent sm:px-2"
            />
            <button
              type="submit"
              className="inline-flex h-[52px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12"
            >
              Find a resource
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {[
              { label: 'All resources', target: 'top' },
              { label: 'Learning paths', target: 'paths' },
              { label: 'Project tutorials', target: 'briefs' },
              { label: 'Tools & references', target: 'references' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() =>
                  chip.target === 'top'
                    ? (setQuery(''), window.scrollTo({ top: 0, behavior: 'smooth' }))
                    : scrollToId(chip.target)
                }
                className={`rounded-full px-5 py-2 font-sans text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand,#05FF3C)] ${
                  chip.label === 'All resources'
                    ? 'bg-[var(--brand,#05FF3C)] text-black hover:bg-[var(--brand-hover,#04EB37)]'
                    : 'border border-white/15 text-white/85 hover:border-white/40 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
            <span className="ml-auto hidden font-sans text-[12px] text-white/40 md:inline">
              Self-paced · Learn by doing
            </span>
          </div>
        </div>
      </section>

      {/* Learning paths */}
      <section id="paths" className="w-full scroll-mt-24 bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink,#007D1B)]">
            Beginner to builder
          </p>
          <h2 className="mt-3 font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
            A little direction.{' '}
            <span className="text-[var(--brand-ink,#007D1B)]">A real next step.</span>
          </h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <p className="mt-4 max-w-[640px] font-sans text-base leading-relaxed text-neutral-600">
            Choose a suggested learning path. Work through the foundations,
            make a small project, and ask for feedback along the way.
          </p>

          {paths.length === 0 ? (
            <p className="mt-10 rounded-[20px] bg-neutral-100 p-8 text-center font-sans text-[15px] text-neutral-500">
              No learning paths match your search.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {paths.map((path) => (
                <motion.article
                  key={path.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  aria-labelledby={`path-${path.id}`}
                  className={`flex flex-col rounded-[24px] border p-6 ${
                    path.featured
                      ? 'border-transparent bg-[var(--brand-soft,#E8FBEA)]'
                      : 'border-black/10 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                      <path.icon size={20} className="text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                    </span>
                    <span className="font-exo text-sm font-semibold tracking-widest text-neutral-400">
                      {path.index}
                    </span>
                  </div>
                  <p className="mt-5 font-exo text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-ink,#007D1B)]">
                    {path.tag}
                  </p>
                  <h3 id={`path-${path.id}`} className="mt-1 font-headline text-[22px] font-bold tracking-tight text-black">
                    {path.title}
                  </h3>
                  <p className="mt-1 font-sans text-[13px] text-neutral-500">{path.blurb}</p>
                  <ol className="mt-4 space-y-2">
                    {path.points.map((point, i) => (
                      <li key={point} className="flex items-start gap-2 font-sans text-[13px] leading-snug text-neutral-700">
                        <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black/20 font-exo text-[10px] font-semibold text-neutral-600">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 border-t border-black/10 pt-4">
                    <p className="font-sans text-[13px] font-medium text-neutral-700">{path.outcome}</p>
                    <Link
                      to="https://github.com/dev-wengi/dev-wengi/tree/main/tracks"
                      className="mt-2 inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-[var(--brand-ink,#007D1B)] transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)]"
                    >
                      Explore this path
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-start gap-3 rounded-[16px] bg-neutral-100 p-5">
            <Route size={18} className="mt-0.5 shrink-0 text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
            <p className="font-sans text-[14px] leading-relaxed text-neutral-600">
              Not sure where to start? Begin with your first website, or tell
              the community what you&apos;d like to build.
            </p>
          </div>
        </div>
      </section>

      {/* Project briefs */}
      <section id="briefs" className="w-full scroll-mt-24 bg-[var(--ink,#060A07)] px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand,#05FF3C)]">
            Put it into practice
          </p>
          <h2 className="mt-3 font-headline text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
            Small projects. <span className="text-[var(--brand,#05FF3C)]">Useful skills.</span>
          </h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <p className="mt-4 max-w-[640px] font-sans text-base leading-relaxed text-white/70">
            Suggested hands-on briefs, designed to help you understand the
            decisions behind the code — not just copy the result.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter briefs by topic">
            {BRIEF_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setBriefFilter(filter)}
                aria-pressed={briefFilter === filter}
                className={`rounded-full px-5 py-2 font-sans text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand,#05FF3C)] ${
                  briefFilter === filter
                    ? 'bg-[var(--brand,#05FF3C)] text-black'
                    : 'border border-white/15 text-white/85 hover:border-white/40 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {briefs.length === 0 ? (
            <p className="mt-10 rounded-[20px] border border-white/10 p-8 text-center font-sans text-[15px] text-white/60">
              No briefs match your search or filter.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {briefs.map((brief) => (
                <motion.article
                  key={brief.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  aria-labelledby={`brief-${brief.id}`}
                  className="flex flex-col rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
                >
                  <BriefVisual brief={brief} />
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-exo text-[12px] font-semibold text-[var(--brand,#05FF3C)]">
                        {brief.level}
                      </span>
                      <span className="font-sans text-[12px] text-white/50">
                        {brief.stages} guided stages
                      </span>
                    </div>
                    <h3 id={`brief-${brief.id}`} className="mt-2 font-headline text-[22px] font-bold leading-tight tracking-tight text-white">
                      {brief.title}
                    </h3>
                    <p className="mt-2 font-sans text-[14px] leading-relaxed text-white/65">
                      {brief.description}
                    </p>
                    <p className="mt-3 flex items-start gap-2 font-sans text-[13px] font-medium text-white/85">
                      <Check size={15} className="mt-0.5 shrink-0 text-[var(--brand,#05FF3C)]" aria-hidden="true" />
                      {brief.outcome}
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <Link
                        to={`/resources/brief/${brief.id}`}
                        className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-white transition-colors hover:text-[var(--brand,#05FF3C)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand,#05FF3C)]"
                      >
                        View project brief
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <p className="mt-10 text-center font-sans text-[14px] text-white/50">
            Use these as starting points. Change the idea, make mistakes, and
            make the finished project your own.
          </p>
        </div>
      </section>

      {/* References */}
      <section id="references" className="w-full scroll-mt-24 bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink,#007D1B)]">
            Keep these close
          </p>
          <h2 className="mt-3 font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
            Good references beat{' '}
            <span className="text-[var(--brand-ink,#007D1B)]">guesswork.</span>
          </h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <p className="mt-4 max-w-[640px] font-sans text-base leading-relaxed text-neutral-600">
            A focused set of external starting points. Read the docs, try an
            example, and bring your questions back to the community.
          </p>

          {references.length === 0 ? (
            <p className="mt-10 rounded-[20px] bg-neutral-100 p-8 text-center font-sans text-[15px] text-neutral-500">
              No references match your search.
            </p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {references.map((ref) => (
                <a
                  key={ref.id}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[20px] border border-black/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-soft,#E8FBEA)]">
                      <ref.icon size={20} className="text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                    </span>
                    <ArrowUpRight size={18} className="text-[var(--brand-ink,#007D1B)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-headline text-[20px] font-bold tracking-tight text-black">
                    {ref.title}
                  </h3>
                  <p className="mt-1 font-sans text-[14px] leading-relaxed text-neutral-600">
                    {ref.description}
                  </p>
                  <p className="mt-3 font-mono text-[12px] font-medium text-[var(--brand-ink,#007D1B)]">
                    {ref.host} · {ref.tag}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community band */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 py-20 sm:px-6">
        <div className="mx-auto grid w-full max-w-[1160px] items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[24px]">
            <img
              src="/images/vision-community.jpg"
              alt="Community members coding together at a hackathon"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand,#05FF3C)]">
              Start small. Don&apos;t start alone.
            </p>
            <h2 className="mt-3 font-headline text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
              Pick one project.
              <br />
              <span className="text-[var(--brand,#05FF3C)]">Bring your questions.</span>
            </h2>
            <p className="mt-4 max-w-[440px] font-sans text-base leading-relaxed text-white/70">
              Choose a brief above, build the smallest useful version, and
              share one thing you learned. The community is a place to think
              it through together.
            </p>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[16px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Join the community
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <NewsletterCard />
        </div>
      </section>
    </>
  )
}

export default Resources
