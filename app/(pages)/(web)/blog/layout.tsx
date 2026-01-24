import { Metadata } from "next";
import { BASE_URL } from "@/config/config";

export const metadata: Metadata = {
  title: "Blog | Web Development Tutorials & Insights - React, Next.js, Web3",
  description:
    "Read Waseem Anjum's blog for web development tutorials, coding tips, and insights on React, Next.js, TypeScript, Web3, blockchain development, and modern software engineering practices.",
  keywords: [
    "web development blog",
    "React tutorials",
    "Next.js tutorials",
    "Web3 development",
    "blockchain tutorials",
    "TypeScript tips",
    "Node.js guides",
    "coding tutorials",
    "software engineering blog",
    "full stack development",
    "programming tips",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | Waseem Anjum - Full Stack & Web3 Developer",
    description:
      "Web development tutorials, coding tips, and insights on React, Next.js, Web3, and modern software engineering.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
