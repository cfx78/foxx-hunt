-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('BUG', 'FEATURE', 'TASK');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "type" "TicketType" NOT NULL DEFAULT 'BUG';
