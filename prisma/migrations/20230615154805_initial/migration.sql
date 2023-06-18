-- CreateTable
CREATE TABLE `Member` (
    `id` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `sex` ENUM('FEMALE', 'MALE') NOT NULL,
    `status` ENUM('ENQUIRY', 'TRIALS', 'MEMBER') NOT NULL DEFAULT 'ENQUIRY',
    `belt` ENUM('WHITE', 'BLUE', 'PURPLE', 'BROWN', 'BLACK') NOT NULL DEFAULT 'WHITE',
    `stripe` INTEGER NOT NULL DEFAULT 0,
    `joinedDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `contractEndDate` DATETIME(3) NOT NULL,
    `medicalIssues` VARCHAR(191) NULL,
    `homeAddress` VARCHAR(191) NOT NULL,
    `signedWaiver` BOOLEAN NOT NULL DEFAULT false,
    `notes` VARCHAR(191) NULL,
    `attendanceId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `intervalDays` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Attendance_classId_key`(`classId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `Attendance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
