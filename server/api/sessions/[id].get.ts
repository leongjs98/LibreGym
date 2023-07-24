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
    oneTime: boolean;
    startDate: Date | null;
    endDate: Date | null;
    startTime: Date;
    endTime: Date;
    dayOfWeek: number;
  }

  try {
    const session = await prisma.session.findUniqueOrThrow({
      where: { id }
    })

    const dbClass = await prisma.class.findUniqueOrThrow({
      where: { id: session.classId },
      select: { name: true, instructor: true } // Don't want class description
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
