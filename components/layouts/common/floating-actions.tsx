"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
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
  const [highlightedValue, setHighlightedValue] = useState<string>("");
  const originalThemeRef = useRef<ColorScheme | null>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
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

  // Scroll to selected theme in the list
  const scrollToSelectedTheme = useCallback(() => {
    if (!scrollViewportRef.current) return;

    // Find the selected theme item
    const selectedItem = scrollViewportRef.current.querySelector(
      `[data-theme-id="${colorScheme}"]`
    );
    
    if (selectedItem) {
      // Get the position relative to the scroll container
      const container = scrollViewportRef.current;
      const itemTop = (selectedItem as HTMLElement).offsetTop;
      const containerHeight = container.clientHeight;
      const itemHeight = (selectedItem as HTMLElement).offsetHeight;

      // Scroll to center the selected item
      const scrollTo = itemTop - containerHeight / 2 + itemHeight / 2;
      container.scrollTop = Math.max(0, scrollTo);
    }
  }, [colorScheme]);

  // Build value string for a theme (used for cmdk value and map)
  const themeValue = (id: ColorScheme, name: string, desc: string) =>
    `${name} ${desc} ${id}`;

  // Build map from theme value to theme ID (memoized to avoid ref access during render)
  const valueToThemeIdMap = useMemo(() => {
    const map = new Map<string, ColorScheme>();
    availableThemes.forEach((t) => {
      const val = themeValue(t.id, t.name, t.description);
      map.set(val, t.id);
    });
    return map;
  }, [availableThemes]);

  // Handle dialog open/close
  const handleDialogOpen = useCallback(
    (open: boolean) => {
      setIsThemeDialogOpen(open);
      if (open) {
        originalThemeRef.current = colorScheme;
        const current = availableThemes.find((t) => t.id === colorScheme);
        setHighlightedValue(
          current ? themeValue(current.id, current.name, current.description) : ""
        );
        setTimeout(scrollToSelectedTheme, 100);
      } else {
        setHighlightedValue("");
        applyThemePreview(null);
      }
    },
    [colorScheme, availableThemes, scrollToSelectedTheme, applyThemePreview]
  );

  // Keyboard shortcut to open theme dialog (Ctrl+Shift+U / Cmd+Shift+U)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+U (Windows/Linux) or Cmd+Shift+U (Mac)
      // Using 'U' to avoid browser conflicts (T is used for reopening tabs)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "u"
      ) {
        e.preventDefault();
        if (!isThemeDialogOpen) {
          handleDialogOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isThemeDialogOpen, handleDialogOpen]);

  // Keyboard: preview theme when highlighting via arrow up/down
  const handleValueChange = useCallback(
    (value: string) => {
      setHighlightedValue(value);
      const themeId = valueToThemeIdMap.get(value);
      applyThemePreview(themeId ?? null);
    },
    [applyThemePreview, valueToThemeIdMap]
  );

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
          description="↑↓ preview · Enter to select"
          className="w-[calc(100vw-2rem)] max-w-xl sm:w-full"
          commandProps={{
            value: highlightedValue,
            onValueChange: handleValueChange,
            loop: true,
          }}
        >
          <CommandInput placeholder="Search themes..." className="h-11 sm:h-12" />
          <ScrollArea className="h-[60vh] max-h-[500px] sm:max-h-[600px]" viewportRef={scrollViewportRef}>
            <CommandList className="max-h-none">
              <CommandEmpty>No theme found.</CommandEmpty>
              {isLoadingThemes ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <CommandGroup heading="Color Schemes" className="p-1.5 sm:p-2">
                  {availableThemes.map((t) => {
                    const val = themeValue(t.id, t.name, t.description);
                    const themeColors = getPreviewColors(t.id);
                    return (
                      <CommandItem
                        key={t.id}
                        data-theme-id={t.id}
                        value={val}
                        onMouseEnter={() => handleThemeHover(t.id)}
                        onMouseLeave={handleThemeLeave}
                        onSelect={() => handleThemeClick(t.id)}
                        className={cn(
                          "flex items-center justify-between gap-2 sm:gap-4 cursor-pointer py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg",
                          colorScheme === t.id && "bg-primary/10"
                        )}
                      >
                        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                          {/* Color Palette Dots */}
                          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                            {themeColors.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-border/50 shadow-sm"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm sm:text-base truncate">{t.name}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:truncate">
                              {t.description}
                            </p>
                          </div>
                        </div>
                        {colorScheme === t.id && (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
              <CommandGroup heading="Appearance" className="p-1.5 sm:p-2">
                <CommandItem
                  value="appearance:light"
                  onSelect={() => setTheme("light")}
                  className={cn(
                    "flex items-center justify-between cursor-pointer py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg",
                    themeMode === "light" && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">Light Mode</span>
                  </div>
                  {themeMode === "light" && (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-primary" />
                  )}
                </CommandItem>
                <CommandItem
                  value="appearance:dark"
                  onSelect={() => setTheme("dark")}
                  className={cn(
                    "flex items-center justify-between cursor-pointer py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg",
                    themeMode === "dark" && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">Dark Mode</span>
                  </div>
                  {themeMode === "dark" && (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-primary" />
                  )}
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CommandDialog>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDialogOpen(true)}
              className="relative w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg hover:border-primary/50 transition-colors flex items-center justify-center group"
              aria-label="Change theme"
            >
              <Palette className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <div className="flex items-center gap-2">
              <span>Change theme</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">
                  {typeof window !== "undefined" && /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent)
                    ? "⌘"
                    : "Ctrl"}
                </span>
                <span>+</span>
                <span>Shift</span>
                <span>+</span>
                <span>U</span>
              </kbd>
            </div>
          </TooltipContent>
        </Tooltip>
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
