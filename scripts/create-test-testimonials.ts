import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { resolve } from "path";
import { PrismaClient } from "@/lib/generated/prisma/client";

config({ path: resolve(process.cwd(), ".env") });

const pg = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pg);
const prisma = new PrismaClient({ adapter });

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544000873-1c6816573700?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=face",
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const testimonialsBase = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Inc",
    companyUrl: "https://techflow.io",
    content:
      "Exceptional developer who delivered our Web3 platform ahead of schedule. Clear communication, deep technical expertise, and a genuine passion for building great products.",
    rating: 5,
    featured: true,
    order: 0,
  },
  {
    name: "Marcus Johnson",
    role: "Product Lead",
    company: "StartupXYZ",
    companyUrl: null,
    content:
      "Worked with them on multiple projects. Always brings fresh ideas and ships fast. The best freelancer we've partnered with.",
    rating: 5,
    featured: true,
    order: 1,
  },
  {
    name: "Elena Rodriguez",
    role: "Founder",
    company: "Nexus Labs",
    companyUrl: "https://nexuslabs.dev",
    content:
      "Transformed our MVP into a production-ready app in record time. Highly recommend for any full-stack or Web3 work.",
    rating: 5,
    featured: true,
    order: 2,
  },
  {
    name: "David Park",
    role: "Engineering Manager",
    company: "ScaleUp",
    companyUrl: null,
    content:
      "Professional, responsive, and incredibly talented. Delivered complex smart contract integrations with zero issues. Will hire again.",
    rating: 5,
    featured: false,
    order: 3,
  },
  {
    name: "Amira Hassan",
    role: "CEO",
    company: "Artisan Ventures",
    companyUrl: "https://artisan.vc",
    content:
      "Brought our vision to life with a beautiful, performant application. Great attention to detail and user experience.",
    rating: 5,
    featured: true,
    order: 4,
  },
];

async function createTestTestimonials() {
  const count = parseInt(process.argv[2] || "5", 10);
  const shuffled = shuffle(AVATARS);
  const toCreate = testimonialsBase
    .slice(0, Math.min(count, testimonialsBase.length))
    .map((t, i) => ({ ...t, avatar: shuffled[i % shuffled.length] }));

  try {
    const existing = await prisma.testimonial.count();
    if (existing > 0) {
      console.log(`⚠️  ${existing} testimonial(s) already exist.`);
      console.log(`   Run with a number to add up to N testimonials (e.g. npx tsx scripts/create-test-testimonials.ts 3)`);
      console.log(`   Skipping to avoid duplicates.`);
      process.exit(0);
    }

    const created = await prisma.testimonial.createMany({
      data: toCreate,
    });

    console.log(`✅ Created ${created.count} testimonial(s):`);
    toCreate.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.name} - ${t.role} @ ${t.company}`);
    });
    console.log(`\n   View in admin: /admin/testimonials`);
    console.log(`   View on site: homepage testimonials section`);
  } catch (error) {
    console.error("❌ Error creating testimonials:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pg.end();
  }
}

createTestTestimonials();
