import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const attendeeId = event.context.params.id
  
  try {
    const attendance = await prisma.attendance.findMany({
      where: { attendeeId },
      orderBy: {
        sessionDate: 'asc'
      }
    })

    const totalSessionAttended: number = attendance.length
    const firstSessDate = attendance[0].sessionDate
    const lastSessDate = attendance[attendance.length-1].sessionDate
    const msElapsed = lastSessDate.getTime() - firstSessDate.getTime()
    const weeksAttended = msElapsed /  (1000 * 60 * 60 * 24 * 7)
    const avgAttendancePerWeek = totalSessionAttended / weeksAttended
    // const monthsElapsed = weeksAttended / 30

    // return attendance
    return {
      totalSessionAttended,
      firstSessDate,
      lastSessDate,
      weeksAttended,
      avgAttendancePerWeek
    }
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
})
