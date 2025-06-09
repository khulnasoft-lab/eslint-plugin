/**
 * @fileoverview Detect a string which has been hard coded and requires externalization.
 * @author Brandon Labuschagne
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/require-i18n-strings'),
  RuleTester = require('eslint').RuleTester,
  es2017 = require('globals').es2017;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'script',
  },
  globals: es2017,
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const error = 'Should not have non i18n strings';

var ruleTester = new RuleTester();
ruleTester.run('require-i18n-strings', rule, {
  valid: [
    'var x = `mailto:${email}`',
    "foo = __('Bar')",
    "var arr = { name: __('Unassigned') }",
    'Dropzone.autoDiscover = false;',
    'state.isVisible = true;',
    'var foo = true;',
    'var foo = false;',
    'window.activeVueResources += 1;',
    "var namespacePrefix = '';",
    "var css = '.project-home-panel'",
    "var css = 'input[required=required], select[required=required], textarea[required=required]'",
    "var css = 'ul.new-session-tabs'",
    'var html = \'<div class="foo"></div>\'',
    "var path = './'",
    "var path = '../'",
    "var path = '/'",
    "var path = '~/'",
    "var url = 'https://google.com'",
    "var url = 'http://www.google.com'",
    "var containsCamelCase = 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd'",
    "var kebabCase = 'is-visible'",
    "var kebabCaseList = 'is-visible, is-not-visible'",
    "var kebabCaseList = 'is-visible is-not-visible'",
    "var snakeCase = 'is_visible'",
    "var cssValue = '5%'",
    "var cssValue = '50rem'",
    "var number = '100'",
    "var lowerCaseWord = 'click'",
    "var upperCaseWord = 'UTC'",
    "var oneChar = 'A'",
    "var data = 'l5,0,-2,4,-3,-4,4,2'",
    "var file = 'package.json'",
    "var placeholder = '{text}'",
    "var placeholder = '{{text}}'",
    "this.intervalHeader = 'POLL-INTERVAL'",
    "element.className = 'Foobar'",
    "element.style = 'width = 50'",
    "className = 'Foobar'",
    "const MESSAGE = 'Hello world!'",
    "var className = 'foo bar foobar'",
    'let template = `foo`',
    'let template = `FOO`',
    'let templateKebab = `foo-${bar}`',
    'let templateSnake = `foo_${bar}`',
    "let methodCall = 'translate3d(px, px, 0)'",
    'let css = \'a[hello="there"]\'',
    'const tabSelector = `div#${action}`;',
    'let urlTemplate = `${url}?${action}`',
    'let urlTemplate = `${url}=${value}`',
    'let urlTemplate = `${endpointsDefault}?archived=only`',
    'const pathReplacement = `$1${encodeURIComponent(ref)}`',
    "escapedText = `'${text}'`",
    'tokenIndex = `${key}:${tokenValue}`;',
    'this.taskListContainerSelector = `${this.selector} .js-task-list-container`',
    "var headers = {'Content-Type' : 'application/json; charset=utf-8'}",
    "var selector = 'input#search'",
    "var selector = '*[data-bind-in]'",
    "var content = { content: 'paragraph block*' }",
    "var listOfHtmlElements = { tag: 'thead tr' }",
    "var object = { tag: 'sup, sub, kbd, q, samp, var' }",
    "var classes = { dropdownCssClass: 'ajax-groups-dropdown select2-infinite' }",
    'var call = foo()',
    'var call = sprintf(null)',
    "var call = on('ajax:complete')",
    "const icon = spriteIcon('search', 's16 inline-search-icon');",
    "userAgent.indexOf('Opera') >= 0",
    "input.matches('textarea, input')",
    "this.$buttons.find('> span').text(newAction);",
    "dateFormat(dateObject, 'mmm d, yyyy');",
    "element.attr('class', 'x axis')",
    "$('body, html')",
    "document.createEvent('Event');",
    "$dropdown.closest('form, .js-issuable-update');",
    "this.titleField.on('keyup blur', this.renderWipExplanation);",
    "window.clipboardData.getData('Text');",
    "Mousetrap.bind('g p', () => findAndFollowLink('.shortcuts-project'));",
    "async('uint8array')",
    "n__('%d fixed test result', '%d fixed test results', resolved)",
    "var title = (value) ? `title='${state.esc(_.escape(mark.attrs.title))}'` : ''",
    "var title = (state === 'inprogress') ? __('Open') : variable",
    "dateFormat(datetime, 'mmm d, yyyy h:MMtt Z');",
    "const thumbnails = this.database.exec('SELECT * FROM thumbnails');",
    "$this.tooltip('show').one('blur click', () => $this.tooltip('hide'));",
    "this.registerEventListener('one',$parentEl,'mouseenter focus');",
    "CSS.supports('(position: -webkit-sticky) or (position: sticky)')",
    "new RegExp('(ref=)(.+?)$')",
    "var index = 'projects:issues:index'",
    "var prefix = 'https:'",
    "var path = 'core-js/es6/map'",
    "var headers =  { onclick: 'retun false' }",
    'var assignment = "role=\'button\'"',
    'var attribute = "data-force-fallback=\'true\'"',
    "var classes = 'merge-request-status closed issue-token-state-icon-closed'",
    'var action = "translate(0, \'\')"',
    'var action = "translate(\'\')"',
    "var key = ['Note']",
    'var element = "input[name=\'\']"',
    "var image = '<img src=\"'",
    'var foo = \'data-force-fallback="true"\'',
    "var foo = ', .option-hidden)'",
    "var foo = 'width height'",
    "whitelist['*'] = ['title', 'width height']",
    'this[`${target}Input`]',
    "this['Input']",
    'var graphQLTypename = {__typename:"Todo"}',
    'var graphQLTypename = {__typename:`${issueTrackerName}Issue`}',
    "object.__typename === 'Design'",
    "object.__typename = 'Design'",
  ],

  invalid: [
    {
      code: "var foo = 'Bar'",
      output: "var foo = __('Bar')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "var foo = 'Email mails to bar@media'",
      output: "var foo = __('Email mails to bar@media')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "var foo = 'bar@media is the email address'",
      output: "var foo = __('bar@media is the email address')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "foo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'",
      output:
        "foo = __('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "foo = 'bar bar'",
      output: "foo = __('bar bar')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "this.foo = 'bar bar'",
      output: "this.foo = __('bar bar')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: 'var template = `Applying command to ${commandDescription}`',
      output: 'var template = __(`Applying command to ${commandDescription}`)',
      errors: [
        {
          message: error,
          type: 'TemplateLiteral',
        },
      ],
    },
    {
      code: 'var template = `Foo ${bar}`',
      output: 'var template = __(`Foo ${bar}`)',
      errors: [
        {
          message: error,
          type: 'TemplateLiteral',
        },
      ],
    },
    {
      code: 'var template = `foo ${x} bar ${y}`',
      output: 'var template = __(`foo ${x} bar ${y}`)',
      errors: [
        {
          message: error,
          type: 'TemplateLiteral',
        },
      ],
    },
    {
      code: "var inProgress = 'Commited.'",
      output: "var inProgress = __('Commited.')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "var inProgress = 'Committing...'",
      output: "var inProgress = __('Committing...')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "var inProgress = '...Loading'",
      output: "var inProgress = __('...Loading')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "let contribText = `${count} contribution${count > 1 ? 's' : ''}`",
      output: "let contribText = __(`${count} contribution${count > 1 ? 's' : ''}`)",
      errors: [
        {
          message: error,
          type: 'TemplateLiteral',
        },
      ],
    },
    {
      code: "var arr = { name: 'Unassigned' }",
      output: "var arr = { name: __('Unassigned') }",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "const a = () => flash('Something went wrong on our end.');",
      output: "const a = () => flash(__('Something went wrong on our end.'));",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "var title = (state === 'inprogress') ? 'Open' : 'Closed'",
      output: "var title = (state === 'inprogress') ? __('Open') : __('Closed')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "sprintf('%{firstLabel} +%{labelCount} more')",
      output: "sprintf(__('%{firstLabel} +%{labelCount} more'))",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "var title = (state === 'inprogress') ? variable : 'Closed'",
      output: "var title = (state === 'inprogress') ? variable : __('Closed')",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "foo('fixed test result', 'fixed test more results', resolved)",
      output: "foo(__('fixed test result'), __('fixed test more results'), resolved)",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "var title = (state === 'inprogress') ? 'Open' : variable",
      output: "var title = (state === 'inprogress') ? __('Open') : variable",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: `new Flash(
        'Your comment could not be updated! Please check your network connection and try again.',
      );`,
      output: `new Flash(
        __('Your comment could not be updated! Please check your network connection and try again.'),
      );`,
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
    {
      code: "stop(new Error('Failed to connect to the prometheus server'));",
      output: "stop(new Error(__('Failed to connect to the prometheus server')));",
      errors: [
        {
          message: error,
          type: 'Literal',
        },
      ],
    },
  ],
});
