/*
  Warnings:

  - The `status` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `projectName` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "projectName" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_projectName_fkey" FOREIGN KEY ("projectName") REFERENCES "Project"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
