import {
  IMAGE_DELETE,
  IMAGE_UPLOAD_KO,
  IMAGE_UPLOAD_OK,
  IMAGE_UPLOAD_REQUEST,
} from "../actions/constants";

const defaultState = {
  isSending: false,
  image: null,
  images: [],
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return {
        ...state,
        isSending: true,
        image: action.data,
      };
    case IMAGE_UPLOAD_KO:
      return {
        ...state,
        isSending: false,
        image: null,
      };
    case IMAGE_UPLOAD_OK:
      return {
        ...state,
        isSending: false,
        image: action.data,
        images: state.images.concat(action.data),
      };
    case IMAGE_DELETE:
      return {
        ...state,
        images: state.images.filter((item) => {
          return item.id !== action.data;
        }),
      };
    default:
      return state;
  }
};
