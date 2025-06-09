// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-tailwind-no-interpolation');
const RuleTester = require('eslint').RuleTester;
const { INTERPOLATED_UTIL_ERROR } = require('../../../lib/utils/tailwind-utils');

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

ruleTester.run('vue-tailwind-no-interpolation', rule, {
  valid: [
    {
      code: wrapExpression("'gl-bg-red-800'"),
    },
    {
      code: wrapExpression('`gl-bg-red-800`'),
    },
    {
      code: wrapExpression('`foo-${bar}-gl-alert-${variant}`'),
    },
    {
      code: wrapExpression("'max-lg:gl-hidden'"),
    },
  ],

  invalid: [
    {
      code: wrapExpression("'gl-bg-red-' + color"),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrapExpression("'gl-' + displayMode"),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrapExpression('`gl-border-top gl-bg-red-${color} gl-text-gray-400`'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrapExpression('`gl-${displayMode}`'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrapExpression('`gl-w-1/${denominator}`'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrapExpression('[`gl-bg-red-${color}`]'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrapExpression('{ [`gl-bg-red-${color}`]: true }'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
  ],
});
