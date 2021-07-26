/* eslint-disable no-underscore-dangle */

const Pet = require('./models/Pet');
const User = require('./models/User');

// ===== Helpers =====

function buildFilter(filterList) {
  const {
    preferHomeWith,
    preferHomeWithout,
    health,
    ...restFilter
  } = filterList;

  const filter = { ...restFilter };

  /* Filters that contain array of data. Adjust it so that it will filter out 
  data which has a value from within the array. */
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

async function list(_, { sort = '-createdDate', page = 1, ...restFilter }) {
  const filter = buildFilter(restFilter);

  const paginateOptions = {
    sort,
    page,
  };
  const petList = await Pet.paginate(filter, paginateOptions);

  return petList;
}

async function details(_, { _id }) {
  const pet = await Pet.findById(_id).populate('author').exec();

  return pet;
}

async function userPetList(
  _,
  { sort = '-createdDate', page = 1, ...restFilter },
  { username },
) {
  const user = await User.findByUsername(username);
  const filter = buildFilter(restFilter);

  filter._id = { $in: user.pets };
  const paginateOptions = {
    sort,
    page,
  };

  const petList = await Pet.paginate(filter, paginateOptions);

  return petList;
}

// ===== Mutation resolvers =====

async function create(_, args, { username }) {
  const pet = { ...args.pet };
  const user = await User.findOne({ username });

  pet.createdDate = Date.now();
  pet.author = user;

  const newPet = await Pet.create(pet);

  user.pets.push(newPet.id);
  await user.save();

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

module.exports = { list, details, userPetList, create, update, remove };
