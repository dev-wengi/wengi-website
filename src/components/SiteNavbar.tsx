import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { navItems, GET_STARTED_LINK } from '../data/nav'

const MOBILE_MENU_ID = 'mobile-navigation-menu'

export const SiteNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full">
      <div className="pointer-events-auto relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Dev.wengi Home"
          className="relative z-20 shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-[3px]"
        >
          <Logo
            variant="stacked"
            imgClassName="block h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full bg-[var(--ink,#060A07)]/90 px-2 py-1.5 shadow-lg backdrop-blur lg:flex"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              end={item.link === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-inter text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink,#060A07)] ${
                  isActive
                    ? 'text-[var(--brand,#05FF3C)]'
                    : 'text-white hover:text-white/70'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <Link
          to={GET_STARTED_LINK}
          className="relative z-20 hidden rounded-full bg-[var(--brand,#05FF3C)] px-7 py-2.5 font-exo text-[16px] font-semibold text-[var(--ink,#060A07)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-[3px] lg:inline-block"
        >
          Get started
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          className="relative z-20 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 font-inter text-[15px] font-semibold text-black shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-[3px] lg:hidden"
        >
          {isMobileMenuOpen ? (
            <X aria-hidden="true" size={18} />
          ) : (
            <Menu aria-hidden="true" size={18} />
          )}
          Menu
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id={MOBILE_MENU_ID}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute inset-x-4 top-full z-50 sm:inset-x-6 lg:hidden"
            >
              <nav
                aria-label="Primary mobile"
                className="flex w-full flex-col gap-1 rounded-2xl bg-white px-4 py-5 shadow-2xl"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.link}
                    end={item.link === '/'}
                    className={({ isActive }) =>
                      `rounded-md px-2 py-2.5 font-inter text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
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
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[var(--brand,#05FF3C)] px-7 py-3 text-center font-exo text-[16px] font-semibold text-[var(--ink,#060A07)] transition-colors hover:bg-[var(--brand-hover,#04EB37)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                >
                  Get started
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default SiteNavbar
