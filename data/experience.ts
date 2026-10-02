export type Role = {
  title: string
  company: string
  location: string
  period: string
  current?: boolean
  highlights: { title: string; description: string }[]
  tech: string[]
}

export const roles: Role[] = [
  {
    title: 'SQA Engineer',
    company: 'Avian BPO & IT',
    location: 'Dhaka, Bangladesh',
    period: 'May 2025 – Present',
    current: true,
    highlights: [
      {
        title: 'Automated regression architecture',
        description:
          'Designed and deployed modular regression suites in Playwright (TypeScript) built on Page Object Models, cutting repetitive manual smoke and regression cycles across web platforms.',
      },
      {
        title: 'API contract and schema testing',
        description:
          'Engineered Postman collections with dynamic environment variables, pre-request auth scripts, response-time checks and JSON Schema assertions that stop breaking contract changes before release.',
      },
      {
        title: 'Backend data verification',
        description:
          'Wrote direct SQL and NoSQL queries against PostgreSQL and MongoDB to validate transactional persistence, foreign-key cascades and rollback states after API mutations.',
      },
      {
        title: 'Root cause analysis',
        description:
          'Triaged high-severity bugs through Chrome DevTools network payloads, server error logs and JWT signature inspection, accelerating engineering turnaround on production issues.',
      },
      {
        title: 'QA process ownership',
        description:
          'Directed QA operations across a 7-member testing team: standardised bug-triage workflows, authored test strategy documents and enforced Definition of Done criteria for production releases.',
      },
      {
        title: 'Experimentation auditing',
        description:
          'Validated 15+ concurrent A/B experiment variants, auditing client telemetry, routing logic and analytics event firing to guarantee experiment data integrity.',
      },
    ],
    tech: ['Playwright', 'TypeScript', 'Postman', 'Newman', 'PostgreSQL', 'MongoDB', 'Jira'],
  },
]

export const education = {
  degree: 'B.Sc. in Computer Science & Engineering',
  institution: 'Bangladesh University of Business & Technology (BUBT)',
  location: 'Dhaka, Bangladesh',
  coursework:
    'Data Structures & Algorithms, Database Systems, Computer Networks, Software Engineering, Object-Oriented Analysis & Design',
}
