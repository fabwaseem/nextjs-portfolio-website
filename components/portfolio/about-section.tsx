"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Coffee, Lightbulb, Rocket, Terminal } from "lucide-react";
import { CodeEditor } from "./code-editor";
import { portfolioFiles, defaultOpenFolders } from "./portfolio-files";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Years Experience", icon: Coffee },
  { value: "50+", label: "Projects Completed", icon: Rocket },
  { value: "100%", label: "Code Quality Focus", icon: Code2 },
  { value: "∞", label: "Ideas to Build", icon: Lightbulb },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Stats counter animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dots-sparse" />
      <div className="absolute inset-0 bg-aurora opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">
              ./about --verbose
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate developer who transforms ideas into elegant,
            production-ready solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Hey there! I&apos;m a{" "}
                <span className="text-foreground font-medium">
                  Full Stack Developer
                </span>{" "}
                with a deep passion for crafting beautiful, performant web
                applications that solve real problems.
              </p>
              <p>
                My journey in development started with curiosity and has evolved
                into a love for{" "}
                <span className="text-primary">clean architecture</span>,{" "}
                <span className="text-primary">modern frameworks</span>, and{" "}
                <span className="text-primary">
                  exceptional user experiences
                </span>
                .
              </p>
              <p>
                I believe in writing code that&apos;s not just functional, but
                maintainable, scalable, and a joy for other developers to work
                with. Every project is an opportunity to push boundaries and
                deliver something extraordinary.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open source, or brewing the
                perfect cup of coffee to fuel the next coding session.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="stat-item text-center p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
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
              defaultOpenFile="about.tsx"
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
