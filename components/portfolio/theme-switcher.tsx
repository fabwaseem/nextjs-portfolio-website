"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Palette, Check, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useColorScheme } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export function ThemeSwitcher({
  className,
  showLabel = false,
  compact = false,
}: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme: themeMode, resolvedTheme } = useTheme();
  const { colorScheme, setColorScheme, availableThemes, theme } =
    useColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={compact ? "icon" : "default"}
        className={cn("gap-2", compact && "h-9 w-9", className)}
      >
        <Palette className="h-4 w-4" />
        {showLabel && !compact && <span>Theme</span>}
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={compact ? "icon" : "default"}
          className={cn(
            "gap-2 transition-colors",
            compact && "h-9 w-9",
            className
          )}
        >
          <div className="relative">
            <Sun
              className={cn(
                "h-4 w-4 transition-all duration-300",
                isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
              )}
            />
            <Moon
              className={cn(
                "absolute top-0 left-0 h-4 w-4 transition-all duration-300",
                isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
              )}
            />
          </div>
          {showLabel && !compact && (
            <>
              <span className="hidden sm:inline">{theme.name}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Color Scheme Selection */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Color Scheme
        </DropdownMenuLabel>
        {availableThemes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setColorScheme(t.id)}
            className="flex items-center justify-between gap-2 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{t.name}</span>
              {/* <span className="text-xs text-muted-foreground">
                {t.description}
              </span> */}
            </div>
            {colorScheme === t.id && (
              <Check className="h-4 w-4 text-primary shrink-0" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Light/Dark Mode Selection */}
        <DropdownMenuLabel className="flex items-center gap-2">
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between gap-2 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
          {themeMode === "light" && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between gap-2 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
          {themeMode === "dark" && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between gap-2 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="relative h-4 w-4">
              <Sun className="absolute h-3 w-3 top-0 left-0" />
              <Moon className="absolute h-3 w-3 bottom-0 right-0" />
            </div>
            <span>System</span>
          </div>
          {themeMode === "system" && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Compact theme toggle button (just toggles dark/light)
 */
export function ThemeToggleButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={cn("h-9 w-9", className)}>
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9 relative", className)}
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
