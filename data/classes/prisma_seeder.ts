import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
// import fixClasses from './data.json' assert { type: 'json' }
import classData from './classData.json' assert { type: 'json' }
import sessionData from './sessionData.json' assert { type: 'json' }

const prisma = new PrismaClient()
const NUMBER_OF_CLASSES = 4;

type ClassName = "Strength & Conditioning" | "Gi BJJ" | "NoGi BJJ" | "Muay Thai"

class Class {
  name!: ClassName;
  description!: string;
  instructor!: string;
}

class Session {
  oneTime!: Boolean;
  dayOfWeek!: number;
  startTime!: Date;
  endTime!: Date;
  description!: string;

  // startDate!: Date;
  // endDate!: Date;
}

// const classData = [
//   { name: "Strength & Conditioning", description: faker.lorem.sentences(1), instructor: faker.name.fullName() },
//   { name: "Gi BJJ", description: faker.lorem.sentences(1), instructor: faker.name.fullName() },
//   { name: "NoGi BJJ", description: faker.lorem.sentences(1), instructor: faker.name.fullName() },
//   { name: "Muay Thai", description: faker.lorem.sentences(1), instructor: faker.name.fullName() },
//   { name: "MMA", description: faker.lorem.sentences(1), instructor: faker.name.fullName() },
// ]

// function createRandomSchedule(): Session {
//   const randomTime = faker.date.between('2020-01-01T07:00:00.000Z', '2020-01-01T21:00:00.000Z')
//   randomTime.setSeconds(0)
//   const startTime = randomTime
//   
//   const classTimeInMinutes = faker.helpers.arrayElement([60, 90, 120])
//   randomTime.setMinutes(randomTime.getMinutes() + classTimeInMinutes)
//   const endTime = randomTime
//
//   return {
//     startDate: faker.date.between('2023-07-03T07:00:00.000Z', '2023-07-09T07:00:00.000Z'),
//     startTime,
//     endTime,
//     intervalDays: faker.helpers.arrayElement([0, 1, 2, 7, 28]),
//   };
// }

// for (let i = 0; i < NUMBER_OF_CLASSES; i++) {
//   const singleClass = createRandomClass();
//   randomClasses.push(singleClass);
// }

const classNameId: { [name: string]: string } = {}

async function main() {
  // console.log(sessionData[0].oneTime, typeof(sessionData[0].oneTime))
  await prisma.session.deleteMany()
  await prisma.class.deleteMany()

  await prisma.class.createMany({
    data: classData
  })

  const dbClasses = await prisma.class.findMany()

  for (let i = 0; i < dbClasses.length; i++) {
    classNameId[dbClasses[i].name] = dbClasses[i].id
  }

  for (let i = 0; i < sessionData.length; i++) {
    let classId: string = ""
    classId = classNameId[sessionData[i].name]
    await prisma.session.create({
      data: {
        classId,
        oneTime: sessionData[i].oneTime,
        dayOfWeek: sessionData[i].dayOfWeek,
        startTime: sessionData[i].startTime,
        endTime: sessionData[i].endTime,
        // startDate: sessionData[i].startDate,
      }
    })
  }
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    console.log("Classes Seeding completed...\nDisconnecting Prisma")
    await prisma.$disconnect()
  })
