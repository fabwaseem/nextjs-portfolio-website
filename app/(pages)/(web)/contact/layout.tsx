import { Metadata } from "next";
import { BASE_URL } from "@/config/config";

export const metadata: Metadata = {
  title: "Contact | Hire Waseem Anjum - Full Stack & Web3 Developer",
  description:
    "Get in touch with Waseem Anjum for freelance web development projects. Specializing in React, Next.js, TypeScript, Node.js, and Web3/blockchain development. Available for remote work worldwide.",
  keywords: [
    "hire web developer",
    "freelance React developer",
    "freelance Next.js developer",
    "hire full stack developer",
    "Web3 developer for hire",
    "blockchain developer contact",
    "remote web developer",
    "custom web development",
    "freelance programmer",
    "web development services",
  ],
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Hire Waseem Anjum - Full Stack & Web3 Developer",
    description:
      "Get in touch for freelance web development projects. Specializing in React, Next.js, and Web3/blockchain development.",
    url: `${BASE_URL}/contact`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
