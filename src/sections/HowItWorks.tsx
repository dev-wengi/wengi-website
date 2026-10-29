import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    title: 'Choose something to build',
    description: 'Pick a learning track, a coding challenge, or a community project.',
  },
  {
    number: '02',
    title: 'Make it work',
    description: 'Start with the requirements, build a small piece, and learn as you go.',
  },
  {
    number: '03',
    title: 'Share your work',
    description: 'For a track task or project contribution, open a pull request for review.',
  },
  {
    number: '04',
    title: 'Get feedback. Iterate.',
    description: 'Use feedback to improve your work, then take on the next step.',
  },
]

export const HowItWorks: React.FC = () => (
  <section
    id="how-it-works"
    aria-labelledby="how-it-works-heading"
    className="w-full scroll-mt-28 bg-[#F2F2F2] px-4 py-20 sm:px-6 lg:py-24"
  >
    <div className="mx-auto grid w-full max-w-[1160px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <p className="mb-3 font-exo text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green-highlight,#6CF05A)]">
          A simple way forward
        </p>
        <h2
          id="how-it-works-heading"
          className="font-headline text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-black sm:text-5xl"
        >
          Start simple.
          <br />
          <span className="text-neutral-500">Keep progressing.</span>
        </h2>
        <p className="mt-5 max-w-[430px] font-sans text-base leading-relaxed text-neutral-600">
          You do not need a perfect plan. Choose a practical first step, build, and learn through
          iteration.
        </p>
        <a
          href="https://github.com/dev-wengi/dev-wengi"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 font-sans text-sm font-semibold text-black underline decoration-[var(--green-highlight,#6CF05A)] decoration-2 underline-offset-4 transition-colors hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)]"
        >
          Read the getting-started guide
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <ol className="divide-y divide-black/10">
        {STEPS.map((step) => (
          <li key={step.number} className="grid gap-3 py-5 sm:grid-cols-[56px_1fr] sm:gap-5 sm:py-6">
            <span className="font-exo text-sm font-semibold tracking-widest text-neutral-400">
              {step.number}
            </span>
            <div>
              <h3 className="font-headline text-xl font-bold tracking-tight text-black sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-1.5 max-w-[560px] font-sans text-sm leading-relaxed text-neutral-600 sm:text-base">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export default HowItWorks
