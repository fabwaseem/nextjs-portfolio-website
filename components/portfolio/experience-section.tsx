"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GitCommit,
  GitBranch,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Experience data - will come from database later
const experiences = [
  {
    id: "1",
    role: "Senior Full Stack Developer",
    company: "Tech Innovations Inc",
    companyUrl: "https://example.com",
    location: "Remote",
    period: "2022 - Present",
    type: "Full-time",
    description:
      "Leading development of scalable web applications using Next.js, TypeScript, and cloud infrastructure. Mentoring junior developers and establishing best practices.",
    achievements: [
      "Reduced page load time by 60% through optimization",
      "Built microservices architecture serving 1M+ users",
      "Led migration from legacy system to modern stack",
    ],
    technologies: ["Next.js", "TypeScript", "AWS", "PostgreSQL"],
    commitHash: "a3f2b1c",
  },
  {
    id: "2",
    role: "Full Stack Developer",
    company: "Digital Solutions Co",
    companyUrl: "https://example.com",
    location: "New York, NY",
    period: "2020 - 2022",
    type: "Full-time",
    description:
      "Developed and maintained multiple client-facing applications. Collaborated with design team to implement pixel-perfect UIs with excellent UX.",
    achievements: [
      "Shipped 15+ production applications",
      "Implemented CI/CD pipelines reducing deploy time by 80%",
      "Created reusable component library used across projects",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    commitHash: "7e4d5f8",
  },
  {
    id: "3",
    role: "Frontend Developer",
    company: "StartUp Labs",
    companyUrl: "https://example.com",
    location: "San Francisco, CA",
    period: "2018 - 2020",
    type: "Full-time",
    description:
      "Built interactive web applications and dashboards. Focused on creating responsive, accessible, and performant user interfaces.",
    achievements: [
      "Developed real-time dashboard used by 500+ daily users",
      "Improved accessibility score from 65 to 98",
      "Mentored 3 junior developers",
    ],
    technologies: ["React", "JavaScript", "SASS", "Redux"],
    commitHash: "2c9a8b1",
  },
];

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="git-commit group"
    >
      <div className="relative pl-8 pb-8 border-l-2 border-border group-last:border-transparent">
        {/* Commit dot */}
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20" />

        {/* Commit hash */}
        <div className="flex items-center gap-2 mb-3 -ml-2">
          <GitCommit className="w-4 h-4 text-muted-foreground" />
          <code className="text-xs text-muted-foreground font-mono">
            {experience.commitHash}
          </code>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {experience.period}
          </span>
        </div>

        {/* Card */}
        <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {experience.role}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                >
                  {experience.company}
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <span className="flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs shrink-0">
              {experience.type}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4">{experience.description}</p>

          {/* Achievements */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <GitBranch className="w-4 h-4 text-primary" />
              Key Achievements
            </div>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-terminal-green mt-1">+</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dots-dense opacity-40" />
      <div className="absolute inset-0 bg-aurora opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <GitCommit className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">
              git log --oneline
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Experience{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey, one commit at a time
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {/* Branch indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6 text-sm text-muted-foreground font-mono"
          >
            <GitBranch className="w-4 h-4 text-terminal-green" />
            <span className="text-terminal-green">main</span>
            <span>*</span>
          </motion.div>

          {/* Experience Cards */}
          <div className="relative">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={exp.id} experience={exp} index={idx} />
            ))}

            {/* Initial commit */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: experiences.length * 0.15 }}
              className="relative pl-8"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted border-4 border-background" />
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-muted-foreground" />
                <code className="text-xs text-muted-foreground font-mono">
                  initial commit
                </code>
                <span className="text-xs text-muted-foreground">
                  — Started coding journey 🚀
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
