/*
  Warnings:

  - The values [SUPERADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SystemRole" AS ENUM ('SUPERADMIN', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'STAFF', 'VIEWER');
ALTER TABLE "public"."StoreAccess" ALTER COLUMN "userRole" DROP DEFAULT;
ALTER TABLE "StoreAccess" ALTER COLUMN "userRole" TYPE "UserRole_new" USING ("userRole"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "StoreAccess" ALTER COLUMN "userRole" SET DEFAULT 'VIEWER';
COMMIT;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "systemRole" "SystemRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Store_code_key" ON "Store"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_code_key" ON "User"("code");
