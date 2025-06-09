'use strict';

const assert = require('assert');
const parse = require('vue-eslint-parser').parse;
const {
  closest,
  isString,
  isTemplateLiteral,
  getTemplateLiteralString,
  clearSplitLines,
  removeNewLines,
  selectFixFunction,
  getNodeValue,
  getAttributeName,
  NODE_TYPES,
} = require('../../../lib/utils/rule-utils');

const {
  raw,
  expressionContainer,
  templateLiteral,
  literal,
  vtext,
  wrapped,
} = require('./fixtures.js');

function extractTemplateContent(template) {
  const {
    templateBody: {
      children: [element],
    },
  } = parse(template);
  return element;
}

describe('Rule utils', () => {
  describe('closest', () => {
    const parentChain = ([child, ...items]) =>
      Object.assign(child, {
        parent: items.length === 0 ? null : parentChain(items),
      });

    it('finds closest parent that matches predicate', () => {
      const node = parentChain([
        { id: 1, name: 'C' },
        { id: 2, name: 'B' },
        { id: 3, name: 'A' },
        { id: 4, name: 'A' },
      ]);
      const isA = (x) => x.name === 'A';

      assert.strictEqual(closest(node, isA), node.parent.parent);
    });

    it('returns null if not found', () => {
      const node = parentChain([{ id: 1 }, { id: 2 }]);

      assert.strictEqual(
        closest(node, () => false),
        null,
      );
    });
  });

  describe('isString', () => {
    [{ type: 'Literal' }, { type: 'TemplateLiteral' }].forEach((node) => {
      it(`returns true if node is of type ${node.type}`, () => {
        assert.strictEqual(isString(node), true);
      });
    });

    it('returns false if node is not a string literal', () => {
      assert.strictEqual(
        isString({
          type: 'Foo',
        }),
        false,
      );
    });
  });

  describe('isTemplateLiteral', () => {
    it('returns true if node is a template literal', () => {
      assert.strictEqual(
        isTemplateLiteral({
          type: NODE_TYPES.TEMPLATE_LITERAL,
        }),
        true,
      );
    });

    it('returns false if node is not a string literal', () => {
      assert.strictEqual(
        isTemplateLiteral({
          type: 'Foo',
        }),
        false,
      );
    });
  });

  describe('getTemplateLiteralString', () => {
    it('returns the string from a template literal node', () => {
      assert.strictEqual(
        getTemplateLiteralString({
          quasis: [
            { type: 'TemplateElement', value: { raw: 'hello ' } },
            { type: 'Foo', value: { raw: 'foo ' } },
            { type: 'TemplateElement', value: { raw: 'world' } },
          ],
        }),
        'hello world',
      );
    });
  });

  describe('removeNewLines', () => {
    it('trims excess empty characters in the string', () => {
      assert.strictEqual(removeNewLines('        '), '');
      assert.strictEqual(removeNewLines(' hallo leute '), 'hallo leute');
    });

    it('no changes if there are no new lines', () => {
      assert.strictEqual(removeNewLines('hallo leute'), 'hallo leute');
      assert.strictEqual(
        removeNewLines('asdfasdflasfalskjfajsfklasj'),
        'asdfasdflasfalskjfajsfklasj',
      );
    });

    it('replaces new lines with a single whitespace', () => {
      assert.strictEqual(removeNewLines('This\n is a\n new\n string'), 'This is a new string');
      assert.strictEqual(removeNewLines(' hallo\n leute '), 'hallo leute');
    });
  });

  describe('clearSplitLines', () => {
    it('replaces multiple whitespaces with a single whitespace', () => {
      assert.strictEqual(clearSplitLines('        '), ' ');
    });

    it('replaces new lines with a single whitespace', () => {
      assert.strictEqual(clearSplitLines('This\n is a\n   new \n string'), 'This is a new string');
    });
  });

  describe('getNodeValue', () => {
    describe('V_EXPRESSION_CONTAINER', () => {
      const element = extractTemplateContent(expressionContainer);

      it('returns the correct text content', () => {
        const [expCon] = element.children;
        assert.strictEqual(getNodeValue(expCon), expCon.expression.value);
      });
    });

    describe('LITERAL', () => {
      const element = extractTemplateContent(literal);

      it('returns the correct text content', () => {
        const [exp] = element.children;
        assert.strictEqual(getNodeValue(exp.expression), exp.expression.value);
      });
    });

    describe('V_TEMPLATE_LITERAL', () => {
      const element = extractTemplateContent(templateLiteral);

      it('returns the correct text content', () => {
        const [exp] = element.children;
        assert.strictEqual(getNodeValue(exp.expression), exp.expression.quasis[0].value.raw);
      });
    });

    describe('V_TEXT', () => {
      const element = extractTemplateContent(vtext);

      it('returns the correct text content', () => {
        const [text] = element.children;
        assert.strictEqual(getNodeValue(text), text.value);
      });
    });
  });

  describe('getAttributeName', () => {
    const element = extractTemplateContent(raw);

    describe('VAttribute', () => {
      it('returns the correct attribute name', () => {
        const [attr] = element.startTag.attributes;
        assert.strictEqual(getAttributeName(attr), attr.key.name);
      });
    });

    it('returns null for non-attribute nodes', () => {
      [element.startTag, element, element.children[0]].forEach((n) => {
        assert.strictEqual(getAttributeName(n), null);
      });
    });
  });

  describe('selectFixFunction', () => {
    const doubleQuotesFix = ['__("', '")'];
    const doubleQuotesExpressionFix = ['{{ __("', '") }}'];

    it('wrapped with single quotes returns fix with double quotes', () => {
      const {
        children: [txt],
      } = extractTemplateContent(wrapped.vtext_expression_single);
      assert.deepStrictEqual(selectFixFunction(txt.expression), doubleQuotesFix);
    });

    it('wrapped with double quotes returns fix with double quotes', () => {
      const {
        children: [txt],
      } = extractTemplateContent(wrapped.vtext_expression_double);
      assert.deepStrictEqual(selectFixFunction(txt.expression), doubleQuotesFix);
    });

    it('bare returns fix with double quotes and expression', () => {
      const {
        children: [txt],
      } = extractTemplateContent(wrapped.vtext_no_quotes_no_expression);
      assert.deepStrictEqual(selectFixFunction(txt), doubleQuotesExpressionFix);
    });
  });
});
