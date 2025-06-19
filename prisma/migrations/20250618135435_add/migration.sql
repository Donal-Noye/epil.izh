/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Specialist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Specialist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Specialist" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Specialist_userId_key" ON "Specialist"("userId");

-- AddForeignKey
ALTER TABLE "Specialist" ADD CONSTRAINT "Specialist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
