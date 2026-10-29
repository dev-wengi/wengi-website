import type { Variants, Transition } from 'framer-motion'

/**
 * Standard easing and transition configurations
 */
export const transitions = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  default: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  fast: { duration: 0.2, ease: 'easeOut' } satisfies Transition,
  hover: { duration: 0.2, ease: [0.2, 0, 0, 1] } satisfies Transition,
}

/**
 * Fade + slide-up animation for scroll reveal
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
}

/**
 * Fade + slide-down animation (e.g. for navbar or dropdowns)
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
}

/**
 * Stagger container for list items / cards
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

/**
 * Card reveal animation
 */
export const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Standard viewport options for scroll triggers
 */
export const defaultViewport = {
  once: true,
  amount: 0.2,
}
