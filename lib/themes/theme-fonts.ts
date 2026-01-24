/**
 * Theme Font Configuration
 *
 * Maps each theme to a matching Google Font family.
 * Fonts are loaded dynamically only when needed (preview or apply).
 */

import type { ColorScheme } from "./theme-config";

/**
 * Font configuration for a theme
 */
export interface ThemeFontConfig {
  /** Google Font family name (exactly as it appears on Google Fonts) */
  family: string;
  /** Font weights to load */
  weights: number[];
  /** Optional: CSS font-family fallback stack */
  fallback?: string;
}

/**
 * Google Fonts URL base
 */
const GOOGLE_FONTS_BASE = "https://fonts.googleapis.com/css2";

/**
 * Theme to font mapping - each theme gets a carefully selected Google Font
 * that matches its aesthetic
 */
export const themeFonts: Record<ColorScheme, ThemeFontConfig> = {
  // Classic/Professional themes
  vscode: { family: "Inter", weights: [400, 500, 600, 700], fallback: "system-ui, sans-serif" },
  github: { family: "Inter", weights: [400, 500, 600, 700], fallback: "system-ui, sans-serif" },
  
  // Elegant/Modern themes
  catppuccin: { family: "Nunito", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  rosePine: { family: "Quicksand", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Dark/Cyberpunk themes
  tokyoNight: { family: "Outfit", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  dracula: { family: "Rubik", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  matrix: { family: "Share Tech", weights: [400], fallback: "monospace" },
  cyberspace: { family: "Orbitron", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Nordic/Clean themes
  nord: { family: "Plus Jakarta Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  nordLight: { family: "Plus Jakarta Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  iceberg: { family: "Lexend", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Warm/Earthy themes
  gruvbox: { family: "Source Sans 3", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  terra: { family: "DM Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  honey: { family: "Poppins", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  copper: { family: "Manrope", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Retro/Vintage themes
  solarized: { family: "IBM Plex Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  oneDark: { family: "Geist", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  monokai: { family: "Archivo", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Asian-inspired themes
  ayu: { family: "Noto Sans JP", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Playful/Cute themes
  dino: { family: "Fredoka", weights: [400, 500, 600, 700], fallback: "cursive" },
  magicGirl: { family: "Comfortaa", weights: [400, 500, 600, 700], fallback: "cursive" },
  milkshake: { family: "Varela Round", weights: [400], fallback: "sans-serif" },
  msCupcakes: { family: "Baloo 2", weights: [400, 500, 600, 700], fallback: "cursive" },
  peaches: { family: "Quicksand", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  cheesecake: { family: "Nunito", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  froyo: { family: "Lexend", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Minimalist themes
  modernInk: { family: "Space Grotesk", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  serika: { family: "Work Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  stealth: { family: "Sora", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  yami: { family: "Outfit", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Colorful/Vibrant themes
  theme8008: { family: "Urbanist", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  olivia: { family: "Raleway", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  spectrum: { family: "Figtree", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  watermelon: { family: "Nunito Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  lime: { family: "Karla", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Japanese/Elegant themes
  bento: { family: "M PLUS Rounded 1c", weights: [400, 500, 700], fallback: "sans-serif" },
  
  // Industrial/Tech themes
  carbon: { family: "IBM Plex Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  material: { family: "Roboto", weights: [400, 500, 700], fallback: "sans-serif" },
  dev: { family: "JetBrains Mono", weights: [400, 500, 600, 700], fallback: "monospace" },
  
  // Sunset/Horizon themes
  horizon: { family: "Montserrat", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  vaporwave: { family: "Righteous", weights: [400], fallback: "cursive" },
  
  // Nature themes
  luna: { family: "Lato", weights: [400, 700], fallback: "sans-serif" },
  aurora: { family: "Josefin Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  moonlight: { family: "Cabin", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  mizu: { family: "Mukta", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Fresh/Clean themes
  mint: { family: "Open Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  menthol: { family: "Mulish", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  godspeed: { family: "Exo 2", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Dark/Moody themes
  midnight: { family: "Albert Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  vesper: { family: "Barlow", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  leatherback: { family: "Titillium Web", weights: [400, 600, 700], fallback: "sans-serif" },
  sonokai: { family: "Atkinson Hyperlegible", weights: [400, 700], fallback: "sans-serif" },
  
  // Quirky/Unique themes
  joker: { family: "Permanent Marker", weights: [400], fallback: "cursive" },
  witchGirl: { family: "Caveat", weights: [400, 500, 600, 700], fallback: "cursive" },
  chaosTheory: { family: "Chakra Petch", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  lilDragon: { family: "Noto Sans SC", weights: [400, 500, 700], fallback: "sans-serif" },
  
  // Japanese-inspired
  sewingTin: { family: "Zen Maru Gothic", weights: [400, 500, 700], fallback: "sans-serif" },
  
  // Gaming/Action themes
  redSamurai: { family: "Saira", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  striker: { family: "Russo One", weights: [400], fallback: "sans-serif" },
  taro: { family: "Kumbh Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  laser: { family: "Audiowide", weights: [400], fallback: "cursive" },
  nebula: { family: "Oxanium", weights: [400, 500, 600, 700], fallback: "cursive" },
  superuser: { family: "Ubuntu", weights: [400, 500, 700], fallback: "sans-serif" },
  
  // Cozy/Comfortable themes
  comfy: { family: "Nunito", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Handwriting/Script themes
  handwriting: { family: "Kalam", weights: [400, 700], fallback: "cursive" },
};

/**
 * Set of currently loaded fonts to prevent duplicate loading
 */
const loadedFonts = new Set<string>();

/**
 * Currently loading fonts (promises) to prevent concurrent loads of same font
 */
const loadingFonts = new Map<string, Promise<void>>();

/**
 * Generate Google Fonts URL for a font configuration
 */
export function getFontUrl(config: ThemeFontConfig): string {
  const family = config.family.replace(/ /g, "+");
  const weights = config.weights.join(";");
  return `${GOOGLE_FONTS_BASE}?family=${family}:wght@${weights}&display=swap`;
}

/**
 * Preload a font (add link rel="preload" to head)
 * This hints the browser to load the font early
 */
export function preloadFont(scheme: ColorScheme): void {
  if (typeof window === "undefined") return;
  
  const config = themeFonts[scheme];
  if (!config || loadedFonts.has(config.family)) return;
  
  const fontUrl = getFontUrl(config);
  const existingPreload = document.querySelector(`link[href="${fontUrl}"][rel="preload"]`);
  
  if (!existingPreload) {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "style";
    preloadLink.href = fontUrl;
    document.head.appendChild(preloadLink);
  }
}

/**
 * Load a Google Font dynamically
 * Returns a promise that resolves when the font is loaded
 */
export async function loadFont(scheme: ColorScheme): Promise<void> {
  if (typeof window === "undefined") return;
  
  const config = themeFonts[scheme];
  if (!config) return;
  
  // Already loaded
  if (loadedFonts.has(config.family)) return;
  
  // Currently loading - wait for it
  const existingLoad = loadingFonts.get(config.family);
  if (existingLoad) return existingLoad;
  
  const fontUrl = getFontUrl(config);
  
  // Check if stylesheet already exists (not preload, must be rel="stylesheet")
  const existingStylesheet = document.querySelector(`link[rel="stylesheet"][href="${fontUrl}"]`);
  if (existingStylesheet) {
    loadedFonts.add(config.family);
    return;
  }
  
  // Create loading promise
  const loadPromise = new Promise<void>((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    
    link.onload = () => {
      loadedFonts.add(config.family);
      loadingFonts.delete(config.family);
      resolve();
    };
    
    link.onerror = () => {
      loadingFonts.delete(config.family);
      reject(new Error(`Failed to load font: ${config.family}`));
    };
    
    document.head.appendChild(link);
  });
  
  loadingFonts.set(config.family, loadPromise);
  return loadPromise;
}

/**
 * Get CSS font-family value for a theme
 */
export function getFontFamily(scheme: ColorScheme): string {
  const config = themeFonts[scheme];
  if (!config) return "var(--font-sans), system-ui, sans-serif";
  
  const fallback = config.fallback || "sans-serif";
  return `"${config.family}", ${fallback}`;
}

/**
 * Apply theme font to document root
 */
export function applyThemeFont(scheme: ColorScheme): void {
  if (typeof window === "undefined") return;
  
  const fontFamily = getFontFamily(scheme);
  document.documentElement.style.setProperty("--font-theme", fontFamily);
}

/**
 * Check if a font is loaded
 */
export function isFontLoaded(scheme: ColorScheme): boolean {
  const config = themeFonts[scheme];
  return config ? loadedFonts.has(config.family) : false;
}
