module.exports = {
  raw: '<template><div alt="This is a cool component" :class="headClasses" v-if="showHead">{{ "Cool component" }}</div></template>',
  expressionContainer: '<template><div>{{ "Cool component" }}</div></template>',
  templateLiteral: '<template><div>{{ `Cool template literal component` }}</div></template>',
  literal: '<template><div>{{ "Cool literal component" }}</div></template>',
  vtext: '<template><div>"Cool text component"</div></template>',
  wrapped: {
    vtext_no_quotes_no_expression: '<template><div>Single vtext wrapped</div></template>',
    vtext_expression_single: "<template><div>{{ 'Single vtext wrapped' }}</div></template>",
    vtext_expression_double: '<template><div>{{ "Double vtext wrapped" }}</div></template>',
  },
};
