"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeEditor } from "./code-editor";
import { portfolioFiles, defaultOpenFolders } from "./portfolio-files";

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  skills: { name: string; level: number }[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 95 },
      { name: "GraphQL", level: 75 },
      { name: "Authentication", level: 90 },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
    color: "from-orange-500 to-amber-500",
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
    name: "Tools",
    icon: Settings,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Linux / CLI", level: 85 },
      { name: "CI/CD", level: 80 },
    ],
  },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
        },
      );
    },
    { scope: sectionRef, dependencies: [activeCategory] },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-circuit" />
      <div className="absolute inset-0 bg-spotlight-bottom opacity-70" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Braces className="w-4 h-4 text-primary" />
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Interactive Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="skills-container"
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg glow-primary"
                      : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border",
                  )}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Skill Bars */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {activeSkills.map((skill, idx) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "skill-bar-fill h-full rounded-full bg-gradient-to-r",
                          skillCategories.find((c) => c.id === activeCategory)
                            ?.color,
                        )}
                        style={
                          {
                            "--skill-level": `${skill.level}%`,
                          } as React.CSSProperties
                        }
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Quick Icons */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Also experienced with:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Smartphone, label: "Mobile-First" },
                  { icon: Layers, label: "Design Systems" },
                  { icon: Zap, label: "Performance" },
                  { icon: Server, label: "DevOps" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground"
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-24"
          >
            <CodeEditor
              files={portfolioFiles}
              defaultOpenFile="skills.tsx"
              defaultOpenFolders={defaultOpenFolders}
              showFileTree={true}
              showTabs={true}
              showTerminal={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
