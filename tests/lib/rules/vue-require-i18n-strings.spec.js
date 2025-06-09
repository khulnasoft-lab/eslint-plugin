/**
 * @fileoverview Enforce externalisation of translateable strings in a .vue file
 * @author Ezekiel Kigbo
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-require-i18n-strings');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('vue-require-i18n-strings', rule, {
  valid: [
    {
      code: '<template><div>{{ _("test") }}</div></template>',
    },
    {
      code: '<template><div>{{ test }}</div></template>',
    },
    {
      code: '<template><div><h1>{{ _("test") }}</h1></div></template>',
    },
    {
      code: '<template><div><h1>{{ test }}</h1></div></template>',
    },
    {
      code: '<template><h1 v-html="test"></template>',
    },
    {
      code: '<template><h1 :text="testB"/></template>',
    },
    {
      code: '<template><div aria-label="testB"/></template>',
    },
    {
      code: '<template><div aria-label="\'testB\'"/></template>',
    },
    {
      code: '<template><div><input type="text" placeholder="This is placeholder text" /></div></template>',
    },
    {
      code: '<template><img src="/some/image/path" alt="Amazing image" /></template>',
    },
    {
      code: '<template><abbr title="Hypertext Markup Language">{{ __("HTML") }}</abbr></template>',
    },
    {
      code: '<template><div :class="`js-${scope}-tab-${tab.scope}`"></div></template>',
    },
    {
      code: '<template><p>&times;</p></template>',
    },
    {
      code: '<template><p>→</p></template>',
    },
    {
      code: '<template><p>·</p></template>',
    },
    {
      code: '<template><p>!</p></template>',
    },
    {
      code: '<template><p>&middot;</p></template>',
    },
    {
      code: '<template><p>×</p></template>',
    },
    {
      code: '<template><p>--<p></template>',
    },
  ],

  invalid: [
    {
      code: '<template><div>"test"</div></template>',
      output: '<template><div>{{ __("test") }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: "<template><div>'test'</div></template>",
      output: "<template><div>{{ __('test') }}</div></template>",
      errors: ['Content should be marked for translation'],
    },
    {
      code: '<template><div>`test`</div></template>',
      output: '<template><div>{{ __("`test`") }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: '<template><div>test</div></template>',
      output: '<template><div>{{ __("test") }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: '<template><div>{{ "test" }}</div></template>',
      output: '<template><div>{{ __("test") }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: "<template><div>{{ 'test' }}</div></template>",
      output: '<template><div>{{ __("test") }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: '<template><div>{{ `test` }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: '<template><div><h1>test</h1></div></template>',
      output: '<template><div><h1>{{ __("test") }}</h1></div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: '<template><div>{{ `test ${something}` }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
    {
      code: '<template><div>{{ `test %{"something"}` }}</div></template>',
      errors: ['Content should be marked for translation'],
    },
  ],
});
