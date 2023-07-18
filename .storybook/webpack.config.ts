// .storybook/webpack.config.js
const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    // path to the src folder
    '@': path.resolve(__dirname, '../src'),
  };

  return config;
};
