'use client'

import { useEffect, useRef, useState } from 'react'
import { navItems, type SectionId } from '@/data/nav'
import { site } from '@/data/site'
import SideMenu from './nav/side-menu'
import { useActiveSection } from './nav/use-active-section'
import styles from './navbar.module.css'

type Indicator = { left: number; width: number } | null

const Navbar = () => {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<SectionId | null>(null)
  const [indicator, setIndicator] = useState<Indicator>(null)
  const linksRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The highlight follows the hovered link and rests on the section in view.
  const target = hovered ?? active
  useEffect(() => {
    const links = linksRef.current
    if (!links) return
    const place = () => {
      const link = target ? links.querySelector<HTMLAnchorElement>(`a[href="#${target}"]`) : null
      setIndicator(link ? { left: link.offsetLeft, width: link.offsetWidth } : null)
    }
    place()
    const observer = new ResizeObserver(place)
    observer.observe(links)
    return () => observer.disconnect()
  }, [target])

  return (
    <>
      <header id="site-nav" className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a className={styles.logo} href="#top" aria-label={`${site.name}, back to top`}>
          <span className={styles.monogram} aria-hidden="true">
            MH
          </span>
          <span className={styles.name} aria-hidden="true">
            {site.name}
          </span>
        </a>
        <nav ref={linksRef} className={styles.links} aria-label="Sections" onPointerLeave={() => setHovered(null)}>
          <span
            className={styles.indicator}
            aria-hidden="true"
            style={
              indicator
                ? { width: indicator.width, transform: `translateX(${indicator.left}px)`, opacity: 1 }
                : { opacity: 0 }
            }
          />
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? styles.active : undefined}
              aria-current={active === id ? 'true' : undefined}
              onPointerEnter={() => setHovered(id)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className={styles.cta} href="#contact">
          Get in touch
        </a>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(true)}
        >
          <i aria-hidden="true" />
        </button>
      </header>
      <SideMenu open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default Navbar
