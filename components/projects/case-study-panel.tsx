'use client'

import { useRef, type MouseEvent } from 'react'
import type { WorkItem } from '@/data/work'
import { pad2 } from '@/lib/format'
import { scrollToSection } from '@/lib/scroll'
import { vars } from '@/lib/style'
import Chips from '../ui/chips'
import SidePanel, { CloseButton } from '../ui/side-panel'
import LockIcon from './lock-icon'
import styles from './case-study-panel.module.css'

/** Renders `backtick` spans as <code>. */
const withCode = (text: string) => text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))

const CaseStudyPanel = ({ item, onClose }: { item: WorkItem | null; onClose: () => void }) => {
  // Keep showing the last case study while the panel slides out.
  const lastItem = useRef<WorkItem | null>(null)
  if (item) lastItem.current = item
  const shown = item ?? lastItem.current
  const study = shown?.caseStudy

  const contact = (event: MouseEvent) => {
    event.preventDefault()
    onClose()
    scrollToSection('contact')
  }

  return (
    <SidePanel open={Boolean(item)} onClose={onClose} size="case" labelledBy="case-title">
      {shown && study && (
        <>
          <div className={styles.head}>
            <span className={styles.tag}>QA case study</span>
            <CloseButton onClick={onClose} label="Close case study" initialFocus />
          </div>
          <div className={`${styles.body} ${item ? styles.shown : ''}`}>
            <h2 id="case-title" className={styles.title}>
              {shown.title}
            </h2>
            <p className={styles.confidential}>
              <LockIcon />
              Company project · described without internal details
            </p>
            <dl className={styles.facts}>
              <div>
                <dt>Platforms</dt>
                <dd>{study.platforms}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{study.focus}</dd>
              </div>
            </dl>
            <ol className={styles.points}>
              {study.points.map((point, i) => (
                <li key={point.title} style={vars({ '--i': i })}>
                  <span className={styles.number}>{pad2(i + 1)}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{withCode(point.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Chips items={shown.tech} className={styles.chips} />
            <div className={styles.cta}>
              <span>Happy to go deeper on this in an interview.</span>
              <a className="btn btn-pri" href="#contact" onClick={contact}>
                Get in touch{' '}
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </>
      )}
    </SidePanel>
  )
}

export default CaseStudyPanel
