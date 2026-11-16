/*
  Warnings:

  - You are about to drop the column `systemRole` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "systemRole",
ADD COLUMN     "role" "SystemRole" NOT NULL DEFAULT 'USER';
