"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Coffee,
  Lightbulb,
  Rocket,
  Terminal,
  Smartphone,
  Cloud,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Years Experience", icon: Coffee },
  { value: "50+", label: "Projects Completed", icon: Rocket },
  { value: "100%", label: "Code Quality Focus", icon: Code2 },
  { value: "∞", label: "Ideas to Build", icon: Lightbulb },
];

const focusAreas = [
  {
    title: "Full Stack Development",
    description: "Building end-to-end solutions with modern frameworks",
    icon: Code2,
  },
  {
    title: "Web3 & DApps",
    description: "Creating decentralized applications on Ethereum",
    icon: Lock,
  },
  {
    title: "UI/UX Excellence",
    description: "Crafting beautiful and intuitive user experiences",
    icon: Smartphone,
  },
  {
    title: "Cloud Architecture",
    description: "Designing scalable and reliable cloud solutions",
    icon: Cloud,
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

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
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-code-block" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
          }
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Terminal className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-mono text-primary">
              ./about --verbose
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Me & Web3
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Full Stack & Web3 Developer crafting elegant solutions and DApps
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.2 }
            }
          >
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Hey there! I&apos;m a{" "}
                <span className="text-foreground font-medium">
                  Full Stack & Web3 Developer
                </span>{" "}
                with a passion for crafting beautiful, performant decentralized
                solutions that solve real problems.
                <span className="hidden md:inline">
                  {" "}
                  I thrive on turning complex ideas into elegant, user-friendly
                  applications.
                </span>
              </p>
              <p className="hidden md:block">
                My journey in development has evolved into a love for{" "}
                <span className="text-primary">clean architecture</span>,{" "}
                <span className="text-primary">modern frameworks</span>,{" "}
                <span className="text-primary">blockchain technology</span>, and{" "}
                <span className="text-primary">
                  exceptional user experiences
                </span>
                . I specialize in building{" "}
                <span className="text-primary">
                  decentralized applications (DApps)
                </span>{" "}
                and full-stack web solutions, bringing Web3 products to life in
                weeks, not months. From smart contracts to responsive
                interfaces, I handle every aspect of the development process.
              </p>
              <p className="hidden md:block">
                I believe in writing code that&apos;s not just functional, but
                maintainable and scalable. Every project is an opportunity to
                learn, improve, and push the boundaries of what&apos;s possible.
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open source, or diving into the
                latest Web3 innovations.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.3 }
              }
              className="stats-container mt-10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    className="stat-item text-center p-4 rounded-xl bg-card/5 backdrop-blur-[2px] border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    whileHover={
                      prefersReducedMotion ? {} : { y: -4, scale: 1.02 }
                    }
                  >
                    <stat.icon
                      className="w-4 h-4 text-primary mx-auto mb-2"
                      aria-hidden="true"
                    />
                    <div className="text-xl md:text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.3 }
            }
            className="sticky top-24"
          >
            <h3 className="text-2xl font-bold mb-6">What I Focus On</h3>
            <div className="space-y-4">
              {focusAreas.map((area, idx) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.6, delay: 0.3 + idx * 0.1 }
                  }
                  className="group relative p-6 rounded-xl bg-card/5 backdrop-blur-[2px] border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden"
                  whileHover={
                    prefersReducedMotion ? {} : { y: -2, scale: 1.02 }
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
                      <area.icon
                        className="w-6 h-6 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-1">
                        {area.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
