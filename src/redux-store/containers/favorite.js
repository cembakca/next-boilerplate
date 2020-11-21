import { getFavoriteList, addMovieToFavoriteList, removeMovieFromFavoriteList } from 'redux-store/actions/favorite';

const mapDispatchToProps = {
  getFavoriteList,
  addMovieToFavoriteList,
  removeMovieFromFavoriteList,
};

const mapStateToProps = (state) => ({
  loading: state.favorite.loading,
  isLimited: state.favorite.isLimited,
  error: state.favorite.error,
  favoriteMovies: state.favorite.favoriteMovies,
});

export default [mapStateToProps, mapDispatchToProps];
