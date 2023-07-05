import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const member: object = await readBody(event)

  let message: String = ''

  try {
    const updatedMember = await prisma.member.update({
      where: { id: id },
      // For insomnia JSON array
      // data: member[0]

      data: member
    })

    message = `Updated ${updatedMember.fullName}`
    return updatedMember
  } catch (e) {
    message = e
    return e
  } finally {
    await prisma.$disconnect()
    console.log(message)
  }

})

