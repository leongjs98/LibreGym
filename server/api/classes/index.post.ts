import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  interface classToCreate {
    name?: string;
    instructor?: string | null;
    description?: string | null;
  }

  const classToCreate: classToCreate = await readBody(event)

  try {
    if (classToCreate["name"]) {

      const existClass = await prisma.class.findFirst({
        where: {
          name: classToCreate["name"].toString(),
        }
      })

      if (existClass) {
        console.error(`Failed to create class. ${classToCreate["name"].toString()} already exist`)
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to create class. ${classToCreate["name"].toString()} already exist`
        })
      }

      const newClass = await prisma.class.upsert({
        where: {
          name: classToCreate["name"].toString(),
        },
        update: {},
        create: {
          name: classToCreate["name"],
          description: classToCreate["description"],
          instructor: classToCreate["instructor"],
        }
      })

      console.log("created new class")
      return newClass
    }

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw 'There is a unique constraint violation, a duplicated class session cannot be created.'
      }
    }
    throw err
  } finally {
    await prisma.$disconnect()
  }
})
