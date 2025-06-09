// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-require-valid-i18n-helpers');
const RuleTester = require('eslint').RuleTester;
const {
  STRING_LITERALS_ERRORS,
  STRING_LITERALS_VALID_CASES,
  STRING_LITERALS_INVALID_CASES,
  STRING_INTERPOLATION_INVALID_CASES,
  STRING_INTERPOLATION_ERRORS,
  NAMESPACED_TRANSLATION_VALID_CASES,
  NAMESPACED_TRANSLATION_INVALID_CASES,
  NAMESPACED_TRANSLATION_ERRORS,
} = require('./require-valid-i18n.constants');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const makeTemplate = (content) => `
  <template>
    <span>
      {{ ${content} }}
    </span>
  </template>`;

const makeProp = (content) => `
  <template>
    <span :title="${content}"></span>
  </template>
`;

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('vue-require-valid-i18n-helpers', rule, {
  valid: [
    ...STRING_LITERALS_VALID_CASES.map(makeTemplate),
    ...STRING_LITERALS_VALID_CASES.map(makeProp),
    ...NAMESPACED_TRANSLATION_VALID_CASES.map(makeTemplate),
    ...NAMESPACED_TRANSLATION_VALID_CASES.map(makeProp),
  ],

  invalid: [
    ...STRING_LITERALS_INVALID_CASES.map((code) => ({
      code: makeTemplate(code),
      errors: STRING_LITERALS_ERRORS,
    })),
    ...STRING_LITERALS_INVALID_CASES.map((code) => ({
      code: makeProp(code),
      errors: STRING_LITERALS_ERRORS,
    })),
    ...STRING_INTERPOLATION_INVALID_CASES.map((code) => ({
      code: makeTemplate(code),
      errors: STRING_INTERPOLATION_ERRORS,
    })),
    ...STRING_INTERPOLATION_INVALID_CASES.map((code) => ({
      code: makeProp(code),
      errors: STRING_INTERPOLATION_ERRORS,
    })),
    ...NAMESPACED_TRANSLATION_INVALID_CASES.map((code) => ({
      code: makeTemplate(code),
      errors: NAMESPACED_TRANSLATION_ERRORS,
    })),
    ...NAMESPACED_TRANSLATION_INVALID_CASES.map((code) => ({
      code: makeProp(code),
      errors: NAMESPACED_TRANSLATION_ERRORS,
    })),
  ],
});
