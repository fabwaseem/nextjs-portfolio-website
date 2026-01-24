import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { z } from "zod";

const generateBlogSchema = z.object({
  title: z.string().optional(),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { title } = generateBlogSchema.parse(body);

    // Fetch existing blog titles to help AI generate unique content
    const existingBlogs = await prisma.blog.findMany({
      select: { title: true },
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Fetch existing categories and tags
    const [categories, tags] = await Promise.all([
      prisma.blogCategory.findMany({
        select: { id: true, title: true, description: true },
        orderBy: { title: "asc" },
      }),
      prisma.blogTags.findMany({
        select: { id: true, title: true },
        orderBy: { title: "asc" },
      }),
    ]);

    const existingTitles = existingBlogs.map((b) => b.title);
    const categoryList = categories
      .map((c) => `- ${c.title}: ${c.description || "No description"}`)
      .join("\n");
    const tagList = tags.map((t) => t.title).join(", ");

    const systemPrompt = `You are an expert technical blog writer specializing in web development, Web3, blockchain, and modern software engineering.
Your task is to generate a complete, high-quality blog post.

Available Categories:
${categoryList || "No categories available yet"}

Available Tags:
${tagList || "No tags available yet"}

${
  existingTitles.length > 0
    ? `
Previously written blog titles (generate something different):
${existingTitles.map((t) => `- ${t}`).join("\n")}
`
    : ""
}

Generate a blog post in the following JSON format:
{
  "title": "Engaging and SEO-friendly title",
  "slug": "url-friendly-slug-with-dashes",
  "excerpt": "A compelling 2-3 sentence summary that hooks readers (150-200 characters)",
  "body": "Full HTML blog content with proper formatting, code examples if relevant, at least 800-1200 words. Use <h2>, <h3>, <p>, <ul>, <li>, <pre><code>, <strong>, <em> tags appropriately.",
  "metaTitle": "SEO-optimized title (50-60 characters)",
  "metaDescription": "SEO-optimized description (150-160 characters)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "featuredImageAlt": "Descriptive alt text for the featured image",
  "suggestedCategories": ["Category Name 1"],
  "suggestedTags": ["Tag 1", "Tag 2", "Tag 3"]
}

Important guidelines:
1. Content should be informative, practical, and engaging
2. Include code examples where relevant (use proper HTML code blocks)
3. Make it valuable for developers and tech enthusiasts
4. Ensure the slug is URL-friendly (lowercase, dashes, no special characters)
5. For suggestedCategories and suggestedTags, use existing ones from the lists above when they match, or suggest new relevant ones
6. The body should be well-structured with clear sections and headings
7. Include a brief introduction and conclusion
8. Add practical examples, tips, or best practices where applicable`;

    const userPrompt = title
      ? `Generate a comprehensive blog post about: "${title}". You may refine or improve the title if needed for better SEO and engagement.`
      : `Generate a fresh, unique blog post about web development, Web3, blockchain, or modern software engineering. Choose an interesting topic that would be valuable for developers.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Failed to generate blog content" },
        { status: 500 }
      );
    }

    let generatedBlog;
    try {
      generatedBlog = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    // Match suggested categories and tags with existing ones
    const matchedCategoryIds: string[] = [];
    const newCategories: string[] = [];

    if (generatedBlog.suggestedCategories) {
      for (const suggestedCat of generatedBlog.suggestedCategories) {
        const existingCat = categories.find(
          (c) => c.title.toLowerCase() === suggestedCat.toLowerCase()
        );
        if (existingCat) {
          matchedCategoryIds.push(existingCat.id);
        } else {
          newCategories.push(suggestedCat);
        }
      }
    }

    const matchedTagIds: string[] = [];
    const newTags: string[] = [];

    if (generatedBlog.suggestedTags) {
      for (const suggestedTag of generatedBlog.suggestedTags) {
        const existingTag = tags.find(
          (t) => t.title.toLowerCase() === suggestedTag.toLowerCase()
        );
        if (existingTag) {
          matchedTagIds.push(existingTag.id);
        } else {
          newTags.push(suggestedTag);
        }
      }
    }

    return NextResponse.json({
      title: generatedBlog.title,
      slug: generatedBlog.slug,
      excerpt: generatedBlog.excerpt,
      body: generatedBlog.body,
      metaTitle: generatedBlog.metaTitle,
      metaDescription: generatedBlog.metaDescription,
      seoKeywords: generatedBlog.seoKeywords || [],
      featuredImageAlt: generatedBlog.featuredImageAlt,
      categoryIds: matchedCategoryIds,
      tagIds: matchedTagIds,
      newCategories,
      newTags,
    });
  } catch (error) {
    console.error("Error generating blog:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to generate blog" },
      { status: 500 }
    );
  }
}
