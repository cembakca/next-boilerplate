import md5 from 'md5';

/**
 * @description If you want to hash any string, use this function
 * @param {String} originalData 
 */
const hashWithMd5 = (originalData) => {
  if (!originalData) return null;
  return md5(originalData);
};

export default hashWithMd5;
