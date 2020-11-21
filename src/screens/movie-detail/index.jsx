import React from 'react';
import Head from 'next/head';
import canonicalDetail from 'mock/canonical';

const MovieDetailScreen = ({ pageResponse }) => {
  const { Error } = pageResponse;
  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalDetail.homepage.url} />
        <meta name="title" content={canonicalDetail.homepage.title} />
        <meta name="description" content={canonicalDetail.homepage.description} />
        <title>{canonicalDetail.homepage.title}</title>
      </Head>
      {Error ? <span>{Error}</span> : <div>{JSON.stringify(pageResponse)}</div>}
    </>
  );
};

export default MovieDetailScreen;
