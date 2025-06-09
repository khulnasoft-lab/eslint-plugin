// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-require-required-key');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
const ruleTester = new RuleTester({
  parserOptions,
});

ruleTester.run('vue-require-required-key', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            a: {
              type: Number,
              required: true
            },
            b: {
              type: Number,
              default: 0,
              required: false
            },
            // eslint-disable-next-line vue-require-required-key
            k: Number
          }
        }
      `,
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            ...x,
            a: {
              ...y,
              type: Number,
              required: true
            },
            b: {
              type: Number,
              default: 0,
              required: false
            }
          }
        }
      `,
    },
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            a: Number,
            b: [Number, String],
            c: {
              type: Number
            },
            d: {
              type: Number,
            },
            e: [Boolean, String],
            f: {
              type: [Boolean, String],
            }
          }
        }
      `,
      errors: [
        {
          message: `Prop 'a' requires required key`,
          line: 4,
        },
        {
          message: `Prop 'b' requires required key`,
          line: 5,
        },
        {
          message: `Prop 'c' requires required key`,
          line: 6,
        },
        {
          message: `Prop 'd' requires required key`,
          line: 9,
        },
        {
          message: `Prop 'e' requires required key`,
          line: 12,
        },
        {
          message: `Prop 'f' requires required key`,
          line: 13,
        },
      ],
    },

    // computed properties
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            a: String,
            'b': String,
            ['c']: String,
            [\`d\`]: String,
          }
        };
      `,
      errors: [
        {
          message: `Prop 'a' requires required key`,
          line: 4,
        },
        {
          message: `Prop 'b' requires required key`,
          line: 5,
        },
        {
          message: `Prop 'c' requires required key`,
          line: 6,
        },
        {
          message: `Prop 'd' requires required key`,
          line: 7,
        },
      ],
    },
    // unknown static name
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            [foo]: String,
            [bar()]: String,
            [baz.baz]: String,
          }
        };
      `,
      errors: [
        {
          message: `Prop '[foo]' requires required key`,
          line: 4,
        },
        {
          message: `Prop '[bar()]' requires required key`,
          line: 5,
        },
        {
          message: `Prop '[baz.baz]' requires required key`,
          line: 6,
        },
      ],
    },
  ],
});
