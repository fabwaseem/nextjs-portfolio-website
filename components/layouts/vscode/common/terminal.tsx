"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TerminalLink {
  name: string;
  url: string;
  icon: LucideIcon;
  command: string;
  username: string;
}

interface TerminalProps {
  title?: string;
  links: TerminalLink[];
  isInView?: boolean;
  delay?: number;
}

export function Terminal({
  title = "social-links.sh",
  links,
  isInView = true,
  delay = 0,
}: TerminalProps) {
  return (
    <div className="terminal-window ">
      <div className="terminal-header">
        <div className="editor-dots">
          <div className="editor-dot editor-dot-red" />
          <div className="editor-dot editor-dot-yellow" />
          <div className="editor-dot editor-dot-green" />
        </div>
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-content">
        <div className="text-muted-foreground text-xs mb-3">
          # Connect with me
        </div>
        <ScrollArea className="w-full">
          <div className="space-y-2 pr-4">
            {links.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: delay + idx * 0.1 }}
                className="flex items-center gap-3 py-2 px-2 -mx-2 rounded hover:bg-editor-selection transition-colors group whitespace-nowrap"
              >
                <span className="text-terminal-green shrink-0">❯</span>
                <span className="text-terminal-cyan font-mono text-sm shrink-0">
                  {link.command}
                </span>
                <span className="text-muted-foreground shrink-0">→</span>
                <span className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors shrink-0">
                  <link.icon className="w-4 h-4" />
                  {link.username}
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </motion.a>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>
        <div className="pt-2 mt-2 border-t border-border">
          <span className="text-terminal-green">❯</span>
          <span className="text-muted-foreground ml-3 text-sm">_</span>
          <span className="inline-block w-2 h-4 bg-primary ml-1 cursor-blink" />
        </div>
      </div>
    </div>
  );
}
