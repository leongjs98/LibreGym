/*
  Warnings:

  - You are about to drop the column `paid` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `state` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `paid`,
    ADD COLUMN `state` ENUM('paid', 'due', 'noAttendance') NOT NULL;
