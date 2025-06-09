const assert = require('assert');
const { NODE_TYPES } = require('../../../lib/utils/rule-utils');
const { validateI18nHelperCallFactory } = require('../../../lib/utils/i18n-utils');

describe('i18n utils', () => {
  describe('validateI18nHelperCall', () => {
    const makeTemplateLiteralWithValue = (value) => ({
      type: NODE_TYPES.TEMPLATE_LITERAL,
      quasis: [
        {
          type: 'TemplateElement',
          value: {
            raw: value,
          },
        },
      ],
    });
    const makeIdentifier = ({ name, arguments = [] }) => ({
      callee: {
        type: NODE_TYPES.IDENTIFIER,
        name,
      },
      arguments,
    });

    const STRING_LITERAL = {
      type: NODE_TYPES.LITERAL,
    };
    const STRING_LITERAL_WITH_NAMESPACE = {
      type: NODE_TYPES.LITERAL,
      value: 'Namespace|Label',
    };
    const TEMPLATE_LITERAL_WITHOUT_NAMESPACE = makeTemplateLiteralWithValue('Label');
    const TEMPLATE_LITERAL_WITH_NAMESPACE = makeTemplateLiteralWithValue('Namespace|Label');

    let errorReported;

    const validateI18nHelperCall = validateI18nHelperCallFactory({
      report: () => {
        errorReported = true;
      },
    });

    beforeEach(() => {
      errorReported = false;
    });

    it('does not do anything if expression is not an i18n helper', () => {
      validateI18nHelperCall(makeIdentifier({ name: 'someFunction' })),
        assert.strictEqual(errorReported, false);
    });

    [
      { name: '__', arguments: [STRING_LITERAL] },
      { name: '__', arguments: [TEMPLATE_LITERAL_WITHOUT_NAMESPACE] },
      {
        name: 's__',
        arguments: [STRING_LITERAL_WITH_NAMESPACE],
      },
      { name: 's__', arguments: [STRING_LITERAL, STRING_LITERAL] },
      { name: 's__', arguments: [STRING_LITERAL, TEMPLATE_LITERAL_WITHOUT_NAMESPACE] },
      { name: 'n__', arguments: [STRING_LITERAL, STRING_LITERAL] },
      { name: 'n__', arguments: [TEMPLATE_LITERAL_WITHOUT_NAMESPACE, STRING_LITERAL] },
    ].forEach((args) => {
      it(`does not do anything when ${args.name} is called with valid arguments`, () => {
        validateI18nHelperCall(makeIdentifier(args));
        assert.strictEqual(errorReported, false);
      });
    });

    [
      { name: '__', arguments: [] },
      { name: '__', arguments: [{ type: 'NotAStringLiteral' }] },
      {
        name: '__',
        arguments: [STRING_LITERAL_WITH_NAMESPACE],
      },
      { name: '__', arguments: [TEMPLATE_LITERAL_WITH_NAMESPACE] },
      { name: 's__', arguments: [{ type: 'NotAStringLiteral' }, STRING_LITERAL] },
      { name: 's__', arguments: [STRING_LITERAL, { type: 'NotAStringLiteral' }] },
      { name: 'n__', arguments: [STRING_LITERAL, { type: 'NotAStringLiteral' }] },
    ].forEach((args) => {
      it(`reports an error when ${args.name} is called with invalid arguments`, () => {
        validateI18nHelperCall(makeIdentifier(args));
        assert.strictEqual(errorReported, true);
      });
    });

    [
      [
        {
          type: NODE_TYPES.LITERAL,
          value: 'Label',
        },
      ],
      [TEMPLATE_LITERAL_WITHOUT_NAMESPACE],
    ].forEach((arg) => {
      it('reports an error when s__ is called without a namespace', () => {
        validateI18nHelperCall(
          makeIdentifier({
            name: 's__',
            arguments: [arg],
          }),
        );
        assert.strictEqual(errorReported, true);
      });
    });
  });
});
