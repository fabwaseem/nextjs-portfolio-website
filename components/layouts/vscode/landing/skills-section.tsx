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
} from "lucide-react";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  skills: { name: string; level: number }[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Globe,
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Web3.js", level: 85 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 95 },
      { name: "GraphQL", level: 75 },
      { name: "Authentication", level: 90 },
      { name: "Express.js", level: 88 },
    ],
  },
  {
    id: "web3",
    name: "Web3 & Blockchain",
    icon: Lock,
    skills: [
      { name: "Solidity", level: 85 },
      { name: "Smart Contracts", level: 85 },
      { name: "Ethereum", level: 90 },
      { name: "DApp Development", level: 88 },
      { name: "Web3.js / Ethers.js", level: 85 },
      { name: "Hardhat / Truffle", level: 80 },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Prisma ORM", level: 90 },
      { name: "Redis", level: 75 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    icon: Settings,
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Linux / CLI", level: 85 },
      { name: "CI/CD", level: 80 },
      { name: "AWS", level: 75 },
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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const activeSkills =
    skillCategories.find((cat) => cat.id === activeCategory)?.skills || [];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate skill bars on scroll
      gsap.fromTo(
        ".skill-bar-fill",
        { width: "0%" },
        {
          width: "var(--skill-level)",
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-code-dots" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
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
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
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
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
              className="skills-container"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {activeSkills.map((skill, idx) => {
                  const category = skillCategories.find(
                    (c) => c.id === activeCategory
                  );
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: idx * 0.05 }}
                      className="p-6 rounded-xl bg-card/5 backdrop-blur-[2px] border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground font-mono font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden relative">
                        <motion.div
                          className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                          style={
                            {
                              "--skill-level": `${skill.level}%`,
                            } as React.CSSProperties
                          }
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
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
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: 0.4 + idx * 0.05 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium cursor-default group"
                >
                  <skill.icon className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
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
