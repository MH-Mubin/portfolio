'use client'

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './contact-form.module.css'

type Status = 'idle' | 'success' | 'error'

const statusText: Record<Status, string> = {
  idle: '',
  success: "Message sent. I'll get back to you soon.",
  error: 'Failed to send the message. Please try again, or email me directly.',
}

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const botcheckRef = useRef<HTMLInputElement>(null)

  // Hide the success or error message after 5 seconds.
  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 5000)
    return () => clearTimeout(timer)
  }, [status])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          // Honeypot: only a bot ticks this hidden box, and Web3Forms drops the submission.
          botcheck: botcheckRef.current?.checked ?? false,
        }),
      })
      clearTimeout(timeoutId)
      const result = await response.json()
      if (response.ok && result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={`hv ${styles.form}`} onSubmit={handleSubmit}>
      <h3>Send a message</h3>
      <div className={styles.field}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Enter your full name"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="your.email@example.com"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell me about the role or project"
        />
      </div>
      <input
        ref={botcheckRef}
        type="checkbox"
        name="botcheck"
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button type="submit" className={`btn btn-pri ${styles.submit}`} disabled={isSubmitting}>
        {isSubmitting ? (
          'Sending…'
        ) : (
          <>
            Send message{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </>
        )}
      </button>
      <p className={styles.status} data-status={status} aria-live="polite">
        {statusText[status]}
      </p>
    </form>
  )
}

export default ContactForm
