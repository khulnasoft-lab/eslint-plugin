/**
 * @fileoverview enforce no bare strings attributes in vue templates
 * @author theatlasroom
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-require-i18n-attribute-strings');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('vue-require-i18n-attribute-strings', rule, {
  valid: [
    {
      code: '<template><div :class="`js-${scope}-tab-${tab.scope}`"></div></template>',
    },
    {
      code: '<template><p title="Hypertext Markup Language">{{ __("HTML") }}</p></template>',
    },
  ],

  invalid: [
    {
      code: '<template><input type="text" placeholder="This is placeholder text" /></template>',
      output:
        '<template><input type="text" :placeholder="__(`This is placeholder text`)" /></template>',
      errors: ['Attribute value should be marked for translation'],
    },
    {
      code: '<template><img src="/some/image/path" alt="Amazing image" /></template>',
      output: '<template><img src="/some/image/path" :alt="__(`Amazing image`)" /></template>',
      errors: ['Attribute value should be marked for translation'],
    },
    {
      code: '<template><div aria-label="test this string">{{ "COOL" }}></div></template>',
      output: '<template><div :aria-label="__(`test this string`)">{{ "COOL" }}></div></template>',
      errors: ['Attribute value should be marked for translation'],
    },
    {
      code: '<template><div aria-placeholder="test this string">{{ "COOL" }}></div></template>',
      output:
        '<template><div :aria-placeholder="__(`test this string`)">{{ "COOL" }}></div></template>',
      errors: ['Attribute value should be marked for translation'],
    },
    {
      code: '<template><div aria-valuetext="test this string">{{ "COOL" }}></div></template>',
      output:
        '<template><div :aria-valuetext="__(`test this string`)">{{ "COOL" }}></div></template>',
      errors: ['Attribute value should be marked for translation'],
    },
    {
      code: '<template><div aria-roledescription="\'test some other string\'">{{ "COOL" }}></div></template>',
      output:
        '<template><div :aria-roledescription="__(`\'test some other string\'`)">{{ "COOL" }}></div></template>',
      errors: ['Attribute value should be marked for translation'],
    },
    {
      options: [{ attributes: ['title'] }],
      code: '<template><p title="Hypertext Markup Language">{{ __("HTML") }}</p></template>',
      output:
        '<template><p :title="__(`Hypertext Markup Language`)">{{ __("HTML") }}</p></template>',
      errors: ['Attribute value should be marked for translation'],
    },
  ],
});
