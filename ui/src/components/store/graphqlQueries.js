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
      $page: Int
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
        page: $page
      ) {
        page
        pages
        total
        docs {
          _id
          name
          breed
          images {
            url
          }
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
          publicId
          url
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
      $breed: String
      $age: String
      $gender: String
      $coatLength: String
      $preferHomeWith: [String]
      $preferHomeWithout: [String]
      $health: [String]
      $sort: String
      $page: Int
    ) {
      userPetList(
        breed: $breed
        age: $age
        gender: $gender
        coatLength: $coatLength
        preferHomeWith: $preferHomeWith
        preferHomeWithout: $preferHomeWithout
        health: $health
        sort: $sort
        page: $page
      ) {
        page
        pages
        total
        docs {
          _id
          name
          breed
          images {
            url
          }
        }
      }
    }
  `,
};

export default queries;
