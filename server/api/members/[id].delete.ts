import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    try {
      await prisma.attendance.deleteMany({
        where: { attendeeId: id }
      })
    } catch (e) {
      throw e
    }

    const deleteMember = await prisma.member.delete({
      where: { id: id },
    })

    return deleteMember
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }
})
