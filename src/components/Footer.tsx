import React from 'react'
import { Container } from './Container'

export interface SocialLink {
  label: string
  href: string
  icon?: React.ReactNode
}

export interface FooterProps {
  brandName?: string
  socialLinks?: SocialLink[]
  copyrightText?: string
  className?: string
}

const DEFAULT_SOCIALS: SocialLink[] = [
  { label: 'TELEGRAM', href: 'https://t.me' },
  { label: 'TWITTER / X', href: 'https://twitter.com' },
  { label: 'LINKEDIN', href: 'https://linkedin.com' },
  { label: 'DRIBBBLE', href: 'https://dribbble.com' },
]

/**
 * Minimal Dark Footer:
 * - Background: #151515 (bg-darker)
 * - Social links on the left (small caps, hover bright green)
 * - Copyright on the right (muted text)
 */
export const Footer: React.FC<FooterProps> = ({
  brandName = 'WENGI',
  socialLinks = DEFAULT_SOCIALS,
  copyrightText,
  className = '',
}) => {
  const currentYear = new Date().getFullYear()
  const displayCopyright = copyrightText || `© ${currentYear} ${brandName}. ALL RIGHTS RESERVED.`

  return (
    <footer
      className={`bg-[#151515] text-[#A8A8A8] border-t border-white/5 py-10 lg:py-14 relative z-10 ${className}`}
      role="contentinfo"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links Left */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 sm:gap-7">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[11px] uppercase tracking-[0.08em] font-semibold text-[#A8A8A8] hover:text-[var(--green-highlight,#6CF05A)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] rounded-sm py-1"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright Right */}
          <div className="text-center md:text-right">
            <p className="font-heading text-[11px] uppercase tracking-[0.08em] text-[#8C8C8C]">
              {displayCopyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
