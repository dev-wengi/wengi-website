import React from 'react'

export interface GlowBlobProps {
  color?: 'brand' | 'neon' | 'deep'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  opacity?: number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'custom'
  className?: string
  style?: React.CSSProperties
}

/**
 * Large blurred radial green blob (blur 120px+, opacity 0.5-0.8) placed behind dark sections.
 */
export const GlowBlob: React.FC<GlowBlobProps> = ({
  color = 'brand',
  size = 'md',
  opacity = 0.65,
  position = 'top-right',
  className = '',
  style = {},
}) => {
  const colorMap = {
    brand: '#6CF05A',
    neon: '#6CF05A',
    deep: '#6CF05A',
  }[color]

  const sizeMap = {
    sm: 'w-[240px] h-[240px]',
    md: 'w-[380px] h-[380px] lg:w-[460px] lg:h-[460px]',
    lg: 'w-[480px] h-[480px] lg:w-[600px] lg:h-[600px]',
    xl: 'w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]',
  }[size]

  const positionMap = {
    'top-left': '-top-20 -left-20',
    'top-right': '-top-20 -right-20',
    'bottom-left': '-bottom-20 -left-20',
    'bottom-right': '-bottom-20 -right-20',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    custom: '',
  }[position]

  return (
    <div
      aria-hidden="true"
      className={`glow-blob absolute rounded-full pointer-events-none select-none z-0 ${sizeMap} ${positionMap} ${className}`}
      style={{
        background: `radial-gradient(circle, ${colorMap} 0%, rgba(108, 240, 90, 0) 70%)`,
        opacity,
        filter: 'blur(130px)',
        transform: 'translate3d(0, 0, 0)',
        ...style,
      }}
    />
  )
}
