import { useEffect, useState } from 'react'
import { navItems, type SectionId } from '@/data/nav'

/** The last section whose top has passed 35% of the way down the area below the top bar. */
export const useActiveSection = () => {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const navHeight = document.getElementById('site-nav')?.offsetHeight ?? 0
      const line = navHeight + (window.innerHeight - navHeight) * 0.35
      let current: SectionId | null = null
      for (const { id } of navItems) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return active
}
