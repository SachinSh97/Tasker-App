import {
  REGISTER_USER,
  UNRESGISTER_USER,
} from 'actions/authentication/actionTypes';

const initialState = { user: {}, member: [], project: {} };

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      const { authentication } = action;
      return { ...authentication };
    case UNRESGISTER_USER:
      return { ...initialState };
    default:
      return state;
  }
};

export default authenticationReducer;
