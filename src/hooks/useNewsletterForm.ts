/**
 * useNewsletterForm.ts
 * Shared hook for the newsletter subscription form used in
 * Contact.tsx (Section 5) and FooterNewsletter.tsx (Section 6 Footer).
 */

import { useState, useRef, useCallback } from 'react'
import type { FormEvent, RefObject } from 'react'

export type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

export interface UseNewsletterFormReturn {
  email: string
  setEmail: (v: string) => void
  status: NewsletterStatus
  errorMessage: string
  inputRef: RefObject<HTMLInputElement | null>
  handleSubmit: (e: FormEvent) => Promise<void>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Simulated async submit — swap for a real API call */
async function submitNewsletter(email: string): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 900))
  // Simulate an occasional error for demonstration
  if (email.endsWith('.fail')) throw new Error('Subscription failed. Please try again.')
}

export function useNewsletterForm(): UseNewsletterFormReturn {
  const [email, setEmailRaw] = useState('')
  const [status, setStatus] = useState<NewsletterStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const setEmail = useCallback((v: string) => {
    setEmailRaw(v)
    if (errorMessage) setErrorMessage('')
  }, [errorMessage])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !EMAIL_RE.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      inputRef.current?.focus()
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      await submitNewsletter(email)
      setStatus('success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setErrorMessage(msg)
      setStatus('error')
    }
  }, [email])

  return { email, setEmail, status, errorMessage, inputRef, handleSubmit }
}
