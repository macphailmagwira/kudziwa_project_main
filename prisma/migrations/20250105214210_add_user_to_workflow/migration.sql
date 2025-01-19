/*
  Warnings:

  - You are about to drop the `SocialAccount` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `workflows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SocialAccount" DROP CONSTRAINT "SocialAccount_userId_fkey";

-- AlterTable
ALTER TABLE "workflows" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SocialAccount";

-- CreateIndex
CREATE INDEX "workflows_userId_idx" ON "workflows"("userId");

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
