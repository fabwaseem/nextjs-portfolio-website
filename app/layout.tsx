import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    template: "%s | Waseem Anjum - Full Stack Developer",
    default: "Waseem Anjum - Full Stack Developer",
  },
  description:
    "Full Stack Developer crafting modern, high-performance web applications with clean code and exceptional user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
