'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const AboutSection = () => {
  const stats = [
    { label: 'Years Experience', value: 3, suffix: '+' },
    { label: 'Projects Completed', value: 15, suffix: '+' },
    { label: 'GitHub Contributions', value: 500, suffix: '+' },
    { label: 'Technologies Mastered', value: 12, suffix: '+' },
  ]

  const skillCategories = [
    {
      title: 'Backend Development',
      icon: '⚙️',
      description: 'Node.js, NestJS, Express, RESTful APIs',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      title: 'Database Management',
      icon: '🗄️',
      description: 'PostgreSQL, MongoDB, Redis, Prisma ORM',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'System Architecture',
      icon: '🏗️',
      description: 'Microservices, Clean Architecture, Design Patterns',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      title: 'DevOps & Tools',
      icon: '🚀',
      description: 'Docker, AWS, Git, CI/CD, Testing',
      gradient: 'from-pink-400 to-red-500'
    },
  ]

  return (
    <section id="about" className="section-padding bg-slate-900/50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Passionate backend developer with a strong foundation in modern web technologies. 
            I specialize in building scalable, efficient, and maintainable server-side applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg prose-invert">
              <p className="text-slate-300 leading-relaxed">
                Hi! I'm <span className="text-cyan-400 font-semibold">Mahmud Hasan Mubin</span>, 
                a dedicated backend developer from Bangladesh. My journey in software development 
                began with a curiosity about how systems work behind the scenes.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                I specialize in <span className="text-cyan-400 font-semibold">Node.js</span> and 
                <span className="text-cyan-400 font-semibold"> NestJS</span> for building robust APIs, 
                with expertise in <span className="text-cyan-400 font-semibold">PostgreSQL</span> and 
                <span className="text-cyan-400 font-semibold"> MongoDB</span> for data management.
              </p>

              <p className="text-slate-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I believe 
                in writing clean, maintainable code that scales.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-colors duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skill Categories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection