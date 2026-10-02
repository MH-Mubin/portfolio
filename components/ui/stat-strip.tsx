import type { Stat } from '@/data/about'
import { vars } from '@/lib/style'
import styles from './stat-strip.module.css'

/** "15+" counts up to 15 when revealed; four-digit values such as years stay as they are. */
const StatValue = ({ value }: { value: string }) => {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match || Number(match[1]) > 999) return <>{value}</>
  return (
    <>
      <span data-count={match[1]}>{match[1]}</span>
      {match[2]}
    </>
  )
}

const StatStrip = ({ stats, className = '' }: { stats: Stat[]; className?: string }) => (
  <div className={`${styles.strip} ${className}`}>
    {stats.map((stat, i) => (
      <div key={stat.label} className={styles.cell} data-r style={vars({ '--d': i })}>
        <p className={styles.value}>
          <StatValue value={stat.value} />
        </p>
        <div className={styles.text}>
          <p className={styles.label}>{stat.label}</p>
          <p className={styles.context}>{stat.context}</p>
        </div>
      </div>
    ))}
  </div>
)

export default StatStrip
