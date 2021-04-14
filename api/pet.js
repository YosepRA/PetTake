const Pet = require('./models/Pet');
const User = require('./models/User');

// Will be changed later based on signed in user.
const demoUser = { username: 'bigjoe' };

// ===== Helpers =====\

// ===== Resolvers =====

async function list(
  _,
  { preferHomeWith, preferHomeWithout, health, ...filterRest }
) {
  const filter = { ...filterRest };

  if (preferHomeWith) {
    filter.preferHomeWith = { $all: preferHomeWith };
  }
  if (preferHomeWithout) {
    filter.preferHomeWithout = { $all: preferHomeWithout };
  }
  if (health) {
    filter.health = { $all: health };
  }

  const petList = await Pet.find(filter);

  return petList;
}

async function details(_, { _id }) {
  const pet = Pet.findById(_id);

  return pet;
}

async function add(_, args) {
  const pet = { ...args.pet };
  const user = await User.find({ username: demoUser.username });

  pet.createdDate = Date.now();
  pet.author = user._id;

  const newPet = await Pet.create(pet);

  return newPet;
}

async function update(_, { _id, changes }) {
  await Pet.findByIdAndUpdate(_id, changes);
  const updatedPet = await Pet.findById(_id);

  return updatedPet;
}

async function remove(_, { _id }) {
  const result = await Pet.findByIdAndDelete(_id);

  if (result) return true;

  return false;
}

module.exports = { list, details, add, update, remove };
