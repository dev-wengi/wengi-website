import { useEffect, useRef } from 'react'
import {
  applyMosaicImpulse,
  DEFAULT_MOSAIC_PHYSICS,
  stepMosaicParticle,
  type MosaicParticle,
  type MosaicPhysicsConfig,
  type PointerSample,
} from '../lib/mosaicPhysics'
import { generateMosaicPattern } from '../lib/mosaicPattern'

export interface PixelMosaicBackgroundProps {
  seed?: number
  cellSize?: number
  lightColor?: string
  darkColor?: string
  showDigits?: boolean
  radius?: number
  intensity?: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function getResponsiveCellSize(width: number): number {
  if (width < 768) return 18
  if (width < 1024) return clamp(width * 0.024, 20, 24)
  return clamp(width * 0.024, 22, 36)
}

function cssColor(
  styles: CSSStyleDeclaration,
  name: string,
  fallback: string,
): string {
  return styles.getPropertyValue(name).trim() || fallback
}

function drawCell(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  cellSize: number,
  dpr: number,
  color: string,
): void {
  const left = Math.round(x * dpr)
  const top = Math.round(y * dpr)
  const right = Math.round((x + cellSize) * dpr)
  const bottom = Math.round((y + cellSize) * dpr)
  context.fillStyle = color
  context.fillRect(
    left / dpr,
    top / dpr,
    (right - left) / dpr + 0.5,
    (bottom - top) / dpr + 0.5,
  )
}

export function PixelMosaicBackground({
  seed = 42,
  cellSize: cellSizeOverride,
  lightColor,
  darkColor,
  showDigits = true,
  radius,
  intensity = 1,
}: PixelMosaicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement
    if (!canvas || !section) return

    let context: CanvasRenderingContext2D | null = null
    try {
      context = canvas.getContext('2d')
    } catch (error) {
      console.warn('Pixel mosaic canvas is unavailable; using the CSS fallback.', error)
      canvas.style.visibility = 'hidden'
      return
    }

    if (!context) {
      console.warn('Pixel mosaic canvas is unavailable; using the CSS fallback.')
      canvas.style.visibility = 'hidden'
      return
    }

    const restCanvas = document.createElement('canvas')
    const restContext = restCanvas.getContext('2d')
    if (!restContext) {
      console.warn('Pixel mosaic offscreen canvas is unavailable; using the CSS fallback.')
      canvas.style.visibility = 'hidden'
      return
    }

    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const activeCells = new Set<MosaicParticle>()
    let cells: MosaicParticle[] = []
    let columns = 0
    let rows = 0
    let width = 0
    let height = 0
    let cellSize = 0
    let dpr = 1
    let light = '#F2F2F2'
    let dark = '#000000'
    let digitColor = '#9A9A9A'
    let glowColor = 'rgba(108, 240, 90, 0.35)'
    let rect: DOMRect | null = null
    let isVisible = false
    let isReducedMotion = reducedMotionQuery.matches
    let hasFinePointer = finePointerQuery.matches
    let frameId: number | null = null
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    let ghostTimer: ReturnType<typeof setTimeout> | null = null
    let ghostStartedAt: number | null = null
    let previousPointer: { x: number; y: number; time: number } | null = null
    let lastClientPointer: { x: number; y: number } | null = null
    let pointerSample: PointerSample | null = null
    let glowTarget: { x: number; y: number } | null = null
    let glowPosition: { x: number; y: number } | null = null
    let glowVisible = false
    let physicsConfig: MosaicPhysicsConfig = {
      ...DEFAULT_MOSAIC_PHYSICS,
      R: radius ?? DEFAULT_MOSAIC_PHYSICS.R,
    }

    const canAnimate = () =>
      !isReducedMotion && isVisible && document.visibilityState !== 'hidden'

    const cancelFrame = () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      frameId = null
    }

    const cancelGhostTimer = () => {
      if (ghostTimer !== null) window.clearTimeout(ghostTimer)
      ghostTimer = null
    }

    const drawRest = () => {
      if (width <= 0 || height <= 0) return
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)
      context!.clearRect(0, 0, width, height)
      context!.drawImage(restCanvas, 0, 0, width, height)
    }

    const drawDigit = (
      target: CanvasRenderingContext2D,
      particle: MosaicParticle,
      x: number,
      y: number,
    ) => {
      if (!particle.digit) return
      target.fillStyle = digitColor
      target.font = `${Math.max(7, Math.min(10, cellSize * 0.29))}px "Exo 2", ui-monospace, monospace`
      target.textAlign = 'center'
      target.textBaseline = 'middle'
      target.fillText(particle.digit, x + cellSize * 0.28, y + cellSize * 0.28)
    }

    const drawFrame = () => {
      if (width <= 0 || height <= 0) return
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)
      context!.clearRect(0, 0, width, height)
      context!.drawImage(restCanvas, 0, 0, width, height)

      if (glowVisible && glowPosition) {
        const x = Math.floor(glowPosition.x / cellSize) * cellSize
        const y = Math.floor(glowPosition.y / cellSize) * cellSize
        drawCell(context!, x, y, cellSize, dpr, glowColor)
      }

      for (const particle of activeCells) {
        drawCell(
          context!,
          particle.homeX,
          particle.homeY,
          cellSize,
          dpr,
          particle.dark ? light : dark,
        )
      }

      for (const particle of activeCells) {
        const x = particle.homeX + particle.offX
        const y = particle.homeY + particle.offY
        drawCell(
          context!,
          x,
          y,
          cellSize,
          dpr,
          particle.dark ? dark : light,
        )
        drawDigit(context!, particle, x, y)
      }
    }

    const renderRestImage = () => {
      const styles = getComputedStyle(section)
      light = lightColor || cssColor(styles, '--pixel-light', '#F2F2F2')
      dark = darkColor || cssColor(styles, '--pixel-dark', '#000000')
      digitColor = cssColor(styles, '--pixel-digit', '#9A9A9A')
      glowColor = cssColor(styles, '--pixel-glow', 'rgba(108, 240, 90, 0.35)')

      restCanvas.width = Math.ceil(width * dpr)
      restCanvas.height = Math.ceil(height * dpr)
      restContext.setTransform(dpr, 0, 0, dpr, 0, 0)
      restContext.clearRect(0, 0, width, height)

      for (const particle of cells) {
        drawCell(
          restContext,
          particle.homeX,
          particle.homeY,
          cellSize,
          dpr,
          particle.dark ? dark : light,
        )
        drawDigit(restContext, particle, particle.homeX, particle.homeY)
      }
      drawRest()
    }

    const rebuild = () => {
      const bounds = section.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      rect = bounds
      if (width < 1 || height < 1) return

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cellSize = cellSizeOverride ?? getResponsiveCellSize(width)
      const mobile = width < 768
      physicsConfig = {
        ...DEFAULT_MOSAIC_PHYSICS,
        R: radius ?? (width < 1024 ? 110 : DEFAULT_MOSAIC_PHYSICS.R),
      }
      columns = Math.ceil(width / cellSize)
      rows = Math.ceil(height / cellSize)
      const pattern = generateMosaicPattern({
        width,
        height,
        cellSize,
        seed,
        mobile,
        showDigits,
      })
      cells = pattern.cells
      activeCells.clear()
      previousPointer = null
      pointerSample = null
      ghostStartedAt = null
      glowPosition = null

      canvas.width = Math.ceil(width * dpr)
      canvas.height = Math.ceil(height * dpr)
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)
      renderRestImage()
    }

    const scheduleFrame = () => {
      if (frameId !== null || !canAnimate()) return
      frameId = requestAnimationFrame(animate)
    }

    const applyPointer = (
      x: number,
      y: number,
      time: number,
      showGlow: boolean,
    ) => {
      const previous = previousPointer
      let vx = 0
      let vy = 0
      if (previous) {
        const elapsedFrames = Math.max(1, (time - previous.time) / 16.67)
        const measuredX = clamp((x - previous.x) / elapsedFrames, -32, 32)
        const measuredY = clamp((y - previous.y) / elapsedFrames, -32, 32)
        vx = pointerSample ? pointerSample.vx * 0.55 + measuredX * 0.45 : measuredX
        vy = pointerSample ? pointerSample.vy * 0.55 + measuredY * 0.45 : measuredY
      }
      previousPointer = { x, y, time }
      pointerSample = { x, y, vx, vy }

      const minCol = Math.max(0, Math.floor((x - physicsConfig.R) / cellSize))
      const maxCol = Math.min(
        columns - 1,
        Math.floor((x + physicsConfig.R) / cellSize),
      )
      const minRow = Math.max(0, Math.floor((y - physicsConfig.R) / cellSize))
      const maxRow = Math.min(
        rows - 1,
        Math.floor((y + physicsConfig.R) / cellSize),
      )
      for (let col = minCol; col <= maxCol; col++) {
        for (let row = minRow; row <= maxRow; row++) {
          const particle = cells[col * rows + row]
          if (!particle) continue
          applyMosaicImpulse(particle, pointerSample, physicsConfig, intensity)
          if (
            Math.abs(particle.vx) > 0.05 ||
            Math.abs(particle.vy) > 0.05 ||
            Math.abs(particle.offX) > 0.05 ||
            Math.abs(particle.offY) > 0.05
          ) {
            activeCells.add(particle)
          }
        }
      }

      if (showGlow && hasFinePointer) {
        glowTarget = { x, y }
        glowVisible = true
        if (!glowPosition) glowPosition = { x, y }
      }
      scheduleFrame()
    }

    const moveFromEvent = (event: PointerEvent) => {
      if (isReducedMotion || !rect || !canAnimate()) return
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      lastClientPointer = { x: event.clientX, y: event.clientY }
      applyPointer(
        x,
        y,
        event.timeStamp || performance.now(),
        event.pointerType !== 'touch',
      )
    }

    const clearPointer = () => {
      previousPointer = null
      pointerSample = null
      lastClientPointer = null
      glowTarget = null
      glowVisible = false
      scheduleFrame()
    }

    const scheduleGhost = () => {
      cancelGhostTimer()
      if (!canAnimate() || hasFinePointer) return
      ghostTimer = window.setTimeout(() => {
        ghostTimer = null
        ghostStartedAt = performance.now()
        scheduleFrame()
      }, 6000)
    }

    function animate(time: number) {
      frameId = null
      if (!canAnimate()) return

      if (ghostStartedAt !== null) {
        const progress = (time - ghostStartedAt) / 1800
        if (progress >= 1) {
          ghostStartedAt = null
          previousPointer = null
          pointerSample = null
          scheduleGhost()
        } else {
          const eased = progress * progress * (3 - 2 * progress)
          const x = width * (0.08 + eased * 0.84)
          const y = height * (0.55 + Math.sin(progress * Math.PI * 2) * 0.025)
          applyPointer(x, y, time, false)
        }
      }

      for (const particle of activeCells) {
        if (!stepMosaicParticle(particle, physicsConfig)) {
          activeCells.delete(particle)
        }
      }

      let glowMoving = false
      if (glowVisible && glowTarget && glowPosition) {
        const dx = glowTarget.x - glowPosition.x
        const dy = glowTarget.y - glowPosition.y
        glowPosition.x += dx * 0.28
        glowPosition.y += dy * 0.28
        glowMoving = Math.abs(dx) > 0.25 || Math.abs(dy) > 0.25
        if (!glowMoving) {
          glowPosition.x = glowTarget.x
          glowPosition.y = glowTarget.y
        }
      }

      drawFrame()
      if (activeCells.size > 0 || ghostStartedAt !== null || glowMoving) {
        scheduleFrame()
      }
    }

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'touch') clearPointer()
    }

    const updateRect = () => {
      rect = section.getBoundingClientRect()
      if (lastClientPointer && canAnimate()) {
        applyPointer(
          lastClientPointer.x - rect.left,
          lastClientPointer.y - rect.top,
          performance.now(),
          true,
        )
      }
    }

    const onResize = () => {
      if (resizeTimer !== null) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resizeTimer = null
        rebuild()
        scheduleGhost()
      }, 120)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cancelFrame()
        cancelGhostTimer()
      } else {
        updateRect()
        scheduleGhost()
        if (activeCells.size || (glowVisible && glowTarget)) scheduleFrame()
      }
    }

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      isReducedMotion = event.matches
      cancelFrame()
      cancelGhostTimer()
      ghostStartedAt = null
      if (isReducedMotion) {
        for (const particle of cells) {
          particle.offX = 0
          particle.offY = 0
          particle.vx = 0
          particle.vy = 0
        }
        activeCells.clear()
        glowVisible = false
        drawRest()
      } else {
        scheduleGhost()
      }
    }

    const onFinePointerChange = (event: MediaQueryListEvent) => {
      hasFinePointer = event.matches
      glowVisible = false
      glowPosition = null
      glowTarget = null
      previousPointer = null
      pointerSample = null
      if (hasFinePointer) {
        cancelGhostTimer()
        ghostStartedAt = null
      } else {
        scheduleGhost()
      }
      drawFrame()
    }

    rebuild()
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(section)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false
        if (isVisible) {
          updateRect()
          scheduleGhost()
          if (activeCells.size || (glowVisible && glowTarget)) scheduleFrame()
        } else {
          cancelFrame()
          cancelGhostTimer()
        }
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(section)

    section.addEventListener('pointermove', moveFromEvent, { passive: true })
    section.addEventListener('pointerdown', moveFromEvent, { passive: true })
    section.addEventListener('pointerup', onPointerUp, { passive: true })
    section.addEventListener('pointercancel', clearPointer, { passive: true })
    section.addEventListener('pointerleave', clearPointer, { passive: true })
    window.addEventListener('scroll', updateRect, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotionQuery.addEventListener('change', onReducedMotionChange)
    finePointerQuery.addEventListener('change', onFinePointerChange)

    return () => {
      cancelFrame()
      cancelGhostTimer()
      if (resizeTimer !== null) clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      section.removeEventListener('pointermove', moveFromEvent)
      section.removeEventListener('pointerdown', moveFromEvent)
      section.removeEventListener('pointerup', onPointerUp)
      section.removeEventListener('pointercancel', clearPointer)
      section.removeEventListener('pointerleave', clearPointer)
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
      finePointerQuery.removeEventListener('change', onFinePointerChange)
    }
  }, [darkColor, intensity, lightColor, radius, seed, showDigits, cellSizeOverride])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
      style={{ imageRendering: 'pixelated', touchAction: 'pan-y' }}
    />
  )
}
