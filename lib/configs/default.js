const baseConfig = require('./base');
const vueConfig = require('./vue');

module.exports = {
  ...baseConfig,
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:promise/recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    ...baseConfig.rules,
    ...vueConfig.rules,
  },
  overrides: vueConfig.overrides,
};
