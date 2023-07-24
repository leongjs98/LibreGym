import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    const findClass = await prisma.class.findUnique({
      where: { id }
    })

    return findClass
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})
