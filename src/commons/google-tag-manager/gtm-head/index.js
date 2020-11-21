/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const GTMHead = () => {
  const gtmContainerId = publicRuntimeConfig.keys.google.tagManager || null;
  if (!gtmContainerId) return null;

  const html = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmContainerId}');`;

  return <script type="text/javascript" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default GTMHead;
