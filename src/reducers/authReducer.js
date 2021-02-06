import {
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOOUT_SUCCESS,
  USER_PROFILE_SUCCESS,
  USER_SET,
} from "../actions/constants";

const defaultState = {
  token: null,
  id: null,
  error: null,
  isAuthenticated: false,
  userData: null,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.data.token,
        id: action.data.id,
        error: null,
        isAuthenticated: true,
      };
    case USER_LOOUT_SUCCESS:
      return {
        ...state,
        token: null,
        id: null,
        error: null,
        isAuthenticated: false,
        userData: null,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        token: null,
        id: null,
        error: action.data,
        isAuthenticated: false,
        userData: null,
      };
    case USER_PROFILE_SUCCESS:
      console.log(action.data);
      console.log(state);
      return {
        ...state,
        userData: action.data.id == state.id ? action.data : state.data,
      };
    case USER_SET:
      return {
        ...state,
        id: action.data,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
