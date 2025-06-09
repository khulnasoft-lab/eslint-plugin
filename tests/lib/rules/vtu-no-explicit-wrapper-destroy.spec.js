// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vtu-no-explicit-wrapper-destroy');
const RuleTester = require('eslint').RuleTester;

const ValidExample = `
afterEach(() => {
  jest.resetAllMocks();
});`;

const SimpleWrapperDestroy = `
afterEach(() => {
  wrapper.destroy();
  jest.resetAllMocks();
});`;

const WrapperDestroyAndNullAssignment = `
afterEach(() => {
  wrapper.destroy();
  jest.resetAllMocks();
  wrapper = null;
});`;

const TwoWrapperDestroyCalls = `
afterEach(() => {
    wrapper.destroy();
    wrapperArchived.destroy();
});`;

const VmDestroy = `
afterEach(() => {
    vm.destroy();
  });`;

const CapitalCaseWrapperDestroy = `
afterEach(() => {
    drawerWrapper.destroy();
});`;

const DifferentOrderOfExpressions = `
afterEach(() => {
  wrapper = null;
  wrapper.destroy();
  jest.resetAllMocks();
});`;

const NonWrapperDestroyCall = `
afterEach(() => {
    instance.destroy();
    resetHTMLFixture();
});
`;

const WithComplexAssignment = `
afterEach(() => {
  wrapper.destroy();
  window.onbeforeunload = null;
});`;

const AfterAllStatement = `
afterAll(() => {
  wrapper.destroy();
  window.onbeforeunload = null;
});`;

const AnotherWrapperNameStatement = `
afterEach(() => {
  wrapper.destroy();
  customValue.destroy();
  customValue = null;
});`;

const AfterEachLambdaDestroy = `afterEach(() => wrapper.destroy());`;
const AfterEachLambdaNull = `afterEach(() => wrapper = null);`;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  // Maybe parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run('vtu-no-explicit-wrapper-destroy', rule, {
  valid: [
    {
      code: ValidExample,
    },
    {
      code: NonWrapperDestroyCall,
    },
    {
      code: AfterAllStatement,
    },
  ],

  invalid: [
    {
      code: SimpleWrapperDestroy,
      errors: [rule.meta.messages.redundantDestroy],
    },
    {
      code: WrapperDestroyAndNullAssignment,
      errors: [rule.meta.messages.redundantDestroy, rule.meta.messages.redundantNullAssignment],
    },
    {
      code: TwoWrapperDestroyCalls,
      errors: [rule.meta.messages.redundantDestroy, rule.meta.messages.redundantDestroy],
    },
    {
      code: VmDestroy,
      errors: [rule.meta.messages.redundantDestroy],
    },
    {
      code: CapitalCaseWrapperDestroy,
      errors: [rule.meta.messages.redundantDestroy],
    },
    {
      code: WithComplexAssignment,
      errors: [rule.meta.messages.redundantDestroy],
    },
    {
      code: AfterEachLambdaDestroy,
      errors: [rule.meta.messages.redundantDestroy],
    },
    {
      code: AfterEachLambdaNull,
      errors: [rule.meta.messages.redundantNullAssignment],
    },
    {
      code: DifferentOrderOfExpressions,
      errors: [rule.meta.messages.redundantNullAssignment, rule.meta.messages.redundantDestroy],
    },
    {
      code: AnotherWrapperNameStatement,
      errors: [rule.meta.messages.redundantDestroy, rule.meta.messages.redundantNullAssignment],
      options: [{ wrapperNames: ['customValue'] }],
    },
    {
      code: AfterAllStatement,
      errors: [rule.meta.messages.redundantDestroy],
      options: [{ ruleTriggerer: 'afterAll' }],
    },
  ],
});
