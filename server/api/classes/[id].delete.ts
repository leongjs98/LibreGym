import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    const deleteClass = await prisma.class.delete({
      where: { id },
    })

    return deleteClass
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})

