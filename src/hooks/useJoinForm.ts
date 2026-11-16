/**
 * useJoinForm.ts
 * Join-request form for the Get started page. Submits to Netlify Forms
 * via AJAX. A mirror definition lives in index.html for build-time
 * detection; field names must match exactly.
 */

import { useState, useRef, useCallback } from 'react'
import type { FormEvent, RefObject } from 'react'

export type JoinStatus = 'idle' | 'loading' | 'success' | 'error'

export interface JoinFormValues {
  name: string
  email: string
  city: string
  level: string
  path: string
  goal: string
  portfolio: string
  expectations: boolean
  dataUse: boolean
  newsletter: boolean
}

export interface UseJoinFormReturn {
  values: JoinFormValues
  setField: <K extends keyof JoinFormValues>(field: K, value: JoinFormValues[K]) => void
  status: JoinStatus
  errorMessage: string
  firstErrorRef: RefObject<HTMLDivElement | null>
  handleSubmit: (e: FormEvent) => Promise<void>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FORM_NAME = 'join-request'

const INITIAL_VALUES: JoinFormValues = {
  name: '',
  email: '',
  city: '',
  level: '',
  path: 'Beginner',
  goal: '',
  portfolio: '',
  expectations: false,
  dataUse: false,
  newsletter: false,
}

function validate(values: JoinFormValues): string | null {
  if (!values.name.trim()) return 'Please tell us your name.'
  if (!EMAIL_RE.test(values.email)) return 'Please enter a valid email address.'
  if (!values.level) return 'Please choose your experience level.'
  if (!values.goal.trim()) return 'Please share a small goal, idea, or question.'
  if (values.portfolio.trim()) {
    try {
      const url = new URL(values.portfolio.trim())
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
    } catch {
      return 'Please enter a valid portfolio or GitHub URL, starting with https://.'
    }
  }
  if (!values.expectations || !values.dataUse) {
    return 'Please accept the required agreements to continue.'
  }
  return null
}

export function useJoinForm(): UseJoinFormReturn {
  const [values, setValues] = useState<JoinFormValues>(INITIAL_VALUES)
  const [status, setStatus] = useState<JoinStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const firstErrorRef = useRef<HTMLDivElement>(null)

  const setField = useCallback(
    <K extends keyof JoinFormValues>(field: K, value: JoinFormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }))
      if (errorMessage) setErrorMessage('')
    },
    [errorMessage],
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      const validationError = validate(values)
      if (validationError) {
        setErrorMessage(validationError)
        firstErrorRef.current?.focus()
        return
      }

      setStatus('loading')
      setErrorMessage('')

      try {
        const body = new URLSearchParams({
          'form-name': FORM_NAME,
          name: values.name.trim(),
          email: values.email.trim(),
          city: values.city.trim(),
          level: values.level,
          path: values.path,
          goal: values.goal.trim(),
          portfolio: values.portfolio.trim(),
          expectations: values.expectations ? 'yes' : 'no',
          'data-use': values.dataUse ? 'yes' : 'no',
          newsletter: values.newsletter ? 'yes' : 'no',
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
    },
    [values],
  )

  return { values, setField, status, errorMessage, firstErrorRef, handleSubmit }
}
