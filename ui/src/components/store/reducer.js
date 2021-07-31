/* eslint-disable no-underscore-dangle */
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

    case actionTypes.USER_INFO_UPDATE:
      draft.user = { ...action.payload.userInfoUpdate };
      break;

    // Use this if you want to manually filter user pet list.
    // Other option will be refetching the data and relying on database as the ~
    // ~ source of truth.
    case actionTypes.PET_DELETE:
      // "data" contains Boolean value of whether there is such pet with given id.
      if (!action.payload.data) {
        throw new Error('Pet is not found.');
      }
      draft.userPetList.docs = draft.userPetList.docs.filter(
        (pet) => pet._id !== action.payload._id,
      );
      break;

    case actionTypes.SET_AUTHENTICATE:
      draft.isAuthenticated = action.payload.status;
      draft.user = action.payload.user;
      break;

    default:
      return undefined;
  }
}, initialState);

export default reducer;
