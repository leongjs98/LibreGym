import { faker } from '@faker-js/faker';
import type { SexType } from '@faker-js/faker';
import fs from 'fs';

const FILEPATH = './members_data.json';
const NUMBER_OF_MEMBERS = 20;

type Status = 'enquiry' | 'trial' | 'member';
type Belt = 'white' | 'blue' | 'purple' | 'brown' | 'black';

class User {
  _id!: string;
  // avatar!: string;
  birthday!: Date;
  fullName!: string;
  sex!: SexType;
  email!: string;
  phoneNumber!: string;
  homeAddress!: string;
  status!: Status;
  belt!: Belt;
  stripe!: number;
  joinedDate!: Date;
  contractEndDate!: Date;
  signedWaiver!: boolean;
  medicalIssues!: string;
  notes!: string;
}

const users: User[] = [];

function createRandomUser(): User {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const fullName = `${firstName} ${lastName}`
  const email = faker.internet.email(firstName, lastName);

  return {
    _id: faker.datatype.uuid(),
    // avatar: faker.image.avatar(),
    birthday: faker.date.birthdate({
      min: 18,
      mode: 'age',
    }),
    email,
    phoneNumber: faker.phone.number('+601#-#######'),
    fullName,
    sex,
    status: faker.helpers.arrayElement(['enquiry', 'trial', 'member']),
    belt: faker.helpers.arrayElement(['white', 'blue', 'purple', 'brown', 'black']),
    stripe: faker.datatype.number({ min: 0, max: 4 }),
    joinedDate: faker.date.past(10),
    contractEndDate: faker.date.future(1),
    medicalIssues: faker.lorem.paragraph(2),
    homeAddress: faker.address.streetAddress(true),
    signedWaiver: faker.datatype.boolean(),
    notes: faker.lorem.paragraph(2),
  };
}

for (let i = 0; i < NUMBER_OF_MEMBERS; i++) {
  const user = createRandomUser();
  users.push(user);
}

fs.writeFile(FILEPATH, JSON.stringify(users, null, 2), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Successfully wrote ${FILEPATH}`);
  }
});
