import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { usePageTitle } from '../components/ScrollManager'
import { NewsletterCard } from '../components/NewsletterCard'
import { ALL_POSTS, BLOG_POSTS } from '../data/blog'
import { CONTACT_EMAIL } from '../data/resources'

export const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = ALL_POSTS.find((p) => p.slug === slug)

  usePageTitle(post ? `${post.title} · Blog · Dev.wengi` : 'Article not found · Dev.wengi')

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-[800px]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand,#05FF3C)]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All articles
          </Link>
          <p className="mt-6 font-exo text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand,#05FF3C)]">
            {post.topic} · Notes from the build
          </p>
          <h1 className="mt-3 font-headline text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-[620px] font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            {post.excerpt}
          </p>
          <p className="mt-4 font-sans text-[13px] text-white/40">
            Draft · {post.readMinutes} min read
          </p>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="rounded-[20px] bg-neutral-100 p-6 sm:p-8">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-black">
              The full article is still being written.
            </h2>
            <p className="mt-2 max-w-[560px] font-sans text-[15px] leading-relaxed text-neutral-600">
              This collection starts as draft topics with reading estimates.
              Full guides land here as the community writes them — subscribe
              below and you&apos;ll hear when this one ships.
            </p>
            <div className="mt-6">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Pitch: ${post.title}`)}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2"
              >
                Help write it
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <h2 className="mt-14 font-headline text-2xl font-bold tracking-tight text-black">
            Keep exploring
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {more.map((m) => (
              <Link
                key={m.slug}
                to={`/blog/${m.slug}`}
                className="group rounded-[20px] border border-black/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)]"
              >
                <p className="font-exo text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-ink,#007D1B)]">
                  {m.topic}
                </p>
                <p className="mt-1 font-headline text-[17px] font-bold leading-snug text-black">
                  {m.title}
                </p>
                <p className="mt-2 flex items-center gap-1 font-sans text-[12px] text-neutral-500">
                  Draft · {m.readMinutes} min read
                  <ArrowUpRight size={14} className="ml-auto text-[var(--brand-ink,#007D1B)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </p>
              </Link>
            ))}
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

export default Article
