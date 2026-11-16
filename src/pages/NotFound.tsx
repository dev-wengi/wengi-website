import React from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/ScrollManager'

export const NotFound: React.FC = () => {
  usePageTitle('Page not found · Dev.wengi')

  return (
    <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center px-6 py-32 text-center sm:py-40">
      <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink,#007D1B)]">
        404
      </p>
      <h1 className="mt-3 font-headline text-4xl font-extrabold tracking-[-0.03em] text-black sm:text-5xl">
        Lost your way?
      </h1>
      <p className="mt-4 max-w-[420px] font-sans text-base leading-relaxed text-neutral-600">
        This page does not exist. Head home or pick a learning path to get
        back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[16px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2"
        >
          Go home
        </Link>
        <Link
          to="/resources"
          className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black px-7 font-exo text-[16px] font-semibold text-black transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2"
        >
          Browse resources
        </Link>
      </div>
    </section>
  )
}

export default NotFound
