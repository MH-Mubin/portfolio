'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'

type GitHubRepo = {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

type GitHubStats = {
  public_repos: number
  followers: number
  following: number
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()
  
  // Defensive programming - ensure we always return proper data
  if (url.includes('/repos')) {
    // For repos endpoint, ensure we return an array
    return Array.isArray(data) ? data : []
  }
  
  return data
}

const GitHubSection = () => {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'MH-Mubin'
  
  // Fetch user stats
  const { data: userStats, error: statsError } = useSWR<GitHubStats>(
    `https://api.github.com/users/${username}`,
    fetcher,
    { refreshInterval: 3600000 } // Refresh every hour
  )

  // Fetch repositories - with proper error handling
  const { data: reposData, error: reposError } = useSWR<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    fetcher,
    { refreshInterval: 3600000 }
  )

  // ✅ SAFE: Ensure repos is always an array
  const repos = Array.isArray(reposData) ? reposData : []
  
  // 🧪 Debug (temporary)
  console.log("repos:", repos, "isArray:", Array.isArray(repos), "reposData:", reposData)

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      HTML: '#e34c26',
      CSS: '#563d7c',
      PHP: '#4F5D95',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
    }
    return colors[language] || '#8b949e'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const totalStars = Array.isArray(repos) ? repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) : 0

  return (
    <section id="github" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            GitHub Activity
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Live statistics and recent projects from my GitHub profile, showcasing 
            active development and open-source contributions.
          </p>
        </motion.div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {statsError ? (
            <div className="col-span-full text-center text-red-400">
              Failed to load GitHub stats
            </div>
          ) : !userStats ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 animate-pulse">
                <div className="h-8 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              </div>
            ))
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 text-center group"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {userStats.public_repos}
                </div>
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Public Repos
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 text-center group"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {totalStars}
                </div>
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Total Stars
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 text-center group"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {userStats.followers}
                </div>
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Followers
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 text-center group"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {userStats.following}
                </div>
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Following
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Recent Repositories */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Recent Projects
          </h3>
          
          {reposError ? (
            <div className="text-center text-red-400">
              Failed to load repositories
            </div>
          ) : !repos || repos.length === 0 ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 animate-pulse">
                  <div className="h-6 bg-slate-700 rounded mb-3"></div>
                  <div className="h-4 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-slate-700 rounded w-16"></div>
                    <div className="h-4 bg-slate-700 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(repos) && repos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="block p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
                      {repo.name}
                    </h4>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors duration-300">
                    {repo.description || 'No description available'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      {repo.language && (
                        <div className="flex items-center space-x-1">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          <span className="text-slate-400">{repo.language}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1 text-slate-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>{repo.stargazers_count}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-slate-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                    
                    <span className="text-xs text-slate-500">
                      {formatDate(repo.updated_at)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* View GitHub Profile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubSection