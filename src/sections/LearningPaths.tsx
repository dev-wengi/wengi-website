import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { PathwayCard } from '../components/PathwayCard'
import { pathways } from '../data/pathways'

const CHALLENGE_LEVELS = [
  { number: '10', label: 'Easy' },
  { number: '10', label: 'Intermediate' },
  { number: '10', label: 'Advanced' },
  { number: '10', label: 'Hard' },
  { number: '10', label: 'Nightmare' },
]

export const LearningPaths: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [canvasId, setCanvasId] = useState<string | null>(null)
  const [finePointer, setFinePointer] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const activeIdRef = useRef<string | null>(null)
  const canvasIdRef = useRef<string | null>(null)
  const reducedMotionRef = useRef(false)

  const activatePathway = useCallback((id: string) => {
    activeIdRef.current = id
    setActiveId(id)

    if (!reducedMotionRef.current && canvasIdRef.current === null) {
      canvasIdRef.current = id
      setCanvasId(id)
    }
  }, [])

  const deactivatePathway = useCallback((id: string) => {
    if (activeIdRef.current !== id) return
    activeIdRef.current = null
    setActiveId(null)
  }, [])

  const togglePathway = useCallback((id: string) => {
    if (activeIdRef.current === id) {
      activeIdRef.current = null
      setActiveId(null)
      return
    }
    activatePathway(id)
  }, [activatePathway])

  const handleCanvasExitComplete = useCallback((id: string) => {
    if (canvasIdRef.current !== id) return

    const nextId =
      activeIdRef.current && !reducedMotionRef.current ? activeIdRef.current : null
    canvasIdRef.current = nextId
    setCanvasId(nextId)
  }, [])

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePointer = () => setFinePointer(pointerQuery.matches)
    const updateMotion = () => {
      const shouldReduceMotion = motionQuery.matches
      reducedMotionRef.current = shouldReduceMotion
      setReducedMotion(shouldReduceMotion)
      if (shouldReduceMotion) {
        activeIdRef.current = null
        canvasIdRef.current = null
        setActiveId(null)
        setCanvasId(null)
      }
    }

    updatePointer()
    updateMotion()
    pointerQuery.addEventListener('change', updatePointer)
    motionQuery.addEventListener('change', updateMotion)

    const closeOnOutsideTap = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('[data-pathway-card]')) {
        return
      }
      activeIdRef.current = null
      setActiveId(null)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        activeIdRef.current = null
        setActiveId(null)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideTap)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      pointerQuery.removeEventListener('change', updatePointer)
      motionQuery.removeEventListener('change', updateMotion)
      document.removeEventListener('pointerdown', closeOnOutsideTap)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
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

        <div className="grid gap-6 lg:grid-cols-3">
          {pathways.map((pathway) => (
            <PathwayCard
              key={pathway.id}
              pathway={pathway}
              active={activeId === pathway.id}
              canvasActive={canvasId === pathway.id && activeId === pathway.id}
              finePointer={finePointer}
              reducedMotion={reducedMotion}
              onActivate={activatePathway}
              onDeactivate={deactivatePathway}
              onToggle={togglePathway}
              onCanvasExitComplete={handleCanvasExitComplete}
            />
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
}

export default LearningPaths
