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
  github: { family: "Fira Sans", weights: [400, 500, 600, 700], fallback: "system-ui, sans-serif" },
  
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
  nordLight: { family: "Epilogue", weights: [400, 500, 600, 700], fallback: "sans-serif" },
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
  peaches: { family: "Dosis", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  cheesecake: { family: "Comic Neue", weights: [400, 500, 600, 700], fallback: "cursive" },
  froyo: { family: "Nunito Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Minimalist themes
  modernInk: { family: "Space Grotesk", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  serika: { family: "Work Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  stealth: { family: "Sora", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  yami: { family: "Rajdhani", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Colorful/Vibrant themes
  theme8008: { family: "Urbanist", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  olivia: { family: "Raleway", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  spectrum: { family: "Figtree", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  watermelon: { family: "Red Hat Display", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  lime: { family: "Karla", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Japanese/Elegant themes
  bento: { family: "M PLUS Rounded 1c", weights: [400, 500, 700], fallback: "sans-serif" },
  
  // Industrial/Tech themes
  carbon: { family: "Syne", weights: [400, 500, 600, 700], fallback: "sans-serif" },
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
  comfy: { family: "Signika", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  
  // Handwriting/Script themes
  handwriting: { family: "Kalam", weights: [400, 700], fallback: "cursive" },

  // 50 new themes
  oceanBreeze: { family: "Source Sans 3", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  forestFloor: { family: "Merriweather Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  desertDune: { family: "Literata", weights: [400, 500, 600, 700], fallback: "serif" },
  cherryBlossom: { family: "Zen Kaku Gothic New", weights: [400, 500, 700], fallback: "sans-serif" },
  midnightOil: { family: "Encode Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  lavenderField: { family: "Cormorant Garamond", weights: [400, 500, 600, 700], fallback: "serif" },
  sunriseGlow: { family: "Nunito", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  arcticFrost: { family: "DM Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  emeraldCity: { family: "Outfit", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  coralGarden: { family: "Plus Jakarta Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  pumpkinPatch: { family: "Libre Baskerville", weights: [400, 700], fallback: "serif" },
  sakuraPink: { family: "Noto Sans JP", weights: [400, 500, 700], fallback: "sans-serif" },
  obsidian: { family: "JetBrains Mono", weights: [400, 500, 600, 700], fallback: "monospace" },
  mintChip: { family: "Quicksand", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  strawberry: { family: "Fredoka", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  plumHarvest: { family: "Lora", weights: [400, 500, 600, 700], fallback: "serif" },
  apricot: { family: "Kalam", weights: [400, 700], fallback: "cursive" },
  glacierBlue: { family: "Inter", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  sunflower: { family: "Bebas Neue", weights: [400], fallback: "sans-serif" },
  slateGray: { family: "Roboto Condensed", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  roseGold: { family: "Playfair Display", weights: [400, 500, 600, 700], fallback: "serif" },
  sageGreen: { family: "Rokkitt", weights: [400, 500, 600, 700], fallback: "serif" },
  tangerine: { family: "Varela Round", weights: [400], fallback: "sans-serif" },
  lagoon: { family: "Rubik", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  violetDream: { family: "Crimson Text", weights: [400, 600, 700], fallback: "serif" },
  ivory: { family: "Libre Baskerville", weights: [400, 700], fallback: "serif" },
  espresso: { family: "Merriweather", weights: [400, 700], fallback: "serif" },
  peachSorbet: { family: "Catamaran", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  cobalt: { family: "Encode Sans Expanded", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  jadeStone: { family: "Zilla Slab", weights: [400, 500, 600, 700], fallback: "serif" },
  crimson: { family: "Libre Baskerville", weights: [400, 700], fallback: "serif" },
  amberGlow: { family: "Anton", weights: [400], fallback: "sans-serif" },
  mistyGray: { family: "Open Sans Condensed", weights: [300, 700], fallback: "sans-serif" },
  orchid: { family: "Cormorant", weights: [400, 500, 600, 700], fallback: "serif" },
  bamboo: { family: "PT Sans", weights: [400, 700], fallback: "sans-serif" },
  saffron: { family: "Yantramanav", weights: [400, 500, 700], fallback: "sans-serif" },
  graphite: { family: "IBM Plex Mono", weights: [400, 500, 600, 700], fallback: "monospace" },
  aquamarine: { family: "Literata", weights: [400, 500, 600, 700], fallback: "serif" },
  blushPink: { family: "Lato", weights: [400, 700], fallback: "sans-serif" },
  denimBlue: { family: "Oswald", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  mossGarden: { family: "Karla", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  papaya: { family: "Hind", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  periwinkle: { family: "Fauna One", weights: [400], fallback: "serif" },
  rust: { family: "EB Garamond", weights: [400, 500, 600, 700], fallback: "serif" },
  seafoam: { family: "Asap", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  terracotta: { family: "Trirong", weights: [400, 500, 600, 700], fallback: "serif" },
  wineDark: { family: "Cinzel", weights: [400, 600, 700], fallback: "serif" },
  honeydew: { family: "Hind Siliguri", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  midnightPurple: { family: "Spectral", weights: [400, 500, 600, 700], fallback: "serif" },
  coastal: { family: "Barlow Condensed", weights: [400, 500, 600, 700], fallback: "sans-serif" },

  // 50 new themes (batch 2)
  berrySmoothie: { family: "Overpass", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  goldenHour: { family: "Cormorant", weights: [400, 500, 600, 700], fallback: "serif" },
  twilight: { family: "Crimson Pro", weights: [400, 500, 600, 700], fallback: "serif" },
  fern: { family: "Sen", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  frost: { family: "Overpass Mono", weights: [400, 600, 700], fallback: "monospace" },
  ink: { family: "Inconsolata", weights: [400, 500, 600, 700], fallback: "monospace" },
  mango: { family: "Patrick Hand", weights: [400], fallback: "cursive" },
  storm: { family: "Oxygen", weights: [400, 700], fallback: "sans-serif" },
  willow: { family: "Gentium Plus", weights: [400, 700], fallback: "serif" },
  ash: { family: "Barlow Semi Condensed", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  blushWine: { family: "Cormorant Infant", weights: [400, 500, 600, 700], fallback: "serif" },
  charcoal: { family: "Schibsted Grotesk", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  clover: { family: "News Cycle", weights: [400, 700], fallback: "sans-serif" },
  dusk: { family: "Cormorant Garamond", weights: [400, 500, 600, 700], fallback: "serif" },
  firefly: { family: "B612 Mono", weights: [400, 700], fallback: "monospace" },
  frostbite: { family: "Outfit", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  ginger: { family: "Recursive", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  haze: { family: "Nobile", weights: [400, 500, 700], fallback: "sans-serif" },
  iris: { family: "Cormorant Unicase", weights: [400, 500, 600, 700], fallback: "serif" },
  jasmine: { family: "Fraunces", weights: [400, 500, 600, 700], fallback: "serif" },
  kelp: { family: "Familjen Grotesk", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  lavender: { family: "Cormorant", weights: [400, 500, 600, 700], fallback: "serif" },
  lichen: { family: "PT Serif", weights: [400, 700], fallback: "serif" },
  mercury: { family: "Space Mono", weights: [400, 700], fallback: "monospace" },
  nectar: { family: "Vollkorn", weights: [400, 500, 600, 700], fallback: "serif" },
  olive: { family: "Spectral", weights: [400, 500, 600, 700], fallback: "serif" },
  pearl: { family: "Cormorant Garamond", weights: [400, 500, 600, 700], fallback: "serif" },
  quartz: { family: "Libre Franklin", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  rain: { family: "Noto Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  sand: { family: "Lora", weights: [400, 500, 600, 700], fallback: "serif" },
  shadow: { family: "Anonymous Pro", weights: [400, 700], fallback: "monospace" },
  silver: { family: "Inter", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  smoke: { family: "Source Serif 4", weights: [400, 500, 600, 700], fallback: "serif" },
  snow: { family: "Commissioner", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  steel: { family: "Bebas Neue", weights: [400], fallback: "sans-serif" },
  stone: { family: "Lora", weights: [400, 500, 600, 700], fallback: "serif" },
  sulfur: { family: "Yellowtail", weights: [400], fallback: "cursive" },
  titanium: { family: "IBM Plex Mono", weights: [400, 500, 600, 700], fallback: "monospace" },
  tulip: { family: "Italiana", weights: [400], fallback: "serif" },
  umber: { family: "EB Garamond", weights: [400, 500, 600, 700], fallback: "serif" },
  vanilla: { family: "Scope One", weights: [400], fallback: "serif" },
  wheat: { family: "Bitter", weights: [400, 500, 600, 700], fallback: "serif" },
  whiskey: { family: "Libre Baskerville", weights: [400, 700], fallback: "serif" },
  zinc: { family: "Roboto Mono", weights: [400, 500, 600, 700], fallback: "monospace" },
  auroraBorealis: { family: "Josefin Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  bluebell: { family: "Crimson Text", weights: [400, 600, 700], fallback: "serif" },
  cactus: { family: "Fira Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  daffodil: { family: "Alfa Slab One", weights: [400], fallback: "serif" },
  eclipse: { family: "JetBrains Mono", weights: [400, 500, 600, 700], fallback: "monospace" },
  flamingo: { family: "Playfair Display", weights: [400, 500, 600, 700], fallback: "serif" },
  garnet: { family: "Bodoni Moda", weights: [400, 500, 600, 700], fallback: "serif" },
  skyline: { family: "Encode Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  iceField: { family: "DM Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },

  // 50 new themes (batch 3 – more variance)
  ember: { family: "Red Hat Display", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  polar: { family: "Geist", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  moss: { family: "Libre Franklin", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  neon: { family: "Space Mono", weights: [400, 700], fallback: "monospace" },
  clayPot: { family: "Lora", weights: [400, 500, 600, 700], fallback: "serif" },
  fog: { family: "Inter", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  spice: { family: "Fraunces", weights: [400, 500, 600, 700], fallback: "serif" },
  abyss: { family: "JetBrains Mono", weights: [400, 500, 600, 700], fallback: "monospace" },
  meadow: { family: "Nunito Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  slateMist: { family: "Source Serif 4", weights: [400, 500, 600, 700], fallback: "serif" },
  mustard: { family: "Bitter", weights: [400, 500, 600, 700], fallback: "serif" },
  velvet: { family: "Cormorant Garamond", weights: [400, 500, 600, 700], fallback: "serif" },
  chalk: { family: "Atkinson Hyperlegible", weights: [400, 700], fallback: "sans-serif" },
  sienna: { family: "EB Garamond", weights: [400, 500, 600, 700], fallback: "serif" },
  tealSea: { family: "Manrope", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  blushDark: { family: "Spectral", weights: [400, 500, 600, 700], fallback: "serif" },
  mintLeaf: { family: "DM Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  indigo: { family: "Outfit", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  ochreGold: { family: "Playfair Display", weights: [400, 500, 600, 700], fallback: "serif" },
  cobaltDeep: { family: "Encode Sans Expanded", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  maroonDeep: { family: "Libre Baskerville", weights: [400, 700], fallback: "serif" },
  sageBrush: { family: "Rokkitt", weights: [400, 500, 600, 700], fallback: "serif" },
  navyBlue: { family: "Barlow", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  roseDust: { family: "Crimson Text", weights: [400, 600, 700], fallback: "serif" },
  limeZest: { family: "Karla", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  denimWash: { family: "Oswald", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  coralSoft: { family: "Catamaran", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  forestDeep: { family: "Merriweather Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  lavenderMist: { family: "Cormorant", weights: [400, 500, 600, 700], fallback: "serif" },
  umberRaw: { family: "Literata", weights: [400, 500, 600, 700], fallback: "serif" },
  cyan: { family: "Plus Jakarta Sans", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  scarlet: { family: "Bodoni Moda", weights: [400, 500, 600, 700], fallback: "serif" },
  gold: { family: "Anton", weights: [400], fallback: "sans-serif" },
  plumDark: { family: "Lora", weights: [400, 500, 600, 700], fallback: "serif" },
  algae: { family: "PT Sans", weights: [400, 700], fallback: "sans-serif" },
  sunset: { family: "Nunito", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  mulberry: { family: "Overpass", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  peat: { family: "Trirong", weights: [400, 500, 600, 700], fallback: "serif" },
  azure: { family: "Source Sans 3", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  brick: { family: "Zilla Slab", weights: [400, 500, 600, 700], fallback: "serif" },
  celadon: { family: "Hind Siliguri", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  orchidPale: { family: "Italiana", weights: [400], fallback: "serif" },
  taupe: { family: "Open Sans Condensed", weights: [300, 700], fallback: "sans-serif" },
  viridian: { family: "Asap", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  rusted: { family: "Titillium Web", weights: [400, 600, 700], fallback: "sans-serif" },
  violetBlue: { family: "Fauna One", weights: [400], fallback: "serif" },
  khaki: { family: "Yantramanav", weights: [400, 500, 700], fallback: "sans-serif" },
  magenta: { family: "Chakra Petch", weights: [400, 500, 600, 700], fallback: "sans-serif" },
  sepia: { family: "Scope One", weights: [400], fallback: "serif" },
  turquoise: { family: "Exo 2", weights: [400, 500, 600, 700], fallback: "sans-serif" },
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
