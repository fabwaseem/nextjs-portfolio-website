"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUpRight,
  Terminal,
  Heart,
} from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/waseemanjum",
    icon: Github,
    command: "git remote -v",
    username: "@waseemanjum",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/waseemanjum",
    icon: Linkedin,
    command: "open linkedin.com",
    username: "/in/waseemanjum",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/waseemanjum",
    icon: Twitter,
    command: "curl twitter.com",
    username: "@waseemanjum",
  },
  {
    name: "Email",
    url: "mailto:hello@waseemanjum.com",
    icon: Mail,
    command: "mail --compose",
    username: "hello@waseemanjum.com",
  },
];

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots-sparse opacity-30" />
      <div className="absolute inset-0 bg-spotlight-bottom opacity-50" />
      <div className="absolute top-0 left-0 right-0 glow-line" />

      <div className="container mx-auto px-4 relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Have a project in mind? I&apos;m always open to discussing new
            opportunities and ideas.
          </p>
          <Link
            href="mailto:hello@waseemanjum.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:scale-105 glow-primary"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Terminal-style Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="editor-dots">
                <div className="editor-dot editor-dot-red" />
                <div className="editor-dot editor-dot-yellow" />
                <div className="editor-dot editor-dot-green" />
              </div>
              <span className="terminal-title">social-links.sh</span>
            </div>
            <div className="terminal-content space-y-2">
              <div className="text-muted-foreground text-xs mb-3">
                # Connect with me
              </div>
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 py-2 px-2 -mx-2 rounded hover:bg-editor-selection transition-colors group"
                >
                  <span className="text-terminal-green">❯</span>
                  <span className="text-terminal-cyan font-mono text-sm">
                    {link.command}
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <span className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
                    <link.icon className="w-4 h-4" />
                    {link.username}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
              <div className="pt-2 mt-2 border-t border-border">
                <span className="text-terminal-green">❯</span>
                <span className="text-muted-foreground ml-3 text-sm">_</span>
                <span className="inline-block w-2 h-4 bg-primary ml-1 cursor-blink" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm animated-underline"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono">waseem.dev</span>
            </div>

            <div className="flex items-center gap-1">
              Built with
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              and lots of
              <span className="text-primary font-mono">&lt;code/&gt;</span>
            </div>

            <div className="font-mono text-xs">
              © {currentYear} Waseem Anjum. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
