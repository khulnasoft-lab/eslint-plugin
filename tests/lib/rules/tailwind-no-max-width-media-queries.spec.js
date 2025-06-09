// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/tailwind-no-max-width-media-queries');
const RuleTester = require('eslint').RuleTester;
const { MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR } = require('../../../lib/utils/tailwind-utils');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});

const wrap = (content) => `const cssUtils = ${content};`;

ruleTester.run('tailwind-no-max-width-media-queries', rule, {
  valid: [
    {
      code: wrap("'gl-mt-3 md:gl-mt-5'"),
    },
    {
      code: wrap('["gl-mt-3", "md:gl-mt-5"]'),
    },
    {
      code: wrap('{ "gl-mt-3": true, "md:gl-mt-5": true }'),
    },
    {
      code: wrap("'max-lg:gl-hidden'"),
    },
  ],

  invalid: [
    {
      code: wrap("'gl-mt-5 max-sm:gl-mt-3'"),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('["gl-mt-5", "max-sm:gl-mt-3"]'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('{ "gl-mt-5": true, "max-sm:gl-mt-3": true }'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap("'gl-mt-5 max-md:gl-mt-3'"),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('["gl-mt-5", "max-md:gl-mt-3"]'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('{ "gl-mt-5": true, "max-md:gl-mt-3": true }'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap("'gl-mt-5 max-lg:gl-mt-3'"),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('["gl-mt-5", "max-lg:gl-mt-3"]'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('{ "gl-mt-5": true, "max-lg:gl-mt-3": true }'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap("'gl-mt-5 max-xl:gl-mt-3'"),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('["gl-mt-5", "max-xl:gl-mt-3"]'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('{ "gl-mt-5": true, "max-xl:gl-mt-3": true }'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
    {
      code: wrap('`${defaultClasses} max-xl:gl-mt-3`'),
      errors: [MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR],
    },
  ],
});
