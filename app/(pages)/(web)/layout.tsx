import React from "react";
import { MouseFollower, Navbar, Footer, FloatingActions } from "@/components/portfolio";

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MouseFollower />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
};

export default WebLayout;
