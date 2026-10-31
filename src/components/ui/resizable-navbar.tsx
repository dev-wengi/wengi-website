import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import React, { useEffect, useState } from 'react'

interface NavbarProps {
  children: React.ReactNode
  className?: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavItemsProps {
  items: {
    name: string
    link: string
  }[]
  activeLink: string
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  id: string
  isOpen: boolean
  onClose: () => void
}

const NAVBAR_SHADOW =
  '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 100)
  })

  useEffect(() => {
    setVisible(window.scrollY > 100)
  }, [])

  return (
    <motion.div
      className={cn(
        'pointer-events-none fixed inset-x-0 top-4 z-50 w-full',
        className,
      )}
    >
      <header className="w-full">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
            : child,
        )}
      </header>
    </motion.div>
  )
}

export const NavBody = ({ children, className, visible }: NavBodyProps) => (
  <motion.div
    animate={{
      backdropFilter: visible ? 'blur(10px)' : 'none',
      boxShadow: visible ? NAVBAR_SHADOW : 'none',
      width: visible ? '40%' : '100%',
      y: visible ? 20 : 0,
    }}
    transition={{
      type: 'spring',
      stiffness: 200,
      damping: 50,
    }}
    style={{ minWidth: '800px' }}
    className={cn(
      'relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex',
      visible && 'bg-white/80',
      className,
    )}
  >
    {children}
  </motion.div>
)

export const NavItems = ({
  items,
  activeLink,
  className,
  onItemClick,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <motion.nav
      aria-label="Primary"
      onMouseLeave={() => setHovered(null)}
      onBlur={(event) => {
        if (
          !(event.relatedTarget instanceof Node) ||
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setHovered(null)
        }
      }}
      className={cn(
        'absolute inset-0 z-10 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex',
        className,
      )}
    >
      {items.map((item, index) => (
        <a
          key={`link-${item.name}`}
          href={item.link}
          aria-current={item.link === activeLink ? 'location' : undefined}
          onMouseEnter={() => setHovered(index)}
          onFocus={() => setHovered(index)}
          onClick={onItemClick}
          className="relative rounded-full px-4 py-2 font-inter text-base font-medium text-[var(--text-black)] transition-colors duration-200 hover:text-[var(--green-button-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-button)] focus-visible:ring-offset-[3px]"
          style={
            item.link === activeLink
              ? { color: 'var(--green-button-hover)' }
              : undefined
          }
        >
          {hovered === index && (
            <motion.span
              aria-hidden="true"
              layoutId="hovered"
              className="absolute inset-0 rounded-full bg-[var(--nav-pill-bg)]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.nav>
  )
}

export const MobileNav = ({ children, className, visible }: MobileNavProps) => (
  <motion.div
    animate={{
      backdropFilter: visible ? 'blur(10px)' : 'none',
      boxShadow: visible ? NAVBAR_SHADOW : 'none',
      width: visible ? '90%' : '100%',
      paddingRight: visible ? '12px' : '0px',
      paddingLeft: visible ? '12px' : '0px',
      borderRadius: visible ? '16px' : '32px',
      y: visible ? 20 : 0,
    }}
    transition={{
      type: 'spring',
      stiffness: 200,
      damping: 50,
    }}
    className={cn(
      'pointer-events-auto relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden',
      visible && 'bg-white/80',
      className,
    )}
  >
    {children}
  </motion.div>
)

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => (
  <div
    className={cn('flex w-full flex-row items-center justify-between', className)}
  >
    {children}
  </div>
)

export const MobileNavMenu = ({
  children,
  className,
  id,
  isOpen,
  onClose,
}: MobileNavMenuProps) => (
  <div
    id={id}
    aria-hidden={!isOpen}
    inert={!isOpen}
    className="pointer-events-none absolute inset-x-0 top-16 z-50 w-full"
  >
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest('a')) {
              onClose()
            }
          }}
          className={cn(
            'pointer-events-auto flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white px-4 py-6 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export const MobileNavToggle = ({
  isOpen,
  onClick,
  controls,
}: {
  isOpen: boolean
  onClick: () => void
  controls: string
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    aria-controls={controls}
    className="rounded-full p-2 text-[var(--text-black)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-button)] focus-visible:ring-offset-[3px]"
  >
    {isOpen ? (
      <X aria-hidden="true" size={24} />
    ) : (
      <Menu aria-hidden="true" size={24} />
    )}
  </button>
)

type NavbarButtonProps = {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient' | 'brand'
} & (React.ComponentPropsWithoutRef<'a'> | React.ComponentPropsWithoutRef<'button'>)

export const NavbarButton = ({
  href,
  as: Tag = 'a',
  children,
  className,
  variant = 'primary',
  ...props
}: NavbarButtonProps) => {
  const baseStyles =
    'px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-button)] focus-visible:ring-offset-[3px]'

  const variantStyles = {
    primary:
      'shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    secondary: 'bg-transparent shadow-none',
    dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    gradient:
      'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
    brand:
      'rounded-full bg-[var(--green-button)] px-7 py-2.5 font-exo text-[18px] font-semibold text-white shadow-none hover:bg-[var(--green-button-hover)]',
  }

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export { MotionConfig }
