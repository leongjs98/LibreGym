/*
  Warnings:

  - You are about to drop the `_AttendanceToClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AttendanceToMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attendeeId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_AttendanceToClass` DROP FOREIGN KEY `_AttendanceToClass_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AttendanceToClass` DROP FOREIGN KEY `_AttendanceToClass_B_fkey`;

-- DropForeignKey
ALTER TABLE `_AttendanceToMember` DROP FOREIGN KEY `_AttendanceToMember_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AttendanceToMember` DROP FOREIGN KEY `_AttendanceToMember_B_fkey`;

-- AlterTable
ALTER TABLE `Attendance` ADD COLUMN `attendeeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `classId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_AttendanceToClass`;

-- DropTable
DROP TABLE `_AttendanceToMember`;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_attendeeId_fkey` FOREIGN KEY (`attendeeId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
