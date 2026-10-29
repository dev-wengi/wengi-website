/**
 * pixelPhysics.ts
 * Spring-damper cursor-repulsion physics for PixelField squares.
 *
 * Designed to run OUTSIDE React state — zero re-renders.
 * All writes go directly to element.style.transform (no reads inside the loop).
 */

// ─── Config ────────────────────────────────────────────────────────────────────

export interface PhysicsConfig {
  /** Influence radius in px (pointer within this distance of a square's home center triggers repulsion) */
  R: number
  /** Maximum displacement in px */
  MAX_DISPLACE: number
  /** Spring stiffness (fraction of delta to apply per frame) */
  STIFFNESS: number
  /** Velocity damping per frame (multiplier, <1) */
  DAMPING: number
}

export const DEFAULT_PHYSICS: PhysicsConfig = {
  R: 170,
  MAX_DISPLACE: 80,
  STIFFNESS: 0.09,
  DAMPING: 0.80,
}

export const TABLET_PHYSICS: PhysicsConfig = {
  ...DEFAULT_PHYSICS,
  R: 130,
  MAX_DISPLACE: 60,
}

// ─── Per-square physics state ──────────────────────────────────────────────────

export interface SquareState {
  /** Home position (field-local px, center of square) */
  homeX: number
  homeY: number
  /** Current offset from home */
  x: number
  y: number
  /** Velocity */
  vx: number
  vy: number
  /** Stiffness variation ±10% for organic feel */
  stiffnessMod: number
  /** Whether this square has a slight perpendicular ripple component */
  hasRipple: boolean
  /** DOM element */
  el: HTMLElement
}

// ─── Simulation ─────────────────────────────────────────────────────────────────

export class PixelPhysics {
  private states: SquareState[] = []
  private cfg: PhysicsConfig
  private rafId: number | null = null
  private isRunning = false

  // Pointer position in field-local coordinates (null = not over field)
  private ptr: { x: number; y: number } | null = null

  // Field bounding rect (cached, updated via IntersectionObserver + resize)
  private rect: DOMRect | null = null

  // Track if anything is still moving (to pause the loop when fully at rest)
  private activeCount = 0

  constructor(cfg: PhysicsConfig = DEFAULT_PHYSICS) {
    this.cfg = cfg
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  setStates(states: SquareState[]) {
    this.states = states
  }

  setRect(rect: DOMRect) {
    this.rect = rect
  }

  setPointer(clientX: number, clientY: number) {
    if (!this.rect) return
    this.ptr = {
      x: clientX - this.rect.left,
      y: clientY - this.rect.top,
    }
    this.start()
  }

  clearPointer() {
    this.ptr = null
    // Keep loop running briefly to let squares spring back
    this.start()
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.rafId = requestAnimationFrame(this.loop)
  }

  stop() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.isRunning = false
    this.rafId = null
  }

  destroy() {
    this.stop()
    this.states = []
  }

  // ── Frame loop ─────────────────────────────────────────────────────────────

  private loop = () => {
    this.tick()

    // Pause if everything is at rest and pointer is not active
    if (this.activeCount === 0 && this.ptr === null) {
      this.isRunning = false
      return
    }

    this.rafId = requestAnimationFrame(this.loop)
  }

  private tick() {
    const { R, MAX_DISPLACE, STIFFNESS, DAMPING } = this.cfg
    const ptr = this.ptr
    const REST_THRESHOLD = 0.05

    let active = 0

    for (let i = 0; i < this.states.length; i++) {
      const s = this.states[i]

      let targetX = 0
      let targetY = 0

      if (ptr !== null) {
        const dx = s.homeX - ptr.x
        const dy = s.homeY - ptr.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < R && dist > 0) {
          const t = 1 - dist / R
          const strength = t * t // smooth quadratic falloff
          const mag = strength * MAX_DISPLACE
          const nx = dx / dist
          const ny = dy / dist

          targetX = nx * mag
          targetY = ny * mag

          // Perpendicular ripple component (~8% of squares)
          if (s.hasRipple) {
            targetX += (-ny) * mag * 0.15
            targetY += nx * mag * 0.15
          }
        }
      }

      // Spring toward target
      const stiffness = STIFFNESS * s.stiffnessMod
      const ax = (targetX - s.x) * stiffness
      const ay = (targetY - s.y) * stiffness

      s.vx = (s.vx + ax) * DAMPING
      s.vy = (s.vy + ay) * DAMPING

      s.x += s.vx
      s.y += s.vy

      // Check rest state
      const atRest =
        Math.abs(s.x) < REST_THRESHOLD &&
        Math.abs(s.y) < REST_THRESHOLD &&
        Math.abs(s.vx) < REST_THRESHOLD &&
        Math.abs(s.vy) < REST_THRESHOLD

      if (atRest) {
        // Snap to home — write only if previously displaced
        if (s.el.style.transform !== '') {
          s.el.style.transform = ''
        }
        if (s.el.style.willChange !== '') {
          s.el.style.willChange = ''
        }
        s.x = 0; s.y = 0; s.vx = 0; s.vy = 0
      } else {
        if (s.el.style.willChange !== 'transform') {
          s.el.style.willChange = 'transform'
        }
        s.el.style.transform = `translate3d(${s.x.toFixed(2)}px,${s.y.toFixed(2)}px,0)`
        active++
      }
    }

    this.activeCount = active
  }
}
