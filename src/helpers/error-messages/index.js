const error400 = (data) => {
  switch (data.code) {
    case '411':
      return {
        code: '411',
        message: 'Custom error message for 411.',
        error: data,
      };
    case '412':
      return {
        code: '412',
        message: 'Custom error message for 412.',
        error: data,
      };
    default:
      return {
        code: data.code,
        message: 'Default error message like \'Something went wrong\'',
        error: data,
      };
  }
};

const getMessage = (response) => {
  const { data, status } = response;
  const errorTypes = `${status.toString()[0]}xx`;
  switch (errorTypes) {
    case '4xx': {
      return error400(data);
    }
    default:
      return {
        code: null,
        message: 'Default error message like \'Something went wrong\'',
        error: data,
      };
  }
};

export default getMessage;
