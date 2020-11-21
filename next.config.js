/* eslint-disable no-param-reassign */
const withSass = require('@zeit/next-sass');
const webpack = require('webpack'); // eslint-disable-line
const envConfig = require('config');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const withTM = require('@weco/next-plugin-transpile-modules');

const dev = process.env.NODE_ENV !== 'production';

const ENV_KEYS = [
  // eslint-disable-line
  'NODE_ENV',
];

const envPlugin = ENV_KEYS.reduce(
  (result, key) => ({ ...result, [`process.env.${key}`]: JSON.stringify(process.env[key]) }),
  {},
);

module.exports = withSass(
  withTM({
    assetPrefix: process.env.ASSET_PREFIX || '',
    transpileModules: ['is_js', 'serialize-error'],
    serverRuntimeConfig: {
      // Will only be available on the server side
      ...envConfig,
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      ...envConfig,
    },
    webpack: (config) => {
      config.node = {
        fs: 'empty',
      };
      config.plugins.push(new webpack.DefinePlugin(envPlugin));
      config.plugins.push(new OptimizeCSSAssetsPlugin({}));
      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'react-svg-loader'],
      });
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      );
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
          entries['main.js'].unshift('./client/polyfills.js');
        }
        if (entries['main.js']) {
          entries['main.js'].unshift('./client/intersection-observer.js');
        }

        return entries;
      };

      return config;
    },
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      import: true,
      localIdentName: dev ? '[path]_[name]_[local]_[hash:base64:5]' : '[hash:base64:5]',
      url: false,
      exportOnlyLocals: true,
    },
  }),
);
