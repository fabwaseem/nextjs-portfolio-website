import { config } from "dotenv";
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { resolve } from "path";
import { PrismaClient } from "@/lib/generated/prisma/client";

config({ path: resolve(process.cwd(), ".env") });

const pg = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pg)



const prisma = new PrismaClient({ adapter });

async function createAdminUser() {
  const email = process.argv[2];
  const name = process.argv[3] || "Admin User";

  if (!email) {
    console.error("Usage: tsx scripts/create-admin-user.ts <email> [name]");
    console.error("Example: tsx scripts/create-admin-user.ts admin@example.com 'Admin User'");
    process.exit(1);
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`⚠️  User with email ${email} already exists.`);
      console.log(`   ID: ${existingUser.id}`);
      console.log(`   Name: ${existingUser.name}`);
      process.exit(0);
    }

    const userId = crypto.randomUUID();

    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
        emailVerified: false,
      },
    });

    console.log(`✅ Admin user created successfully!`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   ID: ${user.id}`);
    console.log(`\n   You can now use magic link login with this email.`);
    console.log(`   The magic link will be sent to: ${email}`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
