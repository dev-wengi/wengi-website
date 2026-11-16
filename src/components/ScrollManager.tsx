import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on route change, or to the anchor for cross-page #links. */
export const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

/** Set the document title for the active route. */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}
