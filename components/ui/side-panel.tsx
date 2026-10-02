'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import styles from './side-panel.module.css'

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

type SidePanelProps = {
  open: boolean
  onClose: () => void
  size: 'menu' | 'case'
  id?: string
  label?: string
  labelledBy?: string
  children: ReactNode
}

/**
 * A panel that slides in from the right over a blurred scrim. While open: page scroll is locked, Esc and the scrim
 * close it, Tab stays inside, and focus moves to its `[data-autofocus]` element, returning to the opener on close.
 */
const SidePanel = ({ open, onClose, size, id, label, labelledBy, children }: SidePanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return
    const opener = document.activeElement as HTMLElement | null
    const root = document.documentElement
    root.style.overflow = 'hidden'
    panel.scrollTop = 0
    const focusTimer = window.setTimeout(
      () => panel.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true }),
      320,
    )

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!panel.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      root.style.overflow = ''
      opener?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <>
      <div className={`${styles.scrim} ${open ? styles.scrimOpen : ''}`} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
        aria-hidden={!open}
        className={`${styles.panel} ${styles[size]} ${open ? styles.panelOpen : ''}`}
      >
        {children}
      </div>
    </>
  )
}

export const CloseButton = ({
  onClick,
  label,
  initialFocus = false,
}: {
  onClick: () => void
  label: string
  initialFocus?: boolean
}) => (
  <button
    type="button"
    className={styles.close}
    onClick={onClick}
    aria-label={label}
    data-autofocus={initialFocus || undefined}
  >
    <i aria-hidden="true" />
  </button>
)

export default SidePanel
