import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createTestimonialSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: { featured?: boolean } = {};
    if (featured === "true") where.featured = true;

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit,
    });

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
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
    const validatedData = createTestimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: {
        ...validatedData,
        companyUrl: validatedData.companyUrl || null,
        avatar: validatedData.avatar || null,
        rating: validatedData.rating ?? null,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
