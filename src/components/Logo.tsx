import React from 'react'

export interface LogoProps {
  variant?: 'horizontal' | 'stacked'
  alt?: string
  className?: string
  onClick?: () => void
  /** Override image height, default h-10 sm:h-12 */
  imgClassName?: string
}

/**
 * Shared logo component for the supplied transparent wordmark.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  alt = 'Dev.wengi - Build. Learn. Grow Together.',
  className = '',
  onClick,
  imgClassName,
}) => {
  const defaultImgClass = imgClassName ?? 'h-10 sm:h-12 w-auto object-contain block'
  const src = variant === 'stacked' ? '/word%20stacked.png' : '/logo.png'

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer select-none transition-opacity duration-200 hover:opacity-90 ${className}`}
      role="banner"
    >
      <img
        src={src}
        alt={alt}
        className={defaultImgClass}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

export default Logo
