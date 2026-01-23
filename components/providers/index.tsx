"use client";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { ColorSchemeProvider } from "@/lib/themes";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ColorSchemeProvider>
          <ToastProvider />
          {children}
        </ColorSchemeProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
