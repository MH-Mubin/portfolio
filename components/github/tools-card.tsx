import { vars } from '@/lib/style'
import styles from './github-cards.module.css'

const ToolsCard = ({ tools }: { tools: string[] }) => (
  <article className={`hv ${styles.card}`} style={vars({ '--rule': 'var(--dev)' })}>
    <h3>Most used in my projects</h3>
    <p className={styles.caption}>Ranked by how many of my projects use them</p>
    <ul className={styles.tools}>
      {tools.map((tool, i) => (
        <li key={tool} className={i < 3 ? styles.top : undefined} style={vars({ '--i': i })}>
          {tool}
        </li>
      ))}
    </ul>
  </article>
)

export default ToolsCard
