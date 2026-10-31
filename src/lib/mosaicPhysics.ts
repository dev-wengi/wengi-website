export interface MosaicPhysicsConfig {
  R: number
  IMPULSE_RADIAL: number
  IMPULSE_DRAG: number
  MAX_OFFSET: number
  STIFFNESS: number
  DAMPING: number
}

export const DEFAULT_MOSAIC_PHYSICS: MosaicPhysicsConfig = {
  R: 150,
  IMPULSE_RADIAL: 2.2,
  IMPULSE_DRAG: 0.55,
  MAX_OFFSET: 140,
  STIFFNESS: 0.035,
  DAMPING: 0.88,
}

export interface MosaicParticle {
  col: number
  row: number
  homeX: number
  homeY: number
  cellSize: number
  offX: number
  offY: number
  vx: number
  vy: number
  dark: boolean
  digit: string | null
  stiffnessScale: number
  jitterAngle: number
}

export interface PointerSample {
  x: number
  y: number
  vx: number
  vy: number
}

export function applyMosaicImpulse(
  particle: MosaicParticle,
  pointer: PointerSample,
  config: MosaicPhysicsConfig,
  intensity = 1,
): void {
  const dx = particle.homeX + particle.cellSize / 2 - pointer.x
  const dy = particle.homeY + particle.cellSize / 2 - pointer.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  if (distance >= config.R) return

  const falloff = (1 - distance / config.R) ** 2
  const radialScale = distance === 0 ? 0 : config.IMPULSE_RADIAL / distance
  const impulseX =
    (dx * radialScale + pointer.vx * config.IMPULSE_DRAG) * falloff * intensity
  const impulseY =
    (dy * radialScale + pointer.vy * config.IMPULSE_DRAG) * falloff * intensity
  const cos = Math.cos(particle.jitterAngle)
  const sin = Math.sin(particle.jitterAngle)

  particle.vx += impulseX * cos - impulseY * sin
  particle.vy += impulseX * sin + impulseY * cos
}

export function stepMosaicParticle(
  particle: MosaicParticle,
  config: MosaicPhysicsConfig,
): boolean {
  const stiffness = config.STIFFNESS * particle.stiffnessScale
  particle.vx = (particle.vx - particle.offX * stiffness) * config.DAMPING
  particle.vy = (particle.vy - particle.offY * stiffness) * config.DAMPING
  particle.offX += particle.vx
  particle.offY += particle.vy

  if (Math.abs(particle.offX) > config.MAX_OFFSET) {
    particle.offX = Math.sign(particle.offX) * config.MAX_OFFSET
    particle.vx = 0
  }
  if (Math.abs(particle.offY) > config.MAX_OFFSET) {
    particle.offY = Math.sign(particle.offY) * config.MAX_OFFSET
    particle.vy = 0
  }

  if (
    Math.abs(particle.offX) < 0.05 &&
    Math.abs(particle.offY) < 0.05 &&
    Math.abs(particle.vx) < 0.05 &&
    Math.abs(particle.vy) < 0.05
  ) {
    particle.offX = 0
    particle.offY = 0
    particle.vx = 0
    particle.vy = 0
    return false
  }

  return true
}
