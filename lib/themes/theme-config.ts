/**
 * Theme Configuration System
 *
 * OOP-based theme system with proper encapsulation and type safety.
 * Supports multiple color schemes (VS Code, Catppuccin) with light/dark variants.
 */

// Theme color interface for type safety
export interface ThemeColors {
  // Core colors
  background: string;
  foreground: string;

  // Glass effects
  glass: string;
  glassForeground: string;
  glassBorder: string;
  glassMuted: string;

  // Component colors
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;

  // Brand colors
  primary: string;
  primaryForeground: string;

  // Secondary colors
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;

  // State colors
  destructive: string;

  // Border & input
  border: string;
  input: string;
  ring: string;

  // Chart colors
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;

  // Sidebar
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;

  // Editor colors
  editorBg: string;
  editorLine: string;
  editorSelection: string;
  editorGutter: string;

  // Syntax highlighting
  syntaxKeyword: string;
  syntaxString: string;
  syntaxFunction: string;
  syntaxVariable: string;
  syntaxComment: string;
  syntaxNumber: string;
  syntaxOperator: string;
  syntaxType: string;

  // Terminal colors
  terminalBg: string;
  terminalGreen: string;
  terminalYellow: string;
  terminalBlue: string;
  terminalRed: string;
  terminalCyan: string;
  terminalMagenta: string;
}

// Theme variant (light/dark)
export type ThemeMode = "light" | "dark" | "system";

// Color scheme identifier
export type ColorScheme =
  | "vscode"
  | "catppuccin"
  | "tokyoNight"
  | "dracula"
  | "nord"
  | "gruvbox"
  | "oneDark"
  | "solarized"
  | "rosePine"
  | "ayu";

// Theme definition interface
export interface ThemeDefinition {
  id: ColorScheme;
  name: string;
  description: string;
  author: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * VS Code Theme
 * Based on VS Code Dark+ and Light+ themes
 */
export const vscodeTheme: ThemeDefinition = {
  id: "vscode",
  name: "VS Code",
  description: "Classic VS Code Dark+ and Light+ inspired theme",
  author: "Microsoft",
  light: {
    // Core
    background: "oklch(0.98 0.005 250)",
    foreground: "oklch(0.15 0.01 250)",

    // Glass
    glass: "oklch(1 0 0 / 60%)",
    glassForeground: "oklch(0.15 0.01 250)",
    glassBorder: "oklch(0 0 0 / 8%)",
    glassMuted: "oklch(0.95 0.005 250 / 80%)",

    // Components
    card: "oklch(1 0 0 / 70%)",
    cardForeground: "oklch(0.15 0.01 250)",
    popover: "oklch(1 0 0 / 80%)",
    popoverForeground: "oklch(0.15 0.01 250)",

    // Brand
    primary: "oklch(0.55 0.22 250)",
    primaryForeground: "oklch(1 0 0)",

    // Secondary
    secondary: "oklch(0.96 0.01 250 / 80%)",
    secondaryForeground: "oklch(0.25 0.01 250)",
    muted: "oklch(0.95 0.005 250 / 60%)",
    mutedForeground: "oklch(0.45 0.01 250)",
    accent: "oklch(0.94 0.01 250 / 70%)",
    accentForeground: "oklch(0.2 0.01 250)",

    // State
    destructive: "oklch(0.6 0.22 25)",

    // Border & input
    border: "oklch(0 0 0 / 10%)",
    input: "oklch(1 0 0 / 60%)",
    ring: "oklch(0.55 0.22 250 / 50%)",

    // Charts
    chart1: "oklch(0.55 0.22 250)",
    chart2: "oklch(0.6 0.18 170)",
    chart3: "oklch(0.65 0.2 320)",
    chart4: "oklch(0.7 0.15 80)",
    chart5: "oklch(0.55 0.2 30)",

    // Sidebar
    sidebar: "oklch(0.97 0.005 250 / 80%)",
    sidebarForeground: "oklch(0.15 0.01 250)",
    sidebarPrimary: "oklch(0.55 0.22 250)",
    sidebarPrimaryForeground: "oklch(1 0 0)",
    sidebarAccent: "oklch(0.94 0.01 250 / 60%)",
    sidebarAccentForeground: "oklch(0.2 0.01 250)",
    sidebarBorder: "oklch(0 0 0 / 8%)",
    sidebarRing: "oklch(0.55 0.22 250 / 50%)",

    // Editor
    editorBg: "oklch(0.98 0.005 250)",
    editorLine: "oklch(0.96 0.005 250)",
    editorSelection: "oklch(0.7 0.1 220 / 30%)",
    editorGutter: "oklch(0.5 0.01 250)",

    // Syntax
    syntaxKeyword: "oklch(0.5 0.25 300)",
    syntaxString: "oklch(0.5 0.18 25)",
    syntaxFunction: "oklch(0.45 0.2 60)",
    syntaxVariable: "oklch(0.45 0.2 220)",
    syntaxComment: "oklch(0.5 0.15 140)",
    syntaxNumber: "oklch(0.5 0.18 160)",
    syntaxOperator: "oklch(0.2 0.01 250)",
    syntaxType: "oklch(0.45 0.2 180)",

    // Terminal
    terminalBg: "oklch(0.96 0.005 250)",
    terminalGreen: "oklch(0.45 0.2 145)",
    terminalYellow: "oklch(0.55 0.2 85)",
    terminalBlue: "oklch(0.5 0.2 230)",
    terminalRed: "oklch(0.5 0.22 25)",
    terminalCyan: "oklch(0.5 0.15 195)",
    terminalMagenta: "oklch(0.5 0.2 320)",
  },
  dark: {
    // Core
    background: "oklch(0.13 0.02 260)",
    foreground: "oklch(0.92 0.01 250)",

    // Glass
    glass: "oklch(0.16 0.02 260 / 80%)",
    glassForeground: "oklch(0.92 0.01 250)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.2 0.02 260 / 70%)",

    // Components
    card: "oklch(0.16 0.02 260 / 90%)",
    cardForeground: "oklch(0.92 0.01 250)",
    popover: "oklch(0.18 0.02 260 / 95%)",
    popoverForeground: "oklch(0.92 0.01 250)",

    // Brand
    primary: "oklch(0.7 0.18 220)",
    primaryForeground: "oklch(0.13 0.02 260)",

    // Secondary
    secondary: "oklch(0.22 0.02 260 / 80%)",
    secondaryForeground: "oklch(0.9 0.01 250)",
    muted: "oklch(0.22 0.02 260 / 60%)",
    mutedForeground: "oklch(0.6 0.01 250)",
    accent: "oklch(0.25 0.02 260 / 70%)",
    accentForeground: "oklch(0.9 0.01 250)",

    // State
    destructive: "oklch(0.6 0.22 25)",

    // Border & input
    border: "oklch(1 0 0 / 8%)",
    input: "oklch(0.18 0.02 260 / 80%)",
    ring: "oklch(0.7 0.18 220 / 50%)",

    // Charts
    chart1: "oklch(0.7 0.18 220)",
    chart2: "oklch(0.7 0.18 140)",
    chart3: "oklch(0.7 0.18 320)",
    chart4: "oklch(0.7 0.15 60)",
    chart5: "oklch(0.65 0.2 30)",

    // Sidebar
    sidebar: "oklch(0.14 0.02 260 / 90%)",
    sidebarForeground: "oklch(0.92 0.01 250)",
    sidebarPrimary: "oklch(0.7 0.18 220)",
    sidebarPrimaryForeground: "oklch(0.13 0.02 260)",
    sidebarAccent: "oklch(0.25 0.02 260 / 60%)",
    sidebarAccentForeground: "oklch(0.9 0.01 250)",
    sidebarBorder: "oklch(1 0 0 / 6%)",
    sidebarRing: "oklch(0.7 0.18 220 / 50%)",

    // Editor
    editorBg: "oklch(0.12 0.02 260)",
    editorLine: "oklch(0.16 0.02 260)",
    editorSelection: "oklch(0.3 0.08 220 / 40%)",
    editorGutter: "oklch(0.55 0.01 250)",

    // Syntax
    syntaxKeyword: "oklch(0.7 0.2 300)",
    syntaxString: "oklch(0.7 0.15 50)",
    syntaxFunction: "oklch(0.8 0.15 90)",
    syntaxVariable: "oklch(0.75 0.18 200)",
    syntaxComment: "oklch(0.55 0.12 140)",
    syntaxNumber: "oklch(0.75 0.15 160)",
    syntaxOperator: "oklch(0.9 0.01 250)",
    syntaxType: "oklch(0.7 0.18 180)",

    // Terminal
    terminalBg: "oklch(0.1 0.02 260)",
    terminalGreen: "oklch(0.7 0.2 145)",
    terminalYellow: "oklch(0.8 0.15 85)",
    terminalBlue: "oklch(0.7 0.18 230)",
    terminalRed: "oklch(0.65 0.2 25)",
    terminalCyan: "oklch(0.75 0.12 195)",
    terminalMagenta: "oklch(0.7 0.2 320)",
  },
};

/**
 * Catppuccin Theme
 * Based on the popular Catppuccin color palette
 * https://catppuccin.com/
 */
export const catppuccinTheme: ThemeDefinition = {
  id: "catppuccin",
  name: "Catppuccin",
  description: "Soothing pastel theme for the high-spirited",
  author: "Catppuccin",
  light: {
    // Catppuccin Latte (Light)
    // Core - Latte Base
    background: "oklch(0.96 0.01 240)", // #eff1f5
    foreground: "oklch(0.27 0.04 260)", // #4c4f69

    // Glass
    glass: "oklch(0.98 0.005 240 / 70%)",
    glassForeground: "oklch(0.27 0.04 260)",
    glassBorder: "oklch(0.27 0.04 260 / 10%)",
    glassMuted: "oklch(0.92 0.01 240 / 80%)",

    // Components - Surface colors
    card: "oklch(0.94 0.01 240 / 80%)", // #e6e9ef
    cardForeground: "oklch(0.27 0.04 260)",
    popover: "oklch(0.92 0.01 240 / 90%)", // #dce0e8
    popoverForeground: "oklch(0.27 0.04 260)",

    // Brand - Mauve (primary accent)
    primary: "oklch(0.55 0.2 310)", // #8839ef
    primaryForeground: "oklch(0.98 0.005 240)",

    // Secondary - Surface2
    secondary: "oklch(0.88 0.015 250 / 80%)", // #acb0be
    secondaryForeground: "oklch(0.27 0.04 260)",
    muted: "oklch(0.92 0.01 240 / 60%)",
    mutedForeground: "oklch(0.48 0.03 260)", // #6c6f85
    accent: "oklch(0.94 0.01 240 / 70%)",
    accentForeground: "oklch(0.27 0.04 260)",

    // State - Red
    destructive: "oklch(0.6 0.2 25)", // #d20f39

    // Border & input
    border: "oklch(0.27 0.04 260 / 12%)",
    input: "oklch(0.96 0.01 240 / 80%)",
    ring: "oklch(0.55 0.2 310 / 50%)",

    // Charts - Various Catppuccin colors
    chart1: "oklch(0.55 0.2 310)", // Mauve
    chart2: "oklch(0.6 0.18 175)", // Teal
    chart3: "oklch(0.65 0.2 350)", // Pink
    chart4: "oklch(0.65 0.18 85)", // Yellow
    chart5: "oklch(0.6 0.2 25)", // Red

    // Sidebar
    sidebar: "oklch(0.94 0.01 240 / 90%)",
    sidebarForeground: "oklch(0.27 0.04 260)",
    sidebarPrimary: "oklch(0.55 0.2 310)",
    sidebarPrimaryForeground: "oklch(0.98 0.005 240)",
    sidebarAccent: "oklch(0.92 0.01 240 / 60%)",
    sidebarAccentForeground: "oklch(0.27 0.04 260)",
    sidebarBorder: "oklch(0.27 0.04 260 / 10%)",
    sidebarRing: "oklch(0.55 0.2 310 / 50%)",

    // Editor
    editorBg: "oklch(0.96 0.01 240)",
    editorLine: "oklch(0.94 0.01 240)",
    editorSelection: "oklch(0.55 0.2 310 / 25%)",
    editorGutter: "oklch(0.48 0.03 260)",

    // Syntax - Catppuccin Latte
    syntaxKeyword: "oklch(0.55 0.2 310)", // Mauve
    syntaxString: "oklch(0.6 0.18 145)", // Green
    syntaxFunction: "oklch(0.55 0.2 240)", // Blue
    syntaxVariable: "oklch(0.6 0.18 25)", // Peach
    syntaxComment: "oklch(0.58 0.03 260)", // Overlay0
    syntaxNumber: "oklch(0.6 0.18 25)", // Peach
    syntaxOperator: "oklch(0.6 0.18 175)", // Teal
    syntaxType: "oklch(0.65 0.18 85)", // Yellow

    // Terminal
    terminalBg: "oklch(0.94 0.01 240)",
    terminalGreen: "oklch(0.6 0.18 145)", // Green
    terminalYellow: "oklch(0.65 0.18 85)", // Yellow
    terminalBlue: "oklch(0.55 0.2 240)", // Blue
    terminalRed: "oklch(0.6 0.2 25)", // Red
    terminalCyan: "oklch(0.6 0.18 175)", // Teal
    terminalMagenta: "oklch(0.55 0.2 310)", // Mauve
  },
  dark: {
    // Catppuccin Mocha (Dark)
    // Core - Mocha Base
    background: "oklch(0.18 0.02 270)", // #1e1e2e
    foreground: "oklch(0.9 0.01 260)", // #cdd6f4

    // Glass
    glass: "oklch(0.22 0.02 270 / 80%)",
    glassForeground: "oklch(0.9 0.01 260)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.25 0.02 270 / 70%)",

    // Components - Surface colors
    card: "oklch(0.22 0.02 270 / 90%)", // #313244
    cardForeground: "oklch(0.9 0.01 260)",
    popover: "oklch(0.25 0.02 270 / 95%)", // #45475a
    popoverForeground: "oklch(0.9 0.01 260)",

    // Brand - Mauve (primary accent)
    primary: "oklch(0.75 0.15 310)", // #cba6f7
    primaryForeground: "oklch(0.18 0.02 270)",

    // Secondary
    secondary: "oklch(0.3 0.02 270 / 80%)", // Surface1
    secondaryForeground: "oklch(0.9 0.01 260)",
    muted: "oklch(0.28 0.02 270 / 60%)",
    mutedForeground: "oklch(0.6 0.02 260)", // Subtext0
    accent: "oklch(0.32 0.02 270 / 70%)",
    accentForeground: "oklch(0.9 0.01 260)",

    // State - Red
    destructive: "oklch(0.7 0.18 15)", // #f38ba8

    // Border & input
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.22 0.02 270 / 80%)",
    ring: "oklch(0.75 0.15 310 / 50%)",

    // Charts - Various Catppuccin colors
    chart1: "oklch(0.75 0.15 310)", // Mauve
    chart2: "oklch(0.75 0.13 175)", // Teal
    chart3: "oklch(0.75 0.15 350)", // Pink
    chart4: "oklch(0.8 0.13 85)", // Yellow
    chart5: "oklch(0.7 0.18 15)", // Red

    // Sidebar
    sidebar: "oklch(0.2 0.02 270 / 90%)",
    sidebarForeground: "oklch(0.9 0.01 260)",
    sidebarPrimary: "oklch(0.75 0.15 310)",
    sidebarPrimaryForeground: "oklch(0.18 0.02 270)",
    sidebarAccent: "oklch(0.28 0.02 270 / 60%)",
    sidebarAccentForeground: "oklch(0.9 0.01 260)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.75 0.15 310 / 50%)",

    // Editor
    editorBg: "oklch(0.16 0.02 270)",
    editorLine: "oklch(0.22 0.02 270)",
    editorSelection: "oklch(0.75 0.15 310 / 30%)",
    editorGutter: "oklch(0.5 0.02 260)",

    // Syntax - Catppuccin Mocha
    syntaxKeyword: "oklch(0.75 0.15 310)", // Mauve
    syntaxString: "oklch(0.75 0.14 145)", // Green
    syntaxFunction: "oklch(0.75 0.15 240)", // Blue
    syntaxVariable: "oklch(0.8 0.12 45)", // Peach
    syntaxComment: "oklch(0.5 0.02 260)", // Overlay0
    syntaxNumber: "oklch(0.8 0.12 45)", // Peach
    syntaxOperator: "oklch(0.75 0.13 175)", // Teal
    syntaxType: "oklch(0.8 0.13 85)", // Yellow

    // Terminal
    terminalBg: "oklch(0.15 0.02 270)",
    terminalGreen: "oklch(0.75 0.14 145)", // Green
    terminalYellow: "oklch(0.8 0.13 85)", // Yellow
    terminalBlue: "oklch(0.75 0.15 240)", // Blue
    terminalRed: "oklch(0.7 0.18 15)", // Red
    terminalCyan: "oklch(0.75 0.13 175)", // Teal
    terminalMagenta: "oklch(0.75 0.15 310)", // Mauve
  },
};

// Tokyo Night Theme
export const tokyoNightTheme: ThemeDefinition = {
  id: "tokyoNight",
  name: "Tokyo Night",
  description: "Clean dark theme inspired by Tokyo",
  author: "enkia",
  light: {
    background: "oklch(0.97 0.01 250)",
    foreground: "oklch(0.25 0.04 260)",
    glass: "oklch(0.99 0.005 250 / 70%)",
    glassForeground: "oklch(0.25 0.04 260)",
    glassBorder: "oklch(0.25 0.04 260 / 10%)",
    glassMuted: "oklch(0.94 0.01 250 / 80%)",
    card: "oklch(0.95 0.01 250 / 80%)",
    cardForeground: "oklch(0.25 0.04 260)",
    popover: "oklch(0.93 0.01 250 / 90%)",
    popoverForeground: "oklch(0.25 0.04 260)",
    primary: "oklch(0.55 0.2 280)",
    primaryForeground: "oklch(0.98 0.005 250)",
    secondary: "oklch(0.9 0.015 250 / 80%)",
    secondaryForeground: "oklch(0.25 0.04 260)",
    muted: "oklch(0.93 0.01 250 / 60%)",
    mutedForeground: "oklch(0.45 0.03 260)",
    accent: "oklch(0.95 0.01 250 / 70%)",
    accentForeground: "oklch(0.25 0.04 260)",
    destructive: "oklch(0.55 0.2 15)",
    border: "oklch(0.25 0.04 260 / 12%)",
    input: "oklch(0.97 0.01 250 / 80%)",
    ring: "oklch(0.55 0.2 280 / 50%)",
    chart1: "oklch(0.55 0.2 280)",
    chart2: "oklch(0.6 0.18 175)",
    chart3: "oklch(0.6 0.2 350)",
    chart4: "oklch(0.65 0.18 85)",
    chart5: "oklch(0.55 0.2 15)",
    sidebar: "oklch(0.95 0.01 250 / 90%)",
    sidebarForeground: "oklch(0.25 0.04 260)",
    sidebarPrimary: "oklch(0.55 0.2 280)",
    sidebarPrimaryForeground: "oklch(0.98 0.005 250)",
    sidebarAccent: "oklch(0.93 0.01 250 / 60%)",
    sidebarAccentForeground: "oklch(0.25 0.04 260)",
    sidebarBorder: "oklch(0.25 0.04 260 / 10%)",
    sidebarRing: "oklch(0.55 0.2 280 / 50%)",
    editorBg: "oklch(0.97 0.01 250)",
    editorLine: "oklch(0.95 0.01 250)",
    editorSelection: "oklch(0.55 0.2 280 / 20%)",
    editorGutter: "oklch(0.5 0.03 260)",
    syntaxKeyword: "oklch(0.55 0.2 280)",
    syntaxString: "oklch(0.55 0.18 145)",
    syntaxFunction: "oklch(0.5 0.2 240)",
    syntaxVariable: "oklch(0.55 0.18 35)",
    syntaxComment: "oklch(0.55 0.03 260)",
    syntaxNumber: "oklch(0.55 0.18 35)",
    syntaxOperator: "oklch(0.55 0.18 195)",
    syntaxType: "oklch(0.6 0.18 85)",
    terminalBg: "oklch(0.95 0.01 250)",
    terminalGreen: "oklch(0.55 0.18 145)",
    terminalYellow: "oklch(0.6 0.18 85)",
    terminalBlue: "oklch(0.5 0.2 240)",
    terminalRed: "oklch(0.55 0.2 15)",
    terminalCyan: "oklch(0.55 0.18 195)",
    terminalMagenta: "oklch(0.55 0.2 280)",
  },
  dark: {
    background: "oklch(0.16 0.03 270)",
    foreground: "oklch(0.85 0.02 260)",
    glass: "oklch(0.2 0.03 270 / 80%)",
    glassForeground: "oklch(0.85 0.02 260)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.23 0.03 270 / 70%)",
    card: "oklch(0.2 0.03 270 / 90%)",
    cardForeground: "oklch(0.85 0.02 260)",
    popover: "oklch(0.22 0.03 270 / 95%)",
    popoverForeground: "oklch(0.85 0.02 260)",
    primary: "oklch(0.7 0.17 280)",
    primaryForeground: "oklch(0.16 0.03 270)",
    secondary: "oklch(0.25 0.03 270 / 80%)",
    secondaryForeground: "oklch(0.85 0.02 260)",
    muted: "oklch(0.25 0.03 270 / 60%)",
    mutedForeground: "oklch(0.55 0.02 260)",
    accent: "oklch(0.28 0.03 270 / 70%)",
    accentForeground: "oklch(0.85 0.02 260)",
    destructive: "oklch(0.65 0.2 15)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.2 0.03 270 / 80%)",
    ring: "oklch(0.7 0.17 280 / 50%)",
    chart1: "oklch(0.7 0.17 280)",
    chart2: "oklch(0.7 0.15 175)",
    chart3: "oklch(0.75 0.17 350)",
    chart4: "oklch(0.78 0.15 85)",
    chart5: "oklch(0.65 0.2 15)",
    sidebar: "oklch(0.18 0.03 270 / 90%)",
    sidebarForeground: "oklch(0.85 0.02 260)",
    sidebarPrimary: "oklch(0.7 0.17 280)",
    sidebarPrimaryForeground: "oklch(0.16 0.03 270)",
    sidebarAccent: "oklch(0.25 0.03 270 / 60%)",
    sidebarAccentForeground: "oklch(0.85 0.02 260)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.7 0.17 280 / 50%)",
    editorBg: "oklch(0.14 0.03 270)",
    editorLine: "oklch(0.2 0.03 270)",
    editorSelection: "oklch(0.7 0.17 280 / 25%)",
    editorGutter: "oklch(0.45 0.02 260)",
    syntaxKeyword: "oklch(0.7 0.17 280)",
    syntaxString: "oklch(0.72 0.15 145)",
    syntaxFunction: "oklch(0.72 0.17 240)",
    syntaxVariable: "oklch(0.78 0.14 35)",
    syntaxComment: "oklch(0.45 0.02 260)",
    syntaxNumber: "oklch(0.78 0.14 35)",
    syntaxOperator: "oklch(0.72 0.14 195)",
    syntaxType: "oklch(0.78 0.15 85)",
    terminalBg: "oklch(0.13 0.03 270)",
    terminalGreen: "oklch(0.72 0.15 145)",
    terminalYellow: "oklch(0.78 0.15 85)",
    terminalBlue: "oklch(0.72 0.17 240)",
    terminalRed: "oklch(0.65 0.2 15)",
    terminalCyan: "oklch(0.72 0.14 195)",
    terminalMagenta: "oklch(0.7 0.17 280)",
  },
};

// Dracula Theme
export const draculaTheme: ThemeDefinition = {
  id: "dracula",
  name: "Dracula",
  description: "Dark theme for vampires",
  author: "Zeno Rocha",
  light: {
    background: "oklch(0.97 0.01 290)",
    foreground: "oklch(0.25 0.05 290)",
    glass: "oklch(0.99 0.005 290 / 70%)",
    glassForeground: "oklch(0.25 0.05 290)",
    glassBorder: "oklch(0.25 0.05 290 / 10%)",
    glassMuted: "oklch(0.94 0.01 290 / 80%)",
    card: "oklch(0.95 0.01 290 / 80%)",
    cardForeground: "oklch(0.25 0.05 290)",
    popover: "oklch(0.93 0.01 290 / 90%)",
    popoverForeground: "oklch(0.25 0.05 290)",
    primary: "oklch(0.6 0.22 320)",
    primaryForeground: "oklch(0.98 0.005 290)",
    secondary: "oklch(0.9 0.015 290 / 80%)",
    secondaryForeground: "oklch(0.25 0.05 290)",
    muted: "oklch(0.93 0.01 290 / 60%)",
    mutedForeground: "oklch(0.45 0.04 290)",
    accent: "oklch(0.95 0.01 290 / 70%)",
    accentForeground: "oklch(0.25 0.05 290)",
    destructive: "oklch(0.6 0.22 15)",
    border: "oklch(0.25 0.05 290 / 12%)",
    input: "oklch(0.97 0.01 290 / 80%)",
    ring: "oklch(0.6 0.22 320 / 50%)",
    chart1: "oklch(0.6 0.22 320)",
    chart2: "oklch(0.55 0.2 145)",
    chart3: "oklch(0.6 0.2 280)",
    chart4: "oklch(0.7 0.18 85)",
    chart5: "oklch(0.6 0.22 15)",
    sidebar: "oklch(0.95 0.01 290 / 90%)",
    sidebarForeground: "oklch(0.25 0.05 290)",
    sidebarPrimary: "oklch(0.6 0.22 320)",
    sidebarPrimaryForeground: "oklch(0.98 0.005 290)",
    sidebarAccent: "oklch(0.93 0.01 290 / 60%)",
    sidebarAccentForeground: "oklch(0.25 0.05 290)",
    sidebarBorder: "oklch(0.25 0.05 290 / 10%)",
    sidebarRing: "oklch(0.6 0.22 320 / 50%)",
    editorBg: "oklch(0.97 0.01 290)",
    editorLine: "oklch(0.95 0.01 290)",
    editorSelection: "oklch(0.6 0.22 320 / 20%)",
    editorGutter: "oklch(0.5 0.04 290)",
    syntaxKeyword: "oklch(0.6 0.22 320)",
    syntaxString: "oklch(0.7 0.18 85)",
    syntaxFunction: "oklch(0.55 0.2 145)",
    syntaxVariable: "oklch(0.6 0.2 280)",
    syntaxComment: "oklch(0.55 0.03 290)",
    syntaxNumber: "oklch(0.6 0.2 280)",
    syntaxOperator: "oklch(0.6 0.22 320)",
    syntaxType: "oklch(0.6 0.18 195)",
    terminalBg: "oklch(0.95 0.01 290)",
    terminalGreen: "oklch(0.55 0.2 145)",
    terminalYellow: "oklch(0.7 0.18 85)",
    terminalBlue: "oklch(0.6 0.2 280)",
    terminalRed: "oklch(0.6 0.22 15)",
    terminalCyan: "oklch(0.6 0.18 195)",
    terminalMagenta: "oklch(0.6 0.22 320)",
  },
  dark: {
    background: "oklch(0.19 0.03 290)",
    foreground: "oklch(0.95 0.01 100)",
    glass: "oklch(0.23 0.03 290 / 80%)",
    glassForeground: "oklch(0.95 0.01 100)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.26 0.03 290 / 70%)",
    card: "oklch(0.23 0.03 290 / 90%)",
    cardForeground: "oklch(0.95 0.01 100)",
    popover: "oklch(0.25 0.03 290 / 95%)",
    popoverForeground: "oklch(0.95 0.01 100)",
    primary: "oklch(0.75 0.18 320)",
    primaryForeground: "oklch(0.19 0.03 290)",
    secondary: "oklch(0.28 0.03 290 / 80%)",
    secondaryForeground: "oklch(0.95 0.01 100)",
    muted: "oklch(0.28 0.03 290 / 60%)",
    mutedForeground: "oklch(0.55 0.02 100)",
    accent: "oklch(0.3 0.03 290 / 70%)",
    accentForeground: "oklch(0.95 0.01 100)",
    destructive: "oklch(0.68 0.2 15)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.23 0.03 290 / 80%)",
    ring: "oklch(0.75 0.18 320 / 50%)",
    chart1: "oklch(0.75 0.18 320)",
    chart2: "oklch(0.72 0.17 145)",
    chart3: "oklch(0.75 0.17 280)",
    chart4: "oklch(0.85 0.15 85)",
    chart5: "oklch(0.68 0.2 15)",
    sidebar: "oklch(0.21 0.03 290 / 90%)",
    sidebarForeground: "oklch(0.95 0.01 100)",
    sidebarPrimary: "oklch(0.75 0.18 320)",
    sidebarPrimaryForeground: "oklch(0.19 0.03 290)",
    sidebarAccent: "oklch(0.28 0.03 290 / 60%)",
    sidebarAccentForeground: "oklch(0.95 0.01 100)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.75 0.18 320 / 50%)",
    editorBg: "oklch(0.17 0.03 290)",
    editorLine: "oklch(0.23 0.03 290)",
    editorSelection: "oklch(0.75 0.18 320 / 25%)",
    editorGutter: "oklch(0.45 0.02 100)",
    syntaxKeyword: "oklch(0.75 0.18 320)",
    syntaxString: "oklch(0.85 0.15 85)",
    syntaxFunction: "oklch(0.72 0.17 145)",
    syntaxVariable: "oklch(0.75 0.17 280)",
    syntaxComment: "oklch(0.45 0.02 100)",
    syntaxNumber: "oklch(0.75 0.17 280)",
    syntaxOperator: "oklch(0.75 0.18 320)",
    syntaxType: "oklch(0.72 0.15 195)",
    terminalBg: "oklch(0.15 0.03 290)",
    terminalGreen: "oklch(0.72 0.17 145)",
    terminalYellow: "oklch(0.85 0.15 85)",
    terminalBlue: "oklch(0.75 0.17 280)",
    terminalRed: "oklch(0.68 0.2 15)",
    terminalCyan: "oklch(0.72 0.15 195)",
    terminalMagenta: "oklch(0.75 0.18 320)",
  },
};

// Nord Theme
export const nordTheme: ThemeDefinition = {
  id: "nord",
  name: "Nord",
  description: "Arctic, north-bluish palette",
  author: "Arctic Ice Studio",
  light: {
    background: "oklch(0.97 0.01 230)",
    foreground: "oklch(0.25 0.04 240)",
    glass: "oklch(0.99 0.005 230 / 70%)",
    glassForeground: "oklch(0.25 0.04 240)",
    glassBorder: "oklch(0.25 0.04 240 / 10%)",
    glassMuted: "oklch(0.94 0.01 230 / 80%)",
    card: "oklch(0.95 0.01 230 / 80%)",
    cardForeground: "oklch(0.25 0.04 240)",
    popover: "oklch(0.93 0.01 230 / 90%)",
    popoverForeground: "oklch(0.25 0.04 240)",
    primary: "oklch(0.55 0.15 230)",
    primaryForeground: "oklch(0.98 0.005 230)",
    secondary: "oklch(0.9 0.015 230 / 80%)",
    secondaryForeground: "oklch(0.25 0.04 240)",
    muted: "oklch(0.93 0.01 230 / 60%)",
    mutedForeground: "oklch(0.45 0.03 240)",
    accent: "oklch(0.95 0.01 230 / 70%)",
    accentForeground: "oklch(0.25 0.04 240)",
    destructive: "oklch(0.55 0.18 15)",
    border: "oklch(0.25 0.04 240 / 12%)",
    input: "oklch(0.97 0.01 230 / 80%)",
    ring: "oklch(0.55 0.15 230 / 50%)",
    chart1: "oklch(0.55 0.15 230)",
    chart2: "oklch(0.55 0.15 195)",
    chart3: "oklch(0.6 0.18 15)",
    chart4: "oklch(0.65 0.15 85)",
    chart5: "oklch(0.55 0.15 280)",
    sidebar: "oklch(0.95 0.01 230 / 90%)",
    sidebarForeground: "oklch(0.25 0.04 240)",
    sidebarPrimary: "oklch(0.55 0.15 230)",
    sidebarPrimaryForeground: "oklch(0.98 0.005 230)",
    sidebarAccent: "oklch(0.93 0.01 230 / 60%)",
    sidebarAccentForeground: "oklch(0.25 0.04 240)",
    sidebarBorder: "oklch(0.25 0.04 240 / 10%)",
    sidebarRing: "oklch(0.55 0.15 230 / 50%)",
    editorBg: "oklch(0.97 0.01 230)",
    editorLine: "oklch(0.95 0.01 230)",
    editorSelection: "oklch(0.55 0.15 230 / 20%)",
    editorGutter: "oklch(0.5 0.03 240)",
    syntaxKeyword: "oklch(0.55 0.15 280)",
    syntaxString: "oklch(0.55 0.15 145)",
    syntaxFunction: "oklch(0.55 0.15 230)",
    syntaxVariable: "oklch(0.55 0.15 195)",
    syntaxComment: "oklch(0.55 0.03 240)",
    syntaxNumber: "oklch(0.6 0.18 30)",
    syntaxOperator: "oklch(0.55 0.15 195)",
    syntaxType: "oklch(0.55 0.15 195)",
    terminalBg: "oklch(0.95 0.01 230)",
    terminalGreen: "oklch(0.55 0.15 145)",
    terminalYellow: "oklch(0.65 0.15 85)",
    terminalBlue: "oklch(0.55 0.15 230)",
    terminalRed: "oklch(0.55 0.18 15)",
    terminalCyan: "oklch(0.55 0.15 195)",
    terminalMagenta: "oklch(0.55 0.15 280)",
  },
  dark: {
    background: "oklch(0.22 0.03 240)",
    foreground: "oklch(0.92 0.01 230)",
    glass: "oklch(0.26 0.03 240 / 80%)",
    glassForeground: "oklch(0.92 0.01 230)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.29 0.03 240 / 70%)",
    card: "oklch(0.26 0.03 240 / 90%)",
    cardForeground: "oklch(0.92 0.01 230)",
    popover: "oklch(0.28 0.03 240 / 95%)",
    popoverForeground: "oklch(0.92 0.01 230)",
    primary: "oklch(0.7 0.12 230)",
    primaryForeground: "oklch(0.22 0.03 240)",
    secondary: "oklch(0.32 0.03 240 / 80%)",
    secondaryForeground: "oklch(0.92 0.01 230)",
    muted: "oklch(0.32 0.03 240 / 60%)",
    mutedForeground: "oklch(0.6 0.02 230)",
    accent: "oklch(0.35 0.03 240 / 70%)",
    accentForeground: "oklch(0.92 0.01 230)",
    destructive: "oklch(0.65 0.17 15)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.26 0.03 240 / 80%)",
    ring: "oklch(0.7 0.12 230 / 50%)",
    chart1: "oklch(0.7 0.12 230)",
    chart2: "oklch(0.7 0.12 195)",
    chart3: "oklch(0.65 0.17 15)",
    chart4: "oklch(0.78 0.12 85)",
    chart5: "oklch(0.7 0.12 280)",
    sidebar: "oklch(0.24 0.03 240 / 90%)",
    sidebarForeground: "oklch(0.92 0.01 230)",
    sidebarPrimary: "oklch(0.7 0.12 230)",
    sidebarPrimaryForeground: "oklch(0.22 0.03 240)",
    sidebarAccent: "oklch(0.32 0.03 240 / 60%)",
    sidebarAccentForeground: "oklch(0.92 0.01 230)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.7 0.12 230 / 50%)",
    editorBg: "oklch(0.2 0.03 240)",
    editorLine: "oklch(0.26 0.03 240)",
    editorSelection: "oklch(0.7 0.12 230 / 25%)",
    editorGutter: "oklch(0.5 0.02 230)",
    syntaxKeyword: "oklch(0.7 0.12 280)",
    syntaxString: "oklch(0.72 0.12 145)",
    syntaxFunction: "oklch(0.7 0.12 230)",
    syntaxVariable: "oklch(0.7 0.12 195)",
    syntaxComment: "oklch(0.5 0.02 230)",
    syntaxNumber: "oklch(0.75 0.15 30)",
    syntaxOperator: "oklch(0.7 0.12 195)",
    syntaxType: "oklch(0.7 0.12 195)",
    terminalBg: "oklch(0.18 0.03 240)",
    terminalGreen: "oklch(0.72 0.12 145)",
    terminalYellow: "oklch(0.78 0.12 85)",
    terminalBlue: "oklch(0.7 0.12 230)",
    terminalRed: "oklch(0.65 0.17 15)",
    terminalCyan: "oklch(0.7 0.12 195)",
    terminalMagenta: "oklch(0.7 0.12 280)",
  },
};

// Gruvbox Theme
export const gruvboxTheme: ThemeDefinition = {
  id: "gruvbox",
  name: "Gruvbox",
  description: "Retro groove color scheme",
  author: "morhetz",
  light: {
    background: "oklch(0.95 0.02 85)",
    foreground: "oklch(0.25 0.05 50)",
    glass: "oklch(0.97 0.01 85 / 70%)",
    glassForeground: "oklch(0.25 0.05 50)",
    glassBorder: "oklch(0.25 0.05 50 / 10%)",
    glassMuted: "oklch(0.92 0.02 85 / 80%)",
    card: "oklch(0.93 0.02 85 / 80%)",
    cardForeground: "oklch(0.25 0.05 50)",
    popover: "oklch(0.91 0.02 85 / 90%)",
    popoverForeground: "oklch(0.25 0.05 50)",
    primary: "oklch(0.55 0.18 35)",
    primaryForeground: "oklch(0.95 0.02 85)",
    secondary: "oklch(0.88 0.025 85 / 80%)",
    secondaryForeground: "oklch(0.25 0.05 50)",
    muted: "oklch(0.91 0.02 85 / 60%)",
    mutedForeground: "oklch(0.45 0.04 50)",
    accent: "oklch(0.93 0.02 85 / 70%)",
    accentForeground: "oklch(0.25 0.05 50)",
    destructive: "oklch(0.55 0.2 20)",
    border: "oklch(0.25 0.05 50 / 12%)",
    input: "oklch(0.95 0.02 85 / 80%)",
    ring: "oklch(0.55 0.18 35 / 50%)",
    chart1: "oklch(0.55 0.18 35)",
    chart2: "oklch(0.55 0.18 145)",
    chart3: "oklch(0.6 0.18 240)",
    chart4: "oklch(0.65 0.18 85)",
    chart5: "oklch(0.55 0.2 20)",
    sidebar: "oklch(0.93 0.02 85 / 90%)",
    sidebarForeground: "oklch(0.25 0.05 50)",
    sidebarPrimary: "oklch(0.55 0.18 35)",
    sidebarPrimaryForeground: "oklch(0.95 0.02 85)",
    sidebarAccent: "oklch(0.91 0.02 85 / 60%)",
    sidebarAccentForeground: "oklch(0.25 0.05 50)",
    sidebarBorder: "oklch(0.25 0.05 50 / 10%)",
    sidebarRing: "oklch(0.55 0.18 35 / 50%)",
    editorBg: "oklch(0.95 0.02 85)",
    editorLine: "oklch(0.93 0.02 85)",
    editorSelection: "oklch(0.55 0.18 35 / 20%)",
    editorGutter: "oklch(0.5 0.04 50)",
    syntaxKeyword: "oklch(0.55 0.2 20)",
    syntaxString: "oklch(0.55 0.18 145)",
    syntaxFunction: "oklch(0.55 0.18 145)",
    syntaxVariable: "oklch(0.6 0.18 240)",
    syntaxComment: "oklch(0.55 0.03 50)",
    syntaxNumber: "oklch(0.55 0.18 280)",
    syntaxOperator: "oklch(0.55 0.18 35)",
    syntaxType: "oklch(0.65 0.18 85)",
    terminalBg: "oklch(0.93 0.02 85)",
    terminalGreen: "oklch(0.55 0.18 145)",
    terminalYellow: "oklch(0.65 0.18 85)",
    terminalBlue: "oklch(0.6 0.18 240)",
    terminalRed: "oklch(0.55 0.2 20)",
    terminalCyan: "oklch(0.55 0.15 195)",
    terminalMagenta: "oklch(0.55 0.18 280)",
  },
  dark: {
    background: "oklch(0.2 0.04 60)",
    foreground: "oklch(0.9 0.03 85)",
    glass: "oklch(0.24 0.04 60 / 80%)",
    glassForeground: "oklch(0.9 0.03 85)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.27 0.04 60 / 70%)",
    card: "oklch(0.24 0.04 60 / 90%)",
    cardForeground: "oklch(0.9 0.03 85)",
    popover: "oklch(0.26 0.04 60 / 95%)",
    popoverForeground: "oklch(0.9 0.03 85)",
    primary: "oklch(0.7 0.16 35)",
    primaryForeground: "oklch(0.2 0.04 60)",
    secondary: "oklch(0.3 0.04 60 / 80%)",
    secondaryForeground: "oklch(0.9 0.03 85)",
    muted: "oklch(0.3 0.04 60 / 60%)",
    mutedForeground: "oklch(0.6 0.03 85)",
    accent: "oklch(0.33 0.04 60 / 70%)",
    accentForeground: "oklch(0.9 0.03 85)",
    destructive: "oklch(0.65 0.2 20)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.24 0.04 60 / 80%)",
    ring: "oklch(0.7 0.16 35 / 50%)",
    chart1: "oklch(0.7 0.16 35)",
    chart2: "oklch(0.72 0.15 145)",
    chart3: "oklch(0.7 0.15 240)",
    chart4: "oklch(0.8 0.15 85)",
    chart5: "oklch(0.65 0.2 20)",
    sidebar: "oklch(0.22 0.04 60 / 90%)",
    sidebarForeground: "oklch(0.9 0.03 85)",
    sidebarPrimary: "oklch(0.7 0.16 35)",
    sidebarPrimaryForeground: "oklch(0.2 0.04 60)",
    sidebarAccent: "oklch(0.3 0.04 60 / 60%)",
    sidebarAccentForeground: "oklch(0.9 0.03 85)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.7 0.16 35 / 50%)",
    editorBg: "oklch(0.18 0.04 60)",
    editorLine: "oklch(0.24 0.04 60)",
    editorSelection: "oklch(0.7 0.16 35 / 25%)",
    editorGutter: "oklch(0.5 0.03 85)",
    syntaxKeyword: "oklch(0.65 0.2 20)",
    syntaxString: "oklch(0.72 0.15 145)",
    syntaxFunction: "oklch(0.72 0.15 145)",
    syntaxVariable: "oklch(0.7 0.15 240)",
    syntaxComment: "oklch(0.5 0.03 85)",
    syntaxNumber: "oklch(0.7 0.15 280)",
    syntaxOperator: "oklch(0.7 0.16 35)",
    syntaxType: "oklch(0.8 0.15 85)",
    terminalBg: "oklch(0.16 0.04 60)",
    terminalGreen: "oklch(0.72 0.15 145)",
    terminalYellow: "oklch(0.8 0.15 85)",
    terminalBlue: "oklch(0.7 0.15 240)",
    terminalRed: "oklch(0.65 0.2 20)",
    terminalCyan: "oklch(0.7 0.12 195)",
    terminalMagenta: "oklch(0.7 0.15 280)",
  },
};

// One Dark Theme
export const oneDarkTheme: ThemeDefinition = {
  id: "oneDark",
  name: "One Dark",
  description: "Atom's iconic One Dark theme",
  author: "Atom",
  light: {
    background: "oklch(0.98 0.005 240)",
    foreground: "oklch(0.25 0.04 240)",
    glass: "oklch(0.99 0.003 240 / 70%)",
    glassForeground: "oklch(0.25 0.04 240)",
    glassBorder: "oklch(0.25 0.04 240 / 10%)",
    glassMuted: "oklch(0.95 0.005 240 / 80%)",
    card: "oklch(0.96 0.005 240 / 80%)",
    cardForeground: "oklch(0.25 0.04 240)",
    popover: "oklch(0.94 0.005 240 / 90%)",
    popoverForeground: "oklch(0.25 0.04 240)",
    primary: "oklch(0.55 0.18 240)",
    primaryForeground: "oklch(0.98 0.005 240)",
    secondary: "oklch(0.92 0.01 240 / 80%)",
    secondaryForeground: "oklch(0.25 0.04 240)",
    muted: "oklch(0.94 0.005 240 / 60%)",
    mutedForeground: "oklch(0.45 0.03 240)",
    accent: "oklch(0.96 0.005 240 / 70%)",
    accentForeground: "oklch(0.25 0.04 240)",
    destructive: "oklch(0.55 0.2 15)",
    border: "oklch(0.25 0.04 240 / 12%)",
    input: "oklch(0.98 0.005 240 / 80%)",
    ring: "oklch(0.55 0.18 240 / 50%)",
    chart1: "oklch(0.55 0.18 240)",
    chart2: "oklch(0.55 0.18 145)",
    chart3: "oklch(0.6 0.2 320)",
    chart4: "oklch(0.65 0.18 85)",
    chart5: "oklch(0.55 0.2 15)",
    sidebar: "oklch(0.96 0.005 240 / 90%)",
    sidebarForeground: "oklch(0.25 0.04 240)",
    sidebarPrimary: "oklch(0.55 0.18 240)",
    sidebarPrimaryForeground: "oklch(0.98 0.005 240)",
    sidebarAccent: "oklch(0.94 0.005 240 / 60%)",
    sidebarAccentForeground: "oklch(0.25 0.04 240)",
    sidebarBorder: "oklch(0.25 0.04 240 / 10%)",
    sidebarRing: "oklch(0.55 0.18 240 / 50%)",
    editorBg: "oklch(0.98 0.005 240)",
    editorLine: "oklch(0.96 0.005 240)",
    editorSelection: "oklch(0.55 0.18 240 / 20%)",
    editorGutter: "oklch(0.5 0.03 240)",
    syntaxKeyword: "oklch(0.6 0.2 320)",
    syntaxString: "oklch(0.55 0.18 145)",
    syntaxFunction: "oklch(0.55 0.18 240)",
    syntaxVariable: "oklch(0.55 0.2 15)",
    syntaxComment: "oklch(0.55 0.03 240)",
    syntaxNumber: "oklch(0.6 0.18 35)",
    syntaxOperator: "oklch(0.55 0.18 195)",
    syntaxType: "oklch(0.65 0.18 85)",
    terminalBg: "oklch(0.96 0.005 240)",
    terminalGreen: "oklch(0.55 0.18 145)",
    terminalYellow: "oklch(0.65 0.18 85)",
    terminalBlue: "oklch(0.55 0.18 240)",
    terminalRed: "oklch(0.55 0.2 15)",
    terminalCyan: "oklch(0.55 0.18 195)",
    terminalMagenta: "oklch(0.6 0.2 320)",
  },
  dark: {
    background: "oklch(0.2 0.02 250)",
    foreground: "oklch(0.88 0.01 250)",
    glass: "oklch(0.24 0.02 250 / 80%)",
    glassForeground: "oklch(0.88 0.01 250)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.27 0.02 250 / 70%)",
    card: "oklch(0.24 0.02 250 / 90%)",
    cardForeground: "oklch(0.88 0.01 250)",
    popover: "oklch(0.26 0.02 250 / 95%)",
    popoverForeground: "oklch(0.88 0.01 250)",
    primary: "oklch(0.68 0.16 240)",
    primaryForeground: "oklch(0.2 0.02 250)",
    secondary: "oklch(0.3 0.02 250 / 80%)",
    secondaryForeground: "oklch(0.88 0.01 250)",
    muted: "oklch(0.3 0.02 250 / 60%)",
    mutedForeground: "oklch(0.58 0.02 250)",
    accent: "oklch(0.33 0.02 250 / 70%)",
    accentForeground: "oklch(0.88 0.01 250)",
    destructive: "oklch(0.65 0.2 15)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.24 0.02 250 / 80%)",
    ring: "oklch(0.68 0.16 240 / 50%)",
    chart1: "oklch(0.68 0.16 240)",
    chart2: "oklch(0.72 0.15 145)",
    chart3: "oklch(0.75 0.17 320)",
    chart4: "oklch(0.8 0.15 85)",
    chart5: "oklch(0.65 0.2 15)",
    sidebar: "oklch(0.22 0.02 250 / 90%)",
    sidebarForeground: "oklch(0.88 0.01 250)",
    sidebarPrimary: "oklch(0.68 0.16 240)",
    sidebarPrimaryForeground: "oklch(0.2 0.02 250)",
    sidebarAccent: "oklch(0.3 0.02 250 / 60%)",
    sidebarAccentForeground: "oklch(0.88 0.01 250)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.68 0.16 240 / 50%)",
    editorBg: "oklch(0.18 0.02 250)",
    editorLine: "oklch(0.24 0.02 250)",
    editorSelection: "oklch(0.68 0.16 240 / 25%)",
    editorGutter: "oklch(0.48 0.02 250)",
    syntaxKeyword: "oklch(0.75 0.17 320)",
    syntaxString: "oklch(0.72 0.15 145)",
    syntaxFunction: "oklch(0.68 0.16 240)",
    syntaxVariable: "oklch(0.65 0.2 15)",
    syntaxComment: "oklch(0.48 0.02 250)",
    syntaxNumber: "oklch(0.72 0.15 35)",
    syntaxOperator: "oklch(0.7 0.15 195)",
    syntaxType: "oklch(0.8 0.15 85)",
    terminalBg: "oklch(0.16 0.02 250)",
    terminalGreen: "oklch(0.72 0.15 145)",
    terminalYellow: "oklch(0.8 0.15 85)",
    terminalBlue: "oklch(0.68 0.16 240)",
    terminalRed: "oklch(0.65 0.2 15)",
    terminalCyan: "oklch(0.7 0.15 195)",
    terminalMagenta: "oklch(0.75 0.17 320)",
  },
};

export const solarizedTheme: ThemeDefinition = {
  id: "solarized",
  name: "Solarized",
  description: "Precision colors for machines and people",
  author: "Ethan Schoonover",
  light: {
    background: "oklch(0.97 0.01 85)",
    foreground: "oklch(0.35 0.05 195)",
    glass: "oklch(0.99 0.005 85 / 70%)",
    glassForeground: "oklch(0.35 0.05 195)",
    glassBorder: "oklch(0.35 0.05 195 / 10%)",
    glassMuted: "oklch(0.94 0.01 85 / 80%)",
    card: "oklch(0.95 0.01 85 / 80%)",
    cardForeground: "oklch(0.35 0.05 195)",
    popover: "oklch(0.93 0.01 85 / 90%)",
    popoverForeground: "oklch(0.35 0.05 195)",
    primary: "oklch(0.55 0.15 230)",
    primaryForeground: "oklch(0.97 0.01 85)",
    secondary: "oklch(0.91 0.02 85 / 80%)",
    secondaryForeground: "oklch(0.35 0.05 195)",
    muted: "oklch(0.93 0.01 85 / 60%)",
    mutedForeground: "oklch(0.52 0.04 195)",
    accent: "oklch(0.91 0.02 85 / 70%)",
    accentForeground: "oklch(0.35 0.05 195)",
    destructive: "oklch(0.55 0.2 25)",
    border: "oklch(0.35 0.05 195 / 12%)",
    input: "oklch(0.97 0.01 85 / 80%)",
    ring: "oklch(0.55 0.15 230 / 50%)",
    chart1: "oklch(0.55 0.15 230)",
    chart2: "oklch(0.6 0.18 145)",
    chart3: "oklch(0.55 0.2 25)",
    chart4: "oklch(0.6 0.15 55)",
    chart5: "oklch(0.55 0.18 300)",
    sidebar: "oklch(0.95 0.01 85 / 90%)",
    sidebarForeground: "oklch(0.35 0.05 195)",
    sidebarPrimary: "oklch(0.55 0.15 230)",
    sidebarPrimaryForeground: "oklch(0.97 0.01 85)",
    sidebarAccent: "oklch(0.91 0.02 85 / 60%)",
    sidebarAccentForeground: "oklch(0.35 0.05 195)",
    sidebarBorder: "oklch(0.35 0.05 195 / 10%)",
    sidebarRing: "oklch(0.55 0.15 230 / 50%)",
    editorBg: "oklch(0.97 0.01 85)",
    editorLine: "oklch(0.95 0.01 85)",
    editorSelection: "oklch(0.55 0.15 230 / 20%)",
    editorGutter: "oklch(0.52 0.04 195)",
    syntaxKeyword: "oklch(0.6 0.18 145)",
    syntaxString: "oklch(0.6 0.15 195)",
    syntaxFunction: "oklch(0.55 0.15 230)",
    syntaxVariable: "oklch(0.55 0.15 230)",
    syntaxComment: "oklch(0.62 0.04 85)",
    syntaxNumber: "oklch(0.55 0.18 300)",
    syntaxOperator: "oklch(0.6 0.18 145)",
    syntaxType: "oklch(0.6 0.15 55)",
    terminalBg: "oklch(0.95 0.01 85)",
    terminalGreen: "oklch(0.6 0.18 145)",
    terminalYellow: "oklch(0.65 0.15 85)",
    terminalBlue: "oklch(0.55 0.15 230)",
    terminalRed: "oklch(0.55 0.2 25)",
    terminalCyan: "oklch(0.6 0.15 195)",
    terminalMagenta: "oklch(0.55 0.18 300)",
  },
  dark: {
    background: "oklch(0.15 0.03 220)",
    foreground: "oklch(0.75 0.03 85)",
    glass: "oklch(0.18 0.03 220 / 80%)",
    glassForeground: "oklch(0.75 0.03 85)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.2 0.03 220 / 70%)",
    card: "oklch(0.18 0.03 220 / 90%)",
    cardForeground: "oklch(0.75 0.03 85)",
    popover: "oklch(0.2 0.03 220 / 95%)",
    popoverForeground: "oklch(0.75 0.03 85)",
    primary: "oklch(0.65 0.15 230)",
    primaryForeground: "oklch(0.15 0.03 220)",
    secondary: "oklch(0.22 0.03 220 / 80%)",
    secondaryForeground: "oklch(0.75 0.03 85)",
    muted: "oklch(0.22 0.03 220 / 60%)",
    mutedForeground: "oklch(0.6 0.03 85)",
    accent: "oklch(0.25 0.03 220 / 70%)",
    accentForeground: "oklch(0.75 0.03 85)",
    destructive: "oklch(0.6 0.2 25)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.18 0.03 220 / 80%)",
    ring: "oklch(0.65 0.15 230 / 50%)",
    chart1: "oklch(0.65 0.15 230)",
    chart2: "oklch(0.7 0.18 145)",
    chart3: "oklch(0.6 0.2 25)",
    chart4: "oklch(0.7 0.15 55)",
    chart5: "oklch(0.65 0.18 300)",
    sidebar: "oklch(0.17 0.03 220 / 90%)",
    sidebarForeground: "oklch(0.75 0.03 85)",
    sidebarPrimary: "oklch(0.65 0.15 230)",
    sidebarPrimaryForeground: "oklch(0.15 0.03 220)",
    sidebarAccent: "oklch(0.22 0.03 220 / 60%)",
    sidebarAccentForeground: "oklch(0.75 0.03 85)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.65 0.15 230 / 50%)",
    editorBg: "oklch(0.13 0.03 220)",
    editorLine: "oklch(0.18 0.03 220)",
    editorSelection: "oklch(0.65 0.15 230 / 25%)",
    editorGutter: "oklch(0.5 0.03 85)",
    syntaxKeyword: "oklch(0.7 0.18 145)",
    syntaxString: "oklch(0.7 0.15 195)",
    syntaxFunction: "oklch(0.65 0.15 230)",
    syntaxVariable: "oklch(0.65 0.15 230)",
    syntaxComment: "oklch(0.52 0.03 85)",
    syntaxNumber: "oklch(0.65 0.18 300)",
    syntaxOperator: "oklch(0.7 0.18 145)",
    syntaxType: "oklch(0.7 0.15 55)",
    terminalBg: "oklch(0.12 0.03 220)",
    terminalGreen: "oklch(0.7 0.18 145)",
    terminalYellow: "oklch(0.75 0.15 85)",
    terminalBlue: "oklch(0.65 0.15 230)",
    terminalRed: "oklch(0.6 0.2 25)",
    terminalCyan: "oklch(0.7 0.15 195)",
    terminalMagenta: "oklch(0.65 0.18 300)",
  },
};

export const rosePineTheme: ThemeDefinition = {
  id: "rosePine",
  name: "Rosé Pine",
  description: "All natural pine, faux fur and a bit of soho vibes",
  author: "Rosé Pine",
  light: {
    background: "oklch(0.97 0.01 350)",
    foreground: "oklch(0.35 0.04 280)",
    glass: "oklch(0.99 0.005 350 / 70%)",
    glassForeground: "oklch(0.35 0.04 280)",
    glassBorder: "oklch(0.35 0.04 280 / 10%)",
    glassMuted: "oklch(0.94 0.01 350 / 80%)",
    card: "oklch(0.95 0.01 350 / 80%)",
    cardForeground: "oklch(0.35 0.04 280)",
    popover: "oklch(0.93 0.01 350 / 90%)",
    popoverForeground: "oklch(0.35 0.04 280)",
    primary: "oklch(0.6 0.18 340)",
    primaryForeground: "oklch(0.97 0.01 350)",
    secondary: "oklch(0.91 0.015 350 / 80%)",
    secondaryForeground: "oklch(0.35 0.04 280)",
    muted: "oklch(0.93 0.01 350 / 60%)",
    mutedForeground: "oklch(0.5 0.03 280)",
    accent: "oklch(0.91 0.015 350 / 70%)",
    accentForeground: "oklch(0.35 0.04 280)",
    destructive: "oklch(0.6 0.2 15)",
    border: "oklch(0.35 0.04 280 / 12%)",
    input: "oklch(0.97 0.01 350 / 80%)",
    ring: "oklch(0.6 0.18 340 / 50%)",
    chart1: "oklch(0.6 0.18 340)",
    chart2: "oklch(0.7 0.15 180)",
    chart3: "oklch(0.65 0.18 280)",
    chart4: "oklch(0.7 0.15 85)",
    chart5: "oklch(0.6 0.2 15)",
    sidebar: "oklch(0.95 0.01 350 / 90%)",
    sidebarForeground: "oklch(0.35 0.04 280)",
    sidebarPrimary: "oklch(0.6 0.18 340)",
    sidebarPrimaryForeground: "oklch(0.97 0.01 350)",
    sidebarAccent: "oklch(0.91 0.015 350 / 60%)",
    sidebarAccentForeground: "oklch(0.35 0.04 280)",
    sidebarBorder: "oklch(0.35 0.04 280 / 10%)",
    sidebarRing: "oklch(0.6 0.18 340 / 50%)",
    editorBg: "oklch(0.97 0.01 350)",
    editorLine: "oklch(0.95 0.01 350)",
    editorSelection: "oklch(0.6 0.18 340 / 20%)",
    editorGutter: "oklch(0.5 0.03 280)",
    syntaxKeyword: "oklch(0.6 0.18 340)",
    syntaxString: "oklch(0.7 0.15 180)",
    syntaxFunction: "oklch(0.6 0.18 340)",
    syntaxVariable: "oklch(0.6 0.18 340)",
    syntaxComment: "oklch(0.6 0.03 280)",
    syntaxNumber: "oklch(0.7 0.15 85)",
    syntaxOperator: "oklch(0.55 0.15 280)",
    syntaxType: "oklch(0.65 0.18 280)",
    terminalBg: "oklch(0.95 0.01 350)",
    terminalGreen: "oklch(0.7 0.15 180)",
    terminalYellow: "oklch(0.7 0.15 85)",
    terminalBlue: "oklch(0.65 0.18 280)",
    terminalRed: "oklch(0.6 0.2 15)",
    terminalCyan: "oklch(0.7 0.15 180)",
    terminalMagenta: "oklch(0.6 0.18 340)",
  },
  dark: {
    background: "oklch(0.18 0.03 280)",
    foreground: "oklch(0.9 0.02 350)",
    glass: "oklch(0.22 0.03 280 / 80%)",
    glassForeground: "oklch(0.9 0.02 350)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.25 0.03 280 / 70%)",
    card: "oklch(0.22 0.03 280 / 90%)",
    cardForeground: "oklch(0.9 0.02 350)",
    popover: "oklch(0.25 0.03 280 / 95%)",
    popoverForeground: "oklch(0.9 0.02 350)",
    primary: "oklch(0.75 0.15 340)",
    primaryForeground: "oklch(0.18 0.03 280)",
    secondary: "oklch(0.28 0.03 280 / 80%)",
    secondaryForeground: "oklch(0.9 0.02 350)",
    muted: "oklch(0.28 0.03 280 / 60%)",
    mutedForeground: "oklch(0.65 0.02 350)",
    accent: "oklch(0.3 0.03 280 / 70%)",
    accentForeground: "oklch(0.9 0.02 350)",
    destructive: "oklch(0.65 0.2 15)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.22 0.03 280 / 80%)",
    ring: "oklch(0.75 0.15 340 / 50%)",
    chart1: "oklch(0.75 0.15 340)",
    chart2: "oklch(0.75 0.12 180)",
    chart3: "oklch(0.7 0.15 280)",
    chart4: "oklch(0.8 0.12 85)",
    chart5: "oklch(0.65 0.2 15)",
    sidebar: "oklch(0.2 0.03 280 / 90%)",
    sidebarForeground: "oklch(0.9 0.02 350)",
    sidebarPrimary: "oklch(0.75 0.15 340)",
    sidebarPrimaryForeground: "oklch(0.18 0.03 280)",
    sidebarAccent: "oklch(0.28 0.03 280 / 60%)",
    sidebarAccentForeground: "oklch(0.9 0.02 350)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.75 0.15 340 / 50%)",
    editorBg: "oklch(0.16 0.03 280)",
    editorLine: "oklch(0.22 0.03 280)",
    editorSelection: "oklch(0.75 0.15 340 / 25%)",
    editorGutter: "oklch(0.5 0.02 350)",
    syntaxKeyword: "oklch(0.75 0.15 340)",
    syntaxString: "oklch(0.75 0.12 180)",
    syntaxFunction: "oklch(0.75 0.15 340)",
    syntaxVariable: "oklch(0.75 0.15 340)",
    syntaxComment: "oklch(0.5 0.02 350)",
    syntaxNumber: "oklch(0.8 0.12 85)",
    syntaxOperator: "oklch(0.65 0.12 280)",
    syntaxType: "oklch(0.7 0.15 280)",
    terminalBg: "oklch(0.15 0.03 280)",
    terminalGreen: "oklch(0.75 0.12 180)",
    terminalYellow: "oklch(0.8 0.12 85)",
    terminalBlue: "oklch(0.7 0.15 280)",
    terminalRed: "oklch(0.65 0.2 15)",
    terminalCyan: "oklch(0.75 0.12 180)",
    terminalMagenta: "oklch(0.75 0.15 340)",
  },
};

export const ayuTheme: ThemeDefinition = {
  id: "ayu",
  name: "Ayu",
  description: "Simple, bright colors with minimal syntax highlighting",
  author: "Ayu Theme",
  light: {
    background: "oklch(0.98 0.005 85)",
    foreground: "oklch(0.35 0.03 250)",
    glass: "oklch(1 0 0 / 70%)",
    glassForeground: "oklch(0.35 0.03 250)",
    glassBorder: "oklch(0.35 0.03 250 / 10%)",
    glassMuted: "oklch(0.95 0.005 85 / 80%)",
    card: "oklch(0.96 0.005 85 / 80%)",
    cardForeground: "oklch(0.35 0.03 250)",
    popover: "oklch(0.94 0.005 85 / 90%)",
    popoverForeground: "oklch(0.35 0.03 250)",
    primary: "oklch(0.7 0.18 55)",
    primaryForeground: "oklch(0.15 0.02 250)",
    secondary: "oklch(0.92 0.01 85 / 80%)",
    secondaryForeground: "oklch(0.35 0.03 250)",
    muted: "oklch(0.94 0.005 85 / 60%)",
    mutedForeground: "oklch(0.5 0.02 250)",
    accent: "oklch(0.92 0.01 85 / 70%)",
    accentForeground: "oklch(0.35 0.03 250)",
    destructive: "oklch(0.6 0.22 20)",
    border: "oklch(0.35 0.03 250 / 12%)",
    input: "oklch(0.98 0.005 85 / 80%)",
    ring: "oklch(0.7 0.18 55 / 50%)",
    chart1: "oklch(0.7 0.18 55)",
    chart2: "oklch(0.65 0.18 160)",
    chart3: "oklch(0.6 0.2 20)",
    chart4: "oklch(0.55 0.15 280)",
    chart5: "oklch(0.6 0.15 200)",
    sidebar: "oklch(0.96 0.005 85 / 90%)",
    sidebarForeground: "oklch(0.35 0.03 250)",
    sidebarPrimary: "oklch(0.7 0.18 55)",
    sidebarPrimaryForeground: "oklch(0.15 0.02 250)",
    sidebarAccent: "oklch(0.92 0.01 85 / 60%)",
    sidebarAccentForeground: "oklch(0.35 0.03 250)",
    sidebarBorder: "oklch(0.35 0.03 250 / 10%)",
    sidebarRing: "oklch(0.7 0.18 55 / 50%)",
    editorBg: "oklch(0.98 0.005 85)",
    editorLine: "oklch(0.96 0.005 85)",
    editorSelection: "oklch(0.7 0.18 55 / 20%)",
    editorGutter: "oklch(0.5 0.02 250)",
    syntaxKeyword: "oklch(0.7 0.18 55)",
    syntaxString: "oklch(0.65 0.18 160)",
    syntaxFunction: "oklch(0.6 0.15 200)",
    syntaxVariable: "oklch(0.6 0.2 20)",
    syntaxComment: "oklch(0.6 0.02 250)",
    syntaxNumber: "oklch(0.55 0.15 280)",
    syntaxOperator: "oklch(0.5 0.02 250)",
    syntaxType: "oklch(0.55 0.15 200)",
    terminalBg: "oklch(0.96 0.005 85)",
    terminalGreen: "oklch(0.65 0.18 160)",
    terminalYellow: "oklch(0.7 0.18 55)",
    terminalBlue: "oklch(0.6 0.15 200)",
    terminalRed: "oklch(0.6 0.2 20)",
    terminalCyan: "oklch(0.6 0.15 200)",
    terminalMagenta: "oklch(0.55 0.15 280)",
  },
  dark: {
    background: "oklch(0.15 0.02 250)",
    foreground: "oklch(0.85 0.02 85)",
    glass: "oklch(0.18 0.02 250 / 80%)",
    glassForeground: "oklch(0.85 0.02 85)",
    glassBorder: "oklch(1 0 0 / 8%)",
    glassMuted: "oklch(0.2 0.02 250 / 70%)",
    card: "oklch(0.18 0.02 250 / 90%)",
    cardForeground: "oklch(0.85 0.02 85)",
    popover: "oklch(0.2 0.02 250 / 95%)",
    popoverForeground: "oklch(0.85 0.02 85)",
    primary: "oklch(0.75 0.18 55)",
    primaryForeground: "oklch(0.15 0.02 250)",
    secondary: "oklch(0.22 0.02 250 / 80%)",
    secondaryForeground: "oklch(0.85 0.02 85)",
    muted: "oklch(0.22 0.02 250 / 60%)",
    mutedForeground: "oklch(0.6 0.02 85)",
    accent: "oklch(0.25 0.02 250 / 70%)",
    accentForeground: "oklch(0.85 0.02 85)",
    destructive: "oklch(0.65 0.22 20)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(0.18 0.02 250 / 80%)",
    ring: "oklch(0.75 0.18 55 / 50%)",
    chart1: "oklch(0.75 0.18 55)",
    chart2: "oklch(0.72 0.15 160)",
    chart3: "oklch(0.65 0.2 20)",
    chart4: "oklch(0.6 0.15 280)",
    chart5: "oklch(0.65 0.15 200)",
    sidebar: "oklch(0.17 0.02 250 / 90%)",
    sidebarForeground: "oklch(0.85 0.02 85)",
    sidebarPrimary: "oklch(0.75 0.18 55)",
    sidebarPrimaryForeground: "oklch(0.15 0.02 250)",
    sidebarAccent: "oklch(0.22 0.02 250 / 60%)",
    sidebarAccentForeground: "oklch(0.85 0.02 85)",
    sidebarBorder: "oklch(1 0 0 / 8%)",
    sidebarRing: "oklch(0.75 0.18 55 / 50%)",
    editorBg: "oklch(0.13 0.02 250)",
    editorLine: "oklch(0.18 0.02 250)",
    editorSelection: "oklch(0.75 0.18 55 / 25%)",
    editorGutter: "oklch(0.48 0.02 85)",
    syntaxKeyword: "oklch(0.75 0.18 55)",
    syntaxString: "oklch(0.72 0.15 160)",
    syntaxFunction: "oklch(0.65 0.15 200)",
    syntaxVariable: "oklch(0.65 0.2 20)",
    syntaxComment: "oklch(0.48 0.02 85)",
    syntaxNumber: "oklch(0.6 0.15 280)",
    syntaxOperator: "oklch(0.7 0.02 85)",
    syntaxType: "oklch(0.65 0.15 200)",
    terminalBg: "oklch(0.12 0.02 250)",
    terminalGreen: "oklch(0.72 0.15 160)",
    terminalYellow: "oklch(0.75 0.18 55)",
    terminalBlue: "oklch(0.65 0.15 200)",
    terminalRed: "oklch(0.65 0.2 20)",
    terminalCyan: "oklch(0.65 0.15 200)",
    terminalMagenta: "oklch(0.6 0.15 280)",
  },
};

// All available themes
export const themes: Record<ColorScheme, ThemeDefinition> = {
  vscode: vscodeTheme,
  catppuccin: catppuccinTheme,
  tokyoNight: tokyoNightTheme,
  dracula: draculaTheme,
  nord: nordTheme,
  gruvbox: gruvboxTheme,
  oneDark: oneDarkTheme,
  solarized: solarizedTheme,
  rosePine: rosePineTheme,
  ayu: ayuTheme,
};

// Default theme
export const DEFAULT_COLOR_SCHEME: ColorScheme = "vscode";
export const DEFAULT_THEME_MODE: ThemeMode = "system";

// Local storage keys
export const STORAGE_KEY_COLOR_SCHEME = "portfolio-color-scheme";

/**
 * ThemeManager class for managing theme operations
 */
export class ThemeManager {
  private static instance: ThemeManager;
  private currentScheme: ColorScheme = DEFAULT_COLOR_SCHEME;

  private constructor() {}

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  public getTheme(scheme: ColorScheme): ThemeDefinition {
    return themes[scheme];
  }

  public getAllThemes(): ThemeDefinition[] {
    return Object.values(themes);
  }

  public getThemeColors(
    scheme: ColorScheme,
    mode: "light" | "dark"
  ): ThemeColors {
    return themes[scheme][mode];
  }

  public setCurrentScheme(scheme: ColorScheme): void {
    this.currentScheme = scheme;
  }

  public getCurrentScheme(): ColorScheme {
    return this.currentScheme;
  }

  /**
   * Generate CSS variables from theme colors
   */
  public generateCSSVariables(colors: ThemeColors): Record<string, string> {
    return {
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
  }
}
