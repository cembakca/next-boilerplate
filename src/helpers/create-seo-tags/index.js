import getConfig from 'next/config';

import { normalizeUrl } from 'helpers/url';

const { publicRuntimeConfig } = getConfig();

const { canonicalHost, hostname } = publicRuntimeConfig.app;

export const getCanonicalUrl = ({ host = canonicalHost, url }) => {
  return host + url;
};


export const getBreadCrumbStructuredData = ({ host = hostname, breadcrumb }) => {
  const itemListElement = breadcrumb.map((item, index) => {
    return {
      '@type': 'ListItem',
      name: item.name,
      position: index + 1,
      item: [
        {
          '@type': 'Thing',
          '@id': normalizeUrl(`${host}${item.id}`),
          image: item.image,
        },
      ],
    };
  });

  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org/',
      '@type': 'BreadcrumbList',
      itemListElement,
    }),
  };
};



export default {
  getCanonicalUrl,
  getBreadCrumbStructuredData,
};
