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
    // find or create class
    if (classToCreate["name"]) {
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

      console.log("new class created\n", newClass)
      return newClass
    }

    console.log("No new class created")
    return "No new class created"

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
