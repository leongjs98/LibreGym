/*
  Warnings:

  - You are about to drop the column `attendanceId` on the `Member` table. All the data in the column will be lost.
  - Added the required column `attendeeId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Member` DROP FOREIGN KEY `Member_attendanceId_fkey`;

-- AlterTable
ALTER TABLE `Attendance` ADD COLUMN `attendeeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Member` DROP COLUMN `attendanceId`;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_attendeeId_fkey` FOREIGN KEY (`attendeeId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
