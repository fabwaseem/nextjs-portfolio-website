"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Braces,
  Database,
  Globe,
  Layers,
  Server,
  Settings,
  Smartphone,
  Zap,
  Lock,
  Cloud,
  Code2,
  GitBranch,
  Star,
  TrendingUp,
} from "lucide-react";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  skills: { name: string; level: number; description?: string }[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Globe,
    skills: [
      {
        name: "React / Next.js",
        level: 95,
        description: "Building dynamic UIs",
      },
      { name: "TypeScript", level: 90, description: "Type-safe development" },
      { name: "Tailwind CSS", level: 95, description: "Modern styling" },
      { name: "Framer Motion", level: 85, description: "Smooth animations" },
      { name: "HTML5 / CSS3", level: 95, description: "Web fundamentals" },
      { name: "Web3.js", level: 85, description: "Blockchain integration" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90, description: "Server-side runtime" },
      { name: "Python", level: 80, description: "Versatile backend" },
      { name: "REST APIs", level: 95, description: "API architecture" },
      { name: "GraphQL", level: 75, description: "Modern data queries" },
      {
        name: "Authentication",
        level: 90,
        description: "Secure user access",
      },
      { name: "Express.js", level: 88, description: "Web framework" },
    ],
  },
  {
    id: "web3",
    name: "Web3 & Blockchain",
    icon: Lock,
    skills: [
      { name: "Solidity", level: 85, description: "Smart contracts" },
      {
        name: "Smart Contracts",
        level: 85,
        description: "Decentralized logic",
      },
      { name: "Ethereum", level: 90, description: "Blockchain platform" },
      { name: "DApp Development", level: 88, description: "Web3 apps" },
      {
        name: "Web3.js / Ethers.js",
        level: 85,
        description: "Ethereum libraries",
      },
      {
        name: "Hardhat / Truffle",
        level: 80,
        description: "Development tools",
      },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 90, description: "Relational database" },
      { name: "MongoDB", level: 85, description: "NoSQL database" },
      { name: "Prisma ORM", level: 90, description: "Type-safe ORM" },
      { name: "Redis", level: 75, description: "In-memory cache" },
      { name: "SQL", level: 85, description: "Query language" },
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    icon: Settings,
    skills: [
      { name: "Git / GitHub", level: 95, description: "Version control" },
      { name: "Docker", level: 80, description: "Containerization" },
      { name: "VS Code", level: 95, description: "Code editor" },
      { name: "Linux / CLI", level: 85, description: "Command line" },
      { name: "CI/CD", level: 80, description: "Automation pipelines" },
      { name: "AWS", level: 75, description: "Cloud services" },
    ],
  },
];

const additionalSkills = [
  { name: "Mobile-First Design", icon: Smartphone },
  { name: "Design Systems", icon: Layers },
  { name: "Performance Optimization", icon: Zap },
  { name: "Cloud Architecture", icon: Cloud },
  { name: "Code Quality", icon: Code2 },
  { name: "Version Control", icon: GitBranch },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const activeSkills =
    skillCategories.find((cat) => cat.id === activeCategory)?.skills || [];

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      // Animate skill cards
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  const getSkillColor = (level: number) => {
    if (level >= 90) return "hsl(var(--primary))";
    if (level >= 80) return "hsl(var(--primary) / 0.8)";
    return "hsl(var(--primary) / 0.6)";
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-code-block" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
          }
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Braces className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-mono text-primary">skills.json</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tech{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.1 }
          }
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveCategory(category.id);
                }
              }}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                  : "bg-card/5 backdrop-blur-[2px] text-muted-foreground hover:bg-card hover:text-foreground border border-border hover:border-primary/30"
              )}
            >
              <category.icon className="w-4 h-4" aria-hidden="true" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.2 }
          }
          className="max-w-6xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }
              }
              className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
            >
              {activeSkills.map((skill, idx) => {
                const isHovered = hoveredSkill === skill.name;
                const category = skillCategories.find(
                  (c) => c.id === activeCategory
                );

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.4, delay: idx * 0.05 }
                    }
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="skill-card group relative"
                  >
                    {/* Card Background */}
                    <div
                      className={cn(
                        "relative p-6 rounded-xl border transition-all duration-300",
                        "bg-card/5 backdrop-blur-[2px] border-border",
                        "hover:bg-card/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                        isHovered && "scale-[1.02]"
                      )}
                    >
                      {/* Skill Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                            {skill.name}
                          </h3>
                          {skill.description && (
                            <p className="text-xs text-muted-foreground">
                              {skill.description}
                            </p>
                          )}
                        </div>
                        {category && (
                          <category.icon
                            className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors"
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      {/* Level Indicator */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-medium">
                            Proficiency
                          </span>
                          <span className="text-sm font-mono font-bold text-primary">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Circular Progress */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 10 }).map((_, i) => {
                            const threshold = (i + 1) * 10;
                            const isActive = skill.level >= threshold;
                            return (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: idx * 0.05 + i * 0.02,
                                  duration: 0.2,
                                }}
                                className={cn(
                                  "h-2 flex-1 rounded-full transition-all duration-300",
                                  isActive
                                    ? "bg-primary shadow-sm shadow-primary/20"
                                    : "bg-muted/50",
                                  isHovered &&
                                    isActive &&
                                    "shadow-md shadow-primary/30"
                                )}
                              />
                            );
                          })}
                        </div>

                        {/* Skill Level Badge */}
                        <div className="flex items-center gap-2 pt-2">
                          {skill.level >= 90 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary border-primary/20"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Expert
                            </Badge>
                          )}
                          {skill.level >= 80 && skill.level < 90 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary border-primary/20"
                            >
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Advanced
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.4 }
          }
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              Also experienced with:
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.3, delay: 0.4 + idx * 0.05 }
                }
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium cursor-default group hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <skill.icon
                    className="w-4 h-4 mr-2 text-primary"
                    aria-hidden="true"
                  />
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
