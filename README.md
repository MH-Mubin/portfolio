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
