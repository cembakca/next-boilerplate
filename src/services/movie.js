import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const usedDummyData = true; // NOTE: You must use 'publicRuntimeConfig.apps.api.hostname'. so you don't need this process;

// eslint-disable-next-line import/prefer-default-export
export const getMovies = async () => {
  const url = usedDummyData
    ? 'https://www.omdbapi.com/?s=Star&apikey=530c3fd2'
    : `${publicRuntimeConfig.apps.api.hostname}/someurl`;

  return axios.get(`${url}`).then((response) => response.data);
};

export const getMovieDetail = async (movieId) => {
  const url = usedDummyData
    ? `https://www.omdbapi.com/?i=${movieId}&apikey=530c3fd2`
    : `${publicRuntimeConfig.apps.api.hostname}/someurl`;

  return axios.get(`${url}`).then((response) => response.data);
};
