// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const { DOCS_BASE_URL } = require('../constants');
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
      url: DOCS_BASE_URL + '/tailwind-no-max-width-media-queries.md',
    },
  },
  create(context) {
    return {
      TemplateElement(node) {
        validateMaxWidthMediaQueryUtils(context, node);
      },
      Literal(node) {
        validateMaxWidthMediaQueryUtils(context, node);
      },
    };
  },
};
