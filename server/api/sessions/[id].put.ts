import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface sessionInfo {
  name: string;
  description: string | null;
  instructor: string | null;
  startDate: Date;
  endDate: Date | null;
  startTime: Date;
  endTime: Date;
  intervalDays: number;
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const sessionToUpdate: sessionInfo = await readBody(event)

  try {
    const startDate = new Date(sessionToUpdate["startDate"])
    const dayOfWeek = startDate.getDay()
    const updatedSession = await prisma.session.update({
      where: { id },
      data: {
        startDate,
        endDate: sessionToUpdate["endDate"],
        startTime: sessionToUpdate["startTime"],
        endTime: sessionToUpdate["endTime"],
        dayOfWeek,
        intervalDays: sessionToUpdate["intervalDays"],
      }
    })

    return updatedSession
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})


