import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createTagSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
});

export async function GET() {
  try {
    const tags = await prisma.blogTags.findMany({
      orderBy: { title: "asc" },
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Error fetching blog tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog tags" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createTagSchema.parse(body);

    const existingTag = await prisma.blogTags.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingTag) {
      return NextResponse.json(
        { error: "Tag with this slug already exists" },
        { status: 400 },
      );
    }

    const tag = await prisma.blogTags.create({
      data: validatedData,
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("Error creating blog tag:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create blog tag" },
      { status: 500 },
    );
  }
}
