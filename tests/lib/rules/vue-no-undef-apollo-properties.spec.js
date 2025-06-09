// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-no-undef-apollo-properties');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('vue-no-undef-apollo-properties', rule, {
  valid: [
    {
      filename: 'ok.vue',
      code: `<script>
        export default {
          render(h) {
            return h();
          }
        };
        </script>
      `,
    },
    {
      filename: 'ok.vue',
      code: `<script>
        export default {
          data() {
            return { bar: '', foo: undefined, qux: [] };
          },
          apollo: {
            foo: {
              query: fooQuery,
            },
            bar: {
              query: barQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
    },
    {
      filename: 'ok.vue',
      code: `<script>
        export default {
          data: {
            bar: '',
            foo: undefined,
            qux: [],
          },
          apollo: {
            foo: {
              query: fooQuery,
            },
            bar: {
              query: barQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
    },
    {
      filename: 'ok.vue',
      code: `<script>
        export default {
          data: () => ({
            bar: '',
            foo: undefined,
            qux: [],
          }),
          apollo: {
            foo: {
              query: fooQuery,
            },
            bar: {
              query: barQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
    },
    {
      filename: 'ok.vue',
      code: `<script>
        export default {
          data() {
            return { foo: undefined };
          },
          apollo: {
            $subscribe: {
              foo: {
                query: fooQuery,
              },
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
    },
    {
      filename: 'ok.vue',
      code: `<script>
        export default {
          data() {
            return {
              foo: '',
              $someQueryStartingWithDollar: null,
            };
          },
          apollo: {
            foo: {
              query: fooQuery,
            },
            $someQueryStartingWithDollar: false,

            // These are all "special options" in VueApollo 4 that modify all queries,
            // and are not queries themselves. Therefore they do not need to be initialised.
            // https://apollo.vuejs.org/guide-option/special-options.html#special-options
            $skipAll() { return false; },
            $skipAllQueries() { return false; },
            $skipAllSubscriptions() { return false; },
            $deep() { return false; },
            $error() { return false; },
            $query: { loadingKey: 'loading' },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
    },
  ],

  invalid: [
    {
      filename: 'bad.vue',
      code: `<script>
        export default {
          data() {
            return { bar: '' };
          },
          apollo: {
            foo: {
              query: fooQuery,
            },
            $someQuery: {
              query: someQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
      errors: [
        { messageId: 'noInitialValue', line: 7 },
        { messageId: 'noInitialValue', line: 10 },
      ],
    },
    {
      filename: 'bad.vue',
      code: `<script>
        export default {
          data: {
            bar: ''
          },
          apollo: {
            foo: {
              query: fooQuery,
            },
            bar: {
              query: barQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
      errors: [{ messageId: 'noInitialValue', line: 7 }],
    },
    {
      filename: 'bad.vue',
      code: `<script>
        export default {
          data: () => ({
            bar: ''
          }),
          apollo: {
            foo: {
              query: fooQuery,
            },
            bar: {
              query: barQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
      errors: [{ messageId: 'noInitialValue', line: 7 }],
    },
    {
      filename: 'bad.vue',
      code: `<script>
        export default {
          apollo: {
            foo: {
              query: fooQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
      errors: [{ messageId: 'noInitialValue', line: 4 }],
    },
    {
      filename: 'bad.vue',
      code: `<script>
        export default {
          apollo: {
            $subscribe: {
              foo: {
                query: fooQuery,
              },
            },
            bar: {
              query: fooQuery,
            },
          },
          render(h) {
            return h();
          }
        };
        </script>
      `,
      errors: [
        { messageId: 'noInitialValue', line: 5 },
        { messageId: 'noInitialValue', line: 9 },
      ],
    },
  ],
});
