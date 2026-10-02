import { skillGroups } from '@/data/skills'
import { pad2 } from '@/lib/format'
import { vars } from '@/lib/style'
import SectionHeading from './ui/section-heading'
import styles from './skills-section.module.css'

const SkillsSection = () => (
  <section id="skills" className="section">
    <SectionHeading
      index="03"
      kicker="Skills"
      title="Skills & expertise"
      subtitle="The tools I test with, and the stack I build with. Testing and automation come first, because that is where I spend most of my day."
    />
    <div className={styles.grid}>
      {skillGroups.map((group, i) => (
        <div key={group.title} data-r style={vars({ '--d': i % 3 })}>
          <article className={`hv ${styles.card}`}>
            <div className={styles.top}>
              <span className={styles.number}>{pad2(i + 1)}</span>
              <span>
                {group.items.length} {group.primary ? 'tools' : 'skills'}
              </span>
            </div>
            <h3 className={styles.title}>{group.title}</h3>
            <p className={styles.summary}>{group.summary}</p>
            <ul className={styles.items}>
              {group.items.map((item, j) => (
                <li key={item} style={vars({ '--i': j })}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      ))}
    </div>
  </section>
)

export default SkillsSection
