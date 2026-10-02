import { site } from '@/data/site'
import { vars } from '@/lib/style'
import ContactForm from './contact/contact-form'
import SectionHeading from './ui/section-heading'
import styles from './contact-section.module.css'

const links = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'LinkedIn', value: site.linkedin.handle, href: site.linkedin.url },
  { label: 'GitHub', value: `@${site.github.username}`, href: site.github.url },
]

const intro =
  "I'm open to SQA and test automation roles, and happy to talk about full-stack work too. Send a message and I'll get back to you."

const ContactSection = () => (
  <section id="contact" className="section">
    <SectionHeading index="06" kicker="Contact" title="Let's talk about your next release." />
    <div className={styles.grid}>
      <div data-r style={vars({ '--d': 2 })}>
        <p className={styles.intro}>{intro}</p>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.key}>{link.label}</span>
                <span className={styles.value}>{link.value}</span>
                <span className={`arr ${styles.arrow}`} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
          <li>
            <div>
              <span className={styles.key}>Based in</span>
              <span className={styles.value}>{site.location}</span>
            </div>
          </li>
        </ul>
      </div>
      <div data-r style={vars({ '--d': 3 })}>
        <ContactForm />
      </div>
    </div>
  </section>
)

export default ContactSection
