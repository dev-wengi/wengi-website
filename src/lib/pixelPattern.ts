/**
 * pixelPattern.ts
 * Seeded PRNG (mulberry32) + deterministic column-height profile builder
 * for the PixelField footer dissolving-pixel silhouette.
 *
 * Rules:
 *  - Near 100% fill probability at the bottom, ~5% at the top.
 *  - Column height profile = sum of 2-3 sine waves + seeded noise.
 *  - ~3% extra "loose" squares up to 1.5 cells above the main edge.
 *  - ~4% "hole" squares 1 cell below the main edge.
 *  - Vertical run-lengths (2-3 stacked) for pixel-art character.
 */

// ─── Seeded PRNG ────────────────────────────────────────────────────────────

/** mulberry32 — fast, deterministic, good enough for visual randomness */
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0
  return function () {
    s += 0x6d2b79f5
    let z = s
    z = Math.imul(z ^ (z >>> 15), z | 1)
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61)
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

/** A single pixel square to be rendered. x/y are in CSS-pixel units from top-left of field. */
export interface PixelSquare {
  id: number
  col: number
  row: number
  /** CSS px from left of field container */
  homeX: number
  /** CSS px from top of field container */
  homeY: number
  /** Is this an "above-edge" loose square (may partially overlap page area) */
  loose: boolean
}

export interface PixelPatternConfig {
  fieldWidth: number
  /** Total height of the field container (pixels) */
  fieldHeight: number
  /** Cell size in pixels */
  cellSize: number
  seed?: number
}

// ─── Pattern Generator ────────────────────────────────────────────────────────

export function generatePixelPattern(cfg: PixelPatternConfig): PixelSquare[] {
  const { fieldWidth, fieldHeight, cellSize, seed = 42 } = cfg

  const cols = Math.ceil(fieldWidth / cellSize)
  const rows = Math.ceil(fieldHeight / cellSize)
  const rand = mulberry32(seed)

  // Pre-warm the PRNG so the pattern doesn't depend on call order
  for (let i = 0; i < 32; i++) rand()

  // ── Build column silhouette heights (in rows from the BOTTOM) ──
  // Each column has a "solid fill from" row index counting from bottom.
  // The profile is shaped by 3 sine waves to make an organic edge, like IMAGE A.

  const ampA = rows * 0.22
  const ampB = rows * 0.10
  const ampC = rows * 0.06
  const freqA = (2 * Math.PI) / (cols * 0.55)
  const freqB = (2 * Math.PI) / (cols * 0.22)
  const freqC = (2 * Math.PI) / (cols * 0.09)
  const phaseA = rand() * Math.PI * 2
  const phaseB = rand() * Math.PI * 2
  const phaseC = rand() * Math.PI * 2

  // Base solid rows per column (from bottom): ranges from rows*0.55 to rows*0.75
  const baseBase = rows * 0.6

  const colSolidRows: number[] = []
  for (let c = 0; c < cols; c++) {
    const wave =
      ampA * Math.sin(freqA * c + phaseA) +
      ampB * Math.sin(freqB * c + phaseB) +
      ampC * Math.sin(freqC * c + phaseC)
    // Seeded per-column noise
    const noise = (rand() - 0.5) * rows * 0.08
    const solidRows = Math.round(Math.max(2, Math.min(rows - 1, baseBase + wave + noise)))
    colSolidRows.push(solidRows)
  }

  // ── Fill pixels ──
  const squares: PixelSquare[] = []
  let id = 0

  // Reserve a separate PRNG state for per-cell decisions
  const rand2 = mulberry32(seed + 1)

  for (let c = 0; c < cols; c++) {
    const solidFromRow = rows - colSolidRows[c] // row index (0=top) where solid block starts
    const edgeRow = solidFromRow // first solid row

    for (let r = 0; r < rows; r++) {
      const depthFromEdge = r - edgeRow // negative = above edge, positive = below (solid)

      let include = false

      if (depthFromEdge >= 0) {
        // Below the main edge: near-100% fill with occasional holes
        if (depthFromEdge === 0) {
          // Edge row: ~85% chance
          include = rand2() < 0.85
        } else {
          // Solid body: very high fill with tiny holes (~4% holes at depth 1)
          const holeProbability = depthFromEdge === 1 ? 0.04 : 0.01
          include = rand2() > holeProbability
        }
      } else {
        // Above the edge: exponential sparse fill — pixel-art scatter
        const dist = -depthFromEdge // 1 = just above edge, grows upward
        if (dist <= 3) {
          // Near-edge scatter: run-length feel
          const p = dist === 1 ? 0.45 : dist === 2 ? 0.18 : 0.06
          include = rand2() < p
        } else if (dist <= Math.ceil(1.5)) {
          // Loose "floating" squares
          include = rand2() < 0.03
        }
      }

      if (include) {
        squares.push({
          id: id++,
          col: c,
          row: r,
          homeX: c * cellSize,
          homeY: r * cellSize,
          loose: depthFromEdge < 0,
        })
      }
    }
  }

  return squares
}
