import { forwardRef } from 'react'
import { motion, type MotionValue } from 'motion/react'

export interface PathStation {
  x: number
  y: number
}

export const PATH_STATIONS: PathStation[] = [
  { x: 210, y: 340 },
  { x: 480, y: 210 },
  { x: 770, y: 340 },
  { x: 1030, y: 210 },
]

export const pathStationPercent = (station: PathStation) => ({
  left: `${(station.x / 1200) * 100}%`,
  top: `${(station.y / 560) * 100}%`,
})

const PATH_DATA =
  'M -150 360 C -40 360, 110 340, 210 340 C 330 340, 360 210, 480 210 C 610 210, 640 340, 770 340 C 890 340, 910 210, 1030 210 C 1110 210, 1260 280, 1350 270'

interface PathSvgProps {
  pathLength: MotionValue<number>
}

export const PathSvg = forwardRef<SVGPathElement, PathSvgProps>(
  function PathSvg({ pathLength }, ref) {
    return (
      <svg
        viewBox="0 0 1200 560"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          d={PATH_DATA}
          fill="none"
          stroke="var(--path-track)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          ref={ref}
          d={PATH_DATA}
          fill="none"
          stroke="var(--path-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
    )
  },
)
