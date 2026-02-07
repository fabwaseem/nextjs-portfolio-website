import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import OpenAI from "openai";
import { z } from "zod";

const generateSeoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  body: z.string().optional(),
  techStack: z.array(z.string()).optional(),
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
        { status: 500 },
      );
    }

    const rawBody = await request.json();
    const { title, description, body, techStack } =
      generateSeoSchema.parse(rawBody);

    const systemPrompt = `You are an expert SEO specialist. You are generating SEO metadata for a project listed on the owner's personal developer portfolio website. The project is something the portfolio owner built or contributed to — it is NOT a standalone product or SaaS. Frame the SEO copy from the perspective of showcasing the developer's work (e.g. "Built with React & Node.js" or "A full-stack app by [developer] featuring...").

You must return a valid JSON object with these fields:
{
  "metaTitle": "SEO-optimized title (50-60 characters)",
  "metaDescription": "SEO-optimized description (150-160 characters)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Guidelines:
- metaTitle: Keep it under 60 characters. Include the main technology or topic. Frame it as a portfolio piece (e.g. "Project Name — React & TypeScript Portfolio Project").
- metaDescription: Keep it between 150-160 characters. Highlight what the project does, what technologies were used, and the developer's role. e.g. "Explore [project] — a [description] built with [tech]. See the code, live demo, and technical breakdown."
- seoKeywords: Provide 5-8 relevant keywords. Include the tech stack, project type, "portfolio", "developer project", and related search terms.
- Focus on developer/tech audience and recruiter search intent (people looking at portfolios).
- Use natural language, avoid keyword stuffing.

Return ONLY the JSON object, no markdown fences or extra text.`;

    const userPrompt = `Generate SEO metadata for this project:

Title: ${title}
${description ? `Description: ${description}` : ""}
${techStack?.length ? `Tech Stack: ${techStack.join(", ")}` : ""}
${body ? `Body content (first 2000 chars): ${body.substring(0, 2000)}` : ""}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 },
      );
    }

    // Parse the JSON response
    const cleaned = content
      .replace(/```json?\n?/g, "")
      .replace(/```/g, "")
      .trim();
    const seoData = JSON.parse(cleaned);

    return NextResponse.json(seoData);
  } catch (error) {
    console.error("Generate project SEO error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to generate SEO metadata" },
      { status: 500 },
    );
  }
}
