import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ProjectRowProps {
  rowIndex: number
  shiftX: number
  onShift: (rowIndex: number, shiftX: number) => void
  onClear: (rowIndex: number) => void
  children: React.ReactNode
}

export function ProjectRow({
  rowIndex,
  shiftX,
  onShift,
  onClear,
  children,
}: ProjectRowProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isEvenRow = rowIndex % 2 === 1

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const positionMobileRow = () => {
      if (window.innerWidth < 768 && isEvenRow) {
        viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth
      }
    }

    positionMobileRow()
    window.addEventListener('resize', positionMobileRow)
    return () => window.removeEventListener('resize', positionMobileRow)
  }, [isEvenRow])

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !viewportRef.current?.contains(event.target)
      ) {
        onClear(rowIndex)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () =>
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [onClear, rowIndex])

  const revealCroppedCard = (target: EventTarget | null) => {
    if (prefersReducedMotion || window.innerWidth < 768 || !(target instanceof Element)) {
      return
    }

    const card = target.closest<HTMLElement>('[data-project-card]')
    if (!card) return

    const rect = card.getBoundingClientRect()
    const shift =
      rect.left < 16
        ? 16 - rect.left
        : rect.right > window.innerWidth - 16
          ? window.innerWidth - 16 - rect.right
          : 0

    if (shift) onShift(rowIndex, shift)
    else onClear(rowIndex)
  }

  const handlePointerOver = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = event.target instanceof Element
      ? event.target.closest('[data-project-card]')
      : null
    const previousCard = event.relatedTarget instanceof Element
      ? event.relatedTarget.closest('[data-project-card]')
      : null

    if (card && card !== previousCard) revealCroppedCard(event.target)
  }

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') onClear(rowIndex)
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
      onClear(rowIndex)
    }
  }

  return (
    <div
      ref={viewportRef}
      data-project-row={rowIndex}
      onPointerOver={handlePointerOver}
      onPointerDown={(event) => revealCroppedCard(event.target)}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={(event) => revealCroppedCard(event.target)}
      onBlurCapture={handleBlur}
      className={`project-row relative left-1/2 flex w-screen -translate-x-1/2 overflow-visible ${
        isEvenRow ? 'justify-end' : 'justify-start'
      } ${
        isEvenRow
          ? 'max-[767px]:block max-[767px]:overflow-x-auto max-[767px]:pl-12 max-[767px]:scroll-pl-12'
          : 'max-[767px]:block max-[767px]:overflow-x-auto max-[767px]:pl-4 max-[767px]:scroll-pl-4'
      } max-[767px]:[scrollbar-width:none] max-[767px]:[&::-webkit-scrollbar]:hidden`}
    >
      <motion.div
        animate={{ x: prefersReducedMotion ? 0 : shiftX }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 140, damping: 24 }
        }
        style={{
          marginLeft: isEvenRow ? undefined : 'calc(var(--bleed) * -1)',
          marginRight: isEvenRow ? 'calc(var(--bleed) * -1)' : undefined,
        }}
        className="project-row-track flex w-max flex-nowrap gap-[var(--card-gap)] max-[767px]:[margin-left:0!important] max-[767px]:[margin-right:0!important]"
      >
        {children}
      </motion.div>
    </div>
  )
}
