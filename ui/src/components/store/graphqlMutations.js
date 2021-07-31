import actionTypes from './actionTypes';

const mutations = {
  [actionTypes.PET_CREATE]: `
    mutation petCreate($pet: PetInput!) {
      petCreate(pet: $pet) {
        _id
      }
    }
  `,
  [actionTypes.PET_UPDATE]: `
    mutation petUpdate($_id: ID!, $changes: PetUpdateInput!) {
      petUpdate(_id: $_id, changes: $changes) {
        _id
      }
    }
  `,
  [actionTypes.PET_DELETE]: `
    mutation petDelete($_id: ID!) {
      petDelete(_id: $_id)
    }
  `,
  [actionTypes.USER_INFO_UPDATE]: `
    mutation userInfoUpdate($changes: UserInfoUpdateInput!) {
      userInfoUpdate(changes: $changes) {
        username
        name
        email
        phone
        address
      }
    }
  `,
  [actionTypes.USER_CHANGE_PASSWORD]: `
    mutation userChangePassword($oldPassword: String!, $newPassword: String!) {
      userChangePassword(oldPassword: $oldPassword, newPassword: $newPassword)
    }
  `,
};

export default mutations;
