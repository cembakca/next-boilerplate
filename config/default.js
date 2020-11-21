const stagingEnv = process.env.CONFIG_ENV || 'dev';

// get environmental config for staging
const config = require(`./stages/${stagingEnv}`); // eslint-disable-line

module.exports = config;
