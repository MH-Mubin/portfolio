export type SkillGroup = {
  title: string
  summary: string
  items: string[]
  primary?: boolean
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Test Automation',
    summary: 'How I keep regression cycles off the manual backlog',
    primary: true,
    items: ['Playwright', 'Page Object Model', 'TypeScript', 'Playwright API', 'Newman CLI', 'Jest', 'Pactum'],
  },
  {
    title: 'API & Protocols',
    summary: 'The contracts I hold services to',
    items: ['REST APIs', 'WebSockets', 'Postman', 'JSON Schema contracts', 'HTTP / HTTPS', 'cURL'],
  },
  {
    title: 'Security & Auth QA',
    summary: 'Where authorisation boundaries get pushed',
    items: [
      'JWT claims, signature & expiry',
      'RBAC boundary matrices',
      'TOTP (RFC 6238)',
      'Session invalidation',
      'BOLA / IDOR checks',
      'XSS & SQLi input probing',
    ],
  },
  {
    title: 'Databases',
    summary: 'Where I verify that the data is actually right',
    items: [
      'PostgreSQL',
      'MongoDB',
      'Complex SQL joins',
      'Aggregation pipelines',
      'ACID verification',
      'Referential integrity',
    ],
  },
  {
    title: 'Mobile & Cross-Platform',
    summary: 'Clients beyond the browser tab',
    items: [
      'Android & iOS real devices',
      'Emulators & simulators',
      'Chromium & Firefox extensions',
      'Biometrics & secure storage',
      'FCM / APNs push',
    ],
  },
  {
    title: 'Performance & Triage',
    summary: 'How a vague bug report becomes a root cause',
    items: [
      'Chrome DevTools',
      'Core Web Vitals',
      'Network payload inspection',
      'Server log analysis',
      'JMeter (basics)',
      'Root cause analysis',
    ],
  },
  {
    title: 'Backend',
    summary: 'What I build, and can read the source of',
    items: ['Node.js', 'Express.js', 'NestJS', 'TypeScript', 'Socket.io', 'Prisma'],
  },
  {
    title: 'Frontend',
    summary: 'Interfaces I build and automate',
    items: ['React', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & CSS3'],
  },
  {
    title: 'Process & Tools',
    summary: 'How the work gets organised and shipped',
    items: [
      'Agile / Scrum',
      'Jira',
      'Git & GitHub',
      'Docker',
      'Boundary value analysis',
      'State transition testing',
      'DoR / DoD gates',
    ],
  },
]

export const learning = ['Rust', 'Kubernetes', 'Performance & load testing (k6)']

/** Testing principles, shown as a short strip under the skill groups. */
export const principles = [
  {
    title: 'Architecture-first verification',
    description:
      'I test failure modes, distributed state and network boundaries rather than walking the happy path and calling it done.',
  },
  {
    title: 'Contract and schema gating',
    description:
      'Strict JSON Schema validation on every response, so a breaking backend change is caught before it reaches the UI.',
  },
  {
    title: 'Flake-free automation',
    description:
      'Auto-waiting locators, isolated storage contexts and reproducible fixtures instead of arbitrary sleeps.',
  },
]
