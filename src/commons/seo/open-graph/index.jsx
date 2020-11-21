import React from 'react';
import getConfig from 'next/config';

import ImageUrlMaker from 'helpers/image-url-maker';

const { publicRuntimeConfig } = getConfig();

const OpenGraph = ({ metatags }) => {
  return (
    <>
      {metatags &&
        metatags.map((m) => {
          let { content } = m;
          if (m.name === 'twitter:image' || m.name === 'og:image') {
            content = ImageUrlMaker.scaleImage(m.content);
          } else if (m.name === 'og:url') {
            content = publicRuntimeConfig.app.hostname + content;
          }
          return <meta property={m.name} content={content} />;
        })}
      <meta property="fb:app_id" content={publicRuntimeConfig.facebook.appId} />
    </>
  );
};

export default OpenGraph;
