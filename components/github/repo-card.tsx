import { languageColor, type GitHubData } from '@/lib/github'
import { vars } from '@/lib/style'
import styles from './repo-card.module.css'

type Repo = GitHubData['repos'][number]

/** Octicons "repo". */
const RepoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
  </svg>
)

const RepoCard = ({ repo, fallbackDescription }: { repo: Repo; fallbackDescription?: string }) => (
  <a
    className={`hv ${styles.card}`}
    style={vars({ '--rule': 'var(--dev)' })}
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3 className={styles.name}>
      <RepoIcon />
      <span>{repo.name}</span>
    </h3>
    <p className={styles.description}>{repo.description || fallbackDescription || 'No description on GitHub yet.'}</p>
    <div className={styles.meta}>
      {repo.language && (
        <span className={styles.language}>
          <i style={{ background: languageColor(repo.language) }} aria-hidden="true" />
          {repo.language}
        </span>
      )}
      {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
      <span className={styles.updated}>{repo.updated}</span>
    </div>
  </a>
)

export default RepoCard
