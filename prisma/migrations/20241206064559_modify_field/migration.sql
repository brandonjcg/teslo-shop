/*
  Warnings:

  - You are about to drop the column `dateEmailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateEmailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
