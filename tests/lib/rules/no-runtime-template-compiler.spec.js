// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-runtime-template-compiler');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const vueRuleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

vueRuleTester.run('no-runtime-template-compiler', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {
            render(h) {
              return h('a');
            }
          };
        </script>
      `,
    },
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {};
        </script>

        <template>
          <i></i>
        </template>
      `,
    },
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {
            el: '#app',
          };
        </script>

        <template>
          <i></i>
        </template>
      `,
    },
    {
      filename: 'test.vue',
      code: `
        <template>
          <i>No Script</i>
        </template>
      `,
    },
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {};
        </script>
      `,
      errors: [
        {
          message: `Components must not implicitly rely on runtime-compiled templates.`,
          line: 3,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {
            el: '#app',
          };
        </script>
      `,
      errors: [
        {
          message: `Components must not implicitly rely on runtime-compiled templates.`,
          line: 3,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {
            template: '#app',
          };
        </script>
    `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 4,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {
            template: '<i></i>',
          };
        </script>
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 4,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {
            render(h) {
              return h('i');
            },
            template: '<i></i>',
          };
        </script>
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 7,
        },
      ],
    },
    {
      filename: 'test.vue',
      code: `
        <script>
          export default {
            template: '<i></i>',
          };
        </script>

        <template>
          <i></i>
        </template>
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 4,
        },
      ],
    },
  ],
});

const jsRuleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

jsRuleTester.run('no-runtime-template-compiler', rule, {
  valid: [
    {
      filename: 'test.js',
      code: `export const foo = 'foo';`,
    },
    {
      filename: 'test.js',
      code: `
        Vue.component('FooBar', {
          render(h) {
            return h('a');
          },
        });
      `,
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          el: '#foo',
          render(h) {
            return h('a');
          },
        });
      `,
    },
    {
      filename: 'test.js',
      code: `
        Vue.mixin({
          methods: {
            foo() {},
          },
        });
      `,
    },
    {
      filename: 'test.js',
      code: `
        Vue.mixin({
          provide: {
            foo: 'bar',
          },
        });
      `,
    },
  ],

  invalid: [
    {
      filename: 'test.js',
      code: `
        Vue.component('FooBar', {
          template: '<i></i>',
        });
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 3,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        Vue.component('FooBar', {
          el: '#foo',
        });
      `,
      errors: [
        {
          message: `Components must not implicitly rely on runtime-compiled templates.`,
          line: 2,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          name: 'FooBar'
        }).$mount('#foo');
      `,
      errors: [
        {
          message: `Components must not implicitly rely on runtime-compiled templates.`,
          line: 2,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          el: '#foo',
        });
      `,
      errors: [
        {
          message: `Components must not implicitly rely on runtime-compiled templates.`,
          line: 2,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          el: '#foo',
          template: '<i></i>',
        });
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 4,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        Vue.component('FooBar', {
          render(h) {
            return h('a');
          },
          template: '<i></i>',
        });
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 6,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          el: '#foo',
          render(h) {
            return h('a');
          },
          template: '<i></i>',
        });
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 7,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          render(h) {
            return h('a');
          },
        }).$mount('#foo');

        new Vue({
          el: '#bar',
        });
      `,
      errors: [
        {
          message: `Components must not implicitly rely on runtime-compiled templates.`,
          line: 8,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          render(h) {
            return h('a');
          },
        }).$mount('#foo');

        new Vue({
          template: '<i></i>',
        }).$mount('#bar');
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 9,
        },
      ],
    },
    {
      filename: 'test.js',
      code: `
        Vue.component('FooBar', {
          template: '<i></i>',
        });

        new Vue({
          el: '#foo',
        }).$mount('#foo');
      `,
      errors: [
        {
          message: `The template component option is not allowed.`,
          line: 3,
        },
        {
          message: `Components must not implicitly rely on runtime-compiled templates.`,
          line: 6,
        },
      ],
    },
  ],
});
