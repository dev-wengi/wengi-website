import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  rel?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

/**
 * Reusable Button component adhering to global design tokens.
 *
 * Variants:
 * - primary: bright green fill, black text, 12px / pill radius, glow hover
 * - secondary: white fill, black uppercase text, square corners ("SEE MORE..."), hover lift
 * - outline: 1px green border, transparent bg, green text, hover lift
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  // Base styles: uppercase, 0.08em letter-spacing, font-heading, smooth transition, focus-visible
  const baseStyles =
    'inline-flex items-center justify-center font-heading uppercase text-label font-semibold tracking-[0.08em] transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1E1E]'

  // Size styles
  const sizeStyles = {
    sm: 'text-[11px] px-4 py-2 gap-1.5',
    md: 'text-[12px] px-6 py-3.5 gap-2',
    lg: 'text-[12px] px-8 py-4 gap-2.5',
  }[size]

  // Variant styles
  const variantStyles = {
    primary:
      'bg-[var(--green-highlight,#6CF05A)] text-black rounded-[12px] hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_0_30px_rgba(108,240,90,0.45)] active:translate-y-0 active:brightness-90 active:shadow-none border border-transparent',
    secondary:
      'bg-white text-[#1A1A1A] rounded-none hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-lg active:translate-y-0 border-0',
    outline:
      'bg-transparent border border-[var(--green-highlight,#6CF05A)] text-[var(--green-highlight,#6CF05A)] rounded-[12px] hover:-translate-y-0.5 hover:bg-[var(--green-highlight,#6CF05A)]/10 hover:shadow-[0_0_20px_rgba(108,240,90,0.25)] active:translate-y-0',
  }[variant]

  const widthStyle = fullWidth ? 'w-full' : ''
  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`.trim()

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
        className={combinedClasses}
        aria-disabled={disabled}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={props.type || 'button'}
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  )
}
