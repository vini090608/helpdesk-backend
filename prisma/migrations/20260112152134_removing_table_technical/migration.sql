/*
  Warnings:

  - You are about to drop the `technicals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "calls" DROP CONSTRAINT "calls_technical_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hour" "BusinessHour"[];

-- DropTable
DROP TABLE "technicals";
