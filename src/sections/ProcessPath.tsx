import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PathSvg, PATH_STATIONS, measureStationFractions } from '../components/PathSvg'
import { ProcessStep } from '../components/ProcessStep'
import { PROCESS_STEPS } from '../data/steps'
import './ProcessPath.css'

const MOBILE_BREAKPOINT = 1100
const MEASUREMENT_DEBOUNCE_MS = 80

const activeStepCount = (fractions: number[], progress: number) => {
  if (progress <= 0) return 0
  return fractions.filter((fraction) => progress >= fraction).length
}

const areFractionsEqual = (first: number[], second: number[]) =>
  first.length === second.length &&
  first.every((fraction, index) => Math.abs(fraction - second[index]) < 0.002)

export const ProcessPath: React.FC = () => {
  const pathAreaRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const stepsListRef = useRef<HTMLOListElement>(null)
  const activeCountRef = useRef(0)
  const [desktopFractions, setDesktopFractions] = useState<number[]>([])
  const [mobileFractions, setMobileFractions] = useState<number[]>([])
  const [mobileRail, setMobileRail] = useState({ top: 0, height: 0 })
  const [activeCount, setActiveCount] = useState(0)
  const [isMobileLayout, setIsMobileLayout] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches,
  )
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: stepsListRef,
    offset: ['start 75%', 'end 55%'],
  })
  const pathLength = useTransform(scrollYProgress, (progress) =>
    prefersReducedMotion ? 1 : Math.min(Math.max(progress * 1.15, 0), 1),
  )
  const currentFractions = isMobileLayout ? mobileFractions : desktopFractions

  const updateActiveCount = useCallback(
    (progress: number) => {
      const count = prefersReducedMotion
        ? PROCESS_STEPS.length
        : activeStepCount(currentFractions, progress)

      if (activeCountRef.current !== count) {
        activeCountRef.current = count
        setActiveCount(count)
      }
    },
    [currentFractions, prefersReducedMotion],
  )

  useMotionValueEvent(pathLength, 'change', updateActiveCount)

  useLayoutEffect(() => {
    updateActiveCount(pathLength.get())
  }, [pathLength, updateActiveCount])

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    )
    const updateLayout = (event: MediaQueryListEvent) =>
      setIsMobileLayout(event.matches)

    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  useLayoutEffect(() => {
    const path = pathRef.current
    const area = pathAreaRef.current
    const list = stepsListRef.current
    if (!path || !area || !list) return

    let timeout: ReturnType<typeof setTimeout> | undefined

    const measure = () => {
      const isMobile = window.matchMedia(
        `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
      ).matches
      if (!isMobile) {
        const fractions = measureStationFractions(path, PATH_STATIONS)
        setDesktopFractions((current) =>
          areFractionsEqual(current, fractions) ? current : fractions,
        )
        return
      }

      const listRect = list.getBoundingClientRect()
      const dots = Array.from(
        list.querySelectorAll<HTMLElement>('[data-step-dot]'),
      )
      if (dots.length !== PROCESS_STEPS.length || listRect.height === 0) return

      const dotCenters = dots.map((dot) => {
        const rect = dot.getBoundingClientRect()
        return rect.top + rect.height / 2 - listRect.top
      })
      const firstCenter = dotCenters[0]
      const railHeight = dotCenters[dotCenters.length - 1] - firstCenter
      const fractionsForMobile = dotCenters.map((center) =>
        railHeight > 0 ? (center - firstCenter) / railHeight : 0,
      )

      setMobileRail((current) =>
        Math.abs(current.top - firstCenter) < 0.5 &&
        Math.abs(current.height - railHeight) < 0.5
          ? current
          : { top: firstCenter, height: railHeight },
      )
      setMobileFractions((current) =>
        areFractionsEqual(current, fractionsForMobile)
          ? current
          : fractionsForMobile,
      )
    }

    const scheduleMeasure = () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(measure, MEASUREMENT_DEBOUNCE_MS)
    }

    measure()
    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(area)
    observer.observe(list)
    return () => {
      observer.disconnect()
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="process-path-section relative w-full scroll-mt-24 overflow-x-clip bg-[#F2F2F2] px-4 sm:px-6"
      style={
        {
          '--path-line': 'var(--green-button, #6CF05A)',
          '--path-track': 'rgba(26,26,26,0.14)',
          '--step-num': 'var(--green-button, #6CF05A)',
          '--note-color': 'var(--green-button-hover, #6CF05A)',
        } as React.CSSProperties
      }
    >
      <span
        id="start"
        aria-hidden="true"
        className="absolute left-0 top-0 h-0 scroll-mt-24"
      />
      <div className="mx-auto w-full max-w-[1160px]">
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

      <div ref={pathAreaRef} className="process-path-area">
        <PathSvg ref={pathRef} pathLength={pathLength} />
        <div
          aria-hidden="true"
          className="process-mobile-rail"
          style={{ top: mobileRail.top, height: mobileRail.height }}
        >
          <motion.div
            className="process-mobile-rail__progress"
            style={{ scaleY: pathLength }}
          />
        </div>
        <ol
          ref={stepsListRef}
          className="process-step-list"
          aria-label="Steps to get started"
        >
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              station={PATH_STATIONS[index]}
              stepIndex={index}
              active={index < activeCount}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProcessPath
