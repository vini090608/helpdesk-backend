/*
  Warnings:

  - Added the required column `technical_id` to the `calls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calls" ADD COLUMN     "technical_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_technical_id_fkey" FOREIGN KEY ("technical_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
