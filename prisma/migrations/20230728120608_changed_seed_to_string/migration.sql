/*
  Warnings:

  - You are about to alter the column `steps` on the `images` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `images` MODIFY `steps` INTEGER NOT NULL,
    MODIFY `seed` VARCHAR(32) NOT NULL;
