export type ContactSubmission = {
  id?: string
  name: string
  email: string
  message: string
  created_at?: string
  status?: string
}

export type GithubStats = {
  reposCount: number
  totalStars: number
  repos: GitHubRepo[]
}

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
  private: boolean
}

export type GitHubUser = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string
  company: string | null
  blog: string
  location: string | null
  email: string | null
  bio: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export type Project = {
  title: string
  description: string
  longDescription: string
  tech: string[]
  github: string
  live?: string
  image?: string
  metrics: {
    label: string
    value: string
  }[]
  gradient: string
}

export type Skill = {
  name: string
  level: number
  category: 'Frontend' | 'Backend' | 'Database' | 'Architecture' | 'DevOps'
  icon: string
}

export type ContactInfo = {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}
