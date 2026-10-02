export type Stage = {
  name: string
  tools: string
}

export const buildStages: Stage[] = [
  { name: 'API service', tools: 'NestJS · Express · TypeScript' },
  { name: 'Web app', tools: 'React · Next.js · Tailwind' },
  { name: 'Database', tools: 'PostgreSQL · Prisma migrations' },
]

export const verifyStages: Stage[] = [
  { name: 'API contracts', tools: 'Postman · Newman · JSON Schema' },
  { name: 'End-to-end', tools: 'Playwright · Page Object Model' },
  { name: 'Data integrity', tools: 'SQL checks · MongoDB' },
]
