'use client'

import { useEffect } from 'react'

/** Counts a `data-count` element up from 0 (ease-out-expo, 1.4s). */
const countUp = (el: HTMLElement) => {
  const to = Number(el.dataset.count)
  const start = performance.now()
  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / 1400)
    el.textContent = String(Math.round(to * (1 - Math.pow(2, -10 * progress))))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Page-wide motion: reveals `data-r` / `data-line` elements (adds `in`) and counts up `data-count` numbers
 * when they scroll into view, and feeds the pointer position to `.spot` cards and the `[data-glow]` hero.
 */
const PageEffects = () => {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-r], [data-line]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add('in')
          el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
          observer.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null
      const spot = target?.closest<HTMLElement>('.spot')
      if (spot) {
        const box = spot.getBoundingClientRect()
        spot.style.setProperty('--x', `${event.clientX - box.left}px`)
        spot.style.setProperty('--y', `${event.clientY - box.top}px`)
      }
      const glow = target?.closest<HTMLElement>('[data-glow]')
      if (glow) {
        const box = glow.getBoundingClientRect()
        glow.style.setProperty('--mx', `${event.clientX - box.left}px`)
        glow.style.setProperty('--my', `${event.clientY - box.top}px`)
      }
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  return null
}

export default PageEffects
