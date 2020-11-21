export const getQueryParameterFromUrl = (name, url) => {
  const replacedName = name.replace(/[\\]]/, '\\$&');
  const regex = new RegExp(`[?&]${replacedName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const removeQueryParameterFromUrl = (key, sourceURL) => {
  let rtn = sourceURL.split('?')[0];
  let param;
  let paramsArr = [];
  const queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
  if (queryString !== '') {
    paramsArr = queryString.split('&');
    for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
      // eslint-disable-next-line prefer-destructuring
      param = paramsArr[i].split('=')[0];
      if (param === key) {
        paramsArr.splice(i, 1);
      }
    }
    rtn = paramsArr.length > 0 ? `${rtn}?${paramsArr.join('&')}` : `${rtn}`;
  }
  return rtn;
};

export const detectQueryString = (url) => {
  const pattern = new RegExp(/\?+/g);
  return pattern.test(url);
};

export const addAnchorToUrl = (url, anchor) => {
  const urlParts = url.split('#');
  if (urlParts.length === 1) {
    return `${url}#${anchor}`;
  }
  return url;
};

export const removeAnchorFromUrl = (url) => {
  const urlParts = url.split('#');
  return urlParts[0];
};

export const normalizeUrl = (url) => {
  if (url) {
    const baseUrl = url.split('?')[0];
    const query = url.split('?')[1];
    if (baseUrl.substr(-1) !== '/') {
      return query ? `${baseUrl}/?${decodeURIComponent(query)}` : `${baseUrl}/`;
    }
    return url;
  }
  return url;
};

export const getTrailingSlashUrl = (url) => {
  if (url) {
    if (!url.endsWith('/')) {
      return `${url}/`;
    }
  }
  return url;
};
