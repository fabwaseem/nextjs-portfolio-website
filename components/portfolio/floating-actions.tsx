"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Moon, Sun, Palette, Check, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useColorScheme } from "@/lib/themes";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { ColorScheme } from "@/lib/themes/theme-config";
import { cn } from "@/lib/utils";

interface FloatingActionsProps {
  className?: string;
  showScrollTopAfter?: number; // Show scroll to top after scrolling this many pixels
}

export function FloatingActions({
  className,
  showScrollTopAfter = 300,
}: FloatingActionsProps) {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const originalThemeRef = useRef<ColorScheme | null>(null);
  const { setTheme, theme: themeMode } = useTheme();
  const {
    colorScheme,
    setColorScheme,
    availableThemes,
    isLoadingThemes,
    applyThemePreview,
    getPreviewColors,
  } = useColorScheme();

  // Calculate scroll progress
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    setScrollProgress(Math.min(progress, 100));
    setShowScrollTop(scrollTop > showScrollTopAfter);
  }, [showScrollTopAfter]);

  useEffect(() => {
    setMounted(true);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle dialog open/close
  const handleDialogOpen = (open: boolean) => {
    setIsThemeDialogOpen(open);
    if (open) {
      originalThemeRef.current = colorScheme;
    } else {
      // Reset to the saved theme when closing
      applyThemePreview(null);
    }
  };

  // Handle theme hover - apply preview
  const handleThemeHover = (themeId: ColorScheme) => {
    if (themeId !== originalThemeRef.current) {
      applyThemePreview(themeId);
    }
  };

  // Handle theme leave - reset to saved theme
  const handleThemeLeave = useCallback(() => {
    applyThemePreview(null);
  }, [applyThemePreview]);

  // Handle theme click - save and close
  const handleThemeClick = (themeId: ColorScheme) => {
    setColorScheme(themeId);
    originalThemeRef.current = themeId;
    setIsThemeDialogOpen(false);
  };

  if (!mounted) return null;

  // Calculate the circumference and offset for the progress ring
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col gap-3",
        className
      )}
    >
      {/* Theme Switcher - Always visible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CommandDialog
          open={isThemeDialogOpen}
          onOpenChange={handleDialogOpen}
          title="Select Theme"
          description="Choose a color scheme"
          className="max-w-md"
        >
          <CommandInput placeholder="Search theme..." />
          <ScrollArea className="h-[400px]">
            <CommandList className="max-h-none">
              <CommandEmpty>No theme found.</CommandEmpty>
              {isLoadingThemes ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <CommandGroup heading="Color Schemes">
                  {availableThemes.map((t) => {
                    const themeColors = getPreviewColors(t.id);
                    return (
                      <CommandItem
                        key={t.id}
                        value={`${t.name} ${t.description} ${t.id}`}
                        onMouseEnter={() => handleThemeHover(t.id)}
                        onMouseLeave={handleThemeLeave}
                        onSelect={() => handleThemeClick(t.id)}
                        className={cn(
                          "flex items-center justify-between gap-3 cursor-pointer",
                          colorScheme === t.id && "bg-primary/10"
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Color Palette Dots */}
                          <div className="flex items-center gap-1 shrink-0">
                            {themeColors.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-full border border-border/50"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {t.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {t.description}
                            </p>
                          </div>
                        </div>
                        {colorScheme === t.id && (
                          <Check className="w-4 h-4 shrink-0 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
              <CommandGroup heading="Appearance">
                <CommandItem
                  onSelect={() => setTheme("light")}
                  className={cn(
                    "flex items-center justify-between cursor-pointer",
                    themeMode === "light" && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </div>
                  {themeMode === "light" && (
                    <Check className="w-4 h-4 shrink-0 text-primary" />
                  )}
                </CommandItem>
                <CommandItem
                  onSelect={() => setTheme("dark")}
                  className={cn(
                    "flex items-center justify-between cursor-pointer",
                    themeMode === "dark" && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </div>
                  {themeMode === "dark" && (
                    <Check className="w-4 h-4 shrink-0 text-primary" />
                  )}
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CommandDialog>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsThemeDialogOpen(true)}
          className="relative w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg hover:border-primary/50 transition-colors flex items-center justify-center group"
          aria-label="Change theme"
        >
          <Palette className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>
      </motion.div>

      {/* Scroll to Top with Progress Ring - Shows after scroll */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            className="relative w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg hover:border-primary/50 transition-colors flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            {/* Progress Ring */}
            <svg
              className="absolute inset-0 -rotate-90 w-12 h-12"
              viewBox="0 0 48 48"
            >
              {/* Background ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border"
              />
              {/* Progress ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-primary transition-all duration-150"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>

            {/* Arrow Icon */}
            <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />

            {/* Progress Percentage (optional, shown on hover) */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-card/90 px-2 py-1 rounded border border-border whitespace-nowrap">
              {Math.round(scrollProgress)}%
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
