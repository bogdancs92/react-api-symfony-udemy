import {
  API_ERROR,
  BLOG_POST,
  BLOG_POST_ADD,
  BLOG_POST_LIST,
  BLOG_POST_LIST_SET_PAGE,
  LOADING,
} from "../actions/constants";

const defaultState = {
  posts: null,
  loading: false,
  error: null,
  currentBlogPost: null,
  currentPage: 1,
  pageCount: null,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case BLOG_POST_LIST:
      return {
        ...state,
        posts: action.data.posts,
        loading: false,
        pageCount: action.data.count,
      };
    case BLOG_POST_ADD:
      return {
        ...state,
        posts: state.posts ? state.posts.concat(action.data) : action.data,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case API_ERROR:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    case BLOG_POST: {
      return {
        ...state,
        currentBlogPost: action.data,
        loading: false,
      };
    }
    case BLOG_POST_LIST_SET_PAGE: {
      return {
        ...state,
        currentPage: action.data,
      };
    }

    default:
      return state;
  }
};
