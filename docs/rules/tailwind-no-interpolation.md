# @khulnasoft/tailwind-no-interpolation

This rule lints against string interpolation being used to build CSS utility class
names as that would prevent Tailwind from parsing those classes and adding them to the bundle.

## Rule Details

### Examples of **incorrect** code for this rule

```js
// Using interpolation to build a utility in a string literal
const cssUtilsStringLiteral = 'gl-bg-red-' + variant;

// Using interpolation to build a utility in a template literal
const cssUtilsTemplateLiteral = `gl-border-top gl-bg-red-${color} gl-text-gray-400`;
```

### Examples of **correct** code for this rule

```js
// Utilities declared as a string literal without interpolation
const cssUtilsStringLiteral = 'gl-bg-red-800';

// Utilities declared as a template literal without interpolation
const cssUtils = `gl-border-top gl-bg-red-800 gl-text-gray-400`;
```

## Options

No options.

## Related rules

- [vue-tailwind-no-interpolation](./vue-tailwind-no-interpolation.md)

## When Not To Use It

If the codebase doesn't leverage Tailwind CSS, keep this rule disabled.
