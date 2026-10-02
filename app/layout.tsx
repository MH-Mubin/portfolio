import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { ReactNode } from 'react'
import { site } from '@/data/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    'Mahmud Hasan Mubin',
    'SQA Engineer',
    'QA Automation Engineer',
    'SDET',
    'Playwright',
    'Postman',
    'Newman',
    'API testing',
    'Test automation',
    'Full Stack Developer',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'MongoDB',
    'TypeScript',
    'React',
    'Next.js',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: site.url },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: `${site.name} Portfolio`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name} — ${site.headline}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.headline,
  worksFor: { '@type': 'Organization', name: site.company },
  description: site.description,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Bangladesh University of Business & Technology (BUBT)',
  },
  sameAs: [site.github.url, site.linkedin.url],
  knowsAbout: [
    'Software Quality Assurance',
    'Test Automation',
    'Playwright',
    'Postman',
    'API Contract Testing',
    'PostgreSQL',
    'MongoDB',
    'Node.js',
    'NestJS',
    'React',
    'Next.js',
    'TypeScript',
  ],
}

/** Marks the page as scripted before first paint, so reveals can start hidden without hiding content when JS is off. */
const markScripted = "document.documentElement.classList.add('js')"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: markScripted }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
