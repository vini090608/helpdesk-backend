/*
  Warnings:

  - You are about to drop the column `services` on the `calls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "calls" DROP COLUMN "services",
ADD COLUMN     "servicesArray" TEXT[];
