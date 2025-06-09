// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-prefer-dollar-scopedslots');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('vue-prefer-dollar-scopedslots', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        <template>
          <div v-if="$scopedSlots.default"></div>
        </template>
      `,
    },
    {
      filename: 'test.vue',
      code: `
        <script>
        export default {
          render(h) {
            return this.$scopedSlots.default
              ? this.$scopedSlots.default()
              : null;
          }
        };
        </script>
      `,
    },
    {
      filename: 'test.vue',
      code: `
        <script>
        export default {
          mounted() {
            console.log(this.$scopedSlots);
          }
        };
        </script>

        <template>
          Foo
        </template>
      `,
    },
    {
      filename: 'component_index.js',
      code: `
        new Vue({
          render(h) {
            return this.$scopedSlots.default();
          }
        });
      `,
    },
    {
      filename: 'not_a_vue_component.js',
      code: `
        class Foo {
          foo() {
            this.$slots = [];
          }
        }
      `,
    },
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `
        <template>
          <div v-if="$slots.default"></div>
        </template>
      `,
      errors: [
        {
          line: 3,
          column: 22,
          messageId: 'preferDollarScopedSlots',
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `
        <script>
        export default {
          render(h) {
            return this.$slots.default
              ? this.$slots.default
              : null;
          }
        };
        </script>
      `,
      errors: [
        {
          line: 5,
          column: 25,
          messageId: 'preferDollarScopedSlots',
        },
        {
          line: 6,
          column: 22,
          messageId: 'preferDollarScopedSlots',
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `
        <script>
        export default {
          mounted() {
            console.log(this.$slots);
          }
        };
        </script>

        <template>
          Foo
        </template>
      `,
      errors: [
        {
          line: 5,
          column: 30,
          messageId: 'preferDollarScopedSlots',
        },
      ],
    },
    {
      filename: 'component_index.js',
      code: `
        new Vue({
          render(h) {
            return this.$slots.default;
          }
        });
      `,
      errors: [
        {
          line: 4,
          column: 25,
          messageId: 'preferDollarScopedSlots',
        },
      ],
    },
  ],
});
