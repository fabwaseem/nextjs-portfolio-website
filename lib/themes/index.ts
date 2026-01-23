// Theme system exports
export {
  type ThemeColors,
  type ThemeMode,
  type ColorScheme,
  type ThemeDefinition,
  themes,
  DEFAULT_COLOR_SCHEME,
  DEFAULT_THEME_MODE,
  STORAGE_KEY_COLOR_SCHEME,
  ThemeManager,
} from "./theme-config";

export {
  ColorSchemeProvider,
  useColorScheme,
  useColorSchemeOptional,
} from "./color-scheme-context";

// Client-side types for API-based theme fetching
export type {
  ThemeMetadata,
  ThemePreviewColors,
  ThemeData,
  CachedTheme,
} from "./theme-types";
