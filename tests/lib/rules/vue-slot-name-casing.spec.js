// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-slot-name-casing');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('vue-slot-name-casing', rule, {
  valid: [
    {
      code: '<template><slot name="filepath-prepend"></slot></template>',
    },
    {
      code: '<template><slot name="dropdown"></slot></template>',
    },
  ],

  invalid: [
    {
      code: '<template><slot name="filepathPrepend"></slot></template>',
      errors: ['Slot name "filepathPrepend" is not kebab-case.'],
    },
    {
      code: `<template><slot name='filepathPrepend'></slot></template>`,
      errors: ['Slot name "filepathPrepend" is not kebab-case.'],
    },
    {
      code: `<template><slot name=filepathPrepend></slot></template>`,
      errors: ['Slot name "filepathPrepend" is not kebab-case.'],
    },
    {
      code: `<template><slot name="filepath_prepend"></slot></template>`,
      errors: ['Slot name "filepath_prepend" is not kebab-case.'],
    },
    {
      code: `<template><slot name="FilepathPrepend"></slot></template>`,
      errors: ['Slot name "FilepathPrepend" is not kebab-case.'],
    },
    {
      code: `<template><slot name="DROPDOWN"></slot></template>`,
      errors: ['Slot name "DROPDOWN" is not kebab-case.'],
    },
    {
      code: `<template><slot name="File_Path_prepend"></slot></template>`,
      errors: ['Slot name "File_Path_prepend" is not kebab-case.'],
    },
  ],
});
