import React from 'react'
import Navbar from '../components/navbar'
import HeroSection from '../components/hero-section'
import AboutSection from '../components/about-section'
import SkillsSection from '../components/skills-section'
import ProjectsSection from '../components/projects-section'
import GithubSection from '../components/github-section'
import ContactSection from '../components/contact-section'
import Footer from '../components/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GithubSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
