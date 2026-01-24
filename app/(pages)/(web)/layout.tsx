import React from "react";
import {
  MouseFollower,
  Navbar,
  Footer,
  FloatingActions,
} from "@/components/portfolio";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingActions />
      <MouseFollower />
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
};

export default WebLayout;
