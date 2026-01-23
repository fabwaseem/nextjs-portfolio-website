"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-code-dots" />
      <div className="absolute inset-0 bg-mesh opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
          </motion.div>
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="p-6 rounded-xl bg-card/5 backdrop-blur-[2px] border border-border font-mono text-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <span className="text-terminal-green">❯</span>
                <span>cat 404.md</span>
              </div>
              <div className="space-y-2 text-left">
                <p className="text-foreground">
                  <span className="text-terminal-cyan">#</span> Page Not Found
                </p>
                <p className="text-muted-foreground">
                  <span className="text-terminal-yellow">//</span> The page
                  you&apos;re looking for doesn&apos;t exist.
                </p>
                <div className="flex items-center gap-2 text-muted-foreground mt-4">
                  <span className="text-terminal-green">❯</span>
                  <span>_</span>
                  <span className="inline-block w-2 h-4 bg-primary cursor-blink" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="gap-2 glow-primary">
              <Link href="/">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/projects">
                <FolderGit2 className="w-5 h-5" />
                Projects
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
