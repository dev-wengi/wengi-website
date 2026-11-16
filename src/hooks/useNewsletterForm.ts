/**
 * useNewsletterForm.ts
 * Shared hook for the newsletter subscription forms in
 * Contact.tsx ("contact-newsletter") and FooterNewsletter.tsx
 * ("footer-newsletter"). Submits to Netlify Forms via AJAX.
 *
 * NOTE: Netlify detects forms at build time from static HTML, so mirror
 * definitions live in index.html. The names here must match those exactly.
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

export function useNewsletterForm(formName: string): UseNewsletterFormReturn {
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
      const body = new URLSearchParams({
        'form-name': formName,
        email,
        'bot-field': '',
      })
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) {
        throw new Error(`Form POST failed with status ${response.status}`)
      }
      setStatus('success')
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }, [email, formName])

  return { email, setEmail, status, errorMessage, inputRef, handleSubmit }
}
