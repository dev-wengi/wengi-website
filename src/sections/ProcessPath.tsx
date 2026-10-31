import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PathSvg, PATH_STATIONS } from '../components/PathSvg'
import { ProcessStep } from '../components/ProcessStep'
import { PROCESS_STEPS } from '../data/steps'

const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)'
const MEASUREMENT_DEBOUNCE_MS = 80
const MOBILE_BREAKPOINT = 1100

const activeStepCount = (fractions: number[], progress: number) => {
  if (progress <= 0) return 0
  return fractions.filter((fraction) => progress >= fraction).length
}

const isSameMeasurement = (
  first: number[],
  second: number[],
  tolerance = 0.002,
) =>
  first.length === second.length &&
  first.every((value, index) => Math.abs(value - second[index]) < tolerance)

export const ProcessPath: React.FC = () => {
  const pathAreaRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const mobileListRef = useRef<HTMLOListElement>(null)
  const [desktopFractions, setDesktopFractions] = useState<number[]>([])
  const [mobileFractions, setMobileFractions] = useState<number[]>([])
  const [mobileRail, setMobileRail] = useState({ top: 0, height: 0 })
  const [desktopActiveCount, setDesktopActiveCount] = useState(0)
  const [mobileActiveCount, setMobileActiveCount] = useState(0)
  const desktopActiveCountRef = useRef(0)
  const mobileActiveCountRef = useRef(0)
  const [isMobileLayout, setIsMobileLayout] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches,
  )
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress: desktopScrollProgress } = useScroll({
    target: pathAreaRef,
    offset: ['start 75%', 'end 55%'],
  })
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileListRef,
    offset: ['start 75%', 'end 55%'],
  })
  const desktopPathLength = useTransform(desktopScrollProgress, (progress) =>
    prefersReducedMotion ? 1 : Math.min(Math.max(progress * 1.15, 0), 1),
  )
  const mobilePathLength = useTransform(mobileScrollProgress, (progress) =>
    prefersReducedMotion ? 1 : Math.min(Math.max(progress * 1.15, 0), 1),
  )

  const updateDesktopCount = useCallback(
    (progress: number) => {
      const count = prefersReducedMotion
        ? PROCESS_STEPS.length
        : activeStepCount(desktopFractions, progress)
      if (desktopActiveCountRef.current !== count) {
        desktopActiveCountRef.current = count
        setDesktopActiveCount(count)
      }
    },
    [desktopFractions, prefersReducedMotion],
  )
  const updateMobileCount = useCallback(
    (progress: number) => {
      const count = prefersReducedMotion
        ? PROCESS_STEPS.length
        : activeStepCount(mobileFractions, progress)
      if (mobileActiveCountRef.current !== count) {
        mobileActiveCountRef.current = count
        setMobileActiveCount(count)
      }
    },
    [mobileFractions, prefersReducedMotion],
  )

  useMotionValueEvent(desktopPathLength, 'change', (progress) => {
    if (!isMobileLayout) updateDesktopCount(progress)
  })
  useMotionValueEvent(mobilePathLength, 'change', (progress) => {
    if (isMobileLayout) updateMobileCount(progress)
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    )
    const updateLayout = (event: MediaQueryListEvent) =>
      setIsMobileLayout(event.matches)

    setIsMobileLayout(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  useLayoutEffect(() => {
    const path = pathRef.current
    const area = pathAreaRef.current
    const list = mobileListRef.current
    if (!path || !area || !list) return

    let timeout: ReturnType<typeof setTimeout> | undefined
    const measure = () => {
      const totalLength = path.getTotalLength()
      const samples = 2400
      const fractions = PATH_STATIONS.map((station) => {
        let nearestLength = 0
        let nearestDistance = Number.POSITIVE_INFINITY
        for (let sample = 0; sample <= samples; sample += 1) {
          const length = (totalLength * sample) / samples
          const point = path.getPointAtLength(length)
          const distance = Math.hypot(point.x - station.x, point.y - station.y)
          if (distance < nearestDistance) {
            nearestLength = length
            nearestDistance = distance
          }
        }
        return nearestLength / totalLength
      })

      setDesktopFractions((current) =>
        isSameMeasurement(current, fractions) ? current : fractions,
      )

      const dots = Array.from(
        list.querySelectorAll<HTMLElement>('[data-step-dot]'),
      )
      if (dots.length === 0 || list.getBoundingClientRect().height === 0) return
      const listRect = list.getBoundingClientRect()
      const dotCenters = dots.map((dot) => {
        const rect = dot.getBoundingClientRect()
        return rect.top + rect.height / 2 - listRect.top
      })
      const firstCenter = dotCenters[0]
      const railHeight = Math.max(dotCenters[dotCenters.length - 1] - firstCenter, 0)
      const nextMobileFractions = dotCenters.map((center) =>
        railHeight === 0 ? 0 : (center - firstCenter) / railHeight,
      )

      setMobileRail((current) =>
        Math.abs(current.top - firstCenter) < 0.5 &&
        Math.abs(current.height - railHeight) < 0.5
          ? current
          : { top: firstCenter, height: railHeight },
      )
      setMobileFractions((current) =>
        isSameMeasurement(current, nextMobileFractions)
          ? current
          : nextMobileFractions,
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

  useLayoutEffect(() => {
    updateDesktopCount(desktopPathLength.get())
    updateMobileCount(mobilePathLength.get())
  }, [
    desktopFractions,
    desktopPathLength,
    mobileFractions,
    mobilePathLength,
    prefersReducedMotion,
    isMobileLayout,
    updateDesktopCount,
    updateMobileCount,
  ])

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="process-path-section relative w-full scroll-mt-24 overflow-x-clip bg-[#F2F2F2] px-4 py-20 sm:px-6"
      style={
        {
          '--path-line': 'var(--green-button, #6CF05A)',
          '--path-track': 'rgba(26,26,26,0.14)',
          '--step-num': 'var(--green-button, #6CF05A)',
          '--note-color': 'var(--green-button-hover, #6CF05A)',
          '--process-ease': EASE,
        } as React.CSSProperties
      }
    >
      <style>{`
        .process-path-section {
          padding-top: 100px;
          padding-bottom: 120px;
        }
        .process-path-desktop {
          display: block;
          width: min(100vw, 1600px);
          aspect-ratio: 1200 / 560;
          margin: 70px 0 0;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          overflow: visible;
        }
        .process-path-mobile {
          display: none;
        }
        .process-step--desktop {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          list-style: none;
        }
        .process-step__dot {
          position: absolute;
          z-index: 1;
          display: block;
          width: 14px;
          height: 14px;
          border: 2px solid var(--path-track);
          border-radius: 50%;
          background: #F2F2F2;
          transition: background-color 250ms var(--process-ease), border-color 250ms var(--process-ease);
        }
        .process-step--desktop .process-step__dot {
          inset: 0;
        }
        .process-step__dot--active {
          border-color: var(--path-line);
          background: var(--path-line);
        }
        .process-step__index,
        .process-step__copy {
          position: absolute;
          left: 1px;
          width: min(260px, 22vw);
        }
        .process-step__index {
          color: #9A9A9A;
          font-family: "Exo 2", sans-serif;
          font-size: 48px;
          font-weight: 500;
          line-height: 1;
          transition: color 250ms var(--process-ease);
        }
        .process-step__index--active {
          color: var(--step-num);
        }
        .process-step__index--crest {
          bottom: calc(100% + 12px);
        }
        .process-step__index:not(.process-step__index--crest) {
          top: calc(100% + 12px);
        }
        .process-step__copy {
          opacity: 0.55;
          transition: opacity 250ms var(--process-ease);
        }
        .process-step__copy--active {
          opacity: 1;
        }
        .process-step__copy h3 {
          margin: 0;
          color: #1A1A1A;
          font-family: Inter, sans-serif;
          font-size: 26px;
          font-weight: 700;
          line-height: 1.1;
        }
        .process-step__copy p {
          margin: 8px 0 0;
          color: #555;
          font-family: Inter, sans-serif;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.4;
        }
        .process-step__copy--crest {
          bottom: calc(100% + 12px + 48px + 8px);
        }
        .process-step__copy:not(.process-step__copy--crest) {
          top: calc(100% + 12px + 48px + 8px);
        }
        .process-step__index--right,
        .process-step__copy--right {
          left: auto;
          right: 13px;
        }
        .process-step__note {
          position: absolute;
          top: -48px;
          left: calc(100% + 18px);
          color: var(--note-color);
          font-family: "Caveat", cursive;
          font-size: 22px;
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
          transform: rotate(-2deg);
        }
        .process-step__note--left {
          right: calc(100% + 18px);
          left: auto;
        }
        @media (max-width: 1099px) {
          .process-path-section {
            padding-top: 80px;
            padding-bottom: 88px;
          }
          .process-path-desktop {
            display: none;
          }
          .process-path-mobile {
            display: block;
            position: relative;
            width: min(100%, 1160px);
            margin: 52px auto 0;
          }
          .process-path-mobile ol {
            position: relative;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          .process-mobile-rail {
            position: absolute;
            left: 24px;
            width: 2px;
            background: var(--path-track);
          }
          .process-mobile-rail__progress {
            width: 100%;
            height: 100%;
            background: var(--path-line);
            transform-origin: top;
          }
          .process-step--mobile {
            position: relative;
            min-height: 108px;
            margin: 0 0 36px;
            padding: 0 0 0 48px;
            list-style: none;
          }
          .process-step--mobile:last-child {
            margin-bottom: 0;
          }
          .process-step--mobile .process-step__dot {
            top: 16px;
            left: 24px;
            transform: translate(-50%, -50%);
          }
          .process-step--mobile .process-step__index {
            position: static;
            display: block;
            width: auto;
            color: #9A9A9A;
            font-size: 32px;
          }
          .process-step--mobile .process-step__copy {
            position: static;
            width: auto;
            max-width: 560px;
            margin-top: 8px;
          }
          .process-step--mobile .process-step__copy h3 {
            font-size: 22px;
          }
          .process-step--mobile .process-step__copy p {
            margin-top: 6px;
            font-size: 16px;
          }
          .process-step--mobile .process-step__note {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-step__dot,
          .process-step__index,
          .process-step__copy {
            transition-duration: 0ms;
          }
        }
      `}</style>

      <span
        id="start"
        aria-hidden="true"
        className="absolute left-0 top-0 h-0 scroll-mt-24"
      />
      <div className="mx-auto w-full max-w-[1160px]">
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
      </div>

      <div ref={pathAreaRef} className="process-path-desktop">
        <PathSvg ref={pathRef} pathLength={desktopPathLength} />
        <ol className="absolute inset-0 m-0 p-0" aria-label="Steps to get started">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              station={PATH_STATIONS[index]}
              stepIndex={index}
              layout="desktop"
              active={index < desktopActiveCount}
            />
          ))}
        </ol>
      </div>

      <div className="process-path-mobile">
        <div
          aria-hidden="true"
          className="process-mobile-rail"
          style={{ top: mobileRail.top, height: mobileRail.height }}
        >
          <motion.div
            className="process-mobile-rail__progress"
            style={{ scaleY: mobilePathLength }}
          />
        </div>
        <ol ref={mobileListRef} aria-label="Steps to get started">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              station={PATH_STATIONS[index]}
              stepIndex={index}
              layout="mobile"
              active={index < mobileActiveCount}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProcessPath
