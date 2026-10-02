import { site } from '@/data/site'

export type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  pushed_at: string
  fork: boolean
  archived: boolean
}

export type GitHubData = {
  publicRepos: number
  memberSince: string
  /** The top five languages by number of repositories, then "Other". */
  languages: { name: string; count: number }[]
  /** Repositories with a detected language: the denominator for `languages`. */
  languageRepoCount: number
  /** Distinct languages across my repositories. */
  languageCount: number
  repos: (Repo & { updated: string })[]
}

const API = 'https://api.github.com'
const REVALIDATE_SECONDS = 3600
const TOP_LANGUAGES = 5

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

/** GitHub allows 60 unauthenticated requests per hour; a token raises that to 5000. */
const headers = (): HeadersInit => {
  const token = process.env.GITHUB_TOKEN
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

/** Returns null when GitHub is unreachable or rate-limited, so the section can degrade to a plain profile link. */
export async function getGitHubData(): Promise<GitHubData | null> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || site.github.username

  const [user, repos] = await Promise.all([
    get<{ public_repos: number; created_at: string }>(`/users/${username}`),
    get<Repo[]>(`/users/${username}/repos?per_page=100&sort=pushed&type=owner`),
  ])

  if (!user || !repos) return null

  const ownRepos = repos.filter((repo) => !repo.fork && !repo.archived)

  const counts = new Map<string, number>()
  ownRepos.forEach((repo) => {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  })
  const ranked = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  const top = ranked.slice(0, TOP_LANGUAGES).map(([name, count]) => ({ name, count }))
  const rest = ranked.slice(TOP_LANGUAGES).reduce((total, [, count]) => total + count, 0)

  return {
    publicRepos: user.public_repos,
    memberSince: new Date(user.created_at).getUTCFullYear().toString(),
    languages: rest ? [...top, { name: 'Other', count: rest }] : top,
    languageRepoCount: ranked.reduce((total, [, count]) => total + count, 0),
    languageCount: ranked.length,
    // Sorted by most recently pushed; the section decides which ones to show.
    repos: ownRepos.map((repo) => ({
      ...repo,
      updated: dateFormatter.format(new Date(repo.pushed_at)),
    })),
  }
}

/** Distinct hues, so no two languages look alike (GitHub's own TypeScript and Python are both blue). */
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#facc15',
  TypeScript: '#3b82f6',
  Python: '#2dd4bf',
  HTML: '#f87171',
  CSS: '#a78bfa',
}

export const languageColor = (language: string | null) => (language && LANGUAGE_COLORS[language]) || '#fb923c'
