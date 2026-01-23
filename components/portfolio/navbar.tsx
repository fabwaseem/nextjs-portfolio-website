"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Terminal,
  Code2,
  FolderGit2,
  User,
  Briefcase,
  BookOpen,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

const navItems = [
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderGit2 },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Blog", href: "#blog", icon: BookOpen },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      const isOnHomePage = window.location.pathname === "/";
      const sectionId = href.substring(1);

      if (isOnHomePage) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  // Handle route-based active section
  useEffect(() => {
    if (pathname === "/") {
      // On home page, active section is determined by scroll
      // Don't set anything here, let scroll handler do it
    } else if (pathname.startsWith("/projects")) {
      setActiveSection("#projects");
    } else if (pathname.startsWith("/blog")) {
      setActiveSection("#blog");
    } else {
      // Reset active section on other pages
      setActiveSection("");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track scroll-based active sections on home page
      if (pathname === "/") {
        const sections = ["about", "skills", "projects", "blog", "experience"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(`#${section}`);
              break;
            }
          }
        }
      }
    };

    const hash = window.location.hash;
    if (hash && pathname === "/") {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-background/30 backdrop-blur border-b border-border shadow-sm"
            : "py-5 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-mono font-bold text-lg group"
            >
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <span className="hidden sm:inline">
                <span className="text-primary">waseem</span>
                <span className="text-muted-foreground">.dev</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    activeSection === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="relative h-9 w-9"
                  aria-label="Toggle theme"
                >
                  <Sun
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
                    )}
                  />
                  <Moon
                    className={cn(
                      "absolute h-4 w-4 transition-all duration-300",
                      isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                    )}
                  />
                </Button>
              )}

              <Button asChild size="sm" className="hidden md:flex gap-2">
                <Link href="/contact">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </Button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-background border-l border-border shadow-xl md:hidden"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Mobile nav items */}
                <div className="space-y-2">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                          activeSection === item.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                        onClick={(e) => {
                          setIsMobileMenuOpen(false);
                          if (item.href.startsWith("#")) {
                            e.preventDefault();
                            setTimeout(() => {
                              handleNavigation(item.href);
                            }, 300);
                          }
                        }}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Button asChild className="w-full gap-2">
                    <Link href="/contact">
                      <Mail className="w-4 h-4" />
                      Get In Touch
                    </Link>
                  </Button>
                </motion.div>

                {/* Terminal prompt */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 p-4 rounded-lg bg-terminal-bg border border-border font-mono text-xs"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-terminal-green">❯</span>
                    <span>cd ~/portfolio</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <span className="text-terminal-green">❯</span>
                    <span>npm run dev</span>
                    <span className="inline-block w-2 h-3 bg-primary cursor-blink" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
