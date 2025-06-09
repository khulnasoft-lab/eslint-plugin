// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const { DOCS_BASE_URL } = require('../constants');
const { defineTemplateBodyVisitor } = require('../utils/index');
const { validateInterpolatedUtils } = require('../utils/tailwind-utils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'error',
    docs: {
      description: 'Prevents building Tailwind CSS utility classes with string interpolation.',
      category: 'css',
      url: DOCS_BASE_URL + '/vue-tailwind-no-interpolation.md',
    },
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      BinaryExpression(node) {
        validateInterpolatedUtils(context, node);
      },
      TemplateLiteral(node) {
        validateInterpolatedUtils(context, node);
      },
    });
  },
};
