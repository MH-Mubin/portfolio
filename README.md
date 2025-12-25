# 🚀 Mahmud Hasan Mubin - Professional Portfolio

A stunning, modern portfolio website showcasing backend development expertise with **3D animations**, **smooth interactions**, and **live GitHub integration**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)

## ✨ Features

### 🎨 Visual Excellence
- **3D Tech Icons** - Floating tech badges with authentic brand colors
- **Smooth Animations** - Framer Motion throughout every section
- **Interactive Elements** - Hover effects, 3D transforms, glow effects
- **Responsive Design** - Perfect on all devices (mobile, tablet, desktop)

### 💻 Technical Highlights
- **Live GitHub Stats** - Real-time repository data and statistics
- **Interactive Skills** - Filterable skills with animated progress bars
- **Project Showcase** - Featured projects with 3D hover effects
- **Contact Form** - Integrated with Web3Forms (free service)
- **SEO Optimized** - Complete metadata and structured data

### 🚀 Performance
- **Fast Loading** - Optimized for speed (< 3 seconds)
- **60fps Animations** - Smooth performance on all devices
- **Responsive Particles** - Adaptive 3D rendering based on screen size
- **No Backend Needed** - Pure frontend magic ✨

---

## 🎯 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher

### Installation & Setup

1. **Clone or Download** this repository
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Web3Forms key:
   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=MH-Mubin
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and visit: **http://localhost:3000**

That's it! 🎉 **No backend setup, no database, no complexity.**

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
│   ├── about-section.tsx        # Animated counters & skill cards
│   ├── contact-section.tsx      # Contact form with Web3Forms
│   ├── footer.tsx               # Footer with back-to-top button
│   ├── github-section.tsx       # Live GitHub statistics
│   ├── hero-section.tsx         # 3D particles & hero content
│   ├── navbar.tsx               # Responsive navigation
│   ├── particle-background.tsx  # 3D floating tech icons
│   ├── projects-section.tsx     # Project showcase with 3D effects
│   └── skills-section.tsx       # Interactive skills with filtering
│
├── 📁 types/                    # TypeScript Definitions
│   └── index.ts                 # Global type definitions
│
├── 📄 Configuration Files
├── package.json                 # Dependencies & scripts
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS config
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Environment variables template
└── .gitignore                   # Git ignore rules
```

---

## 🎨 Customization Guide

### 1. Update Your Personal Information

**Hero Section** (`components/hero-section.tsx`):
```typescript
// Update your name and title
const name = "Your Name"
const title = "Your Professional Title"
const description = "Your professional description"
```

**About Section** (`components/about-section.tsx`):
```typescript
// Update your bio and statistics
const bio = "Your professional bio here..."
const stats = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Projects Completed', value: 20, suffix: '+' },
  // ... update with your numbers
]
```

**Contact Information** (`components/contact-section.tsx`):
```typescript
// Update your contact details
const contactInfo = [
  { label: 'Email', value: 'your.email@example.com', href: 'mailto:your.email@example.com' },
  { label: 'Phone', value: '+1234567890', href: 'tel:+1234567890' },
  { label: 'GitHub', value: '@yourusername', href: 'https://github.com/yourusername' },
  // ... update with your information
]
```

### 2. Add Your Projects

Edit `components/projects-section.tsx`:
```typescript
const projects = [
  {
    title: "Your Project Name",
    description: "Brief description",
    longDescription: "Detailed description of your project",
    tech: ["React", "Node.js", "PostgreSQL"], // Your tech stack
    github: "https://github.com/yourusername/project",
    live: "https://yourproject.com", // Optional
    metrics: [
      { label: "Users", value: "1K+" },
      { label: "Performance", value: "99%" },
      // ... your project metrics
    ],
    gradient: "from-purple-400 via-pink-500 to-red-500"
  },
  // ... add more projects
]
```

### 3. Update Your Skills

Edit `components/skills-section.tsx`:
```typescript
const skills = [
  { name: 'Your Skill', level: 90, category: 'Backend', icon: '🚀' },
  { name: 'Another Skill', level: 85, category: 'Database', icon: '🗄️' },
  // ... add your skills with proficiency levels
]
```

### 4. Change GitHub Username

Update `.env.local`:
```env
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
```

### 5. Customize Colors & Styling

Edit `app/globals.css`:
```css
:root {
  --bg: #0F172A;        /* Background color */
  --bg-2: #1A2847;      /* Secondary background */
  --accent: #06B6D4;    /* Accent/primary color */
  --text: #F1F5F9;      /* Primary text color */
  --text-secondary: #94A3B8; /* Secondary text color */
}
```

---

## �  Contact Form Setup (Optional)

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

## 🚀 Deployment

### Deploy to Vercel (Recommended - 2 minutes)

1. **Push your code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Add environment variables** (if using Web3Forms):
   - `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
   - `NEXT_PUBLIC_WEB3FORMS_KEY`: Your Web3Forms access key
6. **Click "Deploy"**

**Done!** Your portfolio is live in ~2 minutes. 🎉

### Alternative: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### Other Deployment Options
- **Netlify**: Drag & drop the build folder
- **GitHub Pages**: Use Next.js static export
- **Any static hosting**: Build and upload the output

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR (for GitHub API)
- **Contact Form**: Web3Forms (free service)
- **Deployment**: Vercel (recommended)

---

## 📊 Performance Features

- ⚡ **Fast load times** (< 3 seconds)
- 🎯 **60fps animations** on all devices
- 📱 **Mobile-first responsive** design
- ♿ **WCAG accessibility** compliant
- 🔍 **SEO optimized** with complete metadata
- 🎨 **3D graphics** with performance optimization
- 🔄 **Live GitHub API** integration with caching

---

## 🎯 What Makes This Portfolio Stand Out

### For Recruiters
1. **Immediate Visual Impact** - 3D tech icons show modern skills
2. **Professional Polish** - Smooth animations show attention to detail
3. **Live Data** - GitHub stats prove active development
4. **Production Ready** - Professional code quality and architecture

### For Developers
1. **Modern Tech Stack** - Latest Next.js, React, TypeScript
2. **3D Graphics** - Three.js implementation with performance optimization
3. **Advanced Animations** - Framer Motion mastery throughout
4. **Clean Architecture** - Well-structured, typed, and documented code
5. **Smart Decisions** - Frontend-only approach for simplicity

### For Interviewers
1. **Problem Solving** - Complex animations and 3D rendering
2. **Performance Optimization** - Responsive particle counts, caching
3. **User Experience** - Intuitive navigation and interactions
4. **Accessibility** - WCAG compliant features and keyboard navigation
5. **SEO Knowledge** - Complete metadata and structured data

---

## 🐛 Troubleshooting

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

## 📚 Available Scripts

```bash
npm run dev          # Start development server (hot reload)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
npm run type-check   # Validate TypeScript types
```

---

## 🎉 What You Get

✅ **Visually Stunning Portfolio** - 3D animations, smooth effects  
✅ **Fully Functional** - GitHub stats, contact form, responsive design  
✅ **Production Ready** - SEO optimized, fast loading, accessible  
✅ **Easy to Deploy** - Push to GitHub and deploy to Vercel  
✅ **Free to Host** - No monthly costs, no backend complexity  
✅ **Simple to Maintain** - Update content, push changes, done!  

---

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you make improvements, consider sharing them back with the community.

## 📧 Contact & Support

- **Email**: mahmud.h.mubin@gmail.com
- **GitHub**: [@MH-Mubin](https://github.com/MH-Mubin)
- **LinkedIn**: [Mahmud Hasan Mubin](https://linkedin.com/in/mh-mubin)

---

**Built with ❤️ using Next.js, React, Three.js, and Framer Motion**

**No backend. No complexity. Just pure frontend magic.** ✨

---

## 🚀 Ready to Impress?

Your professional portfolio is ready to help you land your next role!

1. ✅ **Customize** with your information
2. ✅ **Deploy** to Vercel (2 minutes)
3. ✅ **Share** with recruiters and on LinkedIn
4. ✅ **Get hired!** 🎉

**Good luck with your job search!** 🚀