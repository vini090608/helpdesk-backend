/*
  Warnings:

  - The values [H12,H13] on the enum `BusinessHour` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BusinessHour_new" AS ENUM ('H08', 'H09', 'H10', 'H11', 'H14', 'H15', 'H16', 'H17');
ALTER TABLE "technicals" ALTER COLUMN "hour" TYPE "BusinessHour_new"[] USING ("hour"::text::"BusinessHour_new"[]);
ALTER TYPE "BusinessHour" RENAME TO "BusinessHour_old";
ALTER TYPE "BusinessHour_new" RENAME TO "BusinessHour";
DROP TYPE "BusinessHour_old";
COMMIT;
