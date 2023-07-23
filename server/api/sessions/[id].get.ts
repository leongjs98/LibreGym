import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  interface sessionInfo {
    id: string;
    classId: string;
    name: string;
    description: string | null;
    instructor: string | null;
    startDate: Date;
    endDate: Date | null;
    startTime: Date;
    endTime: Date;
    dayOfWeek: number;
    intervalDays: number;
  }

  try {
    const session = await prisma.session.findUniqueOrThrow({
      where: { id }
    })

    const dbClass = await prisma.class.findUniqueOrThrow({
      where: { id: session.classId }
    })

    const sessionInfo: sessionInfo = {...session, ...dbClass}

    return sessionInfo
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw "Can't find the class or session."
    }
    throw err
  } finally {
    await prisma.$disconnect()
  }
})
