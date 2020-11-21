// FAVORITE
import {
  GET_FAVORITE_LIST,
  GET_FAVORITE_LIST_LOADING,
  ADD_ITEM_TO_FAVORITE_LIST,
  ADD_ITEM_TO_FAVORITE_LIST_LOADING,
  ADD_ITEM_TO_FAVORITE_MAX_LIST,
  ADD_ITEM_TO_FAVORITE_LIST_ERROR,
  REMOVE_ITEM_FROM_FAVORITE_LIST,
} from 'redux-store/action-types/favorite';

const initialState = {
  loading: false,
  favoriteMovies: [],
  error: {},
  isLimited: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FAVORITE_LIST_LOADING:
      return { ...state, ...payload };
    case GET_FAVORITE_LIST:
      return { ...state, ...payload };
    case ADD_ITEM_TO_FAVORITE_LIST:
      return { ...state, ...payload };
    case ADD_ITEM_TO_FAVORITE_LIST_LOADING:
      return { ...state, ...payload };
    case ADD_ITEM_TO_FAVORITE_MAX_LIST:
      return { ...state, ...payload };
    case ADD_ITEM_TO_FAVORITE_LIST_ERROR:
      return { ...state, ...payload };
    case REMOVE_ITEM_FROM_FAVORITE_LIST:
      return { ...state, ...payload };
    default: {
      return state;
    }
  }
}
