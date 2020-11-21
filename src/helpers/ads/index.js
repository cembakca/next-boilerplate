export const areAdsOnThePage = (intervalTime, timeout) =>
  new Promise((resolve, reject) => {
    let clearTimeoutFn = () => {};

    const intervalFn = setInterval(() => {
      if (window.googletag && window.googletag.cmd) {
        clearInterval(intervalFn);
        clearTimeoutFn();
        resolve();
      }
    }, intervalTime);
    const timeoutFn = setTimeout(() => {
      clearInterval(intervalFn);
      reject(new Error('Cannot find googletag object.'));
    }, timeout);

    clearTimeoutFn = () => {
      clearTimeout(timeoutFn);
    };
  });

export const isAdBot = (userAgent) => {
  const regex = RegExp(
    /googlebot|chrome-lighthouse|mediapartners|bingbot|yandexbot|yandeximages|yandexmobilebot|crawler|spider|robot|crawling/i,
  );
  return userAgent ? regex.test(userAgent) : false;
};
