import { mulberry32 } from './pixelPattern'
import type { MosaicParticle } from './mosaicPhysics'

export interface MosaicPatternConfig {
  width: number
  height: number
  cellSize: number
  seed?: number
  mobile?: boolean
  showDigits?: boolean
}

export interface MosaicPattern {
  cols: number
  rows: number
  cells: MosaicParticle[]
}

interface NoiseLayer {
  wavelength: number
  cols: number
  rows: number
  values: number[]
}

function createNoiseLayers(
  cols: number,
  rows: number,
  seed: number,
  wavelengths: number[],
): NoiseLayer[] {
  const random = mulberry32(seed)
  return wavelengths.map((wavelength) => {
    const layerCols = Math.ceil(cols / wavelength) + 1
    const layerRows = Math.ceil(rows / wavelength) + 1
    const values = Array.from({ length: layerCols * layerRows }, random)
    return { wavelength, cols: layerCols, rows: layerRows, values }
  })
}

function sampleNoise(layers: NoiseLayer[], x: number, y: number): number {
  const weights = [0.55, 0.3, 0.15]
  let value = 0

  layers.forEach((layer, index) => {
    const nx = x / layer.wavelength
    const ny = y / layer.wavelength
    const x0 = Math.floor(nx)
    const y0 = Math.floor(ny)
    const tx = nx - x0
    const ty = ny - y0
    const smoothX = tx * tx * (3 - 2 * tx)
    const smoothY = ty * ty * (3 - 2 * ty)
    const at = (col: number, row: number) =>
      layer.values[
        Math.min(layer.rows - 1, row) * layer.cols +
          Math.min(layer.cols - 1, col)
      ]
    const top = at(x0, y0) * (1 - smoothX) + at(x0 + 1, y0) * smoothX
    const bottom =
      at(x0, y0 + 1) * (1 - smoothX) + at(x0 + 1, y0 + 1) * smoothX
    value += (top * (1 - smoothY) + bottom * smoothY) * weights[index]
  })

  return value
}

export function generateMosaicPattern({
  width,
  height,
  cellSize,
  seed = 42,
  mobile = false,
  showDigits = true,
}: MosaicPatternConfig): MosaicPattern {
  const cols = Math.ceil(width / cellSize)
  const rows = Math.ceil(height / cellSize)
  const length = cols * rows
  const noise = createNoiseLayers(cols, rows, seed ^ 0x5f3759df, [18, 9, 4.5])
  const edgeNoise = createNoiseLayers(cols, rows, seed ^ 0x2c1b3c6d, [24, 11, 5])
  const random = mulberry32(seed + 1)
  const horizon = rows * (mobile ? 0.55 : 0.5)
  const keepCenterY = height * 0.23
  const keepRadiusX = mobile ? width * 0.86 : Math.min(width * 0.48, 560)
  const keepRadiusY = height * 0.25
  const keepSoftness = (cellSize * 3) / Math.min(keepRadiusX, keepRadiusY)
  const dark = new Array<boolean>(length)
  const randomValues = new Array<number>(length)
  const digitRandomValues = new Array<number>(length)
  const stiffnessValues = new Array<number>(length)
  const jitterValues = new Array<number>(length)
  const boundaryRows = new Array<number>(cols)

  for (let col = 0; col < cols; col++) {
    const wave = (sampleNoise(edgeNoise, col, horizon) - 0.5) * 10
    const edgeDistance = Math.min(col, cols - 1 - col)
    const edgeCreep = Math.max(0, 1 - edgeDistance / (cols * 0.13)) * 3.5
    boundaryRows[col] = horizon - wave - edgeCreep

    for (let row = 0; row < rows; row++) {
      const index = col * rows + row
      const choice = random()
      randomValues[index] = choice
      digitRandomValues[index] = random()
      stiffnessValues[index] = 0.88 + random() * 0.24
      jitterValues[index] = ((random() - 0.5) * 50 * Math.PI) / 180

      const normalizedX = (col + 0.5 - cols / 2) / Math.max(1, keepRadiusX / cellSize)
      const normalizedY =
        (row + 0.5 - keepCenterY / cellSize) /
        Math.max(1, keepRadiusY / cellSize)
      const keepDistance = Math.sqrt(
        normalizedX * normalizedX + normalizedY * normalizedY,
      )
      const verticalBias =
        ((row - horizon + wave + edgeCreep) * 3.2) / Math.max(1, rows)
      let isDark = sampleNoise(noise, col, row) + verticalBias > 0.52

      if (keepDistance <= 1) {
        isDark = false
      } else if (keepDistance <= 1 + keepSoftness && isDark) {
        isDark = choice < (keepDistance - 1) / keepSoftness
      }

      if (
        keepDistance > 1 &&
        Math.abs(row - boundaryRows[col]) <= 4 &&
        choice < 0.04
      ) {
        isDark = !isDark
      }

      if (row >= rows - 2) isDark = true
      dark[index] = isDark
    }
  }

  const cells: MosaicParticle[] = new Array(length)
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const index = col * rows + row
      const isDark = dark[index]
      let darkNeighbors = 0
      let nearBoundary = false

      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          if (dx === 0 && dy === 0) continue
          const neighborCol = col + dx
          const neighborRow = row + dy
          if (
            neighborCol < 0 ||
            neighborCol >= cols ||
            neighborRow < 0 ||
            neighborRow >= rows
          ) {
            continue
          }
          const neighborDark = dark[neighborCol * rows + neighborRow]
          if (neighborDark !== isDark) nearBoundary = true
          if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && neighborDark) {
            darkNeighbors++
          }
        }
      }

      const digitChance = mobile ? 0.3 : 0.55
      const digit =
        showDigits &&
        !isDark &&
        darkNeighbors > 0 &&
        nearBoundary &&
        digitRandomValues[index] < digitChance
          ? String(darkNeighbors)
          : null

      cells[index] = {
        col,
        row,
        homeX: col * cellSize,
        homeY: row * cellSize,
        cellSize,
        offX: 0,
        offY: 0,
        vx: 0,
        vy: 0,
        dark: isDark,
        digit,
        stiffnessScale: stiffnessValues[index],
        jitterAngle: jitterValues[index],
      }
    }
  }

  return { cols, rows, cells }
}
