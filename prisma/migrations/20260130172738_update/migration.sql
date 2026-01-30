/*
  Warnings:

  - You are about to drop the column `markdownContent` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "markdownContent",
ALTER COLUMN "body" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "body" SET DATA TYPE TEXT;
