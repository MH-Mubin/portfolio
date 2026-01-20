"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Skill = {
  name: string;
  level: number;
  category: string;
  icon: string;
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Function to render technology logos using SVG assets
  const renderSkillIcon = (skillName: string) => {
    const iconProps = { className: "w-8 h-8" };

    // Map skill names to their corresponding SVG file names
    const svgMap: { [key: string]: string } = {
      React: "React.svg",
      JavaScript: "JavaScript.svg",
      "Node.js": "Node.js.svg",
      PostgreSQL: "PostgresSQL.svg",
      TypeScript: "TypeScript.svg",
      "Next.js": "Next.js.svg",
      MongoDB: "MongoDB.svg",
      Docker: "Docker.svg",
      NestJS: "Nest.js.svg",
      "Express.js": "Express.svg",
      Redis: "Redis.svg",
      GraphQL: "GraphQL.svg",
      "Tailwind CSS": "Tailwind CSS.svg",
      Git: "Git.svg",
      Nginx: "NGINX.svg",
      "Socket.io": "Socket.io.svg",
    };

    const svgFileName = svgMap[skillName];

    if (svgFileName) {
      return (
        <img
          src={`/Assets/${svgFileName}`}
          alt={skillName}
          className="w-8 h-8"
        />
      );
    }

    // Fallback for skills without SVG assets
    switch (skillName) {
      case "HTML/CSS":
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="#E34F26">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
          </svg>
        );
      case "Prisma ORM":
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="#2D3748">
            <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.2061-1.1908.6092L3.9034 18.7121c-.2207.3748-.2125.8128-.0133 1.1923.1992.3795.5415.6797.9579.8441l7.1428 2.8909c.3731.1506.7957.1506 1.1688 0l7.1428-2.8909c.4164-.1644.7587-.4646.9579-.8441.1992-.3795.2074-.8175-.0133-1.1923zM20.9989 19.0183l-7.1428 2.8909c-.124.0502-.2642.0502-.3882 0L6.3251 19.0183c-.1385-.0547-.2406-.1516-.3186-.2734-.0779-.1218-.0779-.2734 0-.3952L13.1493 1.8374c.0794-.1342.2186-.2186.3731-.2186.1545 0 .2937.0844.3731.2186l7.1428 16.5123c.0779.1218.0779.2734 0 .3952-.0779.1218-.1801.2187-.3186.2734z" />
          </svg>
        );
      case "REST APIs":
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="#61DAFB">
            <path d="M1.5 0A1.5 1.5 0 000 1.5v21A1.5 1.5 0 001.5 24h21a1.5 1.5 0 001.5-1.5v-21A1.5 1.5 0 0022.5 0h-21zM12 6a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
        );
      case "Clean Architecture":
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="#4ECDC4">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "CI/CD":
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="#326CE5">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 4v4H7l5 5 5-5h-4V6h-2z" />
          </svg>
        );
      default:
        return <span className="text-2xl">{skillName.charAt(0)}</span>;
    }
  };

  const skills: Skill[] = [
    // Frontend
    { name: "React", level: 85, category: "Frontend", icon: "React" },
    { name: "Next.js", level: 75, category: "Frontend", icon: "Next.js" },
    { name: "JavaScript", level: 90, category: "Frontend", icon: "JavaScript" },
    { name: "HTML/CSS", level: 85, category: "Frontend", icon: "HTML/CSS" },
    {
      name: "Tailwind CSS",
      level: 80,
      category: "Frontend",
      icon: "Tailwind CSS",
    },

    // Backend
    { name: "Node.js", level: 90, category: "Backend", icon: "Node.js" },
    { name: "NestJS", level: 75, category: "Backend", icon: "NestJS" },
    { name: "Express.js", level: 90, category: "Backend", icon: "Express.js" },
    { name: "TypeScript", level: 80, category: "Backend", icon: "TypeScript" },
    { name: "Socket.io", level: 75, category: "Backend", icon: "Socket.io" },

    // Database
    { name: "PostgreSQL", level: 80, category: "Database", icon: "PostgreSQL" },
    { name: "MongoDB", level: 85, category: "Database", icon: "MongoDB" },
    { name: "Redis", level: 75, category: "Database", icon: "Redis" },
    { name: "Prisma ORM", level: 75, category: "Database", icon: "Prisma ORM" },

    // Architecture
    {
      name: "REST APIs",
      level: 90,
      category: "Architecture",
      icon: "REST APIs",
    },
    { name: "GraphQL", level: 65, category: "Architecture", icon: "GraphQL" },

    // DevOps
    { name: "Nginx", level: 75, category: "DevOps", icon: "Nginx" },
    { name: "Docker", level: 80, category: "DevOps", icon: "Docker" },
    { name: "Git", level: 90, category: "DevOps", icon: "Git" },
    { name: "CI/CD", level: 75, category: "DevOps", icon: "CI/CD" },
  ];

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "Architecture",
    "DevOps",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const getProgressColor = (level: number) => {
    if (level >= 85) return "from-green-400 to-emerald-500";
    if (level >= 75) return "from-blue-400 to-cyan-500";
    return "from-yellow-400 to-orange-500";
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Skills & Expertise
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills and proficiency
            levels across different areas of full stack development and system
            architecture.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                  layout: { duration: 0.3 },
                }}
                className="group relative p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-transparent cursor-pointer overflow-hidden"
              >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-[1px]">
                  <div className="absolute inset-[1px] rounded-xl bg-slate-800" />
                </div>

                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  {/* Icon with rotation animation */}
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center w-12 h-12 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all duration-300"
                  >
                    {renderSkillIcon(skill.name)}
                  </motion.div>

                  {/* Skill Name */}
                  <h3 className="font-semibold text-base text-slate-200 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all duration-300">
                    {skill.name}
                  </h3>

                  {/* Category Badge with gradient on hover */}
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-400 rounded-full group-hover:bg-gradient-to-r group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30 group-hover:text-cyan-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                    {skill.category}
                  </span>
                </div>

                {/* Radial glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Continuous Learning Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 text-center"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Continuous Learning
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Technology evolves rapidly, and so do I. I'm constantly learning new
            frameworks, tools, and best practices to stay at the forefront of
            full stack development. Currently exploring{" "}
            <span className="text-cyan-400 font-semibold">Rust</span>,
            <span className="text-cyan-400 font-semibold"> Kubernetes</span>,
            and
            <span className="text-cyan-400 font-semibold">
              {" "}
              Event-Driven Architecture
            </span>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
