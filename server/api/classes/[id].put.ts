import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const classToUpdate: object = await readBody(event)

  try {
    const updatedClass = await prisma.class.update({
      where: { id },
      data: classToUpdate
    })

    return updatedClass
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})


