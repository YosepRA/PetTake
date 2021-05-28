const mongoose = require('mongoose');

const Pet = require('./models/Pet');
const User = require('./models/User');

// Will be changed later based on signed in user.
const demoUser = { username: 'bigjoe' };

// ===== Helpers =====

function buildFilter(filterList) {
  const {
    preferHomeWith,
    preferHomeWithout,
    health,
    ...restFilter
  } = filterList;

  const filter = { ...restFilter };

  if (preferHomeWith) {
    filter.preferHomeWith = { $all: preferHomeWith };
  }
  if (preferHomeWithout) {
    filter.preferHomeWithout = { $all: preferHomeWithout };
  }
  if (health) {
    filter.health = { $all: health };
  }

  return filter;
}

// ===== Query resolvers =====

async function list(_, { sort = '-createdDate', ...restFilter }) {
  const filter = buildFilter(restFilter);

  const petList = await Pet.find(filter).sort(sort);

  return petList;
}

async function details(_, { _id }) {
  const pet = await Pet.findById(_id).populate('author').exec();

  return pet;
}

async function userPetList(_, { petIds, sort, ...restFilter }) {
  const ids = petIds.map((id) => mongoose.Types.ObjectId(id));
  const filter = buildFilter(restFilter);
  // eslint-disable-next-line no-underscore-dangle
  filter._id = { $in: ids };

  const petList = await Pet.find(filter).sort(sort);

  return petList;
}

// ===== Mutation resolvers =====

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

module.exports = { list, details, userPetList, add, update, remove };
