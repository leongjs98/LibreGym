/*
  Warnings:

  - You are about to drop the column `attendeeId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Attendance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_attendeeId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_classId_fkey`;

-- AlterTable
ALTER TABLE `Attendance` DROP COLUMN `attendeeId`,
    DROP COLUMN `classId`;

-- CreateTable
CREATE TABLE `_AttendanceToClass` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AttendanceToClass_AB_unique`(`A`, `B`),
    INDEX `_AttendanceToClass_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AttendanceToMember` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AttendanceToMember_AB_unique`(`A`, `B`),
    INDEX `_AttendanceToMember_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Attendance_id_key` ON `Attendance`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Class_id_key` ON `Class`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Member_id_key` ON `Member`(`id`);

-- AddForeignKey
ALTER TABLE `_AttendanceToClass` ADD CONSTRAINT `_AttendanceToClass_A_fkey` FOREIGN KEY (`A`) REFERENCES `Attendance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AttendanceToClass` ADD CONSTRAINT `_AttendanceToClass_B_fkey` FOREIGN KEY (`B`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AttendanceToMember` ADD CONSTRAINT `_AttendanceToMember_A_fkey` FOREIGN KEY (`A`) REFERENCES `Attendance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AttendanceToMember` ADD CONSTRAINT `_AttendanceToMember_B_fkey` FOREIGN KEY (`B`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
