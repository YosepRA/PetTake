/* eslint-disable consistent-return */
import produce from 'immer';

import actionTypes from './actionTypes';
import initialState from './initialState';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.PET_LIST:
      draft.petList = action.payload.petList;
      break;

    case actionTypes.PET_DETAILS:
      draft.petDetails = action.payload.pet;
      break;

    case actionTypes.USER_PET_LIST:
      draft.userPetList = action.payload.userPetList;
      break;

    default:
      return undefined;
  }
}, initialState);

export default reducer;
