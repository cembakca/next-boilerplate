/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const GTMBody = () => {
  const gtmContainerId = publicRuntimeConfig.keys.google.tagManager || null;
  if (!gtmContainerId) return null;

  return (
    <noscript>
      <iframe
        title="gtm-container-frame"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
};

export default GTMBody;
