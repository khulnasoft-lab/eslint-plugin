// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-tailwind-no-max-width-media-queries');
const RuleTester = require('eslint').RuleTester;
const {
  INTERPOLATED_UTIL_ERROR,
  MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR,
} = require('../../../lib/utils/tailwind-utils');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

const wrapExpression = (content) => `
  <template>
    <span :class="${content}"></span>
  </template>
`;

const wrapString = (content) => `
  <template>
    <span class="${content}"></span>
  </template>
`;

ruleTester.run('vue-tailwind-no-max-width-media-queries', rule, {
  valid: [
    {
      code: wrapString('gl-mt-3 md:gl-mt-5'),
    },
    {
      code: wrapExpression('["gl-mt-3", "md:gl-mt-5"]'),
    },
    {
      code: wrapExpression('{ "gl-mt-3": true, "md:gl-mt-5": true }'),
    },
  ],

  invalid: [
    {
      code: wrapString('gl-mt-5 max-md:gl-mt-3'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrapExpression("['gl-mt-5', 'max-md:gl-mt-3']"),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrapExpression("{ 'gl-mt-5': true, 'max-md:gl-mt-3': true }"),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrapExpression('`${defaultClasses} max-xl:gl-mt-3`'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
  ],
});
