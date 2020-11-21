import CacheService from 'helpers/cache-service';
import { getMovies } from 'src/services/movie';

export const getCachedMovie = () => {
  const cacheKey = 'homepage-data';
  return new Promise((resolve, reject) => {
    CacheService.get({ key: cacheKey })
      .then((result) => {
        resolve(result);
      })
      .catch(() => {
        getMovies()
          .then((response) => {
            CacheService.set({ key: cacheKey, value: response, ttl: 60 * 60 })
              .then(() => {
                resolve(response);
              })
              .catch((error) => {
                reject(new Error(`Error setting homepage data to cache: ${error}`));
              });
          })
          .catch((error) => {
            reject(new Error(`Error getting homepage data: ${error}`));
          });
      });
  });
};

export default { getCachedMovie };
