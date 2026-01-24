import { Metadata } from "next";
import { BASE_URL } from "@/config/config";

export const metadata: Metadata = {
  title: "Projects | Web Development Portfolio - React, Next.js, Web3 DApps",
  description:
    "Explore Waseem Anjum's complete portfolio of web development projects. From React & Next.js applications to Web3 DApps, smart contracts, and full-stack solutions. View live demos and source code.",
  openGraph: {
    title: "Projects | Waseem Anjum - Full Stack & Web3 Developer",
    description:
      "Explore my complete portfolio of web development projects including React apps, Web3 DApps, and full-stack solutions.",
    url: `${BASE_URL}/projects`,
    type: "website",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
