import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    const deleteSession = await prisma.session.delete({
      where: { id },
    })

    const relatedClassName = await prisma.class.findUniqueOrThrow({
      where: { id: deleteSession.classId },
      select: { name: true }
    })

    return { ...deleteSession, ...relatedClassName }
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect()
  }
})

