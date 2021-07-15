import actionTypes from './actionTypes';
import DataSource from './DataSource';
import queries from './graphQLQueries';
import mutations from './graphQLMutations';

const dataSource = new DataSource();

const actionCreator = {
  getPetList: (variables) => ({
    type: actionTypes.PET_LIST,
    payload: dataSource.graphQLFetch(queries[actionTypes.PET_LIST], variables),
  }),
  getPetDetails: (_id) => ({
    type: actionTypes.PET_DETAILS,
    payload: dataSource.graphQLFetch(queries[actionTypes.PET_DETAILS], { _id }),
  }),
  getUserPetList: (variables) => ({
    type: actionTypes.USER_PET_LIST,
    payload: dataSource.graphQLFetch(
      queries[actionTypes.USER_PET_LIST],
      variables,
    ),
  }),
  deletePet: async (_id) => {
    const data = await dataSource.graphQLFetch(
      mutations[actionTypes.PET_DELETE],
      { _id },
    );
    return {
      type: actionTypes.PET_DELETE,
      payload: {
        _id,
        data: data.petDelete,
      },
    };
  },
  setAuthenticate: (status, user) => ({
    type: actionTypes.SET_AUTHENTICATE,
    payload: {
      status,
      user,
    },
  }),
};

export default actionCreator;
