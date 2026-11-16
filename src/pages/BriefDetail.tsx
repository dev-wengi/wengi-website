import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { usePageTitle } from '../components/ScrollManager'
import { NewsletterCard } from '../components/NewsletterCard'
import { PROJECT_BRIEFS, DISCORD_INVITE } from '../data/resources'

export const BriefDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const brief = PROJECT_BRIEFS.find((b) => b.id === id)

  usePageTitle(
    brief ? `${brief.title} · Resources · Dev.wengi` : 'Brief not found · Dev.wengi',
  )

  if (!brief) {
    return <Navigate to="/resources" replace />
  }

  const Icon = brief.icon

  return (
    <>
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-[800px]">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand,#05FF3C)]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All resources
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--pine,#163520)]">
              <Icon size={22} className="text-[var(--brand,#05FF3C)]" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                {brief.kicker}
              </p>
              <p className="font-exo text-[12px] font-semibold text-[var(--brand,#05FF3C)]">
                {brief.level} · {brief.stages} guided stages
              </p>
            </div>
          </div>
          <h1 className="mt-5 font-headline text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
            {brief.title}
          </h1>
          <p className="mt-4 max-w-[620px] font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            {brief.description}
          </p>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="rounded-[20px] border border-black/10 bg-[var(--brand-soft,#E8FBEA)] p-6 sm:p-8">
            <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink,#007D1B)]">
              What you&apos;ll end up with
            </p>
            <p className="mt-2 flex items-start gap-2 font-headline text-xl font-bold text-black">
              <Check size={20} className="mt-1 shrink-0 text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
              {brief.outcome}
            </p>
          </div>

          <div className="mt-8 rounded-[20px] bg-neutral-100 p-6 sm:p-8">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-black">
              The full guided brief is on its way.
            </h2>
            <p className="mt-2 max-w-[560px] font-sans text-[15px] leading-relaxed text-neutral-600">
              Each brief will walk through its {brief.stages} stages step by
              step. Until then, start with the smallest useful version and
              bring your questions to the community.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2"
              >
                Join the community
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link
                to="/resources"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2"
              >
                Browse all briefs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 pb-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <NewsletterCard />
        </div>
      </section>
    </>
  )
}

export default BriefDetail
