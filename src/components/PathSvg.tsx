import type { CSSProperties } from 'react'
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

export const pathStationPercent = (station: PathStation) =>
  ({
    '--station-left': `${(station.x / 1200) * 100}%`,
    '--station-top': `${(station.y / 560) * 100}%`,
  }) as CSSProperties

export const measureStationFractions = (
  path: SVGPathElement,
  stations: readonly PathStation[],
) => {
  const totalLength = path.getTotalLength()

  return stations.map((station) => {
    let low = 0
    let high = totalLength

    for (let iteration = 0; iteration < 24; iteration += 1) {
      const length = (low + high) / 2
      if (path.getPointAtLength(length).x < station.x) low = length
      else high = length
    }

    return (low + high) / (2 * totalLength)
  })
}

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
