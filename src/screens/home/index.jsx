import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import canonicalDetail from 'mock/canonical';

import ErrorScreen from 'src/screens/error';

import Header from 'src/commons/header';
import MovieCard from 'src/components/movie-card';

const HomeScreen = ({ pageResponse, error }) => {
  if (error) {
    return <ErrorScreen statusCode="500" />;
  }

  const { Search: movieList } = pageResponse;
  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalDetail.homepage.url} />
        <meta name="title" content={canonicalDetail.homepage.title} />
        <meta name="description" content={canonicalDetail.homepage.description} />
        <title>{canonicalDetail.homepage.title}</title>
      </Head>
      <Header />
      <div>
        <h3>The best movies with the word 'star'</h3>
        {movieList.length > 0 && movieList.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>
    </>
  );
};

HomeScreen.propTypes = {
  pageResponse: PropTypes.any,
  error: PropTypes.any,
};

export default HomeScreen;
