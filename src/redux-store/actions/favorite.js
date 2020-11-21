import {
  GET_FAVORITE_LIST_LOADING,
  GET_FAVORITE_LIST,
  ADD_ITEM_TO_FAVORITE_LIST,
  ADD_ITEM_TO_FAVORITE_MAX_LIST,
  ADD_ITEM_TO_FAVORITE_LIST_LOADING,
  ADD_ITEM_TO_FAVORITE_LIST_ERROR,
  REMOVE_ITEM_FROM_FAVORITE_LIST,
} from 'redux-store/action-types/favorite';

import { getMovieDetail } from 'services/movie';

const asyncStorage = {
  setItem: (key, value) => Promise.resolve().then(() => localStorage.setItem(key, value)),
  getItem: (key) =>
    Promise.resolve().then(() =>
      typeof navigator !== 'undefined' && navigator.cookieEnabled ? localStorage.getItem(key) : null,
    ),
};

const getMovieDetailFromService = async (item) => {
  const detail = await getMovieDetail(item);
  return detail;
};

const getFavoriteMoviesFromStorage = () => {
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  return favoriteMovies.slice();
};

const isMaxMovies = (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const favoritesFromStorage = getFavoriteMoviesFromStorage();
    if (favoritesFromStorage.length >= 4) {
      const { favoriteMovies } = getState().favorite;
      dispatch({
        type: ADD_ITEM_TO_FAVORITE_MAX_LIST,
        payload: {
          loading: false,
          favoriteMovies,
          isLimited: true,
          error: { message: 'Maximum 4 movies can be selected.' },
        },
      });
      reject();
    } else {
      resolve(favoritesFromStorage);
    }
  });

const removeItemFromFavoriteMovie = (movie, dispatch, getState) => {
  const favoritesFromStorage = getFavoriteMoviesFromStorage();
  const { favoriteMovies } = getState().favorite;

  const removedMovie = favoritesFromStorage.filter((item) => item !== movie.imdbID);
  localStorage.setItem('favoriteMovies', JSON.stringify(removedMovie));

  const favoriteListStore = favoriteMovies ? favoriteMovies.slice() : [];
  const removedFavoriteListStore = favoriteListStore.filter((item) => item.imdbID !== movie.imdbID);

  return dispatch({
    type: REMOVE_ITEM_FROM_FAVORITE_LIST,
    payload: {
      loading: false,
      favoriteMovies: removedFavoriteListStore,
      isLimited: false,
      error: {},
    },
  });
};

const removeMovieItemFromStorage = (movieId) => {
  const favoritesFromStorage = getFavoriteMoviesFromStorage();
  const removedMovie = favoritesFromStorage.filter((item) => item !== movieId);
  localStorage.setItem('favoriteMovies', JSON.stringify(removedMovie));
};

const addItemFavoriteMovies = (movie, dispatch, getState) => {
  const favoritesFromStorage = getFavoriteMoviesFromStorage();
  const { favoriteMovies } = getState().favorite;

  favoritesFromStorage.push(movie.imdbID);
  localStorage.setItem('favoriteMovies', JSON.stringify(favoritesFromStorage));

  const addFavoriteListStore = favoriteMovies ? favoriteMovies.slice() : [];
  addFavoriteListStore.push(movie);
  return dispatch({
    type: ADD_ITEM_TO_FAVORITE_LIST,
    payload: {
      loading: false,
      favoriteMovies: addFavoriteListStore,
      isLimited: false,
      error: {},
    },
  });
};

const hasId = (movieId) => {
  const favoritesFromStorage = getFavoriteMoviesFromStorage();
  const state = favoritesFromStorage.includes(movieId);
  if (state) {
    return true;
  }
  return false;
};

export const getFavoriteList = () => async (dispatch, getState) => {
  const { favoriteMovies } = getState().favorite;

  dispatch({
    type: GET_FAVORITE_LIST_LOADING,
    payload: {
      loading: true,
      favoriteMovies,
    },
  });

  const favoriteMoviesFromStorage = JSON.parse(await asyncStorage.getItem('favoriteMovies'));

  if (favoriteMoviesFromStorage && favoriteMovies.length === 0) {
    const getData = () =>
      Promise.all(
        favoriteMoviesFromStorage.map(async (item) => {
          let detail = null;
          try {
            detail = await getMovieDetailFromService(item);
          } catch (e) {
            console.warn('Error getting details.');
            removeMovieItemFromStorage(item);
          }
          return detail;
        }),
      );
    const favoriteMovieList = await getData();
    dispatch({
      type: GET_FAVORITE_LIST,
      payload: {
        loading: false,
        favoriteMovies: favoriteMovieList.filter((item) => item !== null),
      },
    });
  } else {
    dispatch({
      type: GET_FAVORITE_LIST,
      payload: {
        loading: false,
        favoriteMovies,
      },
    });
  }
};

export const addMovieToFavoriteList = (movie) => async (dispatch, getState) => {
  const { favoriteMovies } = getState().favorite;
  dispatch({
    type: ADD_ITEM_TO_FAVORITE_LIST_LOADING,
    payload: {
      loading: true,
      favoriteMovies,
      isLimited: false,
    },
  });

  try {
    await isMaxMovies(dispatch, getState);
    const has = hasId(movie.imdbID);
    if (has) {
      dispatch({
        type: ADD_ITEM_TO_FAVORITE_LIST_ERROR,
        payload: {
          loading: false,
          favoriteMovies,
          isLimited: false,
          error: { message: `${movie.imdbID} already exists.` },
        },
      });
      return;
    }
    addItemFavoriteMovies(movie, dispatch, getState);
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_FAVORITE_LIST_ERROR,
      payload: {
        loading: false,
        favoriteMovies,
        isLimited: false,
        error: { message: 'Something went wrong' },
      },
    });
  }
};

export const removeMovieFromFavoriteList = (movie) => async (dispatch, getState) => {
  const { favoriteMovies } = getState().favorite;
  dispatch({
    type: ADD_ITEM_TO_FAVORITE_LIST_LOADING,
    payload: {
      loading: true,
      favoriteMovies,
      isLimited: false,
    },
  });
  const has = hasId(movie.imdbID);
  if (!has) {
    return;
  }
  removeItemFromFavoriteMovie(movie, dispatch, getState);
};
