// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-no-data-toggle');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('vue-no-data-toggle', rule, {
  valid: [
    {
      code: '<template><gl-dropdown text="Dropdown Toggle">Dropdown Contents</gl-dropdown></template>',
    },
    {
      code: `<template>
          <div id="popovercontainer">
            <gl-button id="pop-basic">Popover Button</gl-button>
            <gl-popover
              target="pop-basic"
              container="popovercontainer"
              placement="top"
              title="This is a Popover"
              triggers="hover focus"
              content="With a placement of top"
            />
          </div>
        </template>`,
    },
  ],

  invalid: [
    {
      code: '<template><button data-toggle="dropdown">Dropdown Toggle</button></template>',
      errors: [
        "The Bootstrap property 'data-toggle' is not allowed inside Vue components. Please use the GlDropdown component instead.",
      ],
    },
    {
      code: '<template><button :data-toggle="dropdown">Dropdown Toggle</button></template>',
      errors: [
        "The Bootstrap property 'data-toggle' is not allowed inside Vue components. Please use an equivalent KhulnaSoft UI component instead.",
      ],
    },
    {
      code: '<template><button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip</button></template>',
      errors: [
        "The Bootstrap property 'data-toggle' is not allowed inside Vue components. Please use GlTooltipDirective instead.",
      ],
    },
    {
      code: '<template><button data-toggle="modal">Modal Toggle</button></template>',
      errors: [
        "The Bootstrap property 'data-toggle' is not allowed inside Vue components. Please use the GlModal component instead.",
      ],
    },
    {
      code: `<template>
          <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
            Popover button
          </button>
        </template>`,
      errors: [
        "The Bootstrap property 'data-toggle' is not allowed inside Vue components. Please use the GlPopover component instead.",
      ],
    },
    {
      code: '<template><button data-toggle="something-else">Unknown Toggle</button></template>',
      errors: [
        "The Bootstrap property 'data-toggle' is not allowed inside Vue components. Please use an equivalent KhulnaSoft UI component instead.",
      ],
    },
  ],
});
