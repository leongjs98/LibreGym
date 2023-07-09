import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    const attedanceRecords = await prisma.attendance.findMany()
    return attedanceRecords
  } catch (e) {
    return e
  } finally {
    await prisma.$disconnect()
  }
})
