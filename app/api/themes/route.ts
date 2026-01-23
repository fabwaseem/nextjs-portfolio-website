import { NextResponse } from "next/server";
import { themes } from "@/lib/themes/theme-config";

/**
 * GET /api/themes
 * Returns a minimal list of all available themes (id, name, description, author)
 * This keeps the client bundle small while allowing theme selection
 */
export async function GET() {
  const themeList = Object.values(themes).map((theme) => ({
    id: theme.id,
    name: theme.name,
    description: theme.description,
    author: theme.author,
    // Include preview colors for the theme picker dots
    previewColors: {
      light: {
        primary: theme.light.primary,
        secondary: theme.light.secondary,
        accent: theme.light.accent,
      },
      dark: {
        primary: theme.dark.primary,
        secondary: theme.dark.secondary,
        accent: theme.dark.accent,
      },
    },
  }));

  return NextResponse.json(themeList, {
    headers: {
      // Cache for 1 hour on CDN, revalidate in background
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
