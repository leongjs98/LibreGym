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
      console.log('member exist\n', existMember)
      throw 'Member already exist'
    } else {
      const newMember = await prisma.member.create({
        data: member
      })
      return newMember
    }

  } catch (e) {
    throw e
  } finally {
    await prisma.$disconnect()
  }

})
