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
