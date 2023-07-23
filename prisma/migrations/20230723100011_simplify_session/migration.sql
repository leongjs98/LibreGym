/*
  Warnings:

  - You are about to drop the column `intervalDays` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Session` DROP COLUMN `intervalDays`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `oneTime` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `startDate` DATE NULL;
