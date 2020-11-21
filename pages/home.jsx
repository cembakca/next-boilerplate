import React from 'react';
import { getCachedMovie } from 'helpers/cache-provider';

import HomeScreen from 'src/screens/home';

const HomePage = ({ pageResponse, error }) => <HomeScreen pageResponse={pageResponse} error={error} />;

HomePage.getInitialProps = async ({ res }) => {
  let pageResponse = {};
  let error = null;

  try {
    pageResponse = await getCachedMovie().then((result) => result);
  } catch (err) {
    const { response } = err;
    const statusCodeFromAPI = (response && response.status) || 404;
    const responseStatusCode = statusCodeFromAPI >= 500 ? 500 : 404;

    res.additionalError = response ? response.data : null;
    res.statusCode = responseStatusCode;
    error = {
      code: responseStatusCode,
    };
  }
  return { pageResponse, error };
};

export default HomePage;
