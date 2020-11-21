
import React from 'react';

const ErrorScreen = ({ statusCode }) => {
  return (
    <>
      <div>
        <div>
          <span>{statusCode}</span>
        </div>
      </div>
      <div>
        <a href="/">
          Go homepage
        </a>
      </div>
    </>
  );
};

export default ErrorScreen;
