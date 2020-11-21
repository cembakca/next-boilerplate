const brokenImageErrorHandler = (event, fallbackImage = '/static/img/no-image-found.png') => {
  try {
    // eslint-disable-next-line no-param-reassign
    event.target.src = fallbackImage;
  } catch (error) {
    console.error('Error setting placeholder image: ', event);
  }
  return null;
};

export { brokenImageErrorHandler };
