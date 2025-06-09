const {
  ERROR_MESSAGE_STRING_LITERAL,
  ERROR_MESSAGE_STRING_INTERPOLATION,
  ERROR_MESSAGE_MISSING_NAMESPACE,
  ERROR_MESSAGE_EXTRANEOUS_NAMESPACE,
  ERROR_MESSAGE_NAMESPACES_MISMATCH,
} = require('../../../lib/utils/i18n-utils');

const STRING_LITERALS_VALID_CASES = [
  "__('Bar')",
  "s__('Foo|Bar')",
  "s__('Some Context|Label')",
  "s__('SomeContext', 'The string to be translated')",
  "n__('%d apple', '%d apples', appleCount)",
  's__(`SomeContext|Label`)',
  's__(`Some Context|Label`)',
];
const STRING_LITERALS_INVALID_CASES = [
  '__(foo)',
  '__(getLabel())',
  "s__('SomeContext', label)",
  "n__('%d apple', appleCount)",
];
const STRING_LITERALS_ERRORS = [
  {
    message: ERROR_MESSAGE_STRING_LITERAL,
  },
];

const STRING_INTERPOLATION_INVALID_CASES = [
  '__(`String ${interpolation}`)',
  "s__('SomeContext', `String ${interpolation}`)",
  "s__(`My${namespace}`, 'The string to be translated')",
  "n__(`%d ${apple}`, 'apples', appleCount)",
  "n__('%d apple', `%d ${apples}`, appleCount)",
];
const STRING_INTERPOLATION_ERRORS = [
  {
    message: ERROR_MESSAGE_STRING_INTERPOLATION,
  },
];

const GETTEXT_INVALID_CASES = [
  "__('Namespace|String')",
  "__('My Namespace|String')",
  "__('Namespace|Foo|Bar')",
  '__(`Namespace|String`)',
  `__(\`
    DastConfig|Customize DAST settings
  \`)`,
];
const GETTEXT_VALID_CASES = ["__('String')", '__(`String`)'];
const EXTRANEOUS_NAMESPACE_TRANSLATION_ERRORS = [
  {
    message: ERROR_MESSAGE_EXTRANEOUS_NAMESPACE,
  },
];

const NAMESPACED_TRANSLATION_VALID_CASES = [
  "s__('Foo|Bar')",
  "s__('SomeContext', 'The string to be translated')",
  `s__(\`
  DastConfig|Customize DAST settings
  \`)`,
];
const NAMESPACED_TRANSLATION_INVALID_CASES = ["s__('FooBar')"];
const NAMESPACED_TRANSLATION_ERRORS = [
  {
    message: ERROR_MESSAGE_MISSING_NAMESPACE,
  },
];

const MATCHING_NAMESPACES_VALID_CASES = [
  // String literals
  "n__('%d apple', '%d apples', appleCount)",
  "n__('Fruits|%d apple', 'Fruits|%d apples', appleCount)",

  // Template literals
  'n__(`%d apple`, `%d apples`, appleCount)',
  'n__(`Fruits|%d apple`, `Fruits|%d apples`, appleCount)',
];

const MATCHING_NAMESPACES_INVALID_CASES = [
  "n__('%d apple', 'Fruits|%d apples', appleCount)",
  "n__(`Vegetables|%d apple`, 'Fruits|%d apples', appleCount)",
];
const MATCHING_NAMESPACES_ERRORS = [
  {
    message: ERROR_MESSAGE_NAMESPACES_MISMATCH,
  },
];

module.exports = {
  STRING_LITERALS_VALID_CASES,
  STRING_LITERALS_INVALID_CASES,
  STRING_LITERALS_ERRORS,

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
};
