'use client'

import type { MouseEvent } from 'react'
import { navItems, type SectionId } from '@/data/nav'
import { site } from '@/data/site'
import { pad2 } from '@/lib/format'
import { scrollToSection } from '@/lib/scroll'
import { vars } from '@/lib/style'
import SidePanel, { CloseButton } from '../ui/side-panel'
import styles from './side-menu.module.css'

type SideMenuProps = { open: boolean; active: SectionId | null; onClose: () => void }

const SideMenu = ({ open, active, onClose }: SideMenuProps) => {
  const go = (event: MouseEvent, id: string) => {
    event.preventDefault()
    onClose()
    scrollToSection(id)
  }

  return (
    <SidePanel open={open} onClose={onClose} size="menu" id="site-menu" label="Site menu">
      <div className={styles.inner}>
        <div className={styles.head}>
          <span>Menu</span>
          <CloseButton onClick={onClose} label="Close menu" />
        </div>
        <nav aria-label="Sections" className={`${styles.links} ${open ? styles.shown : ''}`}>
          {navItems.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => go(event, id)}
              className={active === id ? styles.active : undefined}
              aria-current={active === id ? 'true' : undefined}
              data-autofocus={i === 0 || undefined}
              style={vars({ '--i': i })}
            >
              <span className={styles.number}>{pad2(i + 1)}</span>
              {label}
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
        <div className={`${styles.foot} ${open ? styles.shown : ''}`}>
          <p className={styles.availability}>
            <span className="pulse" aria-hidden="true" />
            {site.availability}
          </p>
          <a className={styles.mail} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="btn btn-pri" href="#contact" onClick={(event) => go(event, 'contact')}>
            Get in touch{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </SidePanel>
  )
}

export default SideMenu
