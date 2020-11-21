import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const signup = (type, params) => {
  return axios.post(`${publicRuntimeConfig.apps.api.hostname}/v1/register`, params);
};

export const signin = (params) => {
  return axios.post(`${publicRuntimeConfig.apps.api.hostname}/v1/login`, params);
};
