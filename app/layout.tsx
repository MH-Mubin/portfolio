import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Mahmud Hasan Mubin - Backend Developer Portfolio',
  description: 'Professional portfolio of Mahmud Hasan Mubin. Backend Engineer specializing in Node.js, NestJS, PostgreSQL, and modern web technologies.',
  keywords: 'Mahmud Hasan Mubin, Backend Developer, Node.js, NestJS, PostgreSQL, MongoDB, Express, TypeScript, Full Stack Developer',
  authors: [{ name: 'Mahmud Hasan Mubin' }],
  creator: 'Mahmud Hasan Mubin',
  publisher: 'Mahmud Hasan Mubin',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mahmud-mubin.vercel.app',
    title: 'Mahmud Hasan Mubin - Backend Developer Portfolio',
    description: 'Professional portfolio showcasing backend development expertise with 3D animations, live GitHub stats, and modern web technologies.',
    siteName: 'Mahmud Hasan Mubin Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahmud Hasan Mubin - Backend Developer Portfolio',
    description: 'Professional portfolio showcasing backend development expertise with 3D animations, live GitHub stats, and modern web technologies.',
    creator: '@MH_Mubin',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#06B6D4',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mahmud Hasan Mubin",
              "jobTitle": "Backend Developer",
              "description": "Backend Engineer specializing in Node.js, NestJS, PostgreSQL, and modern web technologies",
              "url": "https://mahmud-mubin.vercel.app",
              "sameAs": [
                "https://github.com/MH-Mubin",
                "https://linkedin.com/in/mh-mubin"
              ],
              "knowsAbout": ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "Express", "TypeScript", "React", "Next.js"]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <div className="min-h-screen w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
