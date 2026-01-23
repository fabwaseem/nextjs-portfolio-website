import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { resolve } from "path";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { remark } from "remark";
import remarkHtml from "remark-html";

config({ path: resolve(process.cwd(), ".env") });

const pg = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pg);
const prisma = new PrismaClient({ adapter });

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return String(result);
}

function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200;
  return Math.ceil(wordCount / wordsPerMinute);
}

async function createTestBlog() {
  const title = process.argv[2] || "Getting Started with Next.js 16";
  const slug = process.argv[3] || `test-blog-${Date.now()}`;

  try {
    // Check if blog with slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      console.log(`⚠️  Blog with slug "${slug}" already exists.`);
      console.log(`   ID: ${existingBlog.id}`);
      console.log(`   Title: ${existingBlog.title}`);
      process.exit(0);
    }

    // Create categories if they don't exist
    const categoryData = [
      {
        title: "Web Development",
        slug: "web-development",
        color: "#3B82F6",
        icon: "💻",
      },
      { title: "Tutorial", slug: "tutorial", color: "#10B981", icon: "📚" },
    ];

    const categories = await Promise.all(
      categoryData.map(async (cat) => {
        const existing = await prisma.blogCategory.findUnique({
          where: { slug: cat.slug },
        });
        if (existing) return existing;
        return prisma.blogCategory.create({ data: cat });
      }),
    );

    // Create tags if they don't exist
    const tagData = [
      { title: "Next.js", slug: "nextjs" },
      { title: "React", slug: "react" },
      { title: "TypeScript", slug: "typescript" },
      { title: "Tailwind CSS", slug: "tailwind-css" },
      { title: "App Router", slug: "app-router" },
    ];

    const tags = await Promise.all(
      tagData.map(async (tag) => {
        const existing = await prisma.blogTags.findUnique({
          where: { slug: tag.slug },
        });
        if (existing) return existing;
        return prisma.blogTags.create({ data: tag });
      }),
    );

    const markdownContent = `# ${title}

Next.js 16 brings exciting new features and improvements to the React framework. In this comprehensive guide, we'll explore everything you need to know to get started.

## Introduction

Next.js has become the go-to framework for building modern React applications. With version 16, the team has introduced several groundbreaking features that make development even more enjoyable.

## Key Features

### 1. Enhanced App Router

The App Router continues to evolve with better performance and new capabilities:

- **Improved Server Components** - Faster rendering and reduced bundle sizes
- **Better Caching** - More granular control over cache invalidation
- **Parallel Routes** - Build complex UIs with multiple simultaneous views

### 2. React 19 Support

Next.js 16 fully embraces React 19, bringing:

\`\`\`tsx
// Server Actions are now first-class citizens
async function submitForm(formData: FormData) {
  "use server";

  const name = formData.get("name");
  await saveToDatabase(name);
}
\`\`\`

### 3. Turbopack Improvements

Turbopack is now the default bundler in development:

- ⚡ **5x faster** cold starts
- 🔄 **10x faster** HMR updates
- 📦 **Smaller** production bundles

## Getting Started

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Project Structure

Here's the recommended project structure:

\`\`\`
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
├── lib/
│   └── utils.ts
└── public/
    └── images/
\`\`\`

## Building Your First Page

Create a simple page with TypeScript:

\`\`\`tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">
        Welcome to Next.js 16!
      </h1>
      <p className="mt-4 text-gray-600">
        Start building amazing applications.
      </p>
    </main>
  );
}
\`\`\`

## Styling with Tailwind CSS

Tailwind CSS v4 is fully supported out of the box:

\`\`\`tsx
<div className="bg-linear-to-br from-blue-500 to-purple-600 p-8 rounded-2xl shadow-xl">
  <h2 className="text-white text-2xl font-bold">
    Beautiful Gradients
  </h2>
</div>
\`\`\`

## Data Fetching

Fetch data directly in your components:

\`\`\`tsx
async function BlogPosts() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
  });

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Best Practices

Here are some best practices to follow:

1. **Use Server Components by default** - Only use Client Components when needed
2. **Colocate related files** - Keep components close to where they're used
3. **Leverage the built-in optimizations** - Image, Font, and Script components
4. **Implement proper error handling** - Use error.tsx and loading.tsx files

## Performance Tips

> "Performance is not just about speed, it's about user experience." - Next.js Team

- Use \`next/image\` for optimized images
- Implement proper caching strategies
- Code-split at the route level
- Monitor Core Web Vitals

## Conclusion

Next.js 16 is a powerful framework that makes building modern web applications a breeze. With its improved performance, better developer experience, and seamless React 19 integration, it's the perfect choice for your next project.

Start building today and join the millions of developers already using Next.js!

---

*Have questions? Feel free to reach out on Twitter or leave a comment below.*`;

    const htmlContent = await markdownToHtml(markdownContent);
    const wordCount = countWords(markdownContent);
    const readingTime = calculateReadingTime(wordCount);

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt:
          "A comprehensive guide to getting started with Next.js 16, covering new features, best practices, and hands-on examples.",
        metaTitle: `${title} | Complete Guide`,
        metaDescription:
          "Learn how to build modern web applications with Next.js 16. This tutorial covers App Router, React 19 integration, Turbopack, and best practices.",
        featuredImage:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
        featuredImageAlt:
          "Code on a laptop screen representing Next.js development",
        publishedAt: null,
        markdownContent,
        body: {
          markdown: markdownContent,
          html: htmlContent,
        },
        readingTime,
        wordCount,
        views: 0,
        featured: true,
        status: "DRAFT",
        seoKeywords: [
          "next.js",
          "react",
          "typescript",
          "web development",
          "tutorial",
          "app router",
        ],
        order: 0,
        categories: {
          connect: categories.map((cat) => ({ id: cat.id })),
        },
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    console.log(`\n✅ Test blog post created successfully!`);
    console.log(`\n📝 Blog Details:`);
    console.log(`   ID: ${blog.id}`);
    console.log(`   Title: ${blog.title}`);
    console.log(`   Slug: ${blog.slug}`);
    console.log(`   Status: ${blog.status}`);
    console.log(`   Featured: ${blog.featured ? "Yes" : "No"}`);
    console.log(`   Word Count: ${blog.wordCount}`);
    console.log(`   Reading Time: ${blog.readingTime} min`);
    console.log(
      `\n📂 Categories: ${blog.categories.map((c) => c.title).join(", ")}`,
    );
    console.log(`🏷️  Tags: ${blog.tags.map((t) => t.title).join(", ")}`);
    console.log(`\n View in admin panel:`);
    console.log(`   /admin/blog`);
    console.log(`   /admin/blog/${blog.id}`);
  } catch (error) {
    console.error("❌ Error creating test blog:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pg.end();
  }
}

createTestBlog();
