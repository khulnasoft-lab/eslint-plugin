// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/tailwind-no-interpolation');
const RuleTester = require('eslint').RuleTester;
const { INTERPOLATED_UTIL_ERROR } = require('../../../lib/utils/tailwind-utils');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});

const wrap = (content) => `const cssUtils = ${content};`;

ruleTester.run('tailwind-no-interpolation', rule, {
  valid: [
    {
      code: wrap("'gl-bg-red-800'"),
    },
    {
      code: wrap('`gl-border-top gl-bg-red-800 gl-text-gray-400`'),
    },
    {
      code: wrap('`foo-${bar}-gl-alert-${variant}`'),
    },
  ],

  invalid: [
    {
      code: wrap("'gl-bg-red-' + variant"),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrap("'gl-' + displayMode"),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrap('`gl-border-top gl-bg-red-${variant} gl-text-gray-400`'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrap('`gl-${displayMode}`'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrap('`gl-w-1/${denominator}`'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
    {
      code: wrap('{ [`gl-bg-red-${variant}`]: true }'),
      errors: [INTERPOLATED_UTIL_ERROR],
    },
  ],
});
