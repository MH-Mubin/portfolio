PROJECT BRIEF: PROFESSIONAL 3D DYNAMIC PORTFOLIO WEBSITE

=== PROJECT OVERVIEW ===
Build a professional, full-stack dynamic portfolio website for Mahmud Hasan Mubin - a Backend Engineer targeting entry-level to junior full-stack developer roles. The portfolio must be visually stunning with 3D animations, smooth transitions, dark mode aesthetic, and fully functional backend integration. This is a complete portfolio showcasing backend expertise, full-stack capabilities, and professional design.

=== TARGET AUDIENCE ===

- Recruiters and hiring managers for junior backend/full-stack developer positions
- Companies using JavaScript ecosystem (Node.js, React, Express, NestJS)
- Portfolio should demonstrate problem-solving, code quality, and full-stack thinking

=== TECH STACK ===
FRONTEND:

- Next.js 16 (App Router)
- React 19
- TypeScript
- Three.js + React Three Fiber (3D scenes)
- Framer Motion (smooth animations)
- Tailwind CSS v4
- SWR (for GitHub API integration)

BACKEND:

- Node.js + Express.js
- PostgreSQL (via Supabase)
- Nodemailer (Gmail integration for contact form)
- GitHub API (for live repo stats)

DEPLOYMENT:

- Vercel (frontend & backend)
- Supabase (database)
- Nodemailer + Gmail (email service)

=== DATABASE SCHEMA ===
Database: PostgreSQL (Supabase)

Table: contact_submissions

- id (UUID, Primary Key)
- name (VARCHAR(255), NOT NULL)
- email (VARCHAR(255), NOT NULL)
- message (TEXT, NOT NULL)
- created_at (TIMESTAMP, DEFAULT NOW())
- status (VARCHAR(50), DEFAULT 'new') -- new, read, replied

Table: github_cache (for optimization)

- id (UUID, Primary Key)
- user_login (VARCHAR(255), UNIQUE)
- repos_count (INTEGER)
- languages (JSON)
- total_stars (INTEGER)
- contributions (INTEGER)
- last_updated (TIMESTAMP)

=== API ENDPOINTS ===
Backend Routes (Express):

POST /api/contact

- Body: { name, email, message }
- Response: { success: boolean, message: string }
- Function: Save to database, send email notification to mahmud.h.mubin@gmail.com
- Error handling: Validate all fields, return 400 for invalid data

GET /api/github-stats

- Response: { repos, languages, stars, contributions }
- Function: Fetch from GitHub API (cache results for 1 hour to avoid rate limiting)
- Error handling: Return cached data if API fails

GET /api/health

- Response: { status: 'ok' }
- Function: Health check endpoint

=== PORTFOLIO SECTIONS & ARCHITECTURE ===

1. NAVIGATION BAR (Persistent)

   - Logo/Name: "MH-Mubin"
   - Nav Links: Home, About, Projects, Contact
   - Smooth scroll to sections
   - Hover effects with subtle underline animation
   - Responsive mobile menu (hamburger)

2. HERO/HOME SECTION

   - Full viewport height (100vh)
   - Background: Particle system with floating tech icons
     - Tech icons: Node.js, React, PostgreSQL, MongoDB, Express, NestJS, Docker, Git
     - Icons should float/rotate smoothly with parallax effect
     - Particles emit from cursor/random positions
     - Use Three.js canvas as background
   - Foreground Text (overlay on 3D):
     - "Mahmud Hasan Mubin"
     - "Backend Engineer | Full-Stack Developer"
     - Animated text entrance (fade + slide from bottom)
   - CTA Button: "Explore My Work" - smooth scroll to projects
   - Color scheme: Dark background (#0F172A), Cyan accent (#06B6D4), white text

3. ABOUT SECTION

   - Two-column layout (responsive):
     - Left: Profile summary (text + stats)
     - Right: Animated skill cards grid
   - Profile Summary:
     - "About Me" heading
     - 2-3 paragraph bio highlighting backend expertise, motivation, and full-stack journey
     - Key stats: Years coding, projects built, GitHub contributions (animated counters)
   - Skill Cards (Grid 3x2 on desktop, responsive):
     - Each card shows skill category with animated progress bars
     - Categories: Backend & Frameworks, Databases, Architecture & Practices, DevOps & Tools, Tools & Platforms, Soft Skills
     - Card hover effect: 3D tilt, glow effect
   - Animations: Cards fade in on scroll, counters animate to final numbers

4. SKILLS VISUALIZATION SECTION

   - Interactive skill grid showing proficiency levels
   - Tech Stack Breakdown:
     - Backend: Node.js, NestJS, ExpressJS, TypeScript, JavaScript
     - Databases: PostgreSQL, MongoDB
     - Architecture: RESTful APIs, OOP, Microservices, Modular Design
     - DevOps: Docker, Linux, PM2, NGINX, Deployment
     - Tools: Git, Postman, Jest, Debugging
   - Display as animated tech badge icons with skill level indicator
   - On hover: Show tooltip with proficiency level

5. FEATURED PROJECTS SECTION

   - Heading: "Featured Projects"
   - Grid layout: 2 columns on desktop, 1 on mobile
   - 4 Project Cards (one for each project):

   PROJECT 1: Inventory Application

   - Title: "Inventory Application"
   - Tech Stack Badges: Node.js, Express.js, MongoDB, REST API, JWT, Git
   - Description: "Built modular server-side APIs with authentication, role-based access, and transaction rollback. Optimized queries for performance and reliability across multiple inventory modules."
   - Key Metrics: "↑ Modular Architecture | Role-Based Access Control | Query Optimization"
   - Buttons: [View on GitHub] [Live Demo] (links to actual repos)
   - Card Design: Dark background, cyan border on hover, smooth transitions

   PROJECT 2: School Management System

   - Title: "School Management System"
   - Tech Stack: TypeScript, Express, PostgreSQL, Drizzle ORM, Docker
   - Description: "Developed backend APIs to manage students, classes, and enrollments with secure authentication. Dockerized PostgreSQL and backend services for reliable deployment."
   - Key Metrics: "↑ Secure Authentication | Query Optimization | Docker Deployment"
   - Buttons: [View on GitHub] [Live Demo]

   PROJECT 3: E-commerce System

   - Title: "E-commerce System"
   - Tech Stack: TypeScript, Express, MongoDB, Zod, Jest
   - Description: "Designed modular backend supporting cart, orders, and promo workflows. Integrated testing and validation for scalable, maintainable systems."
   - Key Metrics: "↑ Full Workflow Management | Testing & Validation | CI/CD Ready"
   - Buttons: [View on GitHub] [Live Demo]

   PROJECT 4: Bookmark Application

   - Title: "Bookmark Application"
   - Tech Stack: NestJS, PostgreSQL, Prisma ORM, REST API, JWT, Docker
   - Description: "Developed secure REST API with JWT authentication and Prisma migrations. Created concise backend documentation for internal developer reference."
   - Key Metrics: "↑ JWT Security | Database Migrations | Documentation"
   - Buttons: [View on GitHub] [Live Demo]

   - Card Interactions:
     - Hover: 3D tilt effect, glow, slide up slightly
     - Tech badges animated on load
     - Links have hover underline animation

6. GITHUB INTEGRATION SECTION

   - Heading: "GitHub Activity & Stats"
   - Real-time GitHub Statistics (fetched via GitHub API):
     - Total Repositories Count (animated counter)
     - Top Programming Languages (bar chart or pie chart)
     - Total Stars Received (animated counter)
     - Total Forks (animated counter)
     - Contribution Graph (visual representation)
     - Featured Repositories (3-4 top repos with stars/forks)
   - Section displays live data updated hourly
   - Shows consistency and activity

7. CONTACT SECTION

   - Heading: "Get In Touch"
   - Contact Form with fields:
     - Name (text input, required)
     - Email (email input, required)
     - Message (textarea, required, min 10 chars)
   - Form Features:
     - Client-side validation (show error messages)
     - Submit button with loading state (spinner animation)
     - Success message: "Thanks for reaching out! I'll get back to you soon."
     - Error message: "Something went wrong. Please try again."
   - Backend Integration:
     - Submit to /api/contact endpoint
     - Save to PostgreSQL database
     - Send email to mahmud.h.mubin@gmail.com via Nodemailer
   - Card Design: Dark background, cyan accent, smooth animations
   - Social Links Below Form:
     - GitHub: https://github.com/MH-Mubin
     - LinkedIn: (if available)
     - Email: mahmud.h.mubin@gmail.com
     - Phone: +8801754595024

8. FOOTER
   - Simple footer with:
     - Copyright & year
     - "Built with Next.js, React, Three.js, and Tailwind CSS"
     - Links to GitHub, LinkedIn, Email
     - Back to top button with smooth scroll

=== DESIGN SYSTEM ===
COLOR PALETTE (Dark Mode):

- Primary Background: #0F172A (Deep Navy)
- Secondary Background: #1A2847 (Slightly lighter navy)
- Accent Color: #06B6D4 (Cyan Blue) - used for highlights, buttons, hover effects
- Text Primary: #F1F5F9 (Off White)
- Text Secondary: #94A3B8 (Light Gray)
- Border: #334155 (Dark Gray)
- Success: #10B981 (Green)
- Error: #EF4444 (Red)

TYPOGRAPHY:

- Font Family: Geist (sans-serif) for all text
- Headings: Geist Bold/SemiBold, sizes 24px-48px, line-height 1.2
- Body Text: Geist Regular, 14px-16px, line-height 1.6
- Links: Geist, 14px-16px, underline on hover

SPACING & LAYOUT:

- Use Tailwind spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- Container max-width: 1280px
- Section padding: 60px-100px vertical, 20px-40px horizontal
- Gap between grid items: 24px-32px
- Mobile-first responsive design

ANIMATIONS:

- Entrance animations: fade-in, slide-in from bottom (0.6s duration)
- Hover effects: 3D tilt (subtle), glow effect, color change
- Scroll animations: Fade-in on scroll (Framer Motion)
- Button transitions: 0.3s ease-out on all interactive elements
- Smooth scroll behavior for navigation
- Particle system: Continuous, subtle movement (not distracting)

SHADOWS & EFFECTS:

- Card shadows: Subtle, dark mode appropriate
- Glow effects on hover: Cyan accent glow
- No harsh shadows, keep professional aesthetic

=== FILE STRUCTURE ===
