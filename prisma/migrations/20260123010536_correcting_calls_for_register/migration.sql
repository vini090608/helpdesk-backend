/*
  Warnings:

  - You are about to drop the column `serviceAmount` on the `calls` table. All the data in the column will be lost.
  - Added the required column `service_amount` to the `calls` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "calls" DROP CONSTRAINT "calls_technical_id_fkey";

-- AlterTable
ALTER TABLE "calls" DROP COLUMN "serviceAmount",
ADD COLUMN     "service_amount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "technical_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "status" SET DEFAULT 'active';

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_technical_id_fkey" FOREIGN KEY ("technical_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
