import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface sessionInfo {
  oneTime: boolean;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
  description: string;
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const sessionToUpdate: sessionInfo = await readBody(event)
  const oneTime = sessionToUpdate["oneTime"]
  const dayOfWeek = sessionToUpdate["dayOfWeek"]
  const startTime = sessionToUpdate["startTime"]
  const endTime = sessionToUpdate["endTime"]
  const description = sessionToUpdate["description"]

  try {
    const updatedSession = await prisma.session.update({
      where: { id },
      data: {
        oneTime,
        dayOfWeek,
        startTime,
        endTime,
        description,
      }
    })

    return updatedSession
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})


