"use client";

import { cn } from "@/lib/utils";

export interface LoaderProps {
  /** When true, fills viewport with code-dots + mesh bg; otherwise contained in parent */
  isFullscreen?: boolean;
  /** Terminal-style message line (default: "loading...") */
  message?: string;
  /** Optional label above the terminal block (e.g. "loader.ts") */
  label?: string;
  className?: string;
}

export function Loader({
  isFullscreen = false,
  message = "loading...",
  label = "loader",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center relative",
        isFullscreen
          ? "min-h-screen w-full overflow-hidden p-4"
          : "w-full min-h-24 p-4",
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {isFullscreen && (
        <>
          <div className="absolute inset-0 bg-code-dots" aria-hidden />
          <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden />
        </>
      )}

      <div className="relative z-10 w-full max-w-md font-mono text-sm rounded-xl border border-border bg-card/5 backdrop-blur-[2px]">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-editor-line/80 border-b border-border rounded-t-xl">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/90" />
          </div>
          <span className="text-muted-foreground text-xs ml-2">{label}</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-terminal-green shrink-0">❯</span>
            <span>{message}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-terminal-green">❯</span>
            <span>_</span>
            <span
              className="inline-block w-2 h-4 bg-primary ml-0.5 cursor-blink"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
