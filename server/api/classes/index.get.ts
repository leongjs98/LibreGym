import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const dayOfWeek = parseInt(query.dayofweek)

  try {
    let classes: Object = {}

    if (query.dayofweek) {
      classes = await prisma.class.findMany({
        where: { dayOfWeek: dayOfWeek },
        orderBy: [
          { startTime: 'asc' }
        ]
      })
    } else {
      classes = await prisma.class.findMany()
    }

    return classes

  } catch (e) {
    return e
  } finally {
    await prisma.$disconnect()
  }
})
