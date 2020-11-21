const hasFileExtension = (url) => /(\.[0-9a-z]+$)|(\.[0-9a-z]+?\?)/i.test(url);

const getProcessedUrl = (url, options) => {
  if (hasFileExtension(url)) return url;
  let returnURL = url || '';

  if (options.checkPaginationAnomaly) returnURL = returnURL.replace(/(\/%7B%7Bpage%7D%7D)|(\/{{page}})/gi, '');
  if (options.checkSearchTermAnomaly)
    returnURL = returnURL.replace(/(\?q%3D%7Bsearch_term_string%7D)|(\?q={search_term_string})/gi, '');
  return returnURL;
};

module.exports = function expressModule(options) {
  const moduleOptions = {
    ...{
      requestType: 'GET',
      redirectStatusCode: 301,
      checkPaginationAnomaly: false,
      checkSearchTermAnomaly: false,
    },
    ...(options || {}),
  };

  return function expressMiddleware(req, res, next) {
    if (req.method !== options.requestType) {
      next();
    } else {
      const newResUrl = getProcessedUrl(req.url, moduleOptions);
      if (req.url === newResUrl) {
        next();
      } else {
        res.writeHead(options.redirectStatusCode, { Location: newResUrl });
        res.end();
      }
    }
  };
};
