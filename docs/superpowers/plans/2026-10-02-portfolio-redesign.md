# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every section of the portfolio in the approved "A · Precision" design, with pinned horizontal project
rails, side panels, a sticky top bar and the content decisions from the spec, then ship it through a Vercel preview to
www.mh-mubin.me.

**Architecture:** Next.js 14 App Router, mostly server components. Each component owns a CSS Module ported from the
verified mockup; shared tokens and effects live in `app/globals.css`. Motion is CSS transitions driven by data
attributes (`data-r`, `data-line`, `data-count`) that one client component (`PageEffects`) switches on. The only
heavier client code is the pinned rail engine and the two side panels.

**Tech Stack:** Next.js 14.2, React 18.2, TypeScript 5.3, CSS Modules, Tailwind 3.4 (base reset only), `geist` fonts,
`@vercel/analytics`, Web3Forms.

**Spec:** `docs/superpowers/specs/2026-10-02-portfolio-redesign-design.md`. The reference mockup is
`.superpowers/mockup/portfolio-mockup.html` (git-ignored, open it in a browser).

## Global Constraints

- Breakpoints, mobile-first: phone is the base, `@media (min-width: 641px)` is tablet+, `@media (min-width: 1101px)` is desktop.
- Content max width 1320px. Side padding `--pad` = 16 / 24 / 48px. Top bar `--navH` = 60 / 64 / 68px.
- Colours only from the tokens in `app/globals.css`. `--tx3` is `#8b8b94` (AA contrast). No gradient text.
- Easing `cubic-bezier(.16,1,.3,1)` (`var(--e)`); reveals 0.9s with an 80ms stagger step (`--d`).
- Every animation respects `prefers-reduced-motion`.
- No phone number anywhere in the site. Employer is named "Avian BPO & IT". Canonical URL `https://www.mh-mubin.me`.
- No committed tests (project rule). Verification is `npm run type-check`, `npm run lint`, `npm run build`, plus ad hoc
  Playwright checks through the Playwright MCP.
- JSX text must not contain raw `'` or `"` (the `react/no-unescaped-entities` lint rule). Put such text in a `{'…'}`
  string or a data file.
- Commit messages end with: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
- Never `git add -A` or `git add .`: stage the exact paths each task lists.

---

### Task 1: Branch, privacy and foundations

**Files:**
- Modify: `.gitignore`
- Modify: `app/globals.css` (full rewrite)
- Modify: `app/layout.tsx` (full rewrite)
- Modify: `app/page.tsx`
- Modify: `tailwind.config.js` (full rewrite)
- Create or overwrite: `data/site.ts`
- Create: `components/ui/page-effects.tsx`
- Commit as-is (supporting files from earlier work, unchanged): `app/icon.svg`, `public/og.png`, `env.example`,
  `next.config.js`, `.eslintrc.json`, `types/global.d.ts`, the deletion of `types/index.ts`, `package.json`,
  `package-lock.json`, and the spec and plan under `docs/superpowers/`

**Interfaces:**
- Produces: CSS tokens `--bg --s1 --s2 --line --line2 --tx --tx2 --tx3 --ac --dev --warn --spot --spotb --e --sans --mono --pad --navH --gutter`;
  global classes `.section .pulse .btn .btn-pri .btn-ghost .arr .chips .hv .spot`; reveal attributes `data-r`,
  `data-line`, `data-count`, `data-glow` (handled by `PageEffects`); `html.js`.
- Produces: `site` with fields `name, headline, title, description, availability, location, company, roles, url, email, commitsLastYear, github, linkedin`
  (plus the old `shortName, role, secondRole, currentRole, phone`, which Task 9 deletes).

- [ ] **Step 1: Create the branch**

```bash
cd D:/Projects/portfolio
git switch -c redesign
```

Expected: `Switched to a new branch 'redesign'`. Uncommitted work comes along unchanged.

- [ ] **Step 2: Keep personal notes out of the public repo**

Append to `.gitignore`:

```gitignore

# Personal notes (kept out of the public repo)
SITE_ISSUES.md
resume.md
UI Suggestions.md
CLAUDE.md
```

Check that each one is ignored (on Windows, `CLAUDE.md` also matches `claude.md`):

```bash
git check-ignore -v SITE_ISSUES.md resume.md "UI Suggestions.md" claude.md .superpowers .playwright-mcp
```

Expected: one line per path, each naming a `.gitignore` rule.

- [ ] **Step 3: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ---------- design tokens (spec §3) ---------- */
:root {
  --bg: #09090b;
  --s1: #0f0f12;
  --s2: #141418;
  --line: rgba(255, 255, 255, 0.075);
  --line2: rgba(255, 255, 255, 0.16);
  --tx: #ededef;
  --tx2: #a1a1aa;
  --tx3: #8b8b94;
  --ac: #34d399;
  --dev: #60a5fa;
  --warn: #fbbf24;
  --spot: rgba(52, 211, 153, 0.07);
  --spotb: rgba(52, 211, 153, 0.55);
  --e: cubic-bezier(0.16, 1, 0.3, 1);
  --sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --mono: var(--font-geist-mono), ui-monospace, monospace;
  /* phone values; tablet and desktop below */
  --pad: 16px;
  --navH: 60px;
  /* keeps content at 1320px on wide screens. Only use it on full-width elements: its 100% is their width */
  --gutter: max(var(--pad), calc((100% - 1320px) / 2));
}

@media (min-width: 641px) {
  :root {
    --pad: 24px;
    --navH: 64px;
  }
}

@media (min-width: 1101px) {
  :root {
    --pad: 48px;
    --navH: 68px;
  }
}

/* ---------- base ---------- */
html {
  scrollbar-gutter: stable;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

body {
  background: var(--bg);
  color: var(--tx);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}

::selection {
  background: var(--ac);
  color: var(--bg);
}

:focus-visible {
  outline: 2px solid var(--ac);
  outline-offset: 2px;
}

/* anchor jumps land just under the sticky top bar */
#top,
section[id] {
  scroll-margin-top: var(--navH);
}

.section {
  padding: 88px var(--gutter) 0;
}

@media (min-width: 641px) {
  .section {
    padding-top: 104px;
  }
}

/* ---------- reveal: hidden only when JS runs (html.js), so content never depends on it ---------- */
.js [data-r] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.9s var(--e), transform 0.9s var(--e);
  transition-delay: calc(var(--d, 0) * 80ms);
}

.js [data-r].in {
  opacity: 1;
  transform: none;
}

[data-line] {
  display: block;
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
}

.js [data-line] > span {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 1.15s var(--e);
  transition-delay: calc(var(--d, 0) * 90ms);
}

.js [data-line].in > span {
  transform: none;
}

/* ---------- pulsing status dot (colour comes from `color`) ---------- */
.pulse {
  position: relative;
  display: inline-block;
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: currentColor;
  animation: ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}

/* ---------- buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: transform 0.2s var(--e), background-color 0.3s, border-color 0.3s;
}

.btn:active {
  transform: scale(0.97);
}

.btn-pri {
  background: var(--tx);
  color: var(--bg);
}

.btn-ghost {
  border: 1px solid var(--line2);
  color: var(--tx);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
}

.arr {
  display: inline-block;
  transition: transform 0.35s var(--e);
}

.btn:hover .arr {
  transform: translateX(4px);
}

/* ---------- chips ---------- */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chips li {
  padding: 3px 8px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font: 11.5px/1.5 var(--mono);
  color: var(--tx2);
}

/* ---------- "rule" hover card (from direction B): a rule draws across the top, the title nudges ---------- */
.hv {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--s1);
  transition: background-color 0.6s var(--e), border-color 0.6s var(--e);
}

.hv::after {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: var(--rule, var(--ac));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--e);
}

.hv:hover {
  background: var(--s2);
  border-color: var(--line2);
}

.hv:hover::after {
  transform: scaleX(1);
}

.hv h3 {
  transition: transform 0.6s var(--e);
}

.hv:hover h3 {
  transform: translateX(6px);
}

/* ---------- cursor spotlight (position fed by PageEffects) ---------- */
.spot {
  position: relative;
  isolation: isolate;
}

.spot::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), var(--spot), transparent 55%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.spot::after {
  content: '';
  position: absolute;
  inset: -1px;
  padding: 1px;
  border-radius: inherit;
  background: radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), var(--spotb), transparent 60%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.spot:hover::before,
.spot:hover::after {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .js [data-r],
  .js [data-line] > span {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .pulse::after {
    animation: none;
  }
}
```

- [ ] **Step 4: Write `tailwind.config.js`** (only the base reset is used now)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

- [ ] **Step 5: Write `data/site.ts`**

```ts
export const site = {
  name: 'Mahmud Hasan Mubin',
  shortName: 'Mubin',
  role: 'SQA Engineer',
  secondRole: 'Full-Stack Developer',
  headline: 'SQA Engineer & Full-Stack Developer',
  title: 'Mahmud Hasan Mubin — SQA Engineer & Full-Stack Developer',
  description:
    'SQA Engineer specialising in Playwright test automation, API contract validation and database integrity across web, mobile and browser-extension clients, with a full-stack background in Node.js, NestJS, React and PostgreSQL.',
  availability: 'Open to full-time SQA / SDET roles',
  location: 'Dhaka, Bangladesh',
  company: 'Avian BPO & IT',
  /** The two role lines under the name in the hero. */
  roles: [
    { title: 'SQA Engineer', detail: 'Test Automation & Systems Verification', kind: 'qa' },
    { title: 'Full-Stack Developer', detail: 'Node.js, NestJS, React & PostgreSQL', kind: 'dev' },
  ],
  currentRole: {
    title: 'SQA Engineer',
    // The employer is deliberately not named anywhere on the site.
    company: 'a software company',
  },
  url: 'https://www.mh-mubin.me',
  email: 'mahmud.h.mubin@gmail.com',
  /** Edited by hand: GitHub's public count leaves out work in private repositories. */
  commitsLastYear: '130+',
  phone: {
    display: '+880 …',
    href: 'tel:…',
  },
  github: {
    username: 'MH-Mubin',
    url: 'https://github.com/MH-Mubin',
  },
  linkedin: {
    handle: 'Mahmud Hasan Mubin',
    url: 'https://www.linkedin.com/in/mahmud-hasan-mubin/',
  },
} as const
```

(`shortName`, `role`, `secondRole`, `currentRole` and `phone` stay only until the old components that read them are
replaced; Task 9 deletes them.)

- [ ] **Step 6: Write `app/layout.tsx`**

The old wrapper `<div className="... overflow-x-hidden ...">` is removed on purpose: an overflow container around
the page would stop `position: sticky` from working.

```tsx
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
```

- [ ] **Step 7: Create `components/ui/page-effects.tsx`**

```tsx
'use client'

import { useEffect } from 'react'

/** Counts a `data-count` element up from 0 (ease-out-expo, 1.4s). */
const countUp = (el: HTMLElement) => {
  const to = Number(el.dataset.count)
  const start = performance.now()
  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / 1400)
    el.textContent = String(Math.round(to * (1 - Math.pow(2, -10 * progress))))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Page-wide motion: reveals `data-r` / `data-line` elements (adds `in`) and counts up `data-count` numbers
 * when they scroll into view, and feeds the pointer position to `.spot` cards and the `[data-glow]` hero.
 */
const PageEffects = () => {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-r], [data-line]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add('in')
          el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
          observer.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null
      const spot = target?.closest<HTMLElement>('.spot')
      if (spot) {
        const box = spot.getBoundingClientRect()
        spot.style.setProperty('--x', `${event.clientX - box.left}px`)
        spot.style.setProperty('--y', `${event.clientY - box.top}px`)
      }
      const glow = target?.closest<HTMLElement>('[data-glow]')
      if (glow) {
        const box = glow.getBoundingClientRect()
        glow.style.setProperty('--mx', `${event.clientX - box.left}px`)
        glow.style.setProperty('--my', `${event.clientY - box.top}px`)
      }
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  return null
}

export default PageEffects
```

- [ ] **Step 8: Mount it in `app/page.tsx`**

Replace the file with:

```tsx
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
```

- [ ] **Step 9: Verify**

Run: `npm run type-check`
Expected: exits 0 with no errors.

Run: `npm run lint`
Expected: `✔ No ESLint warnings or errors`

Run: `npm run build`
Expected: `✓ Compiled successfully` and the route table. The old sections still render; they use Tailwind utilities,
which keep working.

- [ ] **Step 10: Start the dev server for the visual checks in later tasks**

Run in the background: `npm run dev` (http://localhost:3000). Keep it running. Restart it if it stops.

- [ ] **Step 11: Commit**

```bash
git add .gitignore app/globals.css app/layout.tsx app/page.tsx tailwind.config.js data/site.ts components/ui/page-effects.tsx app/icon.svg public/og.png env.example next.config.js .eslintrc.json types/global.d.ts types/index.ts package.json package-lock.json docs/superpowers
git commit -m "Lay the redesign foundations: tokens, layout, page effects

Design tokens, shared effects and the reveal system for the A-Precision
redesign; canonical URL moves to www.mh-mubin.me; personal notes are
kept out of the public repo.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Sticky top bar, side panel and side menu

**Files:**
- Create: `data/nav.ts`, `lib/format.ts`, `lib/scroll.ts`, `lib/style.ts`
- Create: `components/ui/side-panel.tsx`, `components/ui/side-panel.module.css`
- Create: `components/nav/use-active-section.ts`, `components/nav/side-menu.tsx`, `components/nav/side-menu.module.css`
- Modify: `components/navbar.tsx` (full rewrite)
- Create: `components/navbar.module.css`

**Interfaces:**
- Produces: `navItems` and `SectionId` from `data/nav.ts`; `pad2(n: number): string`;
  `scrollToSection(id: string): void`; `vars(values: Record<string, string | number>): CSSProperties`.
- Produces: `SidePanel` with props `{ open: boolean; onClose(): void; size: 'menu' | 'case'; id?: string; label?: string; labelledBy?: string; children }`,
  and `CloseButton` with props `{ onClick(): void; label: string; initialFocus?: boolean }`. The panel focuses its
  `[data-autofocus]` element when it opens.
- Produces: the header has `id="site-nav"`; the menu panel has `id="site-menu"`.

- [ ] **Step 1: Create `data/nav.ts`**

```ts
export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']
```

- [ ] **Step 2: Create the helpers**

`lib/format.ts`:

```ts
/** 1 → "01" */
export const pad2 = (n: number) => String(n).padStart(2, '0')
```

`lib/style.ts`:

```ts
import type { CSSProperties } from 'react'

/** Typed inline custom properties, e.g. `vars({ '--d': 2 })` for a reveal delay step. */
export const vars = (values: Record<string, string | number>) => values as CSSProperties
```

`lib/scroll.ts`:

```ts
/**
 * Smooth-scrolls to a section and records it in the URL. Called from inside a closing side panel, so it waits one
 * frame: by then the panel has released its scroll lock and handed focus back, which would otherwise cancel the
 * smooth scroll.
 */
export const scrollToSection = (id: string) => {
  requestAnimationFrame(() => {
    document.documentElement.style.overflow = ''
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
    history.replaceState(null, '', `#${id}`)
  })
}
```

(`scrollIntoView` follows the CSS `scroll-behavior` and `scroll-margin-top`, so it is smooth unless reduced motion is
on, and it lands under the top bar.)

- [ ] **Step 3: Create `components/ui/side-panel.tsx`**

```tsx
'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import styles from './side-panel.module.css'

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

type SidePanelProps = {
  open: boolean
  onClose: () => void
  size: 'menu' | 'case'
  id?: string
  label?: string
  labelledBy?: string
  children: ReactNode
}

/**
 * A panel that slides in from the right over a blurred scrim. While open: page scroll is locked, Esc and the scrim
 * close it, Tab stays inside, and focus moves to its `[data-autofocus]` element, returning to the opener on close.
 */
const SidePanel = ({ open, onClose, size, id, label, labelledBy, children }: SidePanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return
    const opener = document.activeElement as HTMLElement | null
    const root = document.documentElement
    root.style.overflow = 'hidden'
    panel.scrollTop = 0
    const focusTimer = window.setTimeout(
      () => panel.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true }),
      320,
    )

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!panel.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      root.style.overflow = ''
      opener?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <>
      <div className={`${styles.scrim} ${open ? styles.scrimOpen : ''}`} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
        aria-hidden={!open}
        className={`${styles.panel} ${styles[size]} ${open ? styles.panelOpen : ''}`}
      >
        {children}
      </div>
    </>
  )
}

export const CloseButton = ({
  onClick,
  label,
  initialFocus = false,
}: {
  onClick: () => void
  label: string
  initialFocus?: boolean
}) => (
  <button
    type="button"
    className={styles.close}
    onClick={onClick}
    aria-label={label}
    data-autofocus={initialFocus || undefined}
  >
    <i aria-hidden="true" />
  </button>
)

export default SidePanel
```

`components/ui/side-panel.module.css`:

```css
.scrim {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(9, 9, 11, 0.35);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  transition: opacity 0.55s var(--e), visibility 0s linear 0.55s;
}

.scrimOpen {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.55s var(--e);
}

.panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 91;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #0c0c0f;
  border-left: 1px solid var(--line);
  box-shadow: -30px 0 80px -20px rgba(0, 0, 0, 0.7);
  transform: translateX(100%);
  visibility: hidden;
  transition: transform 0.7s var(--e), visibility 0s linear 0.7s;
}

.panelOpen {
  transform: none;
  visibility: visible;
  transition: transform 0.7s var(--e);
}

.menu {
  width: min(440px, 84vw);
}

.case {
  width: min(660px, 84vw);
}

.close {
  display: grid;
  place-items: center;
  flex: none;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line2);
  border-radius: 12px;
  transition: background-color 0.25s;
}

.close:hover {
  background: rgba(255, 255, 255, 0.06);
}

.close i {
  position: relative;
  display: block;
  width: 16px;
  height: 1.5px;
}

.close i::before,
.close i::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 1.5px;
  background: var(--tx);
}

.close i::before {
  transform: rotate(45deg);
}

.close i::after {
  transform: rotate(-45deg);
}

@media (prefers-reduced-motion: reduce) {
  .scrim,
  .scrimOpen,
  .panel,
  .panelOpen {
    transition: none;
  }
}
```

- [ ] **Step 4: Create `components/nav/use-active-section.ts`**

```ts
import { useEffect, useState } from 'react'
import { navItems, type SectionId } from '@/data/nav'

/** The last section whose top has passed 35% of the way down the area below the top bar. */
export const useActiveSection = () => {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const navHeight = document.getElementById('site-nav')?.offsetHeight ?? 0
      const line = navHeight + (window.innerHeight - navHeight) * 0.35
      let current: SectionId | null = null
      for (const { id } of navItems) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return active
}
```

- [ ] **Step 5: Create `components/nav/side-menu.tsx`**

```tsx
'use client'

import type { MouseEvent } from 'react'
import { navItems, type SectionId } from '@/data/nav'
import { site } from '@/data/site'
import { pad2 } from '@/lib/format'
import { scrollToSection } from '@/lib/scroll'
import { vars } from '@/lib/style'
import SidePanel, { CloseButton } from '../ui/side-panel'
import styles from './side-menu.module.css'

type SideMenuProps = { open: boolean; active: SectionId | null; onClose: () => void }

const SideMenu = ({ open, active, onClose }: SideMenuProps) => {
  const go = (event: MouseEvent, id: string) => {
    event.preventDefault()
    onClose()
    scrollToSection(id)
  }

  return (
    <SidePanel open={open} onClose={onClose} size="menu" id="site-menu" label="Site menu">
      <div className={styles.inner}>
        <div className={styles.head}>
          <span>Menu</span>
          <CloseButton onClick={onClose} label="Close menu" />
        </div>
        <nav aria-label="Sections" className={`${styles.links} ${open ? styles.shown : ''}`}>
          {navItems.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => go(event, id)}
              className={active === id ? styles.active : undefined}
              aria-current={active === id ? 'true' : undefined}
              data-autofocus={i === 0 || undefined}
              style={vars({ '--i': i })}
            >
              <span className={styles.number}>{pad2(i + 1)}</span>
              {label}
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
        <div className={`${styles.foot} ${open ? styles.shown : ''}`}>
          <p className={styles.availability}>
            <span className="pulse" aria-hidden="true" />
            {site.availability}
          </p>
          <a className={styles.mail} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="btn btn-pri" href="#contact" onClick={(event) => go(event, 'contact')}>
            Get in touch{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </SidePanel>
  )
}

export default SideMenu
```

`components/nav/side-menu.module.css`:

```css
.inner {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 var(--pad) 24px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: none;
  min-height: var(--navH);
}

.head span {
  font: 500 12px var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.links {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

.links a {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 0;
  border-bottom: 1px solid var(--line);
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.035em;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.45s var(--e), transform 0.7s var(--e), color 0.3s;
}

.shown a {
  opacity: 1;
  transform: none;
  transition-delay: calc(130ms + var(--i) * 45ms), calc(130ms + var(--i) * 45ms), 0s;
}

.number {
  width: 20px;
  font: 500 12px var(--mono);
  color: var(--tx3);
}

.arrow {
  margin-left: auto;
  font-size: 18px;
  color: var(--tx3);
  transition: transform 0.35s var(--e), color 0.3s;
}

.links a:hover .arrow,
.links a:focus-visible .arrow {
  transform: translateX(4px);
  color: var(--ac);
}

.links a.active,
.links a.active .number {
  color: var(--ac);
}

.foot {
  margin-top: auto;
  padding-top: 28px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s var(--e), transform 0.6s var(--e);
}

.foot.shown {
  opacity: 1;
  transform: none;
  transition-delay: 0.4s;
}

.availability {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 500 12px var(--mono);
  color: var(--tx2);
}

.availability :global(.pulse) {
  color: var(--ac);
}

.mail {
  display: block;
  margin-top: 8px;
  font: 13px var(--mono);
  color: var(--tx3);
  word-break: break-all;
}

.foot :global(.btn) {
  width: 100%;
  margin-top: 18px;
}

@media (prefers-reduced-motion: reduce) {
  .links a,
  .foot {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 6: Rewrite `components/navbar.tsx`**

The side menu renders outside `<header>`: the header's `backdrop-filter` would otherwise become the containing block
for the fixed panel.

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { navItems, type SectionId } from '@/data/nav'
import { site } from '@/data/site'
import SideMenu from './nav/side-menu'
import { useActiveSection } from './nav/use-active-section'
import styles from './navbar.module.css'

type Indicator = { left: number; width: number } | null

const Navbar = () => {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<SectionId | null>(null)
  const [indicator, setIndicator] = useState<Indicator>(null)
  const linksRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The highlight follows the hovered link and rests on the section in view.
  const target = hovered ?? active
  useEffect(() => {
    const links = linksRef.current
    if (!links) return
    const place = () => {
      const link = target ? links.querySelector<HTMLAnchorElement>(`a[href="#${target}"]`) : null
      setIndicator(link ? { left: link.offsetLeft, width: link.offsetWidth } : null)
    }
    place()
    const observer = new ResizeObserver(place)
    observer.observe(links)
    return () => observer.disconnect()
  }, [target])

  return (
    <>
      <header id="site-nav" className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a className={styles.logo} href="#top" aria-label={`${site.name}, back to top`}>
          <span className={styles.monogram} aria-hidden="true">
            MH
          </span>
          <span className={styles.name} aria-hidden="true">
            {site.name}
          </span>
        </a>
        <nav ref={linksRef} className={styles.links} aria-label="Sections" onPointerLeave={() => setHovered(null)}>
          <span
            className={styles.indicator}
            aria-hidden="true"
            style={
              indicator
                ? { width: indicator.width, transform: `translateX(${indicator.left}px)`, opacity: 1 }
                : { opacity: 0 }
            }
          />
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? styles.active : undefined}
              aria-current={active === id ? 'true' : undefined}
              onPointerEnter={() => setHovered(id)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className={styles.cta} href="#contact">
          Get in touch
        </a>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(true)}
        >
          <i aria-hidden="true" />
        </button>
      </header>
      <SideMenu open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default Navbar
```

`components/navbar.module.css`:

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: var(--navH);
  padding: 0 var(--gutter);
  border-bottom: 1px solid transparent;
  transition: background-color 0.4s, border-color 0.4s;
}

.scrolled {
  background: rgba(9, 9, 11, 0.74);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  border-color: var(--line);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.monogram {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--tx);
  color: var(--bg);
  font: 600 12px var(--mono);
}

.name,
.links,
.cta {
  display: none;
}

.menuButton {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line2);
  border-radius: 12px;
  transition: background-color 0.25s;
}

.menuButton:hover {
  background: rgba(255, 255, 255, 0.06);
}

.menuButton i,
.menuButton i::before,
.menuButton i::after {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--tx);
}

.menuButton i {
  position: relative;
}

.menuButton i::before,
.menuButton i::after {
  content: '';
  position: absolute;
  left: 0;
}

.menuButton i::before {
  top: -5px;
}

.menuButton i::after {
  top: 5px;
}

.indicator {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.085);
  pointer-events: none;
  transition: transform 0.5s var(--e), width 0.5s var(--e), opacity 0.3s;
}

@media (min-width: 641px) {
  .name {
    display: inline;
  }
}

@media (min-width: 1101px) {
  .menuButton {
    display: none;
  }

  .links {
    position: relative;
    display: flex;
    padding: 4px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.02);
  }

  .links a {
    position: relative;
    z-index: 1;
    padding: 7px 15px;
    font-size: 13px;
    color: var(--tx2);
    transition: color 0.3s;
  }

  .links a:hover,
  .links a.active {
    color: var(--tx);
  }

  .cta {
    display: inline-flex;
    padding: 9px 16px;
    border-radius: 999px;
    background: var(--tx);
    color: var(--bg);
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }
}
```

- [ ] **Step 7: Verify**

Run: `npm run type-check`. Expected: no errors.
Run: `npm run lint`. Expected: `✔ No ESLint warnings or errors`.

Visual check (Playwright MCP, http://localhost:3000):
- **1440×900:** the bar is transparent at the top, then blurred with a hairline after scrolling. The link
  highlight slides between hovered links and rests on the section in view.
- **390×844:** the menu button opens a panel about 84% wide with the page blurred in the remaining strip. Links
  appear one after another. Esc, the scrim and ✕ all close it, and a link closes it and scrolls to the section. The
  old sections have no ids yet except `#about`, `#experience`, `#skills`, `#github` and `#contact`, so `#projects`
  only works after Task 7.

- [ ] **Step 8: Commit**

```bash
git add data/nav.ts lib/format.ts lib/scroll.ts lib/style.ts components/ui/side-panel.tsx components/ui/side-panel.module.css components/nav components/navbar.tsx components/navbar.module.css
git commit -m "Add the sticky top bar and side menu

Sticky bar with a sliding section highlight and scroll-spy; on tablet and
phone a side panel covering ~84% of the width slides in over the blurred
page, with focus trapping, Esc and scroll lock.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Hero, pipeline card and stats

**Files:**
- Modify: `data/about.ts` (add `Stat` type and the new stats; the rest of the file is changed in Task 4)
- Commit unchanged: `data/pipeline.ts`
- Create: `lib/use-reduced-motion.ts`
- Create: `components/ui/stat-strip.tsx`, `components/ui/stat-strip.module.css`
- Modify: `components/hero-section.tsx` (full rewrite), create `components/hero-section.module.css`
- Modify: `components/hero/pipeline-card.tsx` (full rewrite), create `components/hero/pipeline-card.module.css`
- Delete: `components/particle-background.tsx`

**Interfaces:**
- Consumes: `vars` (Task 2), `site.roles`, `site.availability`, `site.location`, `site.company` (Task 1).
- Produces: `type Stat = { value: string; label: string; context: string }` in `data/about.ts`;
  `StatStrip` with props `{ stats: Stat[]; className?: string }`; `useReducedMotion(): boolean`.

- [ ] **Step 1: Update `data/about.ts`**

At the very top of the file add:

```ts
import { site } from './site'

export type Stat = { value: string; label: string; context: string }

```

Replace the whole `export const stats = [ … ]` block with:

```ts
export const stats: Stat[] = [
  { value: '1+ yr', label: 'Professional SQA', context: `At ${site.company} since May 2025` },
  { value: '7+', label: 'Company projects tested', context: 'Web, Android, iOS and browser extensions' },
  { value: '15+', label: 'A/B variants validated', context: 'Telemetry, routing and analytics events' },
  { value: '6+', label: 'Open-source dev projects', context: 'Node.js, NestJS and React backends and apps' },
]
```

- [ ] **Step 2: Create `lib/use-reduced-motion.ts`**

```ts
import { useEffect, useState } from 'react'

/** Tracks the `prefers-reduced-motion: reduce` setting. */
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}
```

- [ ] **Step 3: Create `components/ui/stat-strip.tsx`**

```tsx
import type { Stat } from '@/data/about'
import { vars } from '@/lib/style'
import styles from './stat-strip.module.css'

/** "15+" counts up to 15 when revealed; four-digit values such as years stay as they are. */
const StatValue = ({ value }: { value: string }) => {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match || Number(match[1]) > 999) return <>{value}</>
  return (
    <>
      <span data-count={match[1]}>{match[1]}</span>
      {match[2]}
    </>
  )
}

const StatStrip = ({ stats, className = '' }: { stats: Stat[]; className?: string }) => (
  <div className={`${styles.strip} ${className}`}>
    {stats.map((stat, i) => (
      <div key={stat.label} className={styles.cell} data-r style={vars({ '--d': i })}>
        <p className={styles.value}>
          <StatValue value={stat.value} />
        </p>
        <div className={styles.text}>
          <p className={styles.label}>{stat.label}</p>
          <p className={styles.context}>{stat.context}</p>
        </div>
      </div>
    ))}
  </div>
)

export default StatStrip
```

`components/ui/stat-strip.module.css`:

```css
.strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.cell {
  padding: 20px 14px;
  border-left: 1px solid var(--line);
}

.cell:nth-child(odd) {
  padding-left: 0;
  border-left: 0;
}

.cell:nth-child(n + 3) {
  border-top: 1px solid var(--line);
}

.value {
  flex: none;
  font-size: 34px;
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1;
}

.text {
  min-width: 0;
  margin-top: 10px;
}

.label {
  font-size: 14px;
  font-weight: 500;
}

.context {
  margin-top: 4px;
  font: 12px/1.5 var(--mono);
  color: var(--tx3);
}

@media (min-width: 641px) {
  .cell {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 26px 28px;
  }

  .cell:nth-child(odd) {
    padding-left: 0;
  }

  .value {
    font-size: 42px;
  }

  .text {
    margin-top: 0;
  }
}

@media (min-width: 1101px) {
  .strip {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .cell:nth-child(odd) {
    padding-left: 28px;
    border-left: 1px solid var(--line);
  }

  .cell:first-child {
    padding-left: 0;
    border-left: 0;
  }

  .cell:nth-child(n + 3) {
    border-top: 0;
  }
}
```

- [ ] **Step 4: Rewrite `components/hero/pipeline-card.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { buildStages, verifyStages, type Stage } from '@/data/pipeline'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import styles from './pipeline-card.module.css'

const STEP_MS = 850
const HOLD_MS = 4200
const TOTAL = buildStages.length + verifyStages.length

type StageState = 'queued' | 'running' | 'passed'

const stateLabel: Record<StageState, string> = {
  queued: 'queued',
  running: 'running…',
  passed: 'passed',
}

const StageRow = ({ stage, state }: { stage: Stage; state: StageState }) => (
  <li className={styles.row} data-state={state}>
    <span className={styles.status} aria-hidden="true" />
    <div className={styles.rowText}>
      <p className={styles.stage}>{stage.name}</p>
      <p className={styles.tools}>{stage.tools}</p>
    </div>
    <span className={styles.label}>{stateLabel[state]}</span>
  </li>
)

const PipelineCard = () => {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduced) {
      setStep(TOTAL)
      return
    }
    const timer = setTimeout(() => setStep((s) => (s >= TOTAL ? 0 : s + 1)), step >= TOTAL ? HOLD_MS : STEP_MS)
    return () => clearTimeout(timer)
  }, [step, reduced])

  const stateOf = (index: number): StageState => (step > index ? 'passed' : step === index ? 'running' : 'queued')
  const complete = step >= TOTAL

  return (
    <div
      role="img"
      aria-label="A release pipeline: the API service, web app and database I build with NestJS, React and PostgreSQL, followed by the quality gates I verify with Postman, Playwright and SQL checks."
      className={styles.card}
    >
      <div className={styles.head}>
        <div>
          <p className={styles.file}>release-gate.yml</p>
          <p className={styles.branch}>main · build → verify</p>
        </div>
        <span className={styles.badge} data-done={complete}>
          {complete ? 'passed' : 'running'}
        </span>
      </div>
      <div className={styles.bar}>
        <i style={{ transform: `scaleX(${Math.min(1, step / TOTAL)})` }} />
      </div>
      <p className={styles.group}>Build · developer</p>
      <ol className={styles.list}>
        {buildStages.map((stage, i) => (
          <StageRow key={stage.name} stage={stage} state={stateOf(i)} />
        ))}
      </ol>
      <p className={styles.group}>Verify · QA</p>
      <ol className={styles.list}>
        {verifyStages.map((stage, i) => (
          <StageRow key={stage.name} stage={stage} state={stateOf(buildStages.length + i)} />
        ))}
      </ol>
      <p className={styles.done} data-show={complete}>
        ✓ Built and verified · ready to ship
      </p>
    </div>
  )
}

export default PipelineCard
```

`components/hero/pipeline-card.module.css`:

```css
.card {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(180deg, #121215, #0c0c0e);
  box-shadow: 0 40px 90px -40px rgba(0, 0, 0, 0.9);
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.file {
  font: 500 13px var(--mono);
}

.branch {
  margin-top: 3px;
  font: 12px var(--mono);
  color: var(--tx3);
}

.badge {
  padding: 4px 10px;
  border: 1px solid rgba(251, 191, 36, 0.28);
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.08);
  font: 500 11px var(--mono);
  color: var(--warn);
  transition: color 0.4s, background-color 0.4s, border-color 0.4s;
}

.badge[data-done='true'] {
  border-color: rgba(52, 211, 153, 0.32);
  background: rgba(52, 211, 153, 0.08);
  color: var(--ac);
}

.bar {
  height: 2px;
  margin: 18px 0 4px;
  border-radius: 2px;
  background: var(--line);
  overflow: hidden;
}

.bar i {
  display: block;
  height: 100%;
  background: var(--ac);
  transform-origin: left;
  transition: transform 0.7s var(--e);
}

.group {
  margin: 16px 0 8px;
  font: 500 11px var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.015);
  transition: background-color 0.45s, border-color 0.45s;
}

.row[data-state='running'] {
  border-color: rgba(251, 191, 36, 0.28);
  background: rgba(251, 191, 36, 0.04);
}

.status {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--tx3);
  border-radius: 50%;
  opacity: 0.7;
}

.row[data-state='running'] .status {
  border-color: var(--warn);
  border-top-color: transparent;
  opacity: 1;
  animation: spin 0.8s linear infinite;
}

.row[data-state='passed'] .status {
  border-color: var(--ac);
  background: var(--ac);
  opacity: 1;
  animation: pop 0.4s var(--e);
}

.row[data-state='passed'] .status::after {
  content: '';
  width: 7px;
  height: 4px;
  border-left: 1.7px solid var(--bg);
  border-bottom: 1.7px solid var(--bg);
  transform: translateY(-1px) rotate(-45deg);
}

.rowText {
  min-width: 0;
}

.stage {
  font-size: 13.5px;
}

.tools {
  margin-top: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: 12px var(--mono);
  color: var(--tx3);
}

.label {
  flex: none;
  margin-left: auto;
  font: 11.5px var(--mono);
  color: var(--tx3);
  transition: color 0.35s;
}

.row[data-state='running'] .label {
  color: var(--warn);
}

.row[data-state='passed'] .label {
  color: var(--ac);
}

.done {
  margin-top: 14px;
  font-size: 13px;
  color: var(--ac);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.5s var(--e), transform 0.5s var(--e);
}

.done[data-show='true'] {
  opacity: 1;
  transform: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pop {
  0% {
    transform: scale(0.4);
  }
  60% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

@media (min-width: 641px) {
  .card {
    padding: 22px;
  }
}
```

- [ ] **Step 5: Rewrite `components/hero-section.tsx`**

```tsx
import { stats } from '@/data/about'
import { site } from '@/data/site'
import { vars } from '@/lib/style'
import PipelineCard from './hero/pipeline-card'
import StatStrip from './ui/stat-strip'
import styles from './hero-section.module.css'

const city = site.location.split(',')[0]

const HeroSection = () => (
  <div className={styles.wrap}>
    <section className={styles.hero} data-glow aria-labelledby="hero-name">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.text}>
        <p className={styles.eyebrow} data-r>
          <span className="pulse" aria-hidden="true" />
          {site.availability}
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
          {city}
        </p>
        <h1 id="hero-name" className={styles.name}>
          <span data-line style={vars({ '--d': 1 })}>
            <span>{site.name}</span>
          </span>
        </h1>
        <div className={styles.roles} data-r style={vars({ '--d': 3 })}>
          {site.roles.map((role) => (
            <p key={role.title} className={styles.role} data-kind={role.kind}>
              {role.title}{' '}
              <span>
                <b className={styles.roleSep}>· </b>
                {role.detail}
              </span>
            </p>
          ))}
        </div>
        <p className={styles.lede} data-r style={vars({ '--d': 4 })}>
          I make sure software works before users touch it: Playwright automation, API contract testing and
          database-level verification across web, mobile and browser extensions — backed by hands-on full-stack
          development with Node.js, NestJS and React.
        </p>
        <div className={styles.ctas} data-r style={vars({ '--d': 5 })}>
          <a className="btn btn-pri" href="#projects">
            View projects{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <div className={styles.side} data-r style={vars({ '--d': 4 })}>
        <PipelineCard />
      </div>
    </section>
    <StatStrip stats={stats} className={styles.stats} />
  </div>
)

export default HeroSection
```

`components/hero-section.module.css`:

```css
.wrap {
  display: flex;
  flex-direction: column;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 32px;
  padding: 12px var(--gutter) 56px;
}

.dots {
  position: absolute;
  inset: calc(-1 * var(--navH)) 0 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.11) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 60% 70% at 28% 40%, #000 15%, transparent 72%);
  mask-image: radial-gradient(ellipse 60% 70% at 28% 40%, #000 15%, transparent 72%);
  pointer-events: none;
}

.glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(560px circle at var(--mx, 28%) var(--my, 42%), rgba(52, 211, 153, 0.085), transparent 62%);
  pointer-events: none;
}

.text,
.side {
  position: relative;
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 11px 5px 9px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(9, 9, 11, 0.7);
  font: 500 11px/1.4 var(--mono);
  color: var(--tx2);
}

.eyebrow :global(.pulse) {
  color: var(--ac);
}

.sep {
  color: var(--tx3);
}

.name {
  margin-top: 20px;
  font-size: 44px;
  font-weight: 600;
  letter-spacing: -0.052em;
  line-height: 1;
}

.roles {
  display: grid;
  gap: 8px;
  margin-top: 22px;
}

.role {
  position: relative;
  padding-left: 17px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.3;
}

.role::before {
  content: '';
  position: absolute;
  top: 0.55em;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ac);
}

.role[data-kind='dev']::before {
  background: var(--dev);
}

.role span {
  display: block;
  margin-top: 2px;
  font-size: 15px;
  color: var(--tx3);
}

.roleSep {
  display: none;
  font-weight: inherit;
}

.lede {
  max-width: 580px;
  margin-top: 22px;
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--tx2);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

.ctas :global(.btn) {
  flex: 1;
}

.stats {
  margin: 0 var(--gutter);
}

@media (min-width: 641px) {
  .hero {
    gap: 40px;
    padding-top: 24px;
    padding-bottom: 88px;
  }

  .side {
    max-width: 560px;
  }

  .eyebrow {
    padding: 6px 13px 6px 11px;
    font-size: 12px;
  }

  .name {
    margin-top: 30px;
    font-size: 64px;
  }

  .role {
    padding-left: 21px;
    font-size: 24px;
  }

  .role::before {
    top: 0.5em;
    width: 9px;
    height: 9px;
  }

  .role span {
    display: inline;
    margin: 0;
    font-size: inherit;
  }

  .roleSep {
    display: inline;
  }

  .lede {
    font-size: 17px;
  }

  .ctas :global(.btn) {
    flex: none;
  }
}

@media (min-width: 1101px) {
  /* hero + stats fill one screen, but never more than 860px tall */
  .wrap {
    min-height: min(calc(100vh - var(--navH)), 860px);
    min-height: min(calc(100svh - var(--navH)), 860px);
  }

  .hero {
    flex: 1;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 64px;
    padding: 32px var(--gutter) 56px;
  }

  .side {
    max-width: none;
  }

  .name {
    font-size: 76px;
  }
}
```

- [ ] **Step 6: Remove the Three.js background**

```bash
git rm components/particle-background.tsx
```

- [ ] **Step 7: Verify**

Run: `npm run type-check` and `npm run lint`. Expected: no errors and no warnings.

Visual check against the mockup hero at 1920×1080, 1440×900 and 390×844:
- the name reveals up through a line mask
- the two role lines have a green and a blue dot; on phones each description sits on its own line, with no "·"
- the pipeline steps through the stages and loops
- the stats count up, reading 1+ yr, 7+, 15+ and 6+, each with its context line
- at 1920×1080 the stats strip ends at about 928px

- [ ] **Step 8: Commit**

```bash
git add data/about.ts data/pipeline.ts lib/use-reduced-motion.ts components/ui/stat-strip.tsx components/ui/stat-strip.module.css components/hero-section.tsx components/hero-section.module.css components/hero
git commit -m "Redesign the hero: role lines, release pipeline, inline stats

Two equal role lines (SQA in green, full-stack in blue), the restyled
release-gate pipeline, and an inline stats strip with context lines.
The Three.js particle background is gone.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: About section

**Files:**
- Modify: `data/about.ts` (full rewrite)
- Commit: `data/skills.ts` (unchanged; first use of `principles` and `learning` here)
- Create: `components/ui/section-heading.tsx`, `components/ui/section-heading.module.css`
- Modify: `components/about-section.tsx` (full rewrite), create `components/about-section.module.css`

**Interfaces:**
- Produces: `story: string[]`, `facts: { label: string; value: string }[]`,
  `buildVerify: { build: string; verify: string }[]`, `stats: Stat[]`, `type Stat`.
- Produces: `SectionHeading` with props `{ index: string; kicker: string; title: string; subtitle?: string }`, and
  `Kicker` with props `{ index?: string; children: ReactNode }`.

- [ ] **Step 1: Rewrite `data/about.ts`**

```ts
import { site } from './site'

export type Stat = { value: string; label: string; context: string }

export const story = [
  "I'm a Computer Science graduate who started out building full-stack applications with Node.js, NestJS and React. Today I work as an SQA Engineer, and that developer background is my edge: I read the API response, the token and the database row, not just the screen.",
  'I automate end-to-end journeys with Playwright, guard API contracts with Postman and Newman, and verify data integrity directly in PostgreSQL and MongoDB — across web apps, Android and iOS clients, and browser extensions. When a test fails, I isolate the cause down to the payload before it reaches a developer.',
  'I also own the QA process: I lead a 7-member testing team, standardised how bugs are triaged, write the test strategy documents and enforce Definition of Done gates before anything reaches production.',
]

export const facts = [
  { label: 'Role', value: 'SQA Engineer' },
  { label: 'Company', value: site.company },
  { label: 'Since', value: 'May 2025' },
  { label: 'Education', value: 'B.Sc. CSE, BUBT' },
  { label: 'Based in', value: site.location },
  { label: 'Open to', value: 'Full-time SQA / SDET roles' },
]

/** Each thing I build, next to the way I verify it. */
export const buildVerify = [
  { build: 'REST APIs with Node.js, Express and NestJS', verify: 'Postman and Newman API contract tests' },
  { build: 'React and Next.js interfaces', verify: 'Playwright E2E suites built on Page Objects' },
  { build: 'PostgreSQL and MongoDB data models', verify: 'Database state and ACID transaction checks' },
  { build: 'JWT authentication and role-based access', verify: 'JWT, RBAC and IDOR security testing' },
]

export const stats: Stat[] = [
  { value: '1+ yr', label: 'Professional SQA', context: `At ${site.company} since May 2025` },
  { value: '7+', label: 'Company projects tested', context: 'Web, Android, iOS and browser extensions' },
  { value: '15+', label: 'A/B variants validated', context: 'Telemetry, routing and analytics events' },
  { value: '6+', label: 'Open-source dev projects', context: 'Node.js, NestJS and React backends and apps' },
]
```

- [ ] **Step 2: Create `components/ui/section-heading.tsx`**

```tsx
import type { ReactNode } from 'react'
import { vars } from '@/lib/style'
import styles from './section-heading.module.css'

/** The mono label above a heading, e.g. "01 ABOUT ——". */
export const Kicker = ({ index, children }: { index?: string; children: ReactNode }) => (
  <p className={styles.kicker} data-r>
    {index && <b>{index}</b>}
    {children}
  </p>
)

const SectionHeading = ({
  index,
  kicker,
  title,
  subtitle,
}: {
  index: string
  kicker: string
  title: string
  subtitle?: string
}) => (
  <>
    <Kicker index={index}>{kicker}</Kicker>
    <h2 className={styles.title} data-r style={vars({ '--d': 1 })}>
      {title}
    </h2>
    {subtitle && (
      <p className={styles.subtitle} data-r style={vars({ '--d': 2 })}>
        {subtitle}
      </p>
    )}
  </>
)

export default SectionHeading
```

`components/ui/section-heading.module.css`:

```css
.kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  font: 500 12px/1.5 var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.kicker b {
  font-weight: 500;
  color: var(--ac);
}

.kicker::after {
  content: '';
  width: 48px;
  height: 1px;
  background: var(--line2);
}

.title {
  margin-top: 18px;
  font-size: 34px;
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1.05;
}

.subtitle {
  max-width: 640px;
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.62;
  color: var(--tx2);
}

@media (min-width: 641px) {
  .title {
    font-size: 46px;
  }
}
```

- [ ] **Step 3: Rewrite `components/about-section.tsx`**

```tsx
import { buildVerify, facts, story } from '@/data/about'
import { learning, principles } from '@/data/skills'
import { pad2 } from '@/lib/format'
import { vars } from '@/lib/style'
import SectionHeading, { Kicker } from './ui/section-heading'
import styles from './about-section.module.css'

const AboutSection = () => (
  <section id="about" className="section">
    <div className={styles.top}>
      <div>
        <SectionHeading index="01" kicker="About" title="About me" />
        <dl className={styles.facts} data-r style={vars({ '--d': 2 })}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.story} data-r style={vars({ '--d': 2 })}>
        {story.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </div>

    <div className={styles.table} data-r>
      <div className={styles.tableHead}>
        <span className={styles.build}>I build</span>
        <span className={styles.by} aria-hidden="true">
          verified by
        </span>
        <span className={styles.verify}>I verify</span>
      </div>
      {buildVerify.map((pair) => (
        <div key={pair.build} className={styles.row}>
          <span className={styles.buildItem}>{pair.build}</span>
          <span className={styles.swap} aria-hidden="true">
            ⇄
          </span>
          <span className={styles.verifyItem}>{pair.verify}</span>
        </div>
      ))}
    </div>

    <div className={styles.how}>
      <Kicker>How I test</Kicker>
      <div className={styles.howGrid}>
        {principles.map((principle, i) => (
          <div key={principle.title} data-r style={vars({ '--d': i })}>
            <article className={`hv ${styles.howCard}`}>
              <span className={styles.number}>{pad2(i + 1)}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          </div>
        ))}
      </div>
      <p className={styles.learning} data-r>
        <b>Currently learning</b>
        {learning.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
    </div>
  </section>
)

export default AboutSection
```

`components/about-section.module.css`:

```css
.top {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
}

.facts {
  margin-top: 32px;
  border-top: 1px solid var(--line);
}

.facts div {
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  font-size: 14.5px;
}

.facts dt {
  font: 500 11.5px/1.9 var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.story p {
  font-size: 16px;
  line-height: 1.75;
  color: var(--tx2);
}

.story p + p {
  margin-top: 18px;
}

.story p:first-child {
  color: var(--tx);
}

/* build ⇄ verify table */
.table {
  margin-top: 56px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--s1);
  overflow: hidden;
}

.tableHead,
.row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  padding: 0 18px;
}

.tableHead {
  grid-template-columns: auto auto;
  justify-content: start;
  gap: 18px;
  padding-top: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.tableHead span {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tableHead .by {
  display: none;
}

.build::before,
.verify::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dev);
}

.verify::before {
  background: var(--ac);
}

.row {
  gap: 6px;
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
  font-size: 14.5px;
  color: var(--tx2);
  transition: background-color 0.5s var(--e), color 0.4s;
}

.row:last-child {
  border-bottom: 0;
}

.row:hover {
  background: var(--s2);
  color: var(--tx);
}

.buildItem,
.verifyItem {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.buildItem::before,
.verifyItem::before {
  content: '';
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dev);
  transform: translateY(-2px);
}

.verifyItem::before {
  background: var(--ac);
}

.swap {
  display: none;
  text-align: center;
  font-family: var(--mono);
  color: var(--tx3);
  transition: color 0.4s, transform 0.5s var(--e);
}

.row:hover .swap {
  color: var(--ac);
  transform: scale(1.2);
}

/* how I test */
.how {
  margin-top: 56px;
}

.howGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  margin-top: 22px;
}

.howCard {
  height: 100%;
  padding: 22px;
}

.number {
  font: 12px var(--mono);
  color: var(--tx3);
  transition: color 0.45s;
}

.number::before {
  content: '(';
}

.number::after {
  content: ')';
}

.howCard:hover .number {
  color: var(--ac);
}

.howCard h3 {
  margin-top: 16px;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.howCard p {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.62;
  color: var(--tx2);
}

.learning {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: 22px;
  padding: 18px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-size: 14px;
  color: var(--tx2);
}

.learning b {
  margin-right: 6px;
  font: 500 12px var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.learning span + span::before {
  content: '·';
  margin-right: 12px;
  color: var(--tx3);
}

@media (min-width: 641px) {
  .story p {
    font-size: 17px;
  }

  .tableHead,
  .row {
    grid-template-columns: minmax(0, 1fr) 120px minmax(0, 1fr);
    align-items: center;
    padding-left: 28px;
    padding-right: 28px;
  }

  .tableHead {
    justify-content: stretch;
    gap: 0;
    font-size: 19px;
  }

  .tableHead .by {
    display: flex;
    justify-content: center;
    white-space: nowrap;
    font: 500 11px var(--mono);
    color: var(--tx3);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .row {
    gap: 0;
    font-size: 15px;
  }

  .buildItem::before,
  .verifyItem::before {
    display: none;
  }

  .swap {
    display: block;
  }

  .howGrid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .howCard {
    padding: 26px;
  }
}

@media (min-width: 1101px) {
  .top {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 64px;
  }

  .facts {
    max-width: 460px;
  }
}
```

- [ ] **Step 4: Verify**

Run `npm run type-check` and `npm run lint`. Expected: no errors and no warnings.

Visual check against the mockup About section at 1920×1080 and 390×844:
- the facts sit on the left and the three story paragraphs on the right
- the build ⇄ verify rows light up on hover; on phones they stack with blue and green dots
- the "How I test" cards use the rule hover
- the "Currently learning" line follows them

- [ ] **Step 5: Commit**

```bash
git add data/about.ts data/skills.ts components/ui/section-heading.tsx components/ui/section-heading.module.css components/about-section.tsx components/about-section.module.css
git commit -m "Redesign About: facts, build-verify pairs, How I test

Adds the at-a-glance facts, the QA-process paragraph, a table pairing
each thing built with how it is verified, and the testing principles
with what I'm currently learning.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Experience section

**Files:**
- Modify: `data/experience.ts`
- Create: `components/ui/chips.tsx`
- Modify: `components/experience-section.tsx` (full rewrite), create `components/experience-section.module.css`

**Interfaces:**
- Produces: `Chips` with props `{ items: readonly string[]; className?: string }` (renders `ul.chips`).

- [ ] **Step 1: Name the employer in `data/experience.ts`**

Replace:

```ts
    title: 'SQA Engineer',
    // The employer is deliberately not named anywhere on the site.
    company: 'Software company',
```

with:

```ts
    title: 'SQA Engineer',
    company: 'Avian BPO & IT',
```

- [ ] **Step 2: Create `components/ui/chips.tsx`**

```tsx
const Chips = ({ items, className = '' }: { items: readonly string[]; className?: string }) => (
  <ul className={`chips ${className}`}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)

export default Chips
```

- [ ] **Step 3: Rewrite `components/experience-section.tsx`**

```tsx
import { education, roles } from '@/data/experience'
import Chips from './ui/chips'
import SectionHeading from './ui/section-heading'
import styles from './experience-section.module.css'

const ExperienceSection = () => (
  <section id="experience" className="section">
    <SectionHeading
      index="02"
      kicker="Experience"
      title="Experience & education"
      subtitle="Where I practise quality engineering day to day, and where the engineering foundation came from."
    />
    <div className={styles.list}>
      {roles.map((role) => (
        <div key={`${role.company}-${role.title}`} className={styles.row} data-r>
          <div>
            <p className={styles.period}>{role.period}</p>
            {role.current && (
              <span className={styles.badge}>
                <span className="pulse" aria-hidden="true" />
                Current role
              </span>
            )}
          </div>
          <div>
            <h3 className={styles.title}>{role.title}</h3>
            <p className={styles.org}>
              {role.company} · {role.location}
            </p>
            <ul className={styles.highlights}>
              {role.highlights.map((highlight) => (
                <li key={highlight.title}>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.description}</p>
                </li>
              ))}
            </ul>
            <Chips items={role.tech} className={styles.chips} />
          </div>
        </div>
      ))}
      <div className={styles.row} data-r>
        <div>
          <p className={styles.period}>Education</p>
        </div>
        <div>
          <h3 className={styles.title}>{education.degree}</h3>
          <p className={styles.org}>
            {education.institution} · {education.location}
          </p>
          <p className={styles.coursework}>
            <b>Coursework</b>
            {education.coursework}
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default ExperienceSection
```

`components/experience-section.module.css`:

```css
.list {
  margin-top: 52px;
  border-top: 1px solid var(--line);
}

.row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  padding: 40px 0;
  border-bottom: 1px solid var(--line);
}

.period {
  font: 500 13px var(--mono);
  color: var(--tx2);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  padding: 4px 10px;
  border: 1px solid rgba(52, 211, 153, 0.2);
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.08);
  font: 500 11px var(--mono);
  color: var(--ac);
}

.title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.org {
  margin-top: 6px;
  font-size: 15px;
  color: var(--tx2);
}

.highlights {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 22px;
  margin-top: 30px;
}

.highlights h4 {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.highlights h4::before {
  content: '';
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ac);
  transform: translateY(-2px);
}

.highlights p {
  margin-top: 6px;
  padding-left: 16px;
  font-size: 14px;
  line-height: 1.62;
  color: var(--tx2);
}

.chips {
  margin-top: 28px;
}

.coursework {
  max-width: 720px;
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.62;
  color: var(--tx2);
}

.coursework b {
  margin-right: 8px;
  font: 500 12px var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

@media (min-width: 641px) {
  .title {
    font-size: 26px;
  }

  .highlights {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 40px;
  }
}

@media (min-width: 1101px) {
  .row {
    grid-template-columns: 240px minmax(0, 1fr);
    gap: 48px;
  }
}
```

- [ ] **Step 4: Verify**

Run `npm run type-check` and `npm run lint`. Expected: clean.

Visual check against the mockup Experience section:
- **Desktop:** the period and "● Current role" sit in the left column; the company reads "Avian BPO & IT · Dhaka,
  Bangladesh"; the highlights are in two columns, followed by the tool chips and the education row.
- **Phone:** everything stacks.

- [ ] **Step 5: Commit**

```bash
git add data/experience.ts components/ui/chips.tsx components/experience-section.tsx components/experience-section.module.css
git commit -m "Redesign Experience and name the employer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Skills section

**Files:**
- Modify: `components/skills-section.tsx` (full rewrite), create `components/skills-section.module.css`

- [ ] **Step 1: Rewrite `components/skills-section.tsx`**

```tsx
import { skillGroups } from '@/data/skills'
import { pad2 } from '@/lib/format'
import { vars } from '@/lib/style'
import SectionHeading from './ui/section-heading'
import styles from './skills-section.module.css'

const SkillsSection = () => (
  <section id="skills" className="section">
    <SectionHeading
      index="03"
      kicker="Skills"
      title="Skills & expertise"
      subtitle="The tools I test with, and the stack I build with. Testing and automation come first, because that is where I spend most of my day."
    />
    <div className={styles.grid}>
      {skillGroups.map((group, i) => (
        <div key={group.title} data-r style={vars({ '--d': i % 3 })}>
          <article className={`hv ${styles.card}`}>
            <div className={styles.top}>
              <span className={styles.number}>{pad2(i + 1)}</span>
              <span>
                {group.items.length} {group.primary ? 'tools' : 'skills'}
              </span>
            </div>
            <h3 className={styles.title}>{group.title}</h3>
            <p className={styles.summary}>{group.summary}</p>
            <ul className={styles.items}>
              {group.items.map((item, j) => (
                <li key={item} style={vars({ '--i': j })}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      ))}
    </div>
  </section>
)

export default SkillsSection
```

`components/skills-section.module.css`:

```css
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  margin-top: 36px;
}

.card {
  height: 100%;
  padding: 22px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: 12px var(--mono);
  color: var(--tx3);
}

.number {
  transition: color 0.45s;
}

.number::before {
  content: '(';
}

.number::after {
  content: ')';
}

.card:hover .number {
  color: var(--ac);
}

.title {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.summary {
  margin-top: 6px;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--tx2);
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 20px;
}

.items li {
  padding: 4px 9px;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.02);
  font: 12px/1.5 var(--mono);
  color: var(--tx2);
  transition: color 0.4s, border-color 0.4s, background-color 0.4s;
  transition-delay: calc(var(--i) * 25ms);
}

.card:hover .items li {
  border-color: var(--line2);
  background: rgba(255, 255, 255, 0.035);
  color: var(--tx);
}

@media (min-width: 641px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 52px;
  }

  .card {
    padding: 26px;
  }
}

@media (min-width: 1101px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

- [ ] **Step 2: Verify**

Run `npm run type-check` and `npm run lint`. Expected: clean.

Visual check: 9 cards (3 columns on desktop, 2 on tablet, 1 on phone). On hover:
- a green rule draws across the top
- the title moves right
- the "(01)" number turns green
- the chips brighten one after another
- the card does not lift

- [ ] **Step 3: Commit**

```bash
git add components/skills-section.tsx components/skills-section.module.css
git commit -m "Redesign Skills with the rule hover from direction B

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Projects: data, pinned rails, cards and case-study panel

**Files:**
- Modify: `data/work.ts` (full rewrite)
- Create: `components/projects-section.tsx`, `components/projects-section.module.css`
- Create: `components/projects/project-rails.tsx`, `project-rail.tsx`, `project-rail.module.css`,
  `project-card.tsx`, `project-card.module.css`, `case-study-panel.tsx`, `case-study-panel.module.css`,
  `lock-icon.tsx` (all in `components/projects/`)
- Modify: `app/page.tsx` (`WorkSection` → `ProjectsSection`)
- Delete: `components/work-section.tsx`, `components/work/` (untracked files from earlier work)

**Interfaces:**
- Produces: `WorkItem`, `CaseStudy`, `Rail`, `work`, `companyWork`, `personalWork`, `rails`, `projectRepoNames`.
- Produces: markup hooks used by Task 11. The rail root has `data-rail` and `data-kind`; `data-tier` (space-separated
  `compact tight free`) is set at runtime. The first child of the root is the pin. The rail header has
  `data-rail-head`, the footer `data-rail-foot`, project cards `data-card`, the end card `data-end`. The case panel
  heading has `id="case-title"`.

- [ ] **Step 1: Rewrite `data/work.ts`**

```ts
import { site } from './site'

export type CaseStudy = {
  platforms: string
  focus: string
  /** Text inside backticks is shown as code. */
  points: { title: string; text: string }[]
}

export type WorkItem = {
  id: string
  /** Sets the tag: QA work ("QA case study" / "QA project") or development work ("Dev project"). */
  kind: 'qa' | 'dev'
  title: string
  context: string
  summary: string
  tech: string[]
  github?: string
  /** Company work: it goes in the company rail and is never linked. */
  confidential?: boolean
  /** The wide first card in the company rail. */
  featured?: boolean
  /** Only used by the featured card. */
  checklist?: { status: 'pass' | 'fail'; text: string; note?: string }[]
  /** Opens the case-study side panel. */
  caseStudy?: CaseStudy
  status?: 'in-progress'
}

export const work: WorkItem[] = [
  {
    id: 'password-manager',
    kind: 'qa',
    title: 'Secure Cloud Password Manager',
    context: 'Android · Web vault · Chromium & Firefox extensions',
    summary:
      'Security QA across zero-knowledge encryption, MFA and cross-platform sync. I found a critical session defect: changing the master password ended the local session but left active JWTs valid on secondary devices, which drove a centralised token revocation mechanism on the backend.',
    tech: ['Playwright', 'JWT', 'MFA', 'Android BiometricPrompt', 'Chromium & Firefox'],
    confidential: true,
    featured: true,
    checklist: [
      { status: 'pass', text: 'zero-knowledge handshake and local vault decryption' },
      { status: 'pass', text: 'master-password hashing and MFA flows' },
      { status: 'pass', text: 'autofill, vault lock and session timeout on both engines' },
      { status: 'pass', text: 'biometric unlock, screenshot blocking, clipboard auto-clear' },
      { status: 'fail', text: 'stale JWT on other devices after password change', note: 'reported → fixed' },
    ],
    caseStudy: {
      platforms: 'Android · Web vault · Chromium & Firefox extensions',
      focus: 'Zero-knowledge architecture, client-side cryptography, cross-platform sync',
      points: [
        {
          title: 'Cryptographic and auth flows',
          text: 'Formulated test matrices for zero-knowledge encryption handshakes, master-password hashing, multi-factor authentication and secure vault decryption on local client runtimes.',
        },
        {
          title: 'Browser extension automation',
          text: 'Automated credential autofill, vault state locking and session-timeout lifecycles across Chromium and Firefox engines using Playwright.',
        },
        {
          title: 'Android client security',
          text: 'Tested Android BiometricPrompt integration, background lock triggers, screenshot protection and automatic clipboard clearing after secrets are copied.',
        },
        {
          title: 'Session revocation defect',
          text: 'Discovered that changing the master password ended the local session but left active JWTs valid on secondary devices — which drove a centralised token revocation mechanism on the backend.',
        },
      ],
    },
  },
  {
    id: 'vmp-messenger',
    kind: 'qa',
    title: 'VMP Messenger',
    context: 'Android · iOS · Responsive web',
    summary:
      'Social platform with real-time chat. I verified WebSocket message states (sent → delivered → read), delivery receipts and sequence ordering, then simulated packet loss to confirm queued messages resend on reconnect without duplicates or reordering. Also covered infinite-scroll feeds under concurrency, chunked media uploads on 2G/3G, and push delivery through FCM and APNs.',
    tech: ['WebSockets', 'Playwright', 'Chrome DevTools', 'FCM / APNs', 'Network throttling'],
    confidential: true,
    caseStudy: {
      platforms: 'Android · iOS · Responsive web',
      focus: 'Real-time WebSockets, high-concurrency feeds, media processing pipelines',
      points: [
        {
          title: 'WebSocket events',
          text: 'Designed verification matrices for message states (Sent → Delivered → Read), delivery receipts, typing indicators and sequence ordering.',
        },
        {
          title: 'Offline queue and reconnect',
          text: 'Simulated packet loss and offline states to confirm queued messages sent on reconnect with no duplicates or reordering.',
        },
        {
          title: 'Feeds under concurrency',
          text: 'Validated infinite-scroll cursor pagination, concurrent posts, reactions, nested comments and real-time feed updates under heavy traffic.',
        },
        {
          title: 'Chunked media uploads',
          text: 'Tested multipart chunked uploads and compression for images, video and audio notes on throttled 2G/3G networks.',
        },
        {
          title: 'Push notifications',
          text: 'Validated background payloads, badge counts and deep-link routing through FCM and APNs.',
        },
      ],
    },
  },
  {
    id: 'vpn-platform',
    kind: 'qa',
    title: 'Cross-Platform VPN',
    context: 'iOS · Android · Browser extension',
    summary:
      'Low-level network failsafe testing: kill-switch activation on abrupt disconnects with zero plaintext IP or DNS leaks, tunnel stability across Wi-Fi to mobile-data handovers and wake-from-sleep, plus WebRTC leak prevention and PAC script execution in the extension. My A/B funnel validation supported a measured 1.2% uplift in referrals.',
    tech: ['Kill-switch testing', 'DNS / IP leak checks', 'WebRTC', 'PAC scripts', 'A/B validation'],
    confidential: true,
    caseStudy: {
      platforms: 'iOS · Android · Chrome & Firefox extension',
      focus: 'Low-level network failsafes, tunnelling protocols, leak prevention',
      points: [
        {
          title: 'Kill-switch and failsafes',
          text: 'Built edge-case suites for kill-switch activation on abrupt connection drops, confirming zero plaintext IP or DNS leaks.',
        },
        {
          title: 'Network transitions',
          text: 'Monitored tunnel stability and reconnects across Wi-Fi ↔ mobile-data switches, wake-from-sleep and high-latency mobile conditions.',
        },
        {
          title: 'Extension proxying',
          text: 'Tested proxy routing, WebRTC leak prevention and PAC script execution inside the browser extensions.',
        },
        {
          title: 'A/B experimentation',
          text: 'Validated onboarding funnels and routing logic across client variants, supporting a measured 1.2% uplift in referrals.',
        },
      ],
    },
  },
  {
    id: 'authenticator-app',
    kind: 'qa',
    title: 'Two-Factor Authenticator App',
    context: 'iOS · Android',
    summary:
      'Verified 6-digit TOTP generation against RFC 6238 across SHA-1 and SHA-256, including clock-drift tolerance inside the ±30 second step window. Covered QR and manual key ingestion with malformed otpauth:// secrets, confirmed seeds were held in Android KeyStore and iOS Keychain rather than extractable storage, and enforced biometric app lock on resume.',
    tech: ['TOTP (RFC 6238)', 'Android KeyStore', 'iOS Keychain', 'Biometrics', 'QR parsing'],
    confidential: true,
    caseStudy: {
      platforms: 'iOS · Android',
      focus: 'RFC 6238 TOTP, device clock drift, encrypted storage',
      points: [
        { title: 'TOTP compliance', text: 'Validated 6-digit code generation against RFC 6238 across SHA-1 and SHA-256.' },
        {
          title: 'Clock-drift tolerance',
          text: 'Tested device clock desynchronisation, confirming codes stayed valid inside the ±30-second step window.',
        },
        {
          title: 'QR and secret ingestion',
          text: 'Validated camera and manual key entry, `otpauth://totp/…` URI parsing and handling of malformed secrets.',
        },
        {
          title: 'Encrypted storage',
          text: 'Verified secret seeds lived in Android KeyStore and iOS Keychain, safe from root or backup extraction.',
        },
        { title: 'Biometric lock', text: 'Tested biometric app-lock on every background-to-foreground switch.' },
      ],
    },
  },
  {
    id: 'project-management',
    kind: 'qa',
    title: 'Project Management Platform',
    context: 'Web application',
    summary:
      'In-house Kanban and Scrum tooling. I mapped the task lifecycle as a state machine (Backlog → In Progress → In Review → Done) and proved invalid transitions were rejected, validated permission matrices across Admin, Project Manager, Team Lead and Contributor, and checked concurrent board edits for race conditions and stale state.',
    tech: ['RBAC matrices', 'State transition testing', 'Real-time sync', 'File upload QA'],
    confidential: true,
    caseStudy: {
      platforms: 'Web application',
      focus: 'Kanban / Scrum state machines, real-time updates, role-based access control',
      points: [
        {
          title: 'Workflow state machine',
          text: 'Mapped and verified sprint-board and task lifecycles (Backlog → In Progress → In Review → Done) and automated status triggers, confirming invalid transitions were rejected.',
        },
        {
          title: 'Granular RBAC',
          text: 'Validated permission matrices across Admin, Project Manager, Team Lead and Contributor, holding strict boundaries around assignments, budget views and project configuration.',
        },
        {
          title: 'Real-time consistency',
          text: 'Verified concurrent edits on live sprint boards so simultaneous updates never produced race conditions or stale board state.',
        },
        {
          title: 'Attachment pipelines',
          text: 'Tested multipart uploads, size thresholds and file-type restrictions for safe file handling and correct database association.',
        },
      ],
    },
  },
  {
    id: 'hr-payroll',
    kind: 'qa',
    title: 'HR & Payroll Platform',
    context: 'Web application',
    summary:
      'Financial-precision testing on payroll: boundary value analysis and equivalence partitioning over gross pay, tax deductions, unpaid leave and prorated salaries with no floating-point drift. I also verified multi-tier approval hierarchies against self-approval and bypass attempts, and wrote SQL to confirm every change wrote an immutable audit row.',
    tech: ['BVA / EP', 'PostgreSQL', 'SQL audit queries', 'Approval workflows'],
    confidential: true,
    caseStudy: {
      platforms: 'Web application',
      focus: 'Financial calculation precision, approval hierarchies, audit-trail logging',
      points: [
        {
          title: 'Payroll engine',
          text: 'Applied boundary value analysis and equivalence partitioning to gross pay, tax deductions, unpaid leave and prorated salaries, with no floating-point precision loss.',
        },
        {
          title: 'Multi-tier approvals',
          text: 'Validated approval and escalation chains for leave, expense claims and appraisals, blocking unauthorised bypasses and self-approval.',
        },
        {
          title: 'Audit logging',
          text: 'Wrote SQL to confirm every salary change, bonus and profile edit created an immutable audit row with `user_id`, `old_value`, `new_value` and `timestamp`.',
        },
        {
          title: 'Database constraints',
          text: 'Verified referential integrity across employee, salary and department tables in PostgreSQL during offboarding and restructuring.',
        },
      ],
    },
  },
  {
    id: 'marketing-web',
    kind: 'qa',
    title: 'Marketing & Product Websites',
    context: 'Responsive web · Customer portals',
    summary:
      'Cross-browser and visual regression audits across Chromium, Safari, Firefox and real mobile devices, Core Web Vitals checks (LCP, CLS, FID) on landing pages, lead and newsletter forms probed with XSS and SQL injection payloads, and analytics beacons inspected to confirm conversion and CTA events fired correctly.',
    tech: ['Cross-browser QA', 'Core Web Vitals', 'XSS / SQLi checks', 'Analytics verification'],
    confidential: true,
    caseStudy: {
      platforms: 'Company website · VMPPass website · Portals',
      focus: 'Cross-browser compatibility, performance, form validation, telemetry',
      points: [
        {
          title: 'Responsive and cross-browser',
          text: 'Ran functional and visual regression audits across Chromium, Safari, Firefox and mobile viewports, in DevTools device mode and on real devices.',
        },
        { title: 'Core Web Vitals', text: 'Audited landing pages for asset weight, script bottlenecks and LCP, CLS and FID.' },
        {
          title: 'Form security',
          text: 'Probed lead, contact and newsletter forms with XSS and SQL-injection payloads to confirm strict sanitisation and validation messages.',
        },
        {
          title: 'Analytics and tags',
          text: 'Inspected network beacons to confirm conversion goals, CTA clicks and page views fired correctly.',
        },
      ],
    },
  },
  {
    id: 'fullstack-ecommerce',
    kind: 'dev',
    status: 'in-progress',
    title: 'Full-Stack E-Commerce Platform',
    context: 'NestJS · Next.js · PostgreSQL',
    summary:
      'The project I am building now: a NestJS API on PostgreSQL through Prisma, with a Next.js storefront on top. The repository goes public once it is complete.',
    tech: ['NestJS', 'Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
  },
  {
    id: 'api-test-framework',
    kind: 'qa',
    title: 'Automated REST API Testing Framework',
    context: 'Personal project',
    summary:
      'A headless API regression framework in TypeScript with Postman and Newman: multi-tier CRUD lifecycles, auth headers and rate-limit behaviour, with JSON Schema validation on every response and HTML reports for gating staging deploys.',
    tech: ['TypeScript', 'Postman', 'Newman', 'JSON Schema', 'CLI reporting'],
  },
  {
    id: 'headless-ecommerce',
    kind: 'dev',
    title: 'Headless E-Commerce API',
    context: 'Node.js · TypeScript',
    summary:
      'A headless commerce backend with a multi-variant product catalogue, token-based guest carts, a promotions engine and a full order workflow, using MongoDB aggregation pipelines for reporting.',
    tech: ['Express.js', 'MongoDB', 'Mongoose', 'Zod', 'Swagger', 'Jest'],
    github: 'https://github.com/MH-Mubin/headless-e-commerce',
  },
  {
    id: 'school-management',
    kind: 'dev',
    title: 'School Management API',
    context: 'Express · PostgreSQL',
    summary:
      'School administration API with JWT authentication and role-based access for Admin, Teacher and Student, covering student records and class enrolment on PostgreSQL with Drizzle ORM.',
    tech: ['TypeScript', 'Express.js', 'PostgreSQL', 'Drizzle ORM', 'Docker'],
    github: 'https://github.com/MH-Mubin/school-management',
  },
  {
    id: 'bookmark-application',
    kind: 'dev',
    title: 'Bookmark API',
    context: 'NestJS · Prisma',
    summary:
      'A NestJS bookmark manager with signup/signin, Prisma data access and an end-to-end test suite in Pactum running against a Dockerised database.',
    tech: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Pactum'],
    github: 'https://github.com/MH-Mubin/bookmark-application',
  },
  {
    id: 'breathing-app',
    kind: 'dev',
    title: 'Breathing & Meditation App',
    context: 'React · Node.js',
    summary:
      'A full-stack MERN app with curved-path SVG breathing animations, multiple breathing patterns, session tracking, streaks and achievements behind JWT auth.',
    tech: ['React', 'Vite', 'Framer Motion', 'Express.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/MH-Mubin/breathing-app',
  },
  {
    id: 'inventory-management',
    kind: 'dev',
    title: 'Inventory Management System',
    context: 'Node.js · MongoDB',
    summary:
      'Inventory and sales backend covering stock tracking, purchase and sales transactions, returns with data integrity, supplier and customer records, and reporting.',
    tech: ['Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Nodemailer', 'Helmet'],
    github: 'https://github.com/MH-Mubin/Inventory-Management',
  },
  {
    id: 'task-manager',
    kind: 'dev',
    title: 'Task Manager API',
    context: 'Node.js · MongoDB',
    summary:
      'Task management backend with email-based JWT authentication, OTP verification through Nodemailer, password reset and protected CRUD routes.',
    tech: ['Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Nodemailer', 'CORS'],
    github: 'https://github.com/MH-Mubin/Task-Manager',
  },
]

/** Company case studies (SQA expertise) and personal projects (development expertise), one rail each. */
export const companyWork = work.filter((item) => item.confidential)
export const personalWork = work.filter((item) => !item.confidential)

export type Rail = {
  kind: 'company' | 'personal'
  eyebrow: string
  title: string
  subtitle: string
  /** The dashed card at the end of the rail. */
  end: { title: string; text: string; cta: string; href: string }
}

export const rails: Rail[] = [
  {
    kind: 'company',
    eyebrow: 'Company work · SQA expertise',
    title: 'Quality engineering on production platforms',
    subtitle: 'Case studies from the platforms I test at work, described without internal details, code or screenshots.',
    end: {
      title: 'Want the detail behind these?',
      text: 'I can walk you through the test strategy and the defects I caught in an interview.',
      cta: 'Get in touch',
      href: '#contact',
    },
  },
  {
    kind: 'personal',
    eyebrow: 'Personal projects · Development expertise',
    title: 'Backends and apps I built end to end',
    subtitle:
      'Open-source work that shows the developer side, and why I read the payload and the database row, not just the screen.',
    end: {
      title: 'More on GitHub',
      text: 'All public repositories, with full commit history.',
      cta: 'github.com/MH-Mubin',
      href: site.github.url,
    },
  },
]

/** Repository names behind the projects above, used to pick which repos the GitHub section shows. */
export const projectRepoNames = work
  .map((item) => item.github?.split('/').pop())
  .filter((name): name is string => Boolean(name))
```

- [ ] **Step 2: Create `components/projects/lock-icon.tsx`**

```tsx
const LockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

export default LockIcon
```

- [ ] **Step 3: Create `components/projects/project-card.tsx`**

```tsx
import type { Rail, WorkItem } from '@/data/work'
import Chips from '../ui/chips'
import LockIcon from './lock-icon'
import styles from './project-card.module.css'

const tagFor = (item: WorkItem) =>
  item.kind === 'dev' ? 'Dev project' : item.confidential ? 'QA case study' : 'QA project'

const ProjectCard = ({ item, onOpenCase }: { item: WorkItem; onOpenCase: (id: string) => void }) => {
  const repo = item.github?.split('/').slice(-2).join('/')
  return (
    <article
      className={`spot ${styles.card} ${item.featured ? styles.featured : ''}`}
      data-card
      data-kind={item.kind}
    >
      <div className={styles.top}>
        <span className={styles.tag}>{tagFor(item)}</span>
        {item.confidential ? (
          <span className={styles.meta}>
            <LockIcon />
            Confidential
          </span>
        ) : item.status === 'in-progress' ? (
          <span className={styles.wip}>
            <span className="pulse" aria-hidden="true" />
            In progress
          </span>
        ) : repo ? (
          <span className={styles.meta}>{repo}</span>
        ) : null}
      </div>
      <h4 className={styles.title}>{item.title}</h4>
      <p className={styles.context}>{item.context}</p>
      <p className={styles.summary}>{item.summary}</p>
      {item.checklist && (
        <ul className={styles.checks}>
          {item.checklist.map((check) => (
            <li key={check.text} data-status={check.status}>
              <i aria-hidden="true">{check.status === 'pass' ? '✓' : '✗'}</i>
              <span>
                {check.text}
                {check.note && <em>{check.note}</em>}
              </span>
            </li>
          ))}
        </ul>
      )}
      <Chips items={item.tech} className={styles.chips} />
      <div className={styles.foot}>
        {item.caseStudy ? (
          <button type="button" className={styles.read} onClick={() => onOpenCase(item.id)}>
            Read case study{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </button>
        ) : item.github ? (
          <a href={item.github} target="_blank" rel="noopener noreferrer">
            View code{' '}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          <span>{item.status === 'in-progress' ? 'Repository goes public on completion' : 'Repository not public yet'}</span>
        )}
      </div>
    </article>
  )
}

export const EndCard = ({ end }: { end: Rail['end'] }) => {
  const external = end.href.startsWith('http')
  return (
    <a
      className={`spot ${styles.card} ${styles.end}`}
      href={end.href}
      data-end
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div>
        <h4>{end.title}</h4>
        <p>{end.text}</p>
      </div>
      <span className={styles.go}>
        {end.cta}{' '}
        <span className="arr" aria-hidden="true">
          →
        </span>
      </span>
    </a>
  )
}

export default ProjectCard
```

`components/projects/project-card.module.css`:

```css
.card {
  display: flex;
  flex-direction: column;
  flex: none;
  width: calc(100vw - 2 * var(--pad) - 20px);
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--s1);
  transition: transform 0.45s var(--e), border-color 0.45s, background-color 0.45s;
}

/* stretch keeps every card at the tallest card's height; children must never shrink */
.card > * {
  flex-shrink: 0;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--line2);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font: 500 11.5px var(--mono);
  color: var(--tx2);
}

.tag::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ac);
}

.card[data-kind='dev'] .tag::before {
  background: var(--dev);
}

.meta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: 11.5px var(--mono);
  color: var(--tx3);
}

.wip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 3px 9px;
  border: 1px solid rgba(251, 191, 36, 0.22);
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.08);
  font: 500 11px var(--mono);
  color: var(--warn);
}

.wip :global(.pulse) {
  width: 6px;
  height: 6px;
}

.title {
  margin-top: 18px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.context {
  margin-top: 6px;
  font: 12px var(--mono);
  color: var(--tx3);
}

.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  margin-top: 16px;
  font-size: 13.5px;
  line-height: 1.62;
  color: var(--tx2);
}

.featured .summary {
  -webkit-line-clamp: 3;
}

.checks {
  display: grid;
  gap: 5px;
  margin-top: 16px;
  font: 11.5px/1.5 var(--mono);
  color: var(--tx2);
}

.checks li {
  display: flex;
  gap: 10px;
}

/* phones show only the defect the case study is known for */
.checks li[data-status='pass'] {
  display: none;
}

.checks i {
  font-style: normal;
  color: var(--ac);
}

.checks li[data-status='fail'] i {
  color: #f87171;
}

.checks em {
  display: block;
  font-style: normal;
  color: var(--warn);
}

.chips {
  margin-top: auto;
  padding-top: 18px;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 13px;
  color: var(--tx3);
}

.foot a,
.read {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-weight: 500;
  color: var(--tx);
}

.read {
  font-size: 13px;
}

.card:hover .foot a :global(.arr) {
  transform: translate(2px, -2px);
}

.card:hover .read :global(.arr),
.end:hover .go :global(.arr) {
  transform: translateX(4px);
}

.end {
  justify-content: space-between;
  border-style: dashed;
  background: transparent;
}

.end h4 {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.end p {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--tx2);
}

.go {
  font-weight: 500;
}

@media (min-width: 641px) {
  .card {
    width: 380px;
    padding: 26px;
  }

  .featured {
    width: 600px;
  }

  .end {
    width: 320px;
  }

  .title {
    margin-top: 22px;
    font-size: 22px;
  }

  .summary {
    -webkit-line-clamp: 6;
    font-size: 14px;
  }

  .featured .summary {
    -webkit-line-clamp: 3;
  }

  .checks {
    gap: 7px;
    font-size: 12.5px;
  }

  .checks li[data-status='pass'] {
    display: flex;
  }

  .checks em {
    display: inline;
    margin-left: 8px;
    white-space: nowrap;
  }
}

/* fit tiers, set on the rail by project-rail.tsx when the cards would not fit the screen height */
:global([data-tier~='compact']) .card {
  padding: 20px;
}

:global([data-tier~='compact']) .title {
  margin-top: 14px;
  font-size: 20px;
}

:global([data-tier~='compact']) .summary {
  -webkit-line-clamp: 3;
  margin-top: 10px;
}

:global([data-tier~='compact']) .checks li[data-status='pass'] {
  display: none;
}

:global([data-tier~='compact']) .chips {
  max-height: 68px;
  overflow: hidden;
  padding-top: 14px;
}

:global([data-tier~='compact']) .foot {
  margin-top: 12px;
  padding-top: 12px;
}

:global([data-tier~='tight']) .context {
  display: none;
}

:global([data-tier~='tight']) .title {
  margin-top: 10px;
}

:global([data-tier~='tight']) .summary {
  -webkit-line-clamp: 2;
}

:global([data-tier~='tight']) .checks {
  margin-top: 10px;
}

:global([data-tier~='tight']) .chips {
  max-height: 40px;
  padding-top: 12px;
}

:global([data-tier~='free']) .card {
  scroll-snap-align: start;
  scroll-margin-left: var(--pad);
}
```

- [ ] **Step 4: Create `components/projects/project-rail.tsx`** (the engine, spec §5)

```tsx
'use client'

import { memo, useEffect, useRef } from 'react'
import type { Rail, WorkItem } from '@/data/work'
import { pad2 } from '@/lib/format'
import ProjectCard, { EndCard } from './project-card'
import styles from './project-rail.module.css'

/** Time constant of the easing that lets the rail glide after the scroll position (ms). */
const EASE_MS = 85
const TIERS = ['compact', 'tight', 'free']

type ProjectRailProps = { rail: Rail; items: WorkItem[]; onOpenCase: (id: string) => void }

/**
 * A pinned horizontal rail: while its section is pinned, vertical scrolling moves the cards sideways. The cards sit
 * in the middle row of a full-height grid, so they stay centred in the area below the top bar.
 */
const ProjectRail = ({ rail, items, onOpenCase }: ProjectRailProps) => {
  const railRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const footRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = railRef.current
    const pin = pinRef.current
    const sticky = stickyRef.current
    const head = headRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    const foot = footRef.current
    const bar = barRef.current
    const count = countRef.current
    if (!root || !pin || !sticky || !head || !viewport || !track || !foot || !bar || !count) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'))
    let alive = true
    let max = 0
    let padLeft = 0
    let navHeight = 0
    let stops: number[] = []
    let current = 0
    let last = -1
    let frame = 0
    let running = false
    let lastTime = 0
    let viewWidth = 0
    let viewHeight = 0

    const isFree = () => (root.dataset.tier ?? '').split(' ').includes('free')
    const scrollTarget = () => Math.min(max, Math.max(0, navHeight - pin.getBoundingClientRect().top))

    const showProgress = (x: number) => {
      bar.style.transform = `scaleX(${max ? x / max : 0})`
      let index = 0
      stops.forEach((stop, i) => {
        if (stop <= x + 60) index = i
      })
      if (x >= max - 2) index = cards.length - 1
      count.textContent = pad2(index + 1)
    }

    // If the cards would not fit between the heading and the progress bar, tighten them step by step,
    // and finally fall back to a plain swipe rail, so nothing is ever clipped.
    const layout = () => {
      viewWidth = window.innerWidth
      viewHeight = window.innerHeight
      navHeight = document.getElementById('site-nav')?.offsetHeight ?? 0
      root.dataset.tier = ''
      pin.style.height = ''
      const fits = () => track.offsetHeight + 2 * Math.max(head.offsetHeight, foot.offsetHeight) <= sticky.clientHeight
      const applied: string[] = []
      for (const tier of TIERS) {
        if (!reduced && fits()) break
        applied.push(tier)
        root.dataset.tier = applied.join(' ')
      }
      padLeft = parseFloat(getComputedStyle(track).paddingLeft)
      stops = cards.map((card) => card.offsetLeft - padLeft)
      max = Math.max(0, track.scrollWidth - viewport.clientWidth)
      if (isFree()) {
        track.style.transform = ''
        showProgress(viewport.scrollLeft)
      } else {
        pin.style.height = `${max + sticky.offsetHeight}px`
        current = scrollTarget()
        last = -1
      }
    }

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick)
      const dt = lastTime ? Math.min(64, time - lastTime) : 0
      lastTime = time
      if (isFree() || !max) return
      const target = scrollTarget()
      current += (target - current) * (1 - Math.exp(-dt / EASE_MS))
      if (Math.abs(target - current) < 0.1) current = target
      if (current === last) return
      track.style.transform = `translate3d(${(-current).toFixed(2)}px, 0, 0)`
      showProgress(current)
      last = current
    }

    // Run the frame loop only while the rail is on screen. Arriving from below, or by a link, starts where the
    // scroll position already is instead of sliding across the whole rail.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        lastTime = 0
        current = scrollTarget()
        last = -1
        frame = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(frame)
      }
    })

    // Mobile URL-bar changes only nudge the height; re-layout for real size changes (rotation, window resize).
    const onResize = () => {
      if (window.innerWidth !== viewWidth || Math.abs(window.innerHeight - viewHeight) > 100) layout()
    }
    const onViewportScroll = () => {
      if (isFree()) showProgress(viewport.scrollLeft)
      // Focus can scroll even a hidden-overflow box; while pinned only the transform may move the cards.
      else if (viewport.scrollLeft) viewport.scrollLeft = 0
    }
    // Keyboard users: tabbing to a card that is off screen scrolls the page to the point where it is in view.
    // Cards already on screen are left alone, so focus returning from a closed panel never moves the page.
    const onFocus = (event: FocusEvent) => {
      if (isFree()) return
      const card = (event.target as Element).closest<HTMLElement>('[data-card], [data-end]')
      if (!card) return
      const box = card.getBoundingClientRect()
      if (box.left >= 0 && box.right <= window.innerWidth) return
      const pinTop = pin.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: pinTop - navHeight + Math.min(max, card.offsetLeft - padLeft), behavior: 'instant' })
    }

    layout()
    document.fonts?.ready.then(() => {
      if (alive) layout()
    })
    window.addEventListener('resize', onResize)
    viewport.addEventListener('scroll', onViewportScroll, { passive: true })
    track.addEventListener('focusin', onFocus)
    visibility.observe(root)

    return () => {
      alive = false
      visibility.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      viewport.removeEventListener('scroll', onViewportScroll)
      track.removeEventListener('focusin', onFocus)
    }
  }, [])

  const titleId = `${rail.kind}-rail-title`

  return (
    <div ref={railRef} className={styles.rail} data-rail data-kind={rail.kind} role="region" aria-labelledby={titleId}>
      <div ref={pinRef}>
        <div ref={stickyRef} className={styles.sticky}>
          <div ref={headRef} className={styles.head} data-rail-head>
            <p className={styles.eyebrow}>{rail.eyebrow}</p>
            <h3 id={titleId} className={styles.title}>
              {rail.title}
            </h3>
            <p className={styles.subtitle}>{rail.subtitle}</p>
          </div>
          <div ref={viewportRef} className={styles.viewport}>
            <div ref={trackRef} className={styles.track}>
              {items.map((item) => (
                <ProjectCard key={item.id} item={item} onOpenCase={onOpenCase} />
              ))}
              <EndCard end={rail.end} />
            </div>
          </div>
          <div ref={footRef} className={styles.foot} data-rail-foot>
            <div className={styles.progress} aria-hidden="true">
              <i ref={barRef} />
            </div>
            <span className={styles.count}>
              <b ref={countRef}>01</b> / {pad2(items.length)}
            </span>
            <p className={styles.hint}>
              <span className={styles.hintPinned}>Keep scrolling — cards move sideways</span>
              <span className={styles.hintFree}>Swipe to see more →</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProjectRail)
```

`components/projects/project-rail.module.css`:

```css
.rail {
  position: relative;
}

.sticky {
  position: sticky;
  top: var(--navH);
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
  height: calc(100vh - var(--navH));
  height: calc(100svh - var(--navH));
  overflow: hidden;
}

.head {
  align-self: end;
  padding: 12px var(--gutter) 16px;
}

.eyebrow {
  font: 500 11px var(--mono);
  color: var(--ac);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.rail[data-kind='personal'] .eyebrow {
  color: var(--dev);
}

.title {
  margin-top: 10px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.subtitle {
  display: none;
  max-width: 620px;
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--tx2);
}

.viewport {
  overflow: hidden;
}

.track {
  display: flex;
  align-items: stretch;
  gap: 12px;
  width: max-content;
  padding: 6px var(--gutter);
  will-change: transform;
}

.foot {
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  padding: 16px var(--gutter) 0;
}

.progress {
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: var(--line);
  overflow: hidden;
}

.progress i {
  display: block;
  height: 100%;
  background: var(--ac);
  transform: scaleX(0);
  transform-origin: left;
}

.rail[data-kind='personal'] .progress i {
  background: var(--dev);
}

.count {
  min-width: 58px;
  text-align: right;
  font: 500 12px var(--mono);
  color: var(--tx3);
}

.count b {
  font-weight: 500;
  color: var(--tx);
}

.hint {
  flex-basis: 100%;
  font: 12px var(--mono);
  color: var(--tx3);
}

.hintFree {
  display: none;
}

@media (min-width: 641px) {
  .head {
    padding: 16px var(--gutter) 24px;
  }

  .eyebrow {
    font-size: 12px;
  }

  .title {
    font-size: 30px;
  }

  .track {
    gap: 20px;
  }

  .foot {
    padding-top: 22px;
  }

  .progress {
    flex: none;
    width: 160px;
  }

  .hint {
    flex-basis: auto;
    margin-left: auto;
  }
}

@media (min-width: 1101px) {
  .subtitle {
    display: block;
  }
}

/* fit tiers (see project-rail.tsx) */
.rail[data-tier~='compact'] .subtitle {
  display: none;
}

.rail[data-tier~='compact'] .head {
  padding-bottom: 16px;
}

.rail[data-tier~='compact'] .foot {
  padding-top: 16px;
}

.rail[data-tier~='tight'] .head {
  padding-top: 8px;
  padding-bottom: 14px;
}

.rail[data-tier~='tight'] .foot {
  padding-top: 12px;
}

.rail[data-tier~='tight'] .hint {
  display: none;
}

/* too short even for tight (e.g. a phone held sideways): a plain swipe rail, nothing pinned or clipped */
.rail[data-tier~='free'] .sticky {
  position: static;
  display: block;
  height: auto;
  padding: 24px 0;
}

.rail[data-tier~='free'] .viewport {
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}

.rail[data-tier~='free'] .viewport::-webkit-scrollbar {
  display: none;
}

.rail[data-tier~='free'] .track {
  transform: none !important;
}

.rail[data-tier~='free'] .hint {
  display: block;
}

.rail[data-tier~='free'] .hintPinned {
  display: none;
}

.rail[data-tier~='free'] .hintFree {
  display: inline;
}
```

- [ ] **Step 5: Create `components/projects/case-study-panel.tsx`**

```tsx
'use client'

import { useRef, type MouseEvent } from 'react'
import type { WorkItem } from '@/data/work'
import { pad2 } from '@/lib/format'
import { scrollToSection } from '@/lib/scroll'
import { vars } from '@/lib/style'
import Chips from '../ui/chips'
import SidePanel, { CloseButton } from '../ui/side-panel'
import LockIcon from './lock-icon'
import styles from './case-study-panel.module.css'

/** Renders `backtick` spans as <code>. */
const withCode = (text: string) => text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))

const CaseStudyPanel = ({ item, onClose }: { item: WorkItem | null; onClose: () => void }) => {
  // Keep showing the last case study while the panel slides out.
  const lastItem = useRef<WorkItem | null>(null)
  if (item) lastItem.current = item
  const shown = item ?? lastItem.current
  const study = shown?.caseStudy

  const contact = (event: MouseEvent) => {
    event.preventDefault()
    onClose()
    scrollToSection('contact')
  }

  return (
    <SidePanel open={Boolean(item)} onClose={onClose} size="case" labelledBy="case-title">
      {shown && study && (
        <>
          <div className={styles.head}>
            <span className={styles.tag}>QA case study</span>
            <CloseButton onClick={onClose} label="Close case study" initialFocus />
          </div>
          <div className={`${styles.body} ${item ? styles.shown : ''}`}>
            <h2 id="case-title" className={styles.title}>
              {shown.title}
            </h2>
            <p className={styles.confidential}>
              <LockIcon />
              Company project · described without internal details
            </p>
            <dl className={styles.facts}>
              <div>
                <dt>Platforms</dt>
                <dd>{study.platforms}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{study.focus}</dd>
              </div>
            </dl>
            <ol className={styles.points}>
              {study.points.map((point, i) => (
                <li key={point.title} style={vars({ '--i': i })}>
                  <span className={styles.number}>{pad2(i + 1)}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{withCode(point.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Chips items={shown.tech} className={styles.chips} />
            <div className={styles.cta}>
              <span>Happy to go deeper on this in an interview.</span>
              <a className="btn btn-pri" href="#contact" onClick={contact}>
                Get in touch{' '}
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </>
      )}
    </SidePanel>
  )
}

export default CaseStudyPanel
```

`components/projects/case-study-panel.module.css`:

```css
.head {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: var(--navH);
  padding: 0 var(--pad);
  border-bottom: 1px solid var(--line);
  background: rgba(12, 12, 15, 0.9);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 12px var(--mono);
  color: var(--tx2);
}

.tag::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ac);
}

.body {
  padding: 28px var(--pad) 48px;
}

.title {
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.confidential {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  font: 12px var(--mono);
  color: var(--tx3);
}

.facts {
  margin-top: 26px;
  border-top: 1px solid var(--line);
}

.facts div {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 4px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
  font-size: 14.5px;
  line-height: 1.5;
}

.facts dt {
  font: 500 11.5px/1.9 var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.points {
  display: grid;
  gap: 26px;
  margin-top: 32px;
}

.points li {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 8px;
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 0.5s var(--e), transform 0.7s var(--e);
}

.shown .points li {
  opacity: 1;
  transform: none;
  transition-delay: calc(180ms + var(--i) * 60ms);
}

.number {
  font: 500 12px/1.9 var(--mono);
  color: var(--ac);
}

.points h3 {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.points p {
  margin-top: 6px;
  font-size: 14.5px;
  line-height: 1.68;
  color: var(--tx2);
}

.points code {
  font-family: var(--mono);
  font-size: 0.88em;
  color: var(--tx);
}

.chips {
  margin-top: 32px;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 36px;
  padding: 22px;
  border: 1px dashed var(--line2);
  border-radius: 14px;
  font-size: 14px;
  color: var(--tx2);
}

@media (min-width: 641px) {
  .body {
    padding-top: 32px;
  }

  .title {
    font-size: 34px;
  }

  .facts div {
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 16px;
  }

  .points li {
    grid-template-columns: 32px minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .points li {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 6: Create `components/projects/project-rails.tsx`**

```tsx
'use client'

import { useCallback, useState } from 'react'
import { companyWork, personalWork, rails } from '@/data/work'
import CaseStudyPanel from './case-study-panel'
import ProjectRail from './project-rail'

const ProjectRails = () => {
  const [openId, setOpenId] = useState<string | null>(null)
  const openCase = useCallback((id: string) => setOpenId(id), [])
  const closeCase = useCallback(() => setOpenId(null), [])

  return (
    <>
      {rails.map((rail) => (
        <ProjectRail
          key={rail.kind}
          rail={rail}
          items={rail.kind === 'company' ? companyWork : personalWork}
          onOpenCase={openCase}
        />
      ))}
      <CaseStudyPanel item={companyWork.find((item) => item.id === openId) ?? null} onClose={closeCase} />
    </>
  )
}

export default ProjectRails
```

- [ ] **Step 7: Create `components/projects-section.tsx`**

```tsx
import ProjectRails from './projects/project-rails'
import SectionHeading from './ui/section-heading'
import styles from './projects-section.module.css'

const ProjectsSection = () => (
  <section id="projects" className={styles.section}>
    <div className={styles.head}>
      <SectionHeading index="04" kicker="Projects" title="Built by me. Tested by me." />
    </div>
    <ProjectRails />
  </section>
)

export default ProjectsSection
```

`components/projects-section.module.css`:

```css
.section {
  padding-top: 88px;
}

.head {
  padding: 0 var(--gutter);
}

@media (min-width: 641px) {
  .section {
    padding-top: 104px;
  }
}
```

- [ ] **Step 8: Swap the section in `app/page.tsx` and delete the old work components**

In `app/page.tsx` replace `import WorkSection from '../components/work-section'` with
`import ProjectsSection from '../components/projects-section'`, and `<WorkSection />` with `<ProjectsSection />`.

```bash
rm -r components/work components/work-section.tsx
```

(Both are untracked leftovers from earlier work, so `rm` is enough.)

- [ ] **Step 9: Verify**

Run `npm run type-check` and `npm run lint`. Expected: clean.

Run this through the Playwright MCP (`browser_run_code_unsafe`) against the dev server. It checks centring and
clipping at four sizes:

```js
async (page) => {
  const out = []
  for (const [w, h] of [[1440, 900], [1366, 657], [390, 844], [360, 640]]) {
    await page.setViewportSize({ width: w, height: h })
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    out.push(await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms))
      const navH = document.getElementById('site-nav').offsetHeight
      const vh = innerHeight, centre = navH + (vh - navH) / 2, res = []
      for (const rail of document.querySelectorAll('[data-rail]')) {
        const tier = rail.dataset.tier || 'full'
        let off = 0
        if (!tier.includes('free')) {
          const pin = rail.firstElementChild, top = pin.getBoundingClientRect().top + scrollY
          for (const f of [0.1, 0.6, 0.95]) {
            scrollTo({ top: top - navH + (pin.offsetHeight - (vh - navH)) * f, behavior: 'instant' })
            await wait(500)
            const c = rail.querySelector('[data-card]').getBoundingClientRect()
            off = Math.max(off, Math.abs(c.top + c.height / 2 - centre))
          }
        }
        const clipped = [...rail.querySelectorAll('[data-card]')].filter((k) => k.scrollHeight - k.clientHeight > 1).length
        res.push(`${rail.dataset.kind}:${tier} off=${Math.round(off)} clipped=${clipped}`)
      }
      return `${innerWidth}x${vh} ` + res.join(' | ')
    }))
  }
  return out.join('\n')
}
```

Expected (matching the mockup measurements):
- every rail reports `off=0` (at most 1) and `clipped=0`
- 1440×900 and 390×844 use `full`; 1366×657 uses `compact`
- 360×640 uses `compact tight` for the company rail

Also click a "Read case study" button. The panel slides in with the numbered points, Esc closes it, and focus
returns to the button.

- [ ] **Step 10: Commit**

```bash
git add data/work.ts app/page.tsx components/projects-section.tsx components/projects-section.module.css components/projects
git commit -m "Add pinned project rails and case-study panels

Projects split into a company (SQA) rail and a personal (development)
rail. Vertical scroll moves the cards sideways while they stay centred
below the top bar; cards tighten or fall back to a swipe rail on short
screens. Company cards open a case-study side panel. Adds the in-progress
full-stack e-commerce project.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: GitHub section

**Files:**
- Modify: `lib/github.ts` (full rewrite)
- Modify: `components/github-section.tsx` (full rewrite), create `components/github-section.module.css`
- Modify: `components/github/repo-card.tsx` (full rewrite), create `components/github/repo-card.module.css`
- Create: `components/github/languages-card.tsx`, `components/github/tools-card.tsx`,
  `components/github/github-cards.module.css`

**Interfaces:**
- Produces: `GitHubData = { publicRepos: number; memberSince: string; languages: { name: string; count: number }[]; languageRepoCount: number; languageCount: number; repos: (Repo & { updated: string })[] }`,
  `getGitHubData(): Promise<GitHubData | null>`, `languageColor(language: string | null): string`.

- [ ] **Step 1: Rewrite `lib/github.ts`**

```ts
import { site } from '@/data/site'

export type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  pushed_at: string
  fork: boolean
  archived: boolean
}

export type GitHubData = {
  publicRepos: number
  memberSince: string
  /** The top five languages by number of repositories, then "Other". */
  languages: { name: string; count: number }[]
  /** Repositories with a detected language: the denominator for `languages`. */
  languageRepoCount: number
  /** Distinct languages across my repositories. */
  languageCount: number
  repos: (Repo & { updated: string })[]
}

const API = 'https://api.github.com'
const REVALIDATE_SECONDS = 3600
const TOP_LANGUAGES = 5

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

/** GitHub allows 60 unauthenticated requests per hour; a token raises that to 5000. */
const headers = (): HeadersInit => {
  const token = process.env.GITHUB_TOKEN
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

/** Returns null when GitHub is unreachable or rate-limited, so the section can degrade to a plain profile link. */
export async function getGitHubData(): Promise<GitHubData | null> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || site.github.username

  const [user, repos] = await Promise.all([
    get<{ public_repos: number; created_at: string }>(`/users/${username}`),
    get<Repo[]>(`/users/${username}/repos?per_page=100&sort=pushed&type=owner`),
  ])

  if (!user || !repos) return null

  const ownRepos = repos.filter((repo) => !repo.fork && !repo.archived)

  const counts = new Map<string, number>()
  ownRepos.forEach((repo) => {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  })
  const ranked = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  const top = ranked.slice(0, TOP_LANGUAGES).map(([name, count]) => ({ name, count }))
  const rest = ranked.slice(TOP_LANGUAGES).reduce((total, [, count]) => total + count, 0)

  return {
    publicRepos: user.public_repos,
    memberSince: new Date(user.created_at).getUTCFullYear().toString(),
    languages: rest ? [...top, { name: 'Other', count: rest }] : top,
    languageRepoCount: ranked.reduce((total, [, count]) => total + count, 0),
    languageCount: ranked.length,
    // Sorted by most recently pushed; the section decides which ones to show.
    repos: ownRepos.map((repo) => ({
      ...repo,
      updated: dateFormatter.format(new Date(repo.pushed_at)),
    })),
  }
}

/** Distinct hues, so no two languages look alike (GitHub's own TypeScript and Python are both blue). */
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#facc15',
  TypeScript: '#3b82f6',
  Python: '#2dd4bf',
  HTML: '#f87171',
  CSS: '#a78bfa',
}

export const languageColor = (language: string | null) => (language && LANGUAGE_COLORS[language]) || '#fb923c'
```

- [ ] **Step 2: Create the two cards**

`components/github/languages-card.tsx`:

```tsx
import { languageColor, type GitHubData } from '@/lib/github'
import { vars } from '@/lib/style'
import styles from './github-cards.module.css'

const LanguagesCard = ({ languages, repoCount }: { languages: GitHubData['languages']; repoCount: number }) => (
  <article className={`hv ${styles.card}`}>
    <h3>Languages</h3>
    <p className={styles.caption}>Share of my {repoCount} repositories with a detected language</p>
    <div className={styles.bar} aria-hidden="true">
      {languages.map((language, i) => (
        <i key={language.name} style={vars({ flex: language.count, background: languageColor(language.name), '--k': i })} />
      ))}
    </div>
    <ul className={styles.legend}>
      {languages.map((language) => (
        <li key={language.name}>
          <i style={{ background: languageColor(language.name) }} aria-hidden="true" />
          {language.name} <b>{Math.round((language.count / repoCount) * 100)}%</b>
        </li>
      ))}
    </ul>
  </article>
)

export default LanguagesCard
```

`components/github/tools-card.tsx`:

```tsx
import { vars } from '@/lib/style'
import styles from './github-cards.module.css'

const ToolsCard = ({ tools }: { tools: string[] }) => (
  <article className={`hv ${styles.card}`} style={vars({ '--rule': 'var(--dev)' })}>
    <h3>Most used in my projects</h3>
    <p className={styles.caption}>Ranked by how many of my projects use them</p>
    <ul className={styles.tools}>
      {tools.map((tool, i) => (
        <li key={tool} className={i < 3 ? styles.top : undefined} style={vars({ '--i': i })}>
          {tool}
        </li>
      ))}
    </ul>
  </article>
)

export default ToolsCard
```

`components/github/github-cards.module.css`:

```css
.card {
  height: 100%;
  padding: 20px 18px;
}

.card h3 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.caption {
  margin-top: 6px;
  font: 12px/1.5 var(--mono);
  color: var(--tx3);
}

.bar {
  display: flex;
  gap: 3px;
  height: 10px;
  margin-top: 24px;
  border-radius: 999px;
  overflow: hidden;
}

.bar i {
  height: 100%;
  transform-origin: left;
  transition: transform 1.1s var(--e);
  transition-delay: calc(var(--k) * 90ms);
}

/* the bar grows in when its card is revealed (PageEffects adds .in to the wrapper) */
:global(.js) .bar i {
  transform: scaleX(0);
}

:global(.in) .bar i {
  transform: none;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 20px;
  font-size: 13.5px;
  color: var(--tx2);
}

.legend li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.legend b {
  font: 500 12px var(--mono);
  color: var(--tx3);
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.tools li {
  padding: 6px 11px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  font: 12.5px/1.5 var(--mono);
  color: var(--tx2);
  transition: color 0.4s, border-color 0.4s, background-color 0.4s;
  transition-delay: calc(var(--i) * 25ms);
}

.tools li.top {
  border-color: rgba(96, 165, 250, 0.35);
  background: rgba(96, 165, 250, 0.08);
  color: var(--tx);
}

.card:hover .tools li {
  border-color: var(--line2);
  color: var(--tx);
}

@media (min-width: 641px) {
  .card {
    padding: 26px 28px 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar i {
    transition: none;
  }
}
```

- [ ] **Step 3: Rewrite `components/github/repo-card.tsx`**

```tsx
import { languageColor, type GitHubData } from '@/lib/github'
import { vars } from '@/lib/style'
import styles from './repo-card.module.css'

type Repo = GitHubData['repos'][number]

/** Octicons "repo". */
const RepoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
  </svg>
)

const RepoCard = ({ repo, fallbackDescription }: { repo: Repo; fallbackDescription?: string }) => (
  <a
    className={`hv ${styles.card}`}
    style={vars({ '--rule': 'var(--dev)' })}
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3 className={styles.name}>
      <RepoIcon />
      <span>{repo.name}</span>
    </h3>
    <p className={styles.description}>{repo.description || fallbackDescription || 'No description on GitHub yet.'}</p>
    <div className={styles.meta}>
      {repo.language && (
        <span className={styles.language}>
          <i style={{ background: languageColor(repo.language) }} aria-hidden="true" />
          {repo.language}
        </span>
      )}
      {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
      <span className={styles.updated}>{repo.updated}</span>
    </div>
  </a>
)

export default RepoCard
```

`components/github/repo-card.module.css`:

```css
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
}

.name {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font: 500 15px var(--mono);
  letter-spacing: -0.01em;
}

.name svg {
  flex: none;
  color: var(--tx3);
}

.name span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--tx2);
}

.meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 20px;
  font: 12px var(--mono);
  color: var(--tx3);
}

.language {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--tx2);
}

.language i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.updated {
  margin-left: auto;
}
```

- [ ] **Step 4: Rewrite `components/github-section.tsx`**

```tsx
import type { Stat } from '@/data/about'
import { site } from '@/data/site'
import { personalWork, projectRepoNames, work } from '@/data/work'
import { getGitHubData } from '@/lib/github'
import { vars } from '@/lib/style'
import LanguagesCard from './github/languages-card'
import RepoCard from './github/repo-card'
import ToolsCard from './github/tools-card'
import SectionHeading from './ui/section-heading'
import StatStrip from './ui/stat-strip'
import styles from './github-section.module.css'

const REPO_COUNT = 6

/** Falls back to the project summary when a repository has no description on GitHub. */
const summaryByRepo = new Map(
  work.filter((item) => item.github).map((item) => [item.github!.split('/').pop() as string, item.summary]),
)

/** The ten technologies most of my personal projects use; ties keep data order. */
const topTools = (() => {
  const counts = new Map<string, number>()
  personalWork.forEach((item) => item.tech.forEach((tech) => counts.set(tech, (counts.get(tech) ?? 0) + 1)))
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tech]) => tech)
})()

const heading = (
  <SectionHeading
    index="05"
    kicker="GitHub"
    title="GitHub activity"
    subtitle="Repositories and languages come straight from the GitHub API and refresh every hour."
  />
)

const profileLink = (
  <a className="btn btn-ghost" href={site.github.url} target="_blank" rel="noopener noreferrer">
    View full GitHub profile{' '}
    <span className="arr" aria-hidden="true">
      ↗
    </span>
  </a>
)

const GitHubSection = async () => {
  const data = await getGitHubData()

  if (!data) {
    return (
      <section id="github" className="section">
        {heading}
        <div className={styles.profile}>{profileLink}</div>
      </section>
    )
  }

  // Prefer the repositories behind the projects above; fall back to the most recently pushed ones.
  const projectRepos = data.repos.filter((repo) => projectRepoNames.includes(repo.name))
  const repos = (projectRepos.length > 0 ? projectRepos : data.repos).slice(0, REPO_COUNT)
  const years = new Date().getFullYear() - Number(data.memberSince)

  const stats: Stat[] = [
    { value: String(data.publicRepos), label: 'Public repositories', context: 'Backends, apps and data work' },
    { value: site.commitsLastYear, label: 'Commits', context: 'In the last 12 months' },
    { value: data.memberSince, label: 'On GitHub since', context: `${years} years of public work` },
    {
      value: String(data.languageCount),
      label: 'Languages',
      context: data.languages
        .filter((language) => language.name !== 'Other')
        .slice(0, 3)
        .map((language) => language.name)
        .join(', '),
    },
  ]

  return (
    <section id="github" className="section">
      {heading}
      <StatStrip stats={stats} className={styles.stats} />
      <div className={styles.cards}>
        <div data-r>
          <LanguagesCard languages={data.languages} repoCount={data.languageRepoCount} />
        </div>
        <div data-r style={vars({ '--d': 1 })}>
          <ToolsCard tools={topTools} />
        </div>
      </div>
      <div className={styles.repos}>
        {repos.map((repo, i) => (
          <div key={repo.id} data-r style={vars({ '--d': i % 3 })}>
            <RepoCard repo={repo} fallbackDescription={summaryByRepo.get(repo.name)} />
          </div>
        ))}
      </div>
      <div className={styles.profile}>{profileLink}</div>
    </section>
  )
}

export default GitHubSection
```

`components/github-section.module.css`:

```css
.stats {
  margin-top: 48px;
}

.cards,
.repos {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  margin-top: 28px;
}

.profile {
  margin-top: 28px;
}

@media (min-width: 641px) {
  .cards {
    grid-template-columns: 1.15fr 0.85fr;
  }

  .repos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1101px) {
  .repos {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

- [ ] **Step 5: Verify**

Run `npm run type-check` and `npm run lint`. Expected: clean.

Visual check against the mockup GitHub section:
- the stats read Public repositories (live), 130+ Commits, On GitHub since 2019, and Languages (live)
- the language bar grows in, with JavaScript yellow, TypeScript blue, Python teal, HTML coral and CSS violet
- the top three tools are highlighted
- six repository cards follow, then the profile button

- [ ] **Step 6: Commit**

```bash
git add lib/github.ts components/github-section.tsx components/github-section.module.css components/github
git commit -m "Redesign GitHub: stats, languages and most-used tools

Drops followers and repo-update counts for stats that stand on their own,
adds a languages card with distinct colours and a ranked tools card.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Contact and footer; remove the phone number

**Files:**
- Modify: `components/contact-section.tsx` (full rewrite), create `components/contact-section.module.css`
- Create: `components/contact/contact-form.tsx`, `components/contact/contact-form.module.css`
- Modify: `components/footer.tsx` (full rewrite), create `components/footer.module.css`
- Modify: `data/site.ts` (delete the obsolete fields)

- [ ] **Step 1: Create `components/contact/contact-form.tsx`** (same Web3Forms behaviour, new styling)

```tsx
'use client'

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './contact-form.module.css'

type Status = 'idle' | 'success' | 'error'

const statusText: Record<Status, string> = {
  idle: '',
  success: "Message sent. I'll get back to you soon.",
  error: 'Failed to send the message. Please try again, or email me directly.',
}

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const botcheckRef = useRef<HTMLInputElement>(null)

  // Hide the success or error message after 5 seconds.
  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 5000)
    return () => clearTimeout(timer)
  }, [status])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          // Honeypot: only a bot ticks this hidden box, and Web3Forms drops the submission.
          botcheck: botcheckRef.current?.checked ?? false,
        }),
      })
      clearTimeout(timeoutId)
      const result = await response.json()
      if (response.ok && result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={`hv ${styles.form}`} onSubmit={handleSubmit}>
      <h3>Send a message</h3>
      <div className={styles.field}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Enter your full name"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="your.email@example.com"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell me about the role or project"
        />
      </div>
      <input
        ref={botcheckRef}
        type="checkbox"
        name="botcheck"
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button type="submit" className={`btn btn-pri ${styles.submit}`} disabled={isSubmitting}>
        {isSubmitting ? (
          'Sending…'
        ) : (
          <>
            Send message{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </>
        )}
      </button>
      <p className={styles.status} data-status={status} aria-live="polite">
        {statusText[status]}
      </p>
    </form>
  )
}

export default ContactForm
```

`components/contact/contact-form.module.css`:

```css
.form {
  padding: 22px;
}

.form h3 {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.field {
  margin-top: 20px;
}

.field label {
  display: block;
  margin-bottom: 8px;
  font: 500 12px var(--mono);
  color: var(--tx2);
}

.field input,
.field textarea {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--line2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  font-size: 15px;
  color: var(--tx);
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.field textarea {
  min-height: 130px;
  resize: vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--tx3);
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--ac);
  background: rgba(255, 255, 255, 0.035);
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.15);
}

.honeypot {
  display: none;
}

.submit {
  width: 100%;
  margin-top: 24px;
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  min-height: 20px;
  margin-top: 12px;
  font: 13px var(--mono);
  color: var(--tx2);
}

.status[data-status='success'] {
  color: var(--ac);
}

.status[data-status='error'] {
  color: #f87171;
}

@media (min-width: 641px) {
  .form {
    padding: 32px;
  }
}
```

- [ ] **Step 2: Rewrite `components/contact-section.tsx`**

```tsx
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
```

`components/contact-section.module.css`:

```css
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: 32px;
  margin-top: 52px;
}

.intro {
  max-width: 640px;
  font-size: 16px;
  line-height: 1.62;
  color: var(--tx2);
}

.list {
  margin-top: 28px;
  border-top: 1px solid var(--line);
}

.list a,
.list div {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}

.key {
  flex: none;
  width: 72px;
  font: 500 12px var(--mono);
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.value {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  transition: color 0.3s;
}

.arrow {
  margin-left: auto;
  color: var(--tx3);
}

.list a:hover .value,
.list a:hover .arrow {
  color: var(--ac);
}

.list a:hover .arrow {
  transform: translate(3px, -3px);
}

@media (min-width: 641px) {
  .key {
    width: 84px;
  }
}

@media (min-width: 1101px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
}
```

- [ ] **Step 3: Rewrite `components/footer.tsx`**

```tsx
import { site } from '@/data/site'
import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <span>
      © {new Date().getFullYear()} {site.name} · {site.location}
    </span>
    <nav aria-label="Footer">
      <a href={site.github.url} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <a href={site.linkedin.url} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href="#top">Back to top ↑</a>
    </nav>
  </footer>
)

export default Footer
```

`components/footer.module.css`:

```css
.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 88px;
  padding: 40px var(--gutter);
  border-top: 1px solid var(--line);
  font-size: 13px;
  color: var(--tx3);
}

.footer nav {
  display: flex;
  gap: 20px;
}

.footer a {
  transition: color 0.3s;
}

.footer a:hover {
  color: var(--tx);
}

@media (min-width: 641px) {
  .footer {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 120px;
  }
}
```

- [ ] **Step 4: Delete the obsolete fields from `data/site.ts`**

Remove these lines:

```ts
  shortName: 'Mubin',
  role: 'SQA Engineer',
  secondRole: 'Full-Stack Developer',
```

this block:

```ts
  currentRole: {
    title: 'SQA Engineer',
    // The employer is deliberately not named anywhere on the site.
    company: 'a software company',
  },
```

and this block:

```ts
  phone: {
    display: '+880 …',
    href: 'tel:…',
  },
```

- [ ] **Step 5: Verify**

Run `npm run type-check`. Expected: no errors, which proves nothing still reads the deleted fields.
Run `npm run lint`. Expected: clean.

Run: `git grep -n "+880\|tel:" -- app components data lib`
Expected: no output.

Visual check:
- Contact shows email, LinkedIn, GitHub and Based in, with no phone
- the form card uses the rule hover, and its inputs get a green focus ring
- the footer shows ©, GitHub, LinkedIn and "Back to top ↑", and "Back to top" scrolls to the very top

- [ ] **Step 6: Commit**

```bash
git add components/contact-section.tsx components/contact-section.module.css components/contact components/footer.tsx components/footer.module.css data/site.ts
git commit -m "Redesign Contact and footer; remove the phone number

The form keeps its Web3Forms behaviour with new styling. The phone number
is no longer published anywhere on the site.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Remove old dependencies and dead assets; update the README

**Files:**
- Modify: `package.json`, `package-lock.json`
- Delete: `public/logo.json`, `public/hero-section.json`, `public/Assets/`
- Modify: `README.md` (full rewrite)

- [ ] **Step 1: Confirm nothing imports the old libraries**

Run: `git grep -n "framer-motion\|lottie-react\|@react-three\|from 'three'\|logo.json\|hero-section.json\|Assets/" -- app components lib data`
Expected: no output.

- [ ] **Step 2: Uninstall them**

```bash
npm uninstall framer-motion lottie-react three @react-three/fiber @types/three
```

Expected: `removed N packages`. `package.json` no longer lists them.

- [ ] **Step 3: Delete the unused assets**

```bash
git rm -r --ignore-unmatch public/logo.json public/hero-section.json public/Assets
rm -rf public/logo.json public/hero-section.json public/Assets
```

- [ ] **Step 4: Rewrite `README.md`**

````markdown
# Mahmud Hasan Mubin — Portfolio

Personal portfolio of **Mahmud Hasan Mubin**, SQA Engineer and full-stack developer.
Live at **[www.mh-mubin.me](https://www.mh-mubin.me)**.

The site covers both sides of the same engineer: QA case studies from professional work (Playwright automation, API
contract validation, database integrity) and full-stack projects built with Node.js, NestJS, React and PostgreSQL.

## Tech stack

| Area | Choice |
| :--- | :--- |
| Framework | Next.js 14 (App Router), React 18, TypeScript 5 |
| Styling | CSS Modules per component; tokens and shared effects in `app/globals.css`; Tailwind only for its base reset |
| Motion | CSS transitions driven by data attributes (`data-r`, `data-line`, `data-count`), switched on by one small client component |
| Data | GitHub REST API, fetched at build time and revalidated hourly |
| Contact form | [Web3Forms](https://web3forms.com) (no backend of its own) |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## Structure

```
app/
  layout.tsx            # metadata, JSON-LD, fonts
  page.tsx              # section order
  globals.css           # design tokens and shared effects
components/
  navbar.tsx            # sticky top bar
  nav/                  # side menu, scroll-spy
  hero-section.tsx  hero/pipeline-card.tsx
  about-section.tsx  experience-section.tsx  skills-section.tsx
  projects-section.tsx  projects/      # pinned horizontal rails, cards, case-study panel
  github-section.tsx  github/          # languages, tools and repository cards
  contact-section.tsx  contact/        # contact form
  footer.tsx
  ui/                   # page effects, side panel, section heading, stat strip, chips
data/                   # all page content lives here
lib/                    # GitHub API, small helpers
```

## Editing content

Text and data are separate from the components. To update the site, edit files in `data/`:

- `site.ts`: name, role lines, availability, links, and `commitsLastYear` (edited by hand)
- `about.ts`: the story, facts, build-verify pairs and the hero stats
- `experience.ts`: roles, highlights and education
- `skills.ts`: skill groups, testing principles and what you're currently learning
- `work.ts`: projects. `confidential: true` puts a project in the company rail; `caseStudy` adds the side panel
- `pipeline.ts`: the stages in the hero animation

## Getting started

Requires Node.js 18+ and npm 8+.

```bash
git clone https://github.com/MH-Mubin/portfolio.git
cd portfolio
npm install
cp env.example .env.local   # then fill in the values
npm run dev                 # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes, for the contact form | Web3Forms access key. Public by design. |
| `NEXT_PUBLIC_GITHUB_USERNAME` | No | Defaults to `MH-Mubin`. |
| `GITHUB_TOKEN` | No | Raises the GitHub API rate limit from 60 to 5000 requests per hour at build time. |

Without a Web3Forms key the form renders but every submission fails. Without GitHub access the GitHub section falls
back to a plain profile link.

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (next/core-web-vitals)
npm run type-check   # TypeScript, no emit
```

## Notes

- The page is statically generated. The GitHub section uses ISR with a one-hour revalidation window.
- Every animation respects the reduced-motion setting: reveals show at once, the pipeline shows its final state, and
  the project rails become plain swipe rows.
- Company QA work is described without internal details, screenshots or links.

## Contact

- Email: [mahmud.h.mubin@gmail.com](mailto:mahmud.h.mubin@gmail.com)
- GitHub: [@MH-Mubin](https://github.com/MH-Mubin)
- LinkedIn: [Mahmud Hasan Mubin](https://www.linkedin.com/in/mahmud-hasan-mubin/)
````

- [ ] **Step 5: Verify**

Run: `npm run type-check`, `npm run lint`, `npm run build`
Expected:
- type-check and lint are clean
- the build prints `✓ Compiled successfully`, and its route table shows `/` as a static or ISR page

Run: `git status --short`
Expected: only the files of this task, plus nothing untracked except ignored files. In particular, no
`components/work*`, `components/particle-background.tsx` or `types/index.ts` left over.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json README.md
git commit -m "Drop Three.js, Lottie and Framer Motion; update the README

Motion is now CSS plus two small effects, so ~900 KB of JavaScript
and the unused logo and icon assets go.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(The asset deletions were already staged by `git rm` in Step 3.)

---

### Task 11: Full verification on the production build

**Files:** none changed. Fix anything this task finds in the task that owns the file, re-run this task, then commit
the fix with a message naming what was fixed.

- [ ] **Step 1: Serve the production build**

Stop the dev server. Run `npm run build`, then `npm run start` in the background (http://localhost:3000).

- [ ] **Step 2: Layout check at 8 sizes** (Playwright MCP `browser_run_code_unsafe`)

```js
async (page) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  const sizes = [[1920, 1080], [1440, 900], [1366, 657], [768, 1024], [390, 844], [375, 667], [360, 640], [844, 390]]
  const report = []
  for (const [w, h] of sizes) {
    await page.setViewportSize({ width: w, height: h })
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    report.push(await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms))
      const navH = document.getElementById('site-nav').offsetHeight
      const vh = innerHeight, centre = navH + (vh - navH) / 2
      const out = { size: `${innerWidth}x${vh}`, overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth, rails: [] }
      for (const rail of document.querySelectorAll('[data-rail]')) {
        const tier = rail.dataset.tier || 'full'
        let off = 0, layoutOk = true
        if (!tier.includes('free')) {
          const pin = rail.firstElementChild, top = pin.getBoundingClientRect().top + scrollY
          for (const f of [0.1, 0.6, 0.95]) {
            scrollTo({ top: top - navH + (pin.offsetHeight - (vh - navH)) * f, behavior: 'instant' })
            await wait(500)
            const card = rail.querySelector('[data-card]').getBoundingClientRect()
            const head = rail.querySelector('[data-rail-head]').getBoundingClientRect()
            const foot = rail.querySelector('[data-rail-foot]').getBoundingClientRect()
            off = Math.max(off, Math.abs(card.top + card.height / 2 - centre))
            if (head.top < navH - 1 || foot.bottom > vh + 1 || head.bottom > card.top + 1 || foot.top < card.bottom - 1) layoutOk = false
          }
        }
        const clipped = [...rail.querySelectorAll('[data-card]')].filter((c) => c.scrollHeight - c.clientHeight > 1).length
        out.rails.push(`${rail.dataset.kind}: ${tier} off=${Math.round(off)}px layoutOk=${layoutOk} clipped=${clipped}`)
      }
      scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
      await wait(300)
      const nav = document.getElementById('site-nav').getBoundingClientRect()
      out.navVisibleAtBottom = nav.top >= 0 && nav.bottom <= innerHeight
      return out
    }))
  }
  return JSON.stringify({ report, errors }, null, 1)
}
```

Expected:
- every size: `overflowX: false` and `navVisibleAtBottom: true`
- every rail: `off` ≤ 1px, `layoutOk=true`, `clipped=0`
- 844×390: both rails are `compact tight free`
- `errors`: `[]`

- [ ] **Step 3: Menu, links and case panel**

```js
async (page) => {
  const out = { links: [] }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  for (const id of ['about', 'experience', 'skills', 'projects', 'github', 'contact']) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.waitForTimeout(900)
    out.menuWidthPct = await page.evaluate(() => Math.round(document.getElementById('site-menu').getBoundingClientRect().width / document.documentElement.clientWidth * 100))
    await page.locator(`#site-menu nav a[href="#${id}"]`).click()
    await page.waitForTimeout(2500)
    out.links.push(await page.evaluate((id) => {
      const gap = document.getElementById(id).getBoundingClientRect().top - document.getElementById('site-nav').getBoundingClientRect().bottom
      return `${id}: ${Math.abs(gap) <= 2 ? 'ok' : 'off by ' + Math.round(gap)} hash=${location.hash}`
    }, id))
  }
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    const pin = document.querySelector('[data-rail]').firstElementChild
    scrollTo({ top: pin.getBoundingClientRect().top + scrollY - document.getElementById('site-nav').offsetHeight + 2, behavior: 'instant' })
  })
  await page.waitForTimeout(800)
  await page.getByRole('button', { name: 'Read case study' }).first().click()
  await page.waitForTimeout(1000)
  out.panel = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-labelledby="case-title"]')
    return { open: getComputedStyle(dialog).visibility === 'visible', points: dialog.querySelectorAll('ol li').length, focus: document.activeElement?.getAttribute('aria-label') }
  })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(800)
  out.afterEsc = await page.evaluate(() => ({
    closed: getComputedStyle(document.querySelector('[role="dialog"][aria-labelledby="case-title"]')).visibility === 'hidden',
    focusBack: document.activeElement?.textContent?.trim().startsWith('Read case study'),
  }))
  return JSON.stringify(out, null, 1)
}
```

Expected:
- `menuWidthPct` is 84
- all six links are `ok`, with the matching hash
- panel: `open: true`, `points: 4`, `focus: 'Close case study'`
- after Esc: `closed: true`, `focusBack: true`

- [ ] **Step 4: Accessibility scan**

```js
async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js' })
  await page.evaluate(() => document.querySelectorAll('[data-r],[data-line]').forEach((el) => el.classList.add('in')))
  await page.waitForTimeout(1200)
  return page.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ['violations'] })
    return result.violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => `${v.id}: ${v.nodes.length} × ${v.nodes[0].target.join(' ')}`)
  })
}
```

Expected: `[]`. Fix any serious or critical finding before continuing.

- [ ] **Step 5: Lighthouse (best effort)**

```bash
npx -y lighthouse http://localhost:3000 --preset=desktop --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless=new" --output=json --output-path=.superpowers/lighthouse.json
node -e "const r=require('./.superpowers/lighthouse.json');for(const[k,v]of Object.entries(r.categories))console.log(k,Math.round(v.score*100))"
```

Expected: every category ≥ 95. If Lighthouse cannot find Chrome on this machine, record that, and run PageSpeed
Insights against the Vercel preview URL in Task 12 instead.

- [ ] **Step 6: Visual sign-off**

Screenshot at 1920×1080 and 390×844: the hero, About, the company rail mid-scroll, the open case panel, GitHub,
Contact and the open side menu. Compare each with the mockup. Stop the production server afterwards.

---

### Task 12: Preview deploy, then production

**Files:** none.

- [ ] **Step 1: Confirm a clean tree and the commit list**

Run: `git status --short` (expected: empty) and `git log --oneline main..redesign` (expected: the task commits).

- [ ] **Step 2: Push the branch**

```bash
git push -u origin redesign
```

Vercel's Git integration builds a preview for the branch. Mahmud opens it from the Vercel dashboard (Project →
Deployments, the `redesign` row), or from the commit status on GitHub. If Vercel shows a build error, read the log,
fix it on the branch, and push again.

- [ ] **Step 3: Mahmud checks the preview**

On his laptop and on a real phone:
- the rails glide smoothly with a trackpad and a mouse wheel, and with touch scrolling on the phone
- the menu and the case panel feel right
- one real contact-form message arrives
- optional: PageSpeed Insights on the preview URL

**Stop here until he says go.**

- [ ] **Step 4: Release to production**

```bash
git switch main
git merge --ff-only redesign
git push origin main
```

Vercel deploys `main` to www.mh-mubin.me. Confirm by fetching the live title:

```bash
curl -s https://www.mh-mubin.me | grep -o "<title>[^<]*</title>"
```

Expected: `<title>Mahmud Hasan Mubin — SQA Engineer &amp; Full-Stack Developer</title>`. Allow a minute or two for
the deployment to finish.
