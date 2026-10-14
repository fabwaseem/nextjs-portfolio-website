import React from "react";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import { Navbar } from "@/components/layouts/vscode/common/navbar";
import { Footer } from "@/components/layouts/vscode/common/footer";
import { FloatingActions } from "@/components/layouts/common/floating-actions";
import { GlobalRippleEffect } from "@/components/layouts/common/global-ripple-effect";
import CharacterCursor from "@/components/layouts/common/character-cusror";

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <GlobalRippleEffect />
      <CharacterCursor />
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
};

export default WebLayout;
