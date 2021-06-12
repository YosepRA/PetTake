import actionTypes from './actionTypes';

const queries = {
  [actionTypes.PET_LIST]: `
    query petList(
      $breed: String
      $age: String
      $gender: String
      $coatLength: String
      $preferHomeWith: [String]
      $preferHomeWithout: [String]
      $health: [String]
      $sort: String
    ) {
      petList(
        breed: $breed
        age: $age
        gender: $gender
        coatLength: $coatLength
        preferHomeWith: $preferHomeWith
        preferHomeWithout: $preferHomeWithout
        health: $health
        sort: $sort
      ) {
        _id
        name
        breed
        images {
          path
        }
      }
    }
  `,
  [actionTypes.PET_DETAILS]: `
    query pet($_id: ID!) {
      pet(_id: $_id) {
        name
        breed
        gender
        age
        coatLength
        preferHomeWith
        preferHomeWithout
        health
        description
        images {
          path
          filename
        }
        author {
          email
          phone
          address
        }
      }
    }
  `,
  [actionTypes.USER_PET_LIST]: `
    query userPetList(
      $petIds: [ID]!
      $breed: String
      $age: String
      $gender: String
      $coatLength: String
      $preferHomeWith: [String]
      $preferHomeWithout: [String]
      $health: [String]
      $sort: String
    ) {
      userPetList(
        petIds: $petIds
        breed: $breed
        age: $age
        gender: $gender
        coatLength: $coatLength
        preferHomeWith: $preferHomeWith
        preferHomeWithout: $preferHomeWithout
        health: $health
        sort: $sort
      ) {
        _id
        name
        breed
        images {
          path
        }
      }
    }
  `,
};

export default queries;
