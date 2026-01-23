/*
  Warnings:

  - You are about to drop the column `authorAvatar` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `authorBio` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "authorAvatar",
DROP COLUMN "authorBio",
DROP COLUMN "authorName";
