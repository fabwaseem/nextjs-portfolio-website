import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";
import { resolve } from "path";
import { Pool } from "pg";

config({ path: resolve(process.cwd(), ".env") });

const pg = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pg);
const prisma = new PrismaClient({ adapter });

async function createTestProject() {
  const title = process.argv[2] || "Test Project";
  const slug = process.argv[3] || `test-project-${Date.now()}`;

  try {
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      console.log(`⚠️  Project with slug "${slug}" already exists.`);
      console.log(`   ID: ${existingProject.id}`);
      console.log(`   Title: ${existingProject.title}`);
      process.exit(0);
    }

    const markdownContent = `# ${title}

This is a **test project** created for development and testing purposes.

## Features

- Modern web development
- Responsive design
- High performance
- SEO optimized

## Tech Stack

- React
- TypeScript
- Next.js
- Tailwind CSS

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Project Overview

This project demonstrates the capabilities of the portfolio management system. It includes various features and best practices for modern web development.

> This is a sample project to test the admin panel functionality.

## Conclusion

This test project serves as a template for creating new portfolio projects.`;

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description:
          "This is a test project created for development and testing purposes.",
        excerpt: "A sample project to test the admin panel functionality.",
        demoLink: "https://example.com/demo",
        githubLink: "https://github.com/example/test-project",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
        cover:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600",
        youtubeId: "dQw4w9WgXcQ",
        body: markdownContent,
        techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        featured: false,
        status: "DRAFT",
        order: 0,
        metaTitle: `${title} - Portfolio Project`,
        metaDescription: "A test project for portfolio management system",
        seoKeywords: ["test", "project", "portfolio", "development"],
      },
    });

    console.log(`✅ Test project created successfully!`);
    console.log(`   ID: ${project.id}`);
    console.log(`   Title: ${project.title}`);
    console.log(`   Slug: ${project.slug}`);
    console.log(`   Status: ${project.status}`);
    console.log(`\n   You can now view this project in the admin panel at:`);
    console.log(`   /admin/projects`);
  } catch (error) {
    console.error("❌ Error creating test project:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createTestProject();
