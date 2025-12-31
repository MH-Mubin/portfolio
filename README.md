# 🚀 Mahmud Hasan Mubin - Full Stack Software Developer Portfolio

A modern, responsive portfolio website showcasing full stack development expertise with **3D animations**, **smooth interactions**, and **live GitHub integration**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Visual Excellence
- **3D Tech Icons** - Interactive floating tech badges with authentic brand colors
- **Smooth Animations** - Framer Motion throughout every section with 60fps performance
- **Interactive Elements** - Hover effects, 3D transforms, and dynamic glow effects
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, professional design with attention to detail

### 💻 Technical Highlights
- **Live GitHub Integration** - Real-time repository data and statistics via GitHub API
- **Interactive Skills Section** - Filterable skills with animated progress bars and categories
- **Featured Projects Showcase** - 6 real projects with accurate tech stacks and descriptions
- **Contact Form** - Integrated with Web3Forms for seamless communication
- **SEO Optimized** - Complete metadata, structured data, and performance optimization

### 🚀 Performance & Accessibility
- **Fast Loading** - Optimized for speed with lazy loading and code splitting
- **Accessibility Compliant** - WCAG guidelines with keyboard navigation support
- **Cross-Browser Compatible** - Tested across modern browsers
- **Mobile-First Design** - Progressive enhancement for all screen sizes

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 10.16
- **3D Graphics**: Three.js + React Three Fiber
- **Icons**: Lucide React
- **Lottie Animations**: @lottiefiles/dotlottie-react

### Development & Tools
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm
- **Code Quality**: ESLint + TypeScript
- **Version Control**: Git

### External Services
- **Contact Form**: Web3Forms (free tier)
- **GitHub API**: Live repository data
- **Fonts**: Google Fonts (Geist)

---

## 📁 Project Structure

```
portfolio/
├── 📁 app/                      # Next.js App Router
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout with SEO metadata
│   └── page.tsx                 # Main homepage
│
├── 📁 components/               # React Components
│   ├── about-section.tsx        # About me with animated counters
│   ├── contact-section.tsx      # Contact form with Web3Forms
│   ├── footer.tsx               # Footer with social links
│   ├── github-section.tsx       # Live GitHub statistics
│   ├── hero-section.tsx         # 3D particles & hero content
│   ├── navbar.tsx               # Responsive navigation
│   ├── particle-background.tsx  # 3D floating tech icons
│   ├── projects-section.tsx     # Featured projects showcase
│   └── skills-section.tsx       # Interactive skills with filtering
│
├── 📁 public/                   # Static Assets
│   ├── animations/              # Lottie animation files
│   └── *.json                   # Animation configurations
│
├── 📁 types/                    # TypeScript Definitions
│   ├── global.d.ts              # Global type definitions
│   └── index.ts                 # Component interfaces
│
├── 📄 Configuration Files
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS customization
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Environment variables template
└── package.json                 # Dependencies & scripts
```

---

## 🎯 Featured Projects

### 1. **School Management System**
- **Tech Stack**: Node.js, Express.js, TypeScript, PostgreSQL, Drizzle ORM, JWT, Docker
- **Features**: Role-based access control, student management, class enrollment, API documentation
- **Highlights**: Production-ready architecture, comprehensive testing, containerized deployment

### 2. **Headless E-Commerce System**
- **Tech Stack**: Node.js, Express.js, TypeScript, MongoDB, Mongoose, Zod, Swagger, Jest
- **Features**: Product catalog, guest cart system, promotional engine, order processing
- **Highlights**: Type-safe development, comprehensive API documentation, 90%+ test coverage

### 3. **Breathing & Meditation App**
- **Tech Stack**: React, Vite, TailwindCSS, Framer Motion, Node.js, Express.js, MongoDB, JWT
- **Features**: Advanced animations, gamification, progress tracking, achievement system
- **Highlights**: MERN stack implementation, SVG animations, user engagement features

### 4. **Bookmark Application**
- **Tech Stack**: NestJS, TypeScript, Prisma, PostgreSQL, Docker, Jest, Pactum
- **Features**: User authentication, bookmark management, comprehensive testing
- **Highlights**: Modern NestJS framework, Prisma ORM, end-to-end testing

### 5. **Inventory Management System**
- **Tech Stack**: Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer, Helmet
- **Features**: Real-time inventory tracking, sales management, comprehensive reporting
- **Highlights**: Business-focused solution, advanced security, transaction integrity

### 6. **Task Manager**
- **Tech Stack**: Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer
- **Features**: Task CRUD operations, email verification, OTP authentication
- **Highlights**: Clean architecture, secure authentication, educational project

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MH-Mubin/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=MH-Mubin
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit: **http://localhost:3000**

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# GitHub Integration
NEXT_PUBLIC_GITHUB_USERNAME=MH-Mubin

# Contact Form (Web3Forms)
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

### Customization

#### Update Personal Information

**Hero Section** (`components/hero-section.tsx`):
```typescript
// Update your name and title
const name = "Your Name"
const title = "Your Professional Title"
```

**About Section** (`components/about-section.tsx`):
```typescript
// Update your bio and statistics
const bio = "Your professional bio here..."
const stats = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  // ... update with your numbers
]
```

**Projects Section** (`components/projects-section.tsx`):
```typescript
// Add your projects
const projects = [
  {
    title: "Your Project Name",
    description: "Brief description",
    tech: ["React", "Node.js"], // Your tech stack
    github: "https://github.com/yourusername/project",
    // ... your project details
  }
]
```

#### Customize Styling

**Colors** (`app/globals.css`):
```css
:root {
  --bg: #0F172A;        /* Background color */
  --bg-2: #1A2847;      /* Secondary background */
  --accent: #06B6D4;    /* Accent/primary color */
}
```

**Tailwind Configuration** (`tailwind.config.js`):
```javascript
theme: {
  extend: {
    colors: {
      primaryBg: '#0F172A',
      secondaryBg: '#1A2847',
      accent: '#06B6D4'
    }
  }
}
```

---

## 📧 Contact Form Setup (Optional)

The contact form uses **Web3Forms** - a free service that sends form submissions directly to your email.

### Steps:
1. Go to [web3forms.com](https://web3forms.com)
2. Sign up (free, no credit card required)
3. Get your access key
4. Add it to `.env.local`:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```

**Features:**
- ✅ **Free forever** (250 submissions/month)
- ✅ **Email notifications** sent to your inbox
- ✅ **Spam protection** built-in
- ✅ **No backend required**

---

## 📊 Performance Features

- ⚡ **Lighthouse Score**: 95+ across all metrics
- 🎯 **Core Web Vitals**: Optimized for excellent user experience
- 📱 **Mobile Performance**: 90+ performance score on mobile devices
- ♿ **Accessibility**: WCAG 2.1 AA compliant
- 🔍 **SEO**: Complete metadata and structured data
- 🎨 **Smooth Animations**: 60fps animations with hardware acceleration

---

## 🛡️ Security & Best Practices

- **Content Security Policy**: Implemented via Next.js headers
- **Environment Variables**: Sensitive data properly secured
- **API Rate Limiting**: GitHub API calls optimized with caching
- **Input Validation**: Contact form with proper sanitization
- **HTTPS Only**: Secure connections enforced in production
- **No Sensitive Data**: No backend secrets exposed to client

---

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
npm run type-check   # Validate TypeScript types
```

---

## 🌟 What Makes This Portfolio Stand Out

### For Recruiters
1. **Professional Presentation** - Clean, modern design with attention to detail
2. **Real Projects** - Actual repositories with comprehensive documentation
3. **Technical Depth** - Advanced animations and 3D graphics implementation
4. **Live Integration** - Real-time GitHub data demonstrates active development

### For Developers
1. **Modern Tech Stack** - Latest Next.js, React, TypeScript, and Tailwind CSS
2. **Advanced Features** - 3D graphics, complex animations, and API integration
3. **Clean Architecture** - Well-structured, typed, and documented codebase
4. **Performance Optimized** - Lighthouse scores 95+ across all metrics

### For Technical Interviews
1. **Problem Solving** - Complex animations and 3D rendering solutions
2. **Performance Optimization** - Lazy loading, code splitting, and caching strategies
3. **User Experience** - Intuitive navigation and accessibility features
4. **SEO Knowledge** - Complete metadata and structured data implementation

---

## � Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use different port
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run type-check  # Check TypeScript errors
npm run lint        # Check code style issues
```

### GitHub API Rate Limit
- **Limit**: 60 requests/hour without authentication
- **Solution**: Add GitHub token (optional) or wait for reset
- **Cache**: Stats are cached in browser for 1 hour

### Contact Form Not Working
- **Check**: Web3Forms access key in `.env.local`
- **Verify**: Key is correct and account is active
- **Test**: Try submitting a test message

---

## 🤝 Contact & Connect

- **Email**: [mahmud.h.mubin@gmail.com](mailto:mahmud.h.mubin@gmail.com)
- **GitHub**: [@MH-Mubin](https://github.com/MH-Mubin)
- **LinkedIn**: [Mahmud Hasan Mubin](https://linkedin.com/in/mh-mubin)
- **Portfolio**: [Live Demo](https://mahmud-mubin.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment and hosting
- **Framer Motion** - For smooth animation capabilities
- **Three.js** - For 3D graphics and interactions
- **Web3Forms** - For contact form functionality

---

**Built with ❤️ using Next.js, React, TypeScript, and modern web technologies**

*Showcasing full stack development expertise through interactive design and cutting-edge technology.*