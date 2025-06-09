# @khulnasoft/vue-tailwind-no-max-width-media-queries

This rule enforces the same conventions as [tailwind-no-max-width-media-queries](./tailwind-no-max-width-media-queries.md) in Vue templates.

## Rule Details

### Examples of **incorrect** code for this rule

```html
<template>
  <span class="gl-mt-5 max-md:gl-mt-3"></span>
</template>
  ```

### Examples of **correct** code for this rule

```html
<template>
  <span class="gl-mt-3 md:gl-mt-5"></span>
</template>
```

## Options

No options.

## Related rules

- [tailwind-no-max-width-media-queries](./tailwind-no-max-width-media-queries.md)

## When Not To Use It

If the codebase doesn't leverage Tailwind CSS, keep this rule disabled.
