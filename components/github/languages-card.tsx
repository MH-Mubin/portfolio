import { languageColor, type GitHubData } from '@/lib/github'
import { vars } from '@/lib/style'
import styles from './github-cards.module.css'

const LanguagesCard = ({ languages, repoCount }: { languages: GitHubData['languages']; repoCount: number }) => (
  <article className={`hv ${styles.card}`}>
    <h3>Languages</h3>
    <p className={styles.caption}>Share of my {repoCount} repositories with a detected language</p>
    <div className={styles.bar} aria-hidden="true">
      {languages.map((language, i) => (
        <i key={language.name} style={vars({ flex: language.count, background: languageColor(language.name), '--k': i })} />
      ))}
    </div>
    <ul className={styles.legend}>
      {languages.map((language) => (
        <li key={language.name}>
          <i style={{ background: languageColor(language.name) }} aria-hidden="true" />
          {language.name} <b>{Math.round((language.count / repoCount) * 100)}%</b>
        </li>
      ))}
    </ul>
  </article>
)

export default LanguagesCard
