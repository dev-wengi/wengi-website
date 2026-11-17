import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { navItems, GET_STARTED_LINK } from '../data/nav'

const MOBILE_MENU_ID = 'mobile-navigation-menu'
const SCROLL_THRESHOLD = 100

export const SiteNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    const closeOnDesktopResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktopResize)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktopResize)
    }
  }, [isMobileMenuOpen])

  return (
    <MotionConfig reducedMotion="user">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex w-full justify-center">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          className={`pointer-events-auto relative motion-safe:transition-[border-radius,background-color,box-shadow,margin-top] motion-safe:duration-300 ${
            scrolled
              ? 'mt-4 w-fit max-w-[calc(100vw-2rem)] rounded-full border border-black/5 bg-white/85 shadow-xl backdrop-blur-md'
              : 'w-full border-b border-black/5 bg-white/80 shadow-sm backdrop-blur-md'
          }`}
        >
          <div
            className={`mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6 px-4 motion-safe:transition-all motion-safe:duration-300 sm:px-5 lg:gap-10 ${
              scrolled ? 'py-2' : 'py-3'
            }`}
          >
            <Link
              to="/"
              aria-label="Dev.wengi Home"
              className="relative z-20 shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] focus-visible:ring-offset-[3px]"
            >
              <Logo
                variant="stacked"
                imgClassName={`block w-auto object-contain motion-safe:transition-all motion-safe:duration-300 ${
                  scrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-12'
                }`}
              />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  end={item.link === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 font-inter text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] ${
                      isActive
                        ? 'text-[var(--brand-ink,#007D1B)]'
                        : 'text-neutral-800 hover:text-[var(--brand-ink,#007D1B)]'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <Link
              to={GET_STARTED_LINK}
              className="relative z-20 hidden shrink-0 rounded-full bg-[var(--brand,#05FF3C)] px-7 py-2.5 font-exo text-[16px] font-semibold text-[var(--ink,#060A07)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] focus-visible:ring-offset-[3px] lg:inline-block"
            >
              Get started
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              className="relative z-20 inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--ink,#060A07)] px-5 py-2.5 font-inter text-[15px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] focus-visible:ring-offset-[3px] lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" size={18} />
              ) : (
                <Menu aria-hidden="true" size={18} />
              )}
              Menu
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id={MOBILE_MENU_ID}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute inset-x-0 top-[calc(100%+8px)] z-50 px-4 lg:hidden"
              >
                <nav
                  aria-label="Primary mobile"
                  className="flex w-full flex-col gap-1 rounded-3xl border border-black/5 bg-white px-4 py-5 shadow-2xl"
                >
                  {navItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.link}
                      end={item.link === '/'}
                      className={({ isActive }) =>
                        `rounded-md px-2 py-2.5 font-inter text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)] ${
                          isActive
                            ? 'text-[var(--brand-ink,#007D1B)]'
                            : 'text-[var(--text-black,#060A07)] hover:text-[var(--brand-ink,#007D1B)]'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <Link
                    to={GET_STARTED_LINK}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[var(--brand,#05FF3C)] px-7 py-3 text-center font-exo text-[16px] font-semibold text-[var(--ink,#060A07)] transition-colors hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ink)]"
                  >
                    Get started
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </MotionConfig>
  )
}

export default SiteNavbar
