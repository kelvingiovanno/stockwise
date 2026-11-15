/*
  Warnings:

  - You are about to drop the column `store_id` on the `StoreAccess` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `StoreAccess` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId]` on the table `StoreAccess` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `StoreAccess` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storeId` to the `StoreAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `StoreAccess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StoreAccess" DROP CONSTRAINT "StoreAccess_store_id_fkey";

-- DropForeignKey
ALTER TABLE "StoreAccess" DROP CONSTRAINT "StoreAccess_user_id_fkey";

-- DropIndex
DROP INDEX "StoreAccess_store_id_key";

-- DropIndex
DROP INDEX "StoreAccess_user_id_key";

-- AlterTable
ALTER TABLE "StoreAccess" DROP COLUMN "store_id",
DROP COLUMN "user_id",
ADD COLUMN     "storeId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StoreAccess_storeId_key" ON "StoreAccess"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "StoreAccess_userId_key" ON "StoreAccess"("userId");

-- AddForeignKey
ALTER TABLE "StoreAccess" ADD CONSTRAINT "StoreAccess_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAccess" ADD CONSTRAINT "StoreAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
