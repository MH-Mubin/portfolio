import type { Rail, WorkItem } from '@/data/work'
import Chips from '../ui/chips'
import LockIcon from './lock-icon'
import styles from './project-card.module.css'

const tagFor = (item: WorkItem) =>
  item.kind === 'dev' ? 'Dev project' : item.confidential ? 'QA case study' : 'QA project'

const ProjectCard = ({ item, onOpenCase }: { item: WorkItem; onOpenCase: (id: string) => void }) => {
  const repo = item.github?.split('/').slice(-2).join('/')
  return (
    <article
      className={`spot ${styles.card} ${item.featured ? styles.featured : ''}`}
      data-card
      data-kind={item.kind}
    >
      <div className={styles.top}>
        <span className={styles.tag}>{tagFor(item)}</span>
        {item.confidential ? (
          <span className={styles.meta}>
            <LockIcon />
            Confidential
          </span>
        ) : item.status === 'in-progress' ? (
          <span className={styles.wip}>
            <span className="pulse" aria-hidden="true" />
            In progress
          </span>
        ) : repo ? (
          <span className={styles.meta}>{repo}</span>
        ) : null}
      </div>
      <h4 className={styles.title}>{item.title}</h4>
      <p className={styles.context}>{item.context}</p>
      <p className={styles.summary}>{item.summary}</p>
      {item.checklist && (
        <ul className={styles.checks}>
          {item.checklist.map((check) => (
            <li key={check.text} data-status={check.status}>
              <i aria-hidden="true">{check.status === 'pass' ? '✓' : '✗'}</i>
              <span>
                {check.text}
                {check.note && <em>{check.note}</em>}
              </span>
            </li>
          ))}
        </ul>
      )}
      <Chips items={item.tech} className={styles.chips} />
      <div className={styles.foot}>
        {item.caseStudy ? (
          <button type="button" className={styles.read} onClick={() => onOpenCase(item.id)}>
            Read case study{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </button>
        ) : item.github ? (
          <a href={item.github} target="_blank" rel="noopener noreferrer">
            View code{' '}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          <span>{item.status === 'in-progress' ? 'Repository goes public on completion' : 'Repository not public yet'}</span>
        )}
      </div>
    </article>
  )
}

export const EndCard = ({ end }: { end: Rail['end'] }) => {
  const external = end.href.startsWith('http')
  return (
    <a
      className={`spot ${styles.card} ${styles.end}`}
      href={end.href}
      data-end
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div>
        <h4>{end.title}</h4>
        <p>{end.text}</p>
      </div>
      <span className={styles.go}>
        {end.cta}{' '}
        <span className="arr" aria-hidden="true">
          →
        </span>
      </span>
    </a>
  )
}

export default ProjectCard
