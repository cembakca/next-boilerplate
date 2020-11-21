import React from 'react';
import ErrorScreen from 'src/screens/error';

const Page500 = () => {
  return <ErrorScreen statusCode="500" />;
};

Page500.getInitialProps = ({ res }) => {
  res.status(500);
  return {};
};

export default Page500;
