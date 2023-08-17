import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const member = await readBody(event)

  try {
    const existMember = await prisma.member.findFirst({
      where: {
        fullName: member.fullName,
        birthday: member.birthday
      }
    })

    if (existMember) {
      console.error(`Failed to create member. ${member.fullName} already exist`)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to create member. ${member.fullName} already exist`
      })
    } else {

      if (typeof (member['stripe']) === 'string') {
        member['stripe'] = parseInt(member['stripe'])
      }

      const newMember = await prisma.member.create({
        data: member
      })

      console.log(`${member.fullName} created.`)
      return newMember
    }

  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }

})
