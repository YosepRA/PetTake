const initialState = {
  petList: {
    page: 0,
    pages: 0,
    total: 0,
    docs: [],
  },
  petDetails: {},
  userPetList: {
    page: 0,
    pages: 0,
    total: 0,
    docs: [],
  },
  user: {
    username: '',
    email: '',
    name: '',
    phone: '',
    address: '',
  },
  isAuthenticated: false,
};

export default initialState;
