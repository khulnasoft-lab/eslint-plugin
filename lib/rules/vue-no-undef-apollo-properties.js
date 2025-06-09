// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const { DOCS_BASE_URL } = require('../constants');
const utils = require('eslint-plugin-vue/lib/utils');

// ------------------------------------------------------------------------------
//   Helpers
// ------------------------------------------------------------------------------

const DOLLAR_SUBSCRIBE = '$subscribe';

const VUE_APOLLO_SPECIAL_OPTIONS = new Set([
  '$skipAll',
  '$skipAllQueries',
  '$skipAllSubscriptions',
  '$deep',
  '$error',
  '$query',

  // This one isn't special in the same way as the rest, but the normal code
  // paths below need to be skipped for this case as well. It is handled in a
  // separate code path.
  DOLLAR_SUBSCRIBE,
]);

function findProperty(objectExpression, name) {
  return objectExpression.properties.find(
    (p) =>
      p.type === 'Property' &&
      utils.getStaticPropertyName(p) === name &&
      p.value.type === 'ObjectExpression',
  );
}

function getDataKeys(componentObject) {
  return new Set(
    Array.from(utils.iterateProperties(componentObject, new Set(['data']))).map(({ name }) => name),
  );
}

function* getApolloKeyNodeWrappers(componentObject) {
  const apolloNode = findProperty(componentObject, 'apollo');

  if (!apolloNode) return;

  for (const nodeWrapper of utils.iterateObjectExpression(apolloNode.value)) {
    if (VUE_APOLLO_SPECIAL_OPTIONS.has(nodeWrapper.name)) {
      // Future-proofing against VueApollo 4's special options:
      // https://apollo.vuejs.org/guide-option/special-options.html#special-options
      continue;
    }

    yield nodeWrapper;
  }

  const subscribeNode = findProperty(apolloNode.value, DOLLAR_SUBSCRIBE);

  if (subscribeNode) {
    yield* utils.iterateObjectExpression(subscribeNode.value);
  }
}

function* getApolloKeyNodes(componentObject) {
  for (const nodeWrapper of getApolloKeyNodeWrappers(componentObject)) {
    yield nodeWrapper.node;
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'error',
    docs: {
      description: 'Require Apollo query properties to be initialized in component data.',
      url: DOCS_BASE_URL + '/vue-no-undef-apollo-properties.md',
    },
    messages: {
      noInitialValue: 'Apollo query property {{name}} is not initialized in component data.',
    },
  },
  create(context) {
    return utils.executeOnVue(context, (node) => {
      const dataKeys = getDataKeys(node);

      for (const apolloKeyNode of getApolloKeyNodes(node)) {
        if (!dataKeys.has(apolloKeyNode.name)) {
          context.report({
            node: apolloKeyNode,
            messageId: 'noInitialValue',
            data: {
              name: apolloKeyNode.name,
            },
          });
        }
      }
    });
  },
};
