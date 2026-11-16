import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { usePageTitle } from '../components/ScrollManager'
import { NotFound } from './NotFound'
import { LEGAL_DOCS } from '../data/legal'
import { CONTACT_EMAIL } from '../data/resources'

const TITLES: Record<string, string> = {
  privacy: 'Privacy Policy · Dev.wengi',
  terms: 'Terms of Service · Dev.wengi',
  cookies: 'Cookie Policy · Dev.wengi',
}

export const Legal: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const doc = LEGAL_DOCS.find((d) => d.slug === slug)

  usePageTitle(TITLES[slug ?? ''] ?? 'Dev.wengi')

  if (!doc) {
    return <NotFound />
  }

  return (
    <>
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-14 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-[800px]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand,#05FF3C)]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back home
          </Link>
          <h1 className="mt-5 font-headline text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-4 max-w-[620px] font-sans text-base leading-relaxed text-white/70">
            {doc.intro}
          </p>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-[800px]">
          {doc.sections.map((section) => (
            <div key={section.heading} className="mb-10 last:mb-0">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-black">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="font-sans text-[15px] leading-relaxed text-neutral-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 rounded-[20px] bg-neutral-100 p-6">
            <p className="font-sans text-[14px] leading-relaxed text-neutral-600">
              Questions about any of this? Write to{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-[var(--brand-ink,#007D1B)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)]"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Legal
