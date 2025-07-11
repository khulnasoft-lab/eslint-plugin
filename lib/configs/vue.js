/*
  This plugin contains rules related to KhulnaSoft Vue style guide
  base JavaScript rules are in lib/configs/base.js
*/

module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:vue/recommended', 'prettier'],
  parserOptions: {
    parser: 'espree',
    ecmaVersion: 'latest',
  },
  plugins: ['unicorn', 'promise', 'import', '@khulnasoft'],
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    // Turning this off for now as we violate this rule in many places.
    'vue/max-attributes-per-line': 'off',
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    '@khulnasoft/vue-require-required-key': 'error',
    'vue/v-slot-style': [
      'error',
      {
        atComponent: 'shorthand',
      },
    ],
    '@khulnasoft/vue-no-data-toggle': 'error',
    '@khulnasoft/vue-prefer-dollar-scopedslots': 'error',
    '@khulnasoft/vue-slot-name-casing': 'error',
    '@khulnasoft/no-runtime-template-compiler': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    // See https://github.com/khulnasoft-lab/eslint-plugin/-/issues/52.
    'vue/component-api-style': ['error', ['options']],
    // We might not want to enable vue/singleline-html-element-content-newline and vue/multiline-html-element-content-newline
    // just yet as they might cause regression depending on how the consumers compile Vue templates.
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    // Disabling these as they might conflict with prettier.
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-newline': 'off',
    // BEGIN rules to aid migration from Vue 2.x to 3.x.
    // See https://gitlab.com/groups/gitlab-org/-/epics/3174 for more details.
    'vue/no-deprecated-data-object-declaration': 'error',
    'vue/no-deprecated-events-api': 'error',
    'vue/no-deprecated-filter': 'error',
    'vue/no-deprecated-functional-template': 'error',
    'vue/no-deprecated-html-element-is': 'error',
    'vue/no-deprecated-inline-template': 'error',
    'vue/no-deprecated-props-default-this': 'error',
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/no-deprecated-slot-attribute': 'error',
    'vue/no-deprecated-slot-scope-attribute': 'error',
    'vue/no-deprecated-v-on-number-modifiers': 'error',
    'vue/no-deprecated-vue-config-keycodes': 'error',
    // END rules to aid migration from Vue 2.x to 3.x.
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
