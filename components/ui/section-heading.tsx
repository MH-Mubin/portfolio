import type { ReactNode } from 'react'
import { vars } from '@/lib/style'
import styles from './section-heading.module.css'

/** The mono label above a heading, e.g. "01 ABOUT ——". */
export const Kicker = ({ index, children }: { index?: string; children: ReactNode }) => (
  <p className={styles.kicker} data-r>
    {index && <b>{index}</b>}
    {children}
  </p>
)

const SectionHeading = ({
  index,
  kicker,
  title,
  subtitle,
}: {
  index: string
  kicker: string
  title: string
  subtitle?: string
}) => (
  <>
    <Kicker index={index}>{kicker}</Kicker>
    <h2 className={styles.title} data-r style={vars({ '--d': 1 })}>
      {title}
    </h2>
    {subtitle && (
      <p className={styles.subtitle} data-r style={vars({ '--d': 2 })}>
        {subtitle}
      </p>
    )}
  </>
)

export default SectionHeading
