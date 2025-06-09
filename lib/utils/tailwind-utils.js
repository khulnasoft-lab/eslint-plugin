const INTERPOLATION_PATTERN = /(^|\s)gl-[a-z0-9-/]*$/i;
const INTERPOLATED_UTIL_ERROR =
  'You are building a CSS utility class name using string interpolation which is forbidden because Tailwind CSS needs fully qualified names to properly generate the utilities we use.';
const INTERPOLATED_UTILS_VALIDATORS = {
  BinaryExpression: binaryExpressionHasInterpolatedUtils,
  TemplateLiteral: templateLiteralHasInterpolatedUtils,
};

const MAX_WIDTH_MEDIA_QUERY_ALLOW_LIST = ['hidden'];
const MAX_WIDTH_MEDIA_QUERY_PATTERN = new RegExp(
  `max-(sm|md|lg|xl):gl-(?!${MAX_WIDTH_MEDIA_QUERY_ALLOW_LIST.join('|')})`,
);
const MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR =
  'Do not use max-width media query utility classes unless absolutely necessary. Use min-width media query utility classes instead.';
const MAX_WIDTH_MEDIA_QUERY_UTIL_VALIDATORS = {
  Literal: literalHasMaxWidthUtils,
  VLiteral: literalHasMaxWidthUtils,
  TemplateElement: templateElementHasMaxWidthUtils,
};

function binaryExpressionHasInterpolatedUtils(node) {
  return node.operator === '+' && INTERPOLATION_PATTERN.test(node.left.value);
}

function templateLiteralHasInterpolatedUtils(node) {
  return node.quasis.some((quasi) => {
    return quasi.tail === false && INTERPOLATION_PATTERN.test(quasi.value.raw);
  });
}

function validateInterpolatedUtils(context, node) {
  if (INTERPOLATED_UTILS_VALIDATORS[node.type] === undefined) {
    return;
  }

  if (INTERPOLATED_UTILS_VALIDATORS[node.type](node)) {
    context.report({
      node,
      message: INTERPOLATED_UTIL_ERROR,
    });
  }
}

function literalHasMaxWidthUtils(node) {
  return MAX_WIDTH_MEDIA_QUERY_PATTERN.test(node.value);
}

function templateElementHasMaxWidthUtils(node) {
  return MAX_WIDTH_MEDIA_QUERY_PATTERN.test(node.value.raw);
}

function validateMaxWidthMediaQueryUtils(context, node) {
  if (MAX_WIDTH_MEDIA_QUERY_UTIL_VALIDATORS[node.type] === undefined) {
    return;
  }

  if (MAX_WIDTH_MEDIA_QUERY_UTIL_VALIDATORS[node.type](node)) {
    context.report({
      node,
      message: MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR,
    });
  }
}

module.exports = {
  validateInterpolatedUtils,
  validateMaxWidthMediaQueryUtils,
  INTERPOLATED_UTIL_ERROR,
  MAX_WIDTH_MEDIA_QUERY_UTIL_ERROR,
};
