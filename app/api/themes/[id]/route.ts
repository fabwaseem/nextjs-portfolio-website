import { NextResponse } from "next/server";
import { themes, type ColorScheme } from "@/lib/themes/theme-config";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/themes/[id]
 * Returns the full theme definition for a specific theme
 * This is fetched on-demand when user selects or previews a theme
 */
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;

  // Validate theme ID
  if (!id || !(id in themes)) {
    return NextResponse.json({ error: "Theme not found" }, { status: 404 });
  }

  const theme = themes[id as ColorScheme];

  return NextResponse.json(theme, {
    headers: {
      // Cache theme data aggressively - themes don't change often
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
