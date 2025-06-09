// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const { DOCS_BASE_URL } = require('../constants');
const { defineTemplateBodyVisitor } = require('../utils/index');
const { validateMaxWidthMediaQueryUtils } = require('../utils/tailwind-utils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'error',
    docs: {
      description: 'Prevents the usage of max-width media query Tailwind CSS utility classes.',
      category: 'css',
      url: DOCS_BASE_URL + '/vue-tailwind-no-max-width-media-queries.md',
    },
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VLiteral(node) {
        validateMaxWidthMediaQueryUtils(context, node);
      },
      Literal(node) {
        validateMaxWidthMediaQueryUtils(context, node);
      },
      TemplateElement(node) {
        validateMaxWidthMediaQueryUtils(context, node);
      },
    });
  },
};
