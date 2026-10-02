import { education, roles } from '@/data/experience'
import Chips from './ui/chips'
import SectionHeading from './ui/section-heading'
import styles from './experience-section.module.css'

const ExperienceSection = () => (
  <section id="experience" className="section">
    <SectionHeading
      index="02"
      kicker="Experience"
      title="Experience & education"
      subtitle="Where I practise quality engineering day to day, and where the engineering foundation came from."
    />
    <div className={styles.list}>
      {roles.map((role) => (
        <div key={`${role.company}-${role.title}`} className={styles.row} data-r>
          <div>
            <p className={styles.period}>{role.period}</p>
            {role.current && (
              <span className={styles.badge}>
                <span className="pulse" aria-hidden="true" />
                Current role
              </span>
            )}
          </div>
          <div>
            <h3 className={styles.title}>{role.title}</h3>
            <p className={styles.org}>
              {role.company} · {role.location}
            </p>
            <ul className={styles.highlights}>
              {role.highlights.map((highlight) => (
                <li key={highlight.title}>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.description}</p>
                </li>
              ))}
            </ul>
            <Chips items={role.tech} className={styles.chips} />
          </div>
        </div>
      ))}
      <div className={styles.row} data-r>
        <div>
          <p className={styles.period}>Education</p>
        </div>
        <div>
          <h3 className={styles.title}>{education.degree}</h3>
          <p className={styles.org}>
            {education.institution} · {education.location}
          </p>
          <p className={styles.coursework}>
            <b>Coursework</b>
            {education.coursework}
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default ExperienceSection
