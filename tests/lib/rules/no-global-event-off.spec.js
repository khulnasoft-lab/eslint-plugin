// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-global-event-off');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const error = 'Expected off to be called with specific event name and function handler.';

ruleTester.run('no-global-event-off', rule, {
  valid: [
    'off("some", "other");',
    '$(".foo").off("some", "other");',
    'event.$off("some", other);',
    '$off("some", "other");',
    'event.$bar("some");',
    'bar("some");',
  ],

  invalid: [
    'off("some");',
    'event.off("some");',
    '$off("some");',
    'event.$off("some");',
    'event.$off("some", undefined);',
  ].map((code) => ({ code, errors: [{ type: 'CallExpression', message: error }] })),
});
