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
      title: 'School Management System',
      description: 'Comprehensive school administration API with role-based access control',
      longDescription: 'A production-ready School Management System API built with Express.js and TypeScript. Features JWT-based authentication with role-based access control for Admin, Teacher, and Student roles. Includes complete CRUD operations for student management, class management with enrollment, and PostgreSQL database with Drizzle ORM.',
      tech: ['Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'JWT', 'Docker'],
      github: 'https://github.com/MH-Mubin/school-management',
      metrics: [
        { label: 'API Endpoints', value: '15+' },
        { label: 'User Roles', value: '3' },
        { label: 'Security', value: 'JWT+RBAC' }
      ],
      gradient: 'from-blue-400 via-purple-500 to-pink-500'
    },
    {
      title: 'Headless E-Commerce System',
      description: 'Production-ready scalable headless e-commerce backend with comprehensive features',
      longDescription: 'A modern headless e-commerce backend API built with Node.js and TypeScript. Features include product catalog with multi-variant support, guest cart system with token-based management, promotional engine with flexible discounts, complete order processing workflow, and MongoDB aggregation pipelines for optimized performance.',
      tech: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Mongoose', 'Zod', 'Swagger', 'Jest'],
      github: 'https://github.com/MH-Mubin/headless-e-commerce',
      metrics: [
        { label: 'API Endpoints', value: '25+' },
        { label: 'Type Safety', value: '100%' },
        { label: 'Test Coverage', value: '90%+' }
      ],
      gradient: 'from-green-400 via-blue-500 to-purple-600'
    },
    {
      title: 'Breathing & Meditation App',
      description: 'Full-stack MERN application with advanced animations and gamification',
      longDescription: 'A modern breathing and meditation application featuring advanced curved-path animations, dynamic background effects, multiple breathing patterns, session management, and user progress tracking. Built with React 18 and Framer Motion for smooth animations, plus a complete backend with JWT authentication, streak system, and achievement unlocking.',
      tech: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
      github: 'https://github.com/MH-Mubin/breathing-app',
      metrics: [
        { label: 'Patterns', value: '5+' },
        { label: 'Achievements', value: '13' },
        { label: 'Animations', value: 'SVG+Motion' }
      ],
      gradient: 'from-teal-400 via-cyan-500 to-blue-500'
    },
    {
      title: 'Bookmark Application',
      description: 'NestJS-based bookmark management API with Prisma ORM and comprehensive testing',
      longDescription: 'A progressive bookmark management application built with NestJS framework and TypeScript. Features user authentication with signup/signin functionality, Prisma ORM for database management, comprehensive end-to-end testing with Pactum, Docker containerization, and automated testing workflows. Demonstrates modern backend development practices with scalable architecture.',
      tech: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Jest', 'Pactum', 'Yarn'],
      github: 'https://github.com/MH-Mubin/bookmark-application',
      metrics: [
        { label: 'Framework', value: 'NestJS' },
        { label: 'Testing', value: 'E2E+Unit' },
        { label: 'Database', value: 'Prisma ORM' }
      ],
      gradient: 'from-yellow-400 via-orange-500 to-red-500'
    },
    {
      title: 'Inventory Management System',
      description: 'Comprehensive business inventory and sales tracking backend system',
      longDescription: 'A secure and scalable inventory management backend for businesses to manage daily operations efficiently. Features real-time inventory tracking, sales & purchase transactions, returns handling with data integrity, supplier & customer management, expense tracking, and comprehensive reporting. Built with MongoDB transactions for data consistency and advanced security measures.',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Nodemailer', 'Helmet', 'Faker.js'],
      github: 'https://github.com/MH-Mubin/Inventory-Management',
      metrics: [
        { label: 'API Endpoints', value: '20+' },
        { label: 'Security Layers', value: '6' },
        { label: 'Report Types', value: '5+' }
      ],
      gradient: 'from-indigo-400 via-purple-500 to-pink-500'
    },
    {
      title: 'Task Manager',
      description: 'Backend API for task management with JWT authentication and email verification',
      longDescription: 'A robust task management backend application built with Node.js and Express.js. Features user registration and login with email-based JWT authentication, complete CRUD operations for tasks, OTP verification with Nodemailer, password reset functionality, and middleware for route protection. Designed for learning and demonstrating backend development skills.',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Nodemailer', 'Helmet', 'CORS'],
      github: 'https://github.com/MH-Mubin/Task-Manager',
      metrics: [
        { label: 'Auth Methods', value: '3' },
        { label: 'CRUD Operations', value: 'Full' },
        { label: 'Security', value: 'JWT+OTP' }
      ],
      gradient: 'from-purple-400 via-pink-500 to-red-500'
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
            A showcase of my recent full stack projects demonstrating scalable architecture, 
            clean code practices, and modern development techniques.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                transition: { 
                  type: "tween",
                  duration: 0.25,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              animate={{ 
                y: 0,
                transition: { 
                  type: "tween",
                  duration: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "tween",
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-slate-900/50 cursor-pointer flex flex-col h-full"
            >
              {/* Project Content Container */}
              <div className="flex-1 flex flex-col">
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
                        className="px-3 py-1 text-sm font-medium bg-slate-700 text-slate-300 rounded-full group-hover:bg-slate-600 group-hover:text-white transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Metrics */}
                <div className="mb-6 flex-1">
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
              </div>

              {/* Action Buttons - Always at bottom */}
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
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
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-colors duration-200"
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-colors duration-200 transform hover:scale-105"
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