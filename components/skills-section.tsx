'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type Skill = {
  name: string
  level: number
  category: string
  icon: string
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 88, category: 'Frontend', icon: '⚛️' },
    { name: 'Next.js', level: 85, category: 'Frontend', icon: '▲' },
    { name: 'JavaScript', level: 90, category: 'Frontend', icon: '💛' },
    { name: 'HTML/CSS', level: 85, category: 'Frontend', icon: '🎨' },
    { name: 'Tailwind CSS', level: 82, category: 'Frontend', icon: '🌊' },
    
    // Backend
    { name: 'Node.js', level: 90, category: 'Backend', icon: '🟢' },
    { name: 'NestJS', level: 85, category: 'Backend', icon: '🔴' },
    { name: 'Express.js', level: 88, category: 'Backend', icon: '⚡' },
    { name: 'TypeScript', level: 87, category: 'Backend', icon: '🔷' },
    
    // Database
    { name: 'PostgreSQL', level: 85, category: 'Database', icon: '🐘' },
    { name: 'MongoDB', level: 82, category: 'Database', icon: '🍃' },
    { name: 'Redis', level: 78, category: 'Database', icon: '🔴' },
    { name: 'Prisma ORM', level: 80, category: 'Database', icon: '⚡' },
    
    // Architecture
    { name: 'REST APIs', level: 90, category: 'Architecture', icon: '🌐' },
    { name: 'GraphQL', level: 75, category: 'Architecture', icon: '💜' },
    { name: 'Microservices', level: 80, category: 'Architecture', icon: '🏗️' },
    { name: 'Clean Architecture', level: 85, category: 'Architecture', icon: '🎯' },
    
    // DevOps
    { name: 'Docker', level: 82, category: 'DevOps', icon: '🐳' },
    { name: 'Git', level: 88, category: 'DevOps', icon: '📝' },
    { name: 'CI/CD', level: 78, category: 'DevOps', icon: '🔄' },
    { name: 'Linux', level: 75, category: 'DevOps', icon: '🐧' },
  ]

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Architecture', 'DevOps']

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  const getProgressColor = (level: number) => {
    if (level >= 85) return 'from-green-400 to-emerald-500'
    if (level >= 75) return 'from-blue-400 to-cyan-500'
    return 'from-yellow-400 to-orange-500'
  }

  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Skills & Expertise
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills and proficiency levels across 
            different areas of full stack development and system architecture.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.2,
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5,
                  transition: { duration: 0.15 }
                }}
                className="group relative p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-200 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${getProgressColor(skill.level)} rounded-full relative`}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                    </motion.div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all duration-300">
                    {skill.category}
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Continuous Learning Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-center"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Technology evolves rapidly, and so do I. I'm constantly learning new frameworks, 
            tools, and best practices to stay at the forefront of full stack development. 
            Currently exploring <span className="text-cyan-400 font-semibold">Rust</span>, 
            <span className="text-cyan-400 font-semibold"> Kubernetes</span>, and 
            <span className="text-cyan-400 font-semibold"> Event-Driven Architecture</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection