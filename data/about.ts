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
