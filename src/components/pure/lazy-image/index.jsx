import React, { useEffect } from 'react';
import LazyLoad from 'vanilla-lazyload';
import classnames from 'classnames';
import { brokenImageErrorHandler } from 'helpers/ui';

// Only initialize it one time for the entire application
if (typeof document !== 'undefined' && !document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });
}

const LazyImage = (
  {
    alt = 'alt',
    src,
    initialImage = '/static/img/initial-image.png',
    fallbackImage = '/static/img/no-image-found.png',
    style,
    className,
  },
  props,
) => {
  useEffect(() => {
    document.lazyLoadInstance.update();
  });

  const classes = classnames({
    lazy: true,
    [className]: className,
  });

  // prevent infinite reloading of fallback image by calling only 1 time
  let error = false;
  const onError = (event) => {
    if (!error) {
      error = true;
      brokenImageErrorHandler(event, fallbackImage);
    }
  };

  return (
    <img alt={alt} className={classes} src={initialImage} data-src={src} style={style} onError={onError} {...props} />
  );
};

export default LazyImage;
