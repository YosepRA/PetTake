/* eslint-disable no-underscore-dangle */

const fsPromises = require('fs').promises;

const Pet = require('../models/pet.js');
const User = require('../models/user.js');

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

async function remove(_, { _id }, { username }) {
  const user = await User.findByUsername(username);

  // Delete pet item.
  const result = await Pet.findByIdAndDelete(_id);

  // Delete uploaded images.
  result.images.forEach(async ({ filename }) => {
    await fsPromises.unlink(`./public/uploads/${filename}`);
  });

  // Delete frpm user's pet list.
  user.pets = user.pets.filter((petId) => petId.toString() !== _id);
  await user.save();

  if (result) return true;

  return false;
}

module.exports = { list, details, userPetList, create, update, remove };
