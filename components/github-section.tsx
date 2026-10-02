import type { Stat } from '@/data/about'
import { site } from '@/data/site'
import { personalWork, projectRepoNames, work } from '@/data/work'
import { getGitHubData } from '@/lib/github'
import { vars } from '@/lib/style'
import LanguagesCard from './github/languages-card'
import RepoCard from './github/repo-card'
import ToolsCard from './github/tools-card'
import SectionHeading from './ui/section-heading'
import StatStrip from './ui/stat-strip'
import styles from './github-section.module.css'

const REPO_COUNT = 6

/** Falls back to the project summary when a repository has no description on GitHub. */
const summaryByRepo = new Map(
  work.filter((item) => item.github).map((item) => [item.github!.split('/').pop() as string, item.summary]),
)

/** The ten technologies most of my personal projects use; ties keep data order. */
const topTools = (() => {
  const counts = new Map<string, number>()
  personalWork.forEach((item) => item.tech.forEach((tech) => counts.set(tech, (counts.get(tech) ?? 0) + 1)))
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tech]) => tech)
})()

const heading = (
  <SectionHeading
    index="05"
    kicker="GitHub"
    title="GitHub activity"
    subtitle="Repositories and languages come straight from the GitHub API and refresh every hour."
  />
)

const profileLink = (
  <a className="btn btn-ghost" href={site.github.url} target="_blank" rel="noopener noreferrer">
    View full GitHub profile{' '}
    <span className="arr" aria-hidden="true">
      ↗
    </span>
  </a>
)

const GitHubSection = async () => {
  const data = await getGitHubData()

  if (!data) {
    return (
      <section id="github" className="section">
        {heading}
        <div className={styles.profile}>{profileLink}</div>
      </section>
    )
  }

  // Prefer the repositories behind the projects above; fall back to the most recently pushed ones.
  const projectRepos = data.repos.filter((repo) => projectRepoNames.includes(repo.name))
  const repos = (projectRepos.length > 0 ? projectRepos : data.repos).slice(0, REPO_COUNT)
  const years = new Date().getFullYear() - Number(data.memberSince)

  const stats: Stat[] = [
    { value: String(data.publicRepos), label: 'Public repositories', context: 'Backends, apps and data work' },
    { value: site.commitsLastYear, label: 'Commits', context: 'In the last 12 months' },
    { value: data.memberSince, label: 'On GitHub since', context: `${years} years of public work` },
    {
      value: String(data.languageCount),
      label: 'Languages',
      context: data.languages
        .filter((language) => language.name !== 'Other')
        .slice(0, 3)
        .map((language) => language.name)
        .join(', '),
    },
  ]

  return (
    <section id="github" className="section">
      {heading}
      <StatStrip stats={stats} className={styles.stats} />
      <div className={styles.cards}>
        <div data-r>
          <LanguagesCard languages={data.languages} repoCount={data.languageRepoCount} />
        </div>
        <div data-r style={vars({ '--d': 1 })}>
          <ToolsCard tools={topTools} />
        </div>
      </div>
      <div className={styles.repos}>
        {repos.map((repo, i) => (
          <div key={repo.id} data-r style={vars({ '--d': i % 3 })}>
            <RepoCard repo={repo} fallbackDescription={summaryByRepo.get(repo.name)} />
          </div>
        ))}
      </div>
      <div className={styles.profile}>{profileLink}</div>
    </section>
  )
}

export default GitHubSection
