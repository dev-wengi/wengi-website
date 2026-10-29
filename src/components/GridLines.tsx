import React from 'react'

export interface GridLinesProps {
  color?: 'green' | 'white'
  columns?: 4 | 6 | 12
  opacity?: number
  className?: string
}

/**
 * Decorative 1px vertical grid lines on dark sections.
 */
export const GridLines: React.FC<GridLinesProps> = ({
  color = 'white',
  columns = 12,
  opacity = 0.15,
  className = '',
}) => {
  const lineColor = color === 'green' ? 'rgba(108, 240, 90,' : 'rgba(255, 255, 255,'

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-0 overflow-hidden ${className}`}
    >
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-full border-r last:border-r first:border-l"
            style={{
              borderColor: `${lineColor} ${opacity})`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
