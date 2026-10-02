# Portfolio redesign: design spec

**Date:** 2026-10-02
**Status:** Awaiting review
**Reference mockup:** `.superpowers/mockup/portfolio-mockup.html` (git-ignored; open it in a browser). Every visual and
behavioural decision below was approved against that page. Where this spec and the mockup disagree, this spec wins.

## 1. Goal

Redesign the whole portfolio so that an HR team and a tech lead read it as "this is who we need": a professional,
calm dark interface with smooth, purposeful motion. The portfolio presents Mahmud as an **SQA Engineer first and a
full-stack developer second**, and must stay accurate: no invented metrics, nothing the GitHub profile or CV would
contradict.

This is a **visual redesign plus the content decisions below**. The seven sections stay the same, in the same order.

## 2. Decisions (all confirmed by Mahmud)

| Area | Decision |
|---|---|
| Direction | "A · Precision": near-black, one green accent, Geist Sans + Geist Mono, hairlines instead of boxes |
| Skills hover | Taken from direction B: a 2px rule draws across the top, the title nudges right, the number and chips light up. No lift. |
| Motion | Refined and precise: fast reveals, staggered text, count-up stats, cursor spotlight on project cards, sliding nav indicator |
| Theme | Dark only |
| Projects | Split into two horizontal rails: **Company work · SQA expertise** and **Personal projects · Development expertise** |
| Rail behaviour | Pinned scroll: vertical scrolling moves the cards sideways, and the cards stay vertically centred in the visible area below the top bar |
| Case-study detail | "Read case study →" on each company card opens a side panel holding all of its points |
| Top bar | Sticky: the logo and the menu/links stay visible all the way down |
| Mobile menu | A side panel covering ~84% of the width slides in from the right; the page stays visible, blurred, in the remaining strip |
| Hero roles | Two equal lines: ● SQA Engineer · Test Automation & Systems Verification (green), ● Full-Stack Developer · Node.js, NestJS, React & PostgreSQL (blue) |
| Stats style | Inline: number, then label and context line side by side, in hairline cells |
| Employer | Named: **Avian BPO & IT** (previously hidden) |
| Phone number | Removed from the site entirely |
| Domain | **https://www.mh-mubin.me** becomes the canonical URL (mh-mubin.me already redirects there and is served by Vercel) |
| About text | Current story kept, plus one new paragraph on owning the QA process |
| Testing principles | A "How I test" strip inside About, followed by "Currently learning" |
| New project | "Full-Stack E-Commerce Platform" (NestJS, Next.js, PostgreSQL, Prisma), shown as **In progress** with no code link |
| API testing framework | Moves from the company rail to the personal rail, tagged "QA project" |
| Extra GitHub repos | None added (DevPulse, HandsOn, Task Tracker and Jotter were offered and declined) |
| GitHub section | No contribution chart. Four stats, a Languages card, a "Most used in my projects" card, and six repository cards |
| Commit stat | Fixed value **"130+ Commits · In the last 12 months"**, kept in the data files and edited by hand |
| Stat wording | "7+ Company projects tested", "6+ Open-source dev projects" |

## 3. Visual system

### 3.1 Colour tokens (CSS variables in `app/globals.css`, mirrored in `tailwind.config.js`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#09090b` | Page background |
| `--s1` | `#0f0f12` | Card surface |
| `--s2` | `#141418` | Card surface on hover |
| `--line` | `rgba(255,255,255,.075)` | Hairlines, card borders |
| `--line2` | `rgba(255,255,255,.16)` | Hover borders, buttons |
| `--tx` | `#ededef` | Primary text |
| `--tx2` | `#a1a1aa` | Body text (~7.8:1 on `--bg`) |
| `--tx3` | `#8b8b94` | Labels, mono captions (~5.9:1). The mockup's `#71717a` fails WCAG AA (4.1:1) and is **not** used. |
| `--ac` | `#34d399` | The single accent; means "QA / pass" |
| `--dev` | `#60a5fa` | Marks development items only |
| `--warn` | `#fbbf24` | "running" state, "reported → fixed", "In progress" |

No gradient text anywhere. The only gradients allowed are the hero's soft cursor glow and its masked dot grid.

### 3.2 Type

- Geist Sans for text and Geist Mono for labels, paths and numbers in captions, both from the `geist` package (already installed).
- Name 76px, section headings 46px, rail titles 30px, card titles 22px. Letter-spacing tightens as the size grows
  (−0.052em at 76px).
- Phone sizes: name 44px, section headings 34px, rail titles 22px.

### 3.3 Layout

- Content stops at **1320px** and centres on wider screens. Side gutters are 48px (desktop), 24px (tablet) and
  16px (phone).
- Project rails run edge to edge, but their first card lines up with the content edge.
- Breakpoints: **phone ≤ 640px**, **tablet 641–1100px**, **desktop ≥ 1101px**.
- Top bar height: 68 / 64 / 60px (desktop / tablet / phone).
- Vertical rhythm: 104px between sections (88px on phones).

### 3.4 Shared interaction patterns

- **Card hover ("rule" hover):** the background moves from `--s1` to `--s2`, the border to `--line2`, and a 2px
  accent rule scales in from the left across the top. The title moves right by 6px. Inner chips and items brighten
  one after another (25ms stagger). Used by the skills cards, "How I test", the GitHub cards, the repository cards
  and the contact form. Development-flavoured cards use `--dev` for the rule.
- **Project-card hover:** the card lifts 4px, and a cursor-following radial glow appears with a matching border glow.
- **Buttons:** primary is light on dark, ghost has a hairline border, both scale to 0.97 when pressed, and the
  arrow slides 4px on hover.
- **Easing:** `cubic-bezier(.16,1,.3,1)` everywhere. Reveals take 0.9s with an 80ms stagger. Hovers take 0.35–0.7s.

## 4. Sections

Section ids, in order: `#top` (hero), `#about`, `#experience`, `#skills`, `#projects` (was `#work`), `#github`,
`#contact`. Each section has a mono kicker (`01 ABOUT ——`) above its heading, numbered 01–06.

### 4.1 Top bar (sticky)

- **Left:** a "MH" monogram tile plus the full name. The name is hidden on phones and the tile always shows.
- **Desktop:**
  - centre: a pill holding six real `<a href="#…">` links, with a sliding highlight that follows the hover and
    rests on the current section
  - right: a "Get in touch" button
- **Tablet and phone:** the links and the button are replaced by a 42px menu button.
- **Behaviour:**
  - transparent at the top of the page; after 8px of scrolling it takes a blurred background and a bottom hairline
  - scroll-spy sets `aria-current` and the green highlight on the link for the section in view
  - clicking a link smooth-scrolls (instantly with reduced motion) so the section starts just under the bar, and
    updates the URL hash

### 4.2 Side menu (tablet and phone)

- **Panel:** slides in from the right over 0.7s and is `min(440px, 84% of the viewport)` wide.
- **Behind it:** a scrim with a 7px backdrop blur covers the page. The remaining strip shows the page, blurred.
- **Content:**
  - a "MENU" label and a ✕ button
  - six large links with numbers 01–06 and arrows, which appear one after another; the current section is green
  - at the bottom: the availability pill, the email address and a full-width "Get in touch" button
- **Closing:** ✕, tapping the scrim, Esc, or choosing a link. Choosing a link closes the panel, then scrolls to the
  section.
- **While open:** page scroll is locked, focus moves to the first link and is trapped inside the panel, and focus
  returns to the menu button on close.

### 4.3 Hero

- **Height (desktop):** the hero and the stats strip together fill `min(100svh − top bar, 860px)`. The text is
  vertically centred and the stats sit at the bottom.
- **Columns:** left text (1.2fr) and right pipeline card (0.8fr). They stack on tablet and phone.
- **Left column, top to bottom:**
  1. an availability pill with a pulsing green dot: "Open to full-time SQA / SDET roles · Dhaka"
  2. the name, revealed upward through a line mask
  3. two role lines (see §2); on phones each description drops onto its own line and the "·" is hidden
  4. the existing lede paragraph, unchanged
  5. buttons: "View projects →" (`#projects`) and "Get in touch" (`#contact`)
- **Background:** a masked dot grid plus a soft green glow that follows the cursor. This replaces the Three.js
  particle canvas.
- **Pipeline card (`release-gate.yml`):**
  - keeps the current BUILD and VERIFY stages and the loop
  - restyled: hollow "queued" circle, spinning amber "running…" ring, green ✓ "passed" with a small pop
  - a progress hairline under the header, and a "✓ Built and verified · ready to ship" line at the end
  - with reduced motion it shows the finished state without animating
  - the tool lines truncate with "…" and never overflow the card
- **Stats strip** (inline style, count-up when it scrolls into view):

| Value | Label | Context line |
|---|---|---|
| 1+ yr | Professional SQA | At Avian BPO & IT since May 2025 |
| 7+ | Company projects tested | Web, Android, iOS and browser extensions |
| 15+ | A/B variants validated | Telemetry, routing and analytics events |
| 6+ | Open-source dev projects | Node.js, NestJS and React backends and apps |

### 4.4 About (`01`)

- **Left column:**
  - "About me" heading
  - an "at a glance" list: Role · SQA Engineer, Company · Avian BPO & IT, Since · May 2025, Education ·
    B.Sc. CSE, BUBT, Based in · Dhaka, Bangladesh, Open to · Full-time SQA / SDET roles
- **Right column:** the story. The current two paragraphs come first; the first is in primary text, the others in
  body text. A third paragraph is added:
  > I also own the QA process: I lead a 7-member testing team, standardised how bugs are triaged, write the test
  > strategy documents and enforce Definition of Done gates before anything reaches production.
- **Build ⇄ Verify table:** one card with the header "● I build · VERIFIED BY · ● I verify". Each row pairs a build
  skill with how it is verified; the row lights up on hover and its ⇄ turns green:
  - REST APIs with Node.js, Express and NestJS ⇄ Postman and Newman API contract tests
  - React and Next.js interfaces ⇄ Playwright E2E suites built on Page Objects
  - PostgreSQL and MongoDB data models ⇄ Database state and ACID transaction checks
  - JWT authentication and role-based access ⇄ JWT, RBAC and IDOR security testing

  On phones the pairs stack, each item with its blue or green dot.
- **How I test:** three rule-hover cards numbered (01)–(03), holding the existing `principles`. Below them,
  "CURRENTLY LEARNING" followed by Rust · Kubernetes · Performance & load testing (k6).

### 4.5 Experience (`02`)

- **Heading:** "Experience & education", with the existing subtitle.
- **Layout:** each entry is a row: a 240px meta column (period in mono, plus a "● Current role" badge), and a body
  holding the title, "Avian BPO & IT · Dhaka, Bangladesh", the six highlights in two columns, and tool chips.
- **Education row:** "Education" in the meta column, then the degree, institution, and the coursework line.
- **Smaller screens:** the meta column stacks above the body on tablet, and the highlights become one column on
  phones.

### 4.6 Skills (`03`)

- **Grid:** the nine existing skill groups in a 3-column grid (2 on tablet, 1 on phone).
- **Each card:** a "(01)" number, an "N tools/skills" count, the title, the summary and mono chips.
- **Hover:** the rule hover from §3.4.

### 4.7 Projects (`04`)

**Heading:** "Built by me. Tested by me."

**Two pinned rails, one after the other.** In each rail, the sticky area is split into three rows: header (eyebrow,
title, subtitle), cards, and footer (progress bar, `03 / 07` counter, hint).

**Company work · SQA expertise:** "Quality engineering on production platforms". It holds the seven company case
studies, in this order: Secure Cloud Password Manager (featured: 600px wide, with its pass/fail checklist), VMP
Messenger, Cross-Platform VPN, Two-Factor Authenticator App, Project Management Platform, HR & Payroll Platform,
Marketing & Product Websites. It ends with a dashed card: "Want the detail behind these?" → `#contact`.

**Personal projects · Development expertise:** "Backends and apps I built end to end". It holds, in order:
- the Full-Stack E-Commerce Platform (In progress)
- the Automated REST API Testing Framework (tagged "QA project")
- Headless E-Commerce API
- School Management API
- Bookmark API
- Breathing & Meditation App
- Inventory Management System
- Task Manager API

It ends with a dashed card: "More on GitHub" → the profile.

**Project card:** 380px wide (fills the width on phones, with 20px of the next card peeking).
- **Top:** a tag with a coloured dot and a meta label on the right. Company cards say "QA case study" with "🔒
  Confidential". Personal cards say "Dev project" or "QA project" with the repo path, or an amber "● In progress"
  pill.
- **Body:** title, mono context line, and the summary, cut to 6 lines (3 on the featured card).
- **Bottom:** tech chips, then a footer. Company cards with case-study data get "Read case study →"; repo cards get
  "View code ↗". Cards without a public repo say "Repository goes public on completion" or "Repository not public
  yet".

**Case-study panel:** the same slide-in panel as the menu: 660px wide, 84% on phones, with a scrim, Esc, focus trap
and `role="dialog"`.
- **Content, top to bottom:**
  - a sticky header with the tag and ✕
  - the title, and "🔒 Company project · described without internal details"
  - a Platforms / Focus list
  - the 4–5 numbered points, which slide in one after another
  - tech chips
  - a "Happy to go deeper on this in an interview" box with a "Get in touch" button, which closes the panel and
    scrolls to Contact
- **Text:** the point text is Mahmud's own, lightly edited (stored in `data/work.ts`, see §6).

**In-progress card wording:** this is a draft for Mahmud to confirm or extend: *"The project I am building now: a
NestJS API on PostgreSQL through Prisma, with a Next.js storefront on top. The repository goes public once it is
complete."*

### 4.8 GitHub (`05`)

- **Heading:** "GitHub activity". **Subtitle:** "Repositories and languages come straight from the GitHub API and
  refresh every hour."
- **Stats strip** (inline style):

| Value | Label | Context | Source |
|---|---|---|---|
| live | Public repositories | Backends, apps and data work | API |
| 130+ | Commits | In the last 12 months | `data/site.ts`, hand-edited |
| live | On GitHub since | N years of public work | API |
| live | Languages | the top three, e.g. "JavaScript, TypeScript, Python" | API |

- **Two cards (rule hover):**
  - **Languages:** a 10px stacked bar that grows in when revealed, plus a legend giving each language's share of
    the repositories that have a detected language. It shows the top five, with the rest under "Other".
  - **Most used in my projects:** the top 10 technologies by how many **personal-rail** projects in `data/work.ts`
    use them, ties kept in data order. The top 3 are highlighted in blue, and no counts are shown.
- **Repository cards:** six cards for the repos behind the personal projects. Each shows the repo icon and name in
  mono, the description (falling back to the project summary), the language dot, stars when above 0, and the date
  last updated.
- **Button:** "View full GitHub profile ↗".
- **When GitHub is unreachable or rate-limited:** only the profile button shows, as today.
- **Language colours:** distinct hues rather than GitHub's own: JavaScript `#facc15`, TypeScript `#3b82f6`, Python
  `#2dd4bf`, HTML `#f87171`, CSS `#a78bfa`, anything else `#fb923c`.

### 4.9 Contact (`06`)

- **Heading:** "Let's talk about your next release."
- **Left column:** the existing intro line, then hairline rows (Email, LinkedIn, GitHub, Based in) with a ↗ that
  moves on hover. **No phone row.**
- **Right column:** the form card. The existing Web3Forms logic is unchanged: fields, honeypot, timeout,
  `aria-live` status messages. Only the styling changes; inputs get a green focus ring.

### 4.10 Footer

- **Content:** "© {year} Mahmud Hasan Mubin · Dhaka, Bangladesh", with GitHub, LinkedIn and "Back to top ↑" links.
- **No Lottie, no phone.**

## 5. Pinned rail engine (`components/projects/project-rail.tsx`)

This is the part that must feel perfectly smooth, so its behaviour is fixed here. The mockup's implementation was
measured at 0px off centre at every size tested.

1. **Structure:** `.rail-pin` (outer, gets an explicit height) → `.rail-sticky` (`position: sticky; top: navH;
   height: calc(100svh − navH)`, a grid with rows `minmax(0,1fr) auto minmax(0,1fr)`) → header in row 1
   (`align-self: end`), the viewport and track in row 2, the footer in row 3 (`align-self: start`). The middle row
   is the exact centre of the area below the top bar.
2. **Scroll distance:** `max = track.scrollWidth − viewport.clientWidth`, and `pin.height = max + sticky.height`.
3. **Each animation frame:** `target = clamp(navH − pin.top, 0, max)`. Then `cur += (target − cur) ·
   (1 − e^(−dt/85ms))`, snapping to the target once within 0.1px. The track gets
   `transform: translate3d(−cur px, 0, 0)` (with `will-change: transform`), and the progress bar and counter update.
   The DOM is written only when `cur` changes.
4. **Fit tiers:** on layout, check `track.height + 2 · max(header, footer) ≤ sticky.height`. If it fails, apply
   `compact` and re-check, then `tight`, then `free`:
   - `compact`: subtitle hidden, card padding 20px, summary cut to 3 lines, only the failing check row shown,
     chips limited to 2 rows
   - `tight`: hint hidden, context line hidden, summary cut to 2 lines, chips limited to 1 row
   - `free`: no pinning; the viewport becomes a native horizontal scroller with `scroll-snap-type: x proximity`, a
     hidden scrollbar and the hint "Swipe to see more →"

   Measured results: 1440×900 and 390×844 use full cards, 1366×657 uses compact, 375×667 and 360×640 use tight
   (company) and compact (personal), and 844×390 (a phone held sideways) uses free.
5. **Reduced motion:** always uses `free` and no easing.
6. **Re-layout:** on `ResizeObserver` (content width) and `resize`.
7. **Performance:** the frame loop runs only while a rail is intersecting the viewport (IntersectionObserver
   starts and stops it). This is an improvement on the mockup, which looped forever.
8. **Cards** are `align-items: stretch`, so every card in a rail has the tallest card's height, and children never
   shrink (`flex-shrink: 0`). That fixed a collapsed summary in the mockup.

## 6. Data changes

| File | Change |
|---|---|
| `data/site.ts` | `url: 'https://www.mh-mubin.me'`. `availability: 'Open to full-time SQA / SDET roles'`. Replace `role`/`secondRole` with `roles: [{ title: 'SQA Engineer', detail: 'Test Automation & Systems Verification', kind: 'qa' }, { title: 'Full-Stack Developer', detail: 'Node.js, NestJS, React & PostgreSQL', kind: 'dev' }]` (`title` metadata still reads "SQA Engineer & Full-Stack Developer"). Name the company in `currentRole`. **Delete `phone`.** Add `commitsLastYear: '130+'` with a comment saying it is edited by hand. |
| `data/about.ts` | Add the third story paragraph. Stats become `{ value, label, context }` with the values and context lines from §4.3. Replace `buildSkills` / `verifySkills` with `buildVerify: { build, verify }[]` in the paired order from §4.4. Add `facts: { label, value }[]`. |
| `data/experience.ts` | `company: 'Avian BPO & IT'`, and remove the "deliberately not named" comment. |
| `data/work.ts` | Delete `workFilters` and `WorkFilter`. A project's rail comes from `confidential` (company if true, personal otherwise). Its tag comes from `kind` plus the rail: "QA case study" (qa, company), "QA project" (qa, personal), "Dev project" (dev). No new field is needed. Add `caseStudy?: { platforms, focus, points: { title, text }[] }` to the seven company items, using the text from the mockup. Add `status?: 'in-progress'`. Add the Full-Stack E-Commerce Platform item first among the personal items. Keep `checklist` and `featured`. |
| `data/skills.ts` | No change (`skillGroups`, `principles` and `learning` are reused). |
| `data/pipeline.ts` | No change. |
| `lib/github.ts` | Return language counts (top five plus "Other") alongside the repos. Update `LANGUAGE_COLORS` to the palette in §4.8. Drop `followers` and `activeThisYear` if nothing uses them. Keep the token support and hourly revalidation. |

## 7. Code structure

The page is mostly server components. Client code is limited to small pieces that need the browser: scroll and
pointer handling, panels, the form, and reveal and count-up animations.

**Styling:** each component has its own CSS Module (`*.module.css`) ported from the verified mockup CSS, with
media queries in place of the mockup's container queries. Shared pieces (tokens, reveal, line mask, pulse,
buttons, chips, rule hover, spotlight) live in `app/globals.css`. Tailwind stays installed only for its base reset;
its unused theme extensions are removed.

**Reveal:** server markup carries `data-r` (fade-up) and `data-line` (line mask) attributes. One client component,
`components/ui/page-effects.tsx`, observes them and adds `in`, runs the count-ups (`data-count`), and feeds the
cursor position to `.spot` and `[data-glow]`. Elements are hidden only under `html.js`, so the page still shows
everything if JavaScript fails.

**New shared UI (`components/ui/`)**

| File | Purpose |
|---|---|
| `page-effects.tsx` | Client: one IntersectionObserver for `data-r` / `data-line` (adds `in`), count-up for `data-count` (ease-out-expo, 1.4s), and the pointer position for the spotlight and the hero glow. |
| `side-panel.tsx` | Client: the slide-in panel and scrim shared by the menu and the case study: Esc, scrim click, scroll lock, focus trap, focus return. |
| `section-heading.tsx` | Kicker, `h2` and subtitle. |
| `stat-strip.tsx` | The inline stats strip, used by the hero and GitHub. |
| `chips.tsx` | The mono chip list. |

**Sections**

| File | Status |
|---|---|
| `components/navbar.tsx` | Rewrite: sticky bar, link pill with sliding highlight, scroll-spy, menu button |
| `components/nav/side-menu.tsx` | New, built on `side-panel` |
| `components/hero-section.tsx` | Rewrite |
| `components/hero/pipeline-card.tsx` | Restyle; the logic stays |
| `components/about-section.tsx` | Rewrite (facts, story, build-verify table, How I test) |
| `components/experience-section.tsx` | Rewrite |
| `components/skills-section.tsx` | Rewrite |
| `components/projects-section.tsx` | New; replaces `work-section.tsx` and holds the open case-study id |
| `components/projects/project-rail.tsx` | New (§5) |
| `components/projects/project-card.tsx` | New; replaces `work/work-card.tsx` and `work/featured-case.tsx` |
| `components/projects/case-study-panel.tsx` | New, built on `side-panel` |
| `components/github-section.tsx` | Rewrite (stays a server component) |
| `components/github/repo-card.tsx` | Restyle, without framer-motion |
| `components/github/languages-card.tsx`, `components/github/tools-card.tsx` | New |
| `components/contact-section.tsx` | Restyle; phone removed, form logic kept |
| `components/footer.tsx` | Rewrite as a static server component |
| `app/page.tsx` | Swap `WorkSection` for `ProjectsSection`, and add `<PageEffects />` |
| `app/layout.tsx` | New domain, `jobTitle`, background colour from the token, `<html>` without `scroll-smooth` (scrolling is handled in JS so it can respect reduced motion) |
| `app/globals.css` | Rewrite: tokens, reveal, line mask, pulse, spotlight, rule hover, rail tiers |
| `tailwind.config.js` | Remove the unused theme extensions (only the base reset is used) |

**Deleted**
- Components: `components/particle-background.tsx`, `components/work-section.tsx`,
  `components/work/` (3 files)
- Assets: `public/logo.json`, `public/hero-section.json` and `public/Assets/` (none are used)

**Dependencies removed**
- `three`, `@react-three/fiber` and `@types/three`, roughly 830 KB uncompressed
- `lottie-react`
- `framer-motion`, once nothing imports it. All motion moves to CSS plus the two small hooks above.

## 8. Accessibility

- **Contrast:** all text meets WCAG AA on its background; `--tx3` is `#8b8b94` (§3.1).
- **Reduced motion:** with `prefers-reduced-motion`, reveals and count-ups show their final state, the pipeline
  shows "passed", rails use `free`, anchor scrolling is instant, and the pulse animation stops.
- **Navigation:** the nav uses real anchors with `aria-current`, so sections can be linked, bookmarked and opened in
  a new tab (fixes `SITE_ISSUES.md` §2.3).
- **Panels:** both are `role="dialog"` with `aria-modal`, `aria-labelledby`, a focus trap, Esc to close, and focus
  returned on close.
- **Focus:** a visible `:focus-visible` ring (2px `--ac`) on every interactive element.
- **Other:**
  - the decorative dots and glow are `aria-hidden`
  - the pipeline card keeps its `role="img"` description
  - tap targets are at least 44px

## 9. SEO and metadata

- **`metadataBase`, canonical and Open Graph URL:** `https://www.mh-mubin.me`.
- **JSON-LD:** `jobTitle` "SQA Engineer & Full-Stack Developer", and `worksFor: { "@type": "Organization", "name":
  "Avian BPO & IT" }`.
- **Title and description:** keep their current meaning; the title stays "Mahmud Hasan Mubin — SQA Engineer &
  Full-Stack Developer".
- **`public/og.png`:** check whether its text still matches the new headline. If it doesn't, regenerating it is a
  follow-up, not part of this redesign.

## 10. Verification

Following the project rule (no committed tests unless asked), verification is automated but ad hoc:

1. `npm run lint`, `npm run type-check` and `npm run build` all pass.
2. A Playwright script run against `next start` repeats the mockup checks at 1920×1080, 1440×900, 1366×657,
   768×1024, 390×844, 375×667, 360×640 and 844×390:
   - no horizontal page overflow
   - in each rail, the card centre is within 1px of the centre of the area below the top bar at 10%, 60% and 95%
     through the pin
   - the header and footer are fully on screen and don't overlap the cards
   - no card content is clipped
   - all six menu links land on their sections, and the menu and case panel open, close with Esc and return focus
   - the top bar stays visible at the bottom of the page
   - no console errors
   - an axe-core accessibility pass with no serious violations
3. A Lighthouse run on the production build. Target ≥ 95 for Performance, Accessibility, Best Practices and SEO on
   desktop.

**For Mahmud to check by hand:**
- the rail's smoothness on his own trackpad or mouse wheel, and on a real phone with touch scrolling
- the menu and case panel on a real phone
- the contact form sends a real message

## 11. Out of scope and open items

- **E-commerce card wording:** a draft until Mahmud supplies the features; it is one string in `data/work.ts`.
- **Security (not part of this repo):** `MH-Mubin/HandsOn-Volunteering-Platform` has a committed
  `frontend/.env`. Mahmud should check it and rotate any secrets it contains.
- **Domain:** already live (mh-mubin.me → www.mh-mubin.me on Vercel); only the URLs in the code change.
- **No new content sections, CMS, blog, or light theme.**
