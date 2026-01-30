"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
    role: "Full Stack Developer",
    company: "Nalikes",
    companyUrl: "https://nalikes.com/",
    location: "Remote",
    period: "2023 - Present",
    type: "Full-time",
    description:
      "Building Web3 products in weeks, not months. Developing decentralized applications (DApps), smart contracts, and full-stack solutions for Web3 startups and founders.",
    achievements: [
      "Built 20+ production DApps and Web3 products",
      "Developed smart contracts for NFT, DeFi, and gaming projects",
      "Delivered projects in 4-6 weeks consistently",
      "Contributed to products generating $100M+ in revenue",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Solidity",
      "Web3.js",
      "Ethereum",
      "Node.js",
    ],
    commitHash: "nal1k3s",
  },
  {
    id: "2",
    role: "Full Stack & Web3 Developer",
    company: "Freelancer",
    companyUrl: "#",
    location: "Remote",
    period: "2021 - Present",
    type: "Freelance",
    description:
      "Working with startups and businesses to build scalable web applications and Web3 solutions. Specializing in rapid development and delivering production-ready products.",
    achievements: [
      "Completed 30+ freelance projects successfully",
      "Built custom DApps and blockchain integrations",
      "Delivered full-stack solutions for various industries",
      "Maintained 100% client satisfaction rate",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Web3",
    ],
    commitHash: "fr33l4nc3",
  },
];

function ExperienceCard({
  experience,
  index,
  isInView,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isInView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.96 }
      }
      transition={{
        duration: 0.6,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex w-full items-start gap-6 md:gap-10 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Spacer for opposite side on desktop */}
      <div className="hidden flex-1 md:block" aria-hidden="true" />

      {/* Content card */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <GitCommit className="w-4 h-4 text-muted-foreground shrink-0" />
          <code className="text-xs text-muted-foreground font-mono">
            {experience.commitHash}
          </code>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {experience.period}
          </span>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-colors shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {experience.role}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
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

          <p className="text-muted-foreground mb-4">{experience.description}</p>

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

function TimelineNode({
  isInView,
  alignWithCard = false,
}: {
  isInView: boolean;
  alignWithCard?: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-10 flex h-5 w-5 items-center justify-center ${
        alignWithCard ? "top-[2.625rem] md:top-[3.625rem]" : "top-0"
      } ${alignWithCard ? "-translate-y-1/2" : "-translate-y-0.5"} left-1 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2`}
    >
      <span className="absolute h-5 w-5 rounded-full bg-primary/20 shadow-[0_0_20px_var(--primary)]" />
      <span className="absolute h-3 w-3 rounded-full border-2 border-background bg-primary shadow-lg shadow-primary/40" />
    </motion.div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.45, 0.9], [0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-code-block" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-aurora opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
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

        {/* Branch indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-12 text-sm text-muted-foreground font-mono"
        >
          <GitBranch className="w-4 h-4 text-terminal-green" />
          <span className="text-terminal-green">main</span>
          <span>*</span>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Wrapper so line height = items only (stops before initial commit) */}
          <div className="relative">
            {/* Vertical line – left on small screens, center on md+ */}
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="absolute left-1 top-8 bottom-0 w-px origin-top bg-gradient-to-b from-border via-primary/50 to-border md:left-1/2 md:top-12 md:-translate-x-1/2"
            />

            {/* Timeline items only – line ends at bottom of this */}
            <div className="relative space-y-0">
              {experiences.map((exp, idx) => (
                <TimelineItem
                  key={exp.id}
                  experience={exp}
                  index={idx}
                  isLast={idx === experiences.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Initial commit – below the line, left on small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSectionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative flex flex-col pt-6 pb-0 md:items-center"
          >
            <div className="absolute left-1 top-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-muted md:left-1/2" />
            <div className="flex items-center gap-2 pt-6 pl-6 md:justify-center md:pl-0">
              <GitCommit className="w-4 h-4 text-muted-foreground" />
              <code className="text-xs text-muted-foreground font-mono">
                initial commit
              </code>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  experience,
  index,
  isLast,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isLast: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <div ref={cardRef} className="relative flex flex-col">
      {/* Node on the line */}
      <div className="relative flex items-start pt-8 md:pt-12">
        <TimelineNode isInView={isInView} alignWithCard />
        <div className="w-full pl-6 pr-0 md:pl-4 md:pr-0">
          <ExperienceCard
            experience={experience}
            index={index}
            isInView={isInView}
          />
        </div>
      </div>
      {/* Connector line to next (only between items) */}
      {!isLast && (
        <div className="relative h-0 w-full">
          <div className="absolute left-1 top-0 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 to-transparent md:left-1/2 md:h-8" />
        </div>
      )}
    </div>
  );
}
