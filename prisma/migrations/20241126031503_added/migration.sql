/*
  Warnings:

  - Added the required column `updatedAt` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialAccount" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "metadata" JSONB;
