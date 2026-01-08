-- CreateEnum
CREATE TYPE "BusinessHour" AS ENUM ('H08', 'H09', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17');

-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('aberto', 'emAtendimento', 'encerrado');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('cliente', 'admin', 'technical');

-- CreateTable
CREATE TABLE "technicals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'technical',
    "hour" "BusinessHour"[],

    CONSTRAINT "technicals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile" TEXT,
    "role" "Role" NOT NULL DEFAULT 'cliente',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "calls" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "status" "CallStatus" NOT NULL,
    "serviceAmount" DOUBLE PRECISION NOT NULL,
    "client_id" INTEGER NOT NULL,
    "technical_id" INTEGER NOT NULL,
    "service_name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "calls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technicals_email_key" ON "technicals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_technical_id_fkey" FOREIGN KEY ("technical_id") REFERENCES "technicals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_service_name_fkey" FOREIGN KEY ("service_name") REFERENCES "services"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
