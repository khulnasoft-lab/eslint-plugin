# @khulnasoft/tailwind-no-max-width-media-queries

This rule lints against using max-width media query Tailwind classes.
Min-width media query Tailwind classes should be used instead.

## Rule Details

### Examples of **incorrect** code for this rule

```js
const cssClasses = ['gl-mt-5', 'max-md:gl-mt-3'];
```

### Examples of **correct** code for this rule

```js
const cssClasses = ['gl-mt-3', 'md:gl-mt-5'];
```

## Options

No options.

## Related rules

- [vue-tailwind-no-max-width-media-queries](./vue-tailwind-no-max-width-media-queries.md)

## When Not To Use It

If the codebase doesn't leverage Tailwind CSS, keep this rule disabled.
