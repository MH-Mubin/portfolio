import { stats } from '@/data/about'
import { site } from '@/data/site'
import { vars } from '@/lib/style'
import PipelineCard from './hero/pipeline-card'
import StatStrip from './ui/stat-strip'
import styles from './hero-section.module.css'

const city = site.location.split(',')[0]

const HeroSection = () => (
  <div className={styles.wrap}>
    <section className={styles.hero} data-glow aria-labelledby="hero-name">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.text}>
        <p className={styles.eyebrow} data-r>
          <span className="pulse" aria-hidden="true" />
          {site.availability}
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
          {city}
        </p>
        <h1 id="hero-name" className={styles.name}>
          <span data-line style={vars({ '--d': 1 })}>
            <span>{site.name}</span>
          </span>
        </h1>
        <div className={styles.roles} data-r style={vars({ '--d': 3 })}>
          {site.roles.map((role) => (
            <p key={role.title} className={styles.role} data-kind={role.kind}>
              {role.title}{' '}
              <span>
                <b className={styles.roleSep}>· </b>
                {role.detail}
              </span>
            </p>
          ))}
        </div>
        <p className={styles.lede} data-r style={vars({ '--d': 4 })}>
          I make sure software works before users touch it: Playwright automation, API contract testing and
          database-level verification across web, mobile and browser extensions — backed by hands-on full-stack
          development with Node.js, NestJS and React.
        </p>
        <div className={styles.ctas} data-r style={vars({ '--d': 5 })}>
          <a className="btn btn-pri" href="#projects">
            View projects{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <div className={styles.side} data-r style={vars({ '--d': 4 })}>
        <PipelineCard />
      </div>
    </section>
    <StatStrip stats={stats} className={styles.stats} />
  </div>
)

export default HeroSection
