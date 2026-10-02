import Navbar from '../components/navbar'
import HeroSection from '../components/hero-section'
import AboutSection from '../components/about-section'
import ExperienceSection from '../components/experience-section'
import SkillsSection from '../components/skills-section'
import WorkSection from '../components/work-section'
import GithubSection from '../components/github-section'
import ContactSection from '../components/contact-section'
import Footer from '../components/footer'
import PageEffects from '../components/ui/page-effects'

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="top">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <WorkSection />
        <GithubSection />
        <ContactSection />
      </main>
      <Footer />
      <PageEffects />
    </>
  )
}
