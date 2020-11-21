const nodeUrl = require('url');

const hasFileExtension = (url) => /(\.[0-9a-z]+$)|(\.[0-9a-z]+?\?)/i.test(url);

const hasParams = (url) => /\?/.test(url);

const hasTrailingSlash = (url) => /\/$/.test(url) || /\/\?/.test(url);

const transform = (url, options) => {
  if (hasFileExtension(url)) return url;
  let returnURL = url || '';

  if (options.lowercase) {
    const urlParsed = nodeUrl.parse(url);
    urlParsed.pathname = urlParsed.pathname.toLowerCase();
    if (options.lowercaseQueries) urlParsed.search = urlParsed.search.toLowerCase();
    returnURL = nodeUrl.format(urlParsed);
  }
  if (options.repeatedSlash && options.repeatedSlash !== false) returnURL = returnURL.replace(/\/\/+/g, '/');
  if (options.repeatedQuestionMark) returnURL = returnURL.replace(/\?{2,}/g, '?');
  if (options.repeatedAmpersand) returnURL = returnURL.replace(/\&{2,}/g, '&');
  if (options.trailingSlash && hasTrailingSlash(returnURL)) {
    if (hasParams(returnURL)) {
      returnURL = `${returnURL.split('?')['0']}/${returnURL.slice(returnURL.split('?')[0].length, returnURL.length)}`;
    } else {
      returnURL += '/';
    }
  }
  return returnURL;
};

/**
 * @return {function} expressUrlMiddleware - Express middleware function
 */
module.exports = function expressUrlModule(options) {
  const moduleOptions = {
    ...{
      requestType: 'GET',
      redirectStatusCode: 301,
      lowercase: false,
      lowercaseQueries: false,
      repeatedSlash: true,
      repeatedQuestionMark: true,
      repeatedAmpersand: true,
      trailingSlash: false,
    },
    ...(options || {}),
  };

  return function expressUrlMiddleware(req, res, next) {
    if (req.method !== options.requestType) {
      next();
    } else {
      const newResUrl = transform(req.url, moduleOptions);
      if (req.url === newResUrl) {
        next();
      } else {
        res.writeHead(options.redirectStatusCode, { Location: newResUrl });
        res.end();
      }
    }
  };
};
