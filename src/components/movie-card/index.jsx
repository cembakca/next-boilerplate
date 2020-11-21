import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FavoriteContainer from 'redux-store/containers/favorite';

import { slugify } from 'src/helpers/string-convert';

import styles from './styles.scss';

const MovieCard = ({ movie, error, addMovieToFavoriteList }) => {
  if (error.message) {
    console.log(error.message);
  }
  return (
    <div className={styles.card}>
      <img className={styles.poster} src={movie.Poster} alt={movie.Title} />
      <p className={styles.title}>{movie.Title}</p>
      <a className={styles.button} href={`movie/${slugify(movie.Title)}-${movie.imdbID}`}>
        Detail
      </a>
      <button type="button" className={styles.button} onClick={() => addMovieToFavoriteList(movie)}>
        Add To Favorite
      </button>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  addMovieToFavoriteList: PropTypes.func,
  error: PropTypes.object,
};

export default connect(...FavoriteContainer)(MovieCard);
