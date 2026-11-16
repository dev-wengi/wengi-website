import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, SquarePen } from 'lucide-react'
import { usePageTitle } from '../components/ScrollManager'
import { NewsletterCard } from '../components/NewsletterCard'
import { BLOG_FILTERS, BLOG_POSTS, FEATURED_POST, type BlogPost } from '../data/blog'
import { CONTACT_EMAIL, DISCORD_INVITE } from '../data/resources'

const PostVisual: React.FC<{ post: BlogPost; rounded?: string }> = ({
  post,
  rounded = 'rounded-[16px]',
}) => {
  if (post.visual.type === 'photo') {
    return (
      <img
        src={post.visual.src}
        alt={post.visual.alt}
        className={`h-44 w-full object-cover ${rounded}`}
        loading="lazy"
      />
    )
  }
  if (post.visual.type === 'browser') {
    return (
      <div className={`bg-white p-4 ${rounded}`}>
        <p className="font-mono text-[10px] text-neutral-400">
          <span aria-hidden="true">● ● ● </span>
          <span className="ml-1">a small idea, made real</span>
        </p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <div>
            <p className="font-headline text-[16px] font-extrabold leading-tight text-black">
              {post.visual.title}
            </p>
            <span
              aria-hidden="true"
              className="mt-2 block h-[16px] w-16 rounded-full bg-[var(--brand,#05FF3C)]"
            />
          </div>
          <div
            aria-hidden="true"
            className="flex w-14 shrink-0 flex-col gap-1.5 rounded-lg bg-[var(--brand-soft,#E8FBEA)] p-2"
          >
            <span className="h-4 w-4 rounded-md bg-[var(--brand,#05FF3C)]" />
            <span className="h-1.5 rounded-full bg-black/15" />
            <span className="h-1.5 w-2/3 rounded-full bg-black/15" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`border border-white/10 bg-black p-4 ${rounded}`}>
      <p className="font-mono text-[10px] text-white/40">
        <span aria-hidden="true">● ● ● </span>
        <span className="ml-1">{post.visual.file}</span>
      </p>
      <div className="mt-2 space-y-1">
        {post.visual.lines.map((line) => (
          <p key={line} className="truncate font-mono text-[11px] leading-relaxed text-white/80">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export const Blog: React.FC = () => {
  usePageTitle('Blog · Dev.wengi')
  const [filter, setFilter] = useState('All topics')

  const posts = useMemo(
    () =>
      filter === 'All topics'
        ? BLOG_POSTS
        : BLOG_POSTS.filter((p) => p.topic === filter),
    [filter],
  )

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-14 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-[1160px]">
          <span className="inline-block rounded-full border border-white/15 px-4 py-1.5 font-sans text-[13px] font-medium text-white/80">
            The DevWengi Blog
          </span>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-[560px] font-headline text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              Good ideas. Real code.
              <br />
              <span className="text-[var(--brand,#05FF3C)]">Shared learning.</span>
            </h1>
            <div className="max-w-[360px]">
              <p className="font-sans text-base leading-relaxed text-white/70">
                Practical notes for people who learn by building. From your
                first component to your next big question.
              </p>
              <p className="mt-3 font-sans text-[13px] text-white/40">
                A proposed editorial collection — draft topics and reading
                estimates.
              </p>
            </div>
          </div>

          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            aria-labelledby="featured-post"
            className="mt-10 grid overflow-hidden rounded-[28px] bg-white lg:grid-cols-2"
          >
            <div className="relative min-h-[280px]">
              <img
                src={(FEATURED_POST.visual as { src: string }).src}
                alt={(FEATURED_POST.visual as { alt: string }).alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <span className="absolute left-5 top-5 rounded-full bg-[var(--brand,#05FF3C)] px-4 py-1.5 font-exo text-[11px] font-bold uppercase tracking-[0.1em] text-black">
                Featured practical guide
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="font-exo text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-ink,#007D1B)]">
                Frontend · Learn by building
              </p>
              <h2 id="featured-post" className="mt-2 font-headline text-3xl font-extrabold leading-tight tracking-tight text-black sm:text-4xl">
                {FEATURED_POST.title}
              </h2>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-neutral-600">
                {FEATURED_POST.excerpt}
              </p>
              <p className="mt-4 font-sans text-[13px] text-neutral-500">
                Draft guide · {FEATURED_POST.readMinutes} min read{' '}
                <span className="ml-2 font-semibold text-[var(--brand-ink,#007D1B)]">
                  Beginner friendly
                </span>
              </p>
              <div className="mt-6">
                <Link
                  to={`/blog/${FEATURED_POST.slug}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] focus-visible:ring-offset-2"
                >
                  Explore the article
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
                Something useful for your{' '}
                <span className="text-[var(--brand-ink,#007D1B)]">next build.</span>
              </h2>
              <p className="mt-3 max-w-[520px] font-sans text-base leading-relaxed text-neutral-600">
                Explore ideas across the stack, your craft and your community.
              </p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              09 editorial previews
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter posts by topic">
            {BLOG_FILTERS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setFilter(topic)}
                aria-pressed={filter === topic}
                className={`rounded-full px-5 py-2 font-sans text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)] ${
                  filter === topic
                    ? 'bg-[var(--brand,#05FF3C)] text-black'
                    : 'border border-black/15 text-neutral-700 hover:border-black/40 hover:text-black'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="mt-10 rounded-[20px] bg-neutral-100 p-8 text-center font-sans text-[15px] text-neutral-500">
              No posts on this topic yet.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  aria-labelledby={`post-${post.slug}`}
                  className="flex flex-col overflow-hidden rounded-[24px] border border-black/10 bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="bg-[var(--brand-soft,#E8FBEA)]/60 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-ink,#007D1B)]">
                        {post.topic} / Notes from the build
                      </span>
                      <post.icon size={16} className="text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                    </div>
                    <PostVisual post={post} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-exo text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-ink,#007D1B)]">
                      {post.topic}
                    </p>
                    <h3 id={`post-${post.slug}`} className="mt-1 font-headline text-[21px] font-bold leading-tight tracking-tight text-black">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 font-sans text-[14px] leading-relaxed text-neutral-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
                      <span className="font-sans text-[12px] text-neutral-500">
                        Draft · {post.readMinutes} min read
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        aria-label={`Read ${post.title}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--brand-soft,#E8FBEA)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink,#007D1B)]"
                      >
                        <ArrowUpRight size={18} className="text-[var(--brand-ink,#007D1B)]" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <p className="mt-10 text-center font-sans text-[14px] text-neutral-500">
            A starting collection of ideas, not a publication archive. Want to
            help shape what comes next?
          </p>
        </div>
      </section>

      {/* Build in public */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 py-20 sm:px-6">
        <div className="mx-auto grid w-full max-w-[1160px] items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand,#05FF3C)]">
              Build in public
            </p>
            <h2 className="mt-3 font-headline text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
              You don&apos;t need to be an expert to{' '}
              <span className="text-[var(--brand,#05FF3C)]">have a story.</span>
            </h2>
            <p className="mt-4 max-w-[520px] font-sans text-base leading-relaxed text-white/70">
              Solved a stubborn bug? Built your first page? Share the useful,
              the unfinished and the lessons in between. Your learning could
              help someone else start.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Blog story pitch')}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Pitch a story
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 font-exo text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Join the community
              </a>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7">
            <SquarePen size={26} className="text-[var(--brand,#05FF3C)]" aria-hidden="true" />
            <h3 className="mt-4 font-headline text-2xl font-bold tracking-tight text-white">
              Start with one small lesson.
            </h3>
            <ol className="mt-5 space-y-3">
              {[
                'What were you trying to build?',
                'What did you try — and what broke?',
                'What would you tell the next beginner?',
              ].map((q, i) => (
                <li key={q} className="flex items-start gap-3 font-sans text-[14px] text-white/75">
                  <span className="font-exo text-[13px] font-semibold text-[var(--brand,#05FF3C)]">
                    0{i + 1}
                  </span>
                  {q}
                </li>
              ))}
            </ol>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Blog story pitch')}`}
              className="mt-6 inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-[var(--brand,#05FF3C)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand,#05FF3C)]"
            >
              Send your idea to {CONTACT_EMAIL}
              <ArrowUpRight size={15} aria-hidden="true" />
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

export default Blog
