// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vtu-no-wrapper-vm');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('vtu-no-wrapper-vm', rule, {
  valid: [
    {
      code: 'wrapper.vm',
    },
    {
      code: 'wrapper.props("foo").bar',
    },
    {
      options: [{ allow: ['$emit'] }],
      code: 'getWrapper().vm.$emit',
    },
  ],

  invalid: [
    {
      code: 'wrapper.vm.test()',
      errors: ['Do not access `vm` internals directly.'],
    },
    {
      code: 'wrapper["vm"].test()',
      errors: ['Do not access `vm` internals directly.'],
    },
    {
      code: 'wrapper["vm"]["test"]',
      errors: ['Do not access `vm` internals directly.'],
    },
    {
      code: 'wrapper.vm.$emit',
      errors: ['Do not access `vm` internals directly.'],
    },
    {
      code: 'foo = wrapper.vm',
      errors: [
        'Do not access `vm` internals directly or work around this by saving a reference to `vm`.',
      ],
    },
    {
      code: 'getWrapper().vm.$emit',
      errors: ['Do not access `vm` internals directly.'],
    },
    {
      code: 'getWrapper().vm.$nextTick',
      errors: [
        'Do not access `vm` internals directly. For `$nextTick`, import `nextTick` directly from the Vue package.',
      ],
    },
    {
      options: [{ allow: ['$emit'] }],
      code: 'getWrapper().vm.$el',
      errors: [
        'Do not access `vm` internals directly. Only the following properties are allowed: $emit',
      ],
    },
  ],
});
