import NodeCache from 'node-cache';

class CacheService {
  constructor(client) {
    this.client = client || new NodeCache();
  }

  static getClient = () => {
    if (!this.client) {
      this.client = new NodeCache();
    }
    return this.client;
  };

  static set = ({ key, value, ttl }) => {
    return new Promise((resolve, reject) => {
      const result = this.getClient().set(key, value, ttl);
      if (result) resolve(true);
      else reject(new Error(`Error setting key "${key}" with the value of ${value}`));
    });
  };

  static get = ({ key }) => {
    return new Promise((resolve, reject) => {
      const result = this.getClient().get(key);
      if (result) resolve(result);
      else reject(new Error(`No value has found for key "${key}"`));
    });
  };
}

export default CacheService;
