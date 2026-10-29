import React from 'react'
import logoLight from '../assets/logos/logo-transparent.png'
import logoDark from '../assets/logos/logo-dark.png'

export interface LogoProps {
  /** 'light' = default brand logo on white/light bg
   *  'dark'  = dark variant (on dark bg)
   *  'onBlue' = light logo on blue footer bg (reuses light asset, adds white text override via CSS) */
  theme?: 'light' | 'dark' | 'onBlue'
  alt?: string
  className?: string
  onClick?: () => void
  /** Override image height, default h-10 sm:h-12 */
  imgClassName?: string
}

/**
 * Official Dev.wengi Logo Component
 * - Uses the actual cropped brand image asset
 * - 'onBlue' variant: uses the light (transparent) logo which has the green icon + text,
 *   displayed with full opacity on the blue footer background.
 */
export const Logo: React.FC<LogoProps> = ({
  theme = 'light',
  alt = 'Dev.wengi - Build. Learn. Grow Together.',
  className = '',
  onClick,
  imgClassName,
}) => {
  // onBlue reuses the light (transparent) logo — the green + white marks read well on blue
  const logoSrc = theme === 'dark' ? logoDark : logoLight

  const defaultImgClass = imgClassName ?? 'h-10 sm:h-12 w-auto object-contain block'

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer select-none transition-opacity duration-200 hover:opacity-90 ${className}`}
      role="banner"
    >
      <img
        src={logoSrc}
        alt={alt}
        className={defaultImgClass}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

export default Logo
