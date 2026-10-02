import { buildVerify, facts, story } from '@/data/about'
import { learning, principles } from '@/data/skills'
import { pad2 } from '@/lib/format'
import { vars } from '@/lib/style'
import SectionHeading, { Kicker } from './ui/section-heading'
import styles from './about-section.module.css'

const AboutSection = () => (
  <section id="about" className="section">
    <div className={styles.top}>
      <div>
        <SectionHeading index="01" kicker="About" title="About me" />
        <dl className={styles.facts} data-r style={vars({ '--d': 2 })}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.story} data-r style={vars({ '--d': 2 })}>
        {story.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </div>

    <div className={styles.table} data-r>
      <div className={styles.tableHead}>
        <span className={styles.build}>I build</span>
        <span className={styles.by} aria-hidden="true">
          verified by
        </span>
        <span className={styles.verify}>I verify</span>
      </div>
      {buildVerify.map((pair) => (
        <div key={pair.build} className={styles.row}>
          <span className={styles.buildItem}>{pair.build}</span>
          <span className={styles.swap} aria-hidden="true">
            ⇄
          </span>
          <span className={styles.verifyItem}>{pair.verify}</span>
        </div>
      ))}
    </div>

    <div className={styles.how}>
      <Kicker>How I test</Kicker>
      <div className={styles.howGrid}>
        {principles.map((principle, i) => (
          <div key={principle.title} data-r style={vars({ '--d': i })}>
            <article className={`hv ${styles.howCard}`}>
              <span className={styles.number}>{pad2(i + 1)}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          </div>
        ))}
      </div>
      <p className={styles.learning} data-r>
        <b>Currently learning</b>
        {learning.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
    </div>
  </section>
)

export default AboutSection
