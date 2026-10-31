import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  MotionConfig,
  Navbar,
  NavbarButton,
  NavBody,
  NavItems,
} from './ui/resizable-navbar'
import { navItems } from '../data/nav'

const MOBILE_MENU_ID = 'mobile-navigation-menu'
const ACTIVE_SECTION_IDS = ['home', 'vision', 'projects', 'faqs', 'contact']

function getActiveSection(): string {
  const activationPoint = window.innerHeight * 0.35
  const sections = ACTIVE_SECTION_IDS.map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null)
    .map((section) => ({ id: section.id, rect: section.getBoundingClientRect() }))

  const current = sections.find(
    ({ rect }) => rect.top <= activationPoint && rect.bottom > activationPoint,
  )
  if (current) return current.id
  return sections.find(({ rect }) => rect.top > activationPoint)?.id ?? 'contact'
}

export const SiteNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sectionElements = ACTIVE_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      () => setActiveSection(getActiveSection()),
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    sectionElements.forEach((section) => observer.observe(section))
    setActiveSection(getActiveSection())

    return () => observer.disconnect()
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

  const activeLink = activeSection === 'home' ? '#home' : '#vision'

  return (
    <MotionConfig reducedMotion="user">
      <Navbar>
        <NavBody className="pointer-events-auto">
          <a
            href="#home"
            aria-label="Dev.wengi Home"
            className="relative z-20 shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-button)] focus-visible:ring-offset-[3px]"
          >
            <Logo imgClassName="block h-10 w-auto object-contain sm:h-12" />
          </a>
          <NavItems
            items={navItems}
            activeLink={activeLink}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
          <NavbarButton
            href="#start"
            variant="brand"
            className="relative z-20"
          >
            Get started
          </NavbarButton>
        </NavBody>

        <MobileNav className="pointer-events-auto">
          <MobileNavHeader>
            <a
              href="#home"
              aria-label="Dev.wengi Home"
              className="relative z-20 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-button)] focus-visible:ring-offset-[3px]"
            >
              <Logo imgClassName="block h-10 w-auto object-contain" />
            </a>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              controls={MOBILE_MENU_ID}
            />
          </MobileNavHeader>

          <MobileNavMenu
            id={MOBILE_MENU_ID}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <nav aria-label="Primary mobile" className="flex w-full flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  aria-current={item.link === activeLink ? 'location' : undefined}
                  className="rounded-md py-2 font-inter text-lg font-medium text-[var(--text-black)] transition-colors hover:text-[var(--green-button-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-button)] focus-visible:ring-offset-[3px]"
                  style={
                    item.link === activeLink
                      ? { color: 'var(--green-button-hover)' }
                      : undefined
                  }
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <NavbarButton
              href="#start"
              variant="brand"
              className="w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get started
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </MotionConfig>
  )
}

export default SiteNavbar
