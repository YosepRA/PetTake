require('dotenv').config();

/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const mongoConnect = require('../mongoConnect');

// Models
const Pet = require('../models/Pet');
const User = require('../models/User');

const { dbConnection } = mongoConnect();

faker.seed(100);

const args = process.argv.length > 2 ? process.argv.slice(2) : [];

const demoUser = {
  username: 'joe',
  email: 'joe@mail.com',
  password: 'joe',
  name: 'Joe',
  phone: '+1 123 1234',
  address: '3434 Bubby Drive Taylor, TX 76574',
};

const breeds = [
  'Irish Terrier',
  'Georgian Shepherd',
  'Leonberger',
  'Dogo Guatemalteco',
  'Cretan Hound',
];
const ages = ['Puppy', 'Young', 'Mature'];
const genders = ['Male', 'Female'];
const coatLengths = ['Short', 'Medium', 'Long'];
const preferHomes = ['Other dogs', 'Other cats', 'Children'];
const healths = ['Spayed/Neutered', 'Vaccinated'];

// Live images.
// const images = [
//   {
//     path:
//       'https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//     filename: 'foobar',
//   },
//   {
//     path:
//       'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//     filename: 'foobar',
//   },
//   {
//     path:
//       'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//     filename: 'foobar',
//   },
//   {
//     path:
//       'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGRvZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//     filename: 'foobar',
//   },
//   {
//     path:
//       'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//     filename: 'foobar',
//   },
// ];

// Dev images.
const images = [
  {
    path: '/uploads/pet-01.jpg',
    filename: 'pet-01.jpg',
  },
  {
    path: '/uploads/pet-02.jpg',
    filename: 'pet-02.jpg',
  },
  {
    path: '/uploads/pet-03.jpg',
    filename: 'pet-03.jpg',
  },
  {
    path: '/uploads/pet-04.jpg',
    filename: 'pet-04.jpg',
  },
  {
    path: '/uploads/pet-05.jpg',
    filename: 'pet-05.jpg',
  },
];

function pickMultipleItems(amount, arr) {
  const randomizedArray = [];

  for (let n = 0; n < amount; n += 1) {
    let randomArrayData;
    // Preventing the same data to get inserted more than once.
    do {
      randomArrayData = faker.helpers.randomize(arr);
    } while (randomizedArray.includes(randomArrayData));

    randomizedArray.push(randomArrayData);
  }

  return randomizedArray;
}

function generatePets(amount, user) {
  const pets = [];

  for (let n = 0; n < amount; n += 1) {
    const pet = {
      createdDate: faker.date.recent(10, new Date()),
      name: faker.name.lastName(),
      breed: faker.helpers.randomize(breeds),
      age: faker.helpers.randomize(ages),
      gender: faker.helpers.randomize(genders),
      coatLength: faker.helpers.randomize(coatLengths),
      preferHomeWith: pickMultipleItems(
        Math.floor(Math.random() * preferHomes.length + 1),
        preferHomes,
      ),
      preferHomeWithout: pickMultipleItems(
        Math.floor(Math.random() * preferHomes.length + 1),
        preferHomes,
      ),
      health: [faker.helpers.randomize(healths)],
      images: pickMultipleItems(
        Math.floor(Math.random() * images.length + 1),
        images,
      ),
      description: faker.lorem.paragraph(5),
      author: user,
    };

    pets.push(pet);
  }

  return pets;
}

async function mongoInit() {
  // Remove all.
  await Pet.deleteMany({});
  await User.deleteMany({});

  const { password, ...userData } = demoUser;
  const newUser = new User(userData);
  const petAmount = args[0] ? Number(args[0]) : 10;

  const registeredUser = await User.register(newUser, password);
  const pets = generatePets(petAmount, registeredUser);
  const createdPets = await Pet.create(pets);
  console.log(
    `Successful data initialization with ${createdPets.length} pets.`,
  );

  // Insert pets references to user.
  registeredUser.pets = createdPets;
  await registeredUser.save();
}

mongoInit().then(() => dbConnection.close());
