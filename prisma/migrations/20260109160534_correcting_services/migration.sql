-- AlterTable
ALTER TABLE "services" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'inative';
