import React from 'react';

import { getBreadCrumbStructuredData } from 'helpers/create-seo-tags';

const BreadCrumbStructuredData = ({ breadcrumbStructuredData }) => {
  const breadCrumbStructuredData = breadcrumbStructuredData
    ? getBreadCrumbStructuredData({
        breadcrumb: breadcrumbStructuredData.items,
      })
    : {
        type: null,
        innerHTML: null,
      };

  return (
    <script
      type={breadCrumbStructuredData.type}
      dangerouslySetInnerHTML={{ __html: breadCrumbStructuredData.innerHTML }}
    />
  );
};

export default BreadCrumbStructuredData;
