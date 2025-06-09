// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/require-valid-i18n-helpers');
const RuleTester = require('eslint').RuleTester;
const {
  STRING_LITERALS_ERRORS,
  STRING_LITERALS_VALID_CASES,
  STRING_LITERALS_INVALID_CASES,
  STRING_INTERPOLATION_INVALID_CASES,
  STRING_INTERPOLATION_ERRORS,
  GETTEXT_INVALID_CASES,
  GETTEXT_VALID_CASES,
  EXTRANEOUS_NAMESPACE_TRANSLATION_ERRORS,
  NAMESPACED_TRANSLATION_VALID_CASES,
  NAMESPACED_TRANSLATION_INVALID_CASES,
  NAMESPACED_TRANSLATION_ERRORS,
  MATCHING_NAMESPACES_VALID_CASES,
  MATCHING_NAMESPACES_INVALID_CASES,
  MATCHING_NAMESPACES_ERRORS,
} = require('./require-valid-i18n.constants');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('require-valid-i18n-helpers', rule, {
  valid: [
    ...STRING_LITERALS_VALID_CASES,
    ...GETTEXT_VALID_CASES,
    ...NAMESPACED_TRANSLATION_VALID_CASES,
    ...MATCHING_NAMESPACES_VALID_CASES,
  ],

  invalid: [
    ...STRING_LITERALS_INVALID_CASES.map((code) => ({
      code,
      errors: STRING_LITERALS_ERRORS,
    })),
    ...STRING_INTERPOLATION_INVALID_CASES.map((code) => ({
      code,
      errors: STRING_INTERPOLATION_ERRORS,
    })),
    ...GETTEXT_INVALID_CASES.map((code) => ({
      code,
      errors: EXTRANEOUS_NAMESPACE_TRANSLATION_ERRORS,
    })),
    ...NAMESPACED_TRANSLATION_INVALID_CASES.map((code) => ({
      code,
      errors: NAMESPACED_TRANSLATION_ERRORS,
    })),
    ...MATCHING_NAMESPACES_INVALID_CASES.map((code) => ({
      code,
      errors: MATCHING_NAMESPACES_ERRORS,
    })),
  ],
});
