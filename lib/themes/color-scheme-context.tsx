"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import type { ColorScheme, ThemeColors } from "./theme-config";
import type { ThemeMetadata, ThemeData, CachedTheme } from "./theme-types";
import { DEFAULT_COLOR_SCHEME, STORAGE_KEY_COLOR_SCHEME } from "./theme-config";
import { loadFont, preloadFont, applyThemeFont } from "./theme-fonts";

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

/**
 * Color Scheme Context Interface
 */
interface ColorSchemeContextValue {
  /** Current color scheme identifier */
  colorScheme: ColorScheme;
  /** Set the color scheme */
  setColorScheme: (scheme: ColorScheme) => void;
  /** All available themes (minimal metadata) */
  availableThemes: ThemeMetadata[];
  /** Whether themes are loading */
  isLoadingThemes: boolean;
  /** Whether the context is mounted (for hydration) */
  mounted: boolean;
  /** Toggle between available color schemes */
  toggleColorScheme: () => void;
  /** Apply theme preview (for hover effects) */
  applyThemePreview: (scheme: ColorScheme | null) => void;
  /** Get preview colors for a theme */
  getPreviewColors: (scheme: ColorScheme) => string[];
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | undefined>(
  undefined
);

/**
 * Color Scheme Provider Props
 */
interface ColorSchemeProviderProps {
  children: ReactNode;
  defaultScheme?: ColorScheme;
  storageKey?: string;
}

/**
 * Apply CSS variables to document root
 */
function applyCSSVariablesFromColors(colors: ThemeColors): void {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  // Map theme colors to CSS variables
  const cssVariables: Record<string, string> = {
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--glass": colors.glass,
    "--glass-foreground": colors.glassForeground,
    "--glass-border": colors.glassBorder,
    "--glass-muted": colors.glassMuted,
    "--card": colors.card,
    "--card-foreground": colors.cardForeground,
    "--popover": colors.popover,
    "--popover-foreground": colors.popoverForeground,
    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,
    "--secondary": colors.secondary,
    "--secondary-foreground": colors.secondaryForeground,
    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,
    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,
    "--destructive": colors.destructive,
    "--border": colors.border,
    "--input": colors.input,
    "--ring": colors.ring,
    "--chart-1": colors.chart1,
    "--chart-2": colors.chart2,
    "--chart-3": colors.chart3,
    "--chart-4": colors.chart4,
    "--chart-5": colors.chart5,
    "--sidebar": colors.sidebar,
    "--sidebar-foreground": colors.sidebarForeground,
    "--sidebar-primary": colors.sidebarPrimary,
    "--sidebar-primary-foreground": colors.sidebarPrimaryForeground,
    "--sidebar-accent": colors.sidebarAccent,
    "--sidebar-accent-foreground": colors.sidebarAccentForeground,
    "--sidebar-border": colors.sidebarBorder,
    "--sidebar-ring": colors.sidebarRing,
    "--editor-bg": colors.editorBg,
    "--editor-line": colors.editorLine,
    "--editor-selection": colors.editorSelection,
    "--editor-gutter": colors.editorGutter,
    "--syntax-keyword": colors.syntaxKeyword,
    "--syntax-string": colors.syntaxString,
    "--syntax-function": colors.syntaxFunction,
    "--syntax-variable": colors.syntaxVariable,
    "--syntax-comment": colors.syntaxComment,
    "--syntax-number": colors.syntaxNumber,
    "--syntax-operator": colors.syntaxOperator,
    "--syntax-type": colors.syntaxType,
    "--terminal-bg": colors.terminalBg,
    "--terminal-green": colors.terminalGreen,
    "--terminal-yellow": colors.terminalYellow,
    "--terminal-blue": colors.terminalBlue,
    "--terminal-red": colors.terminalRed,
    "--terminal-cyan": colors.terminalCyan,
    "--terminal-magenta": colors.terminalMagenta,
  };

  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Color Scheme Provider Component
 * Manages color scheme state with API-based theme fetching
 */
export function ColorSchemeProvider({
  children,
  defaultScheme = DEFAULT_COLOR_SCHEME,
  storageKey = STORAGE_KEY_COLOR_SCHEME,
}: ColorSchemeProviderProps) {
  const [colorScheme, setColorSchemeState] =
    useState<ColorScheme>(defaultScheme);
  const [mounted, setMounted] = useState(false);
  const [availableThemes, setAvailableThemes] = useState<ThemeMetadata[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(true);
  const { resolvedTheme } = useTheme();

  // Theme cache ref to avoid re-renders
  const themeCacheRef = useRef<Map<ColorScheme, CachedTheme>>(new Map());
  const previewSchemeRef = useRef<ColorScheme | null>(null);

  // Fetch theme list on mount
  useEffect(() => {
    async function fetchThemeList() {
      try {
        const response = await fetch("/api/themes");
        if (response.ok) {
          const themes: ThemeMetadata[] = await response.json();
          setAvailableThemes(themes);
        }
      } catch (error) {
        console.error("Failed to fetch theme list:", error);
      } finally {
        setIsLoadingThemes(false);
      }
    }

    fetchThemeList();
  }, []);

  // Fetch and cache a specific theme
  const fetchTheme = useCallback(
    async (schemeId: ColorScheme): Promise<ThemeData | null> => {
      // Check cache first
      const cached = themeCacheRef.current.get(schemeId);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }

      try {
        const response = await fetch(`/api/themes/${schemeId}`);
        if (response.ok) {
          const theme: ThemeData = await response.json();
          // Update cache
          themeCacheRef.current.set(schemeId, {
            data: theme,
            timestamp: Date.now(),
          });
          return theme;
        }
      } catch (error) {
        console.error(`Failed to fetch theme ${schemeId}:`, error);
      }
      return null;
    },
    []
  );

  // Apply theme colors and font
  const applyTheme = useCallback(
    async (schemeId: ColorScheme) => {
      const theme = await fetchTheme(schemeId);
      if (theme) {
        const isDark = resolvedTheme === "dark";
        const colors = isDark ? theme.dark : theme.light;
        applyCSSVariablesFromColors(colors);

        // Load and apply theme font
        try {
          await loadFont(schemeId);
          applyThemeFont(schemeId);
        } catch (error) {
          console.warn(`Failed to load font for theme ${schemeId}:`, error);
          // Still apply fallback font
          applyThemeFont(schemeId);
        }
      }
    },
    [fetchTheme, resolvedTheme]
  );

  // Initialize from local storage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setColorSchemeState(stored as ColorScheme);
    }
    setMounted(true);
  }, [storageKey]);

  // Apply theme when color scheme or theme mode changes
  useEffect(() => {
    if (!mounted) return;

    const schemeToApply = previewSchemeRef.current || colorScheme;
    applyTheme(schemeToApply);

    // Update data attribute
    document.documentElement.setAttribute("data-color-scheme", schemeToApply);
  }, [colorScheme, resolvedTheme, mounted, applyTheme]);

  // Set color scheme with persistence
  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      setColorSchemeState(scheme);
      localStorage.setItem(storageKey, scheme);
      previewSchemeRef.current = null;
    },
    [storageKey]
  );

  // Apply theme preview (for hover effects)
  const applyThemePreview = useCallback(
    (scheme: ColorScheme | null) => {
      previewSchemeRef.current = scheme;
      const schemeToApply = scheme || colorScheme;

      // Preload font when hovering (before fully applying)
      if (scheme) {
        preloadFont(scheme);
      }

      applyTheme(schemeToApply);
    },
    [colorScheme, applyTheme]
  );

  // Get preview colors for theme picker dots
  const getPreviewColors = useCallback(
    (scheme: ColorScheme): string[] => {
      const theme = availableThemes.find((t) => t.id === scheme);
      if (!theme) return [];

      const isDark = resolvedTheme === "dark";
      const colors = isDark
        ? theme.previewColors.dark
        : theme.previewColors.light;
      return [colors.primary, colors.secondary, colors.accent];
    },
    [availableThemes, resolvedTheme]
  );

  // Toggle between color schemes
  const toggleColorScheme = useCallback(() => {
    if (availableThemes.length === 0) return;

    const currentIndex = availableThemes.findIndex((t) => t.id === colorScheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setColorScheme(availableThemes[nextIndex].id);
  }, [colorScheme, availableThemes, setColorScheme]);

  const contextValue = useMemo<ColorSchemeContextValue>(
    () => ({
      colorScheme,
      setColorScheme,
      availableThemes,
      isLoadingThemes,
      mounted,
      toggleColorScheme,
      applyThemePreview,
      getPreviewColors,
    }),
    [
      colorScheme,
      setColorScheme,
      availableThemes,
      isLoadingThemes,
      mounted,
      toggleColorScheme,
      applyThemePreview,
      getPreviewColors,
    ]
  );

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

/**
 * Hook to access color scheme context
 * @throws Error if used outside of ColorSchemeProvider
 */
export function useColorScheme(): ColorSchemeContextValue {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }
  return context;
}

/**
 * Optional hook that returns undefined if outside provider
 * Useful for components that may or may not be within the provider
 */
export function useColorSchemeOptional(): ColorSchemeContextValue | undefined {
  return useContext(ColorSchemeContext);
}
