/**
 * PixelField.tsx
 * The signature dissolving-pixel-square decoration for the footer.
 *
 * Architecture:
 *  - Pattern is generated once per width-change via ResizeObserver (debounced).
 *  - Physics (spring-damper cursor repulsion) runs in a single rAF loop via
 *    PixelPhysics class, with no React state reads/writes during the loop.
 *  - All squares are real <div>s positioned with CSS translate3d for GPU compositing.
 *  - The field sits at the TOP of the footer with negative margin-top so it overlaps
 *    the preceding white section (the "sky"), creating the dissolving-edge illusion.
 *  - aria-hidden="true", pointer-events: none — never blocks links or text selection.
 *
 * Touch / no fine pointer: static pattern + subtle autonomous slow-ripple.
 * prefers-reduced-motion: fully static, no rAF at all.
 */

import React, {
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { generatePixelPattern, type PixelSquare } from '../lib/pixelPattern'
import {
  PixelPhysics,
  DEFAULT_PHYSICS,
  TABLET_PHYSICS,
  type SquareState,
} from '../lib/pixelPhysics'
import { mulberry32 } from '../lib/pixelPattern'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** clamp(val, min, max) */
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

/** Compute cell size based on container width */
function getCellSize(width: number): number {
  if (width < 640) return 14
  if (width < 1024) return 16
  return clamp(Math.round(width * 0.016), 14, 24)
}

/** Field height based on viewport width */
function getFieldHeight(width: number): number {
  if (width < 640) return clamp(Math.round(width * 0.2), 80, 160)
  if (width < 1024) return clamp(Math.round(width * 0.16), 90, 140)
  return clamp(Math.round(width * 0.14), 120, 220)
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface PixelFieldProps {
  /** Pixel colour (defaults to the footer background). */
  color?: string
  seed?: number
}

export const PixelField: React.FC<PixelFieldProps> = ({
  color = 'var(--footer-blue, #000000)',
  seed = 42,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const squaresContainerRef = useRef<HTMLDivElement>(null)

  // Physics engine instance (lives for the lifetime of the component)
  const physicsRef = useRef<PixelPhysics | null>(null)

  // Current field dimensions
  const dimsRef = useRef({ width: 0, height: 0, cellSize: 0 })
  const builtPatternRef = useRef<{ width: number; seed: number; color: string } | null>(null)

  // Pointer-to-field-local transform
  const rectRef = useRef<DOMRect | null>(null)

  // Media-query state (refs, not state — no re-render on change)
  const hasFinePointerRef = useRef(true)
  const prefersReducedMotionRef = useRef(false)
  const autonomousRafRef = useRef<number | null>(null)

  // Autonomous slow-ripple virtual pointer for touch/coarse devices

  // ── Build + mount squares ─────────────────────────────────────────────────

  const buildPattern = useCallback(() => {
    const container = containerRef.current
    const sq = squaresContainerRef.current
    if (!container || !sq) return

    const width = container.offsetWidth
    if (width < 10) return

    const previousBuild = builtPatternRef.current
    if (
      previousBuild?.width === width &&
      previousBuild.seed === seed &&
      previousBuild.color === color
    ) {
      return
    }

    const cellSize = getCellSize(width)
    const height = getFieldHeight(width)

    // Update container height
    container.style.height = `${height}px`
    container.style.marginTop = `-${height}px`

    // Stop existing physics
    physicsRef.current?.stop()

    // Clear previous squares
    while (sq.firstChild) sq.removeChild(sq.firstChild)

    // Generate pattern
    const pattern: PixelSquare[] = generatePixelPattern({
      fieldWidth: width,
      fieldHeight: height,
      cellSize,
      seed,
    })

    dimsRef.current = { width, height, cellSize }

    // Create DOM elements + physics states
    const prng = mulberry32(seed + 999)
    const states: SquareState[] = []

    const frag = document.createDocumentFragment()

    for (const sq_data of pattern) {
      const el = document.createElement('div')
      el.style.cssText = `
        position: absolute;
        left: ${sq_data.homeX}px;
        top: ${sq_data.homeY}px;
        width: ${cellSize}px;
        height: ${cellSize}px;
        background: ${color};
      `
      frag.appendChild(el)

      states.push({
        homeX: sq_data.homeX + cellSize / 2,
        homeY: sq_data.homeY + cellSize / 2,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        stiffnessMod: 0.9 + prng() * 0.2,      // ±10%
        hasRipple: prng() < 0.08,                // ~8% ripple
        el,
      })
    }

    sq.appendChild(frag)

    // Update physics
    if (!physicsRef.current) {
      physicsRef.current = new PixelPhysics(
        window.innerWidth < 1024 ? TABLET_PHYSICS : DEFAULT_PHYSICS,
      )
    }
    physicsRef.current.setStates(states)

    // Re-cache rect
    const rect = container.getBoundingClientRect()
    rectRef.current = rect
    physicsRef.current.setRect(rect)
    builtPatternRef.current = { width, seed, color }
  }, [color, seed])

  // ── Autonomous ripple (touch/coarse) ──────────────────────────────────────

  const startAutonomous = useCallback(() => {
    if (!physicsRef.current || prefersReducedMotionRef.current) return
    const PERIOD = 25_000 // ms for one full pass
    let start: number | null = null

    const physics = physicsRef.current

    const step = (ts: number) => {
      if (start === null) start = ts
      const t = ((ts - start) % PERIOD) / PERIOD
      const width = dimsRef.current.width
      const height = dimsRef.current.height

      // Virtual pointer sweeps left → right at mid-height of the field
      const vx = t * (width + 200) - 100
      const vy = height * 0.55
      physics.setPointer(
        (rectRef.current?.left ?? 0) + vx,
        (rectRef.current?.top ?? 0) + vy,
      )
      autonomousRafRef.current = requestAnimationFrame(step)
    }

    autonomousRafRef.current = requestAnimationFrame(step)
  }, [])

  const stopAutonomous = useCallback(() => {
    if (autonomousRafRef.current !== null) {
      cancelAnimationFrame(autonomousRafRef.current)
      autonomousRafRef.current = null
    }
  }, [])

  // ── Event handlers ────────────────────────────────────────────────────────

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!hasFinePointerRef.current) return
    if (!physicsRef.current || !rectRef.current) return

    physicsRef.current.setPointer(e.clientX, e.clientY)
  }, [])

  const onPointerLeave = useCallback((e: PointerEvent) => {
    if (e.relatedTarget !== null) return
    physicsRef.current?.clearPointer()
  }, [])

  // Re-cache the bounding rect cheaply (not on every mouse move)
  const updateRect = useCallback(() => {
    if (containerRef.current && physicsRef.current) {
      const r = containerRef.current.getBoundingClientRect()
      rectRef.current = r
      physicsRef.current.setRect(r)
    }
  }, [])

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  useEffect(() => {
    // Media-query watchers
    const mqPointer = window.matchMedia('(pointer: fine)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    hasFinePointerRef.current = mqPointer.matches
    prefersReducedMotionRef.current = mqMotion.matches

    const onPointerChange = (e: MediaQueryListEvent) => {
      hasFinePointerRef.current = e.matches
      if (!e.matches) {
        stopAutonomous()
        startAutonomous()
      } else {
        stopAutonomous()
      }
    }
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches
      if (e.matches) {
        stopAutonomous()
        physicsRef.current?.stop()
      } else if (!hasFinePointerRef.current) {
        startAutonomous()
      }
    }

    mqPointer.addEventListener('change', onPointerChange)
    mqMotion.addEventListener('change', onMotionChange)

    // Build initial pattern
    buildPattern()

    // Start autonomous on touch if no reduced-motion
    if (!hasFinePointerRef.current && !prefersReducedMotionRef.current) {
      startAutonomous()
    }

    // Pointer listeners on window (passive, no page scroll interference)
    if (!prefersReducedMotionRef.current) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerout', onPointerLeave, { passive: true })
    }

    // ResizeObserver to rebuild on width change (debounced 120ms)
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        buildPattern()
        updateRect()
      }, 120)
    })
    if (containerRef.current) ro.observe(containerRef.current)

    // IntersectionObserver to keep rect up-to-date on scroll
    const io = new IntersectionObserver(() => updateRect(), { threshold: 0 })
    if (containerRef.current) io.observe(containerRef.current)

    // Scroll listener for rect
    const onScroll = () => updateRect()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      mqPointer.removeEventListener('change', onPointerChange)
      mqMotion.removeEventListener('change', onMotionChange)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerout', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
      if (resizeTimer) clearTimeout(resizeTimer)
      ro.disconnect()
      io.disconnect()
      stopAutonomous()
      builtPatternRef.current = null
      physicsRef.current?.destroy()
    }
  }, [buildPattern, onPointerMove, onPointerLeave, updateRect, startAutonomous, stopAutonomous])

  // The field sits at the top of the footer:
  //  - negative margin-top pulls it up into the white section above
  //  - the footer body starts at the BOTTOM of this div (no gap)
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'visible',
        // Pull up so squares emerge from white into blue
        marginTop: `calc(-1 * ${getFieldHeight(typeof window !== 'undefined' ? window.innerWidth : 1440)}px)`,
        pointerEvents: 'none',
        flexShrink: 0,
      }}
    >
      {/* Square container — positioned absolutely so squares don't affect layout */}
      <div
        ref={squaresContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default PixelField
