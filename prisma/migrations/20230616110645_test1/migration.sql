/*
  Warnings:

  - Made the column `medicalIssues` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notes` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `medicalIssues` VARCHAR(191) NOT NULL,
    MODIFY `notes` VARCHAR(191) NOT NULL;
