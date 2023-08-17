import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const member = await readBody(event)

  try {

    if (typeof (member['stripe']) === 'string')
      member['stripe'] = parseInt(member['stripe'])

    const updatedMember = await prisma.member.update({
      where: { id: id },
      // For insomnia JSON array
      // data: member[0]

      data: member
    })

    return updatedMember
  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }

})

