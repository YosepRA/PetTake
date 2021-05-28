import actionTypes from './actionTypes';
import graphqlFetch from '../graphqlFetch';
import queries from './graphqlQueries';

const actionCreator = {
  getPetList: (variables) => ({
    type: actionTypes.PET_LIST,
    payload: graphqlFetch(queries[actionTypes.PET_LIST], variables),
  }),
  getPetDetails: (_id) => ({
    type: actionTypes.PET_DETAILS,
    payload: graphqlFetch(queries[actionTypes.PET_DETAILS], { _id }),
  }),
  getUserPetList: (variables) => ({
    type: actionTypes.USER_PET_LIST,
    payload: graphqlFetch(queries[actionTypes.USER_PET_LIST], variables),
  }),
};

export default actionCreator;
