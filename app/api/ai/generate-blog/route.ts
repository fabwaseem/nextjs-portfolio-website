import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRandomBlogPrompt } from "@/lib/ai/blog-prompts";
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

    const systemPrompt = `You are an expert technical blog writer. You cover web development, AI, machine learning, robotics, Web3/blockchain, and other latest tech—plus tutorials using specific languages (TypeScript, Python, Rust, Go, etc.).
Your task is to generate a complete, high-quality blog post that reads like it was written by a thoughtful human developer—conversational, relatable, and genuinely helpful.

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
  "body": "Full HTML blog content. See BODY GUIDELINES below.",
  "metaTitle": "SEO-optimized title (50-60 characters)",
  "metaDescription": "SEO-optimized description (150-160 characters)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "featuredImageAlt": "Descriptive alt text for the featured image",
  "featuredImagePrompt": "Detailed AI image generation prompt for the featured image",
  "suggestedCategories": ["Category Name 1"],
  "suggestedTags": ["Tag 1", "Tag 2", "Tag 3"]
}

BODY GUIDELINES (critical):
1. LENGTH: Aim for 1,800–2,500 words. Give full context—explain the "why" behind decisions, share real-world gotchas, and walk readers through a complete narrative. Do not summarize or skip steps.
2. TONE: Write like a human. Use "you" and "we," occasional humor or empathy, short paragraphs, and a conversational flow. Avoid stiff, robotic, or overly formal language. Share opinions and practical advice.
3. STRUCTURE: Use <h2> for main sections, <h3> for subsections, <p>, <ul>, <li>, <strong>, <em>. Include a clear intro that sets context, a main body that teaches step-by-step, and a conclusion with takeaways and next steps.
4. CODE: Provide FULL, runnable code examples—not snippets or "... rest of code." Include complete files or meaningful blocks (imports, setup, main logic) so readers can copy-paste and run. Use <pre><code> with proper escaping. Add brief comments where helpful. If multiple files are needed, show each fully.
5. CONTEXT: Explain what each example does, why it works, and when to use it. Cover edge cases, common mistakes, and alternatives. Make the blog a one-stop resource for the topic.
6. PRACTICAL VALUE: Include tips, best practices, links to docs or tools where relevant, and "what I wish I'd known" style insights. End with actionable next steps or further reading.

Other rules:
7. Ensure the slug is URL-friendly (lowercase, dashes, no special characters).
8. For suggestedCategories and suggestedTags, use existing ones from the lists above when they match, or suggest new relevant ones.

IMPORTANT - Featured Image Prompt Guidelines:
9. The "featuredImagePrompt" must be a detailed, high-quality prompt for AI image generators (DALL-E, Midjourney, Stable Diffusion).
10. ALWAYS include instruction to display the blog title as stylized text on the image, write actual title in the prompt.
11. Describe visual style, colors, composition, mood, and tech-related elements. Use 16:9 aspect ratio.`;


    const userPrompt = getRandomBlogPrompt(title);

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
      featuredImagePrompt: generatedBlog.featuredImagePrompt || "",
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
