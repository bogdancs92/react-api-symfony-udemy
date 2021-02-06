import { parse } from "marked";
import { SubmissionError } from "redux-form";
import { requests } from "../agent";
import { hydraPageCount, parseApiError } from "../apiUtils";
import {
  API_ERROR,
  BLOG_POST_ADD,
  BLOG_POST_LIST,
  LOADING,
  BLOG_POST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_PROFILE_SUCCESS,
  USER_SET,
  USER_LOOUT_SUCCESS,
  BLOG_POST_LIST_SET_PAGE,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_OK,
  IMAGE_UPLOAD_KO,
  IMAGE_DELETE,
} from "./constants";

export const blogPostList = () => ({
  type: BLOG_POST_LIST,
  data: [
    {
      title: "Hello 1",
    },
    {
      title: "Hello 2",
    },
    {
      title: "Hello 3 ",
    },
  ],
});

export const blogPostListFetch = (page = 1) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });
    requests
      .get("/blog_posts?_page=" + page, false)
      .then((response) => {
        //console.log(response);
        dispatch({
          type: BLOG_POST_LIST,
          data: {
            posts: response["hydra:member"],
            count: hydraPageCount(response),
          },
        });
      })
      .catch((error) => {
        console.log("error get blogs");
        dispatch({
          type: API_ERROR,
          data: "error",
        });
      });
    return;
  };
};

export const blogPostFetch = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });
    requests
      .get("/blog_posts/" + id, false)
      .then((response) => {
        dispatch({
          type: BLOG_POST,
          data: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: API_ERROR,
          data: error,
        });
      });
    return;
  };
};

export const setPostListPage = (page) => {
  //console.log("page", page);
  return (dispatch) => {
    dispatch({
      type: BLOG_POST_LIST_SET_PAGE,
      data: page,
    });
  };
};
export const blogPostUnload = (id) => {
  return (dispatch) => {
    dispatch({
      type: BLOG_POST,
      data: null,
    });
  };
};

export const blogPosAdd = () => ({
  type: BLOG_POST_ADD,
  data: {
    id: Math.floor(Math.random() * 100 + 3),
    title: "new blog",
  },
});

export const loginCheck = (username, password) => {
  return (dispatch) => {
    requests
      .post("/login_check", { username, password }, false)
      .then((response) => {
        //console.log(response);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        console.log("login failed", error);
        dispatch({
          type: USER_LOGIN_ERROR,
          data: "Username or login invalide",
        });
      });
  };
};

export const fetchUserProfile = (id) => {
  return (dispatch) => {
    requests
      .get("/users/" + id, true)
      .then((response) => {
        dispatch({
          type: USER_PROFILE_SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        console.log("fetch user profile error");
        dispatch({
          type: USER_LOGIN_ERROR,
          data: "Impossible de récupérer le profile",
        });
      });
  };
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch({
      type: USER_LOOUT_SUCCESS,
    });
  };
};

export const setUserID = (id) => {
  return (dispatch) => {
    dispatch({
      type: USER_SET,
      data: id,
    });
  };
};

export const postNewComment = (content, id) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log("post new vomment called");
    requests
      .post(
        "/comments",
        {
          content: content,
          post: `/api/blog_posts/${id}`,
          author: `/api/users/${state.auth.id}`,
        },
        true
      )
      .then((response) => {
        console.log("post comment ok");
        return;
        dispatch({
          type: USER_PROFILE_SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        if (error.response.code === 401) {
          dispatch({
            type: USER_LOOUT_SUCCESS,
            data: e.content,
          });
          return;
        }
        const e = parseApiError(error);
        dispatch({
          type: API_ERROR,
          data: e.content,
        });
        /* throw new SubmissionError({
          content: e.content,
        }); */
      });
  };
};

export const postNewBog = (content, title, images = []) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log("post new blog called");
    requests
      .post(
        "/blog_posts",
        {
          content: content,
          author: `/api/users/${state.auth.id}`,
          title: title,
          slug: title.replace(/ /g, "-").toLowerCase(),
          images: images.map((image) => {
            return `${image.url}`;
          }),
        },
        true
      )
      .then((response) => {
        console.log("post  ok");
        return;
        dispatch({
          type: USER_PROFILE_SUCCESS,
          data: response,
        });
      })
      .catch((error) => {
        if (error.response.code === 401) {
          dispatch({
            type: USER_LOOUT_SUCCESS,
            data: e.content,
          });
          return;
        }
        const e = parseApiError(error);
        dispatch({
          type: API_ERROR,
          data: e.content,
        });
        /* throw new SubmissionError({
          content: e.content,
        }); */
      });
  };
};

export const imageUpload = (file) => {
  return (dispatch) => {
    dispatch({
      type: IMAGE_UPLOAD_REQUEST,
    });
    return requests
      .upload("/images", file)
      .then((response) => {
        return dispatch({
          type: IMAGE_UPLOAD_OK,
          data: response,
        });
      })
      .catch((error) => {
        console.log("error upload file", error);
        return dispatch({
          type: IMAGE_UPLOAD_KO,
          data: error,
        });
      });
  };
};

export const imageDelete = (id) => {
  return (dispatch) => {
    return requests
      .delete(`/images/${id}`)
      .then((response) => {
        return dispatch({
          type: IMAGE_DELETE,
          data: id,
        });
      })
      .catch((error) => {
        console.log("error upload file", error);
        return dispatch({
          type: IMAGE_UPLOAD_KO,
          data: error,
        });
      });
  };
};
