/*
  Warnings:

  - The values [aberto,emAtendimento,encerrado] on the enum `CallStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('active', 'inative');

-- AlterEnum
BEGIN;
CREATE TYPE "CallStatus_new" AS ENUM ('open', 'processing', 'ended');
ALTER TABLE "calls" ALTER COLUMN "status" TYPE "CallStatus_new" USING ("status"::text::"CallStatus_new");
ALTER TYPE "CallStatus" RENAME TO "CallStatus_old";
ALTER TYPE "CallStatus_new" RENAME TO "CallStatus";
DROP TYPE "CallStatus_old";
COMMIT;
