import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const classId = event.context.params.id

  try {
    const findClass = await prisma.class.findUnique({
      where: {
        id: classId
      }
    })

    return findClass
  } catch (e) {
    return e
  } finally {
    await prisma.$disconnect()
  }
})
