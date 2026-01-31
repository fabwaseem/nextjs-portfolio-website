"use client";

import NextTopLoader from "nextjs-toploader";
import { useMemo } from "react";
import { useColorScheme } from "@/lib/themes";
import { useTheme } from "next-themes";

const DEFAULT_COLOR = "#6366f1";

/**
 * Top loader component that matches the current theme's primary color
 * Automatically updates when theme changes
 */
export function TopLoader() {
  const {
    colorScheme,
    getPreviewColors,
    mounted: schemeMounted,
  } = useColorScheme();
  const { resolvedTheme } = useTheme();

  // Derive color from theme - useMemo ensures it updates when dependencies change
  const color = useMemo(() => {
    if (!schemeMounted) return DEFAULT_COLOR;

    // Get the primary color from preview colors
    const previewColors = getPreviewColors(colorScheme);
    if (previewColors.length > 0) {
      return previewColors[0]; // First color is primary
    }

    // Fallback: try to read from CSS variable (only works client-side)
    if (typeof window !== "undefined") {
      const computedColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      if (computedColor) {
        return `hsl(${computedColor})`;
      }
    }

    return DEFAULT_COLOR;
     
  }, [colorScheme, resolvedTheme, schemeMounted, getPreviewColors]);

  return (
    <NextTopLoader
      color={color}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={`0 0 10px ${color},0 0 5px ${color}`}
      zIndex={9999}
    />
  );
}
