-- CreateTable
CREATE TABLE `Member` (
    `id` VARCHAR(191) NOT NULL,
    `birthday` DATE NOT NULL,
    `email` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `sex` ENUM('female', 'male') NOT NULL,
    `status` ENUM('enquiry', 'trial', 'member') NOT NULL DEFAULT 'enquiry',
    `belt` ENUM('white', 'blue', 'purple', 'brown', 'black') NOT NULL DEFAULT 'white',
    `stripe` INTEGER NOT NULL DEFAULT 0,
    `joinedDate` DATE NOT NULL,
    `contractEndDate` DATE NULL,
    `medicalIssues` VARCHAR(191) NULL,
    `homeAddress` VARCHAR(191) NOT NULL,
    `signedWaiver` BOOLEAN NOT NULL DEFAULT false,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `Member_fullName_birthday_phoneNumber_key`(`fullName`, `birthday`, `phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `instructor` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Class_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `startTime` TIME NOT NULL,
    `endTime` TIME NOT NULL,
    `dayOfWeek` INTEGER NOT NULL,
    `intervalDays` INTEGER NOT NULL,
    `classId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Session_classId_startDate_startTime_key`(`classId`, `startDate`, `startTime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `attendeeId` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Attendance_attendeeId_sessionId_date_key`(`attendeeId`, `sessionId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_attendeeId_fkey` FOREIGN KEY (`attendeeId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
