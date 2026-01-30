"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ChevronRight, Code2, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CodeEditor } from "../common/code-editor";

import { Typewriter } from "../common/text-effects";
import { useFeaturedProjects } from "@/hooks/use-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  getPortfolioFilesWithProjects,
  portfolioFiles,
} from "../common/portfolio-files";

gsap.registerPlugin(ScrollTrigger);

// Roles to cycle through
const roles = [
  "Full Stack Developer",
  "Web3 Developer",
  "DApp Builder",
  "React Specialist",
  "Node.js Expert",
  "TypeScript Enthusiast",
  "UI/UX Developer",
  "Cloud Architect",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const { data } = useFeaturedProjects(6);
  const editorFiles =
    (data?.projects?.length ?? 0) > 0
      ? getPortfolioFilesWithProjects(data!.projects)
      : portfolioFiles;

  // Terminal typing state
  const [terminalText, setTerminalText] = useState("");
  const [showTerminalOutput, setShowTerminalOutput] = useState(false);
  const [terminalStarted, setTerminalStarted] = useState(false);

  // Start terminal after a delay
  useEffect(() => {
    if (isInView && !terminalStarted) {
      const timer = setTimeout(() => setTerminalStarted(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView, terminalStarted]);

  // Terminal typing effect
  useEffect(() => {
    if (!terminalStarted) return;

    const command = "npm run build:amazing";

    if (terminalText.length < command.length) {
      const timer = setTimeout(() => {
        setTerminalText((prev) => command.slice(0, prev.length + 1));
      }, 40 + Math.random() * 20);
      return () => clearTimeout(timer);
    } else if (!showTerminalOutput) {
      setTimeout(() => setShowTerminalOutput(true), 300);
    }
  }, [terminalStarted, terminalText, showTerminalOutput]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate title
      const title = titleRef.current;
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      // Animate editor window
      if (editorRef.current) {
        gsap.fromTo(
          editorRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // Terminal content with typing effect
  const terminalContent = (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="text-terminal-green">❯</span>
      <span className="text-muted-foreground">
        {terminalText.split("build:amazing")[0]}
      </span>
      <span className="text-terminal-cyan">
        {terminalText.includes("build:amazing")
          ? "build:amazing"
          : terminalText.split("npm run")[1] || ""}
      </span>
      {!showTerminalOutput && terminalStarted && (
        <motion.span
          className="inline-block w-2 h-3 bg-primary"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      )}
      <AnimatePresence>
        {showTerminalOutput && (
          <motion.span
            className="text-terminal-green"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            ✓ Ready to deploy
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-terminal-grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-spotlight" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 gradient-fade-down"
        aria-hidden="true"
      />

      {/* Floating orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "oklch(from var(--primary) l c h / 8%)" }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
            style={{ background: "oklch(from var(--primary) l c h / 6%)" }}
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="container mx-auto px-4 py-20 pb-32 md:pb-40 relative z-10">
        <div className="grid lg:grid-cols-2 gap-3 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">
                Available for new projects
              </span>
            </motion.div>

            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
            >
              <motion.span
                className="block text-muted-foreground text-lg md:text-xl lg:text-2xl font-normal mb-2 leading-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.1 }
                }
              >
                Hello, I&apos;m
              </motion.span>
              <motion.span
                className="block bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent py-1 leading-[1.15]"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.2 }
                }
              >
                Waseem Anjum
              </motion.span>
              <motion.span
                className="block text-2xl md:text-3xl lg:text-4xl mt-2 font-normal h-[1.3em]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.5 }
                }
              >
                <Typewriter
                  words={roles}
                  className="text-primary"
                  typingSpeed={80}
                  deletingSpeed={40}
                  delayBetweenWords={2500}
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.3 }
              }
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              I craft modern, high-performance applications and decentralized
              solutions with clean code and exceptional user experiences.
              Let&apos;s build something extraordinary together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.4 }
              }
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="group gap-2 glow-primary relative overflow-hidden focus-visible:ring-2 focus-visible:ring-primary/50"
                  onClick={() => {
                    const isOnHomePage = window.location.pathname === "/";
                    if (isOnHomePage) {
                      const element = document.getElementById("projects");
                      if (element) {
                        element.scrollIntoView({
                          behavior: prefersReducedMotion ? "auto" : "smooth",
                        });
                      }
                    } else {
                      window.location.href = "/#projects";
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      const isOnHomePage = window.location.pathname === "/";
                      if (isOnHomePage) {
                        const element = document.getElementById("projects");
                        if (element) {
                          element.scrollIntoView({
                            behavior: prefersReducedMotion ? "auto" : "smooth",
                          });
                        }
                      } else {
                        window.location.href = "/#projects";
                      }
                    }
                  }}
                >
                  <Code2 className="w-5 h-5 relative z-10" aria-hidden="true" />
                  <span className="relative z-10">View My Work</span>
                  <ChevronRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10"
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Button>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group gap-2 relative overflow-hidden border-2 hover:border-primary/50 transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Link href="/contact">
                    <Mail
                      className="w-5 h-5 relative z-10 group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    />
                    <span className="relative z-10">Get in Touch</span>
                    <motion.div
                      className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Code editor */}
          <motion.div
            ref={editorRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 0.3 }
            }
          >
            <CodeEditor
              files={editorFiles}
              defaultOpenFile="about.tsx"
              defaultOpenFolders={["portfolio", "components"]}
              showFileTree={true}
              showTabs={true}
              showTerminal={true}
              terminalContent={terminalContent}
              typingEffect={true}
              typingSpeed={25}
              className="max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - positioned outside container */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { delay: 2, duration: 0.6, ease: "easeOut" }
        }
      >
        <motion.button
          className="flex flex-col items-center gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg p-2 -m-2 transition-all pointer-events-auto touch-action: manipulation"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: prefersReducedMotion ? "auto" : "smooth",
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.scrollTo({
                top: window.innerHeight,
                behavior: prefersReducedMotion ? "auto" : "smooth",
              });
            }
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          aria-label="Scroll to next section"
        >
          <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider group-hover:text-foreground transition-colors">
            Scroll to explore…
          </span>
          <div className="relative flex flex-col items-center gap-2">
            <div className="relative w-6 h-10">
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30 group-hover:border-primary/50 transition-colors"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div className="absolute inset-0 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5 group-hover:border-primary transition-colors">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ y: [0, 16, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </>
              )}
            </div>
            {!prefersReducedMotion ? (
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <ArrowDown
                  className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
              </motion.div>
            ) : (
              <ArrowDown
                className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors"
                aria-hidden="true"
              />
            )}
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
