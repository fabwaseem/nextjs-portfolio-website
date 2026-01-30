"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUpRight,
  Terminal,
  Heart,
} from "lucide-react";
import { Terminal as TerminalComponent } from "./terminal";

const TextPressure = dynamic(
  () =>
    import("@/components/layouts/common/TextPressure").then((m) => m.default),
  { ssr: false }
);

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/fabwaseem",
    icon: Github,
    command: "git remote -v",
    username: "@fabwaseem",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/fabwaseem",
    icon: Linkedin,
    command: "open linkedin.com",
    username: "/in/fabwaseem",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/fabwaseeem",
    icon: Twitter,
    command: "curl twitter.com",
    username: "@fabwaseeem",
  },
  {
    name: "Email",
    url: "mailto:waseemaofficial@gmail.com",
    icon: Mail,
    command: "mail --compose",
    username: "waseemaofficial@gmail.com",
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
        <div className="relative z-10">
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
              href="mailto:waseemaofficial@gmail.com"
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
            <TerminalComponent
              title="social-links.sh"
              links={socialLinks}
              isInView={isInView}
              delay={0.3}
            />
          </motion.div>

          {/* Footer Links */}
          {/* <motion.div
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
          </motion.div> */}

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

              {/* <div className="flex items-center gap-1">
                Built with
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                and lots of
                <span className="text-primary font-mono">&lt;code/&gt;</span>
              </div> */}

              <div className="font-mono text-xs">
                © {currentYear} Waseem Anjum. All rights reserved.
              </div>
            </div>
          </motion.div>
        </div>

        {/* WASEEM – full width, below content, z-0 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 z-0 w-full py-8"
        >
          <div className=" w-full ">
            <TextPressure
              text="WASEEM"
              textColor="var(--primary)"
              width={true}
              weight={true}
              italic={true}
              flex={true}
              scale={false}
              minFontSize={28}
              className="select-none"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
