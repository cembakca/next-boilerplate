import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FavoriteContainer from 'redux-store/containers/favorite';

import styles from './styles.scss';

const Header = ({ favoriteMovies, getFavoriteList }) => {
  useEffect(() => {
    getFavoriteList();
  }, []);

  return (
    <nav className={styles.header}>
      <a href="/" className={styles.brand}>
        MovieList
      </a>
      {favoriteMovies.length > 0 && <span className={styles.link}>Favorites ({favoriteMovies.length})</span>}
    </nav>
  );
};

Header.propTypes = {
  favoriteMovies: PropTypes.any,
  getFavoriteList: PropTypes.func,
};

export default connect(...FavoriteContainer)(Header);
