import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  try {
    const deleteMember = await prisma.member.delete({
      where: { id: id },
    })

    console.log(`Delete ${deleteMember.fullName}`)
    return deleteMember
  } catch (e) {
    console.log(e)
    return e
  } finally {
    await prisma.$disconnect()
  }
})
