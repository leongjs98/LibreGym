import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

interface sessionInfo {
  className?: string;
  oneTime?: boolean;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  description?: string | null;

  startDate?: string | null;
  endDate?: string | null;
}

export default defineEventHandler(async (event) => {

  const sessionToCreate: sessionInfo = await readBody(event)

  try {
    if (sessionToCreate["className"]) {
      const classObj = await prisma.class.findUniqueOrThrow({
        where: {
          name: sessionToCreate["className"]
        }
      })

      const classId = classObj.id
      const oneTime = sessionToCreate['oneTime']
      const dayOfWeek = sessionToCreate['dayOfWeek']
      const startTime = new Date(sessionToCreate['startTime'])
      const endTime = new Date(sessionToCreate['endTime'])
      const description = sessionToCreate['description']

      const newSession = await prisma.session.create({
        data: {
          classId,
          oneTime,
          dayOfWeek,
          startTime,
          endTime,
          description
        }
      })

      console.log("created new session\n", newSession)
      return newSession
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw 'There is a unique constraint violation, a duplicated class session cannot be created.'
      }
    }
    console.log(err)
    throw err
  } finally {
    await prisma.$disconnect()
  }
})
