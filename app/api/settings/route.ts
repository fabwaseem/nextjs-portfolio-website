import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  personalDetailsSchema,
  siteDetailsSchema,
  socialLinksSchema,
  portfolioSettingsSchema,
  blogSettingsSchema,
  resumeSettingsSchema,
  contactSettingsSchema,
  seoSettingsSchema,
} from "@/lib/validations/settings";

const DEFAULT_ID = "default";

// GET - Fetch all settings
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all settings in parallel, creating defaults if they don't exist
    const [personal, site, social, portfolio, blog, resume, contact, seo] =
      await Promise.all([
        prisma.personalDetails.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
        prisma.siteDetails.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
        prisma.socialLinks.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
        prisma.portfolioSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
        prisma.blogSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
        prisma.resumeSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
        prisma.contactSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
        prisma.seoSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID },
          update: {},
        }),
      ]);

    return NextResponse.json({
      personal,
      site,
      social,
      portfolio,
      blog,
      resume,
      contact,
      seo,
    });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

// PUT - Update settings
export async function PUT(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Missing type or data" },
        { status: 400 },
      );
    }

    let result;

    switch (type) {
      case "personal": {
        const validated = personalDetailsSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        result = await prisma.personalDetails.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...validated.data },
          update: validated.data,
        });
        break;
      }

      case "site": {
        const validated = siteDetailsSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        result = await prisma.siteDetails.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...validated.data },
          update: validated.data,
        });
        break;
      }

      case "social": {
        const validated = socialLinksSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        // Convert empty strings to null for optional URL fields
        const cleanedData = Object.fromEntries(
          Object.entries(validated.data).map(([key, value]) => [
            key,
            value === "" ? null : value,
          ]),
        );
        result = await prisma.socialLinks.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...cleanedData },
          update: cleanedData,
        });
        break;
      }

      case "portfolio": {
        const validated = portfolioSettingsSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        result = await prisma.portfolioSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...validated.data },
          update: validated.data,
        });
        break;
      }

      case "blog": {
        const validated = blogSettingsSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        result = await prisma.blogSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...validated.data },
          update: validated.data,
        });
        break;
      }

      case "resume": {
        const validated = resumeSettingsSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        result = await prisma.resumeSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...validated.data },
          update: validated.data,
        });
        break;
      }

      case "contact": {
        const validated = contactSettingsSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        result = await prisma.contactSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...validated.data },
          update: validated.data,
        });
        break;
      }

      case "seo": {
        const validated = seoSettingsSchema.safeParse(data);
        if (!validated.success) {
          return NextResponse.json(
            { error: "Validation failed", issues: validated.error.issues },
            { status: 400 },
          );
        }
        // Convert empty strings to null for optional URL fields
        const cleanedData = {
          ...validated.data,
          canonicalUrl:
            validated.data.canonicalUrl === ""
              ? null
              : validated.data.canonicalUrl,
        };
        result = await prisma.seoSettings.upsert({
          where: { id: DEFAULT_ID },
          create: { id: DEFAULT_ID, ...cleanedData },
          update: cleanedData,
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid settings type" },
          { status: 400 },
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
