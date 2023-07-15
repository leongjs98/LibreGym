import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    const deleteAttendance = await prisma.attendance.delete({
      where: { id },
    })

    console.log(`Delete attedance.\n${deleteAttendance}`)
    return deleteAttendance
  } catch (e) {
    console.log(e)
    return e
  } finally {
    await prisma.$disconnect()
  }
})
