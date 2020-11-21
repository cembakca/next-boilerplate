/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import MovieDetailScreen from 'src/screens/movie-detail';
import { getMovieDetail } from 'services/movie';

const MovieDetailPage = ({ pageResponse }) => <MovieDetailScreen pageResponse={pageResponse} />;

MovieDetailPage.getInitialProps = async ({ res, query }) => {
  const { movieId } = query;

  try {
    const response = await getMovieDetail(movieId);
    return { pageResponse: response };
  } catch (error) {
    res.writeHead(301, { Location: '/' });
    res.end();
  }
  return {};
};

MovieDetailPage.propTypes = {
  pageResponse: PropTypes.shape(),
};

export default MovieDetailPage;
