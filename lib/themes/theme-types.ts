/**
 * Client-side Theme Types
 * These are lightweight types used on the client to avoid loading full theme definitions
 */

import type { ColorScheme, ThemeColors } from "./theme-config";

/**
 * Preview colors for theme picker UI
 */
export interface ThemePreviewColors {
  light: {
    primary: string;
    secondary: string;
    accent: string;
  };
  dark: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

/**
 * Minimal theme metadata for client-side theme list
 * Used in theme picker without loading full theme definitions
 */
export interface ThemeMetadata {
  id: ColorScheme;
  name: string;
  description: string;
  author: string;
  previewColors: ThemePreviewColors;
}

/**
 * Full theme data fetched from API
 */
export interface ThemeData {
  id: ColorScheme;
  name: string;
  description: string;
  author: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * Theme cache entry with timestamp for cache invalidation
 */
export interface CachedTheme {
  data: ThemeData;
  timestamp: number;
}
