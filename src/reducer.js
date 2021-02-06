import { combineReducers } from "redux";
import blogPostList from "./reducers/blogPostListReducer";
import { reducer as formReducer } from "redux-form";
import auth from "./reducers/authReducer";
import { routerReducer } from "react-router-redux";
import blogPostForm from "./reducers/blogPostFormReducer";
export default combineReducers({
  blogPostList,
  form: formReducer,
  auth,
  router: routerReducer,
  blogPostForm,
});
