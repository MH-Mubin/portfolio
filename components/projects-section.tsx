'use client'

import { motion } from 'framer-motion'

type Project = {
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

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: 'E-Commerce API Platform',
      description: 'Scalable REST API for e-commerce with advanced features',
      longDescription: 'A comprehensive e-commerce backend built with NestJS, featuring user authentication, product management, order processing, payment integration, and real-time notifications.',
      tech: ['NestJS', 'PostgreSQL', 'Redis', 'JWT', 'Stripe', 'WebSocket'],
      github: 'https://github.com/MH-Mubin/ecommerce-api',
      live: 'https://ecommerce-api-demo.vercel.app',
      metrics: [
        { label: 'API Endpoints', value: '45+' },
        { label: 'Response Time', value: '<100ms' },
        { label: 'Test Coverage', value: '95%' }
      ],
      gradient: 'from-purple-400 via-pink-500 to-red-500'
    },
    {
      title: 'Real-Time Chat System',
      description: 'WebSocket-based chat application with rooms and notifications',
      longDescription: 'A real-time messaging platform built with Socket.io, featuring private/group chats, file sharing, message encryption, and push notifications.',
      tech: ['Node.js', 'Socket.io', 'MongoDB', 'Express', 'JWT', 'Cloudinary'],
      github: 'https://github.com/MH-Mubin/realtime-chat',
      metrics: [
        { label: 'Concurrent Users', value: '1000+' },
        { label: 'Message Latency', value: '<50ms' },
        { label: 'Uptime', value: '99.9%' }
      ],
      gradient: 'from-green-400 via-blue-500 to-purple-600'
    },
    {
      title: 'Task Management API',
      description: 'Project management system with team collaboration features',
      longDescription: 'A comprehensive project management backend with task tracking, team collaboration, time logging, and detailed analytics dashboard.',
      tech: ['Express.js', 'PostgreSQL', 'Prisma', 'TypeScript', 'Docker', 'AWS'],
      github: 'https://github.com/MH-Mubin/task-management',
      live: 'https://taskmanager-api.herokuapp.com',
      metrics: [
        { label: 'Active Projects', value: '500+' },
        { label: 'API Calls/Day', value: '10K+' },
        { label: 'Team Size', value: '50+' }
      ],
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600'
    },
    {
      title: 'Microservices Architecture',
      description: 'Distributed system with multiple interconnected services',
      longDescription: 'A microservices-based application demonstrating service communication, API gateway, load balancing, and distributed data management.',
      tech: ['Node.js', 'Docker', 'Kubernetes', 'RabbitMQ', 'MongoDB', 'Nginx'],
      github: 'https://github.com/MH-Mubin/microservices-demo',
      metrics: [
        { label: 'Services', value: '8' },
        { label: 'Load Capacity', value: '5K RPS' },
        { label: 'Scalability', value: 'Auto' }
      ],
      gradient: 'from-orange-400 via-red-500 to-pink-600'
    }
  ]

  return (
    <section id="projects" className="section-padding bg-slate-900/30">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent backend projects demonstrating scalable architecture, 
            clean code practices, and modern development techniques.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 cursor-pointer"
            >
              {/* Project Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium bg-slate-700 text-slate-300 rounded-full group-hover:bg-slate-600 group-hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Metrics */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-lg font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/MH-Mubin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection