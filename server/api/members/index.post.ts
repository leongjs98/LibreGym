import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const member: object = await readBody(event)

  let message: String = ''

  try {
    const newMember = await prisma.member.create({
      // For insomnia JSON array
      // data: member[0]

      data: member
    })

    // const fullName = member[0].fullName
    // const sex = member[0].sex

    // const fullName = member.fullName
    // const sex = member.sex

    message = `New member, ${newMember.fullName} created`
    return newMember
  } catch (e) {
    message = e
    return e
  } finally {
    await prisma.$disconnect()
    console.log(message)
  }

})
