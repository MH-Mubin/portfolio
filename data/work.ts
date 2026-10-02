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
