// Theme system exports
export {
  type ThemeColors,
  type ThemeMode,
  type ColorScheme,
  type ThemeDefinition,
  vscodeTheme,
  catppuccinTheme,
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
