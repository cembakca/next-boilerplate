import get from 'lodash/get';

export const pushArrayField = (target, key, array, field) => {
  const arrayValue = array && Array.isArray(array) && array.map((item) => item[field]);
  if (arrayValue && arrayValue.length > 0) {
    target.push({ key, value: arrayValue });
  } else {
    target.push({ key, value: 'undefined' });
  }
};

export const pushObjectField = (target, key, object, field) => {
  const fieldValue = !field ? object : get(object, field, null);
  if (fieldValue) {
    target.push({ key, value: fieldValue });
  } else {
    target.push({ key, value: 'undefined' });
  }
};
