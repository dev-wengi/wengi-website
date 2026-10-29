import React from 'react'
import { ArrowDownRight, ArrowUpRight, Code2, Server, Workflow } from 'lucide-react'

const LEARNING_PATHS = [
  {
    title: 'Frontend',
    description: 'Build for the web with HTML, CSS, JavaScript, React, and modern frontend tools.',
    href: 'https://github.com/dev-wengi/dev-wengi/tree/main/tracks/frontend',
    icon: Code2,
    number: '01',
  },
  {
    title: 'Backend',
    description: 'Learn server-side development, APIs, and databases by building practical systems.',
    href: 'https://github.com/dev-wengi/dev-wengi/tree/main/tracks/backend',
    icon: Server,
    number: '02',
  },
  {
    title: 'DevOps',
    description: 'Explore deployment, CI/CD, and infrastructure through structured tasks.',
    href: 'https://github.com/dev-wengi/dev-wengi/tree/main/tracks/devops',
    icon: Workflow,
    number: '03',
  },
]

const CHALLENGE_LEVELS = [
  { number: '10', label: 'Easy' },
  { number: '10', label: 'Intermediate' },
  { number: '10', label: 'Advanced' },
  { number: '10', label: 'Hard' },
  { number: '10', label: 'Nightmare' },
]

export const LearningPaths: React.FC = () => (
  <section
    id="learning-paths"
    aria-labelledby="learning-paths-heading"
    className="w-full scroll-mt-28 bg-white px-4 py-20 sm:px-6 lg:py-28"
  >
    <div className="mx-auto w-full max-w-[1160px]">
      <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[680px]">
          <p className="mb-3 font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green-highlight,#6CF05A)]">
            Start where you are
          </p>
          <h2
            id="learning-paths-heading"
            className="font-headline text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-black sm:text-5xl"
          >
            Choose a path.
            <br />
            <span className="text-[var(--green-highlight,#6CF05A)]">Build as you learn.</span>
          </h2>
        </div>
        <p className="max-w-[420px] font-sans text-base leading-relaxed text-neutral-600 sm:text-lg">
          Structured tracks take you from clear first steps to more advanced work. Pick a focus
          and learn by doing.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {LEARNING_PATHS.map(({ title, description, href, icon: Icon, number }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[230px] flex-col rounded-[24px] border border-black/10 bg-[#F7F7F7] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-black/20 hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] sm:p-7"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green-highlight,#6CF05A)] text-black">
                <Icon size={22} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="font-exo text-sm font-semibold tracking-widest text-neutral-400">
                {number}
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold tracking-tight text-black">{title}</h3>
            <p className="mt-2 flex-1 font-sans text-[15px] leading-relaxed text-neutral-600">
              {description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-black">
              Explore the track
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-6 grid gap-6 rounded-[24px] bg-black p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green-highlight,#6CF05A)]">
            Learn by making
          </p>
          <h3 className="mt-2 font-headline text-2xl font-bold tracking-tight sm:text-3xl">
            Take on a 30-day coding challenge
          </h3>
          <p className="mt-2 max-w-[650px] font-sans text-sm leading-relaxed text-white/70 sm:text-base">
            Fifty independent coding challenges across five difficulty levels. Pick one that
            interests you and build at your own pace.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {CHALLENGE_LEVELS.map((level) => (
              <span
                key={level.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 font-sans text-xs text-white/85 sm:text-sm"
              >
                <span className="font-exo font-semibold text-[var(--green-highlight,#6CF05A)]">
                  {level.number}
                </span>
                {level.label}
              </span>
            ))}
          </div>
        </div>
        <a
          href="https://github.com/dev-wengi/dev-wengi/tree/main/challenges/30-day-challenges"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-[var(--green-highlight,#6CF05A)] px-6 font-sans text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:self-center"
        >
          Browse challenges
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>

      <a
        href="#how-it-works"
        className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-neutral-600 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)]"
      >
        Not sure how to begin?
        <ArrowDownRight size={16} aria-hidden="true" />
      </a>
    </div>
  </section>
)

export default LearningPaths
