"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
  Settings,
} from "lucide-react";
import { useSession } from "@/hooks/use-auth";

const navItems = [
  { name: "About", href: "/#about", icon: User },
  { name: "Skills", href: "/#skills", icon: Code2 },
  { name: "Projects", href: "/#projects", icon: FolderGit2 },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Blog", href: "/#blog", icon: BookOpen },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollActiveSection, setScrollActiveSection] = useState("");
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const { setTheme, resolvedTheme, theme } = useTheme();
  const { isAuthenticated } = useSession();

  // Derive mounted state from theme being resolved (next-themes handles hydration)
  const mounted = theme !== undefined;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  // Derive route-based active section from pathname
  const routeActiveSection = useMemo(() => {
    if (pathname === "/") return "";
    if (pathname.startsWith("/projects")) return "/#projects";
    if (pathname.startsWith("/blog")) return "/#blog";
    return "";
  }, [pathname]);

  // Use scroll-based section on home page, route-based otherwise
  const activeSection = pathname === "/" ? scrollActiveSection : routeActiveSection;

  // Handle scroll-based active section detection on home page
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track scroll-based active sections on home page
      if (pathname === "/") {
        const sections = ["about", "skills", "projects", "experience", "blog"];
        let currentSection = "";

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is in viewport (with some offset for navbar)
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = `/#${section}`;
              break;
            }
          }
        }

        setScrollActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  // Close mobile menu on pathname change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      // Defer setState to avoid synchronous call in effect body
      queueMicrotask(() => setIsMobileMenuOpen(false));
    }
  }, [pathname]);

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

              {/* Admin Panel Button - Only show when authenticated */}
              {isAuthenticated && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden md:flex gap-2"
                >
                  <Link href="/admin/dashboard">
                    <Settings className="w-4 h-4" />
                    Admin
                  </Link>
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
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Contact & Admin */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 space-y-3"
                >
                  <Button asChild className="w-full gap-2">
                    <Link href="/contact">
                      <Mail className="w-4 h-4" />
                      Get In Touch
                    </Link>
                  </Button>

                  {/* Admin Panel Button - Only show when authenticated */}
                  {isAuthenticated && (
                    <Button asChild variant="outline" className="w-full gap-2">
                      <Link href="/admin/dashboard">
                        <Settings className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    </Button>
                  )}
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
