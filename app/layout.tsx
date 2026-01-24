import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { BASE_URL } from "@/config/config";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteConfig = {
  name: "Waseem Anjum",
  title: "Waseem Anjum - Full Stack & Web3 Developer",
  description:
    "Expert Full Stack Developer & Web3 Engineer specializing in React, Next.js, TypeScript, Node.js, and blockchain development. Building high-performance web applications, DApps, and smart contracts. Available for freelance projects worldwide.",
  url: BASE_URL,
  ogImage: `${BASE_URL}/opengraph-image.png`,
  links: {
    github: "https://github.com/fabwaseem",
    linkedin: "https://linkedin.com/in/fabwaseem",
    twitter: "https://twitter.com/fabwaseeem",
  },
  keywords: [
    // Primary keywords
    "web developer",
    "full stack developer",
    "web3 developer",
    "blockchain developer",
    "freelance web developer",
    "hire web developer",
    // Technology-specific
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Node.js developer",
    "JavaScript developer",
    "Solidity developer",
    "smart contract developer",
    "DApp developer",
    "Ethereum developer",
    // Service-specific
    "custom web development",
    "web application development",
    "frontend developer",
    "backend developer",
    "UI/UX developer",
    "responsive web design",
    "e-commerce development",
    "API development",
    // Location/availability
    "remote web developer",
    "freelance programmer",
    "software engineer",
    // Brand
    "Waseem Anjum",
    "fabwaseem",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Waseem Anjum - Full Stack & Web3 Developer",
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Full Stack & Web3 Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@fabwaseeem",
    site: "@fabwaseeem",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// JSON-LD structured data for rich snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#person` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/projects?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: siteConfig.ogImage,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.twitter,
        "https://youtube.com/@opensourcecoding",
        "https://instagram.com/fabwaseem",
        "https://behance.net/fabwaseem",
      ],
      jobTitle: "Full Stack Developer & Web3 Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      knowsAbout: [
        "Web Development",
        "Full Stack Development",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Web3",
        "Blockchain",
        "Solidity",
        "Smart Contracts",
        "DApp Development",
        "UI/UX Design",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profilepage`,
      url: siteConfig.url,
      name: `${siteConfig.name} Portfolio`,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#person` },
      mainEntity: { "@id": `${siteConfig.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
