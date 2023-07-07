import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  try {
    const deleteClass = await prisma.class.delete({
      where: { id: id },
    })

    console.log(`Delete ${deleteClass.name}`)
    return deleteClass
  } catch (e) {
    console.log(e)
    return e
  } finally {
    await prisma.$disconnect()
  }
})

