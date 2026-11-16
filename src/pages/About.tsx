import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { usePageTitle } from '../components/ScrollManager'
import { NewsletterCard } from '../components/NewsletterCard'
import { ABOUT_STATS, ABOUT_VALUES, TEAM_ROLES, ABOUT_STEPS } from '../data/about'
import { DISCORD_INVITE } from '../data/resources'

export const About: React.FC = () => {
  usePageTitle('About · Dev.wengi')

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-14 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full border border-[var(--brand,#05FF3C)]/50 px-4 py-1.5 font-sans text-[13px] font-medium text-[var(--brand,#05FF3C)]">
                About DevWengi
              </span>
              <h1 className="mt-5 font-headline text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
                We build builders
                <br />
                in <span className="text-[var(--brand,#05FF3C)]">East Africa.</span>
              </h1>
              <p className="mt-5 max-w-[480px] font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                DevWengi is a developer community on a mission to make
                world-class tech education accessible, practical, and
                community-driven — starting right here in Kisumu.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Join the Community
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <Link
                  to="/#projects"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 font-exo text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  View Projects
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[24px]">
              <img
                src="/images/vision-community.jpg"
                alt="Community members coding together at a hackathon"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <dt className="order-2 mt-1 font-sans text-[13px] text-white/60">
                  {stat.label}
                </dt>
                <dd className="font-exo text-3xl font-bold text-[var(--brand,#05FF3C)] sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story */}
      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <h2 className="text-center font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
            Our <span className="text-[var(--brand-ink,#007D1B)]">Story</span>
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[24px]">
              <img
                src="/images/hero.jpg"
                alt="Developers collaborating on laptops at a community hackathon"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-black sm:text-3xl">
                From a Small Group to a Growing Movement
              </h3>
              <div className="mt-4 space-y-4 font-sans text-[15px] leading-relaxed text-neutral-600">
                <p>
                  DevWengi started with a simple question: why should
                  geography determine access to quality tech education? A
                  handful of developers in Kisumu decided to do something
                  about it — sharing knowledge, building projects, and
                  mentoring anyone willing to learn.
                </p>
                <p>
                  What began as informal weekend sessions quickly grew into a
                  structured community offering mentorship, hands-on projects,
                  and a library of practical resources. Today, DevWengi is a
                  hub where beginners become contributors, and contributors
                  become leaders.
                </p>
                <p>
                  We believe the next generation of African tech talent
                  doesn&apos;t need to go anywhere — it just needs the right
                  environment to grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <h2 className="text-center font-headline text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
            What We <span className="text-[var(--brand,#05FF3C)]">Stand For</span>
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--pine,#163520)]">
                  <value.icon size={20} className="text-[var(--brand,#05FF3C)]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-headline text-[20px] font-bold tracking-tight text-white">
                  {value.title}
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-white/65">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full bg-[var(--ink,#060A07)] px-4 pb-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <h2 className="text-center font-headline text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
            <span className="text-[var(--brand,#05FF3C)]">Meet</span> The Team
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <p className="mx-auto mt-4 max-w-[560px] text-center font-sans text-[15px] leading-relaxed text-white/65">
            The humans behind DevWengi — mentors, builders, and community
            champions dedicated to growing tech talent in East Africa.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_ROLES.map((member, i) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 3) * 0.08 }}
                className="overflow-hidden rounded-[24px]"
              >
                <div
                  aria-hidden="true"
                  className="h-36"
                  style={{ background: 'linear-gradient(135deg, #7DEBA4 0%, #1C5C34 55%, #0B170E 100%)' }}
                />
                <div className="bg-white p-6">
                  <h3 className="font-headline text-[19px] font-bold tracking-tight text-black">
                    {member.role}
                  </h3>
                  <p className="mt-1 font-exo text-[12px] font-semibold text-[var(--brand-ink,#007D1B)]">
                    {member.skills}
                  </p>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-neutral-600">
                    {member.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px] text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
            How <span className="text-[var(--brand-ink,#007D1B)]">DevWengi</span> Works
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[var(--brand,#05FF3C)]" />
          <p className="mx-auto mt-4 max-w-[520px] font-sans text-[15px] leading-relaxed text-neutral-600">
            A simple path from curious beginner to confident builder — guided
            by the community every step of the way.
          </p>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {ABOUT_STEPS.map((step, i) => (
              <li key={step.title} className="relative flex flex-col items-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand,#05FF3C)] font-exo text-xl font-bold text-black">
                  {i + 1}
                </span>
                {i < ABOUT_STEPS.length - 1 && (
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="absolute -right-3 top-4 hidden text-[var(--brand-ink,#007D1B)] lg:block"
                  />
                )}
                <h3 className="mt-4 font-headline text-[18px] font-bold text-black">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[240px] font-sans text-[13px] leading-relaxed text-neutral-600">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative w-full overflow-hidden px-4 py-24 sm:px-6">
        <img
          src="/images/hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl">
            Ready to start <span className="text-[var(--brand,#05FF3C)]">building?</span>
          </h2>
          <p className="mt-4 max-w-[520px] font-sans text-[15px] leading-relaxed text-white/75">
            Whether you&apos;re just starting out or looking to level up,
            DevWengi has a space for you. Join a community that ships, shares,
            and grows together.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/get-started"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand,#05FF3C)] px-7 font-exo text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get Started — It&apos;s Free
            </Link>
            <Link
              to="/resources"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 font-exo text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <NewsletterCard
            title={
              <>
                Subscribe To <span style={{ color: 'var(--brand,#05FF3C)' }}>Our Newsletter</span>
              </>
            }
            subtext="Get the latest tutorials, community updates, and project showcases delivered straight to your inbox."
          />
        </div>
      </section>
    </>
  )
}

export default About
