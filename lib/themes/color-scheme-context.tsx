"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import {
  type ColorScheme,
  type ThemeDefinition,
  themes,
  ThemeManager,
  DEFAULT_COLOR_SCHEME,
  STORAGE_KEY_COLOR_SCHEME,
} from "./theme-config";

/**
 * Color Scheme Context Interface
 */
interface ColorSchemeContextValue {
  /** Current color scheme identifier */
  colorScheme: ColorScheme;
  /** Set the color scheme */
  setColorScheme: (scheme: ColorScheme) => void;
  /** Current theme definition */
  theme: ThemeDefinition;
  /** All available themes */
  availableThemes: ThemeDefinition[];
  /** Whether the context is mounted (for hydration) */
  mounted: boolean;
  /** Toggle between available color schemes */
  toggleColorScheme: () => void;
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
function applyCSSVariables(scheme: ColorScheme, isDark: boolean): void {
  if (typeof window === "undefined") return;

  const manager = ThemeManager.getInstance();
  const colors = manager.getThemeColors(scheme, isDark ? "dark" : "light");
  const cssVariables = manager.generateCSSVariables(colors);

  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Color Scheme Provider Component
 * Manages color scheme state with local storage persistence
 */
export function ColorSchemeProvider({
  children,
  defaultScheme = DEFAULT_COLOR_SCHEME,
  storageKey = STORAGE_KEY_COLOR_SCHEME,
}: ColorSchemeProviderProps) {
  const [colorScheme, setColorSchemeState] =
    useState<ColorScheme>(defaultScheme);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Available themes memoized
  const availableThemes = useMemo(() => {
    return ThemeManager.getInstance().getAllThemes();
  }, []);

  // Current theme definition
  const theme = useMemo(() => {
    return themes[colorScheme];
  }, [colorScheme]);

  // Initialize from local storage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    // Use Object.keys to get all valid schemes dynamically
    const validSchemes = Object.keys(themes) as ColorScheme[];
    if (stored && validSchemes.includes(stored as ColorScheme)) {
      setColorSchemeState(stored as ColorScheme);
    }
    setMounted(true);
  }, [storageKey]);

  // Apply CSS variables when color scheme or theme mode changes
  useEffect(() => {
    if (!mounted) return;

    const isDark = resolvedTheme === "dark";
    applyCSSVariables(colorScheme, isDark);

    // Update data attribute for potential CSS selectors
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
  }, [colorScheme, resolvedTheme, mounted]);

  // Set color scheme with persistence
  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      setColorSchemeState(scheme);
      localStorage.setItem(storageKey, scheme);
      ThemeManager.getInstance().setCurrentScheme(scheme);
    },
    [storageKey]
  );

  // Toggle between color schemes
  const toggleColorScheme = useCallback(() => {
    const schemeKeys = Object.keys(themes) as ColorScheme[];
    const currentIndex = schemeKeys.indexOf(colorScheme);
    const nextIndex = (currentIndex + 1) % schemeKeys.length;
    setColorScheme(schemeKeys[nextIndex]);
  }, [colorScheme, setColorScheme]);

  const contextValue = useMemo<ColorSchemeContextValue>(
    () => ({
      colorScheme,
      setColorScheme,
      theme,
      availableThemes,
      mounted,
      toggleColorScheme,
    }),
    [
      colorScheme,
      setColorScheme,
      theme,
      availableThemes,
      mounted,
      toggleColorScheme,
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
