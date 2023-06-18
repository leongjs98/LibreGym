/*
  Warnings:

  - Made the column `joinedDate` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `joinedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `contractEndDate` DATETIME(3) NULL;
