"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronRight,
  Terminal,
  Code2,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "./text-effects";
import { CodeEditor } from "./code-editor";
import { portfolioFiles, defaultOpenFolders } from "./portfolio-files";

gsap.registerPlugin(ScrollTrigger);

// Roles to cycle through
const roles = [
  "Full Stack Developer",
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
      const timer = setTimeout(
        () => {
          setTerminalText((prev) => command.slice(0, prev.length + 1));
        },
        40 + Math.random() * 20,
      );
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
          },
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
          },
        );
      }

      // Parallax effect on scroll
      gsap.to(editorRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
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
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="absolute inset-0 bg-spotlight" />
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute bottom-0 left-0 right-0 h-40 gradient-fade-down" />

      {/* Floating orbs */}
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
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Available for new projects
              </span>
            </motion.div>

            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
            >
              <motion.span
                className="block text-muted-foreground text-lg md:text-xl lg:text-2xl font-normal mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Hello, I&apos;m
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Waseem Anjum
              </motion.span>
              <motion.span
                className="block text-2xl md:text-3xl lg:text-4xl mt-2 font-normal h-[1.3em]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
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
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              I craft modern, high-performance web applications with clean code
              and exceptional user experiences. Let&apos;s build something
              extraordinary together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="group gap-2 glow-primary">
                <Code2 className="w-5 h-5" />
                View My Work
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group gap-2">
                <Terminal className="w-5 h-5" />
                Get in Touch
              </Button>
            </motion.div>
          </div>

          {/* Right side - Code editor */}
          <motion.div
            ref={editorRef}
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CodeEditor
              files={portfolioFiles}
              defaultOpenFile="page.tsx"
              defaultOpenFolders={defaultOpenFolders}
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
