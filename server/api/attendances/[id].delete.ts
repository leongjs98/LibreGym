import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    const deleteAttendance = await prisma.attendance.delete({
      where: { id },
    })

    return deleteAttendance
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
})
