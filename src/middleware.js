import {
  API_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOOUT_SUCCESS,
} from "./actions/constants";
import { requests } from "./agent";

export const tokenMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      // console.log("middleware called", action);
      window.localStorage.setItem("token", action.data.token);
      window.localStorage.setItem("id", action.data.id);
      requests.setToken(action.data.token);
      break;
    case USER_LOOUT_SUCCESS:
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");
      requests.setToken(null);
      break;
    default:
  }
  next(action);
};
