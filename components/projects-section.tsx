import ProjectRails from './projects/project-rails'
import SectionHeading from './ui/section-heading'
import styles from './projects-section.module.css'

const ProjectsSection = () => (
  <section id="projects" className={styles.section}>
    <div className={styles.head}>
      <SectionHeading index="04" kicker="Projects" title="Built by me. Tested by me." />
    </div>
    <ProjectRails />
  </section>
)

export default ProjectsSection
