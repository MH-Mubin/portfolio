'use client'

import { memo, useEffect, useRef } from 'react'
import type { Rail, WorkItem } from '@/data/work'
import { pad2 } from '@/lib/format'
import ProjectCard, { EndCard } from './project-card'
import styles from './project-rail.module.css'

/** Time constant of the easing that lets the rail glide after the scroll position (ms). */
const EASE_MS = 85
const TIERS = ['compact', 'tight', 'free']

type ProjectRailProps = { rail: Rail; items: WorkItem[]; onOpenCase: (id: string) => void }

/**
 * A pinned horizontal rail: while its section is pinned, vertical scrolling moves the cards sideways. The cards sit
 * in the middle row of a full-height grid, so they stay centred in the area below the top bar.
 */
const ProjectRail = ({ rail, items, onOpenCase }: ProjectRailProps) => {
  const railRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const footRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = railRef.current
    const pin = pinRef.current
    const sticky = stickyRef.current
    const head = headRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    const foot = footRef.current
    const bar = barRef.current
    const count = countRef.current
    if (!root || !pin || !sticky || !head || !viewport || !track || !foot || !bar || !count) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'))
    let alive = true
    let max = 0
    let padLeft = 0
    let navHeight = 0
    let stops: number[] = []
    let current = 0
    let last = -1
    let frame = 0
    let running = false
    let lastTime = 0
    let viewWidth = 0
    let viewHeight = 0

    const isFree = () => (root.dataset.tier ?? '').split(' ').includes('free')
    const scrollTarget = () => Math.min(max, Math.max(0, navHeight - pin.getBoundingClientRect().top))

    const showProgress = (x: number) => {
      bar.style.transform = `scaleX(${max ? x / max : 0})`
      let index = 0
      stops.forEach((stop, i) => {
        if (stop <= x + 60) index = i
      })
      if (x >= max - 2) index = cards.length - 1
      count.textContent = pad2(index + 1)
    }

    // If the cards would not fit between the heading and the progress bar, tighten them step by step,
    // and finally fall back to a plain swipe rail, so nothing is ever clipped.
    const layout = () => {
      viewWidth = window.innerWidth
      viewHeight = window.innerHeight
      navHeight = document.getElementById('site-nav')?.offsetHeight ?? 0
      root.dataset.tier = ''
      pin.style.height = ''
      const fits = () => track.offsetHeight + 2 * Math.max(head.offsetHeight, foot.offsetHeight) <= sticky.clientHeight
      const applied: string[] = []
      for (const tier of TIERS) {
        if (!reduced && fits()) break
        applied.push(tier)
        root.dataset.tier = applied.join(' ')
      }
      padLeft = parseFloat(getComputedStyle(track).paddingLeft)
      stops = cards.map((card) => card.offsetLeft - padLeft)
      max = Math.max(0, track.scrollWidth - viewport.clientWidth)
      if (isFree()) {
        track.style.transform = ''
        showProgress(viewport.scrollLeft)
      } else {
        pin.style.height = `${max + sticky.offsetHeight}px`
        current = scrollTarget()
        last = -1
      }
    }

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick)
      const dt = lastTime ? Math.min(64, time - lastTime) : 0
      lastTime = time
      if (isFree() || !max) return
      const target = scrollTarget()
      current += (target - current) * (1 - Math.exp(-dt / EASE_MS))
      if (Math.abs(target - current) < 0.1) current = target
      if (current === last) return
      track.style.transform = `translate3d(${(-current).toFixed(2)}px, 0, 0)`
      showProgress(current)
      last = current
    }

    // Run the frame loop only while the rail is on screen. Arriving from below, or by a link, starts where the
    // scroll position already is instead of sliding across the whole rail.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        lastTime = 0
        current = scrollTarget()
        last = -1
        frame = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(frame)
      }
    })

    // Mobile URL-bar changes only nudge the height; re-layout for real size changes (rotation, window resize).
    const onResize = () => {
      if (window.innerWidth !== viewWidth || Math.abs(window.innerHeight - viewHeight) > 100) layout()
    }
    const onViewportScroll = () => {
      if (isFree()) showProgress(viewport.scrollLeft)
      // Focus can scroll even a hidden-overflow box; while pinned only the transform may move the cards.
      else if (viewport.scrollLeft) viewport.scrollLeft = 0
    }
    // Keyboard users: tabbing to a card that is off screen scrolls the page to the point where it is in view.
    // Cards already on screen are left alone, so focus returning from a closed panel never moves the page.
    const onFocus = (event: FocusEvent) => {
      if (isFree()) return
      const card = (event.target as Element).closest<HTMLElement>('[data-card], [data-end]')
      if (!card) return
      const box = card.getBoundingClientRect()
      if (box.left >= 0 && box.right <= window.innerWidth) return
      const pinTop = pin.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: pinTop - navHeight + Math.min(max, card.offsetLeft - padLeft), behavior: 'instant' })
    }

    layout()
    document.fonts?.ready.then(() => {
      if (alive) layout()
    })
    window.addEventListener('resize', onResize)
    viewport.addEventListener('scroll', onViewportScroll, { passive: true })
    track.addEventListener('focusin', onFocus)
    visibility.observe(root)

    return () => {
      alive = false
      visibility.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      viewport.removeEventListener('scroll', onViewportScroll)
      track.removeEventListener('focusin', onFocus)
    }
  }, [])

  const titleId = `${rail.kind}-rail-title`

  return (
    <div ref={railRef} className={styles.rail} data-rail data-kind={rail.kind} role="region" aria-labelledby={titleId}>
      <div ref={pinRef}>
        <div ref={stickyRef} className={styles.sticky}>
          <div ref={headRef} className={styles.head} data-rail-head>
            <p className={styles.eyebrow}>{rail.eyebrow}</p>
            <h3 id={titleId} className={styles.title}>
              {rail.title}
            </h3>
            <p className={styles.subtitle}>{rail.subtitle}</p>
          </div>
          <div ref={viewportRef} className={styles.viewport}>
            <div ref={trackRef} className={styles.track}>
              {items.map((item) => (
                <ProjectCard key={item.id} item={item} onOpenCase={onOpenCase} />
              ))}
              <EndCard end={rail.end} />
            </div>
          </div>
          <div ref={footRef} className={styles.foot} data-rail-foot>
            <div className={styles.progress} aria-hidden="true">
              <i ref={barRef} />
            </div>
            <span className={styles.count}>
              <b ref={countRef}>01</b> / {pad2(items.length)}
            </span>
            <p className={styles.hint}>
              <span className={styles.hintPinned}>Keep scrolling — cards move sideways</span>
              <span className={styles.hintFree}>Swipe to see more →</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProjectRail)
