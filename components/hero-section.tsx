'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Import DotLottieReact dynamically to avoid SSR issues
const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => ({ default: mod.DotLottieReact })),
  { ssr: false }
)

// Dynamically import the particle background to avoid SSR issues
const ParticleBackground = dynamic(() => import('./particle-background'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
})

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Subtle Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/20 z-10" />

      {/* Hero Content - Split Layout */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side - Text Content */}
          <div className="space-y-8 text-left">
            <div className="space-y-2">
              <p className="text-lg md:text-xl text-cyan-400 font-medium tracking-wide">
                Hi there! I'm
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            </div>

            <h1 className="space-y-2">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                  Mahmud
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Hasan Mubin
                </span>
              </div>
            </h1>

            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-200 leading-tight">
                Backend Developer &
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  System Architect
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl font-light">
              Crafting <span className="text-cyan-400 font-semibold">robust, scalable</span> backend 
              solutions with <span className="text-emerald-400 font-semibold">Node.js</span>, 
              <span className="text-red-400 font-semibold"> NestJS</span>, and 
              <span className="text-blue-400 font-semibold"> PostgreSQL</span>. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
              >
                Explore My Work
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              {/* Lottie Animation Container */}
              <div className="w-full h-96 bg-slate-800/20 rounded-2xl border border-slate-700/50 flex items-center justify-center backdrop-blur-sm">
                <div className="relative w-80 h-80">
                  <DotLottieReact
                    src="/hero-section.json"
                    loop
                    autoplay
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"
              ></motion.div>
              
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -3, 0, 3, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-50"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection