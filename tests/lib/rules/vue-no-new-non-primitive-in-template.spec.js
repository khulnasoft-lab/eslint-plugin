// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-no-new-non-primitive-in-template');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

const withBindings = (code) =>
  `<template><my-component ${code}>Hello world!</my-component></template>`;

ruleTester.run('vue-no-new-non-primitive-in-template', rule, {
  valid: [
    {
      code: withBindings(':things="foo"'),
      options: [{ deny: ['array', 'object', 'new'] }],
    },
    {
      code: withBindings(':class="[]"'),
      options: [{ deny: ['array'] }],
    },
    {
      code: withBindings('v-bind="{ things: [] }"'),
      options: [{ deny: [] }],
    },
    {
      code: withBindings('v-bind="{}"'),
      options: [{ deny: ['object'], allowNames: ['^$'] }],
    },
    {
      code: withBindings('v-bind:allowedPropOne="{}" v-bind:allowed-prop-two="{}"'),
      options: [{ deny: ['object'], allowNames: ['^allowed-?prop'] }],
    },
  ],
  invalid: [
    {
      code: withBindings(':things="[]"'),
      errors: [rule.meta.errors.ERROR_ARRAY_IN_TEMPLATE],
      options: [{ deny: ['array'] }],
    },
    {
      code: withBindings('v-bind="{ things: [] }"'),
      errors: [rule.meta.errors.ERROR_ARRAY_IN_TEMPLATE],
      options: [{ deny: ['array'] }],
    },
    {
      code: withBindings('v-bind="{ things: [] }"'),
      errors: [rule.meta.errors.ERROR_OBJECT_IN_TEMPLATE, rule.meta.errors.ERROR_ARRAY_IN_TEMPLATE],
      options: [{ deny: ['array', 'object'] }],
    },
    {
      code: withBindings('v-bind="{}"'),
      errors: [rule.meta.errors.ERROR_OBJECT_IN_TEMPLATE],
      options: [{ deny: ['object'] }],
    },
    {
      code: withBindings('v-bind="new Date()"'),
      errors: [rule.meta.errors.ERROR_NEW_IN_TEMPLATE],
      options: [{ deny: ['new'] }],
    },
    {
      code: withBindings(':class="[]"'),
      errors: [rule.meta.errors.ERROR_ARRAY_IN_TEMPLATE],
      options: [{ deny: ['array'], allowNames: [] }],
    },
    {
      code: withBindings(':foo="[]" :bar="{}" :foo-bar="new Date()"'),
      errors: [
        rule.meta.errors.ERROR_ARRAY_IN_TEMPLATE,
        rule.meta.errors.ERROR_OBJECT_IN_TEMPLATE,
        rule.meta.errors.ERROR_NEW_IN_TEMPLATE,
      ],
      options: [{ deny: ['array', 'object', 'new'] }],
    },
  ],
});
