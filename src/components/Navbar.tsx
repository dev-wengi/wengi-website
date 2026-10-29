import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'

export interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

export interface NavbarProps {
  navItems?: NavItem[]
  ctaText?: string
  ctaHref?: string
  onCtaClick?: () => void
  className?: string
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#', isActive: true },
  { label: 'Learn', href: '#learning-paths' },
  { label: 'Projects', href: '#projects' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Section 1 Navbar Component:
 * - 3-part layout: Logo (left), Capsule Nav (center), "Get started" CTA (right)
 * - Container max-width 1280px with 24px vertical padding
 * - Sticky on scroll with white/80% backdrop blur
 * - Responsive mobile drawer
 */
export const Navbar: React.FC<NavbarProps> = ({
  navItems = DEFAULT_NAV_ITEMS,
  ctaText = 'Choose a path',
  ctaHref = '#learning-paths',
  onCtaClick,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track window scroll for sticky backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-black/5 py-4'
            : 'bg-white py-6'
        } ${className}`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* LEFT: Swappable Brand Logo */}
          <div className="shrink-0">
            <a
              href="#"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)]"
              aria-label="Dev.wengi Home"
            >
              <Logo />
            </a>
          </div>

          {/* CENTER: Capsule Nav Pill (Desktop >= 1024px or >= 768px) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center rounded-full px-7 py-3.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
            style={{
              backgroundColor: 'var(--nav-pill-bg, #F3F4F6)',
            }}
          >
            <ul className="flex items-center gap-7 lg:gap-10 list-none m-0 p-0">
              {navItems.map((item) => {
                const active = item.isActive
                return (
                  <li key={item.label} className="relative">
                    <a
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`font-sans font-medium text-[16px] lg:text-[18px] transition-colors duration-200 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] rounded-sm group block ${
                        active
                          ? 'text-[var(--green-highlight,#6CF05A)] font-semibold'
                          : 'text-[var(--text-black,#0A0A0A)] hover:text-[var(--green-highlight,#6CF05A)]'
                      }`}
                    >
                      {item.label}

                      {/* Subtle hover underline slide */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[var(--green-highlight,#6CF05A)] transition-all duration-200 ${
                          active ? 'w-full bg-[var(--green-highlight,#6CF05A)]' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* RIGHT: "Get started" Pill Button (Desktop) */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href={ctaHref}
              onClick={onCtaClick}
              className="inline-flex items-center justify-center font-exo font-semibold text-[18px] lg:text-[20px] tracking-[0.02em] text-black rounded-full px-7 lg:px-8 py-3 lg:py-3.5 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_8px_20px_rgba(108,240,90,0.35)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2"
              style={{
                backgroundColor: 'var(--green-highlight, #6CF05A)',
              }}
            >
              {ctaText}
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-black hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Down Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-Down Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50 p-6 shadow-xl lg:hidden flex flex-col gap-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-600 hover:text-black hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="flex flex-col gap-3 py-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={item.isActive ? 'page' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-sans font-medium text-lg py-2 transition-colors ${
                      item.isActive
                        ? 'text-[var(--green-highlight,#6CF05A)] font-bold'
                        : 'text-[var(--text-black,#0A0A0A)] hover:text-[var(--green-highlight,#6CF05A)]'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-neutral-100">
                <a
                  href={ctaHref}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onCtaClick?.()
                  }}
                  className="w-full inline-flex items-center justify-center font-exo font-semibold text-[18px] text-black rounded-full py-3.5 shadow-md transition-all hover:brightness-95 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: 'var(--green-highlight, #6CF05A)',
                  }}
                >
                  {ctaText}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
