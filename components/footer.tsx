import { site } from '@/data/site'
import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <span>
      © {new Date().getFullYear()} {site.name} · {site.location}
    </span>
    <nav aria-label="Footer">
      <a href={site.github.url} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <a href={site.linkedin.url} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href="#top">Back to top ↑</a>
    </nav>
  </footer>
)

export default Footer
