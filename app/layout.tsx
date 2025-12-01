import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Mahmud Hasan Mubin - Backend Developer Portfolio',
  description: 'Professional portfolio of Mahmud Hasan Mubin. Backend Engineer specializing in Node.js, NestJS, PostgreSQL.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
