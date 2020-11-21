import React from 'react';
import Error from 'next/error';
import ErrorScreen from 'src/screens/error';

const ErrorPage = ({ statusCode }) => {
  return <ErrorScreen statusCode={statusCode} />;
};

ErrorPage.getInitialProps = async ({ res, err }) => {
  const errorInitialProps = await Error.getInitialProps({ res, err });

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404 };
    }

    if (err) {
      return errorInitialProps;
    }
  }

  return errorInitialProps;
};

export default ErrorPage;
