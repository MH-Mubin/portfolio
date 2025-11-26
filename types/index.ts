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
  repos: any[]
}
