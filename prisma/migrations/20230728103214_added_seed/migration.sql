/*
  Warnings:

  - Added the required column `seed` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `images` ADD COLUMN `seed` INTEGER NOT NULL;
