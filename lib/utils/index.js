/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------

module.exports = {
  /**
   * Register the given visitor to parser services.
   * If the parser service of `vue-eslint-parser` was not found,
   * this generates a warning.
   *
   * @param {RuleContext} context The rule context to use parser services.
   * @param {Object} templateBodyVisitor The visitor to traverse the template body.
   * @param {Object} [scriptVisitor] The visitor to traverse the script.
   * @returns {Object} The merged visitor.
   */
  defineTemplateBodyVisitor(context, templateBodyVisitor, scriptVisitor) {
    const parserServices = context.sourceCode?.parserServices ?? context.parserServices;

    if (parserServices.defineTemplateBodyVisitor == null) {
      context.report({
        loc: { line: 1, column: 0 },
        message:
          'Use the latest vue-eslint-parser. See also https://vuejs.github.io/eslint-plugin-vue/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error',
      });
      return {};
    }
    return parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor);
  },
};
