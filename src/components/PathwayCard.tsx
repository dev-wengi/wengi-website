import { lazy, Suspense, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Pathway } from '../data/pathways'

const LazyCanvasRevealEffect = lazy(() =>
  import('./ui/canvas-reveal-effect').then((module) => ({
    default: module.CanvasRevealEffect,
  })),
)

interface PathwayCardProps {
  pathway: Pathway
  active: boolean
  canvasActive: boolean
  finePointer: boolean
  reducedMotion: boolean
  onActivate: (id: string) => void
  onDeactivate: (id: string) => void
  onToggle: (id: string) => void
  onCanvasExitComplete: (id: string) => void
}

const revealTransition = {
  duration: 0.25,
  ease: [0.2, 0.7, 0.2, 1] as const,
}

const revealOpacities = [0.5, 0.56, 0.62, 0.68, 0.74, 0.8, 0.86, 0.92, 0.96, 1]

function CornerPlus({ className }: { className: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`absolute h-6 w-6 text-black ${className}`}
      aria-hidden="true"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  )
}

export function PathwayCard({
  pathway,
  active,
  canvasActive,
  finePointer,
  reducedMotion,
  onActivate,
  onDeactivate,
  onToggle,
  onCanvasExitComplete,
}: PathwayCardProps) {
  const pointerWithin = useRef(false)
  const focusWithin = useRef(false)
  const touchTap = useRef(false)
  const wasActiveAtPointerDown = useRef(false)
  const [focused, setFocused] = useState(false)
  const Icon = pathway.icon

  const closeIfUnfocused = () => {
    if (!pointerWithin.current && !focusWithin.current) onDeactivate(pathway.id)
  }

  return (
    <div
      data-pathway-card={pathway.id}
      role="group"
      aria-label={`${pathway.title} learning track`}
      aria-expanded={active}
      tabIndex={0}
      onPointerDown={(event) => {
        touchTap.current = event.pointerType === 'touch'
        wasActiveAtPointerDown.current = active
      }}
      onPointerCancel={() => {
        touchTap.current = false
        wasActiveAtPointerDown.current = false
      }}
      onPointerEnter={(event) => {
        pointerWithin.current = true
        if (event.pointerType !== 'touch') onActivate(pathway.id)
      }}
      onPointerLeave={(event) => {
        if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
          return
        }
        pointerWithin.current = false
        if (event.pointerType !== 'touch') closeIfUnfocused()
      }}
      onFocusCapture={() => {
        focusWithin.current = true
        setFocused(true)
        onActivate(pathway.id)
      }}
      onBlurCapture={(event) => {
        if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
          return
        }
        focusWithin.current = false
        setFocused(false)
        closeIfUnfocused()
      }}
      onKeyDown={(event) => {
        if (
          !finePointer &&
          event.target === event.currentTarget &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault()
          onToggle(pathway.id)
        }
      }}
      onClick={(event) => {
        const target = event.target
        if (target instanceof Element && target.closest('a')) {
          touchTap.current = false
          wasActiveAtPointerDown.current = false
          return
        }
        if (touchTap.current || !finePointer) onActivate(pathway.id)
        touchTap.current = false
        wasActiveAtPointerDown.current = false
      }}
      className={`group/canvas-card relative flex min-h-[356px] w-full flex-col border border-black/[0.2] bg-[#F7F7F7] p-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        active ? 'isActive' : ''
      }`}
    >
      <CornerPlus className="-top-3 -left-3" />
      <CornerPlus className="-bottom-3 -left-3" />
      <CornerPlus className="-top-3 -right-3" />
      <CornerPlus className="-right-3 -bottom-3" />

      {active && reducedMotion && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-0 ${pathway.containerClassName}`}
        />
      )}

      {!reducedMotion && (
        <AnimatePresence
          initial={false}
          onExitComplete={() => onCanvasExitComplete(pathway.id)}
        >
          {canvasActive && (
            <motion.div
              key={pathway.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={revealTransition}
              className="pointer-events-none h-full w-full absolute inset-0 z-0"
              aria-hidden="true"
            >
              <Suspense
                fallback={
                  <div className={`h-full w-full ${pathway.containerClassName}`} />
                }
              >
                <LazyCanvasRevealEffect
                  animationSpeed={pathway.animationSpeed}
                  colors={pathway.colors}
                  containerClassName={pathway.containerClassName}
                  dotSize={pathway.dotSize}
                  opacities={revealOpacities}
                />
              </Suspense>
              {pathway.id === 'backend' && (
                <div className="pointer-events-none absolute inset-0 z-10 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/10" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div
        className={`relative z-20 mb-8 flex items-center justify-between transition duration-250 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/canvas-card:-translate-y-2 ${
          active ? '-translate-y-2' : ''
        }`}
      >
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green-highlight,#6CF05A)] text-black transition duration-250 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/canvas-card:text-white ${
            active ? 'text-white' : ''
          }`}
        >
          <Icon size={22} strokeWidth={2} aria-hidden="true" />
        </span>
        <span
          className={`font-exo text-sm font-semibold tracking-widest transition duration-250 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            active ? 'text-white/50' : 'text-neutral-400'
          }`}
        >
          {pathway.index}
        </span>
      </div>

      <h3
        className={`relative z-20 font-headline text-2xl font-bold tracking-tight transition duration-250 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white ${
          active ? '-translate-y-2 text-white' : 'text-black'
        }`}
      >
        {pathway.title}
      </h3>

      <div className="relative z-20 mt-2 min-h-[148px]">
        <AnimatePresence initial={false} mode="wait">
          {active ? (
            <motion.div
              key="learn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reducedMotion ? { duration: 0 } : revealTransition}
              className="absolute inset-x-0 top-0 font-sans text-[14px] font-light leading-5 text-white"
            >
              {pathway.learn.map((item, index) => (
                <p
                  key={item}
                  className={`py-0 ${
                    index > 0 ? 'border-t border-white/[0.14]' : ''
                  }`}
                >
                  {item}
                </p>
              ))}
              <p className="mt-2 font-exo text-[11px] font-medium uppercase tracking-wide text-white/70">
                {pathway.meta}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reducedMotion ? { duration: 0 } : revealTransition}
              className="absolute inset-x-0 top-0 font-sans text-[15px] leading-relaxed text-neutral-600"
            >
              {pathway.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <a
        href={pathway.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={active || focused ? 0 : -1}
        onClick={(event) => {
          const wasRevealedBeforeTap = touchTap.current
            ? wasActiveAtPointerDown.current
            : active
          if ((touchTap.current || !finePointer) && !wasRevealedBeforeTap) {
            event.preventDefault()
            onActivate(pathway.id)
          }
          touchTap.current = false
          wasActiveAtPointerDown.current = false
        }}
        className={`group/link relative z-20 mt-auto inline-flex items-center gap-2 pt-6 font-sans text-sm font-semibold transition duration-250 ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2 ${
          active
            ? 'text-white focus-visible:ring-offset-black'
            : 'text-black group-hover/canvas-card:text-white'
        }`}
      >
        Explore the track
        <ArrowUpRight
          size={17}
          className={`transition duration-250 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            active ? 'translate-x-[3px]' : ''
          }`}
          aria-hidden="true"
        />
      </a>
    </div>
  )
}
